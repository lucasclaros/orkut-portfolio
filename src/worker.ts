/// <reference types="@cloudflare/workers-types" />

interface Env {
  RESEND_API_KEY: string;
  GITHUB_TOKEN: string;
  APPROVE_SECRET: string;
  LUCAS_EMAIL: string;
  SITE_URL: string;
  ASSETS: Fetcher;
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return str.replace(/[&<>"']/g, (c) => map[c]);
}

function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function htmlPage(title: string, message: string): Response {
  return new Response(
    `<!DOCTYPE html>
    <html><head><meta charset="utf-8"><title>${title}</title></head>
    <body style="font-family:Verdana,sans-serif;text-align:center;padding:40px;background:#D3DBE7">
      <div style="max-width:400px;margin:0 auto;background:#fff;border:1px solid #C3D1E0;border-radius:4px;padding:24px">
        <h2 style="color:#315B9E;font-size:16px;margin:0 0 8px">${title}</h2>
        <p style="font-size:12px;color:#333">${message}</p>
      </div>
    </body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

async function handleSubmitScrap(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.json<{ name?: string; message?: string }>();
  const name = stripHtml((body.name ?? "").trim()).slice(0, 50);
  const message = stripHtml((body.message ?? "").trim()).slice(0, 500);

  if (!name || !message) {
    return Response.json({ error: "name and message are required" }, { status: 400 });
  }

  const scrap = {
    id: crypto.randomUUID(),
    name,
    message,
    date: new Date().toISOString().slice(0, 10),
  };

  const payload = btoa(JSON.stringify(scrap));
  const approveUrl = `${env.SITE_URL}/api/approve-scrap?data=${payload}&token=${env.APPROVE_SECRET}`;
  const rejectUrl = `${env.SITE_URL}/api/approve-scrap?action=reject&token=${env.APPROVE_SECRET}`;

  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message);

  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "orkut-portfolio <onboarding@resend.dev>",
      to: [env.LUCAS_EMAIL],
      subject: `novo scrap de ${safeName}`,
      html: `
        <div style="font-family:Verdana,sans-serif;max-width:480px;margin:0 auto;border:1px solid #E8E8E8;border-radius:4px;overflow:hidden">
          <div style="background:#6D84B4;padding:10px 16px">
            <span style="color:#fff;font-size:14px;font-weight:bold">orkut - novo recado!</span>
          </div>
          <div style="padding:16px;background:#F4F7FC">
            <div style="background:#fff;border:1px solid #E8E8E8;border-radius:3px;padding:12px">
              <div style="font-size:12px;color:#315B9E;font-weight:bold;margin-bottom:4px">${safeName}</div>
              <div style="font-size:12px;color:#333;line-height:1.5">${safeMessage}</div>
              <div style="font-size:10px;color:#999;margin-top:6px">${scrap.date}</div>
            </div>
          </div>
          <div style="padding:16px;text-align:center;background:#fff">
            <a href="${approveUrl}" style="display:inline-block;background:#6D84B4;color:#fff;padding:10px 24px;border-radius:3px;text-decoration:none;font-size:12px;font-weight:bold;margin-right:8px">Aprovar</a>
            <a href="${rejectUrl}" style="display:inline-block;background:#999;color:#fff;padding:10px 24px;border-radius:3px;text-decoration:none;font-size:12px;font-weight:bold">Recusar</a>
          </div>
        </div>
      `,
    }),
  });

  if (!emailRes.ok) {
    return Response.json({ error: "failed to send notification" }, { status: 500 });
  }

  return Response.json({ success: true });
}

async function handleApproveScrap(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";

  if (!constantTimeEquals(token, env.APPROVE_SECRET)) {
    return htmlPage("Acesso negado", "Token invalido.");
  }

  if (url.searchParams.get("action") === "reject") {
    return htmlPage("Scrap recusado", "O recado foi descartado.");
  }

  const data = url.searchParams.get("data");
  if (!data) {
    return htmlPage("Erro", "Dados do scrap nao encontrados.");
  }

  let scrap: { id: string; name: string; message: string; date: string };
  try {
    const parsed = JSON.parse(atob(data));
    if (
      typeof parsed.id !== "string" ||
      typeof parsed.name !== "string" ||
      typeof parsed.message !== "string" ||
      typeof parsed.date !== "string"
    ) {
      return htmlPage("Erro", "Dados do scrap invalidos.");
    }
    scrap = parsed;
  } catch {
    return htmlPage("Erro", "Dados do scrap invalidos.");
  }

  const repo = "lucasclaros/orkut-portfolio";
  const filePath = "src/data/scraps.ts";
  const branch = "main";

  try {
    const fileRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`,
      { headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "User-Agent": "orkut-portfolio" } },
    );

    if (!fileRes.ok) {
      return htmlPage("Erro", "Falha ao acessar o repositorio.");
    }

    const fileData = await fileRes.json<{ content: string; sha: string }>();
    const currentContent = atob(fileData.content.replace(/\n/g, ""));
    const currentSha = fileData.sha;

    if (currentContent.includes(`id: "${scrap.id}"`)) {
      return htmlPage("Ja aprovado", `O recado de <strong>${escapeHtml(scrap.name)}</strong> ja foi adicionado.`);
    }

    const newEntry = `  {\n    id: "${scrap.id}",\n    name: ${JSON.stringify(scrap.name)},\n    message: ${JSON.stringify(scrap.message)},\n    date: "${scrap.date}",\n  },\n`;

    const newContent = currentContent.replace(/\n\];\s*$/, `\n${newEntry}];\n`);

    if (newContent === currentContent) {
      return htmlPage("Erro", "Estrutura do arquivo de scraps mudou. Contate Lucas.");
    }

    const commitRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "orkut-portfolio",
        },
        body: JSON.stringify({
          message: `scrap: aprovado recado de ${scrap.name}`,
          content: btoa(newContent),
          sha: currentSha,
          branch,
        }),
      },
    );

    if (!commitRes.ok) {
      return htmlPage("Erro", "Falha ao salvar o scrap. Tente novamente.");
    }

    return htmlPage(
      "Scrap aprovado!",
      `O recado de <strong>${escapeHtml(scrap.name)}</strong> foi adicionado. O site sera atualizado em ~1 minuto.`,
    );
  } catch {
    return htmlPage("Erro", "Algo deu errado. Tente novamente.");
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/submit-scrap") {
      return handleSubmitScrap(request, env);
    }

    if (url.pathname === "/api/approve-scrap") {
      return handleApproveScrap(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

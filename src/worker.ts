/// <reference types="@cloudflare/workers-types" />

interface Env {
  RESEND_API_KEY: string;
  GITHUB_TOKEN: string;
  APPROVE_SECRET: string;
  LUCAS_EMAIL: string;
  SITE_URL: string;
  ASSETS: Fetcher;
}

const REPO = "lucasclaros/orkut-portfolio";
const FILE_PATH = "src/data/scraps.ts";
const BRANCH = "main";

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

async function commitScrap(
  scrap: { id: string; name: string; message: string; date: string },
  env: Env,
): Promise<boolean> {
  const fileRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    { headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "User-Agent": "orkut-portfolio" } },
  );

  if (!fileRes.ok) return false;

  const fileData = await fileRes.json<{ content: string; sha: string }>();
  const currentContent = atob(fileData.content.replace(/\n/g, ""));

  if (currentContent.includes(`id: "${scrap.id}"`)) return true;

  const newEntry = `  {\n    id: "${scrap.id}",\n    name: ${JSON.stringify(scrap.name)},\n    message: ${JSON.stringify(scrap.message)},\n    date: "${scrap.date}",\n  },\n`;
  const newContent = currentContent.replace(/\n\];\s*$/, `\n${newEntry}];\n`);

  if (newContent === currentContent) return false;

  const commitRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "orkut-portfolio",
      },
      body: JSON.stringify({
        message: `scrap: novo recado de ${scrap.name}`,
        content: btoa(newContent),
        sha: fileData.sha,
        branch: BRANCH,
      }),
    },
  );

  return commitRes.ok;
}

async function removeScrap(scrapId: string, env: Env): Promise<boolean> {
  const fileRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    { headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "User-Agent": "orkut-portfolio" } },
  );

  if (!fileRes.ok) return false;

  const fileData = await fileRes.json<{ content: string; sha: string }>();
  const currentContent = atob(fileData.content.replace(/\n/g, ""));

  // Remove the scrap entry block by matching its id
  const pattern = new RegExp(
    `  \\{\\n    id: "${scrapId}",[\\s\\S]*?\\},\\n`,
  );
  const newContent = currentContent.replace(pattern, "");

  if (newContent === currentContent) return false;

  const commitRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "orkut-portfolio",
      },
      body: JSON.stringify({
        message: `scrap: removido recado ${scrapId}`,
        content: btoa(newContent),
        sha: fileData.sha,
        branch: BRANCH,
      }),
    },
  );

  return commitRes.ok;
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

  // Auto-commit to repo
  const committed = await commitScrap(scrap, env);
  if (!committed) {
    return Response.json({ error: "failed to save scrap" }, { status: 500 });
  }

  // Send notification email with delete button
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message);
  const deleteUrl = `${env.SITE_URL}/api/delete-scrap?id=${scrap.id}&token=${env.APPROVE_SECRET}`;

  await fetch("https://api.resend.com/emails", {
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
            <span style="font-size:11px;color:#2E7D32;font-weight:bold">publicado automaticamente</span>
            <br/><br/>
            <a href="${deleteUrl}" style="display:inline-block;background:#c0392b;color:#fff;padding:10px 24px;border-radius:3px;text-decoration:none;font-size:12px;font-weight:bold">Excluir recado</a>
          </div>
        </div>
      `,
    }),
  });

  // Return the scrap so the client can store it in localStorage
  return Response.json({ success: true, scrap });
}

async function handleDeleteScrap(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";

  if (!constantTimeEquals(token, env.APPROVE_SECRET)) {
    return htmlPage("Acesso negado", "Token invalido.");
  }

  const scrapId = url.searchParams.get("id");
  if (!scrapId) {
    return htmlPage("Erro", "ID do scrap nao encontrado.");
  }

  try {
    const removed = await removeScrap(scrapId, env);
    if (removed) {
      return htmlPage("Scrap excluido!", "O recado foi removido. O site sera atualizado em ~1 minuto.");
    }
    return htmlPage("Nao encontrado", "O recado ja foi removido ou nao existe.");
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

    if (url.pathname === "/api/delete-scrap") {
      return handleDeleteScrap(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

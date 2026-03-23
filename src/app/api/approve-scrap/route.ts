import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const REPO = "lucasclaros/orkut-portfolio";
const FILE_PATH = "src/data/scraps.ts";
const BRANCH = "main";

function htmlPage(title: string, message: string) {
  return new NextResponse(
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

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== process.env.APPROVE_SECRET) {
    return htmlPage("Acesso negado", "Token invalido.");
  }

  // Reject action -- just confirm, no side effects
  if (req.nextUrl.searchParams.get("action") === "reject") {
    return htmlPage("Scrap recusado", "O recado foi descartado.");
  }

  const data = req.nextUrl.searchParams.get("data");
  if (!data) {
    return htmlPage("Erro", "Dados do scrap nao encontrados.");
  }

  let scrap: { id: string; name: string; message: string; date: string };
  try {
    scrap = JSON.parse(Buffer.from(data, "base64url").toString());
  } catch {
    return htmlPage("Erro", "Dados do scrap invalidos.");
  }

  try {
    // Fetch current file from GitHub
    const fileRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "User-Agent": "orkut-portfolio" } },
    );

    if (!fileRes.ok) {
      return htmlPage("Erro", "Falha ao acessar o repositorio.");
    }

    const fileData = await fileRes.json();
    const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");
    const currentSha = fileData.sha;

    // Check for duplicate
    if (currentContent.includes(`id: "${scrap.id}"`)) {
      return htmlPage("Ja aprovado", `O recado de <strong>${scrap.name}</strong> ja foi adicionado.`);
    }

    // Build new entry
    const newEntry = `  {\n    id: "${scrap.id}",\n    name: ${JSON.stringify(scrap.name)},\n    message: ${JSON.stringify(scrap.message)},\n    date: "${scrap.date}",\n  },\n`;

    // Insert into array
    let newContent: string;
    if (currentContent.includes("// Lucas adiciona manualmente")) {
      newContent = currentContent.replace(
        "  // Lucas adiciona manualmente scraps aprovados aqui\n",
        newEntry,
      );
    } else {
      newContent = currentContent.replace(/\n\];\s*$/, `\n${newEntry}];\n`);
    }

    // Commit via GitHub API
    const commitRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "orkut-portfolio",
        },
        body: JSON.stringify({
          message: `scrap: aprovado recado de ${scrap.name}`,
          content: Buffer.from(newContent).toString("base64"),
          sha: currentSha,
          branch: BRANCH,
        }),
      },
    );

    if (!commitRes.ok) {
      const err = await commitRes.text();
      return htmlPage("Erro", `Falha ao commitar: ${err}`);
    }

    return htmlPage(
      "Scrap aprovado!",
      `O recado de <strong>${scrap.name}</strong> foi adicionado. O site sera atualizado em ~1 minuto.`,
    );
  } catch {
    return htmlPage("Erro", "Algo deu errado. Tente novamente.");
  }
}

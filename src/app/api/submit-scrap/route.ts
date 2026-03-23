import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = stripHtml((body.name ?? "").trim()).slice(0, 50);
    const message = stripHtml((body.message ?? "").trim()).slice(0, 500);

    if (!name || !message) {
      return NextResponse.json({ error: "name and message are required" }, { status: 400 });
    }

    const scrap = {
      id: crypto.randomUUID(),
      name,
      message,
      date: new Date().toISOString().slice(0, 10),
    };

    const payload = Buffer.from(JSON.stringify(scrap)).toString("base64url");
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const approveUrl = `${baseUrl}/api/approve-scrap?data=${payload}&token=${process.env.APPROVE_SECRET}`;
    const rejectUrl = `${baseUrl}/api/approve-scrap?action=reject&token=${process.env.APPROVE_SECRET}`;

    await resend.emails.send({
      from: "orkut-portfolio <onboarding@resend.dev>",
      to: process.env.LUCAS_EMAIL!,
      subject: `novo scrap de ${name}`,
      html: `
        <div style="font-family:Verdana,sans-serif;max-width:480px;margin:0 auto;border:1px solid #E8E8E8;border-radius:4px;overflow:hidden">
          <div style="background:#6D84B4;padding:10px 16px">
            <span style="color:#fff;font-size:14px;font-weight:bold">orkut - novo recado!</span>
          </div>
          <div style="padding:16px;background:#F4F7FC">
            <div style="background:#fff;border:1px solid #E8E8E8;border-radius:3px;padding:12px">
              <div style="font-size:12px;color:#315B9E;font-weight:bold;margin-bottom:4px">${name}</div>
              <div style="font-size:12px;color:#333;line-height:1.5">${message}</div>
              <div style="font-size:10px;color:#999;margin-top:6px">${scrap.date}</div>
            </div>
          </div>
          <div style="padding:16px;text-align:center;background:#fff">
            <a href="${approveUrl}" style="display:inline-block;background:#6D84B4;color:#fff;padding:10px 24px;border-radius:3px;text-decoration:none;font-size:12px;font-weight:bold;margin-right:8px">Aprovar</a>
            <a href="${rejectUrl}" style="display:inline-block;background:#999;color:#fff;padding:10px 24px;border-radius:3px;text-decoration:none;font-size:12px;font-weight:bold">Recusar</a>
          </div>
          <div style="padding:8px 16px;text-align:center;font-size:10px;color:#999">orkut-portfolio</div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "failed to send notification" }, { status: 500 });
  }
}

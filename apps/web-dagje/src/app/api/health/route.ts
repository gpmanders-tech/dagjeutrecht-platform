import { NextResponse } from 'next/server';
import { prisma } from '@utrecht/db';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Publiek: alleen ok/niet ok. Details en testmail alleen met ?token=HEALTH_TOKEN.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = process.env.HEALTH_TOKEN?.trim();
  const authorized = !!token && url.searchParams.get('token') === token;

  const started = Date.now();
  let dbOk = false;
  let providers: number | null = null;
  try {
    providers = await prisma.provider.count();
    dbOk = true;
  } catch {
    dbOk = false;
  }

  if (!authorized) {
    return NextResponse.json({ ok: dbOk }, { status: dbOk ? 200 : 503 });
  }

  let mailResult: any = { skipped: true };
  if (url.searchParams.get('mail') === '1') {
    try {
      const t = nodemailer.createTransport({
        host: process.env.SMTP_HOST!.trim(),
        port: Number((process.env.SMTP_PORT || '587').trim()),
        secure: Number((process.env.SMTP_PORT || '587').trim()) === 465,
        auth: { user: process.env.SMTP_USER!.trim(), pass: process.env.SMTP_PASS!.trim() },
      });
      const info = await t.sendMail({
        from: (process.env.MAIL_FROM ?? 'info@dagjeutrecht.nl').trim(),
        to: (process.env.OPS_MAIL_TO ?? 'info@dagjeutrecht.nl').trim(),
        subject: 'DagjeUtrecht Vercel probe',
        text: `Testmail vanuit Vercel (${process.env.VERCEL_REGION}).`,
      });
      mailResult = { ok: true, messageId: info.messageId };
    } catch (e: any) {
      mailResult = { ok: false, error: e.message?.slice(0, 250) };
    }
  }

  return NextResponse.json({
    ok: dbOk,
    elapsed_ms: Date.now() - started,
    db: { ok: dbOk, providers },
    smtp_configured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
    mail: mailResult,
    vercel_region: process.env.VERCEL_REGION ?? null,
  });
}

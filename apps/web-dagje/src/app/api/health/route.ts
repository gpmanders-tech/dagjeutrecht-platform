import { NextResponse } from 'next/server';
import { prisma } from '@utrecht/db';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const testMail = url.searchParams.get('mail') === '1';

  const dbUrl = process.env.DATABASE_URL || '';
  const dbMasked = dbUrl ? `${dbUrl.slice(0, 22)}...${dbUrl.slice(-30)} (len:${dbUrl.length})` : '(unset)';

  const smtpState = {
    host: process.env.SMTP_HOST || '(unset)',
    port: process.env.SMTP_PORT || '(unset)',
    user: process.env.SMTP_USER ? process.env.SMTP_USER : '(unset)',
    pass_set: !!process.env.SMTP_PASS,
    mail_from: process.env.MAIL_FROM || '(unset)',
    ops_mail_to: process.env.OPS_MAIL_TO || '(unset)',
  };

  const started = Date.now();
  let dbResult: any;
  try {
    dbResult = { ok: true, providers: await prisma.provider.count() };
  } catch (e: any) {
    dbResult = { ok: false, error: e.message?.slice(0, 200) };
  }

  let mailResult: any = { skipped: true };
  if (testMail) {
    try {
      const t = nodemailer.createTransport({
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
      });
      const info = await t.sendMail({
        from: process.env.MAIL_FROM ?? 'info@dagjeutrecht.nl',
        to: process.env.OPS_MAIL_TO ?? 'gpmanders@gmail.com',
        subject: 'DagjeUtrecht Vercel probe',
        text: `Testmail vanuit Vercel (${process.env.VERCEL_REGION}).`,
      });
      mailResult = { ok: true, messageId: info.messageId };
    } catch (e: any) {
      mailResult = { ok: false, error: e.message?.slice(0, 250) };
    }
  }

  return NextResponse.json({
    elapsed_ms: Date.now() - started,
    db: dbResult,
    smtp: smtpState,
    mail: mailResult,
    vercel_region: process.env.VERCEL_REGION ?? null,
    node_env: process.env.NODE_ENV,
    database_url_masked: dbMasked,
  });
}

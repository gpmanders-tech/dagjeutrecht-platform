import { NextResponse } from 'next/server';
import { dagelijkseRonde } from '../../../lib/inkoop-agent';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Dagelijkse ronde van de inkoop-agent. Aangeroepen door Vercel Cron (zie vercel.json). */
export async function GET(req: Request) {
  const secret = (process.env.CRON_SECRET || '').trim();
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const resultaat = await dagelijkseRonde();
  return NextResponse.json({ ok: true, ...resultaat });
}

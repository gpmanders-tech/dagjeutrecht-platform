import { NextResponse } from 'next/server';
import { dagelijkseRonde } from '../../../lib/inkoop-agent';
import { INKOOP_AGENT_AAN } from '../../../lib/mail';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Dagelijkse ronde van de inkoop-agent. Aangeroepen door Vercel Cron (zie vercel.json). */
export async function GET(req: Request) {
  const secret = (process.env.CRON_SECRET || '').trim();
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!INKOOP_AGENT_AAN) return NextResponse.json({ ok: true, gepauzeerd: true });
  const resultaat = await dagelijkseRonde();
  return NextResponse.json({ ok: true, ...resultaat });
}

import { NextResponse } from 'next/server';
import { verwerkBetaling } from '../../../lib/inkoop-agent';

export const dynamic = 'force-dynamic';

/** Mollie-webhook. Mollie stuurt alleen het betaal-id; de status halen we zelf op bij Mollie. */
export async function POST(req: Request) {
  const body = await req.text();
  const id = new URLSearchParams(body).get('id');
  if (id && /^tr_[A-Za-z0-9]+$/.test(id)) await verwerkBetaling(id);
  return new NextResponse(null, { status: 200 });
}

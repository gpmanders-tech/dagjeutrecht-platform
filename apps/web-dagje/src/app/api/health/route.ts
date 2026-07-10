import { NextResponse } from 'next/server';
import { prisma } from '@utrecht/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const url = process.env.DATABASE_URL || '';
  const masked = url ? `${url.slice(0, 22)}...${url.slice(-30)} (len:${url.length})` : '(unset)';
  const started = Date.now();
  try {
    const count = await prisma.provider.count();
    return NextResponse.json({
      ok: true,
      elapsed_ms: Date.now() - started,
      providers: count,
      database_url_masked: masked,
      node_env: process.env.NODE_ENV,
      vercel_region: process.env.VERCEL_REGION ?? null,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        elapsed_ms: Date.now() - started,
        error_message: e.message ?? String(e),
        error_code: e.code ?? null,
        error_meta: e.meta ?? null,
        database_url_masked: masked,
        node_env: process.env.NODE_ENV,
        vercel_region: process.env.VERCEL_REGION ?? null,
      },
      { status: 500 }
    );
  }
}

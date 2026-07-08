/**
 * Ping alle Provider.websiteUrl en meld welke niet meer bereikbaar zijn.
 * Uitkomst: gewone stdout — kopieer de rode regels naar seed-data.ts voor cleanup.
 *
 * Run: pnpm --filter @utrecht/db check:urls
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UA = 'DagjeUtrechtBot/1.0 (info@dagjeutrecht.nl)';

async function status(url: string): Promise<{ ok: boolean; code: number | string; final?: string }> {
  try {
    // HEAD first — sneller, veel sites accepteren dit
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(10_000),
    });
    if (res.status === 405 || res.status === 403) {
      // Fallback naar GET
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: { 'User-Agent': UA, Accept: 'text/html' },
        signal: AbortSignal.timeout(10_000),
      });
    }
    return { ok: res.ok, code: res.status, final: res.url };
  } catch (e: any) {
    return { ok: false, code: e.message || 'error' };
  }
}

async function main() {
  const providers = await prisma.provider.findMany({
    where: { websiteUrl: { not: null }, active: true },
    orderBy: { slug: 'asc' },
  });
  console.log(`Check ${providers.length} URLs…\n`);

  const bad: Array<{ slug: string; url: string; result: string }> = [];

  for (const p of providers) {
    const url = p.websiteUrl!;
    const s = await status(url);
    if (s.ok) {
      // stille success
    } else {
      const result = `${s.code}${s.final && s.final !== url ? ` → ${s.final}` : ''}`;
      console.log(`✗ ${p.slug.padEnd(30)} ${url} — ${result}`);
      bad.push({ slug: p.slug, url, result });
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log(`\n${bad.length} dode/verdachte URLs van ${providers.length}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

/**
 * Filter recent-gescrapte Wikimedia Commons foto's: alleen behouden
 * als minimaal 1 significant woord uit de provider-naam of slug in
 * de bestandsnaam voorkomt. Anders → heroImage weer op null (picsum-fallback).
 *
 * Run: pnpm --filter @utrecht/db filter:wikimedia
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STOP = new Set([
  'de', 'het', 'een', 'en', 'van', 'utrecht', 'the', 'and', 'club', 'shop',
  'bar', 'cafe', 'restaurant', 'hotel', 'museum', 'workshop', 'tour', 'tours',
]);

function tokens(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s\-]/g, ' ')
      .split(/[\s\-]+/)
      .filter((w) => w.length >= 3 && !STOP.has(w))
  );
}

async function main() {
  // Scan ook providers zonder heroImage in geval iemand recent filter had gedraaid
  const providers = await prisma.provider.findMany({
    where: {
      heroImage: { contains: 'upload.wikimedia.org' },
    },
  });
  console.log(`Filter ${providers.length} providers met Wikimedia-foto…\n`);

  let kept = 0;
  let dropped = 0;

  for (const p of providers) {
    const nameTokens = tokens(`${p.name} ${p.slug}`);
    const filename = decodeURIComponent(p.heroImage!.split('/').pop() ?? '').replace(
      /^\d+px-/,
      ''
    );
    const fileTokens = tokens(filename);
    const flat = filename.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Match als: token overlap OF token (>= 4 char) als substring in geplatte filename
    const matches: string[] = [];
    for (const t of nameTokens) {
      if (fileTokens.has(t)) matches.push(t);
      else if (t.length >= 4 && flat.includes(t)) matches.push(`${t}~`);
    }

    if (matches.length > 0) {
      console.log(`✓ ${p.slug} — match: [${matches.join(', ')}]`);
      kept++;
    } else {
      await prisma.provider.update({ where: { id: p.id }, data: { heroImage: null } });
      console.log(`✗ ${p.slug} — geen match met "${filename.slice(0, 60)}"`);
      dropped++;
    }
  }

  console.log(`\nBehouden: ${kept} · Verwijderd: ${dropped}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

/**
 * Fallback-scrape voor providers zonder heroImage: probeer
 * 1) Wikipedia NL page-image via opensearch
 * 2) Wikipedia EN page-image via opensearch
 * 3) Wikimedia Commons file search
 *
 * Wikimedia policy: User-Agent verplicht, wees mild (1 req/s).
 *
 * Run: pnpm --filter @utrecht/db scrape:wikimedia
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UA = 'DagjeUtrechtBot/1.0 (info@dagjeutrecht.nl)';
const SLEEP_MS = 1100;

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

async function api(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'application/json' },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e: any) {
    console.warn(`  ! ${url.slice(0, 60)}…: ${e.message}`);
    return null;
  }
}

async function wikipediaPageImage(lang: 'nl' | 'en', query: string): Promise<string | null> {
  // 1. opensearch → best matching article title
  const search = await api(
    `https://${lang}.wikipedia.org/w/api.php?action=opensearch&format=json&limit=1&search=${encodeURIComponent(query)}`
  );
  const title: string | undefined = search?.[1]?.[0];
  if (!title) return null;
  await sleep(SLEEP_MS);

  // 2. pageimages → thumbnail source
  const img = await api(
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=1200&titles=${encodeURIComponent(title)}`
  );
  const pages = img?.query?.pages;
  if (!pages) return null;
  const first: any = Object.values(pages)[0];
  return first?.thumbnail?.source ?? null;
}

async function commonsFileSearch(query: string): Promise<string | null> {
  // Zoek bestanden op Commons matching de query
  const search = await api(
    `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=5&srsearch=${encodeURIComponent(query)}`
  );
  const hits: any[] | undefined = search?.query?.search;
  if (!hits || !hits.length) return null;

  // Filter: neem eerste die eindigt op .jpg/.jpeg/.png (dus echte foto's, geen .svg/.pdf/.oga)
  const fileHit = hits.find((h) =>
    /^File:[^:]+\.(jpg|jpeg|png)$/i.test(h.title)
  );
  if (!fileHit) return null;

  const title = fileHit.title as string; // "File:Utrecht_domtoren.jpg"
  await sleep(SLEEP_MS);

  // Haal imageinfo → thumbnail URL
  const info = await api(
    `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&iiurlwidth=1200&titles=${encodeURIComponent(title)}`
  );
  const pages = info?.query?.pages;
  if (!pages) return null;
  const first: any = Object.values(pages)[0];
  return first?.imageinfo?.[0]?.thumburl ?? first?.imageinfo?.[0]?.url ?? null;
}

async function main() {
  const providers = await prisma.provider.findMany({
    where: { heroImage: null, active: true },
    orderBy: { name: 'asc' },
  });
  console.log(`Zoek foto voor ${providers.length} providers zonder heroImage…\n`);

  let ok = 0;
  let fail = 0;

  for (const p of providers) {
    const query = `${p.name} Utrecht`;
    let url: string | null = null;
    let source = '';

    url = await wikipediaPageImage('nl', query);
    if (url) source = 'wiki-nl';
    await sleep(SLEEP_MS);

    if (!url) {
      url = await wikipediaPageImage('en', query);
      if (url) source = 'wiki-en';
      await sleep(SLEEP_MS);
    }

    if (!url) {
      url = await commonsFileSearch(query);
      if (url) source = 'commons';
      await sleep(SLEEP_MS);
    }

    if (url) {
      await prisma.provider
        .update({ where: { id: p.id }, data: { heroImage: url } })
        .catch((e) => console.error(`  DB update failed for ${p.slug}:`, e.message));
      console.log(`✓ ${p.slug} [${source}] → ${url.slice(0, 90)}${url.length > 90 ? '…' : ''}`);
      ok++;
    } else {
      console.log(`✗ ${p.slug} — geen match`);
      fail++;
    }
  }

  console.log(`\nDone. ${ok} ✓ / ${fail} ✗`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

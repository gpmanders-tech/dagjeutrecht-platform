/**
 * Loopt elke provider met websiteUrl af, haalt og:image / twitter:image op,
 * en schrijft naar Provider.heroImage.
 *
 * Run: pnpm db:scrape-images
 */
import { PrismaClient } from '@prisma/client';
import { WEBSITE_URLS } from './website-urls';

const prisma = new PrismaClient();

async function fetchOgImage(pageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; UtrechtNowBot/1.0; +https://utrechtnow.nl)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const html = await res.text();

    const candidates = [
      /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
      /<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i,
      /<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i,
      /<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i,
      /<meta\s+property=["']og:image:url["']\s+content=["']([^"']+)["']/i,
    ];
    for (const re of candidates) {
      const m = html.match(re);
      if (m && m[1]) {
        let url = m[1];
        // Resolve relative URL
        if (url.startsWith('//')) url = `https:${url}`;
        else if (url.startsWith('/')) {
          const base = new URL(pageUrl);
          url = `${base.origin}${url}`;
        }
        return url;
      }
    }
    return null;
  } catch (e: any) {
    console.warn(`  ! ${pageUrl}: ${e.message}`);
    return null;
  }
}

async function main() {
  const slugs = Object.keys(WEBSITE_URLS);
  console.log(`Scraping ${slugs.length} provider websites…\n`);

  let ok = 0;
  let fail = 0;
  for (const slug of slugs) {
    const url = WEBSITE_URLS[slug]!;
    const image = await fetchOgImage(url);
    if (image) {
      await prisma.provider.update({
        where: { slug },
        data: { websiteUrl: url, heroImage: image },
      }).catch(() => null);
      console.log(`✓ ${slug} → ${image.slice(0, 80)}${image.length > 80 ? '…' : ''}`);
      ok++;
    } else {
      // Save websiteUrl anyway so admin kan zien
      await prisma.provider.update({
        where: { slug },
        data: { websiteUrl: url },
      }).catch(() => null);
      console.log(`✗ ${slug} (no og:image)`);
      fail++;
    }
    // gentle delay om sites niet te hameren
    await new Promise((r) => setTimeout(r, 200));
  }
  console.log(`\nDone. ${ok} ✓ / ${fail} ✗`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

import type { MetadataRoute } from 'next';
import { prisma } from '@utrecht/db';
import { BOUWSTENEN, PAKKETTEN } from '../lib/aanbod';
import { PADEN, SLUGS, VERTAALD, detailPad, type PaginaSleutel, type Taal } from '../lib/talen';

const BASE = 'https://dagjeutrecht.nl';

/** Volledige adressen van een pagina in alle talen, voor hreflang in de sitemap. */
function talen(adressen: Record<Taal, string>) {
  return {
    languages: {
      nl: `${BASE}${adressen.nl === '/' ? '' : adressen.nl}`,
      en: `${BASE}${adressen.en}`,
      de: `${BASE}${adressen.de}`,
      'x-default': `${BASE}${adressen.nl === '/' ? '' : adressen.nl}`,
    },
  };
}

/** Bij een Nederlands adres de vertaalde versies, als die er zijn. */
function alternatesVoor(pad: string) {
  const sleutel = (Object.keys(PADEN) as PaginaSleutel[]).find((k) => PADEN[k].nl === (pad || '/'));
  return sleutel ? { alternates: talen(PADEN[sleutel]) } : {};
}

function detailAlternatesVoor(soort: 'pakket' | 'bouwsteen', slug: string) {
  const en = detailPad('en', soort, slug);
  const de = detailPad('de', soort, slug);
  return en && de ? { alternates: talen({ nl: detailPad('nl', soort, slug)!, en, de }) } : {};
}

/** Engelse en Duitse pagina's (Nederlands blijft de standaard op de bestaande adressen). */
function vertaald(): MetadataRoute.Sitemap {
  const vast: PaginaSleutel[] = [
    'home',
    'pakketten',
    'bouwstenen',
    'bedrijfsuitje',
    'personeelsuitje',
    'familiedag',
    'teambuilding',
    'vrijgezellenfeest',
    'overOns',
    'contact',
    'voorwaarden',
    'privacy',
  ];
  return VERTAALD.flatMap((taal) => [
    ...vast.map((k) => ({
      url: `${BASE}${PADEN[k][taal]}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: k === 'home' ? 0.8 : 0.6,
      alternates: talen(PADEN[k]),
    })),
    ...(['pakket', 'bouwsteen'] as const).flatMap((soort) =>
      Object.keys(SLUGS[soort])
        .filter((slug) => (soort === 'pakket' ? PAKKETTEN : BOUWSTENEN).some((x) => x.slug === slug))
        .map((slug) => ({
          url: `${BASE}${detailPad(taal, soort, slug)}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
          ...detailAlternatesVoor(soort, slug),
        }))
    ),
  ]);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vast: MetadataRoute.Sitemap = [
    '',
    '/pakketten',
    '/bouwstenen',
    '/bedrijfsuitje-utrecht',
    '/personeelsuitje-utrecht',
    '/familiedag-utrecht',
    '/teambuilding-utrecht',
    '/bedrijfsfeest-utrecht',
    '/bedrijfsevenement-utrecht',
    '/schooluitje-utrecht',
    '/vrijgezellenfeest-utrecht',
    '/blog',
    '/over-ons',
    '/escape-room-utrecht',
    '/pingpong-en-vr-utrecht',
    '/boulderen-utrecht',
    '/bowlen-utrecht',
    '/padel-utrecht',
    '/kaasproeverij-utrecht',
    '/contact',
    '/voorwaarden',
    '/privacy',
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
    ...alternatesVoor(path),
  }));

  const pakketten: MetadataRoute.Sitemap = PAKKETTEN.map((p) => ({
    url: `${BASE}/pakketten/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    ...detailAlternatesVoor('pakket', p.slug),
  }));

  const bouwstenen: MetadataRoute.Sitemap = BOUWSTENEN.map((b) => ({
    url: `${BASE}/bouwstenen/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    ...detailAlternatesVoor('bouwsteen', b.slug),
  }));

  let blog: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { domain: 'DAGJEUTRECHT', locale: 'nl', published: true },
      select: { slug: true, updatedAt: true },
    });
    blog = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));
  } catch (e) {
    console.error('Sitemap DB fetch failed:', e);
  }

  return [...vast, ...pakketten, ...bouwstenen, ...blog, ...vertaald()];
}

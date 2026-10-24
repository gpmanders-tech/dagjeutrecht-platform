/**
 * Herbruikbare JSON-LD injector voor per-pagina structured data.
 * Gebruik in server components; renderen tijdens SSR.
 */

const SITE_URL = 'https://dagjeutrecht.nl';

export function Breadcrumbs({ trail }: { trail: Array<{ name: string; url: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: t.url.startsWith('http') ? t.url : `${SITE_URL}${t.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqSchema({ items }: { items: Array<{ q: string; a: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Reviews en gemiddelde score als structured data (DAG-SEO-18). Alleen echte reviews,
 * nooit verzonnen: zonder reviews rendert dit niets.
 */
export function ReviewSchema({
  itemName,
  url,
  reviews,
}: {
  itemName: string;
  url: string;
  reviews: Array<{ auteur: string; tekst: string; score: number; datum?: string }>;
}) {
  if (reviews.length === 0) return null;
  const gemiddelde = reviews.reduce((s, r) => s + r.score, 0) / reviews.length;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: itemName,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: gemiddelde.toFixed(1),
      reviewCount: reviews.length,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.auteur },
      reviewBody: r.tekst,
      reviewRating: { '@type': 'Rating', ratingValue: r.score, bestRating: 5 },
      ...(r.datum ? { datePublished: r.datum } : {}),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function EventOrProductSchema({
  name,
  description,
  price,
  image,
  category,
  url,
}: {
  name: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    category,
    offers:
      price != null
        ? {
            '@type': 'Offer',
            price: (price / 100).toFixed(2),
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
          }
        : undefined,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

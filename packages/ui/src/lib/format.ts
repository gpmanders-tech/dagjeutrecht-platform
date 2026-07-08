export function formatEuro(cents: number, locale = 'nl-NL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatDate(date: Date | string, locale = 'nl-NL') {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Foto-URL voor een leverancier. Geeft `heroImage` (gescraped/geüpload) als gezet,
 * anders een stabiele picsum-fallback per slug.
 */
export function providerImageUrl(slug: string, w = 400, h = 240, heroImage?: string | null) {
  if (heroImage) return heroImage;
  return `https://picsum.photos/seed/utrechtnow-${slug}/${w}/${h}`;
}

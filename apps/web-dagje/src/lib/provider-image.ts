/**
 * Bepaal welke afbeelding voor een provider getoond wordt.
 * Prioriteit:
 *  1. echte heroImage (uit og:image-scrape of admin upload)
 *  2. loremflickr met categorie-thema (mensen die de activiteit doen)
 *  3. picsum als laatste redmiddel
 */

const CATEGORY_QUERIES: Record<string, string> = {
  WATER: 'paddleboarding,canal,friends',
  INDOOR: 'bowling,indoor,friends',
  WORKSHOP: 'workshop,craft,people',
  WORKSHOP_SERIES: 'workshop,craft,people',
  MUSEUM: 'museum,visitors',
  ATTRACTION: 'tourism,landmark,city',
  TOUR: 'tour,walking,city',
  HOTEL: 'hotel,room,lobby',
  RESTAURANT: 'restaurant,dining,friends',
  EVENT: 'concert,theater,stage',
  WELLNESS: 'spa,sauna,wellness',
  SHOP: 'shop,gift,souvenir',
  GIFTCARD: 'gift,voucher',
};

/** Numerieke hash op de slug - loremflickr's ?lock= wil een integer. */
function slugHash(slug: string): number {
  let h = 5381;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 33) ^ slug.charCodeAt(i);
  }
  return Math.abs(h);
}

export function providerImage(
  provider: { slug: string; heroImage?: string | null; category?: string },
  size: 'sm' | 'md' | 'lg' = 'md'
): string {
  if (provider.heroImage) return provider.heroImage;
  const dims = { sm: [400, 300], md: [800, 500], lg: [1600, 900] }[size];
  const [w, h] = dims;
  const q = provider.category ? CATEGORY_QUERIES[provider.category] : null;
  if (q) {
    return `https://loremflickr.com/${w}/${h}/${q}?lock=${slugHash(provider.slug)}`;
  }
  return `https://picsum.photos/seed/${encodeURIComponent(provider.slug)}/${w}/${h}`;
}

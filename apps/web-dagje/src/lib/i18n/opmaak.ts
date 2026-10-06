/**
 * Bedragen en datums in de Engelse en Duitse schrijfwijze. De bedragen zelf komen
 * altijd uit aanbod.ts; alleen de notatie verschilt (€ 7,50 / €7.50 / 7,50 €).
 */
import { PAKKETTEN, prijsPerPersoon, vindBouwsteen, vindPakket, type Maanden } from '../aanbod';
import type { Taal } from '../talen';
import { vul } from './vul';

const LOCALE: Record<Taal, string> = { nl: 'nl-NL', en: 'en-GB', de: 'de-DE' };

export function formatPrijs(taal: Taal, cents: number) {
  // Hele euro's zonder decimalen, anders altijd twee cijfers (zoals formatEuro in aanbod.ts).
  const decimalen = cents % 100 === 0 ? 0 : 2;
  const getal = (cents / 100).toLocaleString(LOCALE[taal], {
    minimumFractionDigits: decimalen,
    maximumFractionDigits: 2,
  });
  if (taal === 'en') return `€${getal}`;
  if (taal === 'de') return `${getal} €`;
  return `€ ${getal}`;
}

export function formatDatumIn(taal: Taal, iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString(LOCALE[taal], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Prijs per persoon van een pakket, in de notatie van de taal. */
export function pakketPrijs(taal: Taal, slug: string) {
  const p = vindPakket(slug);
  return p ? formatPrijs(taal, prijsPerPersoon(p.blokken)) : '';
}

/** Prijs per persoon van een bouwsteen, in de notatie van de taal. */
export function bouwsteenPrijs(taal: Taal, slug: string) {
  const b = vindBouwsteen(slug);
  return b ? formatPrijs(taal, b.verkoopCents) : '';
}

/** Laagste prijs uit een rij pakketten. */
export function vanafPrijs(taal: Taal, slugs: string[]) {
  const centen = slugs.map((slug) => {
    const p = vindPakket(slug);
    return p ? prijsPerPersoon(p.blokken) : Number.POSITIVE_INFINITY;
  });
  return formatPrijs(taal, Math.min(...centen));
}

/** Goedkoopste pakket van de hele site. */
export function goedkoopste() {
  return Math.min(...PAKKETTEN.map((p) => prijsPerPersoon(p.blokken)));
}

export function maandenIn(maanden: string[], sjabloon: string, m: Maanden) {
  return vul(sjabloon, { van: maanden[m.van - 1]!, tot: maanden[m.tot - 1]! });
}

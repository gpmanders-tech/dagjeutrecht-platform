export type GiftOption = {
  slug: string;
  title: string;
  priceCents: number;
  description: string;
  isBox?: boolean;
};

export const GIFT_OPTIONS: GiftOption[] = [
  {
    slug: 'gift-25',
    title: 'Cadeaubon € 25',
    priceCents: 2500,
    description: 'Voor een kleine attentie: koffie met gebak, een museum-entree of een klein aandeel in een dagje.',
  },
  {
    slug: 'gift-50',
    title: 'Cadeaubon € 50',
    priceCents: 5000,
    description: 'De alleskunner. Genoeg voor een halve dag: een activiteit + lunch.',
  },
  {
    slug: 'gift-100',
    title: 'Cadeaubon € 100',
    priceCents: 10000,
    description: 'Een compleet dagje Utrecht voor twee - inclusief activiteit, lunch en borrel.',
  },
  {
    slug: 'gift-belevenisbox',
    title: 'Belevenisbox Duo',
    priceCents: 8900,
    description: 'Kant-en-klaar cadeau: keuze uit meerdere arrangementen voor twee personen. Op naam verstuurd.',
    isBox: true,
  },
];

export function findGiftOption(slug: string): GiftOption | null {
  return GIFT_OPTIONS.find((g) => g.slug === slug) ?? null;
}

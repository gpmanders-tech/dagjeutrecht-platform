export type AudienceSlug = 'teamuitje' | 'studenten' | 'schoolgroep' | 'gezin' | 'vrijgezel';

export const AUDIENCES: Array<{
  slug: AudienceSlug;
  db: 'TEAM' | 'STUDENT' | 'SCHOOL' | 'FAMILY' | 'BACHELORETTE';
  title: string;
  tagline: string;
  heroEmoji: string;
  accentClass: string;
  /** Categorieën waarvan we een sfeerfoto proberen te tonen op de tegels (in volgorde). */
  photoCategories: Array<
    'INDOOR' | 'WORKSHOP' | 'WATER' | 'TOUR' | 'MUSEUM' | 'ATTRACTION' | 'RESTAURANT' | 'WELLNESS' | 'EVENT'
  >;
  /** SEO-landingspagina URL - voor betere Google-ranking op de directe zoekterm. */
  landingUrl?: string;
  intro: string;
  faq: Array<{ q: string; a: string }>;
}> = [
  {
    slug: 'teamuitje',
    db: 'TEAM',
    title: 'Teamuitjes',
    tagline: 'Bedrijven, ZZP-clubs, MT-dagen',
    heroEmoji: '🤝',
    accentClass: 'bg-canal-800 text-cream',
    photoCategories: ['INDOOR', 'WORKSHOP', 'RESTAURANT'],
    landingUrl: '/bedrijfsuitje-utrecht',
    intro:
      'Een teamuitje in Utrecht dat blijft hangen - mét borrel, mét lunch, mét factuur op naam van de zaak. Wij regelen alles, jullie hoeven alleen op te dagen.',
    faq: [
      { q: 'Krijgen we een factuur op naam bedrijf?', a: 'Ja, altijd. BTW-nummer opgeven en je krijgt binnen 48u een vrijblijvende offerte via WeFact.' },
      { q: 'Vanaf hoeveel personen?', a: 'Vanaf 6 personen boeken we al een compleet programma. Grote groepen (30+) ook geen probleem.' },
    ],
  },
  {
    slug: 'studenten',
    db: 'STUDENT',
    title: 'Studentenclubjes',
    tagline: 'Verenigingen, disputen, huizen, commissies en jaarclubs',
    heroEmoji: '🍻',
    accentClass: 'bg-terracotta-500 text-white',
    photoCategories: ['WATER', 'INDOOR', 'RESTAURANT'],
    intro:
      'Voor het studentenbudget zonder in te leveren op de sfeer: pubcrawls, escaperooms, waterspektakel en de beste borrelplekken van Utrecht.',
    faq: [
      { q: 'Hebben jullie ook budget-arrangementen?', a: 'Ja - programma vanaf €25 p.p. (halve dag) is haalbaar.' },
      { q: 'Kunnen we ook voor een huis, commissie of jaarclub een programma laten maken?', a: 'Zeker - geef bij aanvraag door wat voor gezelschap het is, dan stemmen we het karakter van de dag daarop af.' },
    ],
  },
  {
    slug: 'schoolgroep',
    db: 'SCHOOL',
    title: 'Schoolgroepen',
    tagline: 'Basisschool t/m mbo, groep 8 afscheid',
    heroEmoji: '🎒',
    accentClass: 'bg-emerald-700 text-white',
    photoCategories: ['MUSEUM', 'ATTRACTION', 'TOUR'],
    landingUrl: '/schooluitje-utrecht',
    intro:
      'Educatief, veilig en zonder gedoe. We stemmen altijd af met de begeleider en denken mee over leerdoelen, allergieën en vervoer.',
    faq: [
      { q: 'Kunnen we op factuur op naam school betalen?', a: 'Ja, dat is standaard.' },
      { q: 'Wat als het regent?', a: 'Elk programma heeft een indoor-alternatief. We bellen bij twijfel de dag ervoor.' },
    ],
  },
  {
    slug: 'gezin',
    db: 'FAMILY',
    title: 'Gezinnen',
    tagline: 'Kindvriendelijk, familiepakketten',
    heroEmoji: '👨‍👩‍👧',
    accentClass: 'bg-amber-500 text-canal-900',
    photoCategories: ['MUSEUM', 'WATER', 'ATTRACTION'],
    intro:
      'Een dag Utrecht waar ouders én kinderen van genieten. Van Nijntje tot spelen bij het water - met slechtweer-alternatieven en betaalbare familiepakketten.',
    faq: [
      { q: 'Is alles rolstoel-toegankelijk?', a: 'De meeste programma\'s wel - geef bij aanvraag aan wat nodig is, dan houden we rekening.' },
      { q: 'Wat kost het gemiddeld?', a: 'Familiedag inclusief lunch: €35-55 per persoon.' },
    ],
  },
  {
    slug: 'vrijgezel',
    db: 'BACHELORETTE',
    title: 'Vrijgezellenfeesten',
    tagline: 'BJ / BA - 8 tot 16 personen',
    heroEmoji: '👰',
    accentClass: 'bg-pink-500 text-white',
    photoCategories: ['WELLNESS', 'WATER', 'WORKSHOP'],
    landingUrl: '/vrijgezellenfeest-utrecht',
    intro:
      'Utrechtse vrijgezellendag met stijl: workshops, waterpret, borrel, diner. We fixen ook de kroon.',
    faq: [
      { q: 'Hebben jullie ook mannen-varianten?', a: 'Zeker - bierproefsessies, bootcamp, escaperoom of gewoon lekker uit eten.' },
      { q: 'Kunnen we last-minute?', a: 'Meestal wel als het minimaal 2 weken van tevoren is. Bel even.' },
    ],
  },
];

export function findAudience(slug: string) {
  return AUDIENCES.find((a) => a.slug === slug) ?? null;
}

/**
 * Talen van DagjeUtrecht.nl (sinds oktober 2026, akkoord Ger).
 *
 * Nederlands is de standaard en staat zonder voorvoegsel op de bestaande adressen.
 * Engels staat onder /en, Duits onder /de, met vertaalde paden. Er is bewust geen
 * middleware: de Nederlandse pagina's blijven precies zoals ze waren (statisch, zelfde
 * adressen, zelfde redirects). De Engelse en Duitse pagina's zijn gewone mappen in
 * src/app/en en src/app/de.
 *
 * Dit bestand is klein gehouden omdat de taalknop in de kop (een client-component)
 * het gebruikt: hier staan alleen de adressen, geen teksten.
 */

export type Taal = 'nl' | 'en' | 'de';
/** De vertaalde talen; Nederlands is het origineel. */
export type Vertaald = Exclude<Taal, 'nl'>;

export const TALEN: Taal[] = ['nl', 'en', 'de'];
export const VERTAALD: Vertaald[] = ['en', 'de'];

export const TAAL_INFO: Record<Taal, { kort: string; naam: string; og: string; schema: string }> = {
  nl: { kort: 'NL', naam: 'Nederlands', og: 'nl_NL', schema: 'nl-NL' },
  en: { kort: 'EN', naam: 'English', og: 'en_GB', schema: 'en' },
  de: { kort: 'DE', naam: 'Deutsch', og: 'de_DE', schema: 'de' },
};

/** Pagina's die in alle drie de talen bestaan. */
export type PaginaSleutel =
  | 'home'
  | 'pakketten'
  | 'bouwstenen'
  | 'boeken'
  | 'betaald'
  | 'contact'
  | 'overOns'
  | 'voorwaarden'
  | 'privacy'
  | 'bedrijfsuitje'
  | 'teambuilding'
  | 'personeelsuitje'
  | 'vrijgezellenfeest'
  | 'familiedag';

export const PADEN: Record<PaginaSleutel, Record<Taal, string>> = {
  home: { nl: '/', en: '/en', de: '/de' },
  pakketten: { nl: '/pakketten', en: '/en/packages', de: '/de/pakete' },
  bouwstenen: { nl: '/bouwstenen', en: '/en/activities', de: '/de/aktivitaeten' },
  boeken: { nl: '/boeken', en: '/en/book', de: '/de/buchen' },
  betaald: { nl: '/betaald', en: '/en/paid', de: '/de/bezahlt' },
  contact: { nl: '/contact', en: '/en/contact', de: '/de/kontakt' },
  overOns: { nl: '/over-ons', en: '/en/about-us', de: '/de/ueber-uns' },
  voorwaarden: { nl: '/voorwaarden', en: '/en/terms', de: '/de/agb' },
  privacy: { nl: '/privacy', en: '/en/privacy', de: '/de/datenschutz' },
  bedrijfsuitje: {
    nl: '/bedrijfsuitje-utrecht',
    en: '/en/company-outing-utrecht',
    de: '/de/firmenausflug-utrecht',
  },
  teambuilding: {
    nl: '/teambuilding-utrecht',
    en: '/en/team-building-utrecht',
    de: '/de/teambuilding-utrecht',
  },
  personeelsuitje: {
    nl: '/personeelsuitje-utrecht',
    en: '/en/staff-outing-utrecht',
    de: '/de/betriebsausflug-utrecht',
  },
  vrijgezellenfeest: {
    nl: '/vrijgezellenfeest-utrecht',
    en: '/en/bachelor-party-utrecht',
    de: '/de/junggesellenabschied-utrecht',
  },
  familiedag: {
    nl: '/familiedag-utrecht',
    en: '/en/family-day-utrecht',
    de: '/de/familientag-utrecht',
  },
};

/**
 * Vertaalde slugs van pakketten en bouwstenen, op de Nederlandse slug (die blijft
 * de sleutel overal in de code, in de boeking en bij de inkoop-agent).
 * Een pakket of bouwsteen zonder regel hier heeft (nog) geen Engelse of Duitse
 * pagina: hij verschijnt dan ook niet in de Engelse of Duitse overzichten. Een nieuw
 * pakket dus hier en in lib/i18n/aanbod-en.ts en aanbod-de.ts toevoegen.
 */
export const SLUGS: Record<'pakket' | 'bouwsteen', Record<string, Record<Vertaald, string>>> = {
  pakket: {
    'warme-winterdag': { en: 'warm-winter-day', de: 'warmer-wintertag' },
    'amelisweerd-actief': { en: 'active-amelisweerd', de: 'amelisweerd-aktiv' },
    'spel-en-borrel': { en: 'games-and-drinks', de: 'spiel-und-umtrunk' },
    'water-naar-borrel': { en: 'from-the-water-to-drinks', de: 'vom-wasser-zum-umtrunk' },
    schooluitje: { en: 'school-trip', de: 'schulausflug' },
    'boules-en-borrel': { en: 'boules-and-drinks', de: 'boule-und-umtrunk' },
    'dom-en-grachten': { en: 'dom-tower-and-canals', de: 'domturm-und-grachten' },
    'water-en-picknick': { en: 'water-and-picnic', de: 'wasser-und-picknick' },
    winterborrel: { en: 'winter-drinks', de: 'winter-umtrunk' },
    'koffie-en-city-challenge': {
      en: 'coffee-and-city-challenge',
      de: 'kaffee-und-city-challenge',
    },
    'schoolreis-basisschool': { en: 'primary-school-trip', de: 'grundschulausflug' },
    'vrijgezellen-winterdag': { en: 'bachelor-party-winter-day', de: 'jga-wintertag' },
  },
  bouwsteen: {
    'koffie-met-gebak': { en: 'coffee-and-cake', de: 'kaffee-und-kuchen' },
    'jeu-de-boules': { en: 'jeu-de-boules', de: 'boule' },
    shuffleboard: { en: 'shuffleboard', de: 'shuffleboard' },
    domtoren: { en: 'dom-tower', de: 'domturm' },
    rondvaart: { en: 'canal-cruise', de: 'grachtenfahrt' },
    groepslunch: { en: 'group-lunch', de: 'gruppen-mittagessen' },
    borrel: { en: 'closing-drinks', de: 'abschluss-umtrunk' },
    gluhwein: { en: 'mulled-wine-welcome', de: 'gluehwein-empfang' },
    winterlunch: { en: 'winter-lunch', de: 'winter-mittagessen' },
    'city-challenge': { en: 'city-challenge', de: 'city-challenge' },
    kanoen: { en: 'canoeing', de: 'kanufahren' },
    suppen: { en: 'stand-up-paddling', de: 'stand-up-paddling' },
    picknick: { en: 'picnic', de: 'picknick' },
    bbq: { en: 'bbq', de: 'grillen' },
    'kickbike-tocht': { en: 'kickbike-tour', de: 'kickbike-tour' },
  },
};

const DETAIL: Record<'pakket' | 'bouwsteen', PaginaSleutel> = {
  pakket: 'pakketten',
  bouwsteen: 'bouwstenen',
};

/** Adres van een vaste pagina in een taal. */
export function pad(taal: Taal, sleutel: PaginaSleutel) {
  return PADEN[sleutel][taal];
}

/** Adres van een pakket- of bouwsteenpagina, op de Nederlandse slug. Null als die taal er geen heeft. */
export function detailPad(
  taal: Taal,
  soort: 'pakket' | 'bouwsteen',
  nlSlug: string,
): string | null {
  const basis = PADEN[DETAIL[soort]][taal];
  if (taal === 'nl') return `${basis}/${nlSlug}`;
  const slug = SLUGS[soort][nlSlug]?.[taal];
  return slug ? `${basis}/${slug}` : null;
}

/** Zoekt bij een vertaalde slug de Nederlandse slug terug. */
export function nlSlug(taal: Vertaald, soort: 'pakket' | 'bouwsteen', slug: string): string | null {
  const hit = Object.entries(SLUGS[soort]).find(([, v]) => v[taal] === slug);
  return hit ? hit[0] : null;
}

/** Welke taal hoort bij een adres. */
export function taalVanPad(pathname: string): Taal {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de';
  return 'nl';
}

/**
 * Het adres van dezelfde pagina in een andere taal, voor de taalknop.
 * Bestaat de pagina in die taal niet (blog, kleine activiteitenpagina's), dan
 * gaat de knop naar de voorpagina van die taal.
 */
export function vertaalPad(pathname: string, doel: Taal): string {
  const pad0 = pathname.replace(/\/+$/, '') || '/';
  const bron = taalVanPad(pad0);

  for (const sleutel of Object.keys(PADEN) as PaginaSleutel[]) {
    if (PADEN[sleutel][bron] === pad0) return PADEN[sleutel][doel];
  }
  for (const soort of ['pakket', 'bouwsteen'] as const) {
    const basis = PADEN[DETAIL[soort]][bron];
    if (pad0.startsWith(`${basis}/`)) {
      const slug = pad0.slice(basis.length + 1);
      const nl = bron === 'nl' ? (SLUGS[soort][slug] ? slug : null) : nlSlug(bron, soort, slug);
      const doelPad = nl ? detailPad(doel, soort, nl) : null;
      if (doelPad) return doelPad;
    }
  }
  return PADEN.home[doel];
}

/**
 * hreflang en canonical voor een pagina die in alle talen bestaat.
 * Relatieve adressen: metadataBase in de layout maakt er volledige adressen van.
 */
export function talenAlternates(taal: Taal, adressen: Record<Taal, string>) {
  return {
    canonical: adressen[taal],
    languages: {
      nl: adressen.nl,
      en: adressen.en,
      de: adressen.de,
      'x-default': adressen.nl,
    },
  };
}

export function paginaAlternates(taal: Taal, sleutel: PaginaSleutel) {
  return talenAlternates(taal, PADEN[sleutel]);
}

/** Alternates voor een pakket of bouwsteen; zonder vertaling alleen de canonical. */
export function detailAlternates(taal: Taal, soort: 'pakket' | 'bouwsteen', nl: string) {
  const en = detailPad('en', soort, nl);
  const de = detailPad('de', soort, nl);
  const eigen = detailPad(taal, soort, nl)!;
  if (!en || !de) return { canonical: eigen };
  return talenAlternates(taal, { nl: detailPad('nl', soort, nl)!, en, de });
}

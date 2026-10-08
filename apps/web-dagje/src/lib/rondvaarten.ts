import type { Foto } from './fotos';

/**
 * Rondvaarten van Rederij Schuttevaer die je direct boekt via FareHarbor (sinds 8-10-2026).
 *
 * DagjeUtrecht is affiliate van Schuttevaer in FareHarbor met de shortname `dagjeutrecht-eur`.
 * Elke boeklink draagt `asn=dagjeutrecht-eur`, zodat FareHarbor de boeking aan ons toeschrijft.
 * De klant boekt en betaalt rechtstreeks bij Schuttevaer; wij noemen dus geen eigen prijs
 * (de commissie wordt nog afgesproken). De teksten zijn eigen omschrijvingen op basis van de
 * publieke itemdata: https://fareharbor.com/api/v1/companies/schuttevaer/items/
 *
 * Bewust niet opgenomen: de cadeaubon, de prikkelarme rondvaart (geen vaardata ingepland)
 * en de Vecht-rondvaart (geen vaardata tot en met juni 2027). Komen daar data bij, dan kan
 * het item hier zo terug.
 */

export const FH_BEDRIJF = 'schuttevaer';
export const FH_AFFILIATE = 'dagjeutrecht-eur';

/** Het officiële FareHarbor-script: opent boeklinks in een venster op onze eigen pagina. */
export const FH_LIGHTFRAME_SCRIPT = 'https://fareharbor.com/embeds/api/v1/?autolightframe=yes';

/** Boeklink voor een item van Schuttevaer, met onze affiliate-code. */
export function boekLink(pk: number): string {
  const q = new URLSearchParams({
    asn: FH_AFFILIATE,
    'asn-ref': 'dagjeutrecht',
    'full-items': 'yes',
    flow: 'no',
    branding: 'yes',
    language: 'nl-nl',
  });
  return `https://fareharbor.com/embeds/book/${FH_BEDRIJF}/items/${pk}/?${q.toString()}`;
}

export type RondvaartSoort = 'groep' | 'eten' | 'stad' | 'buiten';

export type Rondvaart = {
  /** Anker op de pagina. */
  id: string;
  soort: RondvaartSoort;
  naam: string;
  omschrijving: string;
  /** Korte regel in de gekleurde balk van de kaart: plek en vaartijd. */
  balk: string;
  duur: string;
  vertrek: string;
  groep?: string;
  letOp?: string;
  /** Eén item, of een paar varianten (bijvoorbeeld 1 uur en 1,5 uur) met elk een eigen knop. */
  boeken: Array<{ pk: number; knop: string }>;
  foto: Foto;
  /** Seizoensvaart: na deze datum (JJJJ-MM-DD) verdwijnt hij van de pagina. */
  zichtbaarTot?: string;
};

const foto = (naam: string, alt: string): Foto => ({ src: `/fotos/${naam}.jpg`, alt });

export const SOORTEN: Record<RondvaartSoort, { titel: string; sticker: string; uitleg: string }> = {
  groep: {
    titel: 'Een boot voor je groep',
    sticker: 'Privé varen',
    uitleg: 'Een eigen boot met schipper, alleen voor jullie gezelschap. Catering en drankjes kunnen erbij.',
  },
  eten: {
    titel: 'Varen en eten',
    sticker: 'Met eten erbij',
    uitleg: 'Eerst door de grachten, daarna aan tafel. Je boekt de rondvaart en de maaltijd in één keer.',
  },
  stad: {
    titel: 'Door de grachten',
    sticker: 'Rondvaart',
    uitleg: 'Over de Oudegracht en de singels, langs de werfkelders, bruggen en de Domtoren.',
  },
  buiten: {
    titel: 'De stad uit',
    sticker: 'Op de Kromme Rijn',
    uitleg: 'Varen door het groen van Amelisweerd en naar Theehuis Rhijnauwen. Deze vaarten gaan op een paar vaste dagen per maand.',
  },
};

const OUDEGRACHT = 'Oudegracht 85, bij de Viebrug';
const HOOG_CATHARIJNE = 'Catharijne Esplanade, naast nummer 8 (Hoog Catharijne)';

export const RONDVAARTEN: Rondvaart[] = [
  {
    id: 'prive-fluisterboot',
    balk: 'Oudegracht · 1 of 1,5 uur',
    soort: 'groep',
    naam: 'Privé fluisterboot',
    omschrijving:
      'Een elektrische fluisterboot alleen voor jullie, met een vaste bank in U-vorm zodat iedereen elkaar ziet. De schipper vaart je over de grachten en singels; catering en drankjes zijn mogelijk.',
    duur: '1 of 1,5 uur',
    vertrek: OUDEGRACHT,
    groep: 'tot 26 personen, met catering tot 20',
    letOp: 'Er is geen toilet aan boord.',
    boeken: [{ pk: 219242, knop: 'Direct boeken' }],
    foto: foto('schuttevaer-fluisterboot', 'Rondvaartboot op een groene singel in Utrecht'),
  },
  {
    id: 'humphreys',
    balk: 'Oudegracht · varen en diner',
    soort: 'eten',
    naam: "Rondvaart en diner bij Humphrey's",
    omschrijving:
      "Een rondvaart door de stad en daarna een driegangendiner bij Humphrey's, midden in het centrum. Rood pluche, kroonluchters en een Moulin Rouge-sfeer: geschikt voor een avond uit met collega's.",
    duur: 'rondvaart 1 of 1,5 uur, voor het diner 2,5 uur',
    vertrek: 'Oudegracht',
    groep: 'vanaf 2 personen; met meer dan 35 personen even contact opnemen',
    letOp: 'Het restaurant opent om 17.00 uur.',
    boeken: [
      { pk: 255646, knop: 'Boek met 1 uur varen' },
      { pk: 255641, knop: 'Boek met 1,5 uur varen' },
    ],
    foto: foto('schuttevaer-humphreys', "Restaurant Humphrey's in Utrecht met rode banken en kroonluchters"),
  },
  {
    id: 'bistro-aan-de-werf',
    balk: 'Oudegracht · varen en lunch of diner',
    soort: 'eten',
    naam: 'Rondvaart en eten bij Bistro aan de Werf',
    omschrijving:
      'Na de rondvaart stap je van boord, steek je de gracht over en schuif je aan bij Bistro aan de Werf aan de Oudegracht. Je eet op het terras of in de werfkelder.',
    duur: 'rondvaart 1 of 1,5 uur, daarna lunch of diner',
    vertrek: 'Oudegracht',
    letOp: 'Lunch alleen op vrijdag en zaterdag; diner vanaf 17.00 uur.',
    boeken: [
      { pk: 678984, knop: 'Boek met 1 uur varen' },
      { pk: 679032, knop: 'Boek met 1,5 uur varen' },
    ],
    foto: foto('schuttevaer-bistro-aan-de-werf', 'Gedekte tafels in de werfkelder van Bistro aan de Werf'),
  },
  {
    id: 'balkangrill-boro',
    balk: 'Oudegracht · varen en lunch of diner',
    soort: 'eten',
    naam: 'Rondvaart en eten bij Balkangrill Boro',
    omschrijving:
      'Een rondvaart over de Oudegracht langs stadskastelen, kerken en grachtenhuizen. De boot stopt voor de deur van Balkangrill Boro, waar je aan de lunch of het diner gaat.',
    duur: 'rondvaart 1 of 1,5 uur, daarna lunch of diner',
    vertrek: 'Oudegracht',
    boeken: [
      { pk: 279016, knop: 'Boek met 1 uur varen' },
      { pk: 323363, knop: 'Boek met 1,5 uur varen' },
    ],
    foto: foto('schuttevaer-boro', 'Terras van Balkangrill Boro aan de werf van de Oudegracht'),
  },
  {
    id: 'bunk-hotel',
    balk: 'Hoog Catharijne · varen en ontbijt',
    soort: 'eten',
    naam: 'Rondvaart en ontbijt bij Bunk Hotel',
    omschrijving:
      'Een rondvaart van een uur door Utrecht met een digitale gids, gecombineerd met een ontbijt bij Bunk Hotel aan de Catharijnesingel.',
    duur: 'rondvaart 1 uur, plus ontbijt',
    vertrek: 'Hoog Catharijne',
    boeken: [{ pk: 729945, knop: 'Direct boeken' }],
    foto: foto('schuttevaer-catharijnesingel', 'De Catharijnesingel in Utrecht met de kerk van Bunk Hotel'),
  },
  {
    id: 'rondvaart-utrecht',
    balk: 'Oudegracht · 1 of 1,5 uur',
    soort: 'stad',
    naam: 'Rondvaart Utrecht',
    omschrijving:
      'De klassieke rondvaart over de Oudegracht en de Catharijnesingel, langs werfkelders, bruggen en de Domtoren, met uitleg in meerdere talen. De vaart van anderhalf uur gaat ook over de singels aan de oostkant van de stad.',
    duur: '1 of 1,5 uur',
    vertrek: OUDEGRACHT,
    letOp: 'Kom 10 minuten van tevoren en meld je bij de kassa.',
    boeken: [
      { pk: 212384, knop: 'Boek 1 uur' },
      { pk: 212392, knop: 'Boek 1,5 uur' },
    ],
    foto: foto('schuttevaer-rondvaart-oudegracht', 'Rondvaartboot op een Utrechtse gracht tussen de bomen'),
  },
  {
    id: 'hoog-catharijne',
    balk: 'Hoog Catharijne · 1 uur',
    soort: 'stad',
    naam: 'Rondvaart vanaf Hoog Catharijne',
    omschrijving:
      'Dezelfde rondvaart over de Catharijnesingel en de Oudegracht, maar je stapt op onder Hoog Catharijne, naast Utrecht Centraal. Onderweg krijg je uitleg in meerdere talen.',
    duur: '1 uur',
    vertrek: HOOG_CATHARIJNE,
    letOp: 'De kiosk zit binnen op de foodcourt bij de ingang van de parkeergarage.',
    boeken: [{ pk: 436638, knop: 'Direct boeken' }],
    foto: foto('schuttevaer-rondvaartboot-gracht', 'Rondvaartboot van Schuttevaer op de gracht in de zon'),
  },
  {
    id: 'open-sloep',
    balk: 'Oudegracht · 1 uur',
    soort: 'stad',
    naam: 'Rondvaart in de open sloep',
    omschrijving:
      'Sloep De Dolfijn is een open boot met 35 zitplaatsen in U-vorm en een hoge rugleuning. Je vaart een uur door de grachten, met een drankje erbij. De boot voor mooi weer.',
    duur: '1 uur',
    vertrek: OUDEGRACHT,
    groep: '35 zitplaatsen',
    boeken: [{ pk: 562424, knop: 'Direct boeken' }],
    foto: foto('schuttevaer-sloep', 'Open sloep op de Oudegracht met de Domtoren op de achtergrond'),
  },
  {
    id: 'varende-kerstverhalen',
    balk: 'Oudegracht · 1 uur · december',
    soort: 'stad',
    naam: 'Varende Kerstverhalen',
    omschrijving:
      'Een uur varen door de binnenstad terwijl een verhalenverteller aan boord "De Kerstroos" van Selma Lagerlöf vertelt. Alleen rond de kerst.',
    duur: '1 uur',
    vertrek: 'Oudegracht 85',
    boeken: [{ pk: 557751, knop: 'Direct boeken' }],
    foto: foto('schuttevaer-kerstverhalen', 'Open boek met lichtjes'),
    zichtbaarTot: '2026-12-31',
  },
  {
    id: 'amelisweerd',
    balk: 'Rhijnauwen · 1 uur',
    soort: 'buiten',
    naam: 'Rondvaart Amelisweerd',
    omschrijving:
      'Een uur varen door landgoed Amelisweerd, een parkbos van zo’n 300 hectare dat rond 1765 is aangelegd. De schipper vertelt onderweg over het gebied.',
    duur: '1 uur',
    vertrek: 'Steiger van Theehuis Rhijnauwen',
    boeken: [{ pk: 212421, knop: 'Direct boeken' }],
    foto: foto('schuttevaer-amelisweerd', 'Houten brug over de Kromme Rijn in Amelisweerd'),
  },
  {
    id: 'dagtocht-rhijnauwen',
    balk: 'Oudegracht · hele dag',
    soort: 'buiten',
    naam: 'Dagtocht Rhijnauwen',
    omschrijving:
      'Over de Kromme Rijn langs Oud- en Nieuw-Amelisweerd naar Theehuis Rhijnauwen, waar je aanlegt om te wandelen of een pannenkoek te eten. Een complete rondvaart door de stad zit erbij.',
    duur: 'van 10.30 tot 16.00 uur, met een tussenstop',
    vertrek: OUDEGRACHT,
    letOp: 'Gaat door vanaf 10 deelnemers.',
    boeken: [{ pk: 212401, knop: 'Direct boeken' }],
    foto: foto('schuttevaer-rhijnauwen', 'Rondvaartboot aangemeerd aan de Kromme Rijn bij Rhijnauwen'),
  },
];

/** De vaarten die vandaag op de pagina horen (seizoensvaarten verdwijnen na hun datum). */
export function actueleRondvaarten(vandaag = new Date().toISOString().slice(0, 10)): Rondvaart[] {
  return RONDVAARTEN.filter((r) => !r.zichtbaarTot || vandaag <= r.zichtbaarTot);
}

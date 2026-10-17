/**
 * Vaste bouwstenen en pakketten van DagjeUtrecht.
 *
 * Dit bestand is de enige bron voor wat klanten kunnen boeken. De inkoop-agent
 * gebruikt dezelfde gegevens (leverancier, inkoopniveau, tijden, aantallen).
 *
 * prijsBevestigd: false = inkoopprijs is een schatting (oude calculatie, website
 * leverancier of seed) en moet nog met de leverancier worden afgesproken.
 */

export type TijdvakId = 'ontvangst' | 'ochtend' | 'lunch' | 'middag' | 'afsluiting';
export type Cluster = 'centrum' | 'amelisweerd' | 'beide';
export type LeverancierId = 'BHG' | 'RIJNSTROOM' | 'STEPVERHUUR' | 'DOMTOREN' | 'SCHUTTEVAER' | 'EIGEN';

export const TIJDVAKKEN: Array<{ id: TijdvakId; naam: string; van: string; tot: string }> = [
  { id: 'ontvangst', naam: 'Ontvangst', van: '09:30', tot: '10:00' },
  { id: 'ochtend', naam: 'Ochtend', van: '10:00', tot: '12:00' },
  { id: 'lunch', naam: 'Lunch', van: '12:30', tot: '13:30' },
  { id: 'middag', naam: 'Middag', van: '14:00', tot: '16:00' },
  { id: 'afsluiting', naam: 'Afsluiting', van: '16:30', tot: '18:00' },
];

export const CLUSTERS: Record<Cluster, { naam: string; uitleg: string }> = {
  centrum: {
    naam: 'Centrum',
    uitleg: 'Rond Paardenveld en de Oudegracht, op loopafstand van Utrecht Centraal.',
  },
  amelisweerd: {
    naam: 'Amelisweerd',
    uitleg: 'Bij Botenverhuur De Rijnstroom, Weg naar Rhijnauwen 2, aan de Kromme Rijn.',
  },
  beide: {
    naam: 'Centrum en Amelisweerd',
    uitleg: 'Verbindt het centrum met Amelisweerd.',
  },
};

export const LEVERANCIERS: Record<
  LeverancierId,
  { naam: string; inkoopNiveau: 1 | 2; inkoopWijze: string }
> = {
  BHG: {
    naam: 'Brothers Horeca Groep (JEU de boules bar, The Grand Shuffle)',
    inkoopNiveau: 2,
    inkoopWijze: 'Vaste afspraak; bestelmail met bevestigknop',
  },
  RIJNSTROOM: {
    naam: 'Botenverhuur De Rijnstroom',
    inkoopNiveau: 1,
    inkoopWijze: 'Online reserveren via rijnstroom.i-reserve.net',
  },
  EIGEN: {
    naam: 'DagjeUtrecht zelf',
    inkoopNiveau: 1,
    inkoopWijze: 'Eigen materiaal en begeleiding; er hoeft niets ingekocht te worden',
  },
  STEPVERHUUR: {
    naam: 'Stepverhuur Utrecht (eigen kickbikes)',
    inkoopNiveau: 1,
    inkoopWijze: 'Eigen agenda; kickbikes klaarzetten met kabelslot',
  },
  DOMTOREN: {
    naam: 'Domtoren',
    inkoopNiveau: 1,
    inkoopWijze: 'Online tickets met vast tijdslot',
  },
  SCHUTTEVAER: {
    naam: 'Rederij Schuttevaer',
    inkoopNiveau: 1,
    inkoopWijze: 'Online boeken (kanaal nog bevestigen)',
  },
};

export type Bouwsteen = {
  slug: string;
  naam: string;
  kort: string;
  beschrijving: string;
  emoji: string;
  cluster: Cluster;
  leverancier: LeverancierId;
  locatie: string;
  tijdvakken: TijdvakId[];
  duur: string;
  inkoopCents: number;
  verkoopCents: number;
  minPers: number;
  maxPers: number;
  /** Maanden (1-12) waarin het blok boekbaar is, eventueel over de jaarwisseling. Leeg = hele jaar. */
  seizoen?: Maanden;
  prijsBevestigd: boolean;
  inclusief: string[];
  /**
   * Openingstijden van de locatie per weekdag (0 = zondag ... 6 = zaterdag), als 'HH:MM'.
   * Ontbreekt een dag terwijl het veld er is, dan is de locatie die dag dicht.
   * Geen veld = geen beperking bekend.
   */
  openVanaf?: Partial<Record<number, string>>;
  /** Reden waarom het blok niet te boeken is. Gezet = niet op de site en niet te boeken. */
  offline?: string;
};

/**
 * Verkoopprijs: inkoop x 1,40, afgerond op hele euro's.
 * 15-10-2026 (Ger): van 1,30 naar 1,40. Van de opslag gaan nog btw over de marge,
 * betaalkosten en de vouchers af; met 1,30 bleef er te weinig over.
 */
const OPSLAG = 1.4;
function verkoop(inkoopCents: number) {
  return Math.round((inkoopCents * OPSLAG) / 100) * 100;
}

export type Maanden = { van: number; tot: number };
export type Seizoen = 'zomer' | 'winter';

const ZOMER: Maanden = { van: 4, tot: 10 };
const WINTER: Maanden = { van: 11, tot: 3 };

const MAANDNAMEN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

export function inMaanden(maand: number, m: Maanden) {
  return m.van <= m.tot ? maand >= m.van && maand <= m.tot : maand >= m.van || maand <= m.tot;
}

export function maandenTekst(m: Maanden) {
  return `${MAANDNAMEN[m.van - 1]} tot en met ${MAANDNAMEN[m.tot - 1]}`;
}

/**
 * verkoopCentsVast: alleen voor bouwstenen die we zelf draaien. Daar is niets in
 * te kopen, dus de opslag op de inkoop zegt niets en bepaalt Ger
 * de prijs rechtstreeks. Bij alle andere bouwstenen blijft de prijs de inkoop x OPSLAG.
 */
function blok(b: Omit<Bouwsteen, 'verkoopCents'> & { verkoopCentsVast?: number }): Bouwsteen {
  const { verkoopCentsVast, ...rest } = b;
  return { ...rest, verkoopCents: verkoopCentsVast ?? verkoop(rest.inkoopCents) };
}

/** Openingstijden JEU de boules bar, Paardenveld (maandag alleen op aanvraag). */
const OPEN_JEU: Partial<Record<number, string>> = { 4: '15:00', 5: '15:00', 6: '12:00' };
/** Openingstijden The Grand Shuffle. */
const OPEN_SHUFFLE: Partial<Record<number, string>> = { 4: '16:00', 5: '16:00', 6: '14:00' };

/** Alle bouwstenen, ook die offline staan. Gebruik BOUWSTENEN voor wat te boeken is. */
export const ALLE_BOUWSTENEN: Bouwsteen[] = [
  // ============== Centrum ==============
  blok({
    slug: 'koffie-met-gebak',
    naam: 'Ontvangst met koffie en gebak',
    kort: 'Rustig beginnen met koffie of thee en iets lekkers.',
    beschrijving:
      'De groep verzamelt bij JEU de boules bar aan Paardenveld, op 5 minuten lopen van Utrecht Centraal. Koffie, thee en gebak staan klaar.',
    emoji: '☕',
    cluster: 'centrum',
    leverancier: 'BHG',
    locatie: 'JEU de boules bar, Paardenveld',
    tijdvakken: ['ontvangst'],
    duur: '30 min',
    // 15-10-2026 schatting omhoog (was 7,50)
    inkoopCents: 850,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: false,
    inclusief: ['koffie of thee', 'gebak'],
    openVanaf: OPEN_JEU,
    offline: "JEU de boules bar is 's ochtends dicht (16-10-2026)",
  }),
  blok({
    slug: 'jeu-de-boules',
    naam: 'Jeu de boules met bites',
    kort: '1 uur boulen op overdekte banen, met bites erbij.',
    beschrijving:
      'Binnen spelen op de banen van JEU de boules bar. Uitleg ter plekke, de groep speelt in teams tegen elkaar. Regen maakt niet uit.',
    emoji: '🎯',
    cluster: 'centrum',
    leverancier: 'BHG',
    locatie: 'JEU de boules bar, Paardenveld',
    tijdvakken: ['middag'], // geen ochtend: JEU opent op do/vr/za pas om 15:00/15:00/12:00,
    duur: '1 uur',
    // JEU 5-10-2026: boules-bites-borrel 1 uur 23,44 excl. btw p.p. (2 uur 37,79; 1,5 uur kan niet). Ca. 28,50 incl., verdeeld: 19 boules met bites, 9,50 borrel
    inkoopCents: 1900,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: true,
    inclusief: ['baanhuur', 'uitleg', 'bites'],
    openVanaf: OPEN_JEU,
  }),
  blok({
    slug: 'shuffleboard',
    naam: 'Shuffleboard',
    kort: '1 uur shuffleboard in The Grand Shuffle.',
    beschrijving:
      'Het spel dat je van cruiseschepen kent, in de eerste shuffleboardbar van Nederland. Makkelijk te leren, fanatiek te spelen.',
    emoji: '🥌',
    cluster: 'centrum',
    leverancier: 'BHG',
    locatie: 'The Grand Shuffle, centrum Utrecht',
    tijdvakken: ['middag'], // geen ochtend: The Grand Shuffle opent op do/vr/za pas om 16:00/16:00/14:00,
    duur: '1 uur',
    // thegrandshuffle.nl 15-10-2026: Bronze 1 uur 24,50 p.p. incl. (cava, charcuterie), 2 uur 35,50; groepen vanaf 20
    inkoopCents: 2450,
    minPers: 20,
    maxPers: 40,
    prijsBevestigd: false,
    inclusief: ['banen', 'uitleg'],
    openVanaf: OPEN_SHUFFLE,
  }),
  blok({
    slug: 'domtoren',
    naam: 'Beklimming Domtoren',
    kort: 'Met een gids 465 treden omhoog, uitzicht over de stad.',
    beschrijving:
      'Rondleiding met gids naar de top van de Domtoren, het hoogste punt van Utrecht. Niet geschikt voor mensen met hoogtevrees of slecht ter been.',
    emoji: '🏰',
    cluster: 'centrum',
    leverancier: 'DOMTOREN',
    locatie: 'Domplein',
    tijdvakken: ['ochtend', 'middag'],
    duur: '1 uur',
    // losse tickets ca. 13,50. Privérondleiding 275 + 12,50 per groep (max 40): voordeliger vanaf ca. 21 personen, duur bij kleine groepen
    inkoopCents: 1400,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: false,
    inclusief: ['toegang', 'gids'],
  }),
  blok({
    slug: 'rondvaart',
    naam: 'Rondvaart door de grachten',
    kort: '1 uur varen over de Oudegracht en singels.',
    beschrijving:
      'Een rondvaart met Schuttevaer langs de werven van de Oudegracht en over de singels.',
    emoji: '🚤',
    cluster: 'centrum',
    leverancier: 'SCHUTTEVAER',
    locatie: 'Opstapplaats Oudegracht',
    tijdvakken: ['ochtend', 'middag'],
    duur: '1 uur',
    // schuttevaer.com 15-10-2026: rondvaart vanaf 18,50 (1 uur); commissie affiliate nog onbekend
    inkoopCents: 1850,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: false,
    inclusief: ['rondvaart'],
  }),
  blok({
    slug: 'groepslunch',
    naam: 'Groepslunch',
    kort: 'Vast lunchmenu, ook vegetarisch.',
    beschrijving:
      'Een vaste groepslunch bij een van de zaken van Brothers Horeca Groep in het centrum. Vegetarisch kan; andere dieetwensen kun je doorgeven bij het boeken.',
    emoji: '🥪',
    cluster: 'centrum',
    leverancier: 'BHG',
    locatie: 'BHG-locatie in het centrum',
    tijdvakken: ['lunch'],
    duur: '1 uur',
    // 15-10-2026 schatting omhoog (was 16,25), nog navragen bij BHG
    inkoopCents: 2100,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: false,
    inclusief: ['vast lunchmenu', 'frisdrank of koffie'],
    // Geen openVanaf: welke BHG-zaak het wordt en hoe laat die opengaat, nog navragen bij BHG.
  }),
  blok({
    slug: 'borrel',
    naam: 'Afsluitende borrel',
    kort: '2 drankjes met bitterballen.',
    beschrijving: 'De dag afsluiten bij JEU de boules bar met twee drankjes per persoon en bitterballen.',
    emoji: '🍻',
    cluster: 'centrum',
    leverancier: 'BHG',
    locatie: 'JEU de boules bar, Paardenveld',
    tijdvakken: ['afsluiting'],
    duur: '1 uur',
    // deel van het JEU-pakket boules-bites-borrel, zie jeu-de-boules
    inkoopCents: 950,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: true,
    inclusief: ['2 drankjes p.p.', 'bitterballen'],
    openVanaf: OPEN_JEU,
  }),

  // ============== Winter (centrum) ==============
  blok({
    slug: 'gluhwein',
    naam: 'Glühwein-borrel',
    kort: 'Afsluiten met glühwein of warme chocomel en een borrel.',
    beschrijving:
      'De dag afsluiten bij JEU de boules bar aan Paardenveld. Iedereen krijgt eerst een glühwein of warme chocolademelk, daarna twee drankjes per persoon met bitterballen.',
    emoji: '🍷',
    cluster: 'centrum',
    leverancier: 'BHG',
    locatie: 'JEU de boules bar, Paardenveld',
    tijdvakken: ['afsluiting'],
    duur: '1 uur',
    // 16-10-2026 van ontvangst naar afsluiting. Inkoop = bevestigde glühwein 7,50
    // (JEU 5-10-2026: 6,00 excl. btw, chocomel 4,50) + bevestigde borrel 9,50
    inkoopCents: 1700,
    minPers: 8,
    maxPers: 40,
    seizoen: WINTER,
    prijsBevestigd: true,
    inclusief: ['glühwein of warme chocolademelk', '2 drankjes p.p.', 'bitterballen'],
    openVanaf: OPEN_JEU,
  }),
  blok({
    slug: 'winterlunch',
    naam: 'Lunch van de kaart',
    kort: 'Lunch van de kaart bij JEU de boules bar.',
    beschrijving:
      'Lunchen bij JEU de boules bar aan Paardenveld. Iedereen kiest een gerecht van de kaart, met een drankje erbij. Dieetwensen geef je door bij het boeken.',
    emoji: '🥣',
    cluster: 'centrum',
    leverancier: 'BHG',
    locatie: 'JEU de boules bar, Paardenveld',
    tijdvakken: ['lunch'],
    duur: '1 uur',
    // richtprijs, gevraagd aan JEU 19-10-2026 (H6IM1N)
    inkoopCents: 1800,
    minPers: 8,
    maxPers: 40,
    seizoen: WINTER,
    prijsBevestigd: false,
    inclusief: ['lunch van de kaart', 'frisdrank of koffie'],
    openVanaf: OPEN_JEU,
  }),

  blok({
    slug: 'city-challenge',
    naam: 'City Challenge door de binnenstad',
    kort: 'In teams op pad door het oude centrum, met opdrachten onderweg.',
    beschrijving:
      'De groep gaat in teams de binnenstad in met een reeks opdrachten en vragen over wat ze tegenkomen: de Dom, de werfkelders en de Oudegracht. Te voet, op eigen tempo, met een vaste start en finish. Wij zorgen voor de opdrachten en staan bij start en finish klaar.',
    emoji: '\u{1F9ED}',
    cluster: 'centrum',
    leverancier: 'EIGEN',
    locatie: 'Start bij Paardenveld, finish op de Neude',
    tijdvakken: ['ochtend', 'middag'],
    duur: '1,5 tot 2 uur',
    inkoopCents: 0,
    verkoopCentsVast: 750,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: true,
    inclusief: ['opdrachten per team', 'begeleiding bij start en finish', 'uitslag aan het eind'],
  }),

  // ============== Amelisweerd ==============
  blok({
    slug: 'kanoen',
    naam: 'Kanoën in Amelisweerd',
    kort: '2 uur kanoën over de Kromme Rijn.',
    beschrijving:
      'Met 2 personen per kano over de Kromme Rijn door landgoed Amelisweerd. Zwemvesten en waterzakken zijn inbegrepen.',
    emoji: '🛶',
    cluster: 'amelisweerd',
    leverancier: 'RIJNSTROOM',
    locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
    tijdvakken: ['ochtend', 'middag'],
    duur: '2 uur',
    inkoopCents: 1200,
    minPers: 8,
    maxPers: 40,
    seizoen: ZOMER,
    prijsBevestigd: false,
    inclusief: ['2-persoonskano', 'zwemvest', 'waterzak'],
  }),
  blok({
    slug: 'suppen',
    naam: 'Suppen in Amelisweerd',
    kort: '2 uur suppen op de Kromme Rijn.',
    beschrijving:
      'Iedereen een eigen supboard op het rustige water van de Kromme Rijn. Kunnen zwemmen is verplicht.',
    emoji: '🏄',
    cluster: 'amelisweerd',
    leverancier: 'RIJNSTROOM',
    locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
    tijdvakken: ['ochtend', 'middag'],
    duur: '2 uur',
    inkoopCents: 2200,
    minPers: 8,
    maxPers: 30,
    seizoen: ZOMER,
    prijsBevestigd: false,
    inclusief: ['supboard', 'peddel', 'zwemvest'],
  }),
  blok({
    slug: 'picknick',
    naam: 'Picknick aan het water',
    kort: 'Picknickpakket bij De Rijnstroom.',
    beschrijving: 'Een verzorgd picknickpakket per persoon, op te halen bij De Rijnstroom.',
    emoji: '🧺',
    cluster: 'amelisweerd',
    leverancier: 'RIJNSTROOM',
    locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
    tijdvakken: ['lunch'],
    duur: '1 uur',
    inkoopCents: 1350,
    minPers: 8,
    maxPers: 40,
    seizoen: ZOMER,
    prijsBevestigd: false,
    inclusief: ['picknickpakket p.p.'],
  }),
  blok({
    slug: 'bbq',
    naam: 'BBQ met drankjes',
    kort: 'Barbecue na afloop, 2 uur drankjes.',
    beschrijving:
      'Afsluiten met een barbecue bij De Rijnstroom, inclusief 2 uur onbeperkt drankjes. Vanaf 15 personen.',
    emoji: '🍖',
    cluster: 'amelisweerd',
    leverancier: 'RIJNSTROOM',
    locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
    tijdvakken: ['afsluiting'],
    duur: '2 uur',
    // rijnstroom.nl/prijzen 15-10-2026: BBQ 24 + 2 uur alle dranken 20; vanaf 15 pers, alleen ma t/m vr
    inkoopCents: 4400,
    minPers: 15,
    maxPers: 40,
    seizoen: ZOMER,
    prijsBevestigd: false,
    inclusief: ['BBQ-pakket', '2 uur drankjes'],
  }),

  // ============== Verbinding ==============
  blok({
    slug: 'kickbike-tocht',
    naam: 'Kickbike-tocht',
    kort: 'Zelfstandig op de kickbike, met vaste route.',
    beschrijving:
      'De groep stept zelfstandig een vaste route langs de Kromme Rijn tussen het centrum en Amelisweerd. De kickbikes staan klaar met een slot; de code en route krijg je de dag ervoor.',
    emoji: '🛴',
    cluster: 'beide',
    leverancier: 'STEPVERHUUR',
    locatie: 'Start volgens route (centrum of De Rijnstroom)',
    tijdvakken: ['ochtend', 'middag'],
    duur: '1,5 tot 2 uur',
    inkoopCents: 1000,
    minPers: 8,
    maxPers: 30,
    seizoen: ZOMER,
    prijsBevestigd: false,
    inclusief: ['kickbike', 'slot', 'route'],
  }),
];

/** De bouwstenen die te boeken zijn (niet offline). */
export const BOUWSTENEN: Bouwsteen[] = ALLE_BOUWSTENEN.filter((b) => !b.offline);

export type Pakket = {
  slug: string;
  /** Zomer- en winterpakketten worden in hun seizoen uitgelicht. */
  seizoen: Seizoen | 'jaarrond';
  naam: string;
  kort: string;
  beschrijving: string;
  emoji: string;
  voorWie: string;
  blokken: Partial<Record<TijdvakId, string>>;
  /** Vaste pakketprijs p.p. (Ger), in plaats van de som van de onderdelen. */
  prijsCentsVast?: number;
  /** Reden waarom het pakket niet te boeken is. Gezet = niet op de site en niet te boeken. */
  offline?: string;
};

/** Alle pakketten, ook die offline staan. Gebruik PAKKETTEN voor wat te boeken is. */
export const ALLE_PAKKETTEN: Pakket[] = [
  {
    slug: 'warme-winterdag',
    seizoen: 'winter',
    naam: 'Warme Winterdag',
    kort: 'Domtoren, lunch van de kaart, jeu de boules en een glühwein-borrel.',
    beschrijving:
      'Een winterdag in het centrum van Utrecht, grotendeels binnen. De stad zien vanaf de Domtoren, lunchen van de kaart bij JEU de boules bar, boulen op de overdekte banen en afsluiten met een glühwein-borrel.',
    emoji: '❄️',
    voorWie: 'Bedrijfsuitjes, teams en vriendengroepen',
    prijsCentsVast: 9900, // vaste prijs Ger 15-10-2026
    blokken: {
      ochtend: 'domtoren',
      lunch: 'winterlunch',
      middag: 'jeu-de-boules',
      afsluiting: 'gluhwein',
    },
  },
  {
    slug: 'amelisweerd-actief',
    seizoen: 'zomer',
    naam: 'Amelisweerd Actief',
    kort: 'Kanoën, picknick, kickbike-tocht en BBQ. De hele dag buiten.',
    beschrijving:
      'Een actieve dag in het groen aan de rand van Utrecht. Alles vindt plaats bij en rond De Rijnstroom, dus geen gedoe met verplaatsen.',
    emoji: '🌳',
    voorWie: 'Teams, vriendengroepen en studentenclubs',
    blokken: { ochtend: 'kanoen', lunch: 'picknick', middag: 'kickbike-tocht', afsluiting: 'bbq' },
  },
  {
    slug: 'spel-en-borrel',
    seizoen: 'jaarrond',
    naam: 'Utrecht Spel & Borrel',
    kort: 'Koffie, jeu de boules, lunch, shuffleboard en borrel.',
    beschrijving:
      'De hele dag binnen spelen en genieten in het centrum, dus weerbestendig. Alles op loopafstand van Utrecht Centraal.',
    emoji: '🎯',
    voorWie: 'Bedrijfsuitjes en teambuilding, het hele jaar',
    offline: "JEU de boules bar is 's ochtends dicht en koffie met gebak staat offline (16-10-2026)",
    blokken: {
      ontvangst: 'koffie-met-gebak',
      ochtend: 'jeu-de-boules',
      lunch: 'groepslunch',
      middag: 'shuffleboard',
      afsluiting: 'borrel',
    },
  },
  {
    slug: 'water-naar-borrel',
    seizoen: 'zomer',
    naam: 'Van het water naar de borrel',
    kort: 'Suppen, picknick, per kickbike naar de stad en een borrel.',
    beschrijving:
      "'s Ochtends op het water in Amelisweerd, na de picknick per kickbike langs de Kromme Rijn naar het centrum en afsluiten met een borrel bij JEU.",
    emoji: '🏄',
    voorWie: 'Vrijgezellenfeesten en vriendengroepen',
    blokken: { ochtend: 'suppen', lunch: 'picknick', middag: 'kickbike-tocht', afsluiting: 'borrel' },
  },
  {
    slug: 'schooluitje',
    seizoen: 'jaarrond',
    naam: 'Schooluitje Utrecht',
    kort: 'Domtoren, groepslunch en een rondvaart.',
    beschrijving:
      'Het historische hart van Utrecht: de Domtoren op, samen lunchen en de stad bekijken vanaf het water.',
    emoji: '🎒',
    voorWie: 'Schoolklassen (vo en mbo)',
    blokken: { ochtend: 'domtoren', lunch: 'groepslunch', middag: 'rondvaart' },
  },

  // ============== Halve dagen ==============
  // Toegevoegd 21-9-2026 op verzoek van Ger: een groep die niet de hele dag wil,
  // of een kleiner budget heeft, kon tot nu toe niets boeken. De vanafprijs zakt
  // hiermee van 78 naar 29 euro, waarmee we in dezelfde vergelijking staan als de
  // uitjesbureaus die met bedragen vanaf 20 tot 30 euro adverteren.
  // 16-10-2026: Koffie & City Challenge staat offline (JEU 's ochtends dicht); de
  // vanafprijs op de site komt nu van het goedkoopste pakket dat wel online staat.
  {
    slug: 'boules-en-borrel',
    seizoen: 'jaarrond',
    naam: 'Boules & Borrel',
    kort: 'Halve dag: jeu de boules met bites en een afsluitende borrel.',
    beschrijving:
      'Een middag zonder gedoe: om twee uur de banen op bij JEU de boules bar aan Paardenveld, bites erbij, en afsluiten met een borrel. Op vijf minuten lopen van Utrecht Centraal, dus iedereen kan zo aanschuiven en zo weer weg.',
    emoji: '🍻',
    voorWie: 'Teams en vriendengroepen die een middag vrij hebben',
    prijsCentsVast: 3900, // vaste prijs Ger 15-10-2026
    blokken: { middag: 'jeu-de-boules', afsluiting: 'borrel' },
  },
  {
    slug: 'dom-en-grachten',
    seizoen: 'jaarrond',
    naam: 'Dom & Grachten',
    kort: 'Halve dag: de Domtoren op en een rondvaart door de grachten.',
    beschrijving:
      'Het oude hart van Utrecht in een halve dag: eerst de 465 treden van de Domtoren op voor het uitzicht, daarna vanaf het water langs de werfkelders. Weinig regelwerk, veel stad.',
    emoji: '🏰',
    voorWie: 'Schoolklassen, families en groepen van buiten de stad',
    blokken: { ochtend: 'domtoren', middag: 'rondvaart' },
  },
  {
    slug: 'water-en-picknick',
    seizoen: 'zomer',
    naam: 'Water & Picknick',
    kort: 'Halve dag: kanoën door Amelisweerd en een picknick aan het water.',
    beschrijving:
      'Een ochtend op de Kromme Rijn met twee personen per kano, en daarna een verzorgde picknick aan het water bij De Rijnstroom. Om half twee is iedereen weer vrij.',
    emoji: '🛶',
    voorWie: 'Teams en vriendengroepen, van april tot en met oktober',
    blokken: { ochtend: 'kanoen', lunch: 'picknick' },
  },
  {
    slug: 'winter-op-de-grachten',
    seizoen: 'winter',
    naam: 'Winter op de Grachten',
    kort: 'Halve dag: een rondvaart met Schuttevaer en lunch van de kaart.',
    beschrijving:
      'Utrecht in de winter vanaf het water. Een uur met Rederij Schuttevaer over de Oudegracht en de singels, en daarna lunchen van de kaart bij JEU de boules bar aan Paardenveld. Om half twee is iedereen weer vrij.',
    emoji: '⛴️',
    voorWie: 'Bedrijfsuitjes, teams en families, van november tot en met maart',
    blokken: { ochtend: 'rondvaart', lunch: 'winterlunch' },
  },
  {
    slug: 'winterborrel',
    seizoen: 'winter',
    naam: 'Winterborrel',
    kort: 'Halve dag: jeu de boules binnen en een glühwein-borrel.',
    beschrijving:
      'Een winterse middag die niet afhankelijk is van het weer: boulen op de overdekte banen van JEU de boules bar en afsluiten met een glühwein-borrel. Alles binnen, alles in het centrum.',
    emoji: '🔥',
    voorWie: 'Teams en vriendengroepen, van november tot en met maart',
    blokken: { middag: 'jeu-de-boules', afsluiting: 'gluhwein' },
  },
  {
    slug: 'koffie-en-city-challenge',
    seizoen: 'jaarrond',
    naam: 'Koffie & City Challenge',
    kort: 'Halve ochtend: koffie met gebak en in teams de binnenstad in.',
    beschrijving:
      'De goedkoopste manier om met een groep iets samen te doen in Utrecht. Om half tien koffie met gebak bij JEU de boules bar, om tien uur in teams de binnenstad in met de City Challenge, rond twaalf uur klaar. Geen reserveringen bij derden, dus ook op korte termijn te regelen.',
    emoji: '☕',
    voorWie: 'Teams, klassen en vriendengroepen met een ochtend en een klein budget',
    offline: "Koffie met gebak staat offline: JEU de boules bar is 's ochtends dicht (16-10-2026)",
    blokken: { ontvangst: 'koffie-met-gebak', ochtend: 'city-challenge' },
  },
  // ============== School ==============
  // Basisscholen konden tot nu toe niets boeken: het schooluitje met Domtoren is
  // bedoeld voor vo en mbo, en 465 treden is te veel voor jongere kinderen.
  {
    slug: 'schoolreis-basisschool',
    seizoen: 'jaarrond',
    naam: 'Schoolreis basisschool',
    kort: 'Rondvaart door de grachten en een City Challenge, lunch zelf meenemen.',
    beschrijving:
      "Utrecht vanaf het water, met een schipper die onderweg vertelt over de werfkelders en de Dom. 's Middags in teams de binnenstad in met de City Challenge. Geen trappen en geen lange loopafstanden, dus geschikt vanaf groep 6. Eigen lunch mee, of voeg de groepslunch toe in de samensteller.",
    emoji: '🚸',
    voorWie: 'Basisscholen, groep 6 tot en met 8',
    blokken: { ochtend: 'rondvaart', middag: 'city-challenge' },
  },
  // ============== Vrijgezellen in de winter ==============
  // Het zomerpakket (suppen, picknick, kickbike, borrel) kan van november tot en
  // met maart niet. Dit is het wintervervangpakket (prijzen sinds 15-10-2026 niet meer gelijk).
  {
    slug: 'vrijgezellen-winterdag',
    seizoen: 'winter',
    naam: 'Vrijgezellen Winterdag',
    kort: 'Glühwein, shuffleboard, winterse lunch en een borrel.',
    beschrijving:
      'De winterversie van het vrijgezellendagje, helemaal binnen. Beginnen met glühwein, dan shuffleboard bij The Grand Shuffle, een warme lunch en afsluiten met een borrel bij JEU.',
    emoji: '🎉',
    voorWie: 'Vrijgezellenfeesten en vriendengroepen, van november tot en met maart',
    prijsCentsVast: 8900, // vaste prijs Ger 15-10-2026
    offline: "The Grand Shuffle en JEU de boules bar zijn 's ochtends dicht (16-10-2026)",
    blokken: {
      ontvangst: 'gluhwein',
      ochtend: 'shuffleboard',
      lunch: 'winterlunch',
      afsluiting: 'borrel',
    },
  },
];

/** De pakketten die te boeken zijn (niet offline). */
export const PAKKETTEN: Pakket[] = ALLE_PAKKETTEN.filter((p) => !p.offline);

// ============== Spelregels ==============

export const REGELS = {
  /** 0 = zondag ... 6 = zaterdag. Ger is op deze dagen bereikbaar als aanspreekpunt. */
  dagen: [4, 5, 6],
  minPers: 8,
  maxPers: 40,
  minDagenVooruit: 14,
  aantalDefinitiefDagenVooraf: 7,
  maxClusterWissels: 1,
};

export const DAGNAMEN = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

/**
 * Welk seizoen de site uitlicht. Mensen plannen een uitje een paar weken vooruit,
 * daarom schuift de winter al half september naar voren en de zomer begin maart.
 */
export function uitgelichtSeizoen(nu = new Date()): Seizoen {
  const [maand, dag] = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam', month: 'numeric', day: 'numeric' })
    .formatToParts(nu)
    .filter((d) => d.type === 'month' || d.type === 'day')
    .map((d) => Number(d.value));
  if (maand! >= 3 && (maand! < 9 || (maand === 9 && dag! < 15))) return 'zomer';
  return 'winter';
}

/** Maanden waarin een pakket te boeken is (doorsnede van de onderdelen). */
export function pakketMaanden(p: Pakket): Maanden | null {
  if (p.seizoen === 'zomer') return ZOMER;
  if (p.seizoen === 'winter') return WINTER;
  return null;
}

/** Pakketten van het uitgelichte seizoen eerst, dan jaarrond, dan buiten seizoen. */
export function pakkettenOpSeizoen(seizoen = uitgelichtSeizoen()) {
  const rang = (p: Pakket) => (p.seizoen === seizoen ? 0 : p.seizoen === 'jaarrond' ? 1 : 2);
  return [...PAKKETTEN].sort((a, b) => rang(a) - rang(b));
}

export function buitenSeizoen(p: Pakket, seizoen = uitgelichtSeizoen()) {
  return p.seizoen !== 'jaarrond' && p.seizoen !== seizoen;
}

export function vindBouwsteen(slug: string | undefined | null) {
  return slug ? BOUWSTENEN.find((b) => b.slug === slug) ?? null : null;
}

export function vindPakket(slug: string | undefined | null) {
  return slug ? PAKKETTEN.find((p) => p.slug === slug) ?? null : null;
}

/**
 * Ook offline bouwstenen, voor bestaande boekingen en inkooporders (naam en locatie
 * blijven dan zichtbaar). Niet gebruiken voor wat klanten kunnen kiezen.
 */
export function vindBouwsteenOokOffline(slug: string | undefined | null) {
  return slug ? ALLE_BOUWSTENEN.find((b) => b.slug === slug) ?? null : null;
}

/** De openingstijd van de locatie op een weekdag; null = die dag dicht, undefined = geen beperking bekend. */
export function openingstijd(b: Bouwsteen, dag: number): string | null | undefined {
  if (!b.openVanaf) return undefined;
  return b.openVanaf[dag] ?? null;
}

/** Is de locatie open bij het begin van het tijdvak op deze weekdag? */
export function openOp(b: Bouwsteen, tijdvak: TijdvakId, dag: number) {
  const open = openingstijd(b, dag);
  if (open === undefined) return true;
  const van = TIJDVAKKEN.find((t) => t.id === tijdvak)!.van;
  return open !== null && open <= van;
}

/** Kan het blok in dit tijdvak op minstens een van de boekingsdagen? */
export function openOpEenDag(b: Bouwsteen, tijdvak: TijdvakId) {
  return REGELS.dagen.some((d) => openOp(b, tijdvak, d));
}

export type Keuze = {
  datum: string; // JJJJ-MM-DD
  personen: number;
  blokken: Partial<Record<TijdvakId, string>>;
};

/** Zelfde onderdelen als een pakket met een vaste prijs: dan geldt die prijs. */
function vastePakketPrijs(blokken: Keuze['blokken']) {
  const sleutel = (b: Keuze['blokken']) => TIJDVAKKEN.map((t) => b[t.id] ?? '').join('|');
  return PAKKETTEN.find((p) => p.prijsCentsVast && sleutel(p.blokken) === sleutel(blokken))?.prijsCentsVast;
}

export function prijsPerPersoon(blokken: Keuze['blokken']) {
  const vast = vastePakketPrijs(blokken);
  if (vast) return vast;
  return TIJDVAKKEN.reduce((som, t) => som + (vindBouwsteen(blokken[t.id])?.verkoopCents ?? 0), 0);
}

export function formatEuro(cents: number) {
  // Hele euro's zonder komma, bedragen met centen altijd met twee cijfers,
  // zodat er geen 24,5 op de site komt te staan.
  const decimalen = cents % 100 === 0 ? 0 : 2;
  return `€ ${(cents / 100).toLocaleString('nl-NL', { minimumFractionDigits: decimalen, maximumFractionDigits: 2 })}`;
}

function vandaagIso() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date());
}

function dagenTussen(vanIso: string, totIso: string) {
  return Math.round((Date.parse(`${totIso}T00:00:00Z`) - Date.parse(`${vanIso}T00:00:00Z`)) / 86_400_000);
}

export function formatDatum(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/**
 * Een fout in een keuze, los van de taal. controleer() maakt er de Nederlandse
 * zinnen van; de Engelse en Duitse site (lib/i18n) gebruiken dezelfde codes, zodat
 * de spelregels maar op één plek staan.
 */
export type KeuzeFout =
  | { code: 'geen-datum' }
  | { code: 'verkeerde-dag' }
  | { code: 'te-kort-vooruit'; dagen: number }
  | { code: 'aantal'; min: number; max: number }
  | { code: 'onbekend-onderdeel'; tijdvak: TijdvakId }
  | { code: 'geen-activiteit' }
  | { code: 'verkeerd-tijdvak'; blok: string; tijdvak: TijdvakId }
  | { code: 'aantal-blok'; blok: string; min: number; max: number }
  | { code: 'seizoen'; blok: string; seizoen: Maanden }
  /** Locatie nog dicht bij het begin van het tijdvak. tijd = openingstijd die dag (null = hele dag dicht); andereDag = boekingsdag waarop het wel kan. */
  | { code: 'gesloten'; blok: string; tijdvak: TijdvakId; dag: number; tijd: string | null; andereDag: number | null }
  | { code: 'kickbike-nodig'; van: Exclude<Cluster, 'beide'>; naar: Exclude<Cluster, 'beide'> }
  | { code: 'te-veel-wissels' };

/**
 * Controleert een keuze en geeft de fouten als codes terug, in volgorde.
 * Wordt zowel in de browser als op de server gebruikt, zodat er nooit een boeking
 * binnenkomt die de inkoop-agent niet kan uitvoeren.
 */
export function controleerKeuze(keuze: Keuze): KeuzeFout[] {
  const fouten: KeuzeFout[] = [];

  // Datum
  if (!/^\d{4}-\d{2}-\d{2}$/.test(keuze.datum)) {
    fouten.push({ code: 'geen-datum' });
  } else {
    const dag = new Date(`${keuze.datum}T12:00:00Z`).getUTCDay();
    if (!REGELS.dagen.includes(dag)) {
      fouten.push({ code: 'verkeerde-dag' });
    }
    if (dagenTussen(vandaagIso(), keuze.datum) < REGELS.minDagenVooruit) {
      fouten.push({ code: 'te-kort-vooruit', dagen: REGELS.minDagenVooruit });
    }
  }

  // Aantal personen
  if (!Number.isInteger(keuze.personen) || keuze.personen < REGELS.minPers || keuze.personen > REGELS.maxPers) {
    fouten.push({ code: 'aantal', min: REGELS.minPers, max: REGELS.maxPers });
  }

  const gekozen = TIJDVAKKEN.flatMap((t) => {
    const slug = keuze.blokken[t.id];
    if (!slug) return [];
    const b = vindBouwsteen(slug);
    if (!b) {
      fouten.push({ code: 'onbekend-onderdeel', tijdvak: t.id });
      return [];
    }
    return [{ tijdvak: t, blok: b }];
  });

  if (!gekozen.some((g) => g.tijdvak.id === 'ochtend' || g.tijdvak.id === 'middag')) {
    fouten.push({ code: 'geen-activiteit' });
  }

  const maand = Number(keuze.datum.slice(5, 7));
  const weekdag = /^\d{4}-\d{2}-\d{2}$/.test(keuze.datum)
    ? new Date(`${keuze.datum}T12:00:00Z`).getUTCDay()
    : null;
  for (const { tijdvak, blok } of gekozen) {
    if (weekdag !== null && REGELS.dagen.includes(weekdag) && !openOp(blok, tijdvak.id, weekdag)) {
      fouten.push({
        code: 'gesloten',
        blok: blok.slug,
        tijdvak: tijdvak.id,
        dag: weekdag,
        tijd: openingstijd(blok, weekdag) ?? null,
        andereDag: REGELS.dagen.find((d) => d !== weekdag && openOp(blok, tijdvak.id, d)) ?? null,
      });
    }
    if (!blok.tijdvakken.includes(tijdvak.id)) {
      fouten.push({ code: 'verkeerd-tijdvak', blok: blok.slug, tijdvak: tijdvak.id });
    }
    if (keuze.personen < blok.minPers || keuze.personen > blok.maxPers) {
      fouten.push({ code: 'aantal-blok', blok: blok.slug, min: blok.minPers, max: blok.maxPers });
    }
    if (blok.seizoen && maand && !inMaanden(maand, blok.seizoen)) {
      fouten.push({ code: 'seizoen', blok: blok.slug, seizoen: blok.seizoen });
    }
  }

  // Verplaatsen tussen centrum en Amelisweerd kan alleen met de kickbike
  let huidig: Exclude<Cluster, 'beide'> | null = null;
  let kickbikeSindsdien = false;
  let wissels = 0;
  for (const { blok } of gekozen) {
    if (blok.cluster === 'beide') {
      kickbikeSindsdien = true;
      continue;
    }
    if (huidig && blok.cluster !== huidig) {
      if (!kickbikeSindsdien) {
        fouten.push({ code: 'kickbike-nodig', van: huidig, naar: blok.cluster });
      }
      wissels++;
    }
    huidig = blok.cluster;
    kickbikeSindsdien = false;
  }
  if (wissels > REGELS.maxClusterWissels) {
    fouten.push({ code: 'te-veel-wissels' });
  }

  return fouten;
}

/** De Nederlandse zin bij een fout. */
function foutTekst(f: KeuzeFout): string {
  const naam = (slug: string) => vindBouwsteen(slug)?.naam ?? slug;
  const tijdvakNaam = (id: TijdvakId) => TIJDVAKKEN.find((t) => t.id === id)!.naam.toLowerCase();
  switch (f.code) {
    case 'geen-datum':
      return 'Kies een datum.';
    case 'verkeerde-dag':
      return 'Uitjes zijn mogelijk op donderdag, vrijdag en zaterdag.';
    case 'te-kort-vooruit':
      return `Boek minimaal ${f.dagen} dagen vooruit.`;
    case 'aantal':
      return `Het aantal personen ligt tussen ${f.min} en ${f.max}.`;
    case 'onbekend-onderdeel':
      return `Onbekend onderdeel bij ${tijdvakNaam(f.tijdvak)}.`;
    case 'geen-activiteit':
      return 'Kies minimaal één activiteit in de ochtend of middag.';
    case 'verkeerd-tijdvak':
      return `${naam(f.blok)} kan niet in het tijdvak ${tijdvakNaam(f.tijdvak)}.`;
    case 'aantal-blok':
      return `${naam(f.blok)} kan met ${f.min} tot ${f.max} personen.`;
    case 'seizoen':
      return `${naam(f.blok)} is alleen mogelijk van ${maandenTekst(f.seizoen)}.`;
    case 'gesloten': {
      const blok = vindBouwsteenOokOffline(f.blok);
      const wie = blok ? `${blok.naam} (${blok.locatie})` : f.blok;
      const dicht = f.tijd
        ? `${wie} is op ${DAGNAMEN[f.dag]} pas open vanaf ${f.tijd}`
        : `${wie} is op ${DAGNAMEN[f.dag]} dicht`;
      const anders = f.andereDag !== null ? ` of een ${DAGNAMEN[f.andereDag]}` : '';
      return `${dicht}; kies een later tijdvak${anders}.`;
    }
    case 'kickbike-nodig':
      return `Van ${CLUSTERS[f.van].naam} naar ${CLUSTERS[f.naar].naam} gaat met de kickbike: kies de kickbike-tocht als tussenstap.`;
    case 'te-veel-wissels':
      return 'Wissel maximaal één keer tussen centrum en Amelisweerd.';
  }
}

/**
 * Controleert een keuze en geeft de fouten als Nederlandse zinnen, zonder dubbele.
 * Wordt zowel in de browser als op de server gebruikt, zodat er nooit een boeking
 * binnenkomt die de inkoop-agent niet kan uitvoeren.
 */
export function controleer(keuze: Keuze): string[] {
  return [...new Set(controleerKeuze(keuze).map(foutTekst))];
}

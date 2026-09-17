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
export type LeverancierId = 'BHG' | 'RIJNSTROOM' | 'STEPVERHUUR' | 'DOMTOREN' | 'SCHUTTEVAER';

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
  /** Maanden (1-12) waarin het blok boekbaar is. Leeg = hele jaar. */
  seizoen?: { van: number; tot: number };
  prijsBevestigd: boolean;
  inclusief: string[];
};

/** Verkoopprijs: inkoop x 1,30, afgerond op hele euro's. */
function verkoop(inkoopCents: number) {
  return Math.round((inkoopCents * 1.3) / 100) * 100;
}

const ZOMER = { van: 4, tot: 10 };

function blok(b: Omit<Bouwsteen, 'verkoopCents'>): Bouwsteen {
  return { ...b, verkoopCents: verkoop(b.inkoopCents) };
}

export const BOUWSTENEN: Bouwsteen[] = [
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
    inkoopCents: 750,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: false,
    inclusief: ['koffie of thee', 'gebak'],
  }),
  blok({
    slug: 'jeu-de-boules',
    naam: 'Jeu de boules met bites',
    kort: '1,5 uur boulen op overdekte banen, met bites erbij.',
    beschrijving:
      'Binnen spelen op de banen van JEU de boules bar. Uitleg ter plekke, de groep speelt in teams tegen elkaar. Regen maakt niet uit.',
    emoji: '🎯',
    cluster: 'centrum',
    leverancier: 'BHG',
    locatie: 'JEU de boules bar, Paardenveld',
    tijdvakken: ['ochtend', 'middag'],
    duur: '1,5 uur',
    inkoopCents: 1650,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: false,
    inclusief: ['baanhuur', 'uitleg', 'bites'],
  }),
  blok({
    slug: 'shuffleboard',
    naam: 'Shuffleboard',
    kort: '1,5 uur shuffleboard in The Grand Shuffle.',
    beschrijving:
      'Het spel dat je van cruiseschepen kent, in de eerste shuffleboardbar van Nederland. Makkelijk te leren, fanatiek te spelen.',
    emoji: '🥌',
    cluster: 'centrum',
    leverancier: 'BHG',
    locatie: 'The Grand Shuffle, centrum Utrecht',
    tijdvakken: ['ochtend', 'middag'],
    duur: '1,5 uur',
    inkoopCents: 2200,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: false,
    inclusief: ['banen', 'uitleg'],
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
    inkoopCents: 1300,
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
      'Een vaste groepslunch bij een van de zaken van Brothers Horeca Groep in het centrum. Vegetarisch kan; overige dieetwensen helaas niet.',
    emoji: '🥪',
    cluster: 'centrum',
    leverancier: 'BHG',
    locatie: 'BHG-locatie in het centrum',
    tijdvakken: ['lunch'],
    duur: '1 uur',
    inkoopCents: 1625,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: false,
    inclusief: ['vast lunchmenu', 'frisdrank of koffie'],
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
    inkoopCents: 600,
    minPers: 8,
    maxPers: 40,
    prijsBevestigd: false,
    inclusief: ['2 drankjes p.p.', 'bitterballen'],
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
    inkoopCents: 3900,
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

export type Pakket = {
  slug: string;
  naam: string;
  kort: string;
  beschrijving: string;
  emoji: string;
  voorWie: string;
  blokken: Partial<Record<TijdvakId, string>>;
};

export const PAKKETTEN: Pakket[] = [
  {
    slug: 'amelisweerd-actief',
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
    naam: 'Utrecht Spel & Borrel',
    kort: 'Koffie, jeu de boules, lunch, shuffleboard en borrel.',
    beschrijving:
      'De hele dag binnen spelen en genieten in het centrum, dus weerbestendig. Alles op loopafstand van Utrecht Centraal.',
    emoji: '🎯',
    voorWie: 'Bedrijfsuitjes en teambuilding, het hele jaar',
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
    naam: 'Schooluitje Utrecht',
    kort: 'Domtoren, groepslunch en een rondvaart.',
    beschrijving:
      'Het historische hart van Utrecht: de Domtoren op, samen lunchen en de stad bekijken vanaf het water.',
    emoji: '🎒',
    voorWie: 'Schoolklassen (vo en mbo)',
    blokken: { ochtend: 'domtoren', lunch: 'groepslunch', middag: 'rondvaart' },
  },
];

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

export function vindBouwsteen(slug: string | undefined | null) {
  return slug ? BOUWSTENEN.find((b) => b.slug === slug) ?? null : null;
}

export function vindPakket(slug: string | undefined | null) {
  return slug ? PAKKETTEN.find((p) => p.slug === slug) ?? null : null;
}

export type Keuze = {
  datum: string; // JJJJ-MM-DD
  personen: number;
  blokken: Partial<Record<TijdvakId, string>>;
};

export function prijsPerPersoon(blokken: Keuze['blokken']) {
  return TIJDVAKKEN.reduce((som, t) => som + (vindBouwsteen(blokken[t.id])?.verkoopCents ?? 0), 0);
}

export function formatEuro(cents: number) {
  return `€ ${(cents / 100).toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
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
 * Controleert een keuze. Wordt zowel in de browser als op de server gebruikt,
 * zodat er nooit een boeking binnenkomt die de inkoop-agent niet kan uitvoeren.
 */
export function controleer(keuze: Keuze): string[] {
  const fouten: string[] = [];

  // Datum
  if (!/^\d{4}-\d{2}-\d{2}$/.test(keuze.datum)) {
    fouten.push('Kies een datum.');
  } else {
    const dag = new Date(`${keuze.datum}T12:00:00Z`).getUTCDay();
    if (!REGELS.dagen.includes(dag)) {
      fouten.push('Uitjes zijn mogelijk op donderdag, vrijdag en zaterdag.');
    }
    if (dagenTussen(vandaagIso(), keuze.datum) < REGELS.minDagenVooruit) {
      fouten.push(`Boek minimaal ${REGELS.minDagenVooruit} dagen vooruit.`);
    }
  }

  // Aantal personen
  if (!Number.isInteger(keuze.personen) || keuze.personen < REGELS.minPers || keuze.personen > REGELS.maxPers) {
    fouten.push(`Het aantal personen ligt tussen ${REGELS.minPers} en ${REGELS.maxPers}.`);
  }

  const gekozen = TIJDVAKKEN.flatMap((t) => {
    const slug = keuze.blokken[t.id];
    if (!slug) return [];
    const b = vindBouwsteen(slug);
    if (!b) {
      fouten.push(`Onbekend onderdeel bij ${t.naam.toLowerCase()}.`);
      return [];
    }
    return [{ tijdvak: t, blok: b }];
  });

  if (!gekozen.some((g) => g.tijdvak.id === 'ochtend' || g.tijdvak.id === 'middag')) {
    fouten.push('Kies minimaal één activiteit in de ochtend of middag.');
  }

  const maand = Number(keuze.datum.slice(5, 7));
  for (const { tijdvak, blok } of gekozen) {
    if (!blok.tijdvakken.includes(tijdvak.id)) {
      fouten.push(`${blok.naam} kan niet in het tijdvak ${tijdvak.naam.toLowerCase()}.`);
    }
    if (keuze.personen < blok.minPers || keuze.personen > blok.maxPers) {
      fouten.push(`${blok.naam} kan met ${blok.minPers} tot ${blok.maxPers} personen.`);
    }
    if (blok.seizoen && maand && (maand < blok.seizoen.van || maand > blok.seizoen.tot)) {
      fouten.push(`${blok.naam} is alleen mogelijk van april tot en met oktober.`);
    }
  }

  // Verplaatsen tussen centrum en Amelisweerd kan alleen met de kickbike
  let huidig: Cluster | null = null;
  let kickbikeSindsdien = false;
  let wissels = 0;
  for (const { blok } of gekozen) {
    if (blok.cluster === 'beide') {
      kickbikeSindsdien = true;
      continue;
    }
    if (huidig && blok.cluster !== huidig) {
      if (!kickbikeSindsdien) {
        fouten.push(
          `Van ${CLUSTERS[huidig].naam} naar ${CLUSTERS[blok.cluster].naam} gaat met de kickbike: kies de kickbike-tocht als tussenstap.`
        );
      }
      wissels++;
    }
    huidig = blok.cluster;
    kickbikeSindsdien = false;
  }
  if (wissels > REGELS.maxClusterWissels) {
    fouten.push('Wissel maximaal één keer tussen centrum en Amelisweerd.');
  }

  return [...new Set(fouten)];
}

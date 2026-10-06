/**
 * Duitse teksten van de pagina's, de kop, de voet, het boekformulier en de
 * bevestigingsmail. Zelfde vorm als ui-en.ts (UiTekst), altijd met 'Sie'.
 * Getallen komen altijd binnen als argument uit aanbod.ts (REGELS, prijzen).
 */
import { REGELS } from '../aanbod';
import type { FormulierTekst } from './types';
import type { UiTekst } from './ui-en';

const R = REGELS;

const formulier: FormulierTekst = {
  groepen: {
    TEAM: 'Unternehmen oder Team',
    SCHOOL: 'Schule',
    STUDENT: 'Studierende',
    BACHELORETTE: 'Junggesellenabschied oder Freunde',
    FAMILY: 'Familie',
  },
  stap1Kop: '1. Wann und mit wie vielen?',
  stap1Uitleg:
    'Donnerstag, Freitag oder Samstag, mindestens {dagen} Tage im Voraus. Ab {min} Personen.',
  datum: 'Datum',
  personen: 'Anzahl Personen',
  stap2Kop: '2. Mit einem Paket beginnen',
  stap2Uitleg: 'Oder überspringen Sie diesen Schritt und wählen Sie unten selbst pro Zeitfenster.',
  dezeWinter: '❄️ Diesen Winter',
  dezeZomer: '☀️ Diesen Sommer',
  vanafApril: 'Ab April',
  vanafNovember: 'Ab November',
  pp: 'p. P.',
  stap3Kop: '3. Pro Zeitfenster wählen',
  stap3Uitleg: 'Zwischen der Innenstadt und Amelisweerd wechseln Sie mit der Kickbike-Tour.',
  tot: 'bis',
  nietsInTijdvak: 'Nichts in diesem Zeitfenster',
  jullieDag: 'Ihr Tag',
  perPersoon: 'Pro Person',
  totaal: 'Gesamt ({n} Pers.)',
  totaalZonder: 'Gesamt',
  inclusiefBtw: 'Inklusive niederländischer MwSt. Festpreis, keine Überraschungen hinterher.',
  soortGroep: 'Art der Gruppe',
  naam: 'Name',
  email: 'E-Mail',
  telefoon: 'Telefon (für den Tag selbst)',
  bedrijf: 'Unternehmen oder Schule (optional)',
  opmerking: 'Anmerkung (optional)',
  versturen: 'Anfrage senden',
  bezig: 'Wird gesendet...',
  kleineletters:
    'Sie zahlen jetzt noch nichts. Innerhalb von 3 Werktagen bestätigen wir die Verfügbarkeit und senden Ihnen einen Zahlungslink. Ernährungswünsche können Sie in der Anmerkung angeben. Individuelle Programme sind nicht möglich.',
  foutVersturen:
    'Beim Senden ist etwas schiefgegangen. Bitte versuchen Sie es erneut oder rufen Sie uns an: +31 30 227 14 39.',
  bedanktKop: 'Vielen Dank, Ihre Anfrage ist eingegangen',
  bedanktNummer: 'Anfragenummer {code}. Sie erhalten gleich eine Bestätigung per E-Mail.',
  bedanktTekst:
    'Wir prüfen die Verfügbarkeit bei unseren Partnern und senden Ihnen innerhalb von 3 Werktagen eine Bestätigung mit Zahlungslink. Die Buchung ist verbindlich, sobald die Zahlung eingegangen ist.',
  fouten: {
    'geen-datum': 'Bitte wählen Sie ein Datum.',
    'verkeerde-dag': 'Ausflüge sind donnerstags, freitags und samstags möglich.',
    'te-kort-vooruit': 'Bitte buchen Sie mindestens {dagen} Tage im Voraus.',
    aantal: 'Die Teilnehmerzahl liegt zwischen {min} und {max}.',
    'onbekend-onderdeel': 'Unbekannter Programmpunkt im Zeitfenster {tijdvak}.',
    'geen-activiteit': 'Bitte wählen Sie mindestens eine Aktivität am Vormittag oder Nachmittag.',
    'verkeerd-tijdvak': '{blok} ist im Zeitfenster {tijdvak} nicht möglich.',
    'aantal-blok': '{blok} ist mit {min} bis {max} Personen möglich.',
    seizoen: '{blok} ist nur von {maanden} möglich.',
    'kickbike-nodig':
      'Von {van} nach {naar} geht es mit dem Kickbike: Wählen Sie die Kickbike-Tour als Zwischenschritt.',
    'te-veel-wissels': 'Wechseln Sie höchstens einmal zwischen Innenstadt und Amelisweerd.',
  },
  veldFouten: {
    naam: 'Bitte geben Sie Ihren Namen ein',
    email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    telefoon: 'Bitte geben Sie Ihre Telefonnummer ein',
    algemeen: 'Bitte prüfen Sie das Formular',
  },
};

export const UI_DE: UiTekst = {
  taalNaam: 'Deutsch',

  layout: {
    titel: 'DagjeUtrecht: Gruppenausflüge in Utrecht',
    omschrijving:
      'Feste Tagespakete in Utrecht für Unternehmen, Schulen und Freundesgruppen: Boule, Kanufahren, Kickbike, Grachtenfahrt und Umtrunk. Festpreis pro Person.',
    ogTitel: 'Ein Tag in Utrecht für Gruppen, mit festen Paketen',
    ogOmschrijving:
      'Boule, Kanufahren, Kickbike, Grachtenfahrt und Umtrunk. Wählen Sie ein Paket oder stellen Sie Ihren Tag selbst zusammen, zum Festpreis pro Person.',
    ogAlt: 'DagjeUtrecht - Tagesprogramme in Utrecht',
    orgOmschrijving:
      'DagjeUtrecht organisiert feste Tagespakete in Utrecht für Unternehmen, Schulen und Freundesgruppen.',
    siteOmschrijving: 'Tagespakete in Utrecht zum Festpreis pro Person.',
    dienst: 'Tagesprogramme in Utrecht',
    publiek: 'Unternehmen, Schulen, Vereine, Familien, Junggesellenabschiede',
    naarInhoud: 'Zum Inhalt springen',
  },

  kop: {
    nav: [
      { sleutel: 'home', label: 'Start' },
      { sleutel: 'pakketten', label: 'Pakete' },
      { sleutel: 'bouwstenen', label: 'Alle Aktivitäten' },
      { sleutel: 'bedrijfsuitje', label: 'Firmenausflug' },
      { sleutel: 'teambuilding', label: 'Teambuilding' },
      { sleutel: 'vrijgezellenfeest', label: 'JGA' },
      { sleutel: 'contact', label: 'Kontakt' },
    ],
    aanvragen: 'Anfragen',
    logoLabel: 'DagjeUtrecht, zur Startseite',
    hoofdmenu: 'Hauptmenü',
    hoofdmenuMobiel: 'Hauptmenü mobil',
    menuOpen: 'Menü öffnen',
    menuDicht: 'Menü schließen',
    taal: 'Sprache',
  },

  voet: {
    tagline:
      'Feste Tagespakete in Utrecht für Unternehmen, Schulen und Freundesgruppen. Zum Festpreis pro Person.',
    knop: 'Tag planen',
    steps: 'Nur Kickbikes mieten? Buchen Sie direkt bei',
    stepsNa: '(auf Niederländisch).',
    contact: 'Kontakt',
    telefoon: '+31 30 227 14 39',
    kvk: 'Handelsregister (KvK) 63330393',
    paginas: 'Seiten',
    links: [
      { sleutel: 'pakketten', label: 'Pakete' },
      { sleutel: 'bouwstenen', label: 'Alle Aktivitäten' },
      { sleutel: 'boeken', label: 'Tag selbst zusammenstellen' },
      { sleutel: 'overOns', label: 'Über uns' },
      { sleutel: 'voorwaarden', label: 'AGB' },
      { sleutel: 'privacy', label: 'Datenschutz' },
    ],
    voorWie: 'Für wen?',
    handelsnaam:
      'DagjeUtrecht, ein Handelsname von Traxeo. Preise pro Person inklusive MwSt. Fotos: DagjeSuppen.nl und',
    kaart: 'Kartendaten:',
    osm: '© OpenStreetMap-Mitwirkende',
  },

  boekBlok: {
    titel: 'Bereit für einen Tag in Utrecht?',
    tekst:
      'Wählen Sie ein Paket oder stellen Sie Ihren Tag selbst zusammen. Den Preis sehen Sie sofort.',
    knop: 'Tag planen',
  },

  pakketKaart: {
    dezeWinter: '❄️ Diesen Winter',
    dezeZomer: '☀️ Diesen Sommer',
    vanafApril: 'Ab April',
    vanafNovember: 'Ab November',
    teBoeken: 'Buchbar von',
    perPersoon: 'pro Person',
  },

  bouwsteenKaart: {
    waar: 'Wo',
    wanneer: 'Wann',
    groep: 'Gruppe',
    vanaf: (n: number) => `ab ${n} Personen`,
    seizoen: 'Saison',
    inclusief: 'Inklusive',
    of: ' oder ',
    meer: (naam: string) => `Mehr über: ${naam}`,
  },

  home: {
    metaTitel: (prijs: string) => `Gruppenausflug Utrecht ab ${prijs} | DagjeUtrecht`,
    metaOmschrijving: (prijs: string) =>
      `Ein Tag in Utrecht mit Ihrer Gruppe: Boule, Kanufahren, Grachtenfahrt, City Challenge und Umtrunk. Feste Pakete ab ${prijs} pro Person, inkl. MwSt.`,
    cijfers: (aantalBouwstenen: number) => [
      { getal: `Ab ${R.minPers}`, label: 'Personen pro Gruppe' },
      { getal: `${aantalBouwstenen}`, label: 'Programmpunkte zum Kombinieren' },
      { getal: '3', label: 'Werktage bis zur Bestätigung' },
      { getal: 'Fest', label: 'Preis pro Person, inkl. MwSt.' },
    ],
    stappen: [
      {
        titel: 'Tag wählen',
        tekst:
          'Nehmen Sie ein Paket oder stellen Sie selbst pro Zeitfenster zusammen. Den Preis sehen Sie sofort.',
      },
      {
        titel: 'Wir organisieren',
        tekst:
          'Innerhalb von 3 Werktagen bestätigen unsere Partner alles, und Sie erhalten einen Zahlungslink. Unsere Partner sind an internationale Gruppen gewöhnt.',
      },
      {
        titel: 'Los geht’s',
        tekst: 'Am Tag vorher bekommen Sie alle Zeiten und Adressen. Sie müssen nur noch kommen.',
      },
    ],
    voorWie: {
      bedrijfsuitje: {
        titel: 'Firmenausflug',
        tekst: 'Gemeinsam spielen, paddeln und mit einem Umtrunk abschließen.',
      },
      vrijgezellenfeest: {
        titel: 'Junggesellenabschied',
        tekst: 'Stand-up-Paddling, Picknick und mit dem Kickbike zum Umtrunk.',
      },
      teambuilding: {
        titel: 'Teambuilding',
        tekst: 'Im Kanu zusammenarbeiten oder auf der Boulebahn wetteifern.',
      },
      personeelsuitje: {
        titel: 'Betriebsausflug',
        tekst: 'Ein Nachmittag Boule und Umtrunk, bei dem alle mitmachen können.',
      },
      familiedag: {
        titel: 'Familientag',
        tekst: 'Ein Tag mit Kollegen, Partnern und Kindern, auf dem Wasser oder in der Altstadt.',
      },
      school: {
        titel: 'Schulausflug',
        tekst: 'Auf den Domturm, gemeinsam Mittag essen und eine Fahrt über die Grachten.',
      },
    },
    faq: (p: { goedkoopste: string }) => [
      {
        q: 'Was kann man mit einer Gruppe in Utrecht unternehmen?',
        a: 'In der Innenstadt: Boule, Shuffleboard, den Domturm besteigen, eine Grachtenfahrt und die City Challenge durch die Altstadt. In Amelisweerd, einem grünen Landgut am Stadtrand: Kanufahren und Stand-up-Paddling auf der Kromme Rijn, ein Picknick und Grillen. Mit dem Kickbike kommen Sie vom einen zum anderen.',
      },
      {
        q: 'Was kostet ein Gruppenausflug nach Utrecht?',
        a: `Der günstigste halbe Tag kostet ${p.goedkoopste} pro Person. Jedes Paket hat einen festen Preis pro Person, inklusive niederländischer MwSt. Was ein einzelner Programmpunkt kostet, sehen Sie auf der Seite mit allen Aktivitäten.`,
      },
      {
        q: 'Ab wie vielen Personen ist es möglich?',
        a: `Ab ${R.minPers} Personen. Online buchen können Sie bis ${R.maxPers} Personen.`,
      },
      {
        q: 'An welchen Tagen ist es möglich?',
        a: `Donnerstag, Freitag und Samstag. Bitte buchen Sie mindestens ${R.minDagenVooruit} Tage im Voraus.`,
      },
      {
        q: 'Wie kommen wir hin?',
        a: 'Alles in der Innenstadt ist zu Fuß vom Bahnhof Utrecht Centraal (Hauptbahnhof) erreichbar. Amelisweerd liegt am Stadtrand, bei De Rijnstroom (Weg naar Rhijnauwen 2); die Kickbike-Tour verbindet beides.',
      },
      {
        q: 'Wie bezahlen wir?',
        a: 'Sie bezahlen den vollen Betrag vorab über einen Zahlungslink, den Sie mit der Bestätigung innerhalb von 3 Werktagen erhalten. Unternehmen erhalten eine Rechnung auf den Firmennamen.',
      },
      {
        q: 'Was ist bei schlechtem Wetter?',
        a: 'Boule, Shuffleboard, das Mittagessen und der Umtrunk finden drinnen statt. Utrecht Spiel & Umtrunk ist ein ganzer Tag drinnen in der Innenstadt und findet also immer statt.',
      },
    ],
    heroSticker: `Gruppen ab ${R.minPers} Personen`,
    heroRegels: ['Ein Tag', 'in Utrecht', 'mit Ihrer Gruppe'],
    heroWinter:
      'Glühwein, Boule, auf den Domturm und ein Umtrunk. Sie wählen die Programmpunkte, wir regeln den Rest.',
    heroZomer:
      'Stand-up-Paddling, Kanufahren, Kickbike, Boule und Umtrunk. Sie wählen die Programmpunkte, wir regeln den Rest.',
    bekijkPakketten: 'Pakete ansehen',
    zelfSamenstellen: 'Selbst zusammenstellen',
    stickerWinter: 'Neu: Winter',
    stickerPakketten: 'Pakete',
    perPersoon: 'pro Person',
    bandWinter: [
      'Warmer Wintertag',
      'Glühwein',
      'Boule',
      'Domturm',
      'Erbsensuppe',
      'Shuffleboard',
      'Umtrunk',
    ],
    bandZomer: [
      'Stand-up-Paddling',
      'Kanufahren',
      'Kickbike',
      'Boule',
      'Shuffleboard',
      'Grachtenfahrt',
      'Umtrunk',
      'Grillen',
    ],
    inHetKort: 'Kurz gesagt',
    uitgelichtWinter: '❄️ Unser Tipp für den Winter',
    uitgelichtZomer: '☀️ Unser Tipp für den Sommer',
    teBoekenVan: 'Buchbar von',
    boekDezeDag: 'Diesen Tag buchen',
    bekijkProgramma: 'Programm ansehen',
    pakketten: 'Pakete',
    vastePrijs: 'Festpreis pro Person, inkl. MwSt.',
    hoeWerktHet: 'So funktioniert es',
    stap: 'Schritt',
    stelSamen: 'Tag planen',
    stickerBuitenWinter: 'Aktiv und draußen, April bis Oktober',
    stickerBuiten: 'Aktiv und draußen',
    stickerBinnenWinter: 'Drinnen und schön warm',
    stickerSpelen: 'Spielen und Umtrunk',
    pp: 'p. P.',
    bandPlekken: [
      'Oudegracht',
      'Amelisweerd',
      'Kromme Rijn',
      'Domturm',
      'Paardenveld',
      'Rhijnauwen',
    ],
    voorWieKop: 'Für wen?',
    waterKop: 'Utrecht vom Wasser aus',
    waterTekst: 'Über die Grachten, entlang der Kromme Rijn und durch die Altstadt.',
    faqKop: 'Häufige Fragen',
  },

  pakketten: {
    metaTitel: (aantal: number, laagste: string) =>
      `Gruppenausflug Utrecht: ${aantal} Pakete ab ${laagste}`,
    metaOmschrijving: (aantal: number, laagste: string, hoogste: string) =>
      `Gruppenausflug nach Utrecht für Unternehmen, Schulen und Freunde: ${aantal} feste Pakete von ${laagste} bis ${hoogste} pro Person, inkl. MwSt. Wählen und direkt buchen.`,
    lijstNaam: 'Pakete für einen Gruppenausflug in Utrecht',
    kruimel: 'Pakete',
    titel: 'Pakete für Ihren Gruppenausflug',
    intro:
      'Tage, die gut funktionieren. Buchen Sie sie so, wie sie sind, oder tauschen Sie bei der Planung einzelne Programmpunkte aus.',
    label: 'Festpreis pro Person',
    knop: 'Selbst zusammenstellen',
    zoWerktKop: 'Ein Gruppenausflug nach Utrecht, so funktioniert es',
    zoWerkt1:
      'Jedes Paket ist ein fester Tag oder ein fester halber Tag bei unseren Partnern in Utrecht: JEU de boules bar und The Grand Shuffle in der Innenstadt, De Rijnstroom in Amelisweerd, der Domturm und die Grachtenfahrt. Der Preis pro Person ist die Summe der Programmpunkte, inklusive niederländischer MwSt. So wissen Sie vorab genau, was der Ausflug kostet.',
    zoWerkt2: (van: string, tot: string) =>
      `Die Pakete sind ab ${R.minPers} Personen buchbar, donnerstags, freitags und samstags, mindestens ${R.minDagenVooruit} Tage im Voraus. Ein ganzer Tag dauert von ${van} bis ${tot} Uhr. Die Programmpunkte in der Innenstadt sind zu Fuß vom Bahnhof Utrecht Centraal erreichbar.`,
    halfKop: 'Ganzer oder halber Tag',
    half: (aantal: number, namen: string, laagste: string) =>
      `Hat die Gruppe nur einen Vormittag oder einen Nachmittag Zeit, wählen Sie eines der ${aantal} kürzeren Pakete: ${namen}. Der günstigste Ausflug kostet ${laagste} pro Person.`,
    gelegenheid: 'Suchen Sie einen Ausflug für einen bestimmten Anlass?',
    boekBlokTitel: 'Lieber selbst wählen?',
    boekBlokTekst:
      'Stellen Sie Ihren Tag pro Zeitfenster aus allen Programmpunkten selbst zusammen.',
  },

  pakket: {
    metaTitel: (naam: string, prijs: string) => {
      const plek = naam.includes('Utrecht') ? naam : `${naam} Utrecht`;
      const metPrijs = `${plek}: ${prijs} pro Person`;
      if (metPrijs.length + 15 <= 65) return metPrijs;
      const kort = `${plek}, ${prijs} p. P.`;
      if (kort.length + 15 <= 65) return kort;
      return `${naam}: Tagespaket Utrecht`;
    },
    metaOmschrijving: (naam: string, kort: string, voorWie: string, prijs: string) => {
      const staart = `${prijs} pro Person inkl. MwSt., ab ${R.minPers} Personen.`;
      const kop = naam.includes('Utrecht') ? naam : `${naam} in Utrecht`;
      const kandidaten = [
        `${kop}. ${kort} Für ${voorWie}. ${staart}`,
        `${kop}. ${kort} ${staart}`,
        `${kort} ${staart}`,
      ];
      return kandidaten.find((k) => k.length <= 155) ?? kandidaten[kandidaten.length - 1]!;
    },
    categorie: 'Gruppenausflug Utrecht',
    vragen: (p: {
      naam: string;
      inbegrepen: string;
      eerste: string;
      laatste: string;
      minimum: number;
      maximum: number;
      prijs: string;
      maanden: string | null;
    }) => [
      {
        q: `Was ist bei ${p.naam} inbegriffen?`,
        a: `${p.inbegrepen}. Die Preise verstehen sich inklusive niederländischer MwSt.`,
      },
      {
        q: 'Wann beginnt und endet das Programm?',
        a: `Das Programm beginnt um ${p.eerste} Uhr und endet um ${p.laatste} Uhr.`,
      },
      {
        q: 'Mit wie vielen Personen ist es möglich?',
        a: `Mit ${p.minimum} bis ${p.maximum} Personen. Sie zahlen ${p.prijs} pro Person.`,
      },
      {
        q: 'Wann ist es möglich?',
        a: `${p.maanden ? `Von ${p.maanden}, ` : 'Das ganze Jahr, '}donnerstags, freitags und samstags. Bitte buchen Sie mindestens ${R.minDagenVooruit} Tage im Voraus.`,
      },
      {
        q: 'Kann ich einen Programmpunkt austauschen?',
        a: 'Ja. Wählen Sie bei der Planung für ein Zeitfenster einen anderen Programmpunkt; der Preis wird sofort neu berechnet.',
      },
    ],
    voor: 'Für:',
    teBoekenVan: 'Buchbar von',
    perPersoon: 'pro Person',
    kiesDatum: 'Datum wählen und buchen',
    programma: 'Das Programm',
    tot: 'bis',
    perPersoonBtw: 'pro Person, inklusive MwSt.',
    regels: `ab ${R.minPers} Personen · Donnerstag, Freitag oder Samstag · mindestens ${R.minDagenVooruit} Tage im Voraus`,
    wisselen: 'Programmpunkte tauschen',
    faqKop: 'Häufige Fragen',
    pastBij: 'Passt zu:',
    inUtrecht: 'in Utrecht',
    anderePakketten: 'Weitere Pakete',
  },

  bouwstenen: {
    metaTitel: (n: number) => `Gruppenaktivitäten in Utrecht: ${n} Programmpunkte`,
    metaOmschrijving:
      'Gruppenaktivitäten in Utrecht: Boule, Shuffleboard, Domturm, Grachtenfahrt, Kanufahren, Stand-up-Paddling, City Challenge, Grillen und Umtrunk. Festpreis p. P.',
    ogOmschrijving:
      'Boule, Shuffleboard, Domturm, Grachtenfahrt, Kanufahren, Stand-up-Paddling, City Challenge, Mittagessen, Grillen und Umtrunk. Festpreis pro Person.',
    lijstNaam: 'Gruppenaktivitäten in Utrecht',
    kruimel: 'Aktivitäten',
    titel: 'Aktivitäten in Utrecht',
    intro:
      'Das sind die Bausteine Ihres Tages. Jeder Programmpunkt hat einen festen Preis pro Person und ein festes Zeitfenster, so stellen Sie einen Tag zusammen, der zu Ihrer Gruppe passt.',
    label: (n: number) => `${n} Aktivitäten`,
    knop: 'Tag planen',
    secties: {
      amelisweerd: { titel: 'Amelisweerd', sticker: 'Auf dem Wasser' },
      centrum: { titel: 'Innenstadt', sticker: 'Spielen und Umtrunk' },
      beide: { titel: 'Unterwegs', sticker: 'Von A nach B' },
    },
    aanvraagKop: 'Etwas anderes?',
    aanvraagTekst:
      'Einige Aktivitäten, etwa Bowling, Bouldern oder ein Escape Room, organisieren wir auf Anfrage. Sie haben keinen Festpreis und sind nicht online buchbar: Schreiben Sie an info@dagjeutrecht.nl, dann erhalten Sie innerhalb eines Werktags einen Vorschlag mit Preis pro Person.',
  },

  bouwsteen: {
    standaardTitel: (naam: string) => `${naam} in Utrecht`,
    standaardOmschrijving: (kort: string, min: number, prijs: string) =>
      `${kort} Ab ${min} Personen, ${prijs} pro Person.`,
    kruimel: 'Aktivitäten',
    vanaf: (n: number) => `ab ${n} Personen`,
    perPersoon: 'pro Person',
    stelSamen: 'Tag planen',
    praktisch: 'Praktische Infos',
    waar: 'Wo',
    duur: 'Dauer',
    wanneer: 'Wann',
    groep: 'Gruppe',
    groepTekst: (min: number, max: number) => `ab ${min} bis ${max} Personen`,
    inclusief: 'Inklusive',
    seizoen: 'Saison',
    of: ' oder ',
    tot: 'bis',
    perPersoonBtw: 'pro Person, inklusive MwSt.',
    regels: `Donnerstag, Freitag oder Samstag · mindestens ${R.minDagenVooruit} Tage im Voraus`,
    faqKop: 'Häufige Fragen',
    inPakketten: 'Enthalten in diesen Paketen',
    combineer: 'Kombinieren Sie es mit',
    andere: (waar: string) => `Weitere Programmpunkte ${waar}, am selben Tag buchbar.`,
    onderweg: 'unterwegs',
    inCluster: (naam: string) => (naam === 'Innenstadt' ? 'in der Innenstadt' : `in ${naam}`),
    alleBekijken: 'Alle Aktivitäten ansehen',
  },

  landing: {
    kruimelHome: 'Start',
    bekijkPakketten: 'Pakete ansehen',
    zoDag: 'So sieht der Tag aus',
    voorbeeld: (naam: string, prijs: string) =>
      `Ein Beispiel: ${naam}, für ${prijs} pro Person inklusive MwSt. Jeden Programmpunkt können Sie bei der Planung austauschen.`,
    tot: 'bis',
    inbegrepen: 'Inklusive:',
    regels: `Ab ${R.minPers} Personen, donnerstags, freitags oder samstags, mindestens ${R.minDagenVooruit} Tage im Voraus.`,
    bekijk: (naam: string) => `${naam} ansehen`,
    passend: 'Passende Pakete',
    zelf: 'Selbst zusammenstellen',
    alleOnderdelen: 'Alle Aktivitäten',
    faqKop: 'Häufige Fragen',
    ookInteressant: 'Auch interessant',
    allePakketten: 'Alle Pakete',
    alleActiviteiten: 'Alle Aktivitäten',
    zusterNa: 'bei Stepverhuur Utrecht (auf Niederländisch).',
    boekBlok: 'Bereit, einen Termin festzulegen?',
  },

  boeken: {
    metaTitel: 'Tag zusammenstellen und buchen',
    metaOmschrijving:
      'Wählen Sie ein Paket oder stellen Sie Ihren Tag in Utrecht aus festen Programmpunkten selbst zusammen. Festpreis pro Person, Bestätigung innerhalb von 3 Werktagen.',
    titel: 'Ihren Tag planen',
    intro:
      'Wählen Sie pro Zeitfenster einen Programmpunkt. Der Preis ist fest, und Sie sehen ihn sofort. Wir übernehmen die Reservierungen bei unseren Partnern in Utrecht.',
    label: 'In 3 Schritten',
  },

  betaald: {
    metaTitel: 'Vielen Dank für Ihre Zahlung',
    titel: 'Vielen Dank!',
    tekst: (code: string) =>
      `Sobald die Zahlung bei uns eingegangen ist, ist Ihre Buchung${code ? ` ${code}` : ''} verbindlich.`,
    dagErvoor: 'Am Tag vor dem Ausflug erhalten Sie alle praktischen Informationen per E-Mail.',
    terug: 'Zurück zur Startseite',
  },

  contact: {
    metaTitel: 'Kontakt: Ihren Tag in Utrecht anfragen',
    metaOmschrijving:
      'Fragen zu einem Tag in Utrecht für Ihre Gruppe? Rufen Sie +31 30 227 1439 an oder schreiben Sie an info@dagjeutrecht.nl. Wir helfen gern bei Datum, Gruppengröße und Programm.',
    titel: 'Kontakt',
    voor: 'Am schnellsten buchen Sie einen Tag über unsere',
    link: 'Buchungsseite',
    na: '. Fragen zu einer Buchung? Melden Sie sich gern:',
    telefoon: '+31 30 227 14 39',
    taal: 'Schreiben Sie uns gern eine E-Mail.',
    handelsnaam:
      'DagjeUtrecht ist ein Handelsname von Traxeo, niederländisches Handelsregister (KvK) 63330393.',
  },

  overOns: {
    metaTitel: 'Über uns: Gruppenausflüge in Utrecht',
    metaOmschrijving:
      'DagjeUtrecht organisiert Tagesprogramme in Utrecht für Gruppen. Wer wir sind, mit welchen Partnern in der Stadt wir arbeiten und wie wir Ihren Tag organisieren.',
    ogTitel: 'Über DagjeUtrecht: Gruppenausflüge in Utrecht',
    ogOmschrijving:
      'Wer wir sind, mit welchen Partnern in Utrecht wir arbeiten und wie wir den Tag für Ihre Gruppe organisieren.',
    ogAlt: 'DagjeUtrecht, Tagesprogramme in Utrecht',
    kruimel: 'Über uns',
    titel: 'Über DagjeUtrecht',
    p1: 'DagjeUtrecht ist ein Handelsname von Traxeo, mit langjähriger Erfahrung in organisierten Gruppenausflügen für Unternehmen, Schulen und Vereine in Utrecht.',
    p2: 'Wir machen Utrecht zu einem Tag, den Sie nicht vergessen. Sie wählen ein Paket oder stellen Ihren Tag selbst zusammen, wir übernehmen die Reservierungen bei unseren Partnern. Am Tag selbst ist Ger Ihr Ansprechpartner.',
    waaromKop: 'Warum diese Website?',
    waarom:
      'Einen Gruppenausflug zu organisieren kostet oft viele E-Mails und Telefonate. Deshalb arbeiten wir mit festen Programmpunkten bei festen Partnern, etwa der JEU de boules bar und Botenverhuur De Rijnstroom. Sie sehen sofort den Preis, und innerhalb von 3 Werktagen ist alles bestätigt.',
    partnersKop: 'Unsere Partner in Utrecht',
    partners: (n: number) =>
      `Alle ${n} Programmpunkte, die Sie bei uns buchen, werden von festen Partnern in der Stadt durchgeführt. Die City Challenge durch die Altstadt organisieren wir selbst.`,
    partnerLijst: [
      {
        naam: 'JEU de boules bar',
        wat: 'Boule auf überdachten Bahnen, der Empfang und der Umtrunk, am Paardenveld',
      },
      { naam: 'The Grand Shuffle', wat: 'Shuffleboard in der Innenstadt' },
      {
        naam: 'Brothers Horeca Groep',
        wat: 'das Gruppen-Mittagessen und das winterliche Mittagessen',
      },
      {
        naam: 'Botenverhuur De Rijnstroom',
        wat: 'Kanufahren, Stand-up-Paddling, das Picknick und das Grillen in Amelisweerd',
      },
      { naam: 'Domturm', wat: 'die Besteigung mit Führung' },
      { naam: 'Rederij Schuttevaer', wat: 'die Grachtenfahrt' },
      { naam: 'Stepverhuur Utrecht', wat: 'die Kickbikes für die Tour entlang der Kromme Rijn' },
    ],
    werkenKop: 'So arbeiten wir',
    werken: (aantalPakketten: number) =>
      `Es gibt ${aantalPakketten} feste Pakete, von einem Vormittag bis zu einem ganzen Tag. Jedes Paket hat einen festen Preis pro Person, inklusive niederländischer MwSt., und dieser Preis ist die Summe der Programmpunkte. Sie buchen ab ${R.minPers} Personen, donnerstags, freitags oder samstags, mindestens ${R.minDagenVooruit} Tage im Voraus. Bis ${R.aantalDefinitiefDagenVooraf} Tage vor dem Termin kann sich die Teilnehmerzahl noch ändern.`,
    maatwerk:
      'Individuelle Programme bieten wir bewusst nicht an. Feste Programmpunkte bei festen Partnern bedeuten, dass wir schnell bestätigen können und der Preis von Anfang an stimmt.',
    bekijkPakketten: 'Pakete ansehen',
    of: 'oder',
    alleOnderdelen: 'alle Aktivitäten',
    voorWieKop: 'Für wen',
    inUtrecht: 'in Utrecht',
    contactKop: 'Kontakt',
    telefoon: '+31 30 227 14 39',
    bedrijfKop: 'Unser Unternehmen',
    kvk: 'Handelsregister (KvK) 63330393',
  },

  voorwaarden: {
    metaTitel: 'AGB',
    metaOmschrijving:
      'Die Bedingungen von DagjeUtrecht: wie weit im Voraus Sie buchen, Zahlung vorab, Teilnehmerzahl ändern, Stornierung, schlechtes Wetter und der Tag selbst.',
    titel: 'Allgemeine Geschäftsbedingungen',
    intro:
      'DagjeUtrecht ist ein Handelsname von Traxeo (niederländisches Handelsregister, KvK 63330393). Diese Bedingungen gelten für alle Buchungen über DagjeUtrecht.nl. Dies ist eine Übersetzung zu Ihrer Information; bei Abweichungen gilt die niederländische Fassung.',
    boekenKop: 'Buchen',
    boeken: [
      `Ausflüge sind donnerstags, freitags und samstags möglich, für Gruppen ab ${R.minPers} Personen.`,
      `Buchen Sie mindestens ${R.minDagenVooruit} Tage vor dem gewünschten Datum.`,
      'Nach Ihrer Anfrage prüfen wir die Verfügbarkeit bei unseren Partnern. Innerhalb von 3 Werktagen erhalten Sie eine Bestätigung mit Zahlungslink.',
      'Die Buchung ist verbindlich, sobald die Zahlung eingegangen ist.',
      'Das Programm besteht aus festen Programmpunkten zu festen Zeiten. Individuelle Programme sind nicht möglich. Ernährungswünsche können Sie bei der Buchung angeben.',
    ],
    prijzenKop: 'Preise und Zahlung',
    prijzen: [
      'Alle Preise gelten pro Person und verstehen sich inklusive niederländischer MwSt.',
      'Sie bezahlen den vollen Betrag vorab über den Zahlungslink.',
    ],
    wijzigenKop: 'Änderungen',
    wijzigen: [
      `Die Teilnehmerzahl kann bis ${R.aantalDefinitiefDagenVooraf} Tage vor dem Termin angepasst werden, innerhalb der Grenzen des gewählten Programms.`,
      'Danach ist die Zahl verbindlich, und Sie bezahlen für die angegebene Teilnehmerzahl.',
    ],
    annulerenKop: 'Stornierung und Wetter',
    annuleren:
      'Bei einer Stornierung gelten die Stornobedingungen der Partner in Ihrem Programm. Sie erhalten diese mit der Bestätigung. Kann ein Partner einen Programmpunkt wegen gefährlichen Wetters (etwa Gewitter oder Sturm) nicht durchführen, nehmen wir Kontakt mit Ihnen auf.',
    dagKop: 'Am Tag selbst',
    dag: 'Am Tag vor dem Ausflug erhalten Sie alle Zeiten, Adressen und eine Telefonnummer, unter der Sie uns an diesem Tag erreichen. Die Teilnahme an den Aktivitäten erfolgt auf eigene Gefahr; folgen Sie immer den Anweisungen des Partners vor Ort.',
  },

  privacy: {
    metaTitel: 'Datenschutzerklärung',
    metaOmschrijving:
      'Welche Daten DagjeUtrecht erhebt, wenn Sie einen Tag anfragen oder buchen, wofür wir sie nutzen, an wen wir sie weitergeben und wie lange wir sie aufbewahren.',
    titel: 'Datenschutzerklärung',
    intro:
      'DagjeUtrecht (Handelsname von Traxeo, niederländisches Handelsregister KvK 63330393) verarbeitet personenbezogene Daten nur, um Anfragen zu bearbeiten und Buchungen durchzuführen.',
    verzamelenKop: 'Was wir erheben',
    verzamelen: [
      'Name, E-Mail, Telefon - über das Anfrageformular',
      'Firmendaten (Name, USt-IdNr.), wenn Sie eine Rechnung erhalten möchten',
      'Ihre Auswahl bei der Planung (Programmpunkte, Datum, Teilnehmerzahl)',
    ],
    gebruikKop: 'Wofür wir sie nutzen',
    gebruik: [
      'Um Ihre Anfrage zu beantworten und ein Angebot zu erstellen',
      'Um bei den von Ihnen gewählten Anbietern zu buchen',
      'Um Ihnen Rechnungen und Bestätigungen zu senden',
    ],
    delenKop: 'Weitergabe an Dritte',
    delen:
      'Nur an die Anbieter, die Sie selbst gewählt haben, und an unsere Verwaltungssoftware (WeFact für die Rechnungsstellung).',
    bewarenKop: 'Aufbewahrungsdauer',
    bewaren:
      'Anfragen und zugehörige Daten: 7 Jahre (niederländische steuerliche Aufbewahrungspflicht).',
    contactKop: 'Kontakt',
    contact: 'Fragen oder Anliegen (Auskunft, Berichtigung, Löschung)? Schreiben Sie an',
  },

  formulier,

  mail: {
    // Voor de interne mail aan Ger: blijft Nederlands.
    taalNaam: 'Duits',
    onderwerp: (code: string) => `Ihre Anfrage bei DagjeUtrecht.nl (${code})`,
    tekst: (m: {
      voornaam: string;
      datum: string;
      personen: number;
      programma: string;
      totaal: string;
      pp: string;
      code: string;
      opmerking?: string;
    }) => `Hallo ${m.voornaam},

vielen Dank für Ihre Anfrage bei DagjeUtrecht.nl. Wir prüfen jetzt die Verfügbarkeit bei unseren Partnern. Innerhalb von 3 Werktagen erhalten Sie eine Bestätigung mit Zahlungslink. Die Buchung ist verbindlich, sobald die Zahlung eingegangen ist.

Ihr Tag: ${m.datum}, ${m.personen} Personen

${m.programma}

Gesamt: ${m.totaal} (${m.pp} pro Person, inklusive niederländischer MwSt.)
${m.opmerking ? `
Ihre Anmerkung:
${m.opmerking}
Das berücksichtigen wir bei der Prüfung der Verfügbarkeit.
` : ''}
Die Teilnehmerzahl kann bis ${R.aantalDefinitiefDagenVooraf} Tage vor dem Termin angepasst werden.

Anfragenummer: ${m.code}
Fragen? Antworten Sie einfach auf diese E-Mail oder rufen Sie uns an: +31 30 227 14 39.

Viele Grüße,
Ger
DagjeUtrecht.nl
`,
    perPersoon: 'p. P.',
  },
};

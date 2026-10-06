/**
 * Engelse teksten van de pagina's, de kop, de voet, het boekformulier en de
 * bevestigingsmail. De vorm (UiTekst) is die van dit bestand; ui-de.ts volgt hem.
 * Getallen komen altijd binnen als argument uit aanbod.ts (REGELS, prijzen).
 */
import { REGELS } from '../aanbod';
import type { FormulierTekst } from './types';

const R = REGELS;

const formulier: FormulierTekst = {
  groepen: {
    TEAM: 'Company or team',
    SCHOOL: 'School',
    STUDENT: 'Students',
    BACHELORETTE: 'Bachelor party or friends',
    FAMILY: 'Family',
  },
  stap1Kop: '1. When and how many?',
  stap1Uitleg:
    'On a Thursday, Friday or Saturday, at least {dagen} days in advance. From {min} people.',
  datum: 'Date',
  personen: 'Number of people',
  stap2Kop: '2. Start with a package',
  stap2Uitleg: 'Or skip this and choose an activity for each time slot below.',
  dezeWinter: '❄️ This winter',
  dezeZomer: '☀️ This summer',
  vanafApril: 'From April',
  vanafNovember: 'From November',
  pp: 'p.p.',
  stap3Kop: '3. Choose per time slot',
  stap3Uitleg: 'Getting between the city centre and Amelisweerd is done with the kickbike tour.',
  tot: 'to',
  nietsInTijdvak: 'Nothing in this time slot',
  jullieDag: 'Your day',
  perPersoon: 'Per person',
  totaal: 'Total ({n} people)',
  totaalZonder: 'Total',
  inclusiefBtw: 'Including Dutch VAT. Fixed price, no surprises afterwards.',
  soortGroep: 'Type of group',
  naam: 'Name',
  email: 'Email',
  telefoon: 'Phone (for the day itself)',
  bedrijf: 'Company or school (optional)',
  opmerking: 'Comments (optional)',
  versturen: 'Send request',
  bezig: 'Sending...',
  kleineletters:
    'You do not pay anything yet. Within 3 working days we confirm availability and send you a payment link. Dietary requirements and custom programmes are not possible.',
  foutVersturen: 'Something went wrong while sending. Please try again or call +31 30 227 14 39.',
  bedanktKop: 'Thank you, we have received your request',
  bedanktNummer: 'Request number {code}. You will receive a confirmation by email shortly.',
  bedanktTekst:
    'We check availability with our partners and send a confirmation with a payment link within 3 working days. The booking is final once payment has been received.',
  fouten: {
    'geen-datum': 'Choose a date.',
    'verkeerde-dag': 'Outings are possible on Thursday, Friday and Saturday.',
    'te-kort-vooruit': 'Please book at least {dagen} days in advance.',
    aantal: 'The number of people must be between {min} and {max}.',
    'onbekend-onderdeel': 'Unknown activity in the {tijdvak} slot.',
    'geen-activiteit': 'Choose at least one activity in the morning or afternoon.',
    'verkeerd-tijdvak': '{blok} is not available in the {tijdvak} slot.',
    'aantal-blok': '{blok} is possible with {min} to {max} people.',
    seizoen: '{blok} is only available from {maanden}.',
    'kickbike-nodig':
      'Getting from {van} to {naar} is done by kickbike: choose the kickbike tour in between.',
    'te-veel-wissels': 'Switch between the city centre and Amelisweerd no more than once.',
  },
  veldFouten: {
    naam: 'Please enter your name',
    email: 'Please enter a valid email address',
    telefoon: 'Please enter your phone number',
    algemeen: 'Please check the form',
  },
};

export const UI_EN = {
  taalNaam: 'English',

  layout: {
    titel: 'DagjeUtrecht: group days out in Utrecht',
    omschrijving:
      'Fixed day packages in Utrecht for companies, schools and groups of friends: jeu de boules, canoeing, kickbikes, canal cruises and drinks. Fixed price per person.',
    ogTitel: 'A day out in Utrecht for groups, with fixed packages',
    ogOmschrijving:
      'Jeu de boules, canoeing, kickbikes, canal cruises and drinks. Choose a package or build your own day, at a fixed price per person.',
    ogAlt: 'DagjeUtrecht - day programmes in Utrecht',
    orgOmschrijving:
      'DagjeUtrecht organises fixed day packages in Utrecht for companies, schools and groups of friends.',
    siteOmschrijving: 'Day packages in Utrecht at a fixed price per person.',
    dienst: 'Day programmes in Utrecht',
    publiek: 'Companies, schools, associations, families, bachelor parties',
    naarInhoud: 'Skip to content',
  },

  kop: {
    nav: [
      { sleutel: 'home', label: 'Home' },
      { sleutel: 'pakketten', label: 'Packages' },
      { sleutel: 'bouwstenen', label: 'All activities' },
      { sleutel: 'bedrijfsuitje', label: 'Company outing' },
      { sleutel: 'teambuilding', label: 'Team building' },
      { sleutel: 'vrijgezellenfeest', label: 'Bachelor parties' },
      { sleutel: 'contact', label: 'Contact' },
    ],
    aanvragen: 'Book',
    logoLabel: 'DagjeUtrecht, to the home page',
    hoofdmenu: 'Main menu',
    hoofdmenuMobiel: 'Main menu mobile',
    menuOpen: 'Open menu',
    menuDicht: 'Close menu',
    taal: 'Language',
  },

  voet: {
    tagline:
      'Fixed day packages in Utrecht for companies, schools and groups of friends. At a fixed price per person.',
    knop: 'Plan your day',
    steps: 'Only want to rent kick scooters? Book directly at',
    stepsNa: '(in Dutch).',
    contact: 'Contact',
    telefoon: '+31 30 227 14 39',
    kvk: 'Chamber of Commerce (KvK) 63330393',
    paginas: 'Pages',
    links: [
      { sleutel: 'pakketten', label: 'Packages' },
      { sleutel: 'bouwstenen', label: 'All activities' },
      { sleutel: 'boeken', label: 'Plan your own day' },
      { sleutel: 'overOns', label: 'About us' },
      { sleutel: 'voorwaarden', label: 'Terms and conditions' },
      { sleutel: 'privacy', label: 'Privacy' },
    ],
    voorWie: 'Who is it for?',
    handelsnaam:
      'DagjeUtrecht, a trade name of Traxeo. Prices per person, including VAT. Photos: DagjeSuppen.nl and',
    kaart: 'Map data:',
    osm: '© OpenStreetMap contributors',
  },

  boekBlok: {
    titel: 'Ready for a day in Utrecht?',
    tekst: 'Choose a package or build your own day. You see the price straight away.',
    knop: 'Plan your day',
  },

  pakketKaart: {
    dezeWinter: '❄️ This winter',
    dezeZomer: '☀️ This summer',
    vanafApril: 'From April',
    vanafNovember: 'From November',
    teBoeken: 'Available from',
    perPersoon: 'per person',
  },

  bouwsteenKaart: {
    waar: 'Where',
    wanneer: 'When',
    groep: 'Group',
    vanaf: (n: number) => `from ${n} people`,
    seizoen: 'Season',
    inclusief: 'Included',
    of: ' or ',
    meer: (naam: string) => `More about ${naam}`,
  },

  home: {
    metaTitel: (prijs: string) => `Group day out in Utrecht from ${prijs} | DagjeUtrecht`,
    metaOmschrijving: (prijs: string) =>
      `A day out in Utrecht with your group: jeu de boules, canoeing, a canal cruise, City Challenge and drinks. Fixed packages from ${prijs} per person, incl. VAT.`,
    cijfers: (aantalBouwstenen: number) => [
      { getal: `From ${R.minPers}`, label: 'people per group' },
      { getal: `${aantalBouwstenen}`, label: 'activities to combine' },
      { getal: '3', label: 'working days to confirmation' },
      { getal: 'Fixed', label: 'price per person, incl. VAT' },
    ],
    stappen: [
      {
        titel: 'Choose your day',
        tekst:
          'Pick a package or build your own, time slot by time slot. You see the price straight away.',
      },
      {
        titel: 'We arrange it',
        tekst:
          'Within 3 working days our partners confirm everything and you receive a payment link.',
      },
      {
        titel: 'Off you go',
        tekst:
          'The day before, you receive all times and addresses. All you have to do is turn up.',
      },
    ],
    voorWie: {
      bedrijfsuitje: {
        titel: 'Company outing',
        tekst: 'Play, paddle and finish with drinks together.',
      },
      vrijgezellenfeest: {
        titel: 'Bachelor party',
        tekst: 'Stand-up paddling, a picnic and by kickbike to drinks.',
      },
      teambuilding: {
        titel: 'Team building',
        tekst: 'Work together in a canoe or compete on the boules court.',
      },
      personeelsuitje: {
        titel: 'Staff outing',
        tekst: 'An afternoon of boules and drinks that everyone can join.',
      },
      familiedag: {
        titel: 'Family day',
        tekst: 'A day with colleagues, partners and children, on the water or in the old town.',
      },
      school: {
        titel: 'School trip',
        tekst: 'Up the Dom Tower, lunch together and a cruise on the canals.',
      },
    },
    faq: (p: { goedkoopste: string }) => [
      {
        q: 'What can you do with a group in Utrecht?',
        a: 'In the city centre: jeu de boules, shuffleboard, climbing the Dom Tower, a canal cruise and the City Challenge through the old town. In Amelisweerd, a green estate on the edge of the city: canoeing and stand-up paddling on the Kromme Rijn river, a picnic and a BBQ. The kickbike takes you from one to the other.',
      },
      {
        q: 'What does a group day out in Utrecht cost?',
        a: `The most affordable half day costs ${p.goedkoopste} per person. Every package has a fixed price per person, including Dutch VAT (btw). You can see what each activity costs on the page with all activities.`,
      },
      {
        q: 'What group size is possible?',
        a: `From ${R.minPers} people. Online booking is possible for up to ${R.maxPers} people.`,
      },
      {
        q: 'Which days are available?',
        a: `Thursday, Friday and Saturday. Please book at least ${R.minDagenVooruit} days in advance.`,
      },
      {
        q: 'How do we get there?',
        a: 'Everything in the city centre is within walking distance of Utrecht Centraal, the main railway station. Amelisweerd is on the edge of the city, at De Rijnstroom (Weg naar Rhijnauwen 2); the kickbike tour connects the two.',
      },
      {
        q: 'How do we pay?',
        a: 'You pay the full amount in advance via a payment link, which you receive with the confirmation within 3 working days. Companies receive an invoice in the company name.',
      },
      {
        q: 'What if the weather is bad?',
        a: 'Jeu de boules, shuffleboard, lunch and drinks are indoors. Utrecht Games & Drinks is a full day indoors in the city centre, so it always goes ahead.',
      },
    ],
    heroSticker: `Groups from ${R.minPers} people`,
    heroRegels: ['A day out', 'in Utrecht', 'with your group'],
    heroWinter:
      'Mulled wine, jeu de boules, up the Dom Tower and drinks. Choose your activities, we take care of the rest.',
    heroZomer:
      'Stand-up paddling, canoeing, kickbiking, jeu de boules and drinks. Choose your activities, we take care of the rest.',
    bekijkPakketten: 'View packages',
    zelfSamenstellen: 'Build your own day',
    stickerWinter: 'New: winter',
    stickerPakketten: 'Packages',
    perPersoon: 'per person',
    bandWinter: [
      'Warm Winter Day',
      'Mulled wine',
      'Jeu de boules',
      'Dom Tower',
      'Pea soup',
      'Shuffleboard',
      'Drinks',
    ],
    bandZomer: [
      'Stand-up paddling',
      'Canoeing',
      'Kickbiking',
      'Jeu de boules',
      'Shuffleboard',
      'Canal cruise',
      'Drinks',
      'BBQ',
    ],
    inHetKort: 'In short',
    uitgelichtWinter: '❄️ Featured this winter',
    uitgelichtZomer: '☀️ Featured this summer',
    teBoekenVan: 'Available from',
    boekDezeDag: 'Book this day',
    bekijkProgramma: 'View programme',
    pakketten: 'Packages',
    vastePrijs: 'Fixed price per person, incl. VAT',
    hoeWerktHet: 'How does it work?',
    stap: 'Step',
    stelSamen: 'Plan your day',
    stickerBuitenWinter: 'Active and outdoors, April to October',
    stickerBuiten: 'Active and outdoors',
    stickerBinnenWinter: 'Indoors and warm',
    stickerSpelen: 'Games and drinks',
    pp: 'p.p.',
    bandPlekken: [
      'Oudegracht',
      'Amelisweerd',
      'Kromme Rijn',
      'Dom Tower',
      'Paardenveld',
      'Rhijnauwen',
    ],
    voorWieKop: 'Who is it for?',
    waterKop: 'Utrecht from the water',
    waterTekst: 'On the canals, along the Kromme Rijn and through the old town.',
    faqKop: 'Frequently asked questions',
  },

  pakketten: {
    metaTitel: (aantal: number, laagste: string) =>
      `Group outing in Utrecht: ${aantal} packages from ${laagste}`,
    metaOmschrijving: (aantal: number, laagste: string, hoogste: string) =>
      `Group outings in Utrecht for companies, schools and friends: ${aantal} fixed packages from ${laagste} to ${hoogste} per person, incl. VAT. Choose and book online.`,
    lijstNaam: 'Packages for a group outing in Utrecht',
    kruimel: 'Packages',
    titel: 'Packages for your group outing',
    intro:
      'Days that work well. Book them as they are, or swap activities when you plan your own day.',
    label: 'Fixed price per person',
    knop: 'Build your own day',
    zoWerktKop: 'A group outing in Utrecht, how it works',
    zoWerkt1:
      'Each package is a fixed day or part of a day with our partners in Utrecht: JEU de boules bar and The Grand Shuffle in the city centre, De Rijnstroom in Amelisweerd, the Dom Tower and the canal cruise. The price per person is the sum of the activities, including Dutch VAT. So you know exactly what the outing costs in advance.',
    zoWerkt2: (van: string, tot: string) =>
      `Packages can be booked from ${R.minPers} people, on Thursday, Friday and Saturday, at least ${R.minDagenVooruit} days in advance. A full day runs from ${van} to ${tot}. The city centre activities are within walking distance of Utrecht Centraal station.`,
    halfKop: 'Full day or half day',
    half: (aantal: number, namen: string, laagste: string) =>
      `If the group only has a morning or an afternoon, choose one of the ${aantal} shorter packages: ${namen}. The most affordable outing costs ${laagste} per person.`,
    gelegenheid: 'Looking for an outing for a particular occasion?',
    boekBlokTitel: 'Rather choose yourself?',
    boekBlokTekst: 'Build your own day from all activities, time slot by time slot.',
  },

  pakket: {
    metaTitel: (naam: string, prijs: string) => {
      const plek = naam.includes('Utrecht') ? naam : `${naam} Utrecht`;
      const metPrijs = `${plek}: ${prijs} per person`;
      if (metPrijs.length + 15 <= 65) return metPrijs;
      const kort = `${plek}, ${prijs} p.p.`;
      if (kort.length + 15 <= 65) return kort;
      return `${naam}: day package Utrecht`;
    },
    metaOmschrijving: (naam: string, kort: string, voorWie: string, prijs: string) => {
      const staart = `${prijs} per person incl. VAT, from ${R.minPers} people.`;
      const kop = naam.includes('Utrecht') ? naam : `${naam} in Utrecht`;
      const kandidaten = [
        `${kop}. ${kort} For ${voorWie.charAt(0).toLowerCase()}${voorWie.slice(1)}. ${staart}`,
        `${kop}. ${kort} ${staart}`,
        `${kort} ${staart}`,
      ];
      return kandidaten.find((k) => k.length <= 155) ?? kandidaten[kandidaten.length - 1]!;
    },
    categorie: 'Group outing Utrecht',
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
      { q: `What is included in ${p.naam}?`, a: `${p.inbegrepen}. Prices include Dutch VAT.` },
      {
        q: 'What time does it start and finish?',
        a: `The programme starts at ${p.eerste} and ends at ${p.laatste}.`,
      },
      {
        q: 'How many people can take part?',
        a: `${p.minimum} to ${p.maximum} people. You pay ${p.prijs} per person.`,
      },
      {
        q: 'When is it available?',
        a: `${p.maanden ? `From ${p.maanden}, ` : 'All year round, '}on Thursday, Friday and Saturday. Please book at least ${R.minDagenVooruit} days in advance.`,
      },
      {
        q: 'Can I swap an activity?',
        a: 'Yes. When you plan your day, choose a different activity for any time slot; the price is recalculated straight away.',
      },
    ],
    voor: 'For:',
    teBoekenVan: 'Available from',
    perPersoon: 'per person',
    kiesDatum: 'Choose a date and book',
    programma: 'The programme',
    tot: 'to',
    perPersoonBtw: 'per person, including VAT',
    regels: `from ${R.minPers} people · Thursday, Friday or Saturday · at least ${R.minDagenVooruit} days in advance`,
    wisselen: 'Swap activities',
    faqKop: 'Frequently asked questions',
    pastBij: 'Suits:',
    inUtrecht: 'in Utrecht',
    anderePakketten: 'Other packages',
  },

  bouwstenen: {
    metaTitel: (n: number) => `Group activities in Utrecht: ${n} activities`,
    metaOmschrijving:
      'Group activities in Utrecht: jeu de boules, shuffleboard, Dom Tower, canal cruise, canoeing, stand-up paddling, City Challenge, BBQ and drinks. Fixed price p.p.',
    ogOmschrijving:
      'Jeu de boules, shuffleboard, Dom Tower, canal cruise, canoeing, stand-up paddling, City Challenge, lunch, BBQ and drinks. Fixed price per person.',
    lijstNaam: 'Group activities in Utrecht',
    kruimel: 'Activities',
    titel: 'Activities in Utrecht',
    intro:
      'These are the building blocks of your day. Each activity has a fixed price per person and a fixed time slot, so you can combine them into a day that suits your group.',
    label: (n: number) => `${n} activities`,
    knop: 'Plan your day',
    secties: {
      amelisweerd: { titel: 'Amelisweerd', sticker: 'On the water' },
      centrum: { titel: 'City centre', sticker: 'Games and drinks' },
      beide: { titel: 'On the move', sticker: 'From A to B' },
    },
    aanvraagKop: 'Something else?',
    aanvraagTekst:
      'Some activities, such as bowling, bouldering or an escape room, we arrange on request. They have no fixed price and cannot be booked online: email info@dagjeutrecht.nl and within one working day you receive a proposal with a price per person.',
  },

  bouwsteen: {
    standaardTitel: (naam: string) => `${naam} in Utrecht`,
    standaardOmschrijving: (kort: string, min: number, prijs: string) =>
      `${kort} From ${min} people, ${prijs} per person.`,
    kruimel: 'Activities',
    vanaf: (n: number) => `from ${n} people`,
    perPersoon: 'per person',
    stelSamen: 'Plan your day',
    praktisch: 'Practical information',
    waar: 'Where',
    duur: 'Duration',
    wanneer: 'When',
    groep: 'Group',
    groepTekst: (min: number, max: number) => `from ${min} to ${max} people`,
    inclusief: 'Included',
    seizoen: 'Season',
    of: ' or ',
    tot: 'to',
    perPersoonBtw: 'per person, including VAT',
    regels: `Thursday, Friday or Saturday · at least ${R.minDagenVooruit} days in advance`,
    faqKop: 'Frequently asked questions',
    inPakketten: 'Included in these packages',
    combineer: 'Combine it with',
    andere: (waar: string) => `Other activities ${waar}, bookable on the same day.`,
    onderweg: 'on the move',
    inCluster: (naam: string) => `in ${naam === 'City centre' ? 'the city centre' : naam}`,
    alleBekijken: 'View all activities',
  },

  landing: {
    kruimelHome: 'Home',
    bekijkPakketten: 'View the packages',
    zoDag: 'What the day looks like',
    voorbeeld: (naam: string, prijs: string) =>
      `An example: ${naam}, for ${prijs} per person including VAT. You can swap every activity when you plan your day.`,
    tot: 'to',
    inbegrepen: 'Included:',
    regels: `From ${R.minPers} people, on Thursday, Friday or Saturday, at least ${R.minDagenVooruit} days in advance.`,
    bekijk: (naam: string) => `View ${naam}`,
    passend: 'Packages that fit',
    zelf: 'Build your own day',
    alleOnderdelen: 'All activities',
    faqKop: 'Frequently asked questions',
    ookInteressant: 'You may also like',
    allePakketten: 'All packages',
    alleActiviteiten: 'All activities',
    zusterNa: 'on Stepverhuur Utrecht (in Dutch).',
    boekBlok: 'Ready to pick a date?',
  },

  boeken: {
    metaTitel: 'Plan and book your day',
    metaOmschrijving:
      'Choose a package or build your own day in Utrecht from fixed activities. Fixed price per person, confirmation within 3 working days.',
    titel: 'Plan your day',
    intro:
      'Choose an activity for each time slot. The price is fixed and you see it straight away. We make the bookings with our partners in Utrecht.',
    label: 'In 3 steps',
  },

  betaald: {
    metaTitel: 'Thank you for your payment',
    titel: 'Thank you!',
    tekst: (code: string) =>
      `As soon as we have received the payment, your booking${code ? ` ${code}` : ''} is final.`,
    dagErvoor: 'The day before the outing, you receive all practical information by email.',
    terug: 'Back to the home page',
  },

  contact: {
    metaTitel: 'Contact: request your day out in Utrecht',
    metaOmschrijving:
      'Questions about a day out in Utrecht for your group? Call +31 30 227 1439 or email info@dagjeutrecht.nl. We are happy to help with the date, group size and programme.',
    titel: 'Contact',
    voor: 'The quickest way to book a day is our',
    link: 'booking page',
    na: '. Questions about a booking? Feel free to get in touch:',
    telefoon: '+31 30 227 14 39',
    taal: 'You are welcome to email us in English.',
    handelsnaam:
      'DagjeUtrecht is a trade name of Traxeo, Dutch Chamber of Commerce (KvK) 63330393.',
  },

  overOns: {
    metaTitel: 'About us: group days out in Utrecht',
    metaOmschrijving:
      'DagjeUtrecht organises day programmes in Utrecht for groups. Who we are, which partners in the city we work with and how we organise your day.',
    ogTitel: 'About DagjeUtrecht: group days out in Utrecht',
    ogOmschrijving:
      'Who we are, which partners in Utrecht we work with and how we organise the day for your group.',
    ogAlt: 'DagjeUtrecht, day programmes in Utrecht',
    kruimel: 'About us',
    titel: 'About DagjeUtrecht',
    p1: 'DagjeUtrecht is a trade name of Traxeo, with many years of experience in organised group outings for companies, schools and associations in Utrecht.',
    p2: 'We turn Utrecht into a day to remember. You choose a package or put together your own day, and we make the bookings with our partners. On the day itself, Ger is your point of contact.',
    waaromKop: 'Why this website?',
    waarom:
      'Organising a group outing often takes a lot of emails and phone calls. That is why we work with fixed activities at fixed partners, such as JEU de boules bar and Botenverhuur De Rijnstroom. You see the price straight away and within 3 working days everything is confirmed.',
    partnersKop: 'Our partners in Utrecht',
    partners: (n: number) =>
      `All ${n} activities you book with us are run by regular partners in the city. We organise the City Challenge through the old town ourselves.`,
    partnerLijst: [
      {
        naam: 'JEU de boules bar',
        wat: 'jeu de boules on indoor courts, the welcome and the closing drinks, on Paardenveld',
      },
      { naam: 'The Grand Shuffle', wat: 'shuffleboard in the city centre' },
      { naam: 'Brothers Horeca Groep', wat: 'the group lunch and the winter lunch' },
      {
        naam: 'Botenverhuur De Rijnstroom',
        wat: 'canoeing, stand-up paddling, the picnic and the BBQ in Amelisweerd',
      },
      { naam: 'Dom Tower', wat: 'the guided climb' },
      { naam: 'Rederij Schuttevaer', wat: 'the canal cruise' },
      { naam: 'Stepverhuur Utrecht', wat: 'the kickbikes for the tour along the Kromme Rijn' },
    ],
    werkenKop: 'How we work',
    werken: (aantalPakketten: number) =>
      `There are ${aantalPakketten} fixed packages, from a morning to a full day. Each package has a fixed price per person, including Dutch VAT, and that price is the sum of the activities. You book from ${R.minPers} people, on Thursday, Friday or Saturday, at least ${R.minDagenVooruit} days in advance. The number of people can still change up to ${R.aantalDefinitiefDagenVooraf} days before the date.`,
    maatwerk:
      'We deliberately do not offer custom programmes. Fixed activities at fixed partners mean we can confirm quickly and the price is right from the start.',
    bekijkPakketten: 'View the packages',
    of: 'or',
    alleOnderdelen: 'all activities',
    voorWieKop: 'Who is it for',
    inUtrecht: 'in Utrecht',
    contactKop: 'Contact',
    telefoon: '+31 30 227 14 39',
    bedrijfKop: 'Our company',
    kvk: 'Chamber of Commerce (KvK) 63330393',
  },

  voorwaarden: {
    metaTitel: 'Terms and conditions',
    metaOmschrijving:
      'The terms and conditions of DagjeUtrecht: how far ahead to book, paying in advance, changing the number of people, cancellation, bad weather and the day itself.',
    titel: 'Terms and conditions',
    intro:
      'DagjeUtrecht is a trade name of Traxeo (Dutch Chamber of Commerce, KvK 63330393). These terms apply to all bookings made through DagjeUtrecht.nl. This is a translation for your convenience; in case of any difference, the Dutch version applies.',
    boekenKop: 'Booking',
    boeken: [
      `Outings are possible on Thursday, Friday and Saturday, for groups of ${R.minPers} people or more.`,
      `Book at least ${R.minDagenVooruit} days before the date you would like.`,
      'After your request, we check availability with our partners. Within 3 working days you receive a confirmation with a payment link.',
      'The booking is final once payment has been received.',
      'The programme consists of fixed activities at fixed times. Custom programmes and dietary requirements (other than a vegetarian lunch) are not possible.',
    ],
    prijzenKop: 'Prices and payment',
    prijzen: [
      'All prices are per person and include Dutch VAT (btw).',
      'You pay the full amount in advance via the payment link.',
    ],
    wijzigenKop: 'Changes',
    wijzigen: [
      `The number of people can be changed up to ${R.aantalDefinitiefDagenVooraf} days before the date, within the limits of the chosen programme.`,
      'After that, the number is final and you pay for the number of people given.',
    ],
    annulerenKop: 'Cancellation and weather',
    annuleren:
      'If you cancel, the cancellation terms of the partners in your programme apply. You receive these with the confirmation. If a partner cannot run an activity because of dangerous weather (such as thunderstorms or a storm), we will contact you.',
    dagKop: 'On the day',
    dag: 'The day before the outing, you receive all times, addresses and a phone number on which you can reach us that day. Taking part in the activities is at your own risk; always follow the instructions of the partner on site.',
  },

  privacy: {
    metaTitel: 'Privacy statement',
    metaOmschrijving:
      'Which data DagjeUtrecht collects when you request or book a day, what we use it for, who we share it with and how long we keep it.',
    titel: 'Privacy statement',
    intro:
      'DagjeUtrecht (a trade name of Traxeo, Dutch Chamber of Commerce KvK 63330393) only processes personal data to handle requests and carry out bookings.',
    verzamelenKop: 'What we collect',
    verzamelen: [
      'Name, email, phone - via the request form',
      'Company details (name, VAT number) if you would like to receive an invoice',
      'Your choices when planning your day (activities, date, number of people)',
    ],
    gebruikKop: 'What we use it for',
    gebruik: [
      'To answer your request and prepare a quote',
      'To make bookings with the suppliers you have chosen',
      'To send you invoices and confirmations',
    ],
    delenKop: 'Sharing with third parties',
    delen:
      'Only with the suppliers you have chosen yourself, and with our administration tools (WeFact for invoicing).',
    bewarenKop: 'Retention period',
    bewaren: 'Requests and related data: 7 years (Dutch statutory tax retention period).',
    contactKop: 'Contact',
    contact: 'Questions or requests (access, correction, deletion)? Email',
  },

  formulier,

  mail: {
    taalNaam: 'Engels',
    onderwerp: (code: string) => `Your request with DagjeUtrecht.nl (${code})`,
    tekst: (m: {
      voornaam: string;
      datum: string;
      personen: number;
      programma: string;
      totaal: string;
      pp: string;
      code: string;
    }) => `Hi ${m.voornaam},

Thank you for your request with DagjeUtrecht.nl. We are now checking availability with our partners. Within 3 working days you will receive a confirmation with a payment link. The booking is final once payment has been received.

Your day: ${m.datum}, ${m.personen} people

${m.programma}

Total: ${m.totaal} (${m.pp} per person, including Dutch VAT)

The number of people can be changed up to ${R.aantalDefinitiefDagenVooraf} days before the date.

Request number: ${m.code}
Questions? Reply to this email or call +31 30 227 14 39.

Kind regards,
Ger
DagjeUtrecht.nl
`,
    perPersoon: 'p.p.',
  },
};

export type UiTekst = typeof UI_EN;

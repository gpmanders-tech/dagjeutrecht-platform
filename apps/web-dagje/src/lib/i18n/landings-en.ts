/**
 * Engelse gelegenheidspagina's. Pakketten, voorbeelddag, foto's en kleur komen uit
 * landings.ts (LANDINGS); hier staan alleen de woorden. Bedragen via pakketPrijs()
 * en vanafPrijs(), zodat ze altijd gelijk zijn aan het Nederlands.
 *
 * Doelgroep: internationale bedrijven en expats in Utrecht. Wat een Nederlander niet
 * hoeft te weten (borrel, btw, waar Utrecht Centraal ligt) wordt kort uitgelegd.
 */
import { REGELS } from '../aanbod';
import { LANDINGS } from '../landings';
import { pakketPrijs, vanafPrijs } from './opmaak';
import type { LandingTekst, Vraag } from './types';

export type VertaaldeLanding =
  | 'bedrijfsuitje'
  | 'teambuilding'
  | 'personeelsuitje'
  | 'vrijgezellenfeest'
  | 'familiedag';

const prijs = (slug: string) => pakketPrijs('en', slug);
const vanaf = (sleutel: VertaaldeLanding) => vanafPrijs('en', LANDINGS[sleutel].pakketten);

const GROEP = `From ${REGELS.minPers} people.`;

const GROTER: Vraag = {
  q: `What if we are more than ${REGELS.maxPers} people?`,
  a: `Online booking is possible for ${REGELS.minPers} to ${REGELS.maxPers} people. If your group is larger, please get in touch at info@dagjeutrecht.nl or +31 30 227 14 39.`,
};

const WEER: Vraag = {
  q: 'What if it rains?',
  a: 'Jeu de boules, shuffleboard and the drinks are indoors, so they always go ahead. Canoeing also goes ahead in the rain; only in case of thunder or strong wind do we switch to an indoor activity.',
};

const ALGEMENE_FAQ: Vraag[] = [
  {
    q: 'Which days are available?',
    a: `Thursday, Friday and Saturday. Please book at least ${REGELS.minDagenVooruit} days in advance.`,
  },
  {
    q: 'Can the number of people still change?',
    a: `Yes, up to ${REGELS.aantalDefinitiefDagenVooraf} days before the date. After that, the number is final.`,
  },
  {
    q: 'Can you cater for dietary requirements?',
    a: 'A vegetarian option is available for lunch. Unfortunately we cannot arrange other dietary requirements or custom programmes.',
  },
];

const BEVESTIGING: Vraag = {
  q: 'How quickly will we know it is confirmed?',
  a: 'Within 3 working days our partners confirm everything and you receive a payment link. The day before, you receive all times and addresses.',
};

const FACTUUR: Vraag = {
  q: 'Can we get an invoice in the company name?',
  a: 'Yes. Enter the company name when you book and the invoice will be made out to the company, with Dutch VAT (btw) shown. You pay the full amount in advance via a payment link.',
};

export const LANDINGS_EN: Record<VertaaldeLanding, LandingTekst> = {
  bedrijfsuitje: {
    link: 'Company outing',
    band: ['Jeu de boules', 'Shuffleboard', 'Canoeing', 'Lunch', 'Drinks', 'Company invoice'],
    zuster: {
      href: 'https://stepverhuurutrecht.nl/bedrijfsuitje-utrecht',
      label: 'Company outing on kick scooters',
      tekst: 'Only want to rent kickbikes for the team, without lunch and drinks?',
    },
    metaTitel: `Company outing in Utrecht from ${vanaf('bedrijfsuitje')} per person`,
    metaOmschrijving: `Company outing in Utrecht at a fixed price per person: from ${vanaf('bedrijfsuitje')} for a morning, ${prijs('spel-en-borrel')} for a full day. From ${REGELS.minPers} people, VAT included.`,
    boven: 'For HR, team leads and social committees',
    titel: 'Company outing in Utrecht, without the hassle',
    intro:
      'Choose a package or put together your own day from fixed activities. You see the price straight away and we take care of the bookings with our partners, all within walking distance of Utrecht Centraal station or a short trip to the green edge of the city.',
    alineas: [
      {
        kop: 'Indoors or outdoors',
        tekst:
          'In the city centre you play jeu de boules (pétanque) at JEU and shuffleboard at The Grand Shuffle, within walking distance of Utrecht Centraal. That works all year round, in any weather. Prefer to be outside? In Amelisweerd, a green estate on the edge of the city, you go canoeing or stand-up paddling on the Kromme Rijn river and finish with a BBQ.',
      },
      {
        kop: 'What it costs',
        tekst: `A full day starts at ${prijs('spel-en-borrel')} per person for Utrecht Games & Drinks, including coffee, lunch and drinks. Active Amelisweerd costs ${prijs('amelisweerd-actief')} per person, including a picnic and a BBQ with drinks. Only have part of the day? Boules & Drinks costs ${prijs('boules-en-borrel')} per person for an afternoon, Coffee & City Challenge ${prijs('koffie-en-city-challenge')} for a morning. All prices are per person and include Dutch VAT, from ${REGELS.minPers} people.`,
      },
      {
        kop: 'Easy to reach',
        tekst:
          'The days in the city centre start at JEU de boules bar on Paardenveld, a five-minute walk from Utrecht Centraal, the main station with direct trains from Amsterdam, Schiphol Airport and most Dutch cities. Colleagues coming by train are there in no time, and anyone who has to leave early can easily hop back on. Amelisweerd is on the edge of the city, at Botenverhuur De Rijnstroom on the Kromme Rijn.',
      },
      {
        kop: 'One point of contact, one invoice',
        tekst:
          'You do not have to email the boules bar, the boat rental and the lunch venue yourself. We book everything with our regular partners and you receive one invoice in the company name. You pay in advance via a payment link. On the day itself, Ger is your point of contact.',
      },
      {
        kop: 'Also for a company event',
        tekst:
          'Celebrating an anniversary, a farewell or the end of a project? Start with a game and finish with drinks: everyone has done something together and there is time to talk afterwards. Also take a look at the staff outing for packages that fit.',
      },
    ],
    faq: [
      FACTUUR,
      { q: 'How many people can take part?', a: GROEP },
      GROTER,
      {
        q: 'Can we do just an afternoon?',
        a: `Yes. Boules & Drinks is an afternoon from two to six o’clock and costs ${prijs('boules-en-borrel')} per person. Coffee & City Challenge is a morning and costs ${prijs('koffie-en-city-challenge')} per person.`,
      },
      WEER,
      BEVESTIGING,
      ...ALGEMENE_FAQ,
    ],
  },

  personeelsuitje: {
    link: 'Staff outing',
    band: ['Social committee', 'Jeu de boules', 'City Challenge', 'Lunch', 'Drinks', 'One invoice'],
    metaTitel: `Staff outing in Utrecht from ${vanaf('personeelsuitje')} per person`,
    metaOmschrijving: `Staff outing in Utrecht for all ages: boules, City Challenge or canoeing, with lunch and drinks. From ${vanaf('personeelsuitje')} per person, fixed price including VAT.`,
    boven: 'For social committees and HR',
    titel: 'Staff outing in Utrecht',
    intro:
      'An outing everyone can join, from the intern to the colleague who is about to retire. Choose a package with a fixed price per person and we take care of the rest.',
    alineas: [
      {
        kop: 'Something everyone can do',
        tekst:
          'With a staff outing, the point is that nobody drops out. Jeu de boules and shuffleboard are explained in two throws and need no fitness. The City Challenge is done on foot, at your own pace. Those who like being active outdoors can go canoeing in Amelisweerd in summer.',
      },
      {
        kop: 'An afternoon after work',
        tekst: `Boules & Drinks starts at two o’clock with jeu de boules and bites and ends with drinks until six. It costs ${prijs('boules-en-borrel')} per person, VAT included. From November to March there are Winter Drinks with mulled wine to start, for ${prijs('winterborrel')} per person.`,
      },
      {
        kop: 'Or a full day',
        tekst: `Utrecht Games & Drinks runs from half past nine to six: coffee and cake, jeu de boules, a group lunch, shuffleboard and drinks, all indoors in the city centre. It costs ${prijs('spel-en-borrel')} per person. In winter, the Warm Winter Day with the Dom Tower and a Dutch winter lunch is a good alternative, for ${prijs('warme-winterdag')} per person.`,
      },
      {
        kop: 'Handy for the social committee',
        tekst:
          'You see the price per person in advance, so you know exactly how much of the budget it takes. The number of participants can still change up to a week before the date. The invoice is made out to the committee or the company.',
      },
    ],
    faq: [
      {
        q: 'How many colleagues can take part?',
        a: `${GROEP} Online booking is possible for up to ${REGELS.maxPers} people.`,
      },
      GROTER,
      {
        q: 'Is it suitable for older colleagues?',
        a: 'Yes. Jeu de boules, shuffleboard and the City Challenge need no fitness. Only the Dom Tower (465 steps) is not suitable for people with a fear of heights or limited mobility.',
      },
      {
        q: 'Can the invoice be made out to the social committee?',
        a: 'Yes. Enter the name of the committee or the company when you book and the invoice will be made out to that name, with VAT shown.',
      },
      WEER,
      BEVESTIGING,
      ...ALGEMENE_FAQ,
    ],
  },

  familiedag: {
    link: 'Family day',
    band: [
      'Colleagues',
      'Partners',
      'Children welcome',
      'Canal cruise',
      'City Challenge',
      'One invoice',
    ],
    metaTitel: `Company family day in Utrecht from ${vanaf('familiedag')} p.p.`,
    metaOmschrijving: `A family day for your company in Utrecht with colleagues, partners and children: canal cruise, City Challenge or canoeing. From ${vanaf('familiedag')} per person, incl. VAT.`,
    boven: 'For companies, with partners and children',
    titel: 'Family day for your company in Utrecht',
    intro:
      'A day when colleagues bring their families. Choose a package with a fixed price per person, or ask us about an extra such as bowling. We handle the bookings, you receive one invoice.',
    alineas: [
      {
        kop: 'For young and old',
        tekst:
          'On a family day, partners and children come along, so the programme has to work for everyone. Choose activities anyone can do: a canal cruise, the City Challenge on foot through the old town or jeu de boules on indoor courts. In summer the group can also go canoeing on the Kromme Rijn in Amelisweerd.',
      },
      {
        kop: 'What it costs',
        tekst: `Dom Tower & Canals costs ${prijs('dom-en-grachten')} per person for half a day, Coffee & City Challenge ${prijs('koffie-en-city-challenge')} for a morning. A full indoor day in the city centre, Utrecht Games & Drinks, costs ${prijs('spel-en-borrel')} per person. From April to October there is Active Amelisweerd for ${prijs('amelisweerd-actief')} per person. All prices include VAT. The price is per person: everyone who takes part counts, children too.`,
      },
      {
        kop: 'With young children',
        tekst:
          'The Dom Tower has 465 steps and is not suitable for anyone with a fear of heights or limited mobility. With young children, the canal cruise is the better choice, as it involves no stairs. Stand-up paddling is only possible if everyone can swim. Add the children’s ages to your booking and we will think along with you.',
      },
      {
        kop: 'Extras on request',
        tekst:
          'Bowling, table tennis or virtual reality are popular with families. These are not part of the fixed activities and have no fixed price: email us at info@dagjeutrecht.nl and within one working day you receive a proposal with a price per person.',
      },
      {
        kop: 'One point of contact, one invoice',
        tekst:
          'You do not have to email the boat company, the boules bar and the lunch venue yourself. We book everything with our regular partners and you receive one invoice in the company name.',
      },
    ],
    faq: [
      {
        q: 'Can children come along?',
        a: 'Yes. The packages on this page were chosen because they work well with children too. Add the ages to your booking and we will take them into account.',
      },
      {
        q: 'Do children count towards the number of people?',
        a: `Yes. The price is per person and everyone who takes part counts, children too. ${GROEP}`,
      },
      GROTER,
      FACTUUR,
      WEER,
      ...ALGEMENE_FAQ,
    ],
  },

  teambuilding: {
    link: 'Team building',
    band: ['Work together', 'Compete', 'Paddle', 'Kickbike', 'Drinks'],
    metaTitel: `Team building in Utrecht from ${vanaf('teambuilding')} per person`,
    metaOmschrijving: `Team building in Utrecht: City Challenge, jeu de boules, shuffleboard or canoeing. From ${vanaf('teambuilding')} per person for half a day, ${prijs('spel-en-borrel')} for a full day.`,
    boven: 'Play together, paddle together',
    titel: 'Team building in Utrecht',
    intro:
      'Nothing brings a team together like doing something together. Play in teams against each other on the boules court, or work together in a canoe on the Kromme Rijn.',
    alineas: [
      {
        kop: 'Competition in the city centre',
        tekst:
          'Jeu de boules and shuffleboard are easy to learn, so everyone can join in, whatever their age or fitness. The teams play against each other and the day ends with drinks.',
      },
      {
        kop: 'Working together on the water',
        tekst:
          'In Amelisweerd you share a canoe with one other person. Coordinating and steering together, you notice it straight away. Then by kickbike through the green and finish with a BBQ.',
      },
      {
        kop: 'The City Challenge',
        tekst: `With the City Challenge the team heads into the old town in small groups, with challenges and questions about the Dom, the wharf cellars and the Oudegracht canal. Solving puzzles together, dividing tasks and the results at the end. With coffee and cake beforehand, that is Coffee & City Challenge, for ${prijs('koffie-en-city-challenge')} per person.`,
      },
      {
        kop: 'Team outing or team building?',
        tekst:
          'If you mainly want a fun day together, a team outing with a game and drinks is enough. If you want people who rarely see each other to really work together, choose activities where you have to rely on each other: two people in a canoe, or a team solving the City Challenge together.',
      },
    ],
    faq: [
      { q: 'How many people can take part?', a: GROEP },
      GROTER,
      {
        q: 'Is there a host?',
        a: 'For the City Challenge we are there at the start and the finish. For jeu de boules you get an explanation on the spot, and for canoeing an explanation before you set off.',
      },
      {
        q: 'Is team building possible in winter?',
        a: `Yes. Jeu de boules, shuffleboard and the City Challenge are available all year round. From November to March there is also the Warm Winter Day for ${prijs('warme-winterdag')} per person.`,
      },
      WEER,
      ...ALGEMENE_FAQ,
    ],
  },

  vrijgezellenfeest: {
    link: 'Bachelor party',
    band: ['Stand-up paddling', 'Picnic', 'Kickbike', 'Drinks', 'Hen and stag'],
    zuster: {
      href: 'https://stepverhuurutrecht.nl/vrijgezellenfeest-utrecht',
      label: 'Bachelor party with kick scooters',
      tekst: 'Only want to rent kick scooters and plan the rest of the day yourselves?',
    },
    metaTitel: `Bachelor party in Utrecht from ${vanaf('vrijgezellenfeest')} per person`,
    metaOmschrijving: `Bachelor, bachelorette, hen or stag party in Utrecht at a fixed price per person: from ${vanaf('vrijgezellenfeest')} for an afternoon and ${prijs('water-naar-borrel')} for a full day, summer and winter.`,
    boven: 'For best men, maids of honour and groups of friends',
    titel: 'Bachelor party in Utrecht, the whole day',
    intro:
      'Hen party, stag do, bachelor or bachelorette party: an active day you will not forget. Choose a package, pick a date and arrange it in a few minutes.',
    alineas: [
      {
        kop: 'From the water to drinks',
        tekst: `In the morning, stand-up paddling on the Kromme Rijn, a picnic by the water and then by kickbike to the city centre for drinks at JEU. The package costs ${prijs('water-naar-borrel')} per person.`,
      },
      {
        kop: 'Bad weather forecast?',
        tekst:
          'Then choose Utrecht Games & Drinks: jeu de boules, lunch, shuffleboard and drinks, completely indoors in the city centre.',
      },
      {
        kop: 'In winter',
        tekst: `Stand-up paddling and canoeing are possible from April to October. Outside that period there is the Bachelor Party Winter Day: mulled wine, shuffleboard, a warm lunch and drinks, completely indoors. It costs ${prijs('vrijgezellen-winterdag')} per person, exactly the same as the summer package.`,
      },
      {
        kop: 'Just an afternoon',
        tekst: `Want to arrange something yourselves in the morning or party on in the evening? Boules & Drinks is an afternoon of jeu de boules with bites and drinks, for ${prijs('boules-en-borrel')} per person. It is a five-minute walk from Utrecht Centraal station, so handy if the group comes by train.`,
      },
      {
        kop: 'For the organisers',
        tekst:
          'You are arranging it, but you want to enjoy it too. That is why the price per person is fixed in advance and we book everything with our partners. The number of people can still change up to a week before the date, handy if someone is still undecided.',
      },
      {
        kop: 'Organising a bachelor party in three steps',
        tekst:
          'Choose a package or put together your own day, pick a Thursday, Friday or Saturday and enter the number of people. We then book everything with our partners and within three working days you receive the confirmation with a payment link. The day before, you receive all times and addresses, so you only have to focus on the bride or groom.',
      },
      {
        kop: 'A package with a fixed price',
        tekst: `Each package is a complete arrangement with a fixed price per person, VAT included: from an afternoon of Boules & Drinks for ${prijs('boules-en-borrel')} to a full day From the Water to Drinks for ${prijs('water-naar-borrel')}. You know in advance what everyone pays, so no hassle splitting bills afterwards.`,
      },
      {
        kop: 'The locations',
        tekst:
          'In the city centre you play jeu de boules at JEU on Paardenveld and shuffleboard at The Grand Shuffle, within walking distance of Utrecht Centraal and the terraces along the Oudegracht canal. Outside the city you go stand-up paddling or canoeing on the Kromme Rijn in Amelisweerd, from Botenverhuur De Rijnstroom.',
      },
      {
        kop: 'And in the evening?',
        tekst:
          'Our days end around six o’clock with drinks in the city centre. After that you are right in the old town, so you plan the evening yourselves: dinner by the canal wharves or out on the town.',
      },
    ],
    faq: [
      { q: 'How many people can take part?', a: GROEP },
      {
        q: 'Does everyone need to be able to swim?',
        a: 'For stand-up paddling, yes: being able to swim is required. Everyone gets a life jacket. If not everyone can swim, choose a package in the city centre.',
      },
      {
        q: 'What does a bachelor party in Utrecht cost?',
        a: `With us from ${vanaf('vrijgezellenfeest')} per person for an afternoon and ${prijs('water-naar-borrel')} for a full day, VAT included. You see the price of each package in advance.`,
      },
      {
        q: 'Does it also work for a stag party?',
        a: 'Yes. The packages are for any group of friends. Jeu de boules, shuffleboard and canoeing with drinks or a BBQ afterwards work for every crowd.',
      },
      WEER,
      ...ALGEMENE_FAQ,
    ],
  },
};

/**
 * Engelse teksten bij aanbod.ts en bouwsteen-seo.ts.
 *
 * Geschreven voor internationale bedrijven en expats in Utrecht, niet letterlijk
 * vertaald. Prijzen, aantallen, tijden en seizoenen komen uit aanbod.ts; noemt een
 * tekst een bedrag, dan via bouwsteenPrijs() zodat het nooit kan afwijken.
 * Een nieuw pakket of nieuwe bouwsteen: hier toevoegen, in aanbod-de.ts en in SLUGS (lib/talen.ts).
 */
import { bouwsteenPrijs } from './opmaak';
import type { AanbodTekst } from './types';

export const AANBOD_EN: AanbodTekst = {
  tijdvakken: {
    ontvangst: 'Welcome',
    ochtend: 'Morning',
    lunch: 'Lunch',
    middag: 'Afternoon',
    afsluiting: 'Wrap-up',
  },
  clusters: {
    centrum: {
      naam: 'City centre',
      uitleg:
        'Around Paardenveld and the Oudegracht canal, within walking distance of Utrecht Centraal station.',
    },
    amelisweerd: {
      naam: 'Amelisweerd',
      uitleg:
        'At Botenverhuur De Rijnstroom, Weg naar Rhijnauwen 2, on the Kromme Rijn river in the green Amelisweerd estate on the edge of the city.',
    },
    beide: {
      naam: 'City centre and Amelisweerd',
      uitleg: 'Links the city centre with Amelisweerd.',
    },
  },
  onderweg: 'On the move',
  maanden: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  maandenSjabloon: '{van} to {tot}',

  bouwstenen: {
    'koffie-met-gebak': {
      naam: 'Welcome with coffee and cake',
      kort: 'An easy start with coffee or tea and something sweet.',
      beschrijving:
        'The group meets at JEU de boules bar on Paardenveld, a 5-minute walk from Utrecht Centraal station. Coffee, tea and cake are ready when you arrive.',
      locatie: 'JEU de boules bar, Paardenveld',
      duur: '30 min',
      inclusief: ['coffee or tea', 'cake'],
      seo: {
        titel: 'Group welcome with coffee and cake in Utrecht',
        beschrijving:
          'Start the day with coffee, tea and cake at Paardenveld, five minutes from Utrecht Centraal. For groups of 8 or more.',
        tekst: [
          'The opening block. The group meets at JEU de boules bar on Paardenveld, a five-minute walk from Utrecht Centraal, so a late train does not throw the whole programme off.',
          'Half an hour of coffee, tea and cake. Then the first activity begins.',
        ],
        vragen: [
          { q: 'What time is the welcome?', a: 'From 09:30 to 10:00.' },
          {
            q: 'Where is it?',
            a: 'JEU de boules bar on Paardenveld, a five-minute walk from Utrecht Centraal station.',
          },
        ],
      },
    },

    'jeu-de-boules': {
      naam: 'Jeu de boules with bites',
      kort: '1.5 hours of boules on indoor courts, with bites.',
      beschrijving:
        'Play indoors on the courts of JEU de boules bar. You get an explanation on the spot and the group plays in teams against each other. Rain makes no difference.',
      locatie: 'JEU de boules bar, Paardenveld',
      duur: '1.5 hours',
      inclusief: ['court hire', 'explanation', 'bites'],
      seo: {
        titel: 'Jeu de boules in Utrecht for groups',
        beschrijving:
          'An hour and a half of indoor jeu de boules (pétanque) at Paardenveld, with bites. For groups of 8 or more. Rain makes no difference.',
        tekst: [
          'Jeu de boules, also known as pétanque, can be played all year round in Utrecht, because the courts at Paardenveld are indoors. That makes it one of the few group activities where the weather plays no part, not even in November.',
          'The group plays in teams against each other. You get an explanation on the spot, so no experience is needed. Bites are on the table while you play. It is a five-minute walk from Utrecht Centraal, which is handy when people come by train.',
        ],
        vragen: [
          {
            q: 'Is it indoors or outdoors?',
            a: 'Indoors, on covered courts. Rain or cold makes no difference.',
          },
          {
            q: 'How long does it take?',
            a: 'An hour and a half, including the explanation and bites.',
          },
          {
            q: 'Do you need to know the game?',
            a: 'No. You get a short explanation and after two throws everyone knows how it works.',
          },
          {
            q: 'How far is it from the station?',
            a: 'About a five-minute walk from Utrecht Centraal.',
          },
        ],
      },
    },

    shuffleboard: {
      naam: 'Shuffleboard',
      kort: '1.5 hours of shuffleboard at The Grand Shuffle.',
      beschrijving:
        'The game you may know from cruise ships, in the first shuffleboard bar in the Netherlands. Easy to learn, highly competitive to play.',
      locatie: 'The Grand Shuffle, Utrecht city centre',
      duur: '1.5 hours',
      inclusief: ['courts', 'explanation'],
      seo: {
        titel: 'Shuffleboard in Utrecht for groups',
        beschrijving:
          'An hour and a half of shuffleboard in the centre of Utrecht, for groups of 8 or more. Courts and explanation included.',
        tekst: [
          'Shuffleboard is easier to explain than bowling and you can keep talking while you play. That is why it works well for groups where not everyone knows each other, or for teams with a mix of ages.',
          'You play for an hour and a half on the courts of The Grand Shuffle in the city centre. Everything is indoors. Combining it with drinks on the same day is easy, as the venues are within walking distance of each other.',
        ],
        vragen: [
          {
            q: 'What is shuffleboard?',
            a: 'A table game in which you slide pucks along a long, smooth court and try to get as close to the edge as possible without falling off.',
          },
          {
            q: 'How many people per court?',
            a: 'Four to six. For larger groups we book several courts side by side.',
          },
          { q: 'Can we play in winter?', a: 'Yes, all year round. Everything is indoors.' },
        ],
      },
    },

    domtoren: {
      naam: 'Dom Tower climb',
      kort: 'Climb 465 steps with a guide for a view over the city.',
      beschrijving:
        'A guided tour to the top of the Dom Tower, the highest point in Utrecht. Not suitable for people with a fear of heights or limited mobility.',
      locatie: 'Domplein',
      duur: '1 hour',
      inclusief: ['admission', 'guide'],
      seo: {
        titel: 'Climbing the Dom Tower with a group',
        beschrijving:
          'Climb 465 steps with a guide for a view over Utrecht. For groups of 8 or more, admission and guide included.',
        tekst: [
          'At 112 metres, the Dom Tower is the tallest church tower in the Netherlands. You climb 465 steps with a guide and end up high above the city, with views as far as Amsterdam on a clear day.',
          'The climb takes an hour and is the only activity where fitness matters. For mixed groups we usually plan it in the morning, while everyone is still fresh.',
        ],
        vragen: [
          {
            q: 'How many steps are there?',
            a: '465. The climb goes in stages, with resting points along the way.',
          },
          {
            q: 'Is it suitable for everyone?',
            a: 'You need to be reasonably mobile. There is no lift and the staircase is narrow and steep.',
          },
          { q: 'How long does it take?', a: 'About an hour, including the guide’s explanation.' },
        ],
      },
    },

    rondvaart: {
      naam: 'Canal cruise',
      kort: 'One hour on the Oudegracht and the outer canals.',
      beschrijving:
        'A canal cruise with Schuttevaer past the wharves of the Oudegracht and along the outer canals.',
      locatie: 'Boarding point on the Oudegracht',
      duur: '1 hour',
      inclusief: ['canal cruise'],
      seo: {
        titel: 'Utrecht canal cruise for groups',
        beschrijving:
          'One hour on the Oudegracht and the outer canals with your group of 8 or more. Boarding in the city centre, fixed price per person.',
        tekst: [
          'An hour on the Oudegracht and the outer canals, past the wharf cellars that you can only really see from the water. These old cellars at water level are unique to Utrecht. For groups, this is the activity where everyone sits down and catches up, usually between two more active blocks.',
          'You board in the city centre, within walking distance of the other activities. Handy as the start of the day, or as a break after lunch.',
        ],
        vragen: [
          { q: 'How long is the canal cruise?', a: 'One hour.' },
          {
            q: 'Is the boat covered?',
            a: 'Yes, there is a roof, so the cruise also goes ahead when it rains.',
          },
          {
            q: 'Can we have drinks on board?',
            a: 'Drinks are not included in this activity. For drinks, combine it with the closing drinks afterwards.',
          },
        ],
      },
    },

    groepslunch: {
      naam: 'Group lunch',
      kort: 'Set lunch menu, vegetarian available.',
      beschrijving:
        'A set group lunch at one of the venues of Brothers Horeca Groep in the city centre. A vegetarian option is available; you can pass on other dietary requirements when you book.',
      locatie: 'BHG venue in the city centre',
      duur: '1 hour',
      inclusief: ['set lunch menu', 'soft drink or coffee'],
      seo: {
        titel: 'Group lunch in Utrecht city centre',
        beschrijving:
          'Set lunch menu for groups of 8 or more at a fixed venue in the centre of Utrecht. Vegetarian available.',
        tekst: [
          'A set lunch menu at a fixed venue in the city centre, so you know in advance what it costs and how long it takes. One hour, including a soft drink or coffee.',
          'Vegetarian is available at no extra cost. Let us know how many people when you book.',
        ],
        vragen: [
          { q: 'How long is the lunch?', a: 'One hour, from 12:30 to 13:30.' },
          { q: 'Is vegetarian available?', a: 'Yes, at no extra cost. Let us know when you book.' },
          {
            q: 'Where is it?',
            a: 'At a fixed venue in the centre of Utrecht, within walking distance of the other activities.',
          },
        ],
      },
    },

    borrel: {
      naam: 'Closing drinks',
      kort: '2 drinks with bitterballen.',
      beschrijving:
        'End the day the Dutch way with a borrel (drinks with snacks) at JEU de boules bar: two drinks per person and bitterballen, the classic Dutch deep-fried bites.',
      locatie: 'JEU de boules bar, Paardenveld',
      duur: '1 hour',
      inclusief: ['2 drinks per person', 'bitterballen'],
      seo: {
        titel: 'Group drinks in Utrecht',
        beschrijving:
          'Closing drinks with two drinks per person and bitterballen at Paardenveld. For groups of 8 or more, fixed price per person.',
        tekst: [
          'The closing block, known in Dutch as a borrel: two drinks per person with bitterballen, at JEU de boules bar on Paardenveld. A fixed price, so no bill at the end that turns out higher than expected.',
          'A five-minute walk from Utrecht Centraal, which is handy if people take the train home afterwards.',
        ],
        vragen: [
          { q: 'How many drinks are included?', a: 'Two per person, plus bitterballen.' },
          { q: 'Can we order more?', a: 'Yes, extra drinks are paid for on the spot.' },
          { q: 'What time are the drinks?', a: 'In the closing time slot, from 16:30 to 18:00.' },
        ],
      },
    },

    gluhwein: {
      naam: 'Welcome with mulled wine',
      kort: 'Warm up with mulled wine or hot chocolate.',
      beschrijving:
        'The group meets at JEU de boules bar on Paardenveld. Everyone gets a glühwein (mulled wine) or hot chocolate with something tasty on the side.',
      locatie: 'JEU de boules bar, Paardenveld',
      duur: '30 min',
      inclusief: ['mulled wine or hot chocolate', 'something tasty'],
      seo: {
        titel: 'Mulled wine welcome for groups in Utrecht',
        beschrijving:
          'A winter welcome with mulled wine or hot chocolate at Paardenveld. For groups of 8 or more, November to March.',
        tekst: [
          'The winter version of the welcome: mulled wine or hot chocolate with something tasty, indoors at Paardenveld.',
          'This block runs from November to March and is part of the winter package Warm Winter Day.',
        ],
        vragen: [
          { q: 'Is there an alcohol-free option?', a: 'Yes, hot chocolate is the alternative.' },
          { q: 'When is this available?', a: 'From November to March.' },
        ],
      },
    },

    winterlunch: {
      naam: 'Winter lunch',
      kort: 'Pea soup or stamppot, vegetarian available.',
      beschrijving:
        'A hearty Dutch winter lunch at one of the venues of Brothers Horeca Groep: erwtensoep (thick pea soup) or stamppot (mashed potatoes with vegetables), with a vegetarian choice.',
      locatie: 'BHG venue in the city centre',
      duur: '1 hour',
      inclusief: ['pea soup or stamppot', 'soft drink or coffee'],
      seo: {
        titel: 'Dutch winter lunch for groups in Utrecht',
        beschrijving:
          'Pea soup or stamppot for groups of 8 or more in the centre of Utrecht. Vegetarian available, November to March.',
        tekst: [
          'Erwtensoep (Dutch pea soup) or stamppot (mashed potatoes with vegetables) at a fixed venue in the city centre, as a lunch between two winter activities.',
          'Vegetarian is available. This block runs from November to March.',
        ],
        vragen: [
          { q: 'What is served?', a: 'Pea soup or stamppot, with a soft drink or coffee.' },
          { q: 'Is vegetarian available?', a: 'Yes, let us know when you book.' },
        ],
      },
    },

    'city-challenge': {
      naam: 'City Challenge through the old town',
      kort: 'Explore the old centre in teams, with challenges along the way.',
      beschrijving:
        'The group heads into the old town in teams, with a series of challenges and questions about what they come across: the Dom, the wharf cellars and the Oudegracht. On foot, at your own pace, with a fixed start and finish. We provide the challenges and are there at the start and the finish.',
      locatie: 'Start at Paardenveld, finish at the Neude',
      duur: '1.5 to 2 hours',
      inclusief: ['challenges for each team', 'host at start and finish', 'results at the end'],
      seo: {
        titel: 'City Challenge Utrecht: a city game for groups',
        beschrijving: `In teams through Utrecht’s old town, with challenges about the Dom, the wharf cellars and the Oudegracht. From 8 people, ${bouwsteenPrijs('en', 'city-challenge')} per person.`,
        tekst: [
          'A City Challenge is a city game: the group heads into the old town in teams, with challenges and questions about what they come across along the way. The Dom, the wharf cellars and the Oudegracht all feature. On foot, at your own pace.',
          'It is not an escape room and not a guided tour. You find your own way; we provide the challenges and are there at the start and the finish to go through the results. The start is at Paardenveld, the finish at the Neude square.',
        ],
        vragen: [
          {
            q: 'How long does a City Challenge take?',
            a: 'One and a half to two hours, depending on how fast the teams go.',
          },
          {
            q: 'How big are the teams?',
            a: 'Four to six people per team. With 8 people, you play with two teams against each other.',
          },
          {
            q: 'Is there a guide?',
            a: 'Not along the way. We are there at the start and the finish; in between, the teams go out on their own.',
          },
          {
            q: 'What does it cost?',
            a: `${bouwsteenPrijs('en', 'city-challenge')} per person. It is our most affordable activity.`,
          },
        ],
      },
    },

    kanoen: {
      naam: 'Canoeing in Amelisweerd',
      kort: '2 hours of canoeing on the Kromme Rijn.',
      beschrijving:
        'Two people per canoe on the Kromme Rijn river through the Amelisweerd estate. Life jackets and waterproof bags are included.',
      locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
      duur: '2 hours',
      inclusief: ['two-person canoe', 'life jacket', 'waterproof bag'],
      seo: {
        titel: 'Canoeing with a group in Utrecht',
        beschrijving:
          'Two hours of canoeing on the Kromme Rijn through Amelisweerd, with your group of 8 or more. Canoe, life jacket and waterproof bag included.',
        tekst: [
          'Canoeing near Utrecht means the Kromme Rijn, a small river that winds right through the Amelisweerd estate. You paddle under old trees and pass the tea garden at Rhijnauwen. It is one of the few places around the city where a group can paddle for two hours without meeting any motorboats.',
          'You go two people per canoe, so it works well if you want to pair up people who do not know each other yet. Life jackets and a waterproof bag for phones are included.',
        ],
        vragen: [
          {
            q: 'How many people per canoe?',
            a: 'Two. With an odd number in the group, we add one canoe with three seats.',
          },
          {
            q: 'Is experience needed?',
            a: 'No. You get an explanation before you set off and the route is easy, there and back on the same water.',
          },
          {
            q: 'What if it rains?',
            a: 'Canoeing goes ahead in the rain. Only in case of thunder or strong wind do we switch to an indoor activity.',
          },
          {
            q: 'Can it be combined with a BBQ?',
            a: 'Yes. The BBQ with two hours of drinks is at the same location, De Rijnstroom, and is available from 15 people.',
          },
        ],
      },
    },

    suppen: {
      naam: 'Stand-up paddling in Amelisweerd',
      kort: '2 hours of stand-up paddling on the Kromme Rijn.',
      beschrijving:
        'Everyone gets their own SUP board on the calm water of the Kromme Rijn. Being able to swim is required.',
      locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
      duur: '2 hours',
      inclusief: ['SUP board', 'paddle', 'life jacket'],
      seo: {
        titel: 'Stand-up paddling with a group in Utrecht',
        beschrijving:
          'Stand-up paddling (SUP) on the Kromme Rijn near Amelisweerd, for groups of 8 or more. Board, paddle and life jacket included. Fixed price per person.',
        tekst: [
          'The calmest place for stand-up paddling in Utrecht is the Kromme Rijn. No busy canals with tour boats, but quiet water through the Amelisweerd estate, where a group can stay together. Everyone gets their own board, so nobody has to share.',
          'This activity is for groups of 8 or more and takes two hours. You can book it on its own or combine it with a picnic by the water or a BBQ to finish. Looking for a board just for yourself or for two? Then this is not the right place: we only work with groups.',
        ],
        vragen: [
          {
            q: 'Do you need SUP experience?',
            a: 'No. Most people are standing within ten minutes. The water of the Kromme Rijn is calm and shallow, so falling in is no problem.',
          },
          {
            q: 'Do you need to be able to swim?',
            a: 'Yes, that is required. Everyone gets a life jacket, but being able to swim is a condition for taking part.',
          },
          {
            q: 'What group size is possible?',
            a: 'From 8 people, up to a maximum of 30. You book per person.',
          },
          {
            q: 'Is it available all year?',
            a: 'No, stand-up paddling is possible from April to October. In winter, choose jeu de boules or shuffleboard instead, for example.',
          },
        ],
      },
    },

    picknick: {
      naam: 'Picnic by the water',
      kort: 'Picnic package at De Rijnstroom.',
      beschrijving: 'A picnic package for each person, to collect at De Rijnstroom.',
      locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
      duur: '1 hour',
      inclusief: ['picnic package per person'],
      seo: {
        titel: 'Group picnic in Amelisweerd',
        beschrijving:
          'A picnic package for each person at De Rijnstroom on the Kromme Rijn. For groups of 8 or more.',
        tekst: [
          'The picnic is the lunch option for days on the water. You collect the packages at De Rijnstroom and eat by the Kromme Rijn, in the green surroundings of Amelisweerd.',
          'It is the most relaxed way to split the day in two: sit down for a while after canoeing or paddling, then carry on.',
        ],
        vragen: [
          {
            q: 'What is in the package?',
            a: 'A picnic package for each person. Let us know about dietary requirements when you book.',
          },
          { q: 'Where do you eat?', a: 'At De Rijnstroom on the Kromme Rijn, in Amelisweerd.' },
          {
            q: 'Is it available in winter?',
            a: 'No, the picnic runs from April to October. In winter there is a winter lunch in the city centre.',
          },
        ],
      },
    },

    bbq: {
      naam: 'BBQ with drinks',
      kort: 'Barbecue to finish, 2 hours of drinks.',
      beschrijving:
        'Finish with a barbecue at De Rijnstroom, including 2 hours of unlimited drinks. From 15 people.',
      locatie: 'De Rijnstroom, Weg naar Rhijnauwen 2',
      duur: '2 hours',
      inclusief: ['BBQ package', '2 hours of drinks'],
      seo: {
        titel: 'Group BBQ in Utrecht',
        beschrijving:
          'Barbecue at De Rijnstroom in Amelisweerd with two hours of unlimited drinks. For groups of 15 or more, fixed price per person.',
        tekst: [
          'The BBQ is the closing block at De Rijnstroom on the Kromme Rijn, outdoors by the water in Amelisweerd. Two hours of unlimited drinks are included, so there is nothing to settle afterwards.',
          'This block is available from 15 people, more than the other activities. It combines naturally with canoeing or stand-up paddling at the same location: out of the water and straight to the table.',
        ],
        vragen: [
          { q: 'From how many people?', a: 'From 15 people, up to a maximum of 40.' },
          {
            q: 'Are drinks included?',
            a: 'Yes, two hours of unlimited drinks are included in the price.',
          },
          {
            q: 'Is there a vegetarian option?',
            a: 'Yes, let us know when you book how many people eat vegetarian.',
          },
          {
            q: 'Is it available in winter?',
            a: 'No, the BBQ runs from April to October. In winter you finish with drinks in the city centre.',
          },
        ],
      },
    },

    'kickbike-tocht': {
      naam: 'Kickbike tour',
      kort: 'On your own on a kickbike, along a set route.',
      beschrijving:
        'The group rides a set route along the Kromme Rijn between the city centre and Amelisweerd on their own. The kickbikes are ready with a lock; you receive the code and the route the day before.',
      locatie: 'Start according to the route (city centre or De Rijnstroom)',
      duur: '1.5 to 2 hours',
      inclusief: ['kickbike', 'lock', 'route'],
      seo: {
        titel: 'Kickbike tour in Utrecht for groups',
        beschrijving:
          'Ride a set route along the Kromme Rijn between the city centre and Amelisweerd on your own. For groups of 8 or more.',
        tekst: [
          'The kickbike tour links the two places where the rest of the day happens: the city centre and Amelisweerd. You ride a set route along the Kromme Rijn on your own, for about an hour and a half to two hours.',
          'The kickbikes are ready with a lock; you receive the code and the route the day before. Only want to rent kickbikes without a programme around it, for an afternoon or a weekend for example? Then take a look at stepverhuurutrecht.nl (in Dutch).',
        ],
        vragen: [
          {
            q: 'What is a kickbike?',
            a: 'A large scooter with bicycle wheels. You stand on it and push off with one foot; faster and more comfortable than a regular scooter.',
          },
          {
            q: 'Is there a guide along the way?',
            a: 'No, the group goes on its own. You receive the route and the lock code in advance.',
          },
          {
            q: 'I only want to rent kickbikes, can I do that here?',
            a: 'Not through this page. For rental without a programme, go to stepverhuurutrecht.nl.',
          },
        ],
        verwijzing: {
          tekst: 'Only want to rent kickbikes, without a programme around it?',
          href: 'https://stepverhuurutrecht.nl',
          link: 'Go to Stepverhuur Utrecht (in Dutch)',
        },
      },
    },
  },

  pakketten: {
    'warme-winterdag': {
      naam: 'Warm Winter Day',
      kort: 'Mulled wine, the Dom Tower, a winter lunch, jeu de boules and drinks.',
      beschrijving:
        'A winter day in the centre of Utrecht, mostly indoors. Warm up with mulled wine, see the city from the Dom Tower, enjoy Dutch pea soup or stamppot and then play boules until it is time for drinks.',
      voorWie: 'Company outings, teams and groups of friends',
    },
    'amelisweerd-actief': {
      naam: 'Active Amelisweerd',
      kort: 'Canoeing, a picnic, a kickbike tour and a BBQ. Outdoors all day.',
      beschrijving:
        'An active day in the green on the edge of Utrecht. Everything takes place at and around De Rijnstroom, so there is no hassle getting from one place to the next.',
      voorWie: 'Teams, groups of friends and student societies',
    },
    'spel-en-borrel': {
      naam: 'Utrecht Games & Drinks',
      kort: 'Coffee, jeu de boules, lunch, shuffleboard and drinks.',
      beschrijving:
        'A full day of indoor games and good food in the city centre, so it works in any weather. Everything is within walking distance of Utrecht Centraal station.',
      voorWie: 'Company outings and team building, all year round',
    },
    'water-naar-borrel': {
      naam: 'From the Water to Drinks',
      kort: 'Stand-up paddling, a picnic, by kickbike to the city and drinks.',
      beschrijving:
        'In the morning on the water in Amelisweerd, after the picnic by kickbike along the Kromme Rijn to the city centre, and finish with drinks at JEU.',
      voorWie: 'Bachelor and bachelorette parties and groups of friends',
    },
    schooluitje: {
      naam: 'Utrecht School Trip',
      kort: 'The Dom Tower, a group lunch and a canal cruise.',
      beschrijving:
        'The historic heart of Utrecht: climb the Dom Tower, have lunch together and see the city from the water.',
      voorWie: 'Secondary school and vocational school classes',
    },
    'boules-en-borrel': {
      naam: 'Boules & Drinks',
      kort: 'Half day: jeu de boules with bites and closing drinks.',
      beschrijving:
        'An easy afternoon: at two o’clock you take to the courts at JEU de boules bar on Paardenveld, with bites, and you finish with drinks. A five-minute walk from Utrecht Centraal station, so everyone can join and leave easily.',
      voorWie: 'Teams and groups of friends with an afternoon off',
    },
    'dom-en-grachten': {
      naam: 'Dom Tower & Canals',
      kort: 'Half day: climb the Dom Tower and a canal cruise.',
      beschrijving:
        'The old heart of Utrecht in half a day: first up the 465 steps of the Dom Tower for the view, then past the wharf cellars by boat. Little to organise, lots of city.',
      voorWie: 'School classes, families and groups from outside the city',
    },
    'water-en-picknick': {
      naam: 'Water & Picnic',
      kort: 'Half day: canoeing through Amelisweerd and a picnic by the water.',
      beschrijving:
        'A morning on the Kromme Rijn with two people per canoe, followed by a picnic by the water at De Rijnstroom. Everyone is free again by half past one.',
      voorWie: 'Teams and groups of friends, April to October',
    },
    'winter-op-de-grachten': {
      naam: 'Winter on the Canals',
      kort: 'Half day: mulled wine, a canal cruise with Schuttevaer and a winter lunch.',
      beschrijving:
        'Utrecht in winter, seen from the water. Warm up with mulled wine at JEU de boules bar, spend an hour with Rederij Schuttevaer on the Oudegracht and the city canals, and finish with pea soup or stamppot. Everyone is free again at half past one.',
      voorWie: 'Company outings, teams and families, November to March',
    },
    winterborrel: {
      naam: 'Winter Drinks',
      kort: 'Half day: mulled wine, indoor jeu de boules and drinks.',
      beschrijving:
        'A winter afternoon that does not depend on the weather: arrive to mulled wine, play boules on the covered courts and finish with drinks. All indoors, all in the city centre.',
      voorWie: 'Teams and groups of friends, November to March',
    },
    'koffie-en-city-challenge': {
      naam: 'Coffee & City Challenge',
      kort: 'Half morning: coffee and cake, then into the old town in teams.',
      beschrijving:
        'The most affordable way to do something together with a group in Utrecht. Coffee and cake at JEU de boules bar at half past nine, into the old town in teams for the City Challenge at ten, finished around twelve. No bookings with third parties, so it can also be arranged at short notice.',
      voorWie: 'Teams, classes and groups of friends with a morning and a small budget',
    },
    'schoolreis-basisschool': {
      naam: 'Primary School Trip',
      kort: 'A canal cruise and a City Challenge, bring your own lunch.',
      beschrijving:
        'Utrecht from the water, with a skipper who tells stories about the wharf cellars and the Dom along the way. In the afternoon the pupils explore the old town in teams with the City Challenge. No stairs and no long walks, so suitable from Dutch year group 6 (around age 9). Bring your own lunch, or add the group lunch when you plan your day.',
      voorWie: 'Primary schools, Dutch year groups 6 to 8 (around ages 9 to 12)',
    },
    'vrijgezellen-winterdag': {
      naam: 'Bachelor Party Winter Day',
      kort: 'Mulled wine, shuffleboard, a winter lunch and drinks.',
      beschrijving:
        'The winter version of the bachelor and bachelorette day, completely indoors. Start with mulled wine, then shuffleboard at The Grand Shuffle, a warm lunch and finish with drinks at JEU. Same price as the summer package.',
      voorWie: 'Bachelor and bachelorette parties and groups of friends, November to March',
    },
  },
};

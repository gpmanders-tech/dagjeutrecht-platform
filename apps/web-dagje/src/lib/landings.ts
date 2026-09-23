import { REGELS, formatEuro, prijsPerPersoon, vindPakket } from './aanbod';
import { fotos, type Foto } from './fotos';

export type Landing = {
  pad: string;
  metaTitel: string;
  metaOmschrijving: string;
  boven: string;
  titel: string;
  intro: string;
  pakketten: string[];
  alineas: Array<{ kop: string; tekst: string }>;
  faq: Array<{ q: string; a: string }>;
  kleur: 'zee' | 'vlam' | 'zon' | 'inkt';
  foto: Foto;
  galerij: Foto[];
  band: string[];
  /** Korte naam voor links tussen de gelegenheidspagina's (Ook interessant, footer). */
  link: string;
  /**
   * Het pakket dat op de pagina als voorbeeld per uur wordt uitgeschreven
   * (Zo ziet de dag eruit). Tijden, onderdelen en inbegrepen komen uit aanbod.ts.
   */
  voorbeeld: string;
  /**
   * De zusterpagina over hetzelfde onderwerp op Stepverhuur Utrecht (ALG-07).
   * DagjeUtrecht geeft het hoofdantwoord over het complete dagje, Stepverhuur
   * over het huren van steps. De pagina's verwijzen naar elkaar in plaats van
   * in Google om dezelfde zoekterm te vechten.
   */
  zuster?: { href: string; label: string; tekst: string };
};

function prijs(slug: string) {
  const p = vindPakket(slug);
  return p ? formatEuro(prijsPerPersoon(p.blokken)) : '';
}

/**
 * De laagste prijs uit een rij pakketten. Hiermee staat de vanafprijs in de titel
 * en de beschrijving die Google toont, want elke concurrent die op deze zoektermen
 * in de bovenste tien staat noemt een bedrag en wij deden dat niet (DAG-12).
 * Het bedrag rolt uit de bouwstenen, dus het kan nooit uit de pas gaan lopen.
 */
function vanaf(slugs: string[]) {
  const centen = slugs.map((slug) => {
    const p = vindPakket(slug);
    return p ? prijsPerPersoon(p.blokken) : Number.POSITIVE_INFINITY;
  });
  return formatEuro(Math.min(...centen));
}

const P_BEDRIJF = ['koffie-en-city-challenge', 'boules-en-borrel', 'spel-en-borrel', 'warme-winterdag', 'winterborrel', 'amelisweerd-actief', 'water-naar-borrel'];
const P_TEAM = ['koffie-en-city-challenge', 'boules-en-borrel', 'spel-en-borrel', 'warme-winterdag', 'winterborrel', 'amelisweerd-actief'];
const P_SCHOOL = ['koffie-en-city-challenge', 'schoolreis-basisschool', 'dom-en-grachten', 'schooluitje', 'spel-en-borrel'];
const P_VRIJGEZEL = ['boules-en-borrel', 'water-naar-borrel', 'vrijgezellen-winterdag', 'amelisweerd-actief', 'spel-en-borrel'];

const P_PERSONEEL = ['boules-en-borrel', 'koffie-en-city-challenge', 'spel-en-borrel', 'winterborrel', 'warme-winterdag', 'water-en-picknick', 'amelisweerd-actief'];
const P_FEEST = ['boules-en-borrel', 'winterborrel', 'spel-en-borrel', 'warme-winterdag', 'amelisweerd-actief', 'water-naar-borrel'];

const GROEP = `Vanaf ${REGELS.minPers} personen.`;

const GROTER = {
  q: `Wat als we met meer dan ${REGELS.maxPers} personen zijn?`,
  a: `Online boeken kan met ${REGELS.minPers} tot ${REGELS.maxPers} personen. Zijn jullie met meer, neem dan contact met ons op via info@dagjeutrecht.nl of 030 227 14 39.`,
};

const WEER = {
  q: 'Wat als het regent?',
  a: 'Jeu de boules, shuffleboard en de borrel zijn binnen, dus die gaan altijd door. Kanoën gaat gewoon door bij regen; alleen bij onweer of harde wind wijken we uit naar een onderdeel binnen.',
};

const ALGEMENE_FAQ = [
  {
    q: 'Op welke dagen kan het?',
    a: `Op donderdag, vrijdag en zaterdag. Boek minimaal ${REGELS.minDagenVooruit} dagen vooruit.`,
  },
  {
    q: 'Kan het aantal personen nog veranderen?',
    a: `Ja, tot ${REGELS.aantalDefinitiefDagenVooraf} dagen voor de datum. Daarna is het aantal definitief.`,
  },
  {
    q: 'Kunnen jullie rekening houden met dieetwensen?',
    a: 'Bij de lunch is een vegetarische keuze mogelijk. Andere dieetwensen en maatwerk kunnen we helaas niet regelen.',
  },
];


const BEVESTIGING = {
  q: 'Hoe snel weten we of het doorgaat?',
  a: 'Binnen 3 werkdagen bevestigen onze partners alles en krijg je een betaallink. De dag ervoor krijg je alle tijden en adressen.',
};

export type LandingSleutel =
  | 'bedrijfsuitje'
  | 'personeelsuitje'
  | 'teambuilding'
  | 'bedrijfsfeest'
  | 'schooluitje'
  | 'vrijgezellenfeest';

export const LANDINGS: Record<LandingSleutel, Landing> = {
  bedrijfsuitje: {
    pad: '/bedrijfsuitje-utrecht',
    link: 'Bedrijfsuitje',
    voorbeeld: 'spel-en-borrel',
    kleur: 'zee',
    foto: fotos.boulesSpelers,
    galerij: [fotos.boules, fotos.kanoDuo, fotos.terrassen, fotos.borrel],
    band: ['Jeu de boules', 'Shuffleboard', 'Kanoën', 'Lunch', 'Borrel', 'Factuur op de zaak'],
    zuster: {
      href: 'https://stepverhuurutrecht.nl/bedrijfsuitje-utrecht',
      label: 'Bedrijfsuitje op de step',
      tekst: 'Alleen kickbikes huren voor het team, zonder lunch en borrel erbij?',
    },
    metaTitel: `Bedrijfsuitje Utrecht vanaf ${vanaf(P_BEDRIJF)} per persoon`,
    metaOmschrijving: `Bedrijfsuitje in Utrecht met een vaste prijs per persoon: vanaf ${vanaf(P_BEDRIJF)} voor een ochtend, ${prijs('spel-en-borrel')} voor een hele dag. Vanaf ${REGELS.minPers} personen, inclusief btw.`,
    boven: 'Voor HR, teamleiders en personeelsverenigingen',
    titel: 'Bedrijfsuitje in Utrecht, zonder gedoe',
    intro:
      'Kies een pakket of stel zelf een dag samen uit vaste onderdelen. Je ziet meteen wat het kost, wij regelen de reserveringen bij onze partners.',
    pakketten: P_BEDRIJF,
    alineas: [
      {
        kop: 'Binnen of buiten',
        tekst:
          'In het centrum speel je jeu de boules bij JEU en shuffleboard in The Grand Shuffle, op loopafstand van Utrecht Centraal. Dat kan het hele jaar en bij elk weer. Liever naar buiten? In Amelisweerd ga je kanoën of suppen op de Kromme Rijn en sluit je af met een BBQ.',
      },
      {
        kop: 'Wat het kost',
        tekst: `Een hele dag begint bij ${prijs('spel-en-borrel')} per persoon voor Utrecht Spel & Borrel, inclusief koffie, lunch en borrel. Amelisweerd Actief kost ${prijs('amelisweerd-actief')} per persoon, inclusief picknick en BBQ met drankjes. Heeft het team maar een dagdeel? Boules & Borrel kost ${prijs('boules-en-borrel')} per persoon voor een middag, Koffie & City Challenge ${prijs('koffie-en-city-challenge')} voor een ochtend. Alle prijzen zijn inclusief btw, vanaf ${REGELS.minPers} personen.`,
      },
      {
        kop: 'Makkelijk bereikbaar',
        tekst:
          'De dagen in het centrum beginnen bij JEU de boules bar aan Paardenveld, op vijf minuten lopen van Utrecht Centraal. Collega’s die met de trein komen zijn er dus zo, en wie eerder weg moet stapt net zo makkelijk weer in. Amelisweerd ligt aan de rand van de stad, bij Botenverhuur De Rijnstroom aan de Kromme Rijn.',
      },
      {
        kop: 'Eén aanspreekpunt, één factuur',
        tekst:
          'Je hoeft niet zelf met de boulesbar, de botenverhuur en de lunchzaak te mailen. Wij reserveren alles bij onze vaste partners en je krijgt één factuur op naam van het bedrijf. Op de dag zelf is Ger jullie aanspreekpunt.',
      },
      {
        kop: 'Ook voor een bedrijfsevenement',
        tekst:
          'Een jubileum, een afscheid of het einde van een project vieren? Begin met een spel en sluit af met een borrel: dan heeft iedereen iets gedaan en is er daarna tijd om te praten. Kijk ook bij het bedrijfsfeest en het personeelsuitje voor pakketten die daarbij passen.',
      },
    ],
    faq: [
      {
        q: 'Krijgen we een factuur op naam van het bedrijf?',
        a: 'Ja. Vul bij de aanvraag de bedrijfsnaam in, dan staat de factuur op naam van het bedrijf, met btw.',
      },
      { q: 'Met hoeveel personen kan het?', a: GROEP },
      GROTER,
      {
        q: 'Kunnen we alleen een middag doen?',
        a: `Ja. Boules & Borrel is een middag van twee uur tot zes uur en kost ${prijs('boules-en-borrel')} per persoon. Koffie & City Challenge is een ochtend en kost ${prijs('koffie-en-city-challenge')} per persoon.`,
      },
      WEER,
      BEVESTIGING,
      ...ALGEMENE_FAQ,
    ],
  },

  personeelsuitje: {
    pad: '/personeelsuitje-utrecht',
    link: 'Personeelsuitje',
    voorbeeld: 'boules-en-borrel',
    kleur: 'zon',
    foto: fotos.terrassen,
    galerij: [fotos.boulesSpelers, fotos.koffie, fotos.oudegrachtDom, fotos.borrel],
    band: ['Personeelsvereniging', 'Jeu de boules', 'City Challenge', 'Lunch', 'Borrel', 'Eén factuur'],
    metaTitel: `Personeelsuitje Utrecht vanaf ${vanaf(P_PERSONEEL)} per persoon`,
    metaOmschrijving: `Personeelsuitje in Utrecht voor jong en oud: boulen, City Challenge of kanoën, met lunch en borrel. Vanaf ${vanaf(P_PERSONEEL)} per persoon, vaste prijs incl. btw.`,
    boven: 'Voor personeelsverenigingen en HR',
    titel: 'Personeelsuitje in Utrecht',
    intro:
      'Een uitje waar iedereen aan mee kan doen, van de stagiair tot de collega die bijna met pensioen gaat. Kies een pakket met een vaste prijs per persoon, wij regelen de rest.',
    pakketten: P_PERSONEEL,
    alineas: [
      {
        kop: 'Voor iedereen te doen',
        tekst:
          'Bij een personeelsuitje gaat het erom dat niemand afhaakt. Jeu de boules en shuffleboard zijn in twee worpen uitgelegd en vragen geen conditie. De City Challenge doe je te voet en op eigen tempo. Wie graag buiten actief is, kiest in de zomer voor kanoën in Amelisweerd.',
      },
      {
        kop: 'Een middag na het werk',
        tekst: `Boules & Borrel begint om twee uur met jeu de boules en bites en eindigt met een borrel tot zes uur. Dat kost ${prijs('boules-en-borrel')} per persoon, inclusief btw. Van november tot en met maart is er de Winterborrel met glühwein vooraf, voor ${prijs('winterborrel')} per persoon.`,
      },
      {
        kop: 'Of een hele dag',
        tekst: `Utrecht Spel & Borrel duurt van half tien tot zes uur: koffie met gebak, jeu de boules, een groepslunch, shuffleboard en een borrel, allemaal binnen in het centrum. Het kost ${prijs('spel-en-borrel')} per persoon. In de winter is de Warme Winterdag met de Domtoren en een winterse lunch een goed alternatief, voor ${prijs('warme-winterdag')} per persoon.`,
      },
      {
        kop: 'Handig voor de personeelsvereniging',
        tekst:
          'Je ziet de prijs per persoon vooraf, dus je weet precies wat er van het budget af gaat. Tot een week voor de datum kan het aantal deelnemers nog veranderen. De factuur staat op naam van de vereniging of het bedrijf.',
      },
    ],
    faq: [
      { q: 'Met hoeveel collega’s kan het?', a: `${GROEP} Online boeken kan tot ${REGELS.maxPers} personen.` },
      GROTER,
      {
        q: 'Is het ook geschikt voor oudere collega’s?',
        a: 'Ja. Jeu de boules, shuffleboard en de City Challenge vragen geen conditie. Alleen de Domtoren (465 treden) is niet geschikt voor mensen met hoogtevrees of die slecht ter been zijn.',
      },
      {
        q: 'Krijgen we een factuur op naam van de personeelsvereniging?',
        a: 'Ja. Vul bij de aanvraag de naam van de vereniging of het bedrijf in, dan staat de factuur op die naam, met btw.',
      },
      WEER,
      BEVESTIGING,
      ...ALGEMENE_FAQ,
    ],
  },

  teambuilding: {
    pad: '/teambuilding-utrecht',
    link: 'Teambuilding',
    voorbeeld: 'amelisweerd-actief',
    kleur: 'vlam',
    foto: fotos.kanoDuo,
    galerij: [fotos.kanoBrug, fotos.shuffleboard, fotos.kickbikePark, fotos.bbq],
    band: ['Samenwerken', 'Strijden', 'Peddelen', 'Steppen', 'Borrelen'],
    metaTitel: `Teambuilding Utrecht vanaf ${vanaf(P_TEAM)} per persoon`,
    metaOmschrijving: `Teambuilding in Utrecht: City Challenge, jeu de boules, shuffleboard of kanoën. Vanaf ${vanaf(P_TEAM)} per persoon voor een dagdeel, ${prijs('spel-en-borrel')} voor een hele dag.`,
    boven: 'Samen spelen, samen peddelen',
    titel: 'Teambuilding in Utrecht',
    intro:
      'Niets verbindt een team zo goed als samen iets doen. Speel in teams tegen elkaar op de boulesbaan, of werk samen in een kano op de Kromme Rijn.',
    pakketten: P_TEAM,
    alineas: [
      {
        kop: 'Competitie in het centrum',
        tekst:
          'Jeu de boules en shuffleboard zijn makkelijk te leren, dus iedereen kan meedoen, ongeacht leeftijd of conditie. De teams spelen tegen elkaar en de dag eindigt met een borrel.',
      },
      {
        kop: 'Samenwerken op het water',
        tekst:
          'In Amelisweerd zit je met z\'n tweeën in een kano. Afstemmen en samen sturen, dat merk je meteen. Daarna per kickbike door het groen en afsluiten met een BBQ.',
      },
      {
        kop: 'De City Challenge',
        tekst: `Met de City Challenge gaat het team in groepjes de binnenstad in, met opdrachten en vragen over de Dom, de werfkelders en de Oudegracht. Samen puzzelen, taken verdelen en aan het eind de uitslag. Met koffie en gebak vooraf is dat Koffie & City Challenge, voor ${prijs('koffie-en-city-challenge')} per persoon.`,
      },
      {
        kop: 'Teamuitje of teambuilding?',
        tekst:
          'Wil je vooral samen een leuke dag hebben, dan is een teamuitje met een spel en een borrel genoeg. Wil je dat mensen die elkaar weinig zien echt samenwerken, kies dan onderdelen waarin je op elkaar moet rekenen: twee personen in een kano, of een team dat samen de City Challenge oplost.',
      },
    ],
    faq: [
      { q: 'Met hoeveel personen kan het?', a: GROEP },
      GROTER,
      {
        q: 'Is er een begeleider bij?',
        a: 'Bij de City Challenge staan wij klaar bij de start en de finish. Bij jeu de boules krijg je uitleg ter plekke en bij het kanoën uitleg bij vertrek.',
      },
      {
        q: 'Kan teambuilding ook in de winter?',
        a: `Ja. Jeu de boules, shuffleboard en de City Challenge kunnen het hele jaar. Van november tot en met maart is er ook de Warme Winterdag voor ${prijs('warme-winterdag')} per persoon.`,
      },
      WEER,
      ...ALGEMENE_FAQ,
    ],
  },

  bedrijfsfeest: {
    pad: '/bedrijfsfeest-utrecht',
    link: 'Bedrijfsfeest',
    voorbeeld: 'boules-en-borrel',
    kleur: 'inkt',
    foto: fotos.borrel,
    galerij: [fotos.boulesSpelers, fotos.shuffleboard, fotos.bbq, fotos.grachtAvond],
    band: ['Jubileum', 'Afscheid', 'Eindejaar', 'Jeu de boules', 'Shuffleboard', 'Borrel'],
    metaTitel: `Bedrijfsfeest Utrecht met borrel vanaf ${vanaf(P_FEEST)} p.p.`,
    metaOmschrijving: `Bedrijfsfeest in Utrecht: eerst samen spelen, dan borrelen. Jeu de boules, shuffleboard of BBQ, vanaf ${vanaf(P_FEEST)} per persoon inclusief btw, vanaf ${REGELS.minPers} personen.`,
    boven: 'Iets te vieren met het team',
    titel: 'Bedrijfsfeest in Utrecht',
    intro:
      'Een jubileum, een afscheid of een goed jaar? Vier het met een middag spelen en een borrel in het centrum, of met een BBQ aan het water in Amelisweerd.',
    pakketten: P_FEEST,
    alineas: [
      {
        kop: 'Eerst spelen, dan proosten',
        tekst:
          'Een feest komt pas op gang als mensen iets samen hebben gedaan. Daarom beginnen onze dagen met een spel: jeu de boules op de overdekte banen van JEU of shuffleboard in The Grand Shuffle. Daarna schuif je aan voor de borrel met twee drankjes per persoon en bitterballen.',
      },
      {
        kop: 'Wat het kost',
        tekst: `Boules & Borrel kost ${prijs('boules-en-borrel')} per persoon, de Winterborrel met glühwein vooraf ${prijs('winterborrel')}. Een hele dag met lunch, twee spellen en een borrel kost ${prijs('spel-en-borrel')} per persoon. Alle prijzen zijn inclusief btw.`,
      },
      {
        kop: 'In de zomer: BBQ aan het water',
        tekst: `Van april tot en met oktober sluit Amelisweerd Actief af met een barbecue bij De Rijnstroom, met twee uur drankjes erbij. Daarvoor kanoën en een kickbike-tocht langs de Kromme Rijn. De BBQ kan vanaf 15 personen, het pakket kost ${prijs('amelisweerd-actief')} per persoon.`,
      },
      {
        kop: 'Wat we niet doen',
        tekst:
          'Onze dagen eindigen om zes uur. Zoek je een feestzaal met diner, dj en dansen tot laat, dan zijn wij niet de goede partij. Wel kun je na de borrel in het centrum makkelijk verder de stad in.',
      },
    ],
    faq: [
      {
        q: 'Hoe laat is de borrel afgelopen?',
        a: 'De afsluitende borrel is van half vijf tot zes uur. De BBQ in Amelisweerd duurt twee uur.',
      },
      {
        q: 'Wat zit er bij de borrel inbegrepen?',
        a: 'Twee drankjes per persoon en bitterballen, bij JEU de boules bar aan Paardenveld.',
      },
      { q: 'Met hoeveel personen kan het?', a: `${GROEP} De BBQ kan vanaf 15 personen.` },
      GROTER,
      {
        q: 'Krijgen we een factuur op naam van het bedrijf?',
        a: 'Ja. Vul bij de aanvraag de bedrijfsnaam in, dan staat de factuur op naam van het bedrijf, met btw.',
      },
      ...ALGEMENE_FAQ,
    ],
  },

  schooluitje: {
    pad: '/schooluitje-utrecht',
    link: 'Schooluitje',
    voorbeeld: 'schoolreis-basisschool',
    kleur: 'zon',
    foto: fotos.domtoren,
    galerij: [fotos.oudegrachtDom, fotos.rondvaart, fotos.terrassen, fotos.grachtAvond],
    band: ['Domtoren', 'Rondvaart', 'City Challenge', 'Groepslunch', 'Basisschool, vo en mbo'],
    metaTitel: `Schooluitje en schoolreisje Utrecht vanaf ${vanaf(P_SCHOOL)}`,
    metaOmschrijving: `Schooluitje of schoolreisje in Utrecht voor basisschool, vo en mbo: rondvaart, City Challenge, Domtoren en lunch. Vanaf ${vanaf(P_SCHOOL)} per leerling, incl. btw.`,
    boven: 'Voor docenten en mentoren',
    titel: 'Schooluitje in Utrecht',
    intro:
      'Een overzichtelijke dag in het historische hart van Utrecht. Alles in het centrum, op loopafstand van Utrecht Centraal.',
    pakketten: P_SCHOOL,
    alineas: [
      {
        kop: 'Het programma',
        tekst: `De klas beklimt 's ochtends met een gids de Domtoren, luncht samen en bekijkt 's middags de stad vanaf het water. Het pakket kost ${prijs('schooluitje')} per persoon, inclusief btw.`,
      },
      {
        kop: 'Voor de basisschool',
        tekst: `Groep 6 tot en met 8 vaart 's ochtends door de grachten en gaat 's middags in teams de binnenstad in met de City Challenge. Geen trappen, geen lange loopafstanden en eigen lunch mee: ${prijs('schoolreis-basisschool')} per leerling. Wil de school wel samen lunchen, voeg de groepslunch dan toe in de samensteller.`,
      },
      {
        kop: 'Liever iets actiefs?',
        tekst:
          'Vervang in de samensteller de rondvaart door jeu de boules, shuffleboard of de City Challenge.',
      },
      {
        kop: 'Een halve dag of een kleiner budget',
        tekst: `Dom & Grachten is een halve dag met de Domtoren en een rondvaart, voor ${prijs('dom-en-grachten')} per leerling. Het goedkoopst is Koffie & City Challenge: een ochtend in teams door de binnenstad voor ${prijs('koffie-en-city-challenge')} per persoon.`,
      },
      {
        kop: 'Wat leerlingen zien',
        tekst:
          'De Domtoren is met 465 treden het hoogste punt van Utrecht. Vanaf het water zie je de werfkelders langs de Oudegracht, en tijdens de City Challenge zoeken de teams zelf hun weg langs de Dom, de werven en de Neude. Zo wordt het schoolreisje ook een les over de stad.',
      },
    ],
    faq: [
      {
        q: 'Tellen begeleiders mee?',
        a: `Ja, begeleiders tellen mee in het aantal personen. ${GROEP}`,
      },
      {
        q: 'Kan de school op factuur betalen?',
        a: 'Ja. Vul bij de aanvraag de naam van de school in, dan staat de factuur op naam van de school.',
      },
      {
        q: 'Vanaf welke groep is het geschikt?',
        a: 'Het programma voor de basisschool is geschikt vanaf groep 6: geen trappen en geen lange loopafstanden. Het schooluitje met de Domtoren is bedoeld voor het voortgezet onderwijs en het mbo.',
      },
      {
        q: 'Hoe komen we er met de klas?',
        a: 'Alle schoolprogramma’s zijn in het centrum, op loopafstand van Utrecht Centraal. Wie met de trein komt, loopt zo naar de start.',
      },
      GROTER,
      ...ALGEMENE_FAQ,
    ],
  },

  vrijgezellenfeest: {
    pad: '/vrijgezellenfeest-utrecht',
    link: 'Vrijgezellenfeest',
    voorbeeld: 'water-naar-borrel',
    kleur: 'inkt',
    foto: fotos.supVrijgezellen,
    galerij: [fotos.supOudegracht, fotos.picknick, fotos.kickbikeGracht, fotos.borrel],
    band: ['Suppen', 'Picknick', 'Kickbike', 'Borrel', 'Vrijgezellen'],
    zuster: {
      href: 'https://stepverhuurutrecht.nl/vrijgezellenfeest-utrecht',
      label: 'Vrijgezellenfeest met steps',
      tekst: 'Alleen steps huren en de rest van de dag zelf invullen?',
    },
    metaTitel: `Vrijgezellenfeest Utrecht vanaf ${vanaf(P_VRIJGEZEL)} per persoon`,
    metaOmschrijving: `Vrijgezellenfeest in Utrecht met een vaste prijs per persoon: vanaf ${vanaf(P_VRIJGEZEL)} voor een middag en ${prijs('water-naar-borrel')} voor een hele dag, zomer en winter.`,
    boven: 'Voor getuigen en vriendengroepen',
    titel: 'Vrijgezellenfeest in Utrecht, het hele dagje',
    intro:
      'Een actieve dag die je samen niet vergeet. Kies een pakket, prik een datum en regel het in een paar minuten.',
    pakketten: P_VRIJGEZEL,
    alineas: [
      {
        kop: 'Van het water naar de borrel',
        tekst: `'s Ochtends suppen op de Kromme Rijn, picknicken aan het water en daarna per kickbike naar het centrum voor een borrel bij JEU. Het pakket kost ${prijs('water-naar-borrel')} per persoon.`,
      },
      {
        kop: 'Slecht weer voorspeld?',
        tekst:
          'Kies dan Utrecht Spel & Borrel: jeu de boules, lunch, shuffleboard en borrel, helemaal binnen in het centrum.',
      },
      {
        kop: 'In de winter',
        tekst: `Suppen en kanoën kan van april tot en met oktober. Daarbuiten is er de Vrijgezellen Winterdag: glühwein, shuffleboard, een warme lunch en een borrel, helemaal binnen. Die kost ${prijs('vrijgezellen-winterdag')} per persoon, precies evenveel als het zomerpakket.`,
      },
      {
        kop: 'Alleen een middag',
        tekst: `Wil je 's ochtends zelf iets regelen of 's avonds verder feesten? Boules & Borrel is een middag jeu de boules met bites en een borrel, voor ${prijs('boules-en-borrel')} per persoon. Het is op vijf minuten lopen van Utrecht Centraal, dus handig als de groep met de trein komt.`,
      },
      {
        kop: 'Voor de getuigen',
        tekst:
          'Jij regelt het, maar je wilt ook zelf meedoen. Daarom staat de prijs per persoon vooraf vast en reserveren wij alles bij onze partners. Tot een week voor de datum kan het aantal nog veranderen, handig als er nog iemand twijfelt.',
      },
    ],
    faq: [
      { q: 'Met hoeveel personen kan het?', a: GROEP },
      {
        q: 'Moet iedereen kunnen zwemmen?',
        a: 'Voor suppen wel: kunnen zwemmen is verplicht. Iedereen krijgt een zwemvest. Kan niet iedereen zwemmen, kies dan een pakket in het centrum.',
      },
      {
        q: 'Kan het ook voor een vrijgezellenfeest voor mannen?',
        a: 'Ja. De pakketten zijn voor elke vriendengroep. Jeu de boules, shuffleboard en kanoën met een borrel of BBQ na afloop werken voor elk gezelschap.',
      },
      WEER,
      ...ALGEMENE_FAQ,
    ],
  },
};

/** Alle gelegenheidspagina's, in de volgorde van de links onderaan de pagina en in de footer. */
export const LANDING_LIJST: Landing[] = Object.values(LANDINGS);

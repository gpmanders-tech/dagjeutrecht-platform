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

const GROEP = `Vanaf ${REGELS.minPers} personen.`;

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

export const LANDINGS: Record<'bedrijfsuitje' | 'teambuilding' | 'schooluitje' | 'vrijgezellenfeest', Landing> = {
  bedrijfsuitje: {
    pad: '/bedrijfsuitje-utrecht',
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
    ],
    faq: [
      {
        q: 'Krijgen we een factuur op naam van het bedrijf?',
        a: 'Ja. Vul bij de aanvraag de bedrijfsnaam in, dan staat de factuur op naam van het bedrijf, met btw.',
      },
      { q: 'Met hoeveel personen kan het?', a: GROEP },
      ...ALGEMENE_FAQ,
    ],
  },

  teambuilding: {
    pad: '/teambuilding-utrecht',
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
    ],
    faq: [{ q: 'Met hoeveel personen kan het?', a: GROEP }, ...ALGEMENE_FAQ],
  },

  schooluitje: {
    pad: '/schooluitje-utrecht',
    kleur: 'zon',
    foto: fotos.domtoren,
    galerij: [fotos.oudegrachtDom, fotos.rondvaart, fotos.terrassen, fotos.grachtAvond],
    band: ['Domtoren', 'Rondvaart', 'City Challenge', 'Groepslunch', 'Basisschool, vo en mbo'],
    metaTitel: `Schooluitje Utrecht vanaf ${vanaf(P_SCHOOL)} per leerling`,
    metaOmschrijving: `Schooluitje in Utrecht voor basisschool, vo en mbo: rondvaart, City Challenge, Domtoren en lunch. Vaste prijs per leerling vanaf ${vanaf(P_SCHOOL)}, incl. btw.`,
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
      ...ALGEMENE_FAQ,
    ],
  },

  vrijgezellenfeest: {
    pad: '/vrijgezellenfeest-utrecht',
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
    ],
    faq: [{ q: 'Met hoeveel personen kan het?', a: GROEP }, ...ALGEMENE_FAQ],
  },
};

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
};

function prijs(slug: string) {
  const p = vindPakket(slug);
  return p ? formatEuro(prijsPerPersoon(p.blokken)) : '';
}

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
    metaTitel: 'Bedrijfsuitje Utrecht: pakketten met vaste prijs',
    metaOmschrijving:
      'Bedrijfsuitje in Utrecht zonder gedoe: jeu de boules, shuffleboard, kanoën of kickbiken met lunch en borrel. Vaste prijs per persoon, online samen te stellen.',
    boven: 'Voor HR, teamleiders en personeelsverenigingen',
    titel: 'Bedrijfsuitje in Utrecht, zonder gedoe',
    intro:
      'Kies een pakket of stel zelf een dag samen uit vaste onderdelen. Je ziet meteen wat het kost, wij regelen de reserveringen bij onze partners.',
    pakketten: ['warme-winterdag', 'spel-en-borrel', 'amelisweerd-actief', 'water-naar-borrel'],
    alineas: [
      {
        kop: 'Binnen of buiten',
        tekst:
          'In het centrum speel je jeu de boules bij JEU en shuffleboard in The Grand Shuffle, op loopafstand van Utrecht Centraal. Dat kan het hele jaar en bij elk weer. Liever naar buiten? In Amelisweerd ga je kanoën of suppen op de Kromme Rijn en sluit je af met een BBQ.',
      },
      {
        kop: 'Wat het kost',
        tekst: `Utrecht Spel & Borrel kost ${prijs('spel-en-borrel')} per persoon, inclusief koffie, lunch en borrel. Amelisweerd Actief kost ${prijs('amelisweerd-actief')} per persoon, inclusief picknick en BBQ met drankjes. Alle prijzen zijn inclusief btw.`,
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
    metaTitel: 'Teambuilding Utrecht: spelen, peddelen, borrelen',
    metaOmschrijving:
      'Teambuilding in Utrecht met jeu de boules, shuffleboard, kanoën of een kickbike-tocht. Vaste pakketten en een vaste prijs per persoon.',
    boven: 'Samen spelen, samen peddelen',
    titel: 'Teambuilding in Utrecht',
    intro:
      'Niets verbindt een team zo goed als samen iets doen. Speel in teams tegen elkaar op de boulesbaan, of werk samen in een kano op de Kromme Rijn.',
    pakketten: ['warme-winterdag', 'spel-en-borrel', 'amelisweerd-actief'],
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
    band: ['Domtoren', 'Rondvaart', 'Groepslunch', 'Oudegracht', 'Vo en mbo'],
    metaTitel: 'Schooluitje Utrecht: Domtoren, lunch, rondvaart',
    metaOmschrijving:
      'Schooluitje in Utrecht voor vo en mbo: beklimming van de Domtoren, groepslunch en een rondvaart door de grachten. Vaste prijs per leerling.',
    boven: 'Voor docenten en mentoren',
    titel: 'Schooluitje in Utrecht',
    intro:
      'Een overzichtelijke dag in het historische hart van Utrecht. Alles in het centrum, op loopafstand van Utrecht Centraal.',
    pakketten: ['schooluitje', 'spel-en-borrel'],
    alineas: [
      {
        kop: 'Het programma',
        tekst: `De klas beklimt 's ochtends met een gids de Domtoren, luncht samen en bekijkt 's middags de stad vanaf het water. Het pakket kost ${prijs('schooluitje')} per persoon, inclusief btw.`,
      },
      {
        kop: 'Liever iets actiefs?',
        tekst:
          'Vervang in de samensteller de rondvaart door jeu de boules of shuffleboard.',
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
    metaTitel: 'Vrijgezellenfeest Utrecht: suppen en kickbiken',
    metaOmschrijving:
      'Vrijgezellenfeest in Utrecht: suppen of kanoën in Amelisweerd, per kickbike naar de stad en afsluiten met een borrel. Vaste prijs per persoon.',
    boven: 'Voor getuigen en vriendengroepen',
    titel: 'Vrijgezellenfeest in Utrecht',
    intro:
      'Een actieve dag die je samen niet vergeet. Kies een pakket, prik een datum en regel het in een paar minuten.',
    pakketten: ['water-naar-borrel', 'amelisweerd-actief', 'warme-winterdag', 'spel-en-borrel'],
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
    ],
    faq: [{ q: 'Met hoeveel personen kan het?', a: GROEP }, ...ALGEMENE_FAQ],
  },
};

import { fotos, type Foto } from './fotos';

/**
 * Onderwerpen die (nog) geen bouwsteen zijn maar waar mensen wel op zoeken (DAG-15).
 * De oude /aanbod-adressen stonden hiervoor op pagina 1 van Google. Tot er een vaste
 * leverancier en inkoopprijs is, regelen we het op aanvraag: geen prijs op de pagina,
 * geen namen van locaties waar nog niets mee is afgesproken. Komt er een bouwsteen,
 * dan verwijst deze pagina daarnaar en gaat de prijs uit aanbod.ts erop.
 */
export type OpAanvraag = {
  slug: string;
  metaTitel: string;
  metaOmschrijving: string;
  titel: string;
  label: string;
  intro: string;
  watWeRegelen: string[];
  /** Bestaande bouwstenen die er goed bij passen, voor de rest van de dag. */
  combineer: Array<{ slug: string; naam: string }>;
  faq: Array<{ q: string; a: string }>;
  foto?: Foto;
  kleur: 'zee' | 'vlam' | 'zon' | 'inkt';
};

const PRIJS_FAQ = {
  q: 'Wat kost het?',
  a: 'Dat hangt af van de datum, de groepsgrootte en wat je erbij wilt. Je krijgt binnen een werkdag een voorstel met een prijs per persoon. Toeristenbelasting zit er nooit in en noemen we apart.',
};

export const OP_AANVRAAG: OpAanvraag[] = [
  {
    slug: 'pannenkoekenboot-utrecht',
    metaTitel: 'Pannenkoekenboot Utrecht met je groep',
    metaOmschrijving:
      'Met je groep op de pannenkoekenboot in Utrecht? Wij regelen de vaart en maken er een hele dag van, met borrel of activiteit erbij. Prijs op aanvraag.',
    titel: 'Pannenkoekenboot met je groep',
    label: 'Op aanvraag',
    intro:
      'Varen en ondertussen onbeperkt pannenkoeken eten: een van de leukste manieren om Utrecht vanaf het water te zien. Wij regelen de pannenkoekenboot voor je groep en maken er desgewenst een hele dag van.',
    watWeRegelen: [
      'De vaart op de pannenkoekenboot voor je hele groep',
      'Een activiteit ervoor of erna, zoals jeu de boules of een city challenge',
      'Een afsluitende borrel in de binnenstad',
      'Eén contactpersoon en één factuur voor de hele dag',
    ],
    combineer: [
      { slug: 'jeu-de-boules', naam: 'Jeu de boules met bites' },
      { slug: 'city-challenge', naam: 'City Challenge door de binnenstad' },
      { slug: 'borrel', naam: 'Afsluitende borrel' },
    ],
    faq: [
      PRIJS_FAQ,
      {
        q: 'Voor hoeveel personen kan het?',
        a: 'Vertel ons hoe groot je groep is. Voor kleine en grote groepen zoeken we de vaart die past.',
      },
      {
        q: 'Kunnen kinderen mee?',
        a: 'Ja, de pannenkoekenboot is juist bij families en kinderfeestjes geliefd. Zet het bij je aanvraag, dan houden we er rekening mee.',
      },
    ],
    foto: fotos.rondvaart,
    kleur: 'zee',
  },
  {
    slug: 'escape-room-utrecht',
    metaTitel: 'Escape room in Utrecht voor groepen',
    metaOmschrijving:
      'Escape room met je team of vrienden in Utrecht? Wij regelen de escape room en de rest van de dag, van lunch tot borrel. Prijs op aanvraag.',
    titel: 'Escape room met je groep',
    label: 'Op aanvraag',
    intro:
      'Samen puzzelen tegen de klok: een escape room werkt goed voor teams en vriendengroepen, en het kan het hele jaar door, binnen. Wij regelen de escape room en zetten er een dag omheen.',
    watWeRegelen: [
      'Een escape room in Utrecht, bij grote groepen verdeeld over meerdere kamers tegelijk',
      'Lunch of een borrel voor of na de escape room',
      'Eén contactpersoon en één factuur voor de hele dag',
    ],
    combineer: [
      { slug: 'groepslunch', naam: 'Groepslunch' },
      { slug: 'shuffleboard', naam: 'Shuffleboard' },
      { slug: 'borrel', naam: 'Afsluitende borrel' },
    ],
    faq: [
      PRIJS_FAQ,
      {
        q: 'We zijn met meer dan acht personen, kan dat?',
        a: 'Ja. Bij een grotere groep spelen jullie in meerdere teams tegelijk, en daarna vergelijk je de tijden aan de borrel.',
      },
    ],
    foto: fotos.boulesBinnen,
    kleur: 'inkt',
  },
  {
    slug: 'pingpong-en-vr-utrecht',
    metaTitel: 'Pingpong of VR met je groep in Utrecht',
    metaOmschrijving:
      'Pingpong of virtual reality met je team of vrienden in Utrecht? Wij regelen de activiteit en de rest van de dag, met hapjes en borrel. Prijs op aanvraag.',
    titel: 'Pingpong of VR met je groep',
    label: 'Op aanvraag',
    intro:
      'Een potje pingpong met een drankje erbij, of samen de virtual reality in: allebei binnen, allebei laagdrempelig en voor iedereen te doen. Wij regelen het voor je groep en zetten er een dag omheen.',
    watWeRegelen: [
      'Tafels of een VR-sessie voor je hele groep',
      'Hapjes, lunch of een borrel erbij',
      'Eén contactpersoon en één factuur voor de hele dag',
    ],
    combineer: [
      { slug: 'shuffleboard', naam: 'Shuffleboard' },
      { slug: 'jeu-de-boules', naam: 'Jeu de boules met bites' },
      { slug: 'borrel', naam: 'Afsluitende borrel' },
    ],
    faq: [PRIJS_FAQ],
    foto: fotos.shuffleboard,
    kleur: 'vlam',
  },
  {
    slug: 'boulderen-utrecht',
    metaTitel: 'Boulderen in Utrecht met je groep',
    metaOmschrijving:
      'Boulderen met je team of vrienden in Utrecht, met instructie? Wij regelen de boulderhal en de rest van de dag, van lunch tot borrel. Prijs op aanvraag.',
    titel: 'Boulderen met je groep',
    label: 'Op aanvraag',
    intro:
      'Klimmen zonder touw, op lage wanden boven dikke matten: boulderen is sportief, maar ook voor beginners goed te doen. Wij regelen een boulderhal met instructie en maken er desgewenst een dag van.',
    watWeRegelen: [
      'Een boulderhal in Utrecht met instructie voor beginners',
      'Lunch of een borrel na afloop',
      'Eén contactpersoon en één factuur voor de hele dag',
    ],
    combineer: [
      { slug: 'groepslunch', naam: 'Groepslunch' },
      { slug: 'borrel', naam: 'Afsluitende borrel' },
    ],
    faq: [
      PRIJS_FAQ,
      {
        q: 'Moeten we ervaring hebben?',
        a: 'Nee. Met een korte instructie aan het begin kan iedereen meedoen, ook wie nog nooit geklommen heeft.',
      },
    ],
    kleur: 'zon',
  },
  {
    slug: 'bowlen-utrecht',
    metaTitel: 'Bowlen in Utrecht met je groep',
    metaOmschrijving:
      'Bowlen met je team, familie of vrienden in Utrecht? Wij regelen de banen en de rest van de dag, met eten en borrel. Prijs op aanvraag.',
    titel: 'Bowlen met je groep',
    label: 'Op aanvraag',
    intro:
      'Bowlen is een klassieker voor een reden: iedereen kan meedoen en het is binnen, dus het weer doet er niet toe. Wij regelen de banen voor je groep en zetten er eten en een borrel omheen.',
    watWeRegelen: [
      'Bowlingbanen voor je hele groep',
      'Eten en drinken tijdens of na het bowlen',
      'Eén contactpersoon en één factuur voor de hele dag',
    ],
    combineer: [
      { slug: 'groepslunch', naam: 'Groepslunch' },
      { slug: 'borrel', naam: 'Afsluitende borrel' },
    ],
    faq: [PRIJS_FAQ],
    kleur: 'vlam',
  },
  {
    slug: 'padel-utrecht',
    metaTitel: 'Padel in Utrecht met je groep',
    metaOmschrijving:
      'Padel met je team of vrienden in Utrecht? Wij regelen de banen, eventueel met clinic, en de rest van de dag. Prijs op aanvraag.',
    titel: 'Padel met je groep',
    label: 'Op aanvraag',
    intro:
      'Padel is snel te leren en daardoor ideaal voor een groep met verschillende niveaus. Wij regelen de banen, desgewenst met een clinic, en maken er een dag van.',
    watWeRegelen: [
      'Padelbanen voor je groep, eventueel met een clinic',
      'Lunch of een borrel na afloop',
      'Eén contactpersoon en één factuur voor de hele dag',
    ],
    combineer: [
      { slug: 'groepslunch', naam: 'Groepslunch' },
      { slug: 'borrel', naam: 'Afsluitende borrel' },
    ],
    faq: [PRIJS_FAQ],
    kleur: 'zee',
  },
  {
    slug: 'kaasproeverij-utrecht',
    metaTitel: 'Kaasproeverij in Utrecht met je groep',
    metaOmschrijving:
      'Een kaasproeverij met je team, familie of vrienden in Utrecht? Wij regelen de proeverij en de rest van de dag. Prijs op aanvraag.',
    titel: 'Kaasproeverij met je groep',
    label: 'Op aanvraag',
    intro:
      'Proeven, vergelijken en het verhaal achter de kaas horen: een kaasproeverij is een gezellige afsluiter of een mooie lunch voor je groep. Wij regelen de proeverij en zetten er een dag omheen.',
    watWeRegelen: [
      'Een kaasproeverij voor je groep, met uitleg',
      'Een activiteit ervoor, zoals jeu de boules of een city challenge',
      'Eén contactpersoon en één factuur voor de hele dag',
    ],
    combineer: [
      { slug: 'jeu-de-boules', naam: 'Jeu de boules met bites' },
      { slug: 'city-challenge', naam: 'City Challenge door de binnenstad' },
      { slug: 'borrel', naam: 'Afsluitende borrel' },
    ],
    faq: [PRIJS_FAQ],
    foto: fotos.borrel,
    kleur: 'zon',
  },
];

export function vindOpAanvraag(slug: string) {
  return OP_AANVRAAG.find((o) => o.slug === slug);
}

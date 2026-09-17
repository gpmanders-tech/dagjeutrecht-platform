/**
 * Alle foto's staan in `public/fotos/`.
 * Eigen beeld komt van dagjesuppen.nl; een paar foto's komen van Wikimedia Commons
 * (zie FOTO_BRONNEN, die staan ook op /fotobronnen).
 */
export type Foto = { src: string; alt: string };

const f = (naam: string, alt: string): Foto => ({ src: `/fotos/${naam}.jpg`, alt });

export const fotos = {
  heroAchtergrond: f('hero-achtergrond', ''),
  supGroep: f('suppen-utrecht-groep-gracht', 'Groep op supboards op een Utrechtse gracht'),
  supOudegracht: f('suppen-utrecht-oudegracht', 'Suppen in de zon op de gracht in Utrecht'),
  supVrijgezellen: f('suppen-vrijgezellen-utrecht', 'Vriendinnen op supboards bij een fontein in Utrecht'),
  supRood: f('suppen-kromme-rijn-rode-boards', 'Suppers met rode boards aan de waterkant'),
  supAvond: f('sup-utrecht-avond', 'Supper op het water bij zonsondergang'),
  kanoBrug: f('kanoen-utrecht-onder-brug', 'Kano’s en supboards op de Oudegracht bij een brug'),
  kanoDuo: f('kanoen-utrecht-duo', 'Twee personen in een groene kano op de gracht'),
  kanoGracht: f('kanoen-utrecht-gracht', 'Kano’s varen onder een oude brug door'),
  kanoAmelisweerd: f('kanoen-amelisweerd', 'Kano’s op het water tussen het groen'),
  kickbikeDomkerk: f('kickbike-utrecht-domkerk', 'Kickbike voor de Domkerk in Utrecht'),
  kickbikeGracht: f('kickbike-utrecht-gracht', 'Steppen op een kickbike langs de gracht'),
  kickbikePark: f('kickbike-utrecht-park', 'Kickbike langs het water in een Utrechts park'),
  kickbikePoort: f('kickbike-utrecht-poort', 'Kickbike door een oude poort in Utrecht'),
  picknick: f('picknick-groep-utrecht', 'Groep aan een gedekte picknicktafel in het gras'),
  domtoren: f('domtoren-utrecht', 'De Domtoren boven de huizen van Utrecht'),
  rondvaart: f('rondvaart-oudegracht-bootjes', 'Bootjes op de Oudegracht in Utrecht'),
  oudegrachtDom: f('oudegracht-terrassen-domtoren', 'Terrassen aan de Oudegracht met de Domtoren'),
  terrassen: f('terrassen-winkel-van-sinkel', 'Terrassen aan de Oudegracht bij de Winkel van Sinkel'),
  koffieTerras: f('koffie-terras-utrecht', 'Terras van een café in Utrecht'),
  borrel: f('borrel-bier', 'Glazen bier op de bar'),
  krommeRijn: f('kromme-rijn-amelisweerd', 'De Kromme Rijn door het groen van Amelisweerd'),
  grachtAvond: f('oudegracht-avond', 'De Oudegracht in de avond'),
  boules: f('jeu-de-boules-ballen', 'Jeu de boules-ballen en het doelballetje'),
  boulesSpelers: f('jeu-de-boules-spelers', 'Spelers tijdens een potje jeu de boules'),
  shuffleboard: f('shuffleboard', 'Schijven op een shuffleboardbaan'),
  bbq: f('bbq-grill', 'Worstjes en vlees op de barbecue'),
  koffie: f('koffie-en-gebak', 'Koffie met een punt taart'),
} satisfies Record<string, Foto>;

export const FOTO_PER_BOUWSTEEN: Record<string, Foto> = {
  'koffie-met-gebak': fotos.koffie,
  'jeu-de-boules': fotos.boules,
  shuffleboard: fotos.shuffleboard,
  domtoren: fotos.domtoren,
  rondvaart: fotos.rondvaart,
  groepslunch: fotos.terrassen,
  borrel: fotos.borrel,
  kanoen: fotos.kanoDuo,
  suppen: fotos.supGroep,
  picknick: fotos.picknick,
  bbq: fotos.bbq,
  'kickbike-tocht': fotos.kickbikeDomkerk,
};

export const FOTO_PER_PAKKET: Record<string, Foto> = {
  'amelisweerd-actief': fotos.kanoBrug,
  'spel-en-borrel': fotos.boulesSpelers,
  'water-naar-borrel': fotos.supVrijgezellen,
  schooluitje: fotos.oudegrachtDom,
};

export function fotoVoorBouwsteen(slug: string) {
  return FOTO_PER_BOUWSTEEN[slug] ?? fotos.oudegrachtDom;
}

export function fotoVoorPakket(slug: string) {
  return FOTO_PER_PAKKET[slug] ?? fotos.supGroep;
}

export const FOTO_BRONNEN = [
  {
    foto: fotos.boules,
    maker: 'Nicholas Babaian',
    licentie: 'CC BY-SA 2.0',
    bron: 'https://commons.wikimedia.org/wiki/File:Bouchon_et_boules_P%C3%A9tanque_Angleterre.jpg',
  },
  {
    foto: fotos.boulesSpelers,
    maker: 'NorbertNagel',
    licentie: 'CC BY-SA 4.0',
    bron: 'https://commons.wikimedia.org/wiki/File:Boule_Stadtmeisterschaft_2026_-_M%C3%B6rfelden-Walldorf-02.jpg',
  },
  {
    foto: fotos.shuffleboard,
    maker: 'Bernarbb',
    licentie: 'CC BY-SA 4.0',
    bron: 'https://commons.wikimedia.org/wiki/File:Shuffleboard_detalhe.jpg',
  },
  {
    foto: fotos.bbq,
    maker: 'Declan Rex',
    licentie: 'CC0',
    bron: 'https://commons.wikimedia.org/wiki/File:Grill_Out_(Unsplash).jpg',
  },
  {
    foto: fotos.koffie,
    maker: 'Bahnfrend',
    licentie: 'CC BY-SA 4.0',
    bron: 'https://commons.wikimedia.org/wiki/File:Caf%C3%A9_Mozart,_2019_(01).jpg',
  },
];

/**
 * Alle foto's staan in `public/fotos/`.
 * Eigen beeld komt van dagjesuppen.nl; een paar foto's komen van Wikimedia Commons
 * (zie FOTO_BRONNEN, die staan ook op /fotobronnen). De bestanden die met `sfeer-`
 * beginnen zijn sfeerbeelden, gemaakt met Canva (DAG-01, oktober 2026): geen foto's
 * van een echte groep of een echte dag. Dat staat ook op /fotobronnen.
 */
export type Foto = { src: string; alt: string };

const f = (naam: string, alt: string): Foto => ({ src: `/fotos/${naam}.jpg`, alt });
/** Sfeerbeeld (Canva), als webp. */
const sfeer = (naam: string, alt: string): Foto => ({ src: `/fotos/sfeer-${naam}.webp`, alt });

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
  gluhwein: f('gluhwein', 'Dampende glühwein in glazen mokken'),
  chocomel: f('warme-chocolademelk', 'Warme chocolademelk met slagroom'),
  stamppot: f('stamppot-boerenkool', 'Boerenkoolstamppot met rookworst'),
  erwtensoep: f('erwtensoep', 'Erwtensoep met roggebrood en spek'),
  winterUtrecht: f('utrecht-winter-sneeuw', 'De Kromme Rijn in Utrecht met sneeuw'),
  boulesBinnen: f('jeu-de-boules-binnen', 'Groep speelt jeu de boules binnen in een hal met lampjes'),
  domtorenKlok: f('domtoren-klok-binnen', 'Een van de grote klokken binnen in de Domtoren'),
  // Foto's van Rederij Schuttevaer (zie /fotobronnen); dezelfde staan in rondvaarten.ts
  schuttevaerFluisterboot: f('schuttevaer-fluisterboot', 'Rondvaartboot op een groene singel in Utrecht'),
  schuttevaerSloep: f('schuttevaer-sloep', 'Open sloep op de Oudegracht met de Domtoren op de achtergrond'),
  schuttevaerCatharijnesingel: f('schuttevaer-catharijnesingel', 'De Catharijnesingel in Utrecht met de kerk van Bunk Hotel'),
  schuttevaerRondvaartboot: f('schuttevaer-rondvaartboot-gracht', 'Rondvaartboot van Schuttevaer op de gracht in de zon'),
  sfeerCollegasTerras: sfeer('collegas-terras-oudegracht', 'Collega’s proosten op een werfterras aan de Oudegracht, met de Domtoren'),
  sfeerTeamBoules: sfeer('team-jeu-de-boules-binnen', 'Een team speelt binnen jeu de boules onder lichtslingers'),
} satisfies Record<string, Foto>;

/**
 * Foto bij een blogartikel. De artikelen in de database hadden tijdelijke beelden van
 * loremflickr.com, die vaak een fout gaven (DAG-01). Een eigen foto uit public/fotos
 * wint altijd; anders kiezen we per artikel een foto die erbij past.
 */
const FOTO_PER_BLOG: Record<string, Foto> = {
  'bedrijfsuitje-utrecht-10-beste-opties': fotos.sfeerCollegasTerras,
  'teamuitje-ideeen-utrecht': fotos.sfeerTeamBoules,
  'vrijgezellenfeest-utrecht-ideeen': fotos.supVrijgezellen,
  'schoolreis-utrecht-educatief-veilig': fotos.domtoren,
  'wat-te-doen-utrecht-groep-gids': fotos.oudegrachtDom,
};

export function fotoVoorBlog(post: { slug: string; title: string; heroImage?: string | null }): Foto {
  if (post.heroImage?.startsWith('/fotos/')) return { src: post.heroImage, alt: post.title };
  return FOTO_PER_BLOG[post.slug] ?? fotos.oudegrachtDom;
}

export const FOTO_PER_BOUWSTEEN: Record<string, Foto> = {
  'koffie-met-gebak': fotos.koffie,
  gluhwein: fotos.gluhwein,
  winterlunch: fotos.terrassen, // 16-10-2026: was erwtensoep; zelfde foto als groepslunch
  'jeu-de-boules': fotos.boulesBinnen,
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
  'warme-winterdag': fotos.gluhwein,
  'amelisweerd-actief': fotos.kanoBrug,
  'spel-en-borrel': fotos.boulesSpelers,
  'water-naar-borrel': fotos.supVrijgezellen,
  schooluitje: fotos.oudegrachtDom,
  // Oktober 2026: deze pakketten vielen terug op de supfoto, ook de winter- en rondvaartpakketten.
  'winter-op-de-grachten': fotos.rondvaart,
  'dom-en-grachten': fotos.domtoren,
  'schoolreis-basisschool': fotos.schuttevaerRondvaartboot,
  winterborrel: fotos.boulesBinnen,
  'vrijgezellen-winterdag': fotos.shuffleboard,
  'boules-en-borrel': fotos.boules,
  'koffie-en-city-challenge': fotos.koffieTerras,
  'water-en-picknick': fotos.picknick,
};

/** In de winter geen zomerse buitenfoto's: binnen, bij de klok of aan de borrel. */
const FOTO_WINTER: Record<string, Foto> = {
  domtoren: fotos.domtorenKlok,
};

export function fotoVoorBouwsteen(slug: string, seizoen?: string) {
  if (seizoen === 'winter' && FOTO_WINTER[slug]) return FOTO_WINTER[slug];
  return FOTO_PER_BOUWSTEEN[slug] ?? fotos.oudegrachtDom;
}

export function fotoVoorPakket(slug: string) {
  return FOTO_PER_PAKKET[slug] ?? fotos.supGroep;
}

export const FOTO_BRONNEN = [
  {
    foto: fotos.boulesBinnen,
    maker: 'Brunobuisson',
    licentie: 'CC BY-SA 4.0',
    bron: 'https://commons.wikimedia.org/wiki/File:P%C3%A9tanque_being_played_indoor_in_Rotterdam..jpg',
  },
  {
    foto: fotos.domtorenKlok,
    maker: 'Pepijntje',
    licentie: 'CC BY-SA 3.0',
    bron: 'https://commons.wikimedia.org/wiki/File:Martinus_1.JPG',
  },
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
  {
    foto: fotos.gluhwein,
    maker: 'Basotxerri',
    licentie: 'CC BY-SA 4.0',
    bron: 'https://commons.wikimedia.org/wiki/File:Gl%C3%BChwein_Weinnachtsmarkt_OS.JPG',
  },
  {
    foto: fotos.chocomel,
    maker: 'Personal Creations',
    licentie: 'CC BY 2.0',
    bron: 'https://commons.wikimedia.org/wiki/File:Hot_cocoa_in_a_mug_with_a_hand_sprinkling_chili_pepper_flakes_onto_the_whipped_cream_(15852162626).jpg',
  },
  {
    foto: fotos.winterUtrecht,
    maker: 'Jip de Kort',
    licentie: 'CC BY-SA 3.0',
    bron: 'https://commons.wikimedia.org/wiki/File:Krommerijn_met_sneeuw_-_panoramio.jpg',
  },
];

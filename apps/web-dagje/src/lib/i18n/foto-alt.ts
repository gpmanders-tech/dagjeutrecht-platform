/**
 * Alt-teksten van de foto's in het Engels en Duits, op bestandsnaam. Een foto die
 * hier ontbreekt houdt zijn Nederlandse alt-tekst.
 */
import type { Foto } from '../fotos';
import type { Vertaald } from '../talen';

const ALT: Record<string, Record<Vertaald, string>> = {
  'suppen-utrecht-groep-gracht': {
    en: 'Group on SUP boards on a canal in Utrecht',
    de: 'Gruppe auf SUP-Boards auf einer Gracht in Utrecht',
  },
  'suppen-utrecht-oudegracht': {
    en: 'Stand-up paddling in the sun on the canal in Utrecht',
    de: 'Stand-up-Paddling in der Sonne auf der Gracht in Utrecht',
  },
  'suppen-vrijgezellen-utrecht': {
    en: 'Friends on SUP boards by a fountain in Utrecht',
    de: 'Freundinnen auf SUP-Boards an einem Springbrunnen in Utrecht',
  },
  'suppen-kromme-rijn-rode-boards': {
    en: 'Paddlers with red boards at the water’s edge',
    de: 'Paddler mit roten Boards am Ufer',
  },
  'sup-utrecht-avond': {
    en: 'Paddler on the water at sunset',
    de: 'Paddler auf dem Wasser bei Sonnenuntergang',
  },
  'kanoen-utrecht-onder-brug': {
    en: 'Canoes and SUP boards on the Oudegracht by a bridge',
    de: 'Kanus und SUP-Boards auf der Oudegracht an einer Brücke',
  },
  'kanoen-utrecht-duo': {
    en: 'Two people in a green canoe on the canal',
    de: 'Zwei Personen in einem grünen Kanu auf der Gracht',
  },
  'kanoen-utrecht-gracht': {
    en: 'Canoes passing under an old bridge',
    de: 'Kanus fahren unter einer alten Brücke hindurch',
  },
  'kanoen-amelisweerd': {
    en: 'Canoes on the water surrounded by green',
    de: 'Kanus auf dem Wasser im Grünen',
  },
  'kickbike-utrecht-domkerk': {
    en: 'Kickbike in front of the Dom church in Utrecht',
    de: 'Kickbike vor dem Dom in Utrecht',
  },
  'kickbike-utrecht-gracht': {
    en: 'Riding a kickbike along the canal',
    de: 'Mit dem Kickbike an der Gracht entlang',
  },
  'kickbike-utrecht-park': {
    en: 'Kickbike by the water in a Utrecht park',
    de: 'Kickbike am Wasser in einem Park in Utrecht',
  },
  'kickbike-utrecht-poort': {
    en: 'Kickbike passing through an old gate in Utrecht',
    de: 'Kickbike in einem alten Tor in Utrecht',
  },
  'picknick-groep-utrecht': {
    en: 'Group at a laid picnic table on the grass',
    de: 'Gruppe an einem gedeckten Picknicktisch im Gras',
  },
  'domtoren-utrecht': {
    en: 'The Dom Tower above the houses of Utrecht',
    de: 'Der Domturm über den Häusern von Utrecht',
  },
  'rondvaart-oudegracht-bootjes': {
    en: 'Boats on the Oudegracht in Utrecht',
    de: 'Boote auf der Oudegracht in Utrecht',
  },
  'oudegracht-terrassen-domtoren': {
    en: 'Terraces along the Oudegracht with the Dom Tower',
    de: 'Terrassen an der Oudegracht mit dem Domturm',
  },
  'terrassen-winkel-van-sinkel': {
    en: 'Terraces along the Oudegracht at the Winkel van Sinkel',
    de: 'Terrassen an der Oudegracht beim Winkel van Sinkel',
  },
  'koffie-terras-utrecht': { en: 'Café terrace in Utrecht', de: 'Café-Terrasse in Utrecht' },
  'borrel-bier': { en: 'Glasses of beer on the bar', de: 'Biergläser auf der Theke' },
  'kromme-rijn-amelisweerd': {
    en: 'The Kromme Rijn river through the green of Amelisweerd',
    de: 'Die Kromme Rijn im Grünen von Amelisweerd',
  },
  'oudegracht-avond': { en: 'The Oudegracht in the evening', de: 'Die Oudegracht am Abend' },
  'jeu-de-boules-ballen': { en: 'Boules balls and the jack', de: 'Boulekugeln und die Zielkugel' },
  'jeu-de-boules-spelers': {
    en: 'Players during a game of boules',
    de: 'Spieler bei einer Partie Boule',
  },
  shuffleboard: { en: 'Pucks on a shuffleboard court', de: 'Scheiben auf einer Shuffleboard-Bahn' },
  'bbq-grill': {
    en: 'Sausages and meat on the barbecue',
    de: 'Würstchen und Fleisch auf dem Grill',
  },
  'koffie-en-gebak': { en: 'Coffee with a slice of cake', de: 'Kaffee mit einem Stück Kuchen' },
  gluhwein: { en: 'Steaming mulled wine in glass mugs', de: 'Dampfender Glühwein in Glasbechern' },
  'warme-chocolademelk': {
    en: 'Hot chocolate with whipped cream',
    de: 'Heiße Schokolade mit Sahne',
  },
  'stamppot-boerenkool': {
    en: 'Kale stamppot with smoked sausage',
    de: 'Grünkohl-Stamppot mit Rauchwurst',
  },
  erwtensoep: {
    en: 'Dutch pea soup with rye bread and bacon',
    de: 'Niederländische Erbsensuppe mit Roggenbrot und Speck',
  },
  'utrecht-winter-sneeuw': {
    en: 'The Kromme Rijn in Utrecht with snow',
    de: 'Die Kromme Rijn in Utrecht mit Schnee',
  },
  'jeu-de-boules-binnen': {
    en: 'Group playing boules indoors in a hall with fairy lights',
    de: 'Gruppe spielt Boule in einer Halle mit Lichterketten',
  },
  'domtoren-klok-binnen': {
    en: 'One of the large bells inside the Dom Tower',
    de: 'Eine der großen Glocken im Domturm',
  },
};

/** De foto met de alt-tekst in de gevraagde taal. */
export function fotoIn(taal: Vertaald, foto: Foto): Foto {
  const naam = foto.src.replace(/^\/fotos\//, '').replace(/\.jpg$/, '');
  const alt = foto.alt ? (ALT[naam]?.[taal] ?? foto.alt) : foto.alt;
  return { src: foto.src, alt };
}

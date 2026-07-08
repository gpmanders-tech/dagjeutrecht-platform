/**
 * Sfeerfoto's voor de homepage-hero.
 * Volgorde: Domtoren -> Oude Gracht -> druk terras -> jeu de boules -> aanrijdende touringcar.
 *
 * loremflickr = stabiele CC-BY Flickr foto's per keyword; lock houdt de foto vast.
 * Later te vervangen door eigen fotografie via admin.
 */

export const HERO_PHOTOS: Array<{ src: string; alt: string; caption: string }> = [
  {
    src: 'https://loremflickr.com/1600/900/domtoren,utrecht/all?lock=domtoren1',
    alt: 'Domtoren Utrecht',
    caption: 'De Domtoren in beeld',
  },
  {
    src: 'https://loremflickr.com/1600/900/oudegracht,utrecht,canal/all?lock=oude1',
    alt: 'Oude Gracht Utrecht',
    caption: 'Langs de Oude Gracht',
  },
  {
    src: 'https://loremflickr.com/1600/900/terrace,restaurant,people/all?lock=terras1',
    alt: 'Druk terras',
    caption: 'Terras aan de kade',
  },
  {
    src: 'https://loremflickr.com/1600/900/petanque,friends,fun/all?lock=jeu1',
    alt: 'Jeu de boules met vrienden',
    caption: 'Jeu de boules en borrel',
  },
  {
    src: 'https://loremflickr.com/1600/900/touringcar,kinderdijk,windmill?lock=bus2',
    alt: 'Nederlandse touringcar langs Kinderdijk',
    caption: 'Bus geregeld voor de groep',
  },
];

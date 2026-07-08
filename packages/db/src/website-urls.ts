/**
 * Bekende websites per leverancier-slug — gebruikt door scrape-images.ts
 * om og:image's op te halen. Slug -> URL.
 */
export const WEBSITE_URLS: Record<string, string> = {
  // Musea & Attracties
  'domtoren': 'https://www.domtoren.nl',
  'domunder': 'https://www.domunder.nl',
  'museum-speelklok': 'https://www.museumspeelklok.nl',
  'centraal-museum': 'https://www.centraalmuseum.nl',
  'kasteel-de-haar': 'https://www.kasteeldehaar.nl',
  'spoorwegmuseum': 'https://www.spoorwegmuseum.nl',
  'rietveld-schroderhuis': 'https://www.rietveldschroderhuis.nl',
  'miffy-museum': 'https://www.nijntjemuseum.nl',
  'domkerk': 'https://www.domkerk.nl',

  // Indoor
  'ping-pong-club': 'https://www.thepingpongclub.nl',
  'jeu-de-boules-bar': 'https://www.jeudeboulesbar.nl',
  'boules-club-oudegracht': 'https://www.theboulesclub.nl',
  'grand-shuffle': 'https://www.thegrandshuffle.com',
  'mooie-boules': 'https://www.mooieboules.nl',
  'doloris-anoma-maze': 'https://www.doloris.nl',
  'queen-escape-room': 'https://www.thequeenescaperoom.nl',
  'live-escape': 'https://www.liveescape.nl',
  'prison-escape': 'https://www.prisonescape.nl',
  'escape-world': 'https://www.escapeworld.nl',
  'climbing-wall-utrecht': 'https://www.climbingwallutrecht.nl',

  // Workshops
  'grachtenatelier-schilderen': 'https://www.grachtenatelier.nl',
  'house-of-clay': 'https://www.houseofclay.nl',
  'chopsticks-los': 'https://www.chopsticksutrecht.nl',
  'kookfabriek': 'https://www.kookfabriek.nl',
  'beer-pioneer': 'https://www.beerpioneer.nl',

  // Water
  'dagjesuppen': 'https://www.dagjesuppen.nl',
  'kayak-utrecht': 'https://www.kayakutrecht.nl',
  'suppen-kromme-rijn': 'https://www.suppenkrommerijn.nl',
  'sup-sup-club': 'https://www.supsupclub.nl',
  'schuttevaer': 'https://www.schuttevaer.com',
  'utrecht-canal-cruises': 'https://www.utrechtcanalcruises.com',
  'kleine-kapitein': 'https://www.dekleinekapitein.nl',
  'grachtenvaarders': 'https://www.grachtenvaarders.nl',

  // Tours
  'free-walking-tour': 'https://freewalkingtourutrecht.com',
  'utours': 'https://www.utours.nl',
  'color-bike': 'https://www.colorbike.nl',
  'craft-beer-tours': 'https://www.craftbeertoursutrecht.com',
  'utrecht-food-tour': 'https://www.utrechtfoodtour.nl',

  // Hotels
  'the-nox': 'https://www.thenox.nl',
  'brass': 'https://www.brashotel.nl',
  'inntel': 'https://www.inntelhotelsutrechtcentre.nl',
  'crowne-plaza': 'https://www.cputrecht.nl',
  'nh-utrecht': 'https://www.nh-hotels.nl/hotel/nh-utrecht',
  'van-der-valk': 'https://www.hotelutrecht.com',
  'carlton-president': 'https://www.carlton.nl/president',
  'hampton-by-hilton': 'https://www.hilton.com/en/hotels/utrhxhx-hampton-utrecht',
  'mitland': 'https://www.mitland.nl',
  'stayokay-utrecht': 'https://www.stayokay.com/nl/hostel/utrecht-centrum',
  'bunk-utrecht': 'https://www.bunkhotels.com/utrecht',
  'strowis': 'https://www.strowis.nl',

  // Restaurants
  'hemel-en-aarde': 'https://www.hemelenaardeutrecht.nl',
  'maeve': 'https://www.restaurantmaeve.nl',
  'water-tower-wt': 'https://watertowerwt.com',
  'kasteel-heemstede': 'https://www.kasteelheemstede.com',
  'silk-road': 'https://www.silkroad-utrecht.nl',
  'ruby-rose': 'https://www.rubyroseutrecht.nl',
  'biercafe-olivier': 'https://www.cafe-olivier.be/utrecht',
  'broadway-steakhouse': 'https://www.broadwayutrecht.nl',
  'beers-barrels': 'https://www.beersandbarrels.nl',
  'streetfood-club': 'https://www.thestreetfoodclub.nl',
  'graaf-floris': 'https://www.graaffloris.com',
  'humphreys': 'https://www.humphreys.nl',
  'theehuis-rhijnauwen': 'https://www.theehuisrhijnauwen.nl',
  'de-kromme-haring': 'https://www.dekrommeharing.nl',
  'vandestreek-taproom': 'https://www.vandestreekbier.nl',

  // Events
  'tivoli-vredenburg': 'https://www.tivolivredenburg.nl',
  'beatrix-theater': 'https://www.beatrixtheater.nl',
  'stadsschouwburg': 'https://www.stadsschouwburg-utrecht.nl',
  'de-helling': 'https://www.dehelling.nl',
  'ekko': 'https://www.ekko.nl',
  'louis-hartlooper': 'https://www.hartlooper.nl',

  // Wellness
  'city-spa': 'https://www.cityspa.nl',
  'thermen-maarssen': 'https://www.thermenmaarssen.nl',
  'thermen-soesterberg': 'https://www.thermensoesterberg.nl',
  'amara': 'https://www.amaraprivespa.nl',
};

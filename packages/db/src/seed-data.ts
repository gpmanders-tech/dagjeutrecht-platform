import { Category, BookingChannel, FulfilmentType } from '@prisma/client';

type SeedProvider = {
  slug: string;
  name: string;
  category: Category;
  channel: BookingChannel;
  priceCents?: number;          // inkoop
  bookable?: boolean;           // false = TIP
  vatRate?: number;             // 0.09 entertainment/food/hotel, 0.21 diensten
  modifyDeadlineHours?: number;
  canChangeTime?: boolean;
  canChangeCount?: boolean;
  maxParticipants?: number;
  durationMinutes?: number;
  rating?: number;
  ratingCount?: number;
  websiteUrl?: string;
  descriptionNL?: string;
  fulfilment?: FulfilmentType;
};

const TM = BookingChannel.TICKETMASTER;
const VI = BookingChannel.VIATOR;
const GYG = BookingChannel.GETYOURGUIDE;
const FH = BookingChannel.FAREHARBOR;
const BK = BookingChannel.BOOKING;
const TF = BookingChannel.THEFORK;
const D = BookingChannel.DIRECT;

// 9% BTW voor entertainment/food/hotel, 21% voor diensten/workshops
const V09 = 0.09;
const V21 = 0.21;

export const providers: SeedProvider[] = [
  // ============== Musea & Attracties ==============
  { slug: 'domtoren', name: 'Domtoren', category: Category.ATTRACTION, channel: TM, priceCents: 1400, vatRate: V09, modifyDeadlineHours: 48, canChangeCount: false },
  { slug: 'domunder', name: 'DOMunder', category: Category.MUSEUM, channel: GYG, priceCents: 1250, vatRate: V09, modifyDeadlineHours: 24 },
  { slug: 'museum-speelklok', name: 'Museum Speelklok', category: Category.MUSEUM, channel: VI, priceCents: 1600, vatRate: V09, modifyDeadlineHours: 24 },
  { slug: 'centraal-museum', name: 'Centraal Museum', category: Category.MUSEUM, channel: D, priceCents: 1500, vatRate: V09 },
  { slug: 'kasteel-de-haar', name: 'Kasteel de Haar', category: Category.ATTRACTION, channel: VI, priceCents: 1800, vatRate: V09, modifyDeadlineHours: 24 },
  { slug: 'spoorwegmuseum', name: 'Spoorwegmuseum', category: Category.MUSEUM, channel: TM, priceCents: 2000, vatRate: V09, modifyDeadlineHours: 48, canChangeCount: false },
  { slug: 'rietveld-schroderhuis', name: 'Rietveld Schröderhuis', category: Category.MUSEUM, channel: D, priceCents: 1800, vatRate: V09 },
  { slug: 'miffy-museum', name: 'Miffy Museum', category: Category.MUSEUM, channel: D, priceCents: 1000, vatRate: V09 },
  { slug: 'domkerk', name: 'Domkerk', category: Category.ATTRACTION, channel: D, bookable: false, websiteUrl: 'https://www.domkerk.nl' },
  { slug: 'wax-figures-museum', name: 'Wax Figures Museum', category: Category.MUSEUM, channel: D, bookable: false },

  // ============== Indoor / Winter ==============
  { slug: 'ping-pong-club', name: 'The Ping Pong Club', category: Category.INDOOR, channel: D, priceCents: 1000, maxParticipants: 80 },
  { slug: 'jeu-de-boules-bar', name: 'JEU de Boules Bar', category: Category.INDOOR, channel: D, priceCents: 1200, maxParticipants: 60 },
  { slug: 'boules-club-oudegracht', name: 'The Boules Club Oudegracht', category: Category.INDOOR, channel: D, priceCents: 2800, vatRate: V09 },
  { slug: 'grand-shuffle', name: 'The Grand Shuffle', category: Category.INDOOR, channel: D, priceCents: 2200 },
  { slug: 'mooie-boules', name: 'Mooie Boules', category: Category.INDOOR, channel: D, priceCents: 1500, maxParticipants: 100 },
  { slug: 'doloris-anoma-maze', name: 'Doloris Anoma Maze', category: Category.ATTRACTION, channel: D, priceCents: 1600, vatRate: V09 },
  { slug: 'queen-escape-room', name: 'The Queen Escape Room', category: Category.INDOOR, channel: D, priceCents: 2000, rating: 4.9 },
  { slug: 'live-escape', name: 'Live Escape', category: Category.INDOOR, channel: D, priceCents: 1900 },
  { slug: 'mysterium', name: 'Mysterium', category: Category.INDOOR, channel: D, priceCents: 2000 },
  { slug: 'prison-escape', name: 'Prison Escape', category: Category.INDOOR, channel: D, priceCents: 4500 },
  { slug: 'escape-world', name: 'Escape World', category: Category.INDOOR, channel: D, priceCents: 2000 },
  { slug: 'team-building', name: 'The Team Building', category: Category.INDOOR, channel: D, priceCents: 2500 },
  { slug: 'boulderhal-energiehaven', name: 'Boulderhal Energiehaven', category: Category.INDOOR, channel: D, priceCents: 1200 },
  { slug: 'boulderhal-zuidhaven', name: 'Boulderhal Zuidhaven', category: Category.INDOOR, channel: D, priceCents: 1200 },
  { slug: 'boulderhal-sterk-spoor', name: 'Boulderhal Sterk Spoor', category: Category.INDOOR, channel: D, priceCents: 1200 },
  { slug: 'climbing-wall-utrecht', name: 'Climbing Wall Utrecht', category: Category.INDOOR, channel: D, priceCents: 1400 },

  // ============== Workshops (series) ==============
  { slug: 'keramiek-4-lessen', name: 'Keramiek 4 lessen', category: Category.WORKSHOP_SERIES, channel: D, priceCents: 13000 },
  { slug: 'schilderen-6-lessen', name: 'Schilderen 6 lessen (GrachtenAtelier)', category: Category.WORKSHOP_SERIES, channel: D, priceCents: 17500 },
  { slug: 'bierbrouwen-3-sessies', name: 'Bierbrouwen 3 sessies (De Brakkerij)', category: Category.WORKSHOP_SERIES, channel: D, priceCents: 18500 },
  { slug: 'aziatisch-koken-4-lessen', name: 'Aziatisch koken 4 lessen (Chopsticks)', category: Category.WORKSHOP_SERIES, channel: D, priceCents: 24000 },

  // ============== Losse workshops ==============
  { slug: 'grachtenatelier-schilderen', name: 'GrachtenAtelier schilderen', category: Category.WORKSHOP, channel: D, priceCents: 3500 },
  { slug: 'grachtenatelier-chocolade', name: 'GrachtenAtelier chocolade', category: Category.WORKSHOP, channel: D, priceCents: 2800 },
  { slug: 'house-of-clay', name: 'House of Clay', category: Category.WORKSHOP, channel: D, priceCents: 3800 },
  { slug: 'clay-to-plate', name: 'Clay to Plate', category: Category.WORKSHOP, channel: D, priceCents: 4000 },
  { slug: 'keramiek-kafee', name: 'Keramiek Kafee', category: Category.WORKSHOP, channel: D, priceCents: 3000 },
  { slug: 'chopsticks-los', name: 'Chopsticks losse workshop', category: Category.WORKSHOP, channel: D, priceCents: 6500 },
  { slug: 'trai-vegan', name: 'Trai Vegan workshop', category: Category.WORKSHOP, channel: D, priceCents: 5500 },
  { slug: 'kookfabriek', name: 'Kookfabriek', category: Category.WORKSHOP, channel: D, priceCents: 7000 },
  { slug: 'beer-pioneer', name: 'Beer Pioneer', category: Category.WORKSHOP, channel: D, priceCents: 7500 },
  { slug: 'brakkerij-los', name: 'De Brakkerij losse workshop', category: Category.WORKSHOP, channel: D, priceCents: 6500 },

  // ============== Water (13) ==============
  { slug: 'dagjesuppen', name: 'DagjeSuppen.nl', category: Category.WATER, channel: FH, priceCents: 1950, vatRate: V09, modifyDeadlineHours: 24, durationMinutes: 90, descriptionNL: 'SUP-tocht van 1,5 uur over de Utrechtse grachten. Inclusief board, peddel en instructie - ervaring is niet nodig.' },
  { slug: 'kayak-utrecht', name: 'Kayak Utrecht', category: Category.WATER, channel: D, priceCents: 1700, vatRate: V09, rating: 4.9 },
  { slug: 'sup-en-kanoverhuur', name: 'SUP- en Kanoverhuur', category: Category.WATER, channel: D, priceCents: 1500, vatRate: V09 },
  { slug: 'suppen-kromme-rijn', name: 'Suppen Kromme Rijn', category: Category.WATER, channel: D, priceCents: 2200, vatRate: V09 },
  { slug: 'sup-sup-club', name: 'SUP SUP CLUB', category: Category.WATER, channel: D, priceCents: 2000, vatRate: V09 },
  { slug: 'schuttevaer', name: 'Schuttevaer', category: Category.WATER, channel: GYG, priceCents: 1300, vatRate: V09, modifyDeadlineHours: 24 },
  { slug: 'utrecht-canal-cruises', name: 'Utrecht Canal Cruises', category: Category.WATER, channel: VI, priceCents: 2200, vatRate: V09, modifyDeadlineHours: 24 },
  { slug: 'domstadboot-bbq', name: 'Domstadboot BBQ', category: Category.WATER, channel: D, priceCents: 3500, vatRate: V09 },
  { slug: 'kleine-kapitein', name: 'De Kleine Kapitein', category: Category.WATER, channel: D, priceCents: 2800, vatRate: V09, rating: 5.0 },
  { slug: 'grachtenvaarders', name: 'Grachtenvaarders', category: Category.WATER, channel: D, priceCents: 4000, vatRate: V09 },
  { slug: 'varen-in-utrecht', name: 'Varen in Utrecht', category: Category.WATER, channel: VI, priceCents: 1400, vatRate: V09 },
  { slug: 'canal-cruising', name: 'Canal Cruising', category: Category.WATER, channel: D, priceCents: 2500, vatRate: V09 },
  { slug: 'stromma-peddelboot', name: 'Stromma Peddelboot', category: Category.WATER, channel: D, priceCents: 900, vatRate: V09 },

  // ============== Tours (7) ==============
  { slug: 'free-walking-tour', name: 'Free Walking Tour Utrecht', category: Category.TOUR, channel: VI, priceCents: 0 },
  { slug: 'local-tour-utrecht', name: 'Local Tour Utrecht', category: Category.TOUR, channel: D, priceCents: 1500 },
  { slug: 'utours', name: 'Utours', category: Category.TOUR, channel: VI, priceCents: 2500 },
  { slug: 'color-bike', name: 'Color Bike', category: Category.TOUR, channel: D, priceCents: 2200 },
  { slug: 'craft-beer-tours', name: 'Craft Beer Tours', category: Category.TOUR, channel: D, priceCents: 3500 },
  { slug: 'william-street-bike', name: 'William Street Bike verhuur', category: Category.TOUR, channel: D, priceCents: 1000 },
  { slug: 'utrecht-food-tour', name: 'Utrecht Food Tour', category: Category.TOUR, channel: VI, priceCents: 4000 },

  // ============== Hotels (18) — Booking ==============
  { slug: 'the-nox', name: 'The Nox', category: Category.HOTEL, channel: BK, priceCents: 9500, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'brass', name: 'Brass', category: Category.HOTEL, channel: BK, priceCents: 8900, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'hotel-beijers', name: 'Hotel Beijers', category: Category.HOTEL, channel: BK, priceCents: 8500, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'petit-beijers', name: 'Petit Beijers', category: Category.HOTEL, channel: BK, priceCents: 7900, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'anne-max', name: 'Anne&Max', category: Category.HOTEL, channel: BK, priceCents: 9900, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'cozy-pillow', name: 'Cozy Pillow', category: Category.HOTEL, channel: BK, priceCents: 6900, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'court-hotel', name: 'Court Hotel', category: Category.HOTEL, channel: BK, priceCents: 7500, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'inntel', name: 'Inntel Hotels Utrecht Centre', category: Category.HOTEL, channel: BK, priceCents: 13000, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'crowne-plaza', name: 'Crowne Plaza Utrecht', category: Category.HOTEL, channel: BK, priceCents: 15000, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'nh-utrecht', name: 'NH Utrecht', category: Category.HOTEL, channel: BK, priceCents: 11000, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'van-der-valk', name: 'Van der Valk Utrecht', category: Category.HOTEL, channel: BK, priceCents: 12000, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'carlton-president', name: 'Carlton President', category: Category.HOTEL, channel: BK, priceCents: 9500, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'hampton-by-hilton', name: 'Hampton by Hilton Utrecht', category: Category.HOTEL, channel: BK, priceCents: 10500, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'mitland', name: 'Mitland Hotel', category: Category.HOTEL, channel: BK, priceCents: 8500, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'stayokay-utrecht', name: 'Stayokay Utrecht Centrum', category: Category.HOTEL, channel: BK, priceCents: 3500, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'bunk-utrecht', name: 'Bunk Hotel Utrecht', category: Category.HOTEL, channel: BK, priceCents: 2900, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'strowis', name: 'Strowis', category: Category.HOTEL, channel: BK, priceCents: 2500, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },
  { slug: 'city-center-lodge', name: 'City Center Lodge', category: Category.HOTEL, channel: BK, priceCents: 5500, vatRate: V09, modifyDeadlineHours: 24, canChangeTime: false, canChangeCount: false },

  // ============== Restaurants (24) ==============
  { slug: 'hemel-en-aarde', name: 'Hemel & Aarde', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'maeve', name: 'Maeve', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'water-tower-wt', name: 'Water Tower WT', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'de-goedheyd', name: 'De Goedheyd', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'el-qatarijne', name: 'El Qatarijne', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'pand-33', name: 'Pand 33', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'kasteel-heemstede', name: 'Kasteel Heemstede (Michelin)', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'san-siro', name: 'San Siro', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'silk-road', name: 'Silk Road', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'carmel-market', name: 'Carmel Market', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'ruby-rose', name: 'Ruby Rose', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'biercafe-olivier', name: 'Biercafé Olivier', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'broadway-steakhouse', name: 'Broadway Steakhouse', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'beers-barrels', name: 'Beers & Barrels', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'kartoffel', name: 'Kartoffel', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'streetfood-club', name: 'Streetfood Club', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'graaf-floris', name: 'Graaf Floris', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'orloff', name: 'Orloff', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'humphreys', name: 'Humphrey\'s', category: Category.RESTAURANT, channel: TF, vatRate: V09, modifyDeadlineHours: 24, priceCents: 0 },
  { slug: 'theehuis-rhijnauwen', name: 'Theehuis Rhijnauwen', category: Category.RESTAURANT, channel: D, bookable: false },
  { slug: 'landhuis-in-de-stad', name: 'Landhuis in de Stad', category: Category.RESTAURANT, channel: D, bookable: false },
  { slug: 'buiten-bij-de-sluis', name: 'Buiten bij de Sluis', category: Category.RESTAURANT, channel: D, bookable: false },
  { slug: 'de-kromme-haring', name: 'De Kromme Haring', category: Category.RESTAURANT, channel: D, bookable: false },
  { slug: 'vandestreek-taproom', name: 'vandeStreek Taproom', category: Category.RESTAURANT, channel: D, bookable: false },

  // ============== Events (8) ==============
  { slug: 'tivoli-vredenburg', name: 'TivoliVredenburg', category: Category.EVENT, channel: TM, priceCents: 0, vatRate: V09 },
  { slug: 'beatrix-theater', name: 'Beatrix Theater', category: Category.EVENT, channel: TM, priceCents: 0, vatRate: V09 },
  { slug: 'stadsschouwburg', name: 'Stadsschouwburg Utrecht', category: Category.EVENT, channel: TM, priceCents: 0, vatRate: V09 },
  { slug: 'de-helling', name: 'De Helling', category: Category.EVENT, channel: TM, priceCents: 0, vatRate: V09 },
  { slug: 'ekko', name: 'EKKO', category: Category.EVENT, channel: TM, priceCents: 0, vatRate: V09 },
  { slug: 'louis-hartlooper', name: 'Louis Hartlooper Complex', category: Category.EVENT, channel: D, priceCents: 1100, vatRate: V09 },
  { slug: 'spring-festival', name: 'Spring Festival', category: Category.EVENT, channel: TM, priceCents: 0, vatRate: V09 },
  { slug: 'leidsche-rijn-theater', name: 'Leidsche Rijn Theater', category: Category.EVENT, channel: TM, priceCents: 0, vatRate: V09 },

  // ============== Wellness (7) ==============
  { slug: 'city-spa', name: 'City Spa', category: Category.WELLNESS, channel: D, priceCents: 4500 },
  { slug: 'thermen-maarssen', name: 'Thermen Maarssen', category: Category.WELLNESS, channel: D, priceCents: 4300 },
  { slug: 'hammam-pretoria', name: 'Hammam Pretoria', category: Category.WELLNESS, channel: D, priceCents: 3200 },
  { slug: 'thermen-soesterberg', name: 'Thermen Soesterberg', category: Category.WELLNESS, channel: D, priceCents: 4800 },
  { slug: 'amara', name: 'Amara privé-spa', category: Category.WELLNESS, channel: D, priceCents: 7900 },
  { slug: 'inntel-wellness', name: 'Inntel Wellness', category: Category.WELLNESS, channel: BK, priceCents: 3500, modifyDeadlineHours: 24 },
  { slug: 'hammam-yasmine', name: 'Hammam Yasmine', category: Category.WELLNESS, channel: D, bookable: false },

  // ============== Webshop ==============
  { slug: 'shop-nijntje-knuffel', name: 'Nijntje knuffel', category: Category.SHOP, channel: D, priceCents: 1750, vatRate: V21, fulfilment: FulfilmentType.DROPSHIP },
  { slug: 'shop-nijntje-shirt', name: 'Nijntje Dom-shirt', category: Category.SHOP, channel: D, priceCents: 2200, vatRate: V21, fulfilment: FulfilmentType.DROPSHIP },
  { slug: 'shop-nijntje-ontbijt', name: 'Nijntje ontbijtset', category: Category.SHOP, channel: D, priceCents: 2450, vatRate: V21, fulfilment: FulfilmentType.DROPSHIP },
  { slug: 'shop-domtoren-model', name: 'Domtoren-model', category: Category.SHOP, channel: D, priceCents: 2900, vatRate: V21, fulfilment: FulfilmentType.STOCK },
  { slug: 'shop-utrecht-monopoly', name: 'Utrecht Monopoly', category: Category.SHOP, channel: D, priceCents: 3950, vatRate: V21, fulfilment: FulfilmentType.STOCK },
  { slug: 'shop-utrecht-puzzel', name: 'Utrecht puzzel', category: Category.SHOP, channel: D, priceCents: 1995, vatRate: V21, fulfilment: FulfilmentType.STOCK },
  { slug: 'shop-fcutrecht-shirt', name: 'FC Utrecht thuisshirt', category: Category.SHOP, channel: D, priceCents: 7995, vatRate: V21, fulfilment: FulfilmentType.DROPSHIP },
  { slug: 'shop-fcutrecht-sjaal', name: 'FC Utrecht sjaal', category: Category.SHOP, channel: D, priceCents: 1795, vatRate: V21, fulfilment: FulfilmentType.DROPSHIP },
  { slug: 'shop-bierpakket', name: 'Utrechts bierpakket (Buurtbier)', category: Category.SHOP, channel: D, priceCents: 2150, vatRate: V09, fulfilment: FulfilmentType.DROPSHIP },
  { slug: 'shop-borrelpakket', name: 'Borrelpakket (SchotB. 1885)', category: Category.SHOP, channel: D, priceCents: 3450, vatRate: V09, fulfilment: FulfilmentType.DROPSHIP },
  { slug: 'shop-kerstpakket', name: 'Zakelijk kerstpakket Utrecht (min. 10 st.)', category: Category.SHOP, channel: D, priceCents: 4250, vatRate: V09, fulfilment: FulfilmentType.DROPSHIP },
  { slug: 'shop-stroopwafels', name: 'Stroopwafels Utrechts roggebrood', category: Category.SHOP, channel: D, priceCents: 1295, vatRate: V09, fulfilment: FulfilmentType.STOCK },
  { slug: 'shop-chocolade-dom', name: 'Chocolade-Dom', category: Category.SHOP, channel: D, priceCents: 1495, vatRate: V09, fulfilment: FulfilmentType.STOCK },

  // ============== Cadeaubonnen (geen marge, BTW-vrij bij verkoop) ==============
  { slug: 'gift-25', name: 'Cadeaubon €25', category: Category.GIFTCARD, channel: D, priceCents: 2500, vatRate: 0, fulfilment: FulfilmentType.DIGITAL },
  { slug: 'gift-50', name: 'Cadeaubon €50', category: Category.GIFTCARD, channel: D, priceCents: 5000, vatRate: 0, fulfilment: FulfilmentType.DIGITAL },
  { slug: 'gift-100', name: 'Cadeaubon €100', category: Category.GIFTCARD, channel: D, priceCents: 10000, vatRate: 0, fulfilment: FulfilmentType.DIGITAL },
  { slug: 'gift-belevenisbox', name: 'Belevenisbox Duo Utrecht', category: Category.GIFTCARD, channel: D, priceCents: 8900, vatRate: V09, fulfilment: FulfilmentType.VOUCHER },
];

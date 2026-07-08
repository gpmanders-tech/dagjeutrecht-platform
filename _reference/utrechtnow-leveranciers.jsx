import { useState } from "react";

const PROVIDERS = [

  // ─── MUSEA & ATTRACTIES ────────────────────────────────────────────────
  { cat:"Musea & Attracties", name:"Domtoren", icon:"🗼", bookable:true, api:"Ticketmaster", price:"€14", rating:4.5, reviews:9123, group:true, notes:"Tijdslots verplicht. API: Ticketmaster Discovery." },
  { cat:"Musea & Attracties", name:"DOMunder", icon:"🌿", bookable:true, api:"GetYourGuide", price:"€12,50", rating:4.3, reviews:974, group:true, notes:"Zaklamptour. API: GetYourGuide Experiences." },
  { cat:"Musea & Attracties", name:"Museum Speelklok", icon:"🎵", bookable:true, api:"Viator", price:"€16", rating:4.5, reviews:3758, group:true, notes:"Begeleide tours. API: Viator." },
  { cat:"Musea & Attracties", name:"Centraal Museum", icon:"🎨", bookable:true, api:"Direct API", price:"€15", rating:4.2, reviews:3059, group:true, notes:"Eigen online ticketshop." },
  { cat:"Musea & Attracties", name:"Kasteel de Haar", icon:"🏰", bookable:true, api:"Viator", price:"€18", rating:4.7, reviews:23557, group:true, notes:"Viator + eigen site. Groepstickets beschikbaar." },
  { cat:"Musea & Attracties", name:"Spoorwegmuseum", icon:"🚂", bookable:true, api:"Ticketmaster", price:"€20", rating:4.6, reviews:8200, group:true, notes:"Tijdslots via Ticketmaster." },
  { cat:"Musea & Attracties", name:"Rietveld Schröderhuis", icon:"🏠", bookable:true, api:"Direct API", price:"€18", rating:4.8, reviews:1200, group:false, notes:"Max 6 pers p. rondleiding. Eigen reserveringssysteem." },
  { cat:"Musea & Attracties", name:"Miffy Museum (Dick Bruna Huis)", icon:"🐰", bookable:true, api:"Direct API", price:"€10", rating:4.7, reviews:2100, group:true, notes:"Onderdeel Centraal Museum. Kinderen t/m 6 jaar." },
  { cat:"Musea & Attracties", name:"Domkerk Utrecht", icon:"⛪", bookable:false, api:"—", price:"Gratis", rating:4.5, reviews:3400, group:true, notes:"TIP — Gewoon binnenlopen. Rondleiding apart te regelen." },
  { cat:"Musea & Attracties", name:"Wax Figures Museum", icon:"🗿", bookable:false, api:"—", price:"€?", rating:3.8, reviews:210, group:false, notes:"TIP — Geen online reservering mogelijk. Binnenlopen." },

  // ─── INDOOR ACTIVITEITEN (winter-proof) ───────────────────────────────
  { cat:"Indoor Activiteiten", name:"The Ping Pong Club", icon:"🏓", bookable:true, api:"Direct API", price:"€10", rating:4.4, reviews:759, group:true, notes:"Tafelreservering via eigen systeem. Groepen t/m 80 pers." },
  { cat:"Indoor Activiteiten", name:"JEU de Boules Bar Utrecht", icon:"🎳", bookable:true, api:"Direct API", price:"€12", rating:4.2, reviews:1096, group:true, notes:"Baanreservering online via jeubarbar.nl. Groepen t/m 60." },
  { cat:"Indoor Activiteiten", name:"The Boules Club Utrecht", icon:"🥎", bookable:true, api:"Direct API", price:"€28", rating:3.9, reviews:316, group:true, notes:"Arrangement baan + diner. Online reservering eigen site." },
  { cat:"Indoor Activiteiten", name:"The Grand Shuffle", icon:"🏒", bookable:true, api:"Direct API", price:"€22", rating:4.7, reviews:39, group:true, notes:"Shuffleboard reservering via thegrandshuffle.nl." },
  { cat:"Indoor Activiteiten", name:"Mooie Boules Utrecht", icon:"🎯", bookable:true, api:"Direct API", price:"€15", rating:4.6, reviews:153, group:true, notes:"QR-bestelservice. Reservering via mooieboules.nl." },
  { cat:"Indoor Activiteiten", name:"Doloris Anoma Maze", icon:"🌀", bookable:true, api:"Direct API", price:"€16", rating:4.5, reviews:1312, group:true, notes:"Tijdslot verplicht. Tickets via dolorisanoma.nl." },
  { cat:"Indoor Activiteiten", name:"The Queen Escape Room", icon:"👑", bookable:true, api:"Direct API", price:"€20", rating:4.9, reviews:555, group:true, notes:"Beste escape room Utrecht. Direct boekbaar." },
  { cat:"Indoor Activiteiten", name:"Live Escape Utrecht", icon:"🔐", bookable:true, api:"Direct API", price:"€19", rating:4.9, reviews:348, group:true, notes:"Grote groepen mogelijk. Mike's Laundromat." },
  { cat:"Indoor Activiteiten", name:"Escape Room Mysterium", icon:"🔮", bookable:true, api:"Direct API", price:"€20", rating:4.7, reviews:465, group:false, notes:"Max 10 pers. Aan de Oudegracht." },
  { cat:"Indoor Activiteiten", name:"Prison Escape Utrecht", icon:"⛓️", bookable:true, api:"Direct API", price:"€45", rating:4.6, reviews:221, group:true, notes:"Rollenspel met acteurs. Avondprogramma." },
  { cat:"Indoor Activiteiten", name:"Escape World Utrecht", icon:"🪄", bookable:true, api:"Direct API", price:"€20", rating:4.9, reviews:142, group:false, notes:"The Midnight Express — hoogwaardige decors." },
  { cat:"Indoor Activiteiten", name:"The Team Building", icon:"🏎️", bookable:true, api:"Direct API", price:"€25", rating:4.6, reviews:1210, group:true, notes:"Karting + axe throwing + escape. Alles op 1 locatie." },
  { cat:"Indoor Activiteiten", name:"Boulderhal Energiehaven", icon:"🧗", bookable:true, api:"Direct API", price:"€12", rating:4.8, reviews:1433, group:true, notes:"Grootste boulderhal Utrecht. Drop-in + groepen." },
  { cat:"Indoor Activiteiten", name:"Boulderhal Zuidhaven", icon:"🏋️", bookable:true, api:"Direct API", price:"€12", rating:4.8, reviews:487, group:false, notes:"Drop-in mogelijk. Eigen café en pizza." },
  { cat:"Indoor Activiteiten", name:"Boulderhal Sterk Spoor", icon:"🏔️", bookable:true, api:"Direct API", price:"€12", rating:4.8, reviews:186, group:false, notes:"Nieuwste hal. Barista-koffie en pizza." },
  { cat:"Indoor Activiteiten", name:"Climbing Wall Utrecht", icon:"🪨", bookable:true, api:"Direct API", price:"€14", rating:4.7, reviews:243, group:true, notes:"Touwklimmen. Introductielessen voor beginners." },

  // ─── WORKSHOP REEKSEN ────────────────────────────────────────────────
  { cat:"Workshop-reeksen (meerdere sessies)", name:"Keramiek Cursus (4 lessen)", icon:"🏺", bookable:true, api:"Direct API", price:"€130", rating:4.8, reviews:109, group:true, notes:"House of Clay / Clay to Plate. 4 weekavonden." },
  { cat:"Workshop-reeksen (meerdere sessies)", name:"Schildercursus (6 lessen)", icon:"🖌️", bookable:true, api:"Direct API", price:"€175", rating:4.8, reviews:659, group:true, notes:"GrachtenAtelier. Inclusief wijn. 6 avonden." },
  { cat:"Workshop-reeksen (meerdere sessies)", name:"Bierbrouwen Masterclass (3 sessies)", icon:"🍺", bookable:true, api:"Direct API", price:"€185", rating:5.0, reviews:21, group:true, notes:"De Brakkerij. 3 zaterdagen. Eigen bier mee." },
  { cat:"Workshop-reeksen (meerdere sessies)", name:"Aziatisch Koken (4 lessen)", icon:"🍜", bookable:true, api:"Direct API", price:"€240", rating:4.9, reviews:448, group:false, notes:"Chopsticks Cooking. Max 8 pers. 4 donderdagen." },

  // ─── LOSSE WORKSHOPS ────────────────────────────────────────────────
  { cat:"Losse Workshops", name:"GrachtenAtelier Schilderen", icon:"🖌️", bookable:true, api:"Direct API", price:"€35", rating:4.8, reviews:659, group:true, notes:"Bob Ross / Monet. Sip & paint concept." },
  { cat:"Losse Workshops", name:"GrachtenAtelier Chocolade", icon:"🍫", bookable:true, api:"Direct API", price:"€28", rating:4.9, reviews:260, group:true, notes:"Bonbons & repen maken. Kids OK." },
  { cat:"Losse Workshops", name:"House of Clay Keramiek", icon:"🏺", bookable:true, api:"Direct API", price:"€38", rating:4.7, reviews:60, group:true, notes:"Aan de Oudegracht. Draaien en handvormen." },
  { cat:"Losse Workshops", name:"Clay to Plate", icon:"🎭", bookable:true, api:"Direct API", price:"€40", rating:5.0, reviews:49, group:false, notes:"Pottenbakken + koken combineren." },
  { cat:"Losse Workshops", name:"Keramiek Kafee Utrecht", icon:"☕", bookable:true, api:"Direct API", price:"€30", rating:5.0, reviews:12, group:true, notes:"Schilderen op tableware. Walk-in + reservering." },
  { cat:"Losse Workshops", name:"Chopsticks Cooking", icon:"🍜", bookable:true, api:"Direct API", price:"€65", rating:4.9, reviews:448, group:true, notes:"Aziatische kookworkshops. Klein groep." },
  { cat:"Losse Workshops", name:"Trai Vegan Kookworkshop", icon:"🌱", bookable:true, api:"Direct API", price:"€55", rating:4.9, reviews:195, group:true, notes:"Plantaardig streetfood. Ook grotere groepen." },
  { cat:"Losse Workshops", name:"De Kookfabriek", icon:"👨‍🍳", bookable:true, api:"Direct API", price:"€70", rating:4.5, reviews:73, group:true, notes:"Professionele kookworkshops. Teambuilding." },
  { cat:"Losse Workshops", name:"The Beer Pioneer", icon:"🧪", bookable:true, api:"Direct API", price:"€75", rating:4.8, reviews:16, group:true, notes:"Diepgaande brouwworkshop. Groepen." },
  { cat:"Losse Workshops", name:"De Brakkerij Bierbrouwen (los)", icon:"🍻", bookable:true, api:"Direct API", price:"€65", rating:5.0, reviews:21, group:true, notes:"Eenmalige workshop. Lunch + tasting inbegrepen." },

  // ─── BUITEN ACTIVITEITEN ──────────────────────────────────────────────
  { cat:"Buiten Activiteiten", name:"DagjeSuppen.nl", icon:"🏄", bookable:true, api:"FareHarbor", price:"€22", rating:4.9, reviews:380, group:true, notes:"SUP grachten. FareHarbor direct integreerbaar." },
  { cat:"Buiten Activiteiten", name:"SUP SUP CLUB Utrecht", icon:"🌊", bookable:true, api:"Direct API", price:"€20", rating:4.9, reviews:51, group:false, notes:"SUP natuur. Buiten Utrecht centrum." },
  { cat:"Buiten Activiteiten", name:"Suppen Kromme Rijn", icon:"🌿", bookable:true, api:"Direct API", price:"€22", rating:4.9, reviews:107, group:false, notes:"SUP + yoga optie. Natuurroute." },
  { cat:"Buiten Activiteiten", name:"What'SUP Utrecht", icon:"🏄", bookable:false, api:"—", price:"€19", rating:5.0, reviews:21, group:false, notes:"⚠️ OPGELET: Bestaat niet meer. Vervangen door DagjeSuppen.nl" },
  { cat:"Buiten Activiteiten", name:"SUP- en Kanoverhuur Utrecht", icon:"🛶", bookable:true, api:"Direct API", price:"€15", rating:4.5, reviews:104, group:true, notes:"Kayak & kano centrum. Online boekbaar." },
  { cat:"Buiten Activiteiten", name:"Kayak Utrecht", icon:"🚣", bookable:true, api:"Direct API", price:"€17", rating:4.9, reviews:280, group:true, notes:"Beste kayakverhuur. ★4.9/280." },
  { cat:"Buiten Activiteiten", name:"Botenverhuur de Rijnstroom", icon:"🌾", bookable:true, api:"Direct API", price:"€12", rating:4.3, reviews:687, group:true, notes:"Kano's en fluisterboten. Stads- en natuurroute." },
  { cat:"Buiten Activiteiten", name:"Stromma Peddelboot", icon:"🚲", bookable:true, api:"Direct API", price:"€9", rating:4.1, reviews:213, group:false, notes:"Retro peddelboot. Goedkoop en leuk." },
  { cat:"Buiten Activiteiten", name:"Utrecht Canal Cruises", icon:"🚢", bookable:true, api:"Viator", price:"€22", rating:4.9, reviews:183, group:false, notes:"Max 12 pers. 2 drankjes inbegrepen. Viator." },
  { cat:"Buiten Activiteiten", name:"Schuttevaer Rondvaart", icon:"⛵", bookable:true, api:"GetYourGuide", price:"€13", rating:4.0, reviews:1037, group:true, notes:"60-90 min rondvaart. Ook groepsvaarten." },
  { cat:"Buiten Activiteiten", name:"Domstadboot BBQ-boot", icon:"🔥", bookable:true, api:"Direct API", price:"€35", rating:4.9, reviews:368, group:true, notes:"BBQ op het water. Tot 25 pers." },
  { cat:"Buiten Activiteiten", name:"De Kleine Kapitein", icon:"⚓", bookable:true, api:"Direct API", price:"€28", rating:5.0, reviews:177, group:false, notes:"Elektrische boot zelf varen. Welkomstmand." },
  { cat:"Buiten Activiteiten", name:"Grachtenvaarders", icon:"🌊", bookable:true, api:"Direct API", price:"€40", rating:4.8, reviews:67, group:true, notes:"Luxe privéboot + skipper + champagne." },
  { cat:"Buiten Activiteiten", name:"Varen in Utrecht", icon:"🛥️", bookable:true, api:"Viator", price:"€14", rating:4.6, reviews:103, group:false, notes:"Ook 's avonds. Viator." },
  { cat:"Buiten Activiteiten", name:"Canal Cruising Utrecht", icon:"🎉", bookable:true, api:"Direct API", price:"€25", rating:5.0, reviews:42, group:false, notes:"Elektrische boot + welkomstmand." },
  { cat:"Buiten Activiteiten", name:"Free Walking Tour Utrecht", icon:"🚶", bookable:true, api:"Viator", price:"Tip", rating:4.9, reviews:720, group:true, notes:"Tip-based. Jeffrey & Ruud. Viator." },
  { cat:"Buiten Activiteiten", name:"Local Tour Utrecht (Lucas)", icon:"📍", bookable:true, api:"Direct API", price:"€15", rating:4.9, reviews:53, group:true, notes:"Persoonlijk maatwerk. Direct contact." },
  { cat:"Buiten Activiteiten", name:"Utours (fiets/kano/sloep)", icon:"🗺️", bookable:true, api:"Viator", price:"€25", rating:4.9, reviews:214, group:true, notes:"Meest complete touraanbod. Viator." },
  { cat:"Buiten Activiteiten", name:"Color Bike Tours", icon:"🌈", bookable:true, api:"Direct API", price:"€22", rating:4.7, reviews:11, group:true, notes:"Guided fietsrondrit. Groepen mogelijk." },
  { cat:"Buiten Activiteiten", name:"Utrecht Craft Beer Tours", icon:"🍺", bookable:true, api:"Direct API", price:"€35", rating:4.8, reviews:97, group:true, notes:"Fietstour langs brouwerijen + proeverijen." },
  { cat:"Buiten Activiteiten", name:"William Street Bike Rental", icon:"🚲", bookable:true, api:"Direct API", price:"€10", rating:4.9, reviews:758, group:true, notes:"Beste fietsverhuur. Ook e-bikes." },
  { cat:"Buiten Activiteiten", name:"Utrecht Food Tour", icon:"🥐", bookable:true, api:"Viator", price:"€40", rating:4.7, reviews:180, group:true, notes:"Culinaire wandeltour. Viator." },

  // ─── WELLNESS & SPA ──────────────────────────────────────────────────
  { cat:"Wellness & Spa", name:"City Spa Utrecht", icon:"🧖", bookable:true, api:"Direct API", price:"€45", rating:4.8, reviews:389, group:true, notes:"Float, magnesium, massage. Groepspakketten." },
  { cat:"Wellness & Spa", name:"Thermen Maarssen", icon:"♨️", bookable:true, api:"Direct API", price:"€43", rating:4.4, reviews:3187, group:true, notes:"Groot dagbad nabij Utrecht. Groepsdagkaarten." },
  { cat:"Wellness & Spa", name:"Hammam & Sauna Pretoria", icon:"🕌", bookable:true, api:"Direct API", price:"€32", rating:4.6, reviews:353, group:false, notes:"Authentieke hammam. Dames & heren apart." },
  { cat:"Wellness & Spa", name:"Thermen Soesterberg", icon:"🌲", bookable:true, api:"Direct API", price:"€48", rating:4.4, reviews:6191, group:true, notes:"Bossauna. 30 min van Utrecht. Dagpas." },
  { cat:"Wellness & Spa", name:"Amara Spa (privé)", icon:"💑", bookable:true, api:"Direct API", price:"€79", rating:4.8, reviews:2210, group:false, notes:"Privé-spa voor 2. Romantisch pakket." },
  { cat:"Wellness & Spa", name:"Inntel Hotels Wellness", icon:"🛁", bookable:true, api:"Booking.com", price:"€35", rating:4.3, reviews:1363, group:true, notes:"Rooftop pool + sauna. Via hotel boeking." },
  { cat:"Wellness & Spa", name:"Hammam Yasmine Utrecht", icon:"🌸", bookable:false, api:"—", price:"€?", rating:4.5, reviews:56, group:false, notes:"TIP — Bellen voor beschikbaarheid. Alleen dames." },

  // ─── HOTELS ──────────────────────────────────────────────────────────
  { cat:"Hotels", name:"The Nox Hotel", icon:"🏨", bookable:true, api:"Booking.com", price:"€95/nacht", rating:4.7, reviews:534, group:false, notes:"Boutique. Naast Domtoren. Uniek design." },
  { cat:"Hotels", name:"Brass Hotel", icon:"🏨", bookable:true, api:"Booking.com", price:"€89/nacht", rating:4.5, reviews:304, group:false, notes:"Boutique. Op Janskerkhof." },
  { cat:"Hotels", name:"Hotel Beijers", icon:"🏨", bookable:true, api:"Booking.com", price:"€85/nacht", rating:4.5, reviews:232, group:false, notes:"Boutique. Naast Domkerk." },
  { cat:"Hotels", name:"Petit Beijers", icon:"🏨", bookable:true, api:"Booking.com", price:"€79/nacht", rating:4.7, reviews:152, group:false, notes:"B&B sfeer. Grachtzicht." },
  { cat:"Hotels", name:"Anne&Max Boutique Hotel", icon:"🏨", bookable:true, api:"Booking.com", price:"€99/nacht", rating:4.2, reviews:99, group:false, notes:"Boutique. Domzicht." },
  { cat:"Hotels", name:"Cozy Pillow", icon:"🏨", bookable:true, api:"Booking.com", price:"€69/nacht", rating:4.4, reviews:104, group:false, notes:"Budget-boutique. Centrum." },
  { cat:"Hotels", name:"Court Hotel City Center", icon:"🏨", bookable:true, api:"Booking.com", price:"€75/nacht", rating:4.1, reviews:432, group:false, notes:"Ruime kamers. Rustige straat." },
  { cat:"Hotels", name:"Hotel Beijers (City Center Lodge)", icon:"🏨", bookable:true, api:"Booking.com", price:"€55/nacht", rating:4.1, reviews:247, group:false, notes:"Budget. Singel." },
  { cat:"Hotels", name:"Inntel Hotels Utrecht Centre", icon:"🏨", bookable:true, api:"Booking.com", price:"€130/nacht", rating:4.3, reviews:1363, group:true, notes:"Luxury. Spa + jacuzzi + uitzicht." },
  { cat:"Hotels", name:"Crowne Plaza Utrecht (IHG)", icon:"🏨", bookable:true, api:"Booking.com", price:"€150/nacht", rating:4.4, reviews:543, group:true, notes:"Luxury. Station. Congres." },
  { cat:"Hotels", name:"Hotel NH Utrecht", icon:"🏨", bookable:true, api:"Booking.com", price:"€110/nacht", rating:4.2, reviews:3684, group:true, notes:"Luxury. Jaarbeursplein." },
  { cat:"Hotels", name:"Van der Valk Hotel Utrecht", icon:"🏨", bookable:true, api:"Booking.com", price:"€120/nacht", rating:4.4, reviews:5228, group:true, notes:"Luxury. Rooftop pool + sauna." },
  { cat:"Hotels", name:"Carlton President Hotel", icon:"🏨", bookable:true, api:"Booking.com", price:"€95/nacht", rating:4.3, reviews:2236, group:true, notes:"Luxury. Spa + congres." },
  { cat:"Hotels", name:"Hampton by Hilton Utrecht", icon:"🏨", bookable:true, api:"Booking.com", price:"€105/nacht", rating:4.3, reviews:1654, group:true, notes:"Luxury. Station. Gratis ontbijt." },
  { cat:"Hotels", name:"Hotel Mitland Utrecht", icon:"🏨", bookable:true, api:"Booking.com", price:"€85/nacht", rating:4.3, reviews:2123, group:true, notes:"Parkhotel. Hondvriendelijk. Parking." },
  { cat:"Hotels", name:"Stayokay Utrecht Center", icon:"🏨", bookable:true, api:"Booking.com", price:"€35/nacht", rating:4.3, reviews:2249, group:true, notes:"Hostel. Miffy kamer. Groepen." },
  { cat:"Hotels", name:"Bunk Hotel Utrecht", icon:"🏨", bookable:true, api:"Booking.com", price:"€29/nacht", rating:4.3, reviews:1769, group:false, notes:"Hostel in gotische kerk. Hip." },
  { cat:"Hotels", name:"Hostel Strowis", icon:"🏨", bookable:true, api:"Booking.com", price:"€25/nacht", rating:4.4, reviews:453, group:false, notes:"Gezelligste hostel. Tuin + kat." },

  // ─── RESTAURANTS ─────────────────────────────────────────────────────
  { cat:"Restaurants", name:"Hemel & Aarde", icon:"🍽️", bookable:true, api:"Booking.com", price:"€€€€", rating:4.8, reviews:394, group:true, notes:"Fine dining. Seizoensmenu. Groepen t/m ~20." },
  { cat:"Restaurants", name:"Restaurant Maeve", icon:"🍽️", bookable:true, api:"TheFork", price:"€€€€", rating:4.8, reviews:312, group:false, notes:"Fine dining. 6-gangen. Wijnparing." },
  { cat:"Restaurants", name:"Water Tower WT Urban Kitchen", icon:"🍽️", bookable:true, api:"TheFork", price:"€€€", rating:4.6, reviews:1384, group:true, notes:"In een watertoren. Spectaculair uitzicht." },
  { cat:"Restaurants", name:"De Goedheyd", icon:"🍽️", bookable:true, api:"TheFork", price:"€€€", rating:4.8, reviews:365, group:true, notes:"Fine dining. 5-gangen. Groepen t/m 11." },
  { cat:"Restaurants", name:"El Qatarijne", icon:"🍽️", bookable:true, api:"Booking.com", price:"€€€", rating:4.5, reviews:757, group:true, notes:"Verrassingsdiner chef kiest. Fusion." },
  { cat:"Restaurants", name:"Pand 33", icon:"🍽️", bookable:true, api:"TheFork", price:"€€€", rating:4.7, reviews:282, group:false, notes:"Frans-Mediterraan. Nieuwegracht. Wijnparing." },
  { cat:"Restaurants", name:"Kasteel Heemstede", icon:"🍽️", bookable:true, api:"Direct API", price:"€€€€", rating:4.7, reviews:405, group:true, notes:"Michelin-ster. Sprookjeskasteel. 15 min." },
  { cat:"Restaurants", name:"Restaurant San Siro", icon:"🍽️", bookable:true, api:"TheFork", price:"€€€", rating:4.6, reviews:1257, group:true, notes:"Beste Italiaans Utrecht. Terras." },
  { cat:"Restaurants", name:"Silk Road Utrecht", icon:"🍽️", bookable:true, api:"TheFork", price:"€€€", rating:4.7, reviews:584, group:false, notes:"Aziatische tapas aan Oudegracht." },
  { cat:"Restaurants", name:"Restaurant Carmel Market", icon:"🍽️", bookable:true, api:"Booking.com", price:"€€€", rating:4.5, reviews:1247, group:true, notes:"Mediterraan. Live muziek. Groepen welkom." },
  { cat:"Restaurants", name:"Ruby Rose", icon:"🍽️", bookable:true, api:"Booking.com", price:"€€", rating:4.4, reviews:2015, group:true, notes:"Tapas + cocktails. Historisch pand." },
  { cat:"Restaurants", name:"Belgisch Biercafé Olivier", icon:"🍽️", bookable:true, api:"TheFork", price:"€€", rating:4.5, reviews:9077, group:true, notes:"In middeleeuwse kerk. Groot. Groepen." },
  { cat:"Restaurants", name:"Broadway American Steakhouse", icon:"🍽️", bookable:true, api:"TheFork", price:"€€", rating:4.5, reviews:3927, group:true, notes:"Beste steak. Aan Oudegracht. Terras." },
  { cat:"Restaurants", name:"Beers & Barrels", icon:"🍽️", bookable:true, api:"Direct API", price:"€€", rating:4.3, reviews:4054, group:true, notes:"BBQ + craft beer aan gracht. Terras." },
  { cat:"Restaurants", name:"Restaurant Kartoffel", icon:"🍽️", bookable:true, api:"Direct API", price:"€", rating:4.4, reviews:2487, group:true, notes:"Duits. Schweinshaxe + Weizen. Werfkelder." },
  { cat:"Restaurants", name:"The Streetfood Club", icon:"🍽️", bookable:true, api:"Booking.com", price:"€€", rating:4.2, reviews:4278, group:true, notes:"Asian fusion. Around the World menu." },
  { cat:"Restaurants", name:"Graaf Floris", icon:"🍽️", bookable:true, api:"Direct API", price:"€€", rating:4.3, reviews:1735, group:true, notes:"Café-restaurant Vismarkt. Grachtzicht terras." },
  { cat:"Restaurants", name:"Theehuis Rhijnauwen", icon:"🍽️", bookable:false, api:"—", price:"€€", rating:4.4, reviews:6734, group:true, notes:"TIP — Geen online reservering. Binnenlopen. Pannenkoeken." },
  { cat:"Restaurants", name:"Landhuis in de Stad", icon:"🍽️", bookable:false, api:"—", price:"€€", rating:4.6, reviews:1576, group:false, notes:"TIP — Parkcafé. Geen reservering mogelijk." },
  { cat:"Restaurants", name:"Orloff aan de Kade", icon:"🍽️", bookable:true, api:"Direct API", price:"€€", rating:4.2, reviews:1304, group:true, notes:"Waterkant. Vis + cocktails. Terras." },
  { cat:"Restaurants", name:"Buiten bij de Sluis", icon:"🍽️", bookable:false, api:"—", price:"€€", rating:4.5, reviews:454, group:true, notes:"TIP — Populair familierestaurant bij sluis. Geen online boeking." },
  { cat:"Restaurants", name:"Humphrey's Restaurant Utrecht", icon:"🍽️", bookable:true, api:"TheFork", price:"€€", rating:4.3, reviews:1858, group:true, notes:"Werfkelder. 3-gangen menu. Groepen." },
  { cat:"Restaurants", name:"Brewpub De Kromme Haring", icon:"🍺", bookable:false, api:"—", price:"€€", rating:4.7, reviews:845, group:false, notes:"TIP — Craft brewery. Walk-in. Geen reservering nodig." },
  { cat:"Restaurants", name:"vandeStreek Taproom", icon:"🍺", bookable:false, api:"—", price:"€€", rating:4.8, reviews:75, group:false, notes:"TIP — Brouwerij proeflokaal. Alleen Vr/Za/Zo open." },

  // ─── EVENTS & THEATER ────────────────────────────────────────────────
  { cat:"Events & Theater", name:"TivoliVredenburg", icon:"🎵", bookable:true, api:"Ticketmaster", price:"v.a. €15", rating:4.5, reviews:14549, group:true, notes:"5 zalen. Ticketmaster API. Groepstickets." },
  { cat:"Events & Theater", name:"Beatrix Theater", icon:"🎭", bookable:true, api:"Ticketmaster", price:"v.a. €35", rating:4.4, reviews:6205, group:true, notes:"Grote musicals. VIP-arrangement. Ticketmaster." },
  { cat:"Events & Theater", name:"Stadsschouwburg Utrecht", icon:"🎭", bookable:true, api:"Ticketmaster", price:"v.a. €20", rating:4.5, reviews:2389, group:true, notes:"Theater/dans. Groepskorting beschikbaar." },
  { cat:"Events & Theater", name:"De Helling", icon:"🎸", bookable:true, api:"Ticketmaster", price:"v.a. €12", rating:4.5, reviews:1364, group:false, notes:"Rock/metal/alternatief. Ticketmaster." },
  { cat:"Events & Theater", name:"EKKO", icon:"🎶", bookable:true, api:"Ticketmaster", price:"v.a. €10", rating:4.4, reviews:836, group:false, notes:"Underground/indie. Kleine clubzaal." },
  { cat:"Events & Theater", name:"Louis Hartlooper Complex", icon:"🎬", bookable:true, api:"Direct API", price:"v.a. €12", rating:4.5, reviews:2220, group:true, notes:"Arthouse cinema. Voormalig politiebureau." },
  { cat:"Events & Theater", name:"Spring Festival Utrecht", icon:"🌸", bookable:true, api:"Ticketmaster", price:"v.a. €18", rating:4.7, reviews:560, group:true, notes:"Internationaal theater/dansfestival. Mei." },
  { cat:"Events & Theater", name:"Leidsche Rijn Theater", icon:"🎭", bookable:true, api:"Ticketmaster", price:"v.a. €15", rating:4.3, reviews:320, group:true, notes:"Toegankelijk theater. Kindertheater." },
];

// ─── STATS ───────────────────────────────────────────────────────────────
const CATS = [...new Set(PROVIDERS.map(p => p.cat))];
const total = PROVIDERS.length;
const bookable = PROVIDERS.filter(p => p.bookable).length;
const tipOnly = PROVIDERS.filter(p => !p.bookable).length;
const groupFriendly = PROVIDERS.filter(p => p.group).length;

const API_COUNTS = PROVIDERS.filter(p=>p.bookable).reduce((acc,p) => {
  acc[p.api] = (acc[p.api]||0)+1; return acc;
},{});

const CHIP = {
  "Ticketmaster":"#F3E5F5:#6A1B9A",
  "Viator":"#E8F4FD:#1565C0",
  "GetYourGuide":"#FFF3E0:#E65100",
  "FareHarbor":"#FFF8E1:#F57F17",
  "Booking.com":"#E3F2FD:#1565C0",
  "TheFork":"#E8F5E9:#2D7A4F",
  "Direct API":"#F0F4F0:#2D7A4F",
  "—":"#F2F2F2:#999",
};

function chip(api) {
  const [bg,c] = (CHIP[api]||"#eee:#888").split(":");
  return <span style={{fontSize:9,fontWeight:900,padding:"2px 6px",borderRadius:3,textTransform:"uppercase",letterSpacing:".3px",background:bg,color:c,whiteSpace:"nowrap"}}>{api}</span>;
}

export default function LeveranciersList() {
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [showOnlyBookable, setShowOnlyBookable] = useState(false);
  const [showOnlyGroup, setShowOnlyGroup] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedCats, setExpandedCats] = useState(new Set(CATS));

  const toggleCat = (cat) => {
    setExpandedCats(prev => {
      const n = new Set(prev);
      n.has(cat) ? n.delete(cat) : n.add(cat);
      return n;
    });
  };

  const filtered = PROVIDERS.filter(p => {
    if (activeFilter !== "Alle" && p.cat !== activeFilter) return false;
    if (showOnlyBookable && !p.bookable) return false;
    if (showOnlyGroup && !p.group) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const catGroups = CATS.reduce((acc, cat) => {
    const items = filtered.filter(p => p.cat === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div style={{fontFamily:"Inter,sans-serif",background:"#F7F3EC",minHeight:"100vh",padding:24,color:"#1A1612"}}>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#1E3A4A,#2C526A)",borderRadius:16,padding:"28px 28px 24px",marginBottom:20}}>
        <div style={{fontSize:10,fontWeight:800,letterSpacing:"3px",color:"#C8753A",textTransform:"uppercase",marginBottom:6}}>UtrechtNow — Intern overzicht</div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(22px,3vw,36px)",fontWeight:900,color:"#fff",marginBottom:6}}>Alle leveranciers per categorie</h1>
        <p style={{fontSize:13,color:"rgba(247,243,236,.65)",marginBottom:20}}>Inclusief boekingsstatus, API-koppeling en bijzonderheden. Prijzen zijn <strong style={{color:"#E8956A"}}>nettoprijzen (ex. 10% servicekosten)</strong>.</p>

        {/* STATS ROW */}
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {[
            [`${total}`, "Totaal aanbieders", "#E8956A"],
            [`${bookable}`, "Online boekbaar ✅", "#86EFAC"],
            [`${tipOnly}`, "Alleen tip 💡", "#FCA5A5"],
            [`${groupFriendly}`, "Groepsvriendelijk 👥", "#C4B5FD"],
          ].map(([n,l,c]) => (
            <div key={l} style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"12px 18px",flex:1,minWidth:120}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:28,fontWeight:900,color:c}}>{n}</div>
              <div style={{fontSize:11,color:"rgba(247,243,236,.6)",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {/* API BREAKDOWN */}
        <div style={{marginTop:16,display:"flex",gap:8,flexWrap:"wrap"}}>
          {Object.entries(API_COUNTS).sort((a,b)=>b[1]-a[1]).map(([api,count]) => {
            const [bg,c] = (CHIP[api]||"#eee:#888").split(":");
            return <span key={api} style={{background:bg,color:c,borderRadius:5,padding:"4px 10px",fontSize:10,fontWeight:800}}>{api}: {count}</span>;
          })}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{background:"#fff",borderRadius:12,padding:"16px 20px",marginBottom:16,boxShadow:"0 2px 8px rgba(30,58,74,.06)"}}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <input
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="🔍 Zoek leverancier…"
            style={{border:"2px solid #E8E2D8",borderRadius:8,padding:"7px 12px",fontSize:13,fontFamily:"Inter,sans-serif",outline:"none",width:200}}
          />
          <button onClick={()=>setShowOnlyBookable(b=>!b)} style={{border:`2px solid ${showOnlyBookable?"#2D7A4F":"#E8E2D8"}`,background:showOnlyBookable?"#E8F5E9":"#fff",borderRadius:8,padding:"7px 13px",fontSize:12,fontWeight:700,cursor:"pointer",color:showOnlyBookable?"#2D7A4F":"#1A1612"}}>
            ✅ Alleen online boekbaar
          </button>
          <button onClick={()=>setShowOnlyGroup(b=>!b)} style={{border:`2px solid ${showOnlyGroup?"#6A1B9A":"#E8E2D8"}`,background:showOnlyGroup?"rgba(106,27,154,.08)":"#fff",borderRadius:8,padding:"7px 13px",fontSize:12,fontWeight:700,cursor:"pointer",color:showOnlyGroup?"#6A1B9A":"#1A1612"}}>
            👥 Alleen groepsvriendelijk
          </button>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginLeft:4}}>
            {["Alle",...CATS].map(c => (
              <button key={c} onClick={()=>setActiveFilter(c)} style={{border:`1.5px solid ${activeFilter===c?"#1E3A4A":"#E8E2D8"}`,background:activeFilter===c?"#1E3A4A":"#fff",borderRadius:20,padding:"5px 11px",fontSize:11,fontWeight:600,cursor:"pointer",color:activeFilter===c?"#fff":"#1A1612",whiteSpace:"nowrap"}}>
                {c==="Alle"?"Alle categorieën":c}
              </button>
            ))}
          </div>
          <span style={{marginLeft:"auto",fontSize:12,color:"#6B7A85",fontWeight:600}}>{filtered.length} resultaten</span>
        </div>
      </div>

      {/* TABLES PER CATEGORY */}
      {Object.entries(catGroups).map(([cat, items]) => {
        const bookableCount = items.filter(p=>p.bookable).length;
        const tipCount = items.filter(p=>!p.bookable).length;
        const isExpanded = expandedCats.has(cat);

        return (
          <div key={cat} style={{background:"#fff",borderRadius:12,marginBottom:14,boxShadow:"0 2px 8px rgba(30,58,74,.06)",overflow:"hidden"}}>
            {/* CAT HEADER */}
            <div onClick={()=>toggleCat(cat)} style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",background:isExpanded?"#fff":"#F7F3EC",borderBottom:isExpanded?"1px solid #E8E2D8":"none"}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"Georgia,serif",fontSize:17,fontWeight:700,color:"#1E3A4A"}}>{cat}</div>
                <div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap"}}>
                  <span style={{fontSize:10,fontWeight:800,background:"#E8F5E9",color:"#2D7A4F",padding:"2px 7px",borderRadius:10}}>✅ {bookableCount} boekbaar</span>
                  {tipCount > 0 && <span style={{fontSize:10,fontWeight:800,background:"#FFF3CD",color:"#856404",padding:"2px 7px",borderRadius:10}}>💡 {tipCount} tip</span>}
                  <span style={{fontSize:10,color:"#6B7A85",fontWeight:600}}>{items.length} totaal</span>
                </div>
              </div>
              <span style={{fontSize:18,color:"#C8753A",transition:"transform .2s",display:"inline-block",transform:isExpanded?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
            </div>

            {/* TABLE */}
            {isExpanded && (
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead>
                    <tr style={{background:"#F7F3EC"}}>
                      <th style={{padding:"9px 16px",textAlign:"left",fontSize:10,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".5px",whiteSpace:"nowrap"}}>Naam</th>
                      <th style={{padding:"9px 12px",textAlign:"center",fontSize:10,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".5px",whiteSpace:"nowrap"}}>Status</th>
                      <th style={{padding:"9px 12px",textAlign:"left",fontSize:10,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".5px",whiteSpace:"nowrap"}}>Boekingssysteem</th>
                      <th style={{padding:"9px 12px",textAlign:"right",fontSize:10,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".5px",whiteSpace:"nowrap"}}>Nettoprijs*</th>
                      <th style={{padding:"9px 12px",textAlign:"center",fontSize:10,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".5px",whiteSpace:"nowrap"}}>Score</th>
                      <th style={{padding:"9px 12px",textAlign:"center",fontSize:10,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".5px",whiteSpace:"nowrap"}}>Groepen</th>
                      <th style={{padding:"9px 16px",textAlign:"left",fontSize:10,fontWeight:800,color:"#6B7A85",textTransform:"uppercase",letterSpacing:".5px"}}>Bijzonderheden</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p, i) => (
                      <tr key={p.name} style={{borderTop:"1px solid #F2EDE6",background:i%2===0?"#fff":"#FDFCFA",opacity:p.bookable?1:.8}}>
                        <td style={{padding:"10px 16px",fontWeight:600,whiteSpace:"nowrap"}}>
                          <span style={{marginRight:7}}>{p.icon}</span>{p.name}
                        </td>
                        <td style={{padding:"10px 12px",textAlign:"center"}}>
                          {p.bookable
                            ? <span style={{background:"#E8F5E9",color:"#2D7A4F",borderRadius:5,padding:"3px 8px",fontSize:11,fontWeight:800}}>✅ Online</span>
                            : <span style={{background:"#FFF9E6",color:"#856404",borderRadius:5,padding:"3px 8px",fontSize:11,fontWeight:800}}>💡 Tip</span>
                          }
                        </td>
                        <td style={{padding:"10px 12px"}}>{chip(p.api)}</td>
                        <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,whiteSpace:"nowrap",color:p.bookable?"#1A1612":"#aaa"}}>
                          {p.price}
                          {p.bookable && p.price && !p.price.includes("/") && !p.price.includes("€€") && !p.price.includes("v.a") && !p.price.includes("Tip") && (
                            <span style={{fontSize:9,color:"#C8753A",marginLeft:3}}>+10%</span>
                          )}
                        </td>
                        <td style={{padding:"10px 12px",textAlign:"center",whiteSpace:"nowrap"}}>
                          <span style={{color:"#F59E0B"}}>★</span> {p.rating}
                          <span style={{color:"#aaa",fontSize:10,marginLeft:2}}>({p.reviews?.toLocaleString()})</span>
                        </td>
                        <td style={{padding:"10px 12px",textAlign:"center"}}>
                          {p.group ? <span style={{fontSize:13}}>✅</span> : <span style={{fontSize:13,color:"#ccc"}}>—</span>}
                        </td>
                        <td style={{padding:"10px 16px",fontSize:11,color:"#6B7A85",lineHeight:1.5,maxWidth:280}}>
                          {p.notes.includes("⚠️") 
                            ? <span style={{color:"#C0392B",fontWeight:700}}>{p.notes}</span> 
                            : p.notes.startsWith("TIP —")
                            ? <span style={{color:"#856404"}}>{p.notes}</span>
                            : p.notes
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}

      {/* LEGEND */}
      <div style={{background:"#fff",borderRadius:12,padding:"18px 20px",marginTop:8,boxShadow:"0 2px 8px rgba(30,58,74,.06)"}}>
        <div style={{fontWeight:700,color:"#1E3A4A",marginBottom:10,fontSize:13}}>Legenda &amp; toelichting</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,fontSize:12,color:"#6B7A85"}}>
          <div><strong style={{color:"#2D7A4F"}}>✅ Online boekbaar</strong> — klant betaalt direct online. Wij boeken bij leverancier namens klant.</div>
          <div><strong style={{color:"#856404"}}>💡 Tip</strong> — niet via UtrechtNow te boeken. Klant wordt verwezen naar externe site of binnenlopen.</div>
          <div><strong style={{color:"#C8753A"}}>Nettoprijs +10%</strong> — alle getoonde prijzen zijn nettoprijzen. Klant ziet nettoproijs + 10% servicekosten. Marge nooit zichtbaar.</div>
          <div><strong style={{color:"#6A1B9A"}}>👥 Groepen</strong> — geschikt voor groepsboeking (10+ pers). WeFact-factuur beschikbaar op aanvraag.</div>
          <div><strong style={{color:"#1565C0"}}>Boekingssystemen</strong> — Ticketmaster, Viator, GetYourGuide, FareHarbor, Booking.com, TheFork of Direct API partnercontract.</div>
          <div><strong style={{color:"#C0392B"}}>⚠️ Rood = opgelet</strong> — bijv. What'SUP bestaat niet meer. Vervangen door DagjeSuppen.nl via FareHarbor.</div>
        </div>
      </div>
    </div>
  );
}

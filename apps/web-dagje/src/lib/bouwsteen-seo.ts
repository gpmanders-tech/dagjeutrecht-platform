/**
 * Zoekwoordteksten per bouwsteen.
 *
 * Staat los van aanbod.ts omdat dat bestand de bron is voor prijzen, inkoop en
 * beschikbaarheid. Hier staat alleen wat er voor de zoekmachine bij moet: titel,
 * omschrijving, een eigen alinea en veelgestelde vragen.
 *
 * Doelgroep is altijd een groep vanaf 8 personen. De teksten mikken daarom op
 * groepszoektermen ("kanoën met een groep in Utrecht") en niet op losse verhuur,
 * want dat verkopen we niet en dan levert een hoge plek alleen teleurstelling op.
 *
 * Steppen staat hier bewust niet bij: die zoektermen zijn van stepverhuurutrecht.nl.
 * De kickbike-tocht heeft wel een pagina, maar mikt op de tocht en verwijst voor
 * losse verhuur door.
 */

export type BouwsteenSeo = {
  /** Meta title zonder merknaam: layout.tsx plakt er via het template ' | DagjeUtrecht' achter. */
  titel: string;
  /** Meta description, 120 tot 155 tekens. */
  beschrijving: string;
  /** Eigen alinea's op de pagina, boven het praktische blok. */
  tekst: string[];
  /** Veelgestelde vragen; verschijnen op de pagina en als FAQ-structured data. */
  vragen: Array<{ q: string; a: string }>;
  /** Verwijzing naar een andere site van ons, voor zoekers die hier niet moeten zijn. */
  verwijzing?: { tekst: string; href: string; link: string };
};

export const BOUWSTEEN_SEO: Record<string, BouwsteenSeo> = {
  suppen: {
    titel: 'Suppen met een groep in Utrecht',
    beschrijving:
      'Suppen op de Kromme Rijn bij Amelisweerd, met je groep vanaf 8 personen. Board, peddel en zwemvest inbegrepen. Vaste prijs per persoon.',
    tekst: [
      'Suppen in Utrecht doe je het rustigst op de Kromme Rijn. Geen drukke grachten met rondvaartboten, maar stil water door landgoed Amelisweerd, waar je als groep bij elkaar kunt blijven. Iedereen krijgt een eigen board, dus niemand hoeft te delen.',
      'Dit onderdeel is bedoeld voor groepen vanaf 8 personen en duurt twee uur. Je kunt het los boeken of combineren met een picknick aan het water of een BBQ als afsluiting. Zoek je een board voor jezelf of met z’n tweeën, dan is dit niet de goede plek: wij werken alleen met groepen.',
    ],
    vragen: [
      { q: 'Moet je kunnen suppen?', a: 'Nee. De meesten staan binnen tien minuten. Het water van de Kromme Rijn is rustig en ondiep, dus vallen is geen probleem.' },
      { q: 'Moet je kunnen zwemmen?', a: 'Ja, dat is verplicht. Iedereen krijgt een zwemvest, maar zwemvaardigheid is een voorwaarde om mee te doen.' },
      { q: 'Vanaf hoeveel personen kan het?', a: 'Vanaf 8 personen, tot maximaal 30. Je boekt per persoon.' },
      { q: 'Kan het het hele jaar door?', a: 'Nee, suppen kan van april tot en met oktober. In de winter kies je bijvoorbeeld jeu de boules of shuffleboard.' },
    ],
  },

  kanoen: {
    titel: 'Kanoën met een groep in Utrecht',
    beschrijving:
      'Twee uur kanoën over de Kromme Rijn door Amelisweerd, met je groep vanaf 8 personen. Kano, zwemvest en waterzak inbegrepen.',
    tekst: [
      'Kanoën bij Utrecht gaat over de Kromme Rijn, dwars door landgoed Amelisweerd. Je vaart onder oude bomen door en komt langs de theetuin bij Rhijnauwen. Het is een van de weinige plekken rond de stad waar een groep twee uur kan varen zonder motorboten tegen te komen.',
      'Je gaat met twee personen per kano, dus het werkt goed als je wilt dat mensen die elkaar nog niet kennen aan elkaar gekoppeld worden. Zwemvesten en een waterzak voor telefoons zitten erbij.',
    ],
    vragen: [
      { q: 'Hoeveel personen per kano?', a: 'Twee. Bij een oneven groep zetten we één kano met drie plekken in.' },
      { q: 'Is ervaring nodig?', a: 'Nee. Je krijgt uitleg bij vertrek en de route is eenvoudig, heen en terug over hetzelfde water.' },
      { q: 'Wat als het regent?', a: 'Kanoën gaat gewoon door bij regen. Alleen bij onweer of harde wind wijken we uit naar een onderdeel binnen.' },
      { q: 'Kan het gecombineerd worden met een BBQ?', a: 'Ja. De BBQ met twee uur drankjes is op dezelfde locatie bij De Rijnstroom en kan vanaf 15 personen.' },
    ],
  },

  'jeu-de-boules': {
    titel: 'Jeu de boules in Utrecht met een groep',
    beschrijving:
      'Anderhalf uur indoor jeu de boules bij Paardenveld, met bites erbij. Voor groepen vanaf 8 personen. Regen maakt niet uit.',
    tekst: [
      'Jeu de boules in Utrecht kan het hele jaar door, want de banen aan Paardenveld liggen binnen. Dat maakt het een van de weinige groepsactiviteiten waarbij het weer geen rol speelt, ook niet in november.',
      'De groep speelt in teams tegen elkaar. Je krijgt uitleg ter plekke, dus voorkennis is niet nodig. Bites staan op tafel terwijl je speelt. Het is op vijf minuten lopen van Utrecht Centraal, wat handig is als mensen met de trein komen.',
    ],
    vragen: [
      { q: 'Is het binnen of buiten?', a: 'Binnen, op overdekte banen. Regen of kou maakt dus niets uit.' },
      { q: 'Hoe lang duurt het?', a: 'Anderhalf uur, inclusief uitleg en bites.' },
      { q: 'Moet je het spel kennen?', a: 'Nee. Je krijgt korte uitleg en na twee worpen weet iedereen hoe het werkt.' },
      { q: 'Hoe ver is het van het station?', a: 'Ongeveer vijf minuten lopen vanaf Utrecht Centraal.' },
    ],
  },

  shuffleboard: {
    titel: 'Shuffleboard in Utrecht met een groep',
    beschrijving:
      'Anderhalf uur shuffleboard in het centrum van Utrecht, voor groepen vanaf 8 personen. Banen en uitleg inbegrepen.',
    tekst: [
      'Shuffleboard is makkelijker uit te leggen dan bowlen en je kunt er tijdens het spelen bij praten. Daarom werkt het goed voor groepen waarin niet iedereen elkaar kent, of voor teams met verschillende leeftijden.',
      'Je speelt anderhalf uur op de banen van The Grand Shuffle in het centrum. Alles is binnen. Combineren met een borrel op dezelfde avond kan, want de locaties liggen op loopafstand van elkaar.',
    ],
    vragen: [
      { q: 'Wat is shuffleboard?', a: 'Een tafelspel waarbij je schijven over een lange gladde baan schuift en zo dicht mogelijk bij de rand probeert te komen zonder eraf te gaan.' },
      { q: 'Hoeveel mensen per baan?', a: 'Vier tot zes. Bij grotere groepen reserveren we meerdere banen naast elkaar.' },
      { q: 'Kan het in de winter?', a: 'Ja, het hele jaar door. Alles is binnen.' },
    ],
  },

  'city-challenge': {
    titel: 'City Challenge Utrecht: stadsspel voor groepen',
    beschrijving:
      'In teams door de Utrechtse binnenstad met opdrachten over de Dom, de werfkelders en de Oudegracht. Vanaf 8 personen, 7,50 per persoon.',
    tekst: [
      'Een City Challenge is een stadsspel: de groep gaat in teams de binnenstad in met opdrachten en vragen over wat ze onderweg tegenkomen. De Dom, de werfkelders en de Oudegracht komen allemaal langs. Te voet, op eigen tempo.',
      'Het is geen escape room en geen rondleiding met een gids. Je bent zelf op pad, wij zorgen voor de opdrachten en staan bij de start en de finish klaar om de uitslag door te nemen. Start is bij Paardenveld, finish op de Neude.',
    ],
    vragen: [
      { q: 'Hoe lang duurt een City Challenge?', a: 'Anderhalf tot twee uur, afhankelijk van hoe snel de teams doorlopen.' },
      { q: 'Hoe groot zijn de teams?', a: 'Vier tot zes personen per team. Bij 8 personen speel je dus met twee teams tegen elkaar.' },
      { q: 'Is er een gids bij?', a: 'Niet onderweg. Wij staan bij de start en de finish; daartussen zijn de teams zelfstandig op pad.' },
      { q: 'Wat kost het?', a: '7,50 per persoon. Dat is het goedkoopste onderdeel dat we hebben.' },
    ],
  },

  rondvaart: {
    titel: 'Rondvaart Utrecht met een groep',
    beschrijving:
      'Een uur varen over de Oudegracht en de singels met je groep vanaf 8 personen. Opstappen in het centrum, vaste prijs per persoon.',
    tekst: [
      'Een uur over de Oudegracht en de singels, langs de werfkelders die je alleen vanaf het water goed ziet. Voor groepen is dit het onderdeel waarbij iedereen even zit en bijpraat, meestal tussen twee actievere blokken in.',
      'Je stapt op in het centrum, op loopafstand van de andere onderdelen. Handig als startpunt van de dag of juist als rustpunt na de lunch.',
    ],
    vragen: [
      { q: 'Hoe lang duurt de rondvaart?', a: 'Een uur.' },
      { q: 'Is de boot overdekt?', a: 'Ja, er is een overkapping, dus de vaart gaat ook door bij regen.' },
      { q: 'Kan er onderweg gedronken worden?', a: 'Drankjes zitten niet in deze bouwsteen. Voor een borrel combineer je met het borrelblok na afloop.' },
    ],
  },

  bbq: {
    titel: 'BBQ met een groep in Utrecht',
    beschrijving:
      'Barbecue bij De Rijnstroom in Amelisweerd met twee uur onbeperkt drankjes. Voor groepen vanaf 15 personen, vaste prijs per persoon.',
    tekst: [
      'De BBQ is het afsluitende blok bij De Rijnstroom aan de Kromme Rijn, buiten aan het water in Amelisweerd. Twee uur onbeperkt drankjes zitten erbij, dus je hoeft niets na te rekenen achteraf.',
      'Dit blok kan vanaf 15 personen, hoger dan de andere onderdelen. Het combineert logisch met kanoën of suppen op dezelfde locatie: uit het water, douchen niet nodig, en aanschuiven.',
    ],
    vragen: [
      { q: 'Vanaf hoeveel personen?', a: 'Vanaf 15 personen, tot maximaal 40.' },
      { q: 'Zijn drankjes inbegrepen?', a: 'Ja, twee uur onbeperkt drankjes zitten in de prijs.' },
      { q: 'Is er een vegetarische optie?', a: 'Ja, geef bij het boeken door hoeveel personen vegetarisch eten.' },
      { q: 'Kan het in de winter?', a: 'Nee, de BBQ kan van april tot en met oktober. In de winter sluit je af met een winterborrel in het centrum.' },
    ],
  },

  domtoren: {
    titel: 'Domtoren beklimmen met een groep',
    beschrijving:
      '465 treden omhoog met een gids, uitzicht over Utrecht. Voor groepen vanaf 8 personen, toegang en gids inbegrepen.',
    tekst: [
      'De Domtoren is met 112 meter de hoogste kerktoren van Nederland. Je gaat met een gids 465 treden omhoog en staat daarna boven de stad, met bij helder weer zicht tot aan Amsterdam.',
      'De beklimming duurt een uur en is het enige onderdeel waarbij conditie meespeelt. Bij gemengde groepen plannen we het meestal in de ochtend, als iedereen nog fris is.',
    ],
    vragen: [
      { q: 'Hoeveel treden zijn het?', a: '465. De beklimming gaat in etappes met rustpunten onderweg.' },
      { q: 'Is het geschikt voor iedereen?', a: 'Je moet redelijk ter been zijn. Er is geen lift en de trap is smal en steil.' },
      { q: 'Hoe lang duurt het?', a: 'Ongeveer een uur, inclusief uitleg van de gids.' },
    ],
  },

  'kickbike-tocht': {
    titel: 'Kickbike-tocht Utrecht voor groepen',
    beschrijving:
      'Zelfstandig een vaste route langs de Kromme Rijn tussen het centrum en Amelisweerd. Voor groepen vanaf 8 personen.',
    tekst: [
      'De kickbike-tocht verbindt de twee plekken waar de rest van de dag zich afspeelt: het centrum en Amelisweerd. Je stept zelfstandig een vaste route langs de Kromme Rijn, ongeveer anderhalf tot twee uur.',
      'De kickbikes staan klaar met een slot; de code en de route krijg je de dag ervoor. Zoek je alleen kickbikes zonder programma eromheen, bijvoorbeeld voor een middag of een weekend, kijk dan op stepverhuurutrecht.nl.',
    ],
    vragen: [
      { q: 'Wat is een kickbike?', a: 'Een grote step met fietswielen. Je staat erop en zet af met één voet; sneller en comfortabeler dan een gewone step.' },
      { q: 'Is er begeleiding onderweg?', a: 'Nee, de groep gaat zelfstandig. Je krijgt de route en de slotcode van tevoren.' },
      { q: 'Ik wil alleen kickbikes huren, kan dat hier?', a: 'Niet via deze pagina. Voor losse verhuur zonder programma ga je naar stepverhuurutrecht.nl.' },
    ],
    verwijzing: {
      tekst: 'Alleen kickbikes huren, zonder programma eromheen?',
      href: 'https://stepverhuurutrecht.nl',
      link: 'Ga naar Stepverhuur Utrecht',
    },
  },

  picknick: {
    titel: 'Picknick met een groep in Amelisweerd',
    beschrijving:
      'Verzorgd picknickpakket per persoon bij De Rijnstroom aan de Kromme Rijn. Voor groepen vanaf 8 personen.',
    tekst: [
      'De picknick is de lunchvariant voor dagen bij het water. Je haalt de pakketten op bij De Rijnstroom en eet aan de Kromme Rijn, in het groen van Amelisweerd.',
      'Het is de rustigste manier om de dag in tweeën te delen: na het kanoën of suppen even zitten, en daarna weer verder.',
    ],
    vragen: [
      { q: 'Wat zit er in het pakket?', a: 'Een verzorgd picknickpakket per persoon. Geef dieetwensen door bij het boeken.' },
      { q: 'Waar eet je?', a: 'Bij De Rijnstroom aan de Kromme Rijn, in Amelisweerd.' },
      { q: 'Kan het in de winter?', a: 'Nee, de picknick loopt van april tot en met oktober. In de winter is er een winterse lunch in het centrum.' },
    ],
  },

  borrel: {
    titel: 'Borrel met een groep in Utrecht',
    beschrijving:
      'Afsluitende borrel met twee drankjes en bitterballen bij Paardenveld. Voor groepen vanaf 8 personen, vaste prijs per persoon.',
    tekst: [
      'Het afsluitende blok: twee drankjes per persoon met bitterballen, bij de JEU de boules bar aan Paardenveld. Vaste prijs, dus geen rekening achteraf die hoger uitvalt dan gedacht.',
      'Op vijf minuten lopen van Utrecht Centraal, wat handig is als mensen daarna de trein pakken.',
    ],
    vragen: [
      { q: 'Hoeveel drankjes zitten erbij?', a: 'Twee per persoon, plus bitterballen.' },
      { q: 'Kan er meer gedronken worden?', a: 'Ja, extra drankjes reken je ter plekke af.' },
      { q: 'Hoe laat is de borrel?', a: 'In het afsluitende tijdvak, van 16:30 tot 18:00.' },
    ],
  },

  groepslunch: {
    titel: 'Groepslunch in Utrecht centrum',
    beschrijving:
      'Vast lunchmenu voor groepen vanaf 8 personen op een vaste locatie in het centrum van Utrecht. Ook vegetarisch.',
    tekst: [
      'Een vast lunchmenu op een vaste locatie in het centrum, zodat je vooraf weet wat het kost en hoe lang het duurt. Een uur, inclusief frisdrank of koffie.',
      'Vegetarisch kan zonder meerprijs. Geef bij het boeken door hoeveel personen dat zijn.',
    ],
    vragen: [
      { q: 'Hoe lang duurt de lunch?', a: 'Een uur, van 12:30 tot 13:30.' },
      { q: 'Is vegetarisch mogelijk?', a: 'Ja, zonder meerprijs. Doorgeven bij het boeken.' },
      { q: 'Waar is het?', a: 'Op een vaste horecalocatie in het centrum van Utrecht, op loopafstand van de andere onderdelen.' },
    ],
  },

  'koffie-met-gebak': {
    titel: 'Ontvangst met koffie en gebak in Utrecht',
    beschrijving:
      'Rustig beginnen met koffie, thee en gebak bij Paardenveld, op vijf minuten van Utrecht Centraal. Vanaf 8 personen.',
    tekst: [
      'Het openingsblok. De groep verzamelt bij de JEU de boules bar aan Paardenveld, op vijf minuten lopen van Utrecht Centraal, zodat late treinen niet meteen het programma in de war schoppen.',
      'Een half uur koffie, thee en gebak. Daarna begint het eerste onderdeel.',
    ],
    vragen: [
      { q: 'Hoe laat is de ontvangst?', a: 'Van 09:30 tot 10:00.' },
      { q: 'Waar is het?', a: 'JEU de boules bar aan Paardenveld, vijf minuten lopen vanaf Utrecht Centraal.' },
    ],
  },

  gluhwein: {
    titel: 'Glühwein-ontvangst voor groepen in Utrecht',
    beschrijving:
      'Winterse ontvangst met glühwein of warme chocolademelk bij Paardenveld. Voor groepen vanaf 8 personen, november tot maart.',
    tekst: [
      'De winterversie van de ontvangst: glühwein of warme chocolademelk met iets lekkers erbij, binnen bij Paardenveld.',
      'Dit blok loopt van november tot en met maart en zit standaard in het winterpakket Warme Winterdag.',
    ],
    vragen: [
      { q: 'Is er ook iets zonder alcohol?', a: 'Ja, warme chocolademelk is het alternatief.' },
      { q: 'Wanneer kan dit?', a: 'Van november tot en met maart.' },
    ],
  },

  winterlunch: {
    titel: 'Winterse lunch voor groepen in Utrecht',
    beschrijving:
      'Erwtensoep of stamppot voor groepen vanaf 8 personen, in het centrum van Utrecht. Ook vegetarisch, november tot maart.',
    tekst: [
      'Erwtensoep of stamppot op een vaste locatie in het centrum, als lunch tussen twee winterse blokken door.',
      'Vegetarisch kan. Dit blok loopt van november tot en met maart.',
    ],
    vragen: [
      { q: 'Wat wordt er geserveerd?', a: 'Erwtensoep of stamppot, met frisdrank of koffie erbij.' },
      { q: 'Is vegetarisch mogelijk?', a: 'Ja, doorgeven bij het boeken.' },
    ],
  },
};

export function seoVoorBouwsteen(slug: string) {
  return BOUWSTEEN_SEO[slug] ?? null;
}

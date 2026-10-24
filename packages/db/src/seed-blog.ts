/**
 * Seed 5 SEO-blog artikelen voor DagjeUtrecht.nl.
 * Elke titel bevat een longtail-zoekterm die goed rankt bij Google.
 *
 * Run: pnpm --filter @utrecht/db seed:blog
 */
import { PrismaClient, Domain, Locale } from '@prisma/client';

const prisma = new PrismaClient();

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  heroImageQuery: string;
  metaTitle?: string;
  metaDesc?: string;
};

const POSTS: Post[] = [
  {
    slug: 'bedrijfsuitje-utrecht-10-beste-opties',
    title: 'Bedrijfsuitje Utrecht: 10 beste opties in 2026',
    metaTitle: 'Bedrijfsuitje Utrecht 2026 - 10 beste opties + prijzen',
    metaDesc:
      'Zoekt u het perfecte bedrijfsuitje in Utrecht? Van escaperoom tot rondvaart en bierbrouwerij: 10 top-opties met prijzen en groepsgroottes.',
    excerpt:
      'Op zoek naar het perfecte bedrijfsuitje in Utrecht? Wij zetten 10 populaire opties op een rij, met prijzen en groepsgroottes.',
    heroImageQuery: 'team,office,collaboration',
    body: `Een bedrijfsuitje in Utrecht organiseren is makkelijker dan je denkt - als je weet waar je moet zoeken. In deze gids zetten we tien opties op een rij die zichzelf hebben bewezen bij honderden Utrechtse groepen.

## 1. Escaperoom in het centrum
Perfect voor teams van 4 tot 8. Vraagt samenwerking, verlaagt de drempel en zorgt binnen een uur voor gesprek. Rekening houden met 25 euro per persoon.

## 2. Rondvaart met borrel
De klassieker die nooit teleurstelt. Anderhalf uur over de Utrechtse grachten, drankjes aan boord en een rustige start voor een teamdag.

## 3. Bierproeverij bij Brouwerij Maximus
Voor teams die iets willen leren over Utrecht en tegelijk plezier willen maken. Twee uur, inclusief rondleiding en proeverij.

## 4. SUP-tocht via DagjeSuppen
Sportiever, buiten, en het bewijs dat je collega's ook boven water blijven. Anderhalf uur op de grachten.

## 5. Jeu de boules met borrel
Laagdrempelig, iedereen kan meedoen. Perfect voor gemengde teams en langere avonden.

## 6. Vechtsebanen bowling
Twintig banen, dus grote groepen kunnen tegelijk. Combineer met een borrel of diner.

## 7. Food tour door Utrecht
Culinair Utrecht in twee uur - voor teams die tussen de gangen door willen bijkletsen.

## 8. Kookworkshop bij Kookfabriek
Samen koken, samen eten. Perfect voor kleinere teams (6-16 personen).

## 9. Padel Utrecht
Nieuwer, actiever, en dé teambuilding-trend van 2026. Instructie mogelijk voor beginners.

## 10. VR Playground The Park
Immersieve escape-ervaringen in virtual reality. Ideaal voor tech-teams of jongere groepen.

## Zelf samenstellen?
Vindt u niet direct wat past? Bekijk de vaste pakketten en prijzen op de pagina [bedrijfsuitje in Utrecht](/bedrijfsuitje-utrecht), of combineer eenvoudig activiteiten, lunch en borrel tot een eigen programma. Onze AI-gids helpt u binnen 2 minuten aan een concreet voorstel, en Ger stuurt binnen 48 uur een sluitende offerte.
`,
  },
  {
    slug: 'vrijgezellenfeest-utrecht-ideeen',
    title: 'Vrijgezellenfeest Utrecht: 15 ideeën voor bruid en bruidegom',
    metaTitle: 'Vrijgezellenfeest Utrecht - 15 ideeën (dames + heren)',
    metaDesc:
      'Vrijgezellenfeest in Utrecht organiseren? 15 originele ideeën voor de vrouw en de man: van SUP tot high tea, bier tot escaperoom.',
    excerpt:
      'Utrecht is dé stad voor een spraakmakend vrijgezellenfeest. Vijftien ideeën die aanslaan bij zowel BJ als BA.',
    heroImageQuery: 'bachelorette,party,friends',
    body: `Een vrijgezellenfeest in Utrecht organiseren betekent kiezen: buiten of binnen, sportief of luxe, dag of avond. Wij zetten vijftien ideeën op een rij die bij Utrechtse groepen goed vallen.

## Voor de vrouw (BJ)

### 1. SUP op de grachten
De perfecte start: buiten, actief, en instant gespreksstof voor de rest van de dag.

### 2. High tea aan de Domtoren
Klassiek, chique en fotogeniek. Reserveer op tijd - populair.

### 3. Kookworkshop met bubbels
Samen tapas of pasta bereiden, met wijn erbij. Ontspannen en toch een activiteit.

### 4. Wellness bij Amara Privé-spa
Ultiem cadeau: prive-wellness met sauna en massages. Vraagt tijdig boeken.

### 5. Rondvaart met bubbels
Klassieker, altijd raak. Prive-boot huren voor de groep is mogelijk.

### 6. Dansworkshop
Van salsa tot pole dance - laat je verrassen wat er in Utrecht mogelijk is.

## Voor de man (BA)

### 7. Bierproeverij bij Oproer Brouwerij
Craft beer, bites, en een sfeer waar je van blijft plakken. Perfect als opwarmer.

### 8. Escaperoom + BBQ
Actie eerst, eten daarna. Voor teams die van uitdagingen houden.

### 9. Kanoen door de grachten
Sportief, gezellig en betaalbaar. Combineer met streetfood-lunch.

### 10. Pubcrawl door studentenkroegen
Utrecht heeft de mooiste bruine cafés van Nederland. Gids optioneel.

### 11. Whisky- of gin-proeverij
Voor de connaisseur. Verschillende locaties in Utrecht bieden dit aan.

## Beiden

### 12. VR Playground
Escape-ervaring in virtual reality - iedereen kan meedoen, geen ervaring nodig.

### 13. Vechtsebanen bowling met borrel
Klassieker die altijd werkt. Twintig banen, dus grote groepen ook geen probleem.

### 14. Padel-workshop
Actief, sociaal en de trend van 2026.

### 15. Rondvaart + diner
Dagvullend, all-in, geen zorgen. Vanaf 79 euro per persoon.

## Alles regelen in één keer
Bekijk de pakketten op de pagina [vrijgezellenfeest in Utrecht](/vrijgezellenfeest-utrecht): activiteit, lunch en avondprogramma in één prijs per persoon. Ger regelt alle boekingen en stuurt binnen 48 uur een offerte.
`,
  },
  {
    slug: 'schoolreis-utrecht-educatief-veilig',
    title: 'Schoolreis Utrecht: educatief, veilig en betaalbaar',
    metaTitle: 'Schoolreis Utrecht - educatief, veilig, betaalbaar programma',
    metaDesc:
      'Op zoek naar een schoolreis in Utrecht die zowel leerzaam als leuk is? Programmatips voor basisschool t/m mbo, inclusief prijsindicatie.',
    excerpt:
      'Van Domtoren tot Spoorwegmuseum - Utrecht biedt schoolgroepen educatieve dagprogrammas met veiligheid en betaalbaarheid op orde.',
    heroImageQuery: 'schoolchildren,museum,fieldtrip',
    body: `Utrecht is een ideale bestemming voor schoolreizen: compact centrum, rijke geschiedenis en veel indoor-alternatieven bij regen. In deze gids een overzicht van programma-onderdelen die aansluiten bij verschillende leeftijdsgroepen.

## Basisschool (groep 6-8)

### Domtoren beklimmen
Een van de hoogste kerktorens van Nederland. Kinderen krijgen bewegingsopdrachten onderweg en leren over middeleeuws Utrecht. 465 treden, dus bewegen inclusief.

### Miffy Museum
Voor jongere groepen: interactief museum rondom Dick Bruna. Vraagt tijdig boeken.

### Kinderboot varen
De Kleine Kapitein biedt korte vaartochten met kindvriendelijke uitleg over de grachten.

## Groep 8 afscheid

### Domtoren + DOMunder + rondvaart
Klassiek dagprogramma dat op alle scholen goed valt. Combineert historie boven en onder de grond met varen. Vanaf 25 euro per leerling.

### Spoorwegmuseum
Voor techniek-liefhebbers. Interactief, veel te doen, ideaal bij slechter weer.

## Voortgezet onderwijs

### Museum Speelklok
Muziekgeschiedenis komt hier tot leven met interactieve rondleidingen.

### Universiteitsmuseum + botanische tuin
Voor havo/vwo: raakt aan biologie, geschiedenis en universiteit als instituut.

### Free walking tour Utrecht
Historische stadswandeling met gids. Betaalbaar, en leerlingen leren te navigeren in de stad.

## MBO

### Kookworkshop of bierbrouwerij
Voor horeca-opleidingen. Praktische invulling van de dag.

### Bedrijfsbezoek + tour
Combineer een lokaal bedrijf (brouwerij, atelier) met een korte stadswandeling.

## Wat wij regelen

Op de pagina [schooluitje in Utrecht](/schooluitje-utrecht) stel je een schoolprogramma samen dat past bij de leeftijd van je groep. Wij regelen boekingen, vervoer optioneel, factuur op naam school, en zorgen voor een weer-alternatief. Binnen 48 uur een sluitende offerte.
`,
  },
  {
    slug: 'wat-te-doen-utrecht-groep-gids',
    title: 'Wat te doen in Utrecht met een groep? Complete gids',
    metaTitle: 'Wat te doen in Utrecht met een groep - complete gids 2026',
    metaDesc:
      'Groepsuitjes Utrecht: overzicht van 150+ activiteiten, restaurants en tips voor bedrijven, verenigingen, families en vrienden.',
    excerpt:
      'Utrecht is de perfecte stad voor groepen: compact, gevarieerd en met opties voor elk budget. Een complete gids.',
    heroImageQuery: 'group,friends,city',
    body: `Utrecht is klein genoeg om lopend te doen en groot genoeg om je te verrassen. Voor groepen tot 50 personen is er meer dan genoeg keuze. Deze gids helpt je bij het samenstellen.

## Overdag: buitenactiviteiten

### Water
- **SUP-tocht** via DagjeSuppen: 1,5 uur op de grachten, inclusief instructie
- **Kanotocht** via KanoHuren: idem, dan met kano
- **Rondvaart** via Schuttevaer of Utrecht Canal Cruises: passief en gezellig

### Wandelen en fietsen
- **Free walking tour** met lokale gids
- **Fietsverhuur** bij CS voor eigen route
- **Color Bike Tour**: begeleide fietstour door de stad

## Overdag: cultuur

### Musea die groepen aankunnen
- **Domtoren** (max 40 per groep, meerdere slots)
- **DOMunder** ondergrondse tour
- **Museum Speelklok** met live-demonstraties
- **Spoorwegmuseum** voor grotere groepen (150+)
- **Kasteel de Haar** voor arrangementen buiten de stad

## Middag/avond: eten en drinken

### Restaurants voor groepen 10+
- **Streetfood Club**: informeel, verschillende keukens
- **Hemel & Aarde**: gezelliger, wat chiquer
- **Beers & Barrels**: bierfocus, ruime zaal
- **Graaf Floris**: klassieker, gedegen keuken

### Bierbrouwerijen (proeverijen)
- **Brouwerij Maximus** met tour
- **Oproer Brouwerij** met keuken
- **De Leckere** op eigen locatie

## Actief indoor

### Voor grotere groepen
- **Vechtsebanen bowling**: 20 banen
- **Ping Pong Club**: 30+ tafels
- **JEU de Boules Bar**: klassiek in het centrum

### Voor kleinere groepen
- **Escape Rooms**: 4-8 per kamer
- **The Park VR**: virtual reality experiences
- **Kookworkshops**: 6-16 personen

## Zelf een programma samenstellen

Op de pagina [alle pakketten](/pakketten) combineer je activiteiten tot een compleet dagprogramma, of kies direct het pakket dat bij jullie gelegenheid past: [bedrijfsuitje](/bedrijfsuitje-utrecht), [personeelsuitje](/personeelsuitje-utrecht) of [familiedag](/familiedag-utrecht). Kies je doelgroep, budget en sfeer - onze AI-gids stelt binnen minuten iets voor. Ger regelt vervolgens alle boekingen en stuurt binnen 48 uur een offerte.
`,
  },
  {
    slug: 'teamuitje-ideeen-utrecht',
    title: 'Teamuitje ideeën Utrecht: van escaperoom tot bierbrouwerij',
    metaTitle: 'Teamuitje ideeën Utrecht 2026 - 12 ideeën die aanslaan',
    metaDesc:
      'Teamuitje in Utrecht organiseren? 12 ideeën met échte reviews van bedrijven: van escaperoom tot bierbrouwerij en padel.',
    excerpt:
      'Utrecht heeft alles voor een teamuitje: locaties, catering, activiteiten. Twaalf ideeën die zich hebben bewezen.',
    heroImageQuery: 'team,building,workshop',
    body: `Teamuitjes vragen om variatie: elk team heeft een eigen dynamiek. Deze twaalf ideeën komen keer op keer terug in de goede feedback van HR-managers en teamleiders die via DagjeUtrecht boekten.

## Voor teams tot 12 personen

### Escaperoom (Escape World, The Escape Domplein)
Perfecte teambuilding: samenwerken onder tijdsdruk. Kies twee kamers en laat teams tegen elkaar spelen.

### Kookworkshop (Kookfabriek, Chopsticks)
Samen koken, samen eten. Wat afspeelt in de keuken vertelt veel over teamdynamiek.

### Bierproeverij (Brouwerij Maximus)
Iets leren, iets proeven, en tegelijk gesprek. Werkt voor bijna elk team.

### VR Playground (The Park)
Nieuw, intens en gelijkspelend - ook mensen die "niet gamen" doen mee.

## Voor teams van 12-30

### Vechtsebanen bowling met catering
Klassieker die altijd werkt. Twintig banen, dus je kunt in teams verdelen.

### Padel-clinic
Trend van 2026. Weinig ervaring nodig, snelle leercurve, veel plezier.

### Kanotocht met borrel
Actief, buiten, en de borrel op de kade sluit het perfect af.

### Streetfood + rondvaart
Combinatie die goed werkt: eten uit verschillende hoeken, en een uur op het water.

## Voor teams van 30-100

### Grand Shuffle groepsdag
Meerdere spellen tegelijk (shuffleboard, ping pong, jeu de boules).

### Spoorwegmuseum met catering
Groot museum met veel te doen, plus verzorgde catering ter plaatse.

### Kasteel de Haar arrangement
Chique, historisch, iets buiten Utrecht - perfect voor MT-dagen.

### Foodhal-tour + workshop
Verschillende cateringspots + een gezamenlijke activiteit erna.

## Bonus: onze aanpak

Wij regelen alles op een factuur, met één contactpersoon (Ger). Geen 12 losse boekingen, geen chaos. Bekijk de vaste pakketten en prijzen op de pagina [teambuilding in Utrecht](/teambuilding-utrecht). Binnen 48 uur een sluitende offerte.
`,
  },
  {
    slug: 'personeelsuitje-utrecht-ideeen',
    title: 'Personeelsuitje Utrecht: ideeën voor jong en oud',
    metaTitle: 'Personeelsuitje Utrecht 2026 - ideeën voor jong en oud',
    metaDesc:
      'Personeelsuitje in Utrecht organiseren voor de hele vereniging? Ideeën die voor jong en oud werken, met jeu de boules, kanoën en een City Challenge.',
    excerpt:
      'Een personeelsuitje waar niemand bij afhaakt: wij zetten de ideeën op een rij die voor jong en oud werken.',
    heroImageQuery: 'colleagues,outdoor,games',
    body: `Bij een personeelsuitje zit vaak iedereen bij elkaar: de stagiair, de collega die net begint en degene die bijna met pensioen gaat. De vraag die personeelsverenigingen ons het vaakst stellen is simpel: wat kan iedereen meedoen, zonder dat het te sportief of te kinderachtig wordt?

## Wat werkt voor een gemengde groep

### Jeu de boules en shuffleboard
Allebei in twee worpen uit te leggen en zonder conditie te spelen. Precies waarom dit de vaste basis is van de meeste personeelsuitjes in Utrecht.

### De City Challenge
Een speurtocht te voet door de binnenstad, op eigen tempo. Werkt voor een groep van twintig of tachtig collega's tegelijk, zonder dat iemand hoeft te rennen.

### Kanoën in Amelisweerd
Voor de groep die liever buiten actief is. Alleen in het warmere seizoen, en wel vragen om een beetje beweeglijkheid.

## Wat het kost en hoe lang het duurt
Een middag na het werk met jeu de boules en een borrel heet bij ons Boules & Borrel. In de winter is er een variant met een glühwein-borrel erbij. Voor een hele dag, met de Domtoren en een lunch erbij, is er de Warme Winterdag in de winter en Amelisweerd Actief in het warmere seizoen. De actuele prijs per persoon staat op de pakketpagina, en is inclusief btw.

## Praktisch voor de personeelsvereniging
De factuur staat op naam van de vereniging of het bedrijf, en het aantal deelnemers kan tot een week voor de datum nog veranderen. Dat maakt plannen makkelijk, ook als niet iedereen meteen weet of hij kan.

## Zelf kiezen
Op de pagina [personeelsuitje in Utrecht](/personeelsuitje-utrecht) staan de pakketten met een vaste prijs per persoon. Ger regelt de boekingen bij onze partners en stuurt binnen 48 uur een offerte.
`,
  },
  {
    slug: 'bedrijfsevenement-utrecht-organiseren',
    title: 'Bedrijfsevenement organiseren in Utrecht: waar begin je',
    metaTitle: 'Bedrijfsevenement Utrecht organiseren - kick-off tot jubileum',
    metaDesc:
      'Een bedrijfsevenement organiseren in Utrecht: kick-off, jubileum of afdelingsdag. Praktische tips voor programma, locatie en budget.',
    excerpt:
      'Een kick-off, jubileum of afdelingsdag organiseren in Utrecht? Deze opbouw werkt bij de meeste bedrijfsevenementen.',
    heroImageQuery: 'corporate,event,city',
    body: `Een bedrijfsevenement is breder dan een gewoon bedrijfsuitje: het kan een kick-off zijn, een jubileum, een afscheid of de dag waarop twee afdelingen elkaar beter leren kennen. De vraag die wij het vaakst krijgen is waar je als organisator mee moet beginnen.

## Begin met het doel
Een kick-off vraagt om energie en een gezamenlijk startpunt. Een jubileum vraagt om terugblikken en vieren. Een afdelingsdag vraagt om elkaar beter leren kennen. Kies het programma op basis van wat de dag moet opleveren, niet op basis van wat het leukst klinkt.

## Een programma dat werkt
De opbouw die bij de meeste bedrijfsevenementen in Utrecht goed valt: eerst een activiteit waarbij mensen samen iets doen, zoals jeu de boules op de overdekte banen aan Paardenveld, dan een lunch, en aan het eind een borrel. Die volgorde zorgt dat er al gesprek is voordat de borrel begint.

## Midden in de stad
Alle vaste onderdelen zitten op loopafstand van elkaar en van Utrecht Centraal, dus er is geen vervoer nodig tussen de onderdelen. Dat is handig als gasten uit het hele land komen.

## Budget en factuur
Je ziet de prijs per persoon vooraf, inclusief btw, en de factuur staat op naam van het bedrijf. Dat maakt het makkelijk om een bedrijfsevenement voor te leggen aan de financiële afdeling.

## Direct aan de slag
Op de pagina [bedrijfsevenement in Utrecht](/bedrijfsevenement-utrecht) staan de pakketten met een vaste prijs per persoon. Ger regelt de reserveringen bij onze partners en stuurt binnen 48 uur een offerte.
`,
  },
  {
    slug: 'bedrijfsfeest-utrecht-locatie-en-programma',
    title: 'Bedrijfsfeest Utrecht: locatie en programma kiezen',
    metaTitle: 'Bedrijfsfeest Utrecht - locatie en programma kiezen',
    metaDesc:
      'Een bedrijfsfeest vieren in Utrecht: jubileum, afscheid of eindejaarsborrel. Tips voor locatie, programma en wat het betekent voor de sfeer.',
    excerpt:
      'Een jubileum, afscheid of eindejaarsborrel in Utrecht vieren? Dit bepaalt of een bedrijfsfeest blijft hangen.',
    heroImageQuery: 'celebration,drinks,office',
    body: `Een jubileum, een afscheid of het einde van het jaar vieren met het team: een bedrijfsfeest leeft of sterft bij de opbouw van de dag. De vraag die wij het meest horen van organisatoren is of je meteen moet beginnen met de borrel, of eerst iets anders.

## Eerst spelen, dan pas de borrel
Een feest dat begint met alleen een borrel, komt langzaam op gang: iedereen zoekt dezelfde paar collega's op die ze al kennen. Begin je eerst met een spel zoals jeu de boules of shuffleboard, dan heeft iedereen al iets samen gedaan voordat de drankjes komen, en lopen de gesprekken daarna makkelijker.

## In de zomer: naar buiten
Een BBQ aan het water in Amelisweerd werkt goed als het bedrijfsfeest in het warmere seizoen valt. Buiten, informeel, en met ruimte om tussen de gangen door te bewegen.

## In de winter: binnen en warm
Jeu de boules binnen, gevolgd door een glühwein-borrel, past bij een eindejaarsfeest of kerstborrel. Het hele programma zit binnen, dus weer speelt geen rol.

## Wat het betekent voor de keuze
Vier het feest op naam van een jubileum of afscheid? Kies dan een programma met wat meer tijd voor speeches en een toost. Is het puur een eindejaarsborrel? Dan kan het compacter, met meer tijd voor de borrel zelf.

## Boeken
Op de pagina [bedrijfsfeest in Utrecht](/bedrijfsfeest-utrecht) staan de pakketten met een vaste prijs per persoon, inclusief btw. Ger regelt de reserveringen en stuurt binnen 48 uur een offerte.
`,
  },
  {
    slug: 'familiedag-utrecht-programma-met-kinderen',
    title: 'Familiedag Utrecht: een programma voor jong en oud',
    metaTitle: 'Familiedag Utrecht - programma voor collega’s en kinderen',
    metaDesc:
      'Familiedag organiseren in Utrecht met collega’s, partners en kinderen? Programmatips die werken voor alle leeftijden, met en zonder trappen.',
    excerpt:
      'Collega’s nemen hun gezin mee: wat een familiedag in Utrecht voor jong en oud laat werken.',
    heroImageQuery: 'family,day,outdoor',
    body: `Bij een familiedag gaan niet alleen collega's mee, maar ook partners en kinderen. Dat verandert de vraag die je jezelf als organisator stelt: niet "wat is leuk voor het team", maar "wat kan iedereen van 6 tot 66 jaar meedoen".

## Kies onderdelen zonder drempel
Een rondvaart door de grachten vraagt niets van deelnemers: geen conditie, geen trappen, en kinderen vinden het water al leuk. De City Challenge doe je te voet, op eigen tempo, dus een ouder met een kinderwagen kan gewoon meedoen. Jeu de boules op overdekte banen is in twee worpen uitgelegd.

## Let op met jonge kinderen
De Domtoren heeft 465 treden en is niet geschikt voor wie hoogtevrees heeft of slecht ter been is: met jonge kinderen kies je dan liever de rondvaart. Suppen kan alleen als iedereen kan zwemmen. Geef de leeftijden van de kinderen door bij de aanvraag, dan houden wij er rekening mee.

## Als het warmer is
Van april tot en met oktober kan de groep ook kanoën op de Kromme Rijn in Amelisweerd: actiever, maar nog steeds te doen voor de meeste leeftijden.

## Iets extra's
Bowlen, pingpong of virtual reality zijn populair bij families maar hebben geen vaste prijs. Die vraag je apart aan, en dan krijg je binnen een werkdag een voorstel met een prijs per persoon.

## Eén factuur
Je hoeft niet zelf met de rederij, de boulesbar en de lunchzaak te schakelen. Op de pagina [familiedag in Utrecht](/familiedag-utrecht) staan de pakketten; wij reserveren alles bij onze partners en je krijgt één factuur op naam van het bedrijf.
`,
  },
  {
    slug: 'winteruitje-utrecht-ideeen',
    title: 'Winteruitje Utrecht: ideeën voor een kerstuitje of eindejaarsborrel',
    metaTitle: 'Winteruitje Utrecht - ideeën voor kerstuitje en eindejaar',
    metaDesc:
      'Winteruitje of kerstuitje organiseren in Utrecht? Glühwein, de Domtoren, jeu de boules binnen en een borrel: ideeën voor de koude maanden.',
    excerpt:
      'Een winteruitje of kerstuitje in Utrecht hoeft niet van het weer af te hangen. Deze ideeën werken ook bij regen of kou.',
    heroImageQuery: 'winter,mulled wine,friends',
    body: `In de winter valt een buitenactiviteit al snel af door kou of regen. De vraag die wij dan het meest krijgen: wat kan een team of bedrijf in Utrecht doen dat niet van het weer afhangt, en toch het gevoel van een echt uitje geeft?

## Binnen, warm en toch Utrecht
De winterpakketten in Utrecht draaien allemaal om JEU de boules bar aan Paardenveld, vijf minuten lopen van Utrecht Centraal. Jeu de boules binnen, lunch van de kaart en een glühwein-borrel: alles onder één dak, dus een natte of koude dag maakt weinig uit.

## De Domtoren erbij
Voor een hele dag kan de groep eerst de Domtoren op. 465 treden, dus niet geschikt voor wie slecht ter been is of hoogtevrees heeft, maar voor de rest van de groep een stevig begin van de dag voordat de lunch en het boulen volgen.

## Ook zonder alcohol
Bij de glühwein-borrel kan iedereen kiezen tussen glühwein en warme chocolademelk, dus een winteruitje werkt ook voor collega's die geen alcohol drinken.

## Als kerstuitje of eindejaarsborrel
In december is een winteruitje een logische afsluiting van het jaar. Kies een kortere middag als het team na het werk wil beginnen, of een hele dag als jullie er met het bedrijf echt een dag voor vrijmaken.

## Boeken
Op de pagina [winteruitje in Utrecht](/winteruitje-utrecht) staan de pakketten met een vaste prijs per persoon, van november tot en met maart. Ger regelt de reserveringen en stuurt binnen 48 uur een offerte.
`,
  },
];

/**
 * Eigen foto's uit apps/web-dagje/public/fotos (DAG-01). Eerder stonden hier
 * loremflickr-adressen, maar die dienst gaf vaak een fout.
 */
const BLOG_FOTO: Record<string, string> = {
  'bedrijfsuitje-utrecht-10-beste-opties': '/fotos/sfeer-collegas-terras-oudegracht.webp',
  'teamuitje-ideeen-utrecht': '/fotos/sfeer-team-jeu-de-boules-binnen.webp',
  'vrijgezellenfeest-utrecht-ideeen': '/fotos/suppen-vrijgezellen-utrecht.jpg',
  'schoolreis-utrecht-educatief-veilig': '/fotos/domtoren-utrecht.jpg',
  'wat-te-doen-utrecht-groep-gids': '/fotos/oudegracht-terrassen-domtoren.jpg',
  'personeelsuitje-utrecht-ideeen': '/fotos/picknick-groep-utrecht.jpg',
  'bedrijfsevenement-utrecht-organiseren': '/fotos/terrassen-winkel-van-sinkel.jpg',
  'bedrijfsfeest-utrecht-locatie-en-programma': '/fotos/oudegracht-avond.jpg',
  'familiedag-utrecht-programma-met-kinderen': '/fotos/jeu-de-boules-binnen.jpg',
  'winteruitje-utrecht-ideeen': '/fotos/utrecht-winter-sneeuw.jpg',
};

async function main() {
  console.log(`Seed ${POSTS.length} SEO-blog artikelen...\n`);

  for (const post of POSTS) {
    const heroImage = BLOG_FOTO[post.slug] ?? null;
    await prisma.blogPost.upsert({
      where: {
        domain_locale_slug: {
          domain: Domain.DAGJEUTRECHT,
          locale: Locale.nl,
          slug: post.slug,
        },
      },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        body: post.body,
        heroImage,
        metaTitle: post.metaTitle,
        metaDesc: post.metaDesc,
        published: true,
        publishedAt: new Date(),
      },
      create: {
        domain: Domain.DAGJEUTRECHT,
        locale: Locale.nl,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        body: post.body,
        heroImage,
        metaTitle: post.metaTitle,
        metaDesc: post.metaDesc,
        authorName: 'Ger Manders',
        published: true,
        publishedAt: new Date(),
      },
    });
    console.log(`  ok  ${post.slug}`);
  }

  console.log(`\nKlaar. ${POSTS.length} blogposts gepubliceerd.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

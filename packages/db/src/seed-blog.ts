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
Vindt u niet direct wat past? Op DagjeUtrecht.nl combineert u eenvoudig activiteiten, lunch en borrel tot een compleet programma. Onze AI-gids helpt u binnen 2 minuten aan een concreet voorstel, en Ger stuurt binnen 48 uur een sluitende offerte.
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
Op DagjeUtrecht.nl stel je zelf een vrijgezellenprogramma samen: activiteit + lunch + avondprogramma in een pakket. Ger regelt alle boekingen en stuurt binnen 48 uur een offerte.
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

Op DagjeUtrecht.nl stel je een schoolprogramma samen dat past bij de leeftijd van je groep. Wij regelen boekingen, vervoer optioneel, factuur op naam school, en zorgen voor een weer-alternatief. Binnen 48 uur een sluitende offerte.
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

Op DagjeUtrecht.nl combineer je activiteiten uit onze 150+ leveranciers tot een compleet dagprogramma. Kies je doelgroep, budget en sfeer - onze AI-gids stelt binnen minuten iets voor. Ger regelt vervolgens alle boekingen en stuurt binnen 48 uur een offerte.
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

Wij regelen alles op een factuur, met één contactpersoon (Ger). Geen 12 losse boekingen, geen chaos. Op DagjeUtrecht.nl kies je activiteiten, wij regelen de rest. Binnen 48 uur een sluitende offerte.
`,
  },
];

async function main() {
  console.log(`Seed ${POSTS.length} SEO-blog artikelen...\n`);

  for (const post of POSTS) {
    const heroImage = `https://loremflickr.com/1200/600/${post.heroImageQuery}?lock=${post.slug.length}`;
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

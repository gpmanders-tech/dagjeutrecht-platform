import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, FaqSchema } from '../../components/seo-jsonld';
import { LandingCTA } from '../../components/landing-cta';

export const metadata: Metadata = {
  title: 'Bedrijfsuitje Utrecht - actief en volledig verzorgd | DagjeUtrecht',
  description:
    'Bedrijfsuitje in Utrecht organiseren zonder gedoe: 150+ activiteiten, één aanspreekpunt en een sluitende offerte binnen 48 uur. Vraag nu aan.',
  alternates: { canonical: 'https://dagjeutrecht.nl/bedrijfsuitje-utrecht' },
  openGraph: {
    title: 'Bedrijfsuitje Utrecht - actief en volledig verzorgd',
    description:
      'Van escaperoom tot bierbrouwerij en rondvaart. Wij regelen álles voor jouw team. Offerte binnen 48u.',
    url: 'https://dagjeutrecht.nl/bedrijfsuitje-utrecht',
  },
};

const faq = [
  {
    q: 'Wat kost een bedrijfsuitje in Utrecht gemiddeld?',
    a: 'Een halve dag met één activiteit, lunch en borrel kost gemiddeld €45-75 per persoon. Voor een hele dag met meerdere onderdelen en diner ligt de indicatie tussen €95 en €150 per persoon. Op maat maken kan altijd - klein budget of premium arrangement.',
  },
  {
    q: 'Krijgen we één factuur op naam van het bedrijf?',
    a: 'Ja, altijd. Ook als jullie meerdere leveranciers combineren tot één programma. Wij factureren via WeFact, met BTW-specificatie en betaaltermijn van 14 dagen (of anders in overleg).',
  },
  {
    q: 'Vanaf hoeveel personen kunnen jullie iets regelen?',
    a: 'Vanaf 6 personen is een compleet dagprogramma haalbaar. Grote groepen tot 100+ personen ook geen probleem - wij hebben partnerlocaties die dat aankunnen (zoals Vechtsebanen Bowling, Werkspoorkathedraal en Kasteel de Haar).',
  },
  {
    q: 'Zijn de activiteiten geschikt voor gemengde teams?',
    a: 'De meeste wel. We kiezen bewust programma\'s waar iedereen op eigen niveau kan meedoen (bijv. jeu de boules, escaperoom, rondvaart, bierproeverij). Fysiek zware onderdelen zoals SUP of climbing zijn optioneel.',
  },
  {
    q: 'Hoe snel weten we of de datum beschikbaar is?',
    a: 'Binnen 48 uur na je aanvraag heb je een sluitende offerte met bevestigde beschikbaarheid. Bij last-minute (binnen 2 weken) proberen we het uiteraard sneller.',
  },
];

const activiteiten = [
  { slug: 'escape-world', naam: 'Escape World', tijd: '1u', voor: 'teams van 4-8' },
  { slug: 'brouwerij-maximus', naam: 'Brouwerij Maximus', tijd: '2u', voor: 'proeverij + tour' },
  { slug: 'schuttevaer', naam: 'Rondvaart Schuttevaer', tijd: '1,5u', voor: 'gezellig, verbindend' },
  { slug: 'dagjesuppen', naam: 'DagjeSuppen', tijd: '1,5u', voor: 'sportief, buiten' },
  { slug: 'vechtsebanen-bowling', naam: 'Vechtsebanen Bowling', tijd: '1,5u', voor: 'grote groepen' },
  { slug: 'padel-utrecht', naam: 'Padel Utrecht', tijd: '1u', voor: 'actief teamevent' },
];

export default function BedrijfsuitjeUtrecht() {
  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Bedrijfsuitje Utrecht', url: '/bedrijfsuitje-utrecht' },
        ]}
      />
      <FaqSchema items={faq} />

      <section className="bg-canal-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-cream/70 text-sm mb-2">Voor HR, MT en teamleiders</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            Bedrijfsuitje in Utrecht: actief en volledig verzorgd
          </h1>
          <p className="text-xl text-cream/90 max-w-2xl">
            Van escaperoom tot bierbrouwerij, van rondvaart tot padel-clinic. Jij kiest de sfeer -
            wij regelen álles daaromheen. Eén aanspreekpunt, één factuur, één zorgeloos programma.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/samensteller?doelgroep=teamuitje"
              className="inline-flex items-center rounded-full bg-terracotta-500 hover:bg-terracotta-400 px-6 py-3 font-medium text-white shadow-lg"
            >
              Stel je bedrijfsuitje samen →
            </Link>
            <Link
              href="/aanbod?audience=teamuitje"
              className="inline-flex items-center rounded-full border border-white/40 hover:border-white/70 px-6 py-3 font-medium text-white"
            >
              Bekijk alle activiteiten
            </Link>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-14 text-canal-800 space-y-6 leading-relaxed">
        <p className="text-lg">
          Een bedrijfsuitje in Utrecht organiseren betekent normaal: bellen met vijf locaties,
          drie e-mailwisselingen per boeking, en toch nog last-minute een puzzelstukje missen.
          DagjeUtrecht neemt dat werk uit handen. Jij kiest activiteiten uit onze catalogus van
          150+ getoetste leveranciers, wij regelen de boekingen, de catering, het vervoer en de
          factuur - alles onder één aanspreekpunt.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Waarom via DagjeUtrecht?</h2>
        <p>
          Utrecht heeft alles voor een geslaagd teamuitje - alleen is de coördinatie er niet naar.
          Wij hebben de afgelopen jaren honderden groepsprogramma\'s samengesteld en weten precies
          welke combinaties werken bij welk type team. Escaperoom + streetfood + rondvaart is een
          klassieker die zich keer op keer bewijst. Bierbrouwerij + food tour werkt uitstekend voor
          teams die van proeven houden. En voor de sportievere teams zetten we SUP, padel of
          Vechtsebanen bowling in - waar tot 40 personen tegelijk kunnen bowlen.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Populaire activiteiten voor teams</h2>
        <p>
          Onze samensteller stelt in seconden een programma voor op basis van jouw team, budget en
          gewenste sfeer. Een greep uit wat goed werkt:
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 not-prose">
          {activiteiten.map((a) => (
            <li key={a.slug} className="rounded-2xl border border-canal-100 bg-white p-4">
              <Link href={`/aanbod/${a.slug}`} className="block group">
                <p className="font-serif text-lg text-canal-900 group-hover:text-terracotta-600">
                  {a.naam}
                </p>
                <p className="text-sm text-canal-600 mt-1">
                  {a.tijd} · {a.voor}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Hoe het werkt</h2>
        <p>
          <strong>1. Kies je programma.</strong> Op onze samensteller-pagina vertel je in twee
          minuten wie jullie zijn en wat jullie zoeken - onze AI-gids stelt direct 3-5
          activiteiten voor die aansluiten op teamgrootte, budget en sfeer. Je past aan, wijzigt,
          schuift met tijden tot het klopt.
        </p>
        <p>
          <strong>2. Vraag aan.</strong> Één klik op <em>Vraag aan Ger</em> en jouw wensen komen
          direct bij ons binnen. Geen 5 verschillende formulieren, geen offerte-jagen bij losse
          leveranciers.
        </p>
        <p>
          <strong>3. Wij regelen alles.</strong> Binnen 48 uur ontvang je een sluitende offerte
          met alles wat we bevestigd hebben: activiteiten, tijden, catering, factuurgegevens.
          Akkoord? Wij doen de rest, en jullie hoeven alleen te komen.
        </p>

        <LandingCTA
          title="Ready voor een teamuitje dat blijft hangen?"
          text="Onze samensteller helpt jullie in twee minuten aan een concreet voorstel. Vrijblijvend, binnen 48u een offerte op je bureau."
          href="/samensteller?doelgroep=teamuitje"
          primaryLabel="Vraag vrijblijvend een offerte aan voor jullie bedrijfsuitje"
        />

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Praktisch</h2>
        <p>
          <strong>Groepsgrootte:</strong> vanaf 6 personen, tot ~100 personen bij grotere
          arrangementen. Voor 100+ vragen we altijd contact op om te kijken hoe we het slim kunnen
          splitsen.
          <br />
          <strong>Locatie:</strong> hart van Utrecht - centraal station op loopafstand van 80% van
          onze activiteiten. Voor grotere groepen of externe locaties (Kasteel de Haar,
          Spoorwegmuseum, Amelisweerd) regelen we optioneel een touringcar.
          <br />
          <strong>Bereikbaarheid:</strong> Utrecht Centraal is het best-bereikbare station van
          Nederland. Ideaal voor teams die vanuit heel het land bijeen komen. Parkeergarage
          Griftpark of Jaarbeurs voor autobezoekers.
          <br />
          <strong>Weersafhankelijk?</strong> Elk buiten-programma heeft een indoor-alternatief dat
          we tot 24 uur van tevoren kunnen omschakelen zonder extra kosten.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Veelgestelde vragen</h2>
        <dl className="space-y-6">
          {faq.map((f, i) => (
            <div key={i}>
              <dt className="font-semibold text-canal-900">{f.q}</dt>
              <dd className="mt-1 text-canal-700">{f.a}</dd>
            </div>
          ))}
        </dl>

        <LandingCTA
          title="Klaar om de datum te prikken?"
          text="Vertel ons kort wie jullie zijn - binnen 48u ligt er een sluitende offerte op je bureau."
          href="/samensteller?doelgroep=teamuitje"
          primaryLabel="Start de aanvraag"
          variant="canal"
        />
      </article>
    </main>
  );
}

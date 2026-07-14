import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, FaqSchema } from '../../components/seo-jsonld';
import { LandingCTA } from '../../components/landing-cta';

export const metadata: Metadata = {
  title: 'Teambuilding Utrecht - samenwerken, strijden en lachen | DagjeUtrecht',
  description:
    'Teambuilding in Utrecht die impact heeft: van escaperoom tot padel-clinic, van kookworkshop tot brouwerij. Volledig verzorgd, offerte binnen 48u.',
  alternates: { canonical: 'https://dagjeutrecht.nl/teambuilding-utrecht' },
};

const faq = [
  {
    q: 'Wat is het verschil tussen een bedrijfsuitje en teambuilding?',
    a: 'Een bedrijfsuitje is puur voor plezier en verbinding, teambuilding heeft daarnaast een expliciet leerdoel: samenwerken, communicatie, vertrouwen of conflicthantering. Wij kunnen beide - vertel bij aanvraag welke uitkomst je wilt.',
  },
  {
    q: 'Werken jullie met professionele begeleiders?',
    a: 'Voor pure teambuilding-programma\'s (dus met reflectie en debrief) werken we samen met een aantal Utrechtse coaches en trainers die aansluiten bij de gekozen activiteit. Bij een lichter programma (escaperoom + borrel als teambouwer) is de leverancier de gastheer.',
  },
  {
    q: 'Welke activiteiten werken het best voor teambuilding?',
    a: 'Activiteiten die samenwerken vereisen: escaperoom (denken onder druk), kookworkshop (samen resultaat neerzetten), kanotocht (afstemming en communicatie), padel (samenspel met feedback), of een GPS-stadswandeling waar teams tegen elkaar strijden.',
  },
  {
    q: 'Kunnen jullie ook een halve dag verzorgen?',
    a: 'Ja - een halve dag (3-4 uur) is prima voor een kick-off, kerstborrel of teambuilding-middag. Onze best gewaardeerde halve-dag combinaties: escape + borrel, kookworkshop, of padel + hapjes.',
  },
  {
    q: 'Wat kost teambuilding in Utrecht per persoon?',
    a: 'Halve dag zonder begeleider: €35-55 per persoon. Halve dag met professionele coach en debrief: €75-125 per persoon. Hele dag met meerdere onderdelen en diner: €125-200 per persoon.',
  },
];

const activiteiten = [
  { slug: 'escape-world', naam: 'Escape World', tijd: '1u', voor: 'denken, samenwerken' },
  { slug: 'padel-utrecht', naam: 'Padel Utrecht clinic', tijd: '1u', voor: 'samenspel + reflectie' },
  { slug: 'kookfabriek', naam: 'Kookfabriek workshop', tijd: '2-3u', voor: 'gezamenlijk resultaat' },
  { slug: 'dagjesuppen', naam: 'SUP-tocht', tijd: '1,5u', voor: 'afstemming en vertrouwen' },
  { slug: 'brouwerij-maximus', naam: 'Brouwerij Maximus', tijd: '2u', voor: 'leren + samen proeven' },
  { slug: 'the-park-vr', naam: 'The Park VR Playground', tijd: '1u', voor: 'immersieve samenwerking' },
];

export default function TeambuildingUtrecht() {
  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Teambuilding Utrecht', url: '/teambuilding-utrecht' },
        ]}
      />
      <FaqSchema items={faq} />

      <section className="bg-canal-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-cream/70 text-sm mb-2">Voor HR, MT, teamleiders en coaches</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            Teambuilding in Utrecht: samenwerken, strijden en lachen
          </h1>
          <p className="text-xl text-cream/90 max-w-2xl">
            Programma\'s die impact hebben. Van escaperoom als samenwerkings-oefening tot
            padel-clinic met coach en debrief - wij combineren activiteit met betekenis. En het
            organiseren doen wij, jij focust op de mensen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/samensteller?doelgroep=teamuitje"
              className="inline-flex items-center rounded-full bg-terracotta-500 hover:bg-terracotta-400 px-6 py-3 font-medium text-white shadow-lg"
            >
              Stel je teambuilding-dag samen →
            </Link>
            <Link
              href="/aanbod?audience=teamuitje"
              className="inline-flex items-center rounded-full border border-white/40 hover:border-white/70 px-6 py-3 font-medium text-white"
            >
              Bekijk activiteiten
            </Link>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-14 text-canal-800 space-y-6 leading-relaxed">
        <p className="text-lg">
          Teambuilding is niet hetzelfde als een gezellige middag met de collega\'s. Bij goede
          teambuilding zit er een leerdoel achter: verbeterde samenwerking, betere communicatie,
          vertrouwen opbouwen of een lastig conflict beslechten. DagjeUtrecht combineert
          activiteiten die van nature groepsdynamiek uitlokken met - waar gewenst - professionele
          begeleiding en reflectiemomenten. Zo krijgen jullie een dag die niet alleen leuk is, maar
          ook iets oplevert.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Wat werkt en waarom</h2>
        <p>
          Sommige activiteiten zijn van nature betere teambuilders dan andere. Een escaperoom
          dwingt teams om onder tijdsdruk hun sterke punten te herkennen en te delegeren - je ziet
          binnen twintig minuten wie leiderschap pakt en wie coördineert. Een kookworkshop dwingt
          samenwerken naar één gedeeld resultaat: als één iemand mislukt, mist iedereen zijn
          voorgerecht. Kanotochten en SUP zijn communicatie-oefeningen in het klein - vaak met
          nat pak als straf.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Onze aanpak</h2>
        <p>
          Bij DagjeUtrecht bouwen we teambuilding op drie niveaus:
        </p>
        <p>
          <strong>Niveau 1 - impliciete teambuilding.</strong> Een activiteit die van nature
          samenwerking vereist. Escaperoom, kanotocht, kookworkshop. Geen coach, geen debrief.
          Vaak gecombineerd met een borrel of diner om na te praten. Halve dag, betaalbaar,
          effectief voor teams die al goed zijn maar even iets samen willen doen.
        </p>
        <p>
          <strong>Niveau 2 - actieve teambuilding.</strong> Een activiteit gecombineerd met een
          korte reflectie na afloop. Wij hebben ervaring met facilitators die na een escaperoom of
          padel-clinic een half uur begeleiden met vragen als "wie deed wat, wanneer, en waarom"
          - dat maakt patronen zichtbaar.
        </p>
        <p>
          <strong>Niveau 3 - begeleide teambuilding met leerdoel.</strong> Een hele dag onder
          begeleiding van een coach die vooraf met HR/MT afstemt wat het doel is. De activiteiten
          zijn opzichzelf leuk, maar de coach koppelt observaties expliciet aan het team. Voor
          teams die net zijn samengesteld, gefuseerd of net een moeilijke periode achter de rug
          hebben.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Populaire teambuilding-activiteiten</h2>
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

        <LandingCTA
          title="Klaar om je team écht iets mee te geven?"
          text="Vertel ons welke uitkomst je zoekt - een gezellige middag of een dag met impact. Binnen 48u een sluitend voorstel."
          href="/samensteller?doelgroep=teamuitje"
          primaryLabel="Vraag vrijblijvend een offerte aan voor jullie teambuilding"
        />

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Praktisch</h2>
        <p>
          <strong>Groepsgrootte:</strong> vanaf 6, meestal 8-30, met partnerlocaties tot 100+.
          Bij teambuilding met coach ligt het maximum lager (12-20 personen) voor kwaliteit van de
          reflectie.
          <br />
          <strong>Duur:</strong> minimaal 3 uur voor impliciete teambuilding, 5-6 uur voor
          actieve, 7-9 uur voor begeleide (inclusief lunch/diner).
          <br />
          <strong>Bereikbaarheid:</strong> Utrecht CS ligt centraal, ideaal voor teams uit heel
          Nederland. Parkeergarages op loopafstand van alle centrale activiteiten.
          <br />
          <strong>Combineerbaar:</strong> teambuilding overdag + gezamenlijk diner in de avond is
          een sterk format. Wij regelen ook overnachting in Utrechtse hotels als jullie er twee
          dagen van willen maken.
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
          title="Data en groepsgrootte al bekend?"
          text="Vertel ons kort wie jullie zijn en welk doel je hebt. Binnen 48u ligt er een sluitend voorstel op je bureau."
          href="/samensteller?doelgroep=teamuitje"
          primaryLabel="Start de aanvraag"
          variant="canal"
        />
      </article>
    </main>
  );
}

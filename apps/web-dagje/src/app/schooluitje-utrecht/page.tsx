import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, FaqSchema } from '../../components/seo-jsonld';
import { LandingCTA } from '../../components/landing-cta';

export const metadata: Metadata = {
  title: 'Schooluitje Utrecht - educatief, veilig en budget-vriendelijk | DagjeUtrecht',
  description:
    'Schooluitje in Utrecht organiseren zonder gedoe: educatieve programma\'s voor PO en VO, factuur op school, weer-alternatief inbegrepen. Offerte binnen 48u.',
  alternates: { canonical: 'https://dagjeutrecht.nl/schooluitje-utrecht' },
};

const faq = [
  {
    q: 'Wat kost een schooluitje in Utrecht per leerling?',
    a: 'Voor een halve dag met één activiteit ligt de indicatie op €12-18 per leerling. Een volledig dagprogramma met twee activiteiten en lunch: €22-35 per leerling. Basisschool doorgaans goedkoper dan VO/MBO omdat toegangsprijzen lager zijn.',
  },
  {
    q: 'Krijgen we een factuur op naam van de school?',
    a: 'Ja, dat is standaard. Wij factureren op naam van de school of stichting, met BTW-specificatie en een ruime betaaltermijn. Ook maatwerk (bijv. per klas apart of één verzamelfactuur) kan.',
  },
  {
    q: 'Zijn de programma\'s geschikt voor alle leeftijden?',
    a: 'We passen ze aan de leeftijd aan. Voor onderbouw PO focussen we op zintuigen en verwondering (Nijntje Museum, Museum Speelklok, Kleine Kapitein). Voor bovenbouw PO en VO: interactieve musea (Spoorwegmuseum, DOMunder), Domtoren-beklimming en fysieke activiteiten. MBO: workshops (kookfabriek, brouwerij) of praktische bedrijfsbezoeken.',
  },
  {
    q: 'Wat als het regent op de dag zelf?',
    a: 'Elk buiten-programma heeft een indoor-alternatief. We bellen bij twijfel de dag ervoor om te schakelen. Ook een half-nat programma (deel binnen, deel buiten) is mogelijk.',
  },
  {
    q: 'Zijn begeleiders welkom en tellen die mee in de prijs?',
    a: 'Vaak zijn begeleiders (docenten, ouders) gratis of tegen sterk gereduceerd tarief. De verhouding varieert per activiteit - meestal 1 gratis begeleider per 10 leerlingen. We regelen dat in de offerte.',
  },
];

const activiteiten = [
  { slug: 'domtoren', naam: 'Domtoren beklimmen', tijd: '1u', voor: 'groep 6 tot VO' },
  { slug: 'domunder', naam: 'DOMunder', tijd: '1u', voor: 'groep 7-8 en VO' },
  { slug: 'spoorwegmuseum', naam: 'Spoorwegmuseum', tijd: '2-3u', voor: 'grote groepen, hele dag' },
  { slug: 'miffy-museum', naam: 'Miffy Museum', tijd: '1u', voor: 'onderbouw PO' },
  { slug: 'museum-speelklok', naam: 'Museum Speelklok', tijd: '1u', voor: 'alle leeftijden' },
  { slug: 'kleine-kapitein', naam: 'De Kleine Kapitein varen', tijd: '1u', voor: 'PO' },
];

export default function SchooluitjeUtrecht() {
  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Schooluitje Utrecht', url: '/schooluitje-utrecht' },
        ]}
      />
      <FaqSchema items={faq} />

      <section className="bg-emerald-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-white/70 text-sm mb-2">Voor leerkrachten, ouderraad en directeuren</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            Schooluitje in Utrecht: actie en teambuilding voor elke klas
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Educatief, veilig, betaalbaar en met begeleiding waar dat mag. Van Nijntje voor de
            onderbouw tot Domtoren en Spoorwegmuseum voor bovenbouw en middelbaar - één contact,
            één factuur, één zorgeloos dagprogramma.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/samensteller?doelgroep=schoolgroep"
              className="inline-flex items-center rounded-full bg-terracotta-500 hover:bg-terracotta-400 px-6 py-3 font-medium text-white shadow-lg"
            >
              Stel jullie schooluitje samen →
            </Link>
            <Link
              href="/aanbod?audience=schoolgroep"
              className="inline-flex items-center rounded-full border border-white/40 hover:border-white/70 px-6 py-3 font-medium text-white"
            >
              Bekijk activiteiten voor scholen
            </Link>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-14 text-canal-800 space-y-6 leading-relaxed">
        <p className="text-lg">
          Een schooluitje in Utrecht organiseren voelt vaak als een tweede baan: verschillende
          musea bellen, twee busmaatschappijen vergelijken, lunch-arrangementen uitzoeken, EHBO
          checken. DagjeUtrecht ontzorgt scholen van A tot Z. Wij combineren educatieve
          activiteiten met veiligheid en een sluitende prijs per leerling - zodat jij je kan
          concentreren op de klas.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Utrecht is dé stad voor schoolreizen</h2>
        <p>
          Utrecht is compact genoeg om te belopen, groot genoeg voor gevarieerde programma\'s, en
          rijk aan educatieve locaties. De historische binnenstad, ondergrondse geschiedenis
          (DOMunder), techniekmusea, kinderboten en natuurlijk de Domtoren - alles ligt binnen
          twintig minuten lopen van elkaar of van Utrecht Centraal. Voor scholen die van verder
          komen: Utrecht CS is het best-bereikbare station van Nederland.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Programma per onderwijstype</h2>
        <p>
          <strong>Onderbouw PO (groep 1-4):</strong> zintuigen en verwondering. Nijntje Museum,
          Museum Speelklok met muziekdemonstraties, korte vaartocht met De Kleine Kapitein.
          Rustige tempo, veel interactie.
        </p>
        <p>
          <strong>Bovenbouw PO (groep 5-8):</strong> combinatiedagen die geschiedenis met actie
          verbinden. Domtoren + DOMunder + rondvaart is een klassieker voor groep 8-afscheid.
          Vanaf €25 per leerling.
        </p>
        <p>
          <strong>Voortgezet onderwijs:</strong> diepgang mag. Spoorwegmuseum voor techniek,
          Universiteitsmuseum voor wetenschap, Kasteel de Haar voor kunst en cultuur, of een
          begeleide stadswandeling met historisch thema.
        </p>
        <p>
          <strong>MBO en vervolgopleidingen:</strong> praktijkgerichte programma\'s. Kookworkshop
          bij Kookfabriek voor horeca-opleidingen, brouwerijbezoek bij Maximus voor voedings- of
          bedrijfsopleidingen, of een korte stadswandeling gecombineerd met een lokaal
          MKB-bezoek.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Populair bij scholen</h2>
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
          title="Klaar voor een schoolreis waar iedereen het over heeft?"
          text="Vertel ons welke groep, welke leeftijd en welk budget - binnen 48u een sluitende offerte, mét weer-alternatief inbegrepen."
          href="/samensteller?doelgroep=schoolgroep"
          primaryLabel="Vraag vrijblijvend een offerte aan voor jullie schooluitje"
        />

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Hoe het werkt</h2>
        <p>
          <strong>1. Aanvraag met klas-specificaties.</strong> Geef aan welke groep of klas, leeftijd,
          aantal leerlingen, aantal begeleiders, en welk budget je hebt. Onze samensteller stelt
          direct een passend programma voor.
        </p>
        <p>
          <strong>2. Sluitende offerte binnen 48u.</strong> Wij regelen alle boekingen, ronden
          begeleider-korting af en zetten catering (lunch, tussendoortje) klaar. Prijs per
          leerling inzichtelijk, geen verrassingen achteraf.
        </p>
        <p>
          <strong>3. Op de dag zelf: één contactpersoon.</strong> Ger of iemand van ons team is
          bereikbaar tijdens de dag. Bij regen schakelen we naar het indoor-alternatief, bij
          vertraging bellen we de eerstvolgende locatie.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Praktisch</h2>
        <p>
          <strong>Groepsgrootte:</strong> vanaf één klas (20-30 leerlingen) tot volledige
          jaarlagen (150+). Bij grotere groepen splitsen we in tandem-programma\'s zodat iedereen
          alles doet, alleen in andere volgorde.
          <br />
          <strong>Begeleiding:</strong> meestal 1 gratis begeleider per 10 leerlingen. Ouders die
          extra mee gaan tegen sterk gereduceerd tarief.
          <br />
          <strong>Vervoer:</strong> Utrecht CS ligt op maximaal 15 minuten lopen van 80% van onze
          activiteiten. Voor externe locaties (Kasteel de Haar) regelen we optioneel een
          touringcar met chauffeur.
          <br />
          <strong>Veiligheid en AVG:</strong> alle onze leveranciers werken conform gangbare
          veiligheidsnormen (verzekering, EHBO-plan, dienstverlener BSN-check). Foto\'s van
          leerlingen worden niet gepubliceerd zonder toestemming.
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
          title="Datum al bekend? Vraag direct aan."
          text="Onze samensteller vraagt in twee minuten alle info uit. Binnen 48u ligt er een sluitende offerte op je bureau."
          href="/samensteller?doelgroep=schoolgroep"
          primaryLabel="Start de aanvraag"
          variant="canal"
        />
      </article>
    </main>
  );
}

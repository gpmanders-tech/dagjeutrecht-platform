import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs, FaqSchema } from '../../components/seo-jsonld';
import { LandingCTA } from '../../components/landing-cta';

export const metadata: Metadata = {
  title: 'Vrijgezellenfeest Utrecht - onvergetelijke dag voor de groep | DagjeUtrecht',
  description:
    'Vrijgezellenfeest organiseren in Utrecht? Van SUP tot high tea, bierbrouwerij tot escaperoom. Volledig verzorgd, offerte binnen 48u. Voor bruid en bruidegom.',
  alternates: { canonical: 'https://dagjeutrecht.nl/vrijgezellenfeest-utrecht' },
};

const faq = [
  {
    q: 'Vanaf hoeveel personen kunnen jullie iets regelen?',
    a: 'Ideale groepsgrootte is 8-16 personen. Vanaf 6 kunnen we al iets moois neerzetten, en grotere groepen tot 30 zijn ook prima. Vertel gewoon met hoeveel jullie komen, dan schalen we het programma.',
  },
  {
    q: 'Hebben jullie ook programma\'s voor de mannelijke variant (BA)?',
    a: 'Ja - bierbrouwerij (Maximus, Oproer, De Leckere), escaperoom, padel, bowling, streetfood tour of gewoon een goed onderbouwde kroegentocht met gids. We stemmen af op wat de bruidegom leuk vindt.',
  },
  {
    q: 'Kunnen jullie een verrassing regelen voor de bruid of bruidegom?',
    a: 'Zeker. We regelen bijvoorbeeld een privé-vaart met bubbels, een geheime locatie voor het diner, of laten een aantal vrienden onverwacht opduiken tijdens een onderdeel. Vertel bij aanvraag wat je in gedachten hebt.',
  },
  {
    q: 'Wat kost een gemiddeld vrijgezellenfeest in Utrecht?',
    a: 'Halve dag met één activiteit + borrel/diner: €55-85 per persoon. Hele dag met meerdere onderdelen, lunch én diner: €95-150 per persoon. Premium arrangement met privé-boot en fine dining: €175-250 per persoon.',
  },
  {
    q: 'Hoe kort van tevoren kunnen we boeken?',
    a: 'Ideaal is 4-6 weken vooraf, dan hebben we de beste keuze aan tijdsloten. Last-minute (binnen 2 weken) proberen we altijd - populaire opties zoals privé-vaart en Amara Privé-spa zijn dan wel vaker vol.',
  },
];

const activiteiten = [
  { slug: 'dagjesuppen', naam: 'DagjeSuppen SUP', tijd: '1,5u', voor: 'sportief, buiten' },
  { slug: 'high-tea-domtoren', naam: 'High tea aan de Domtoren', tijd: '1,5u', voor: 'chique middag' },
  { slug: 'brouwerij-maximus', naam: 'Bierproeverij Maximus', tijd: '2u', voor: 'BA, groepen' },
  { slug: 'escape-domplein', naam: 'The Escape Domplein', tijd: '1u', voor: 'actie, samenwerking' },
  { slug: 'schuttevaer', naam: 'Rondvaart met bubbels', tijd: '1,5u', voor: 'gezellig, klassiek' },
  { slug: 'amara', naam: 'Amara Privé-spa', tijd: '3u', voor: 'ultieme luxe' },
];

export default function VrijgezellenfeestUtrecht() {
  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Vrijgezellenfeest Utrecht', url: '/vrijgezellenfeest-utrecht' },
        ]}
      />
      <FaqSchema items={faq} />

      <section className="bg-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-white/70 text-sm mb-2">Voor getuigen, zussen en vriendinnen/vrienden</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            Vrijgezellenfeest in Utrecht: onvergetelijke dag voor de groep
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Van SUP-en met de meiden tot bierproeven met de mannen, van privé-spa tot dansen aan
            de gracht. Utrecht heeft alles - wij regelen alles. Verrassingen inbegrepen als je dat
            wil.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/samensteller?doelgroep=vrijgezel"
              className="inline-flex items-center rounded-full bg-canal-900 hover:bg-canal-800 px-6 py-3 font-medium text-white shadow-lg"
            >
              Stel het vrijgezellenfeest samen →
            </Link>
            <Link
              href="/aanbod?audience=vrijgezel"
              className="inline-flex items-center rounded-full border border-white/40 hover:border-white/70 px-6 py-3 font-medium text-white"
            >
              Bekijk populaire activiteiten
            </Link>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-14 text-canal-800 space-y-6 leading-relaxed">
        <p className="text-lg">
          Een vrijgezellenfeest organiseren in Utrecht is een lastige klus geworden - iedereen
          verwacht een sublieme dag, budget is meestal beperkt, en je wilt niet dat de bruid of
          bruidegom kwart voor twaalf achter de coulissen belt dat de boot niet vaart. DagjeUtrecht
          neemt die stress uit handen. Wij combineren activiteiten, catering en het
          verrassingselement zodat jij als getuige alleen de dag hoeft mee te vieren.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Waarom Utrecht?</h2>
        <p>
          Utrecht is compacter dan Amsterdam, gezelliger dan Rotterdam en gevarieerder dan Den
          Haag. Je kunt in dezelfde middag SUP-en op de gracht, high tea nemen bij een sterrenchef
          en aansluitend een privé-boot vol met bubbels laten aanleggen. Alles binnen twintig
          minuten lopen. Voor grotere groepen (12+) hebben we ruime locaties zoals de
          Werkspoorkathedraal en Kasteel de Haar.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Bruid (BJ) of bruidegom (BA)?</h2>
        <p>
          <strong>Voor de bruid</strong> zijn onze populairste combinaties: SUP + high tea + rondvaart
          met bubbels; kookworkshop + wijnproeverij + diner; spa-middag bij Amara + tapas + dansen.
          Klassiek, chique of speels - we passen het aan het karakter van de bruid aan.
        </p>
        <p>
          <strong>Voor de bruidegom</strong> combineren we vaker actie met eten en drinken:
          bierbrouwerij + escaperoom + streetfood; padel-clinic + bowling + pubcrawl;
          rondvaart-BBQ. Ook een sportieve variant (kanotocht + bierproeverij bij Oproer) is
          populair.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Populaire onderdelen</h2>
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
          title="Klaar om iets neer te zetten waar iedereen over praat?"
          text="Vertel ons wat de bruid of bruidegom leuk vindt - wij combineren activiteiten, verrassingen en catering tot een sluitend programma."
          href="/samensteller?doelgroep=vrijgezel"
          primaryLabel="Vraag vrijblijvend een offerte aan voor jullie vrijgezellenfeest"
        />

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Verrassingen inbouwen</h2>
        <p>
          Het element verrassing tilt een vrijgezellenfeest naar een ander niveau. Wij hebben
          hierin ervaring: een boot die opeens komt aanleggen, een sterrenchef die zich onthult
          als kok, een verrassingsoptreden van een acteur die de bruid of bruidegom tot een
          uitdaging daagt. Vertel bij de aanvraag welke sfeer je wilt (subtiel, spectaculair,
          grappig, sentimenteel) en wij komen met een voorstel.
        </p>

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Praktisch</h2>
        <p>
          <strong>Groepsgrootte:</strong> ideaal 8-16 personen, van 6 tot 30 goed te doen. Grotere
          groepen splitsen we soms in tandem.
          <br />
          <strong>Duur:</strong> halve dag (4u) of hele dag (8-10u met diner). Ook een 2-daags
          arrangement met overnachting in een hotel als Inntel of The Nox kan.
          <br />
          <strong>Locatie start:</strong> meestal ergens centraal (Neude, Domplein of station).
          Bruid/bruidegom hoeft niet te weten wat er komt - alles wordt in scène gezet.
          <br />
          <strong>Budget:</strong> vanaf €55 per persoon voor een halve dag zonder diner tot €250
          voor een premium arrangement. Op maat scherp begroot.
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
          title="Ready voor een vrijgezellenfeest zonder stress?"
          text="Onze samensteller vraagt kort uit wat jullie leuk vinden. Binnen 48u een compleet voorstel op je bureau."
          href="/samensteller?doelgroep=vrijgezel"
          primaryLabel="Start de aanvraag"
          variant="canal"
        />
      </article>
    </main>
  );
}

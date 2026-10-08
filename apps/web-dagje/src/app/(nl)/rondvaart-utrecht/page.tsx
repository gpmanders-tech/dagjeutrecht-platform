import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { fotos } from '../../../lib/fotos';
import { FH_LIGHTFRAME_SCRIPT, SOORTEN, actueleRondvaarten, boekLink, type RondvaartSoort } from '../../../lib/rondvaarten';
import { AanvraagKort } from '../../../components/aanvraag-kort';
import { RondvaartKaart } from '../../../components/rondvaart-kaart';
import { Breadcrumbs, FaqSchema } from '../../../components/seo-jsonld';
import { Band, BoekBlok, HOEKEN, PaginaKop, Sticker } from '../../../components/ui';

const TITEL = 'Rondvaart Utrecht boeken: grachten, varen en eten, privé boot';
const OMSCHRIJVING =
  'Boek een rondvaart in Utrecht direct bij Rederij Schuttevaer: door de grachten, met diner of lunch, een privé fluisterboot voor je groep of naar Amelisweerd.';

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: '/rondvaart-utrecht' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'DagjeUtrecht',
    title: TITEL,
    description: OMSCHRIJVING,
    url: '/rondvaart-utrecht',
    images: [{ url: fotos.rondvaart.src, alt: fotos.rondvaart.alt }],
  },
  twitter: { card: 'summary_large_image', title: TITEL, description: OMSCHRIJVING, images: [fotos.rondvaart.src] },
};

// Dagelijks opnieuw opbouwen, zodat een seizoensvaart (kerst) na zijn datum vanzelf verdwijnt.
export const revalidate = 86400;

const SECTIES: Array<{ soort: RondvaartSoort; kleur: 'zee' | 'vlam' | 'zon'; achtergrond: string }> = [
  { soort: 'groep', kleur: 'zee', achtergrond: 'bg-zee-50' },
  { soort: 'eten', kleur: 'vlam', achtergrond: 'bg-vlam-50' },
  { soort: 'stad', kleur: 'zon', achtergrond: 'bg-white' },
  { soort: 'buiten', kleur: 'zee', achtergrond: 'bg-zon-100' },
];

const VRAGEN = [
  {
    q: 'Bij wie boek ik de rondvaart?',
    a: 'Rechtstreeks bij Rederij Schuttevaer, onze partner voor varen in Utrecht. Je kiest een datum en tijd in het boekvenster, betaalt daar en krijgt de bevestiging van Schuttevaer.',
  },
  {
    q: 'Wat kost een rondvaart?',
    a: 'De actuele prijs zie je in het boekvenster zodra je een vaart en een datum kiest. Je betaalt bij het boeken.',
  },
  {
    q: 'Waar stap ik op?',
    a: 'De meeste vaarten vertrekken van Oudegracht 85, bij de Viebrug. De rondvaart vanaf Hoog Catharijne vertrekt van de Catharijne Esplanade, vlak bij Utrecht Centraal. Kom 10 minuten van tevoren.',
  },
  {
    q: 'Kan ik met een groep varen?',
    a: 'Ja. Met de privé fluisterboot heb je een eigen boot voor maximaal 26 personen, of 20 met catering. Wil je de rondvaart combineren met andere activiteiten, of ben je met een grotere groep, vraag dan een voorstel aan bij DagjeUtrecht.',
  },
  {
    q: 'Gaat de rondvaart door bij regen?',
    a: 'Of een vaart doorgaat en of je kunt omboeken, regel je met Schuttevaer, want daar staat je boeking. De open sloep is een boot voor mooi weer.',
  },
];

export default function RondvaartPagina() {
  const vaarten = actueleRondvaarten();
  const lijst = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Rondvaarten in Utrecht van Rederij Schuttevaer',
    numberOfItems: vaarten.length,
    itemListElement: vaarten.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristTrip',
        name: v.naam,
        description: v.omschrijving,
        image: `https://dagjeutrecht.nl${v.foto.src}`,
        url: `https://dagjeutrecht.nl/rondvaart-utrecht#${v.id}`,
        provider: { '@type': 'Organization', name: 'Rederij Schuttevaer' },
        offers: { '@type': 'Offer', url: boekLink(v.boeken[0]!.pk) },
      },
    })),
  };

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Onderdelen', url: '/bouwstenen' },
          { name: 'Rondvaart Utrecht', url: '/rondvaart-utrecht' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lijst) }} />
      <FaqSchema items={VRAGEN} />

      <PaginaKop
        titel="Rondvaart Utrecht"
        intro={
          <p>
            Alle rondvaarten van onze partner Rederij Schuttevaer op een rij: door de grachten, met een diner of lunch
            erbij, met een eigen boot voor je groep of de stad uit naar Amelisweerd. Kies een vaart en boek hem direct.
          </p>
        }
        kleur="zee"
        foto={fotos.rondvaart}
        label="Direct te boeken"
        knop={{ href: '#vaarten', tekst: 'Bekijk de vaarten' }}
      />
      <div className="-mt-3">
        <Band
          woorden={['Oudegracht', 'Privé fluisterboot', 'Varen en eten', 'Catharijnesingel', 'Amelisweerd', 'Rhijnauwen']}
          kleur="bg-vlam-400 text-inkt"
        />
      </div>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-inkt">Zo boek je</h2>
            <p className="mt-3 text-lg text-grijs">
              Je boekt rechtstreeks bij onze partner <strong className="text-inkt">Rederij Schuttevaer</strong>. Klik
              op de knop bij een vaart, kies een datum en tijd en reken af in het boekvenster. De bevestiging krijg je
              van Schuttevaer.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-inkt bg-zon-100 p-6">
            <h2 className="text-2xl font-black uppercase leading-none tracking-tight text-inkt">
              Met een groep of een hele dag?
            </h2>
            <p className="mt-3 text-inkt">
              Wil je de rondvaart combineren met lunch, jeu de boules of een borrel, of ben je met een grote groep? Dan
              regelen wij het, met één aanspreekpunt.
            </p>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <a href="#aanvragen" className="font-bold text-vlam-700 underline underline-offset-2">
                Vraag een voorstel aan
              </a>
              <Link href="/bouwstenen/rondvaart" className="font-bold text-vlam-700 underline underline-offset-2">
                Rondvaart in een dagprogramma
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div id="vaarten" className="scroll-mt-24">
        {SECTIES.map((s, si) => {
          const lijstVaarten = vaarten.filter((v) => v.soort === s.soort);
          if (!lijstVaarten.length) return null;
          const info = SOORTEN[s.soort];
          return (
            <section key={s.soort} className={s.achtergrond}>
              <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
                <Sticker kleur={s.kleur} hoek={si % 2 ? '-rotate-2' : 'rotate-2'}>
                  {info.sticker}
                </Sticker>
                <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">{info.titel}</h2>
                <p className="mt-3 max-w-2xl text-lg text-grijs">{info.uitleg}</p>
                <ul className="mt-10 grid gap-8 md:grid-cols-2">
                  {lijstVaarten.map((v, i) => (
                    <li key={v.id}>
                      <RondvaartKaart vaart={v} hoek={HOEKEN[i % HOEKEN.length]} />
                    </li>
                  ))}
                  {s.soort === 'groep' && (
                    <li>
                      <div className="kantel op-donker flex h-full flex-col justify-center rounded-2xl bg-inkt p-8 text-white shadow-xl rotate-1">
                        <h3 className="text-3xl font-black uppercase leading-none tracking-tight">Grotere groep?</h3>
                        <p className="mt-4 text-lg text-zee-100">
                          Past jullie groep niet op een fluisterboot, of wil je er een hele dag van maken met lunch en
                          een borrel? Vraag een voorstel aan, dan zoeken wij uit wat er kan en krijg je binnen een
                          werkdag een prijs per persoon.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#aanvragen"
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-zon-400 px-7 py-3 text-base font-extrabold uppercase tracking-wide text-inkt shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-zon-300"
                          >
                            Voorstel aanvragen
                          </a>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-zee-50">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div className="text-inkt">
            <h2 className="text-3xl font-black uppercase leading-none tracking-tight">Veelgestelde vragen</h2>
            <dl className="mt-6 space-y-5">
              {VRAGEN.map((v) => (
                <div key={v.q}>
                  <dt className="text-lg font-extrabold">{v.q}</dt>
                  <dd className="mt-1 text-grijs">{v.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-grijs">
              Liever een vaste dag met een vaste prijs per persoon? Bekijk de{' '}
              <Link href="/pakketten" className="font-bold text-vlam-700 underline">
                pakketten
              </Link>{' '}
              of{' '}
              <Link href="/boeken" className="font-bold text-vlam-700 underline">
                stel je dag zelf samen
              </Link>
              .
            </p>
          </div>
          <div id="aanvragen" className="scroll-mt-24">
            <AanvraagKort onderwerp="rondvaart-utrecht" titel="Een rondvaart met je groep" />
          </div>
        </div>
      </section>

      <BoekBlok foto={fotos.grachtAvond} />

      {/* Officieel FareHarbor-script: opent de boeklinks in een venster op deze pagina. */}
      <Script src={FH_LIGHTFRAME_SCRIPT} strategy="afterInteractive" />
    </>
  );
}

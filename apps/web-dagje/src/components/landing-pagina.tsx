import type { Metadata } from 'next';
import Link from 'next/link';
import { uitgelichtSeizoen, vindPakket } from '../lib/aanbod';
import type { Landing } from '../lib/landings';
import { Breadcrumbs, FaqSchema } from './seo-jsonld';
import { PakketKaart } from './pakket-kaart';
import { Band, BoekBlok, Foto, HOEKEN, Knop, PaginaKop } from './ui';

export function landingMetadata(l: Landing): Metadata {
  // openGraph uit de layout wordt hier niet aangevuld maar vervangen, dus type,
  // locale, siteName en de afbeelding moeten er zelf bij staan.
  return {
    title: l.metaTitel,
    description: l.metaOmschrijving,
    alternates: { canonical: l.pad },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      siteName: 'DagjeUtrecht',
      title: l.metaTitel,
      description: l.metaOmschrijving,
      url: l.pad,
      images: [{ url: l.foto.src, alt: l.foto.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: l.metaTitel,
      description: l.metaOmschrijving,
      images: [l.foto.src],
    },
  };
}

export function LandingPagina({ landing: l }: { landing: Landing }) {
  const seizoen = uitgelichtSeizoen();
  const rang = (s: string) => (s === seizoen ? 0 : s === 'jaarrond' ? 1 : 2);
  const pakketten = l.pakketten
    .map(vindPakket)
    .filter((p) => p !== null)
    .sort((a, b) => rang(a.seizoen) - rang(b.seizoen));

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: l.titel, url: l.pad },
        ]}
      />
      <FaqSchema items={l.faq} />

      <PaginaKop
        titel={l.titel}
        intro={l.intro}
        kleur={l.kleur}
        foto={l.foto}
        label={l.boven}
        knop={{ href: '#pakketten', tekst: 'Bekijk de pakketten' }}
      />
      <div className="-mt-3">
        <Band woorden={l.band} kleur={l.kleur === 'vlam' ? 'bg-zee-400 text-inkt' : 'bg-vlam-400 text-inkt'} />
      </div>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          {l.alineas.map((a) => (
            <div key={a.kop}>
              <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-inkt">{a.kop}</h2>
              <p className="mt-3 text-lg text-grijs">{a.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pakketten" className="scroll-mt-24 bg-zee-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">Pakketten die passen</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pakketten.map((p, i) => (
              <li key={p.slug}>
                <PakketKaart pakket={p} hoek={HOEKEN[i % HOEKEN.length]} />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <Knop href="/boeken">Zelf samenstellen</Knop>
            <Knop href="/bouwstenen" variant="secundair">
              Alle onderdelen
            </Knop>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {l.galerij.map((foto, i) => (
            <li key={foto.src}>
              <Foto
                foto={foto}
                verhouding={`aspect-square ${HOEKEN[i % HOEKEN.length]}`}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="kantel polaroid rounded-sm transition-transform hover:rotate-0"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-vlam-50">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">Veelgestelde vragen</h2>
          <div className="mt-8 divide-y divide-vlam-100 overflow-hidden rounded-2xl bg-white shadow-lg">
            {l.faq.map((v) => (
              <details key={v.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-inkt [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg">{v.q}</h3>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vlam-400 text-xl leading-none text-inkt transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-grijs">{v.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-black uppercase tracking-tight text-inkt">Ook interessant</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {[
            { href: '/bedrijfsuitje-utrecht', label: 'Bedrijfsuitje' },
            { href: '/teambuilding-utrecht', label: 'Teambuilding' },
            { href: '/schooluitje-utrecht', label: 'Schooluitje' },
            { href: '/vrijgezellenfeest-utrecht', label: 'Vrijgezellenfeest' },
          ]
            .filter((x) => x.href !== l.pad)
            .map((x) => (
              <li key={x.href}>
                <Link
                  href={x.href}
                  className="inline-flex rounded-full border-2 border-zee-400 px-4 py-2 font-bold text-inkt transition-colors hover:bg-zee-400"
                >
                  {x.label}
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <BoekBlok titel="Klaar om een datum te prikken?" foto={l.galerij[0]} />
    </>
  );
}

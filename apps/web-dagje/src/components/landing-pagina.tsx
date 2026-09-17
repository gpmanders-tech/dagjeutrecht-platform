import type { Metadata } from 'next';
import Link from 'next/link';
import { vindPakket } from '../lib/aanbod';
import type { Landing } from '../lib/landings';
import { Breadcrumbs, FaqSchema } from './seo-jsonld';
import { LandingCTA } from './landing-cta';
import { PakketKaart } from './pakket-kaart';

export function landingMetadata(l: Landing): Metadata {
  return {
    title: l.metaTitel,
    description: l.metaOmschrijving,
    alternates: { canonical: l.pad },
    openGraph: { title: l.metaTitel, description: l.metaOmschrijving, url: l.pad },
  };
}

export function LandingPagina({ landing: l }: { landing: Landing }) {
  const pakketten = l.pakketten.map(vindPakket).filter((p) => p !== null);

  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: l.titel, url: l.pad },
        ]}
      />
      <FaqSchema items={l.faq} />

      <section className="bg-canal-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-cream/70 text-sm mb-2">{l.boven}</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">{l.titel}</h1>
          <p className="text-xl text-cream/90 max-w-2xl">{l.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#pakketten"
              className="inline-flex items-center rounded-full bg-terracotta-500 hover:bg-terracotta-400 px-6 py-3 font-medium text-white shadow-lg"
            >
              Bekijk de pakketten →
            </Link>
            <Link
              href="/boeken"
              className="inline-flex items-center rounded-full border border-white/40 hover:border-white/70 px-6 py-3 font-medium text-white"
            >
              Zelf samenstellen
            </Link>
          </div>
        </div>
      </section>

      <section id="pakketten" className="max-w-5xl mx-auto px-6 py-16 scroll-mt-24">
        <h2 className="font-serif text-3xl text-canal-900 mb-8">Pakketten die goed passen</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pakketten.map((p) => (
            <PakketKaart key={p.slug} pakket={p} />
          ))}
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 pb-8 text-canal-800 space-y-6 leading-relaxed">
        {l.alineas.map((a) => (
          <div key={a.kop}>
            <h2 className="font-serif text-3xl text-canal-900 mb-3">{a.kop}</h2>
            <p>{a.tekst}</p>
          </div>
        ))}

        <h2 className="font-serif text-3xl text-canal-900 pt-6">Veelgestelde vragen</h2>
        <dl className="space-y-6">
          {l.faq.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-canal-900">{f.q}</dt>
              <dd className="mt-1 text-canal-700">{f.a}</dd>
            </div>
          ))}
        </dl>

        <LandingCTA
          title="Klaar om een datum te prikken?"
          text="Kies een pakket of stel zelf samen. Je ziet meteen de prijs en we bevestigen binnen 2 werkdagen."
          href="/boeken"
          primaryLabel="Stel jullie dag samen"
          variant="canal"
        />
      </article>
    </main>
  );
}

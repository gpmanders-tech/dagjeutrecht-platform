import type { Metadata } from 'next';
import Link from 'next/link';
import { fotos } from '../lib/fotos';
import { vindOpAanvraag, type OpAanvraag } from '../lib/op-aanvraag';
import { AanvraagKort } from './aanvraag-kort';
import { Breadcrumbs } from './seo-jsonld';
import { PaginaKop } from './ui';

export function opAanvraagMetadata(slug: string): Metadata {
  const o = vindOpAanvraag(slug)!;
  // Zonder eigen foto een algemene foto van de stad voor de social preview (niet op de pagina zelf).
  const beeld = o.foto ?? fotos.oudegrachtDom;
  return {
    title: o.metaTitel,
    description: o.metaOmschrijving,
    alternates: { canonical: `/${o.slug}` },
    openGraph: {
      type: 'website',
      locale: 'nl_NL',
      siteName: 'DagjeUtrecht',
      title: o.metaTitel,
      description: o.metaOmschrijving,
      url: `/${o.slug}`,
      images: [{ url: beeld.src, alt: beeld.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: o.metaTitel,
      description: o.metaOmschrijving,
      images: [beeld.src],
    },
  };
}

/** Pagina voor een onderwerp dat we op aanvraag regelen (DAG-15). */
export function OpAanvraagPagina({ slug }: { slug: string }) {
  const o: OpAanvraag = vindOpAanvraag(slug)!;
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: o.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  // Dienst zonder prijs: de prijs is op aanvraag, dus er staat bewust geen offers-blok in.
  const dienstLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: o.titel,
    description: o.metaOmschrijving,
    url: `https://dagjeutrecht.nl/${o.slug}`,
    ...(o.foto ? { image: `https://dagjeutrecht.nl${o.foto.src}` } : {}),
    provider: { '@id': 'https://dagjeutrecht.nl#organization' },
    areaServed: { '@type': 'City', name: 'Utrecht' },
  };

  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Onderdelen', url: '/bouwstenen' },
          { name: o.titel, url: `/${o.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dienstLd) }} />
      <PaginaKop
        titel={o.titel}
        label={o.label}
        kleur={o.kleur}
        foto={o.foto}
        intro={<p>{o.intro}</p>}
        knop={{ href: '#aanvragen', tekst: 'Offerte aanvragen' }}
      />

      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div className="text-inkt">
          <p className="mb-6 rounded-2xl border-2 border-inkt bg-zon-100 px-4 py-3">
            <strong>Prijs op aanvraag.</strong> Vraag een offerte aan, dan krijg je binnen een werkdag een voorstel met
            een prijs per persoon.
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight">Wat we voor je regelen</h2>
          <ul className="mt-4 space-y-2">
            {o.watWeRegelen.map((w) => (
              <li key={w} className="flex gap-2">
                <span aria-hidden="true" className="font-black text-vlam-700">✓</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl font-black uppercase tracking-tight">Maak er een hele dag van</h2>
          <p className="mt-2">Combineer het met onderdelen uit ons vaste aanbod:</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {o.combineer.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/bouwstenen/${c.slug}`}
                  className="inline-flex rounded-full border-2 border-inkt px-4 py-1.5 text-sm font-bold hover:bg-zee-50"
                >
                  {c.naam}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            Of bekijk de <Link href="/pakketten" className="font-bold text-vlam-700 underline">vaste pakketten</Link>{' '}
            en de <Link href="/bouwstenen#op-aanvraag" className="font-bold text-vlam-700 underline">andere activiteiten op aanvraag</Link>.
          </p>

          {o.zieOok && (
            <p className="mt-4 text-sm">
              {o.zieOok.tekst}{' '}
              <Link href={o.zieOok.href} className="font-bold text-vlam-700 underline">
                {o.zieOok.label}
              </Link>
              .
            </p>
          )}

          <h2 className="mt-10 text-2xl font-black uppercase tracking-tight">Veelgestelde vragen</h2>
          <dl className="mt-3 space-y-4">
            {o.faq.map((f) => (
              <div key={f.q}>
                <dt className="font-bold">{f.q}</dt>
                <dd className="mt-1">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="aanvragen" className="scroll-mt-24">
          <AanvraagKort onderwerp={o.slug} titel={o.titel.replace(/ met je groep$/, '')} />
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { vindOpAanvraag, type OpAanvraag } from '../lib/op-aanvraag';
import { AanvraagKort } from './aanvraag-kort';
import { PaginaKop } from './ui';

export function opAanvraagMetadata(slug: string): Metadata {
  const o = vindOpAanvraag(slug)!;
  return {
    title: o.metaTitel,
    description: o.metaOmschrijving,
    alternates: { canonical: `/${o.slug}` },
    openGraph: { title: o.metaTitel, description: o.metaOmschrijving, url: `/${o.slug}` },
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

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PaginaKop
        titel={o.titel}
        label={o.label}
        kleur={o.kleur}
        foto={o.foto}
        intro={<p>{o.intro}</p>}
        knop={{ href: '#aanvragen', tekst: 'Vraag het aan' }}
      />

      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div className="text-inkt">
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
            Of bekijk de <Link href="/pakketten" className="font-bold text-vlam-700 underline">vaste pakketten</Link>.
          </p>

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

import type { Metadata } from 'next';
import { paginaAlternates } from '../../../lib/talen';
import { BOUWSTENEN, CLUSTERS, type Cluster } from '../../../lib/aanbod';
import { fotos } from '../../../lib/fotos';
import Link from 'next/link';
import { OP_AANVRAAG } from '../../../lib/op-aanvraag';
import { BouwsteenKaart } from '../../../components/bouwsteen-kaart';
import { Breadcrumbs } from '../../../components/seo-jsonld';
import { Band, BoekBlok, HOEKEN, PaginaKop, Sticker } from '../../../components/ui';

export const metadata: Metadata = {
  title: `Activiteiten Utrecht voor groepen: ${BOUWSTENEN.length} onderdelen`,
  description:
    'Activiteiten in Utrecht voor groepen: jeu de boules, shuffleboard, Domtoren, rondvaart, kanoën, suppen, City Challenge, BBQ en borrel. Vaste prijs p.p.',
  alternates: paginaAlternates('nl', 'bouwstenen'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'DagjeUtrecht',
    title: `Activiteiten Utrecht voor groepen: ${BOUWSTENEN.length} onderdelen`,
    description: 'Jeu de boules, shuffleboard, Domtoren, rondvaart, kanoën, suppen, City Challenge, lunch, BBQ en borrel. Vaste prijs per persoon.',
    url: '/bouwstenen',
    images: [{ url: fotos.kanoGracht.src, alt: fotos.kanoGracht.alt }],
  },
};

const lijst = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Activiteiten in Utrecht voor groepen',
  numberOfItems: BOUWSTENEN.length,
  itemListElement: BOUWSTENEN.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://dagjeutrecht.nl/bouwstenen/${b.slug}`,
    name: b.naam,
  })),
};

const SECTIES: Array<{ cluster: Cluster; titel: string; sticker: string; kleur: 'zee' | 'vlam' | 'zon'; achtergrond: string }> = [
  { cluster: 'amelisweerd', titel: 'Amelisweerd', sticker: 'Op het water', kleur: 'zee', achtergrond: 'bg-zee-50' },
  { cluster: 'centrum', titel: 'Centrum', sticker: 'Spelen en borrelen', kleur: 'vlam', achtergrond: 'bg-vlam-50' },
  { cluster: 'beide', titel: 'Onderweg', sticker: 'Van A naar B', kleur: 'zon', achtergrond: 'bg-zon-100' },
];

export const revalidate = 86400;

/** Onderwerpen zonder vaste prijs (DAG-SEO-38). Padel blijft buiten deze lijst, keuze Ger. */
const AANVRAAG_LIJST = OP_AANVRAAG.filter((o) => o.slug !== 'padel-utrecht');

export default function BouwstenenPage() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Onderdelen', url: '/bouwstenen' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lijst) }} />
      <PaginaKop
        titel="Activiteiten in Utrecht"
        intro="Hiermee bouw je jullie dag. De vaste onderdelen hebben een vaste prijs per persoon en een vast tijdstip; onderaan staan de activiteiten die we op aanvraag regelen."
        kleur="vlam"
        foto={fotos.kanoGracht}
        label={`${BOUWSTENEN.length} bouwstenen`}
        knop={{ href: '/boeken', tekst: 'Stel je dag samen' }}
      />
      <div className="-mt-3">
        <Band woorden={BOUWSTENEN.map((b) => b.naam)} kleur="bg-zee-400 text-inkt" />
      </div>
      {SECTIES.map((s) => (
        <section key={s.cluster} className={s.achtergrond}>
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <Sticker kleur={s.kleur} hoek="rotate-2">
              {s.sticker}
            </Sticker>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">{s.titel}</h2>
            <p className="mt-3 max-w-2xl text-lg text-grijs">{CLUSTERS[s.cluster].uitleg}</p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {BOUWSTENEN.filter((b) => b.cluster === s.cluster).map((b, i) => (
                <BouwsteenKaart key={b.slug} blok={b} hoek={HOEKEN[i % HOEKEN.length]} />
              ))}
            </div>
          </div>
        </section>
      ))}
      <section id="op-aanvraag" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <Sticker kleur="zee" hoek="-rotate-2">
            Prijs op aanvraag
          </Sticker>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">Op aanvraag</h2>
          <p className="mt-3 max-w-2xl text-lg text-grijs">
            Deze activiteiten staan niet in de samensteller en hebben geen vaste prijs. Vraag een offerte aan, dan krijg
            je binnen een werkdag een voorstel met een prijs per persoon.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {AANVRAAG_LIJST.map((o) => (
              <li key={o.slug} className="rounded-2xl border-2 border-inkt bg-white p-6">
                <h3 className="text-2xl font-black uppercase tracking-tight text-inkt">
                  <Link href={`/${o.slug}`} className="hover:text-vlam-700">
                    {o.titel.replace(/ met je groep$/, '')}
                  </Link>
                </h3>
                <p className="mt-2 text-grijs">{o.metaOmschrijving.replace(/ Prijs op aanvraag\.$/, '')}</p>
                <p className="mt-3 font-bold text-inkt">Prijs op aanvraag</p>
                <Link
                  href={`/${o.slug}#aanvragen`}
                  className="mt-4 inline-flex rounded-full bg-zon-400 px-5 py-2 font-extrabold text-inkt hover:bg-zon-300"
                >
                  Offerte aanvragen
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BoekBlok foto={fotos.supOudegracht} />
    </>
  );
}

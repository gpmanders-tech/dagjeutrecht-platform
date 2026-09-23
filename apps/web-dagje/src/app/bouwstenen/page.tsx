import type { Metadata } from 'next';
import { BOUWSTENEN, CLUSTERS, type Cluster } from '../../lib/aanbod';
import { fotos } from '../../lib/fotos';
import { BouwsteenKaart } from '../../components/bouwsteen-kaart';
import { Breadcrumbs } from '../../components/seo-jsonld';
import { Band, BoekBlok, HOEKEN, PaginaKop, Sticker } from '../../components/ui';

export const metadata: Metadata = {
  title: `Activiteiten Utrecht voor groepen: ${BOUWSTENEN.length} onderdelen`,
  description:
    'Activiteiten in Utrecht voor groepen: jeu de boules, shuffleboard, Domtoren, rondvaart, kanoën, suppen, City Challenge, BBQ en borrel. Vaste prijs p.p.',
  alternates: { canonical: '/bouwstenen' },
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
        intro="Hiermee bouw je jullie dag. Alles heeft een vaste prijs per persoon en een vast tijdstip."
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
      <BoekBlok foto={fotos.supOudegracht} />
    </>
  );
}

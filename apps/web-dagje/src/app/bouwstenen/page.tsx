import type { Metadata } from 'next';
import Link from 'next/link';
import { BOUWSTENEN, CLUSTERS, type Cluster } from '../../lib/aanbod';
import { BouwsteenKaart } from '../../components/bouwsteen-kaart';

export const metadata: Metadata = {
  title: 'Alle onderdelen voor je dagje Utrecht',
  description:
    'Jeu de boules, shuffleboard, Domtoren, rondvaart, kanoën, suppen, kickbike-tocht, lunch, BBQ en borrel in Utrecht. Vaste prijzen per persoon.',
  alternates: { canonical: '/bouwstenen' },
};

const VOLGORDE: Cluster[] = ['centrum', 'amelisweerd', 'beide'];

export default function BouwstenenPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="font-serif text-4xl md:text-5xl text-canal-900 mb-3">Alle onderdelen</h1>
      <p className="text-canal-700 max-w-2xl mb-12">
        Hiermee stel je jullie dag samen. Alles heeft een vaste prijs per persoon en een vast
        tijdstip.{' '}
        <Link href="/boeken" className="underline hover:text-terracotta-600">
          Naar de samensteller
        </Link>
        .
      </p>
      {VOLGORDE.map((c) => (
        <section key={c} className="mb-14">
          <h2 className="font-serif text-3xl text-canal-900">
            {c === 'beide' ? 'Onderweg' : CLUSTERS[c].naam}
          </h2>
          <p className="text-canal-600 mb-6">{CLUSTERS[c].uitleg}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {BOUWSTENEN.filter((b) => b.cluster === c).map((b) => (
              <BouwsteenKaart key={b.slug} blok={b} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

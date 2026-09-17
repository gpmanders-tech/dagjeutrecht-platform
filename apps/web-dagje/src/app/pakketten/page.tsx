import type { Metadata } from 'next';
import Link from 'next/link';
import { PAKKETTEN } from '../../lib/aanbod';
import { PakketKaart } from '../../components/pakket-kaart';

export const metadata: Metadata = {
  title: 'Pakketten voor een dagje Utrecht',
  description:
    'Kant-en-klare dagpakketten in Utrecht voor bedrijven, scholen en vriendengroepen: jeu de boules, kanoën, kickbike, rondvaart en borrel. Vaste prijs per persoon.',
  alternates: { canonical: '/pakketten' },
};

export default function PakkettenPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="font-serif text-4xl md:text-5xl text-canal-900 mb-3">Pakketten</h1>
      <p className="text-canal-700 max-w-2xl mb-10">
        Vier dagen die goed werken. Boek ze zoals ze zijn, of wissel onderdelen om in de{' '}
        <Link href="/boeken" className="underline hover:text-terracotta-600">
          samensteller
        </Link>
        .
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {PAKKETTEN.map((p) => (
          <PakketKaart key={p.slug} pakket={p} />
        ))}
      </div>
    </main>
  );
}

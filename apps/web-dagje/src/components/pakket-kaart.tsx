import Link from 'next/link';
import { TIJDVAKKEN, formatEuro, prijsPerPersoon, vindBouwsteen, type Pakket } from '../lib/aanbod';

export function PakketKaart({ pakket }: { pakket: Pakket }) {
  return (
    <Link
      href={`/pakketten/${pakket.slug}`}
      className="flex flex-col bg-white rounded-2xl p-6 shadow-soft border border-canal-100 hover:border-terracotta-400 transition-colors"
    >
      <p className="text-4xl mb-3" aria-hidden="true">
        {pakket.emoji}
      </p>
      <h3 className="font-serif text-2xl text-canal-900">{pakket.naam}</h3>
      <p className="text-sm text-canal-500 mt-1">{pakket.voorWie}</p>
      <ul className="mt-4 space-y-1 text-sm text-canal-700 flex-1">
        {TIJDVAKKEN.map((t) => {
          const b = vindBouwsteen(pakket.blokken[t.id]);
          return b ? (
            <li key={t.id}>
              <span className="text-canal-400">{t.van}</span> {b.naam}
            </li>
          ) : null;
        })}
      </ul>
      <p className="mt-5 text-canal-900">
        <span className="text-2xl font-semibold">{formatEuro(prijsPerPersoon(pakket.blokken))}</span>{' '}
        <span className="text-sm text-canal-500">per persoon</span>
      </p>
    </Link>
  );
}

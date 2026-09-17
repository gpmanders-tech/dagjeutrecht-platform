import Link from 'next/link';
import { TIJDVAKKEN, formatEuro, prijsPerPersoon, vindBouwsteen, type Pakket } from '../lib/aanbod';
import { fotoVoorPakket } from '../lib/fotos';
import { Foto, Sticker } from './ui';

const STREEP = ['bg-zee-400', 'bg-vlam-400', 'bg-zon-400', 'bg-inkt'];

export function PakketKaart({
  pakket,
  hoek = '',
  uitgelicht = false,
}: {
  pakket: Pakket;
  hoek?: string;
  uitgelicht?: boolean;
}) {
  const kleur = STREEP[pakket.slug.length % STREEP.length];
  return (
    <Link
      href={`/pakketten/${pakket.slug}`}
      className={`kantel group relative flex h-full flex-col rounded-2xl bg-white shadow-xl transition-transform hover:-translate-y-1 hover:rotate-0 ${hoek}`}
    >
      {uitgelicht && (
        <Sticker kleur="zon" hoek="rotate-6" className="absolute -right-3 -top-3 z-10">
          Aanrader
        </Sticker>
      )}
      <div className="overflow-hidden rounded-t-2xl">
        <Foto
          foto={fotoVoorPakket(pakket.slug)}
          verhouding="aspect-[16/10]"
          sizes="(min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={`h-2 ${kleur}`} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl font-extrabold text-inkt underline decoration-vlam-400 decoration-4 underline-offset-4">
          {pakket.naam}
        </h3>
        <p className="mt-1 text-sm font-bold uppercase tracking-wide text-grijs">{pakket.voorWie}</p>
        <ul className="mt-4 flex-1 space-y-1 text-inkt">
          {TIJDVAKKEN.map((t) => {
            const b = vindBouwsteen(pakket.blokken[t.id]);
            return b ? (
              <li key={t.id} className="flex gap-3">
                <span className="w-12 shrink-0 font-bold text-zee-600">{t.van}</span>
                <span>{b.naam}</span>
              </li>
            ) : null;
          })}
        </ul>
        <p className="mt-5 flex items-baseline gap-2">
          <span className="text-4xl font-black text-inkt">{formatEuro(prijsPerPersoon(pakket.blokken))}</span>
          <span className="text-sm text-grijs">per persoon</span>
        </p>
      </div>
    </Link>
  );
}

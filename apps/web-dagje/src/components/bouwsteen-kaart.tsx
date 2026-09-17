import { TIJDVAKKEN, formatEuro, type Bouwsteen } from '../lib/aanbod';

export function BouwsteenKaart({ blok }: { blok: Bouwsteen }) {
  const tijden = TIJDVAKKEN.filter((t) => blok.tijdvakken.includes(t.id))
    .map((t) => `${t.naam.toLowerCase()} (${t.van})`)
    .join(' of ');
  return (
    <div id={blok.slug} className="bg-white rounded-2xl p-5 border border-canal-100 scroll-mt-28">
      <div className="flex justify-between items-start gap-3">
        <h3 className="font-serif text-xl text-canal-900">
          <span aria-hidden="true">{blok.emoji}</span> {blok.naam}
        </h3>
        <p className="text-canal-900 whitespace-nowrap">
          <span className="font-semibold">{formatEuro(blok.verkoopCents)}</span>
          <span className="text-xs text-canal-500"> p.p.</span>
        </p>
      </div>
      <p className="text-sm text-canal-700 mt-2">{blok.beschrijving}</p>
      <dl className="mt-3 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1 text-xs text-canal-600">
        <dt className="text-canal-400">Waar</dt>
        <dd>{blok.locatie}</dd>
        <dt className="text-canal-400">Duur</dt>
        <dd>{blok.duur}</dd>
        <dt className="text-canal-400">Wanneer</dt>
        <dd>{tijden}</dd>
        <dt className="text-canal-400">Groep</dt>
        <dd>
          {blok.minPers} tot {blok.maxPers} personen
        </dd>
        {blok.seizoen && (
          <>
            <dt className="text-canal-400">Seizoen</dt>
            <dd>april tot en met oktober</dd>
          </>
        )}
        <dt className="text-canal-400">Inclusief</dt>
        <dd>{blok.inclusief.join(', ')}</dd>
      </dl>
    </div>
  );
}

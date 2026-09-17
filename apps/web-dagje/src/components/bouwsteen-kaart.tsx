import { CLUSTERS, TIJDVAKKEN, formatEuro, type Bouwsteen } from '../lib/aanbod';
import { fotoVoorBouwsteen } from '../lib/fotos';
import { Foto } from './ui';

const CLUSTER_KLEUR = {
  centrum: 'bg-vlam-400 text-inkt',
  amelisweerd: 'bg-zee-400 text-inkt',
  beide: 'bg-zon-400 text-inkt',
} as const;

export function BouwsteenKaart({ blok, hoek = '' }: { blok: Bouwsteen; hoek?: string }) {
  const tijden = TIJDVAKKEN.filter((t) => blok.tijdvakken.includes(t.id))
    .map((t) => `${t.naam.toLowerCase()} ${t.van}`)
    .join(' of ');
  return (
    <div
      id={blok.slug}
      className={`kantel group scroll-mt-28 overflow-hidden rounded-2xl bg-white shadow-xl transition-transform hover:rotate-0 ${hoek}`}
    >
      <div className="relative overflow-hidden">
        <Foto
          foto={fotoVoorBouwsteen(blok.slug)}
          verhouding="aspect-[16/10]"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-white px-4 py-1.5 text-lg font-black text-inkt shadow-lg">
          {formatEuro(blok.verkoopCents)} <span className="text-xs font-bold text-grijs">p.p.</span>
        </span>
      </div>
      <div className={`px-5 py-2 text-sm font-extrabold uppercase tracking-wide ${CLUSTER_KLEUR[blok.cluster]}`}>
        {blok.cluster === 'beide' ? 'Onderweg' : CLUSTERS[blok.cluster].naam} · {blok.duur}
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-extrabold leading-tight text-inkt">{blok.naam}</h3>
        <p className="mt-2 text-grijs">{blok.beschrijving}</p>
        <dl className="mt-4 grid grid-cols-[6rem_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="font-bold text-inkt">Waar</dt>
          <dd className="text-grijs">{blok.locatie}</dd>
          <dt className="font-bold text-inkt">Wanneer</dt>
          <dd className="text-grijs">{tijden}</dd>
          <dt className="font-bold text-inkt">Groep</dt>
          <dd className="text-grijs">
            {blok.minPers} tot {blok.maxPers} personen
          </dd>
          {blok.seizoen && (
            <>
              <dt className="font-bold text-inkt">Seizoen</dt>
              <dd className="text-grijs">april tot en met oktober</dd>
            </>
          )}
          <dt className="font-bold text-inkt">Inclusief</dt>
          <dd className="text-grijs">{blok.inclusief.join(', ')}</dd>
        </dl>
      </div>
    </div>
  );
}

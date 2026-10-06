import Link from 'next/link';
import { CLUSTERS, TIJDVAKKEN, formatEuro, maandenTekst, type Bouwsteen } from '../lib/aanbod';
import { fotoVoorBouwsteen } from '../lib/fotos';
import { bouwsteenIn, clusterLabel, maandenTekstIn, tijdvakInZin, ui } from '../lib/i18n';
import { formatPrijs } from '../lib/i18n/opmaak';
import { fotoIn } from '../lib/i18n/foto-alt';
import { detailPad, type Vertaald } from '../lib/talen';
import { Foto } from './ui';

const CLUSTER_KLEUR = {
  centrum: 'bg-vlam-400 text-inkt',
  amelisweerd: 'bg-zee-400 text-inkt',
  beide: 'bg-zon-400 text-inkt',
} as const;

export function BouwsteenKaart({ blok, hoek = '', taal }: { blok: Bouwsteen; hoek?: string; taal?: Vertaald }) {
  if (taal) return <VertaaldeKaart blok={blok} hoek={hoek} taal={taal} />;
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
        <h3 className="text-2xl font-extrabold leading-tight text-inkt">
          <Link href={`/bouwstenen/${blok.slug}`} className="hover:underline">
            {blok.naam}
          </Link>
        </h3>
        <p className="mt-2 text-grijs">{blok.beschrijving}</p>
        <dl className="mt-4 grid grid-cols-[6rem_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="font-bold text-inkt">Waar</dt>
          <dd className="text-grijs">{blok.locatie}</dd>
          <dt className="font-bold text-inkt">Wanneer</dt>
          <dd className="text-grijs">{tijden}</dd>
          <dt className="font-bold text-inkt">Groep</dt>
          <dd className="text-grijs">
            vanaf {blok.minPers} personen
          </dd>
          {blok.seizoen && (
            <>
              <dt className="font-bold text-inkt">Seizoen</dt>
              <dd className="text-grijs">{maandenTekst(blok.seizoen)}</dd>
            </>
          )}
          <dt className="font-bold text-inkt">Inclusief</dt>
          <dd className="text-grijs">{blok.inclusief.join(', ')}</dd>
        </dl>
        <p className="mt-4">
          <Link href={`/bouwstenen/${blok.slug}`} className="font-bold text-inkt underline">
            Meer over {blok.naam.toLowerCase()}
          </Link>
        </p>
      </div>
    </div>
  );
}

/** Dezelfde kaart in het Engels of Duits. */
function VertaaldeKaart({ blok, hoek, taal }: { blok: Bouwsteen; hoek: string; taal: Vertaald }) {
  const v = bouwsteenIn(taal, blok);
  if (!v) return null;
  const t = ui(taal).bouwsteenKaart;
  const href = detailPad(taal, 'bouwsteen', blok.slug)!;
  const tijden = TIJDVAKKEN.filter((x) => blok.tijdvakken.includes(x.id))
    .map((x) => `${tijdvakInZin(taal, x.id)} ${x.van}`)
    .join(t.of);
  return (
    <div
      id={blok.slug}
      className={`kantel group scroll-mt-28 overflow-hidden rounded-2xl bg-white shadow-xl transition-transform hover:rotate-0 ${hoek}`}
    >
      <div className="relative overflow-hidden">
        <Foto
          foto={fotoIn(taal, fotoVoorBouwsteen(blok.slug))}
          verhouding="aspect-[16/10]"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-white px-4 py-1.5 text-lg font-black text-inkt shadow-lg">
          {formatPrijs(taal, blok.verkoopCents)} <span className="text-xs font-bold text-grijs">p.p.</span>
        </span>
      </div>
      <div className={`px-5 py-2 text-sm font-extrabold uppercase tracking-wide ${CLUSTER_KLEUR[blok.cluster]}`}>
        {clusterLabel(taal, blok)} · {v.tekst.duur}
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-extrabold leading-tight text-inkt">
          <Link href={href} className="hover:underline">
            {v.tekst.naam}
          </Link>
        </h3>
        <p className="mt-2 text-grijs">{v.tekst.beschrijving}</p>
        <dl className="mt-4 grid grid-cols-[6rem_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="font-bold text-inkt">{t.waar}</dt>
          <dd className="text-grijs">{v.tekst.locatie}</dd>
          <dt className="font-bold text-inkt">{t.wanneer}</dt>
          <dd className="text-grijs">{tijden}</dd>
          <dt className="font-bold text-inkt">{t.groep}</dt>
          <dd className="text-grijs">{t.vanaf(blok.minPers)}</dd>
          {blok.seizoen && (
            <>
              <dt className="font-bold text-inkt">{t.seizoen}</dt>
              <dd className="text-grijs">{maandenTekstIn(taal, blok.seizoen)}</dd>
            </>
          )}
          <dt className="font-bold text-inkt">{t.inclusief}</dt>
          <dd className="text-grijs">{v.tekst.inclusief.join(', ')}</dd>
        </dl>
        <p className="mt-4">
          <Link href={href} className="font-bold text-inkt underline">
            {t.meer(v.tekst.naam)}
          </Link>
        </p>
      </div>
    </div>
  );
}

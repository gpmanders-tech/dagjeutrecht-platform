import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CLUSTERS,
  PAKKETTEN,
  REGELS,
  TIJDVAKKEN,
  formatEuro,
  maandenTekst,
  pakketMaanden,
  prijsPerPersoon,
  vindBouwsteen,
  vindPakket,
} from '../../../lib/aanbod';
import { fotoVoorBouwsteen, fotoVoorPakket } from '../../../lib/fotos';
import { Breadcrumbs } from '../../../components/seo-jsonld';
import { PakketKaart } from '../../../components/pakket-kaart';
import { BoekBlok, Foto, HOEKEN, Knop, PaginaKop } from '../../../components/ui';

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return PAKKETTEN.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = vindPakket(params.slug);
  if (!p) return {};
  return {
    title: `${p.naam}: dagpakket Utrecht`,
    description: `${p.kort} Vaste prijs ${formatEuro(prijsPerPersoon(p.blokken))} per persoon.`,
    alternates: { canonical: `/pakketten/${p.slug}` },
  };
}

const TIJD_KLEUR = ['bg-zee-400', 'bg-zon-400', 'bg-vlam-400', 'bg-zee-400', 'bg-inkt text-white'];

export default function PakketPage({ params }: { params: { slug: string } }) {
  const p = vindPakket(params.slug);
  if (!p) notFound();
  const pp = prijsPerPersoon(p.blokken);
  const onderdelen = TIJDVAKKEN.flatMap((t, i) => {
    const b = vindBouwsteen(p.blokken[t.id]);
    return b ? [{ t, b, i }] : [];
  });

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Pakketten', url: '/pakketten' },
          { name: p.naam, url: `/pakketten/${p.slug}` },
        ]}
      />
      <PaginaKop
        titel={p.naam}
        intro={
          <>
            <p>{p.beschrijving}</p>
            <p className="mt-2 font-bold">Voor: {p.voorWie}</p>
            {pakketMaanden(p) && <p className="mt-1 font-bold">Te boeken van {maandenTekst(pakketMaanden(p)!)}</p>}
          </>
        }
        kleur="inkt"
        foto={fotoVoorPakket(p.slug)}
        label={`${formatEuro(pp)} per persoon`}
        knop={{ href: `/boeken?pakket=${p.slug}`, tekst: 'Kies datum en boek' }}
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">Het programma</h2>
        <ol className="mt-10 space-y-10">
          {onderdelen.map(({ t, b, i }, n) => (
            <li key={t.id} className="grid items-center gap-6 md:grid-cols-5">
              <Foto
                foto={fotoVoorBouwsteen(b.slug)}
                verhouding={`aspect-[4/3] md:col-span-2 ${HOEKEN[n % HOEKEN.length]} ${n % 2 ? 'md:order-2' : ''}`}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="kantel polaroid rounded-sm"
              />
              <div className="md:col-span-3">
                <span className={`inline-flex rounded-lg px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-inkt ${TIJD_KLEUR[i]}`}>
                  {t.van} tot {t.tot}
                </span>
                <h3 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight text-inkt">{b.naam}</h3>
                <p className="mt-3 text-lg text-grijs">{b.beschrijving}</p>
                <p className="mt-2 text-sm font-bold text-inkt">
                  {b.cluster === 'beide' ? 'Onderweg' : CLUSTERS[b.cluster].naam} · {b.locatie}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-vlam-50">
        <div className="relative mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-6xl font-black text-inkt">{formatEuro(pp)}</p>
            <p className="mt-1 text-lg font-bold text-inkt">per persoon, inclusief btw</p>
            <p className="mt-2 text-grijs">
              vanaf {REGELS.minPers} personen · donderdag, vrijdag of zaterdag · minimaal{' '}
              {REGELS.minDagenVooruit} dagen vooruit
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Knop href={`/boeken?pakket=${p.slug}`} className="text-lg">
              Kies datum en boek
            </Knop>
            <Knop href="/boeken" variant="secundair">
              Onderdelen wisselen
            </Knop>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">Andere pakketten</h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {PAKKETTEN.filter((x) => x.slug !== p.slug).map((x, i) => (
            <li key={x.slug}>
              <PakketKaart pakket={x} hoek={HOEKEN[i % HOEKEN.length]} />
            </li>
          ))}
        </ul>
      </section>

      <BoekBlok foto={fotoVoorPakket(p.slug)} />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PAKKETTEN,
  REGELS,
  TIJDVAKKEN,
  formatEuro,
  prijsPerPersoon,
  vindBouwsteen,
  vindPakket,
} from '../../../lib/aanbod';
import { Breadcrumbs } from '../../../components/seo-jsonld';

export const dynamicParams = false;

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

export default function PakketPage({ params }: { params: { slug: string } }) {
  const p = vindPakket(params.slug);
  if (!p) notFound();
  const pp = prijsPerPersoon(p.blokken);

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Pakketten', url: '/pakketten' },
          { name: p.naam, url: `/pakketten/${p.slug}` },
        ]}
      />
      <p className="text-sm text-canal-500 mb-2">
        <Link href="/pakketten" className="hover:underline">
          Pakketten
        </Link>{' '}
        / {p.naam}
      </p>
      <h1 className="font-serif text-4xl md:text-5xl text-canal-900 mb-3">
        <span aria-hidden="true">{p.emoji}</span> {p.naam}
      </h1>
      <p className="text-lg text-canal-700 mb-2">{p.beschrijving}</p>
      <p className="text-sm text-canal-500 mb-10">Geschikt voor: {p.voorWie}</p>

      <h2 className="font-serif text-2xl text-canal-900 mb-4">Het programma</h2>
      <ol className="space-y-3 mb-10">
        {TIJDVAKKEN.map((t) => {
          const b = vindBouwsteen(p.blokken[t.id]);
          if (!b) return null;
          return (
            <li
              key={t.id}
              className="grid grid-cols-[4rem_1fr] gap-4 rounded-2xl border border-canal-100 bg-white p-4"
            >
              <span className="text-canal-500 text-sm pt-1">
                {t.van}
                <br />
                {t.tot}
              </span>
              <div>
                <p className="font-medium text-canal-900">
                  <span aria-hidden="true">{b.emoji}</span> {b.naam}
                </p>
                <p className="text-sm text-canal-700 mt-1">{b.beschrijving}</p>
                <p className="text-xs text-canal-500 mt-2">{b.locatie}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="rounded-3xl bg-canal-900 text-white p-8 md:flex md:items-center md:justify-between gap-6">
        <div>
          <p className="text-3xl font-semibold">
            {formatEuro(pp)} <span className="text-base font-normal text-cream/70">per persoon</span>
          </p>
          <p className="text-sm text-cream/70 mt-1">
            Inclusief btw · {REGELS.minPers} tot {REGELS.maxPers} personen · donderdag, vrijdag of zaterdag
          </p>
        </div>
        <Link
          href={`/boeken?pakket=${p.slug}`}
          className="mt-6 md:mt-0 inline-flex items-center rounded-full bg-terracotta-500 hover:bg-terracotta-400 px-6 py-3 font-medium whitespace-nowrap"
        >
          Kies datum en boek →
        </Link>
      </div>
      <p className="text-sm text-canal-500 mt-4">
        Liever iets anders in de middag? In de samensteller wissel je onderdelen om.
      </p>
    </main>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  BOUWSTENEN,
  CLUSTERS,
  REGELS,
  TIJDVAKKEN,
  formatEuro,
  maandenTekst,
  vindBouwsteen,
} from '../../../lib/aanbod';
import { seoVoorBouwsteen } from '../../../lib/bouwsteen-seo';
import { fotoVoorBouwsteen } from '../../../lib/fotos';
import { Breadcrumbs, EventOrProductSchema, FaqSchema } from '../../../components/seo-jsonld';
import { BouwsteenKaart } from '../../../components/bouwsteen-kaart';
import { BoekBlok, HOEKEN, Knop, PaginaKop } from '../../../components/ui';

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return BOUWSTENEN.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = vindBouwsteen(params.slug);
  if (!b) return {};
  const seo = seoVoorBouwsteen(b.slug);
  return {
    title: seo?.titel ?? `${b.naam} in Utrecht`,
    description: seo?.beschrijving ?? `${b.kort} Vanaf ${b.minPers} personen, ${formatEuro(b.verkoopCents)} per persoon.`,
    alternates: { canonical: `/bouwstenen/${b.slug}` },
  };
}

export default function BouwsteenPage({ params }: { params: { slug: string } }) {
  const b = vindBouwsteen(params.slug);
  if (!b) notFound();
  const seo = seoVoorBouwsteen(b.slug);
  const foto = fotoVoorBouwsteen(b.slug);
  const tijden = TIJDVAKKEN.filter((t) => b.tijdvakken.includes(t.id));
  const verwant = BOUWSTENEN.filter((x) => x.slug !== b.slug && x.cluster === b.cluster).slice(0, 3);

  const praktisch: Array<[string, string]> = [
    ['Waar', b.locatie],
    ['Duur', b.duur],
    ['Wanneer', tijden.map((t) => `${t.naam.toLowerCase()} ${t.van} tot ${t.tot}`).join(' of ')],
    ['Groep', `vanaf ${b.minPers} tot ${b.maxPers} personen`],
    ['Inclusief', b.inclusief.join(', ')],
    ...(b.seizoen ? ([['Seizoen', maandenTekst(b.seizoen)]] as Array<[string, string]>) : []),
  ];

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Onderdelen', url: '/bouwstenen' },
          { name: b.naam, url: `/bouwstenen/${b.slug}` },
        ]}
      />
      <EventOrProductSchema
        name={b.naam}
        description={b.beschrijving}
        price={b.verkoopCents}
        image={foto?.src}
        category={CLUSTERS[b.cluster].naam}
        url={`/bouwstenen/${b.slug}`}
      />
      {seo && <FaqSchema items={seo.vragen} />}

      <PaginaKop
        titel={b.naam}
        intro={
          <>
            <p>{b.beschrijving}</p>
            <p className="mt-2 font-bold">
              {b.duur} · vanaf {b.minPers} personen
              {b.seizoen ? ` · ${maandenTekst(b.seizoen)}` : ''}
            </p>
          </>
        }
        kleur={b.cluster === 'amelisweerd' ? 'zee' : b.cluster === 'centrum' ? 'vlam' : 'zon'}
        foto={foto}
        label={`${formatEuro(b.verkoopCents)} per persoon`}
        knop={{ href: '/boeken', tekst: 'Stel je dag samen' }}
      />

      {seo && (
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          {seo.tekst.map((alinea, i) => (
            <p key={i} className={`text-lg leading-relaxed text-grijs ${i ? 'mt-5' : ''}`}>
              {alinea}
            </p>
          ))}
          {seo.verwijzing && (
            <p className="mt-8 rounded-2xl bg-zon-100 px-6 py-5 text-lg text-inkt">
              {seo.verwijzing.tekst}{' '}
              <a href={seo.verwijzing.href} className="font-bold underline">
                {seo.verwijzing.link}
              </a>
            </p>
          )}
        </section>
      )}

      <section className="bg-zee-50">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">Praktisch</h2>
          <dl className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-[8rem_1fr]">
            {praktisch.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-extrabold uppercase tracking-wide text-inkt">{k}</dt>
                <dd className="text-lg text-grijs">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <p className="text-5xl font-black text-inkt">{formatEuro(b.verkoopCents)}</p>
            <div>
              <p className="font-bold text-inkt">per persoon, inclusief btw</p>
              <p className="text-grijs">
                donderdag, vrijdag of zaterdag · minimaal {REGELS.minDagenVooruit} dagen vooruit
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Knop href="/boeken" className="text-lg">
              Stel je dag samen
            </Knop>
          </div>
        </div>
      </section>

      {seo && (
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">Veelgestelde vragen</h2>
          <dl className="mt-8 space-y-6">
            {seo.vragen.map((v) => (
              <div key={v.q}>
                <dt className="text-xl font-extrabold text-inkt">{v.q}</dt>
                <dd className="mt-2 text-lg text-grijs">{v.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {verwant.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">
            Combineer het met
          </h2>
          <p className="mt-3 text-lg text-grijs">
            Andere onderdelen {b.cluster === 'beide' ? 'onderweg' : `in ${CLUSTERS[b.cluster].naam.toLowerCase()}`}, op
            dezelfde dag te boeken.
          </p>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {verwant.map((x, i) => (
              <li key={x.slug}>
                <BouwsteenKaart blok={x} hoek={HOEKEN[i % HOEKEN.length]} />
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/bouwstenen" className="text-lg font-bold text-inkt underline">
              Alle onderdelen bekijken
            </Link>
          </p>
        </section>
      )}

      <BoekBlok foto={foto} />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PAKKETTEN,
  TIJDVAKKEN,
  prijsPerPersoon,
  vindBouwsteen,
  type Cluster,
} from '../../lib/aanbod';
import { fotos, fotoVoorBouwsteen } from '../../lib/fotos';
import {
  aanbodTekst,
  bouwsteenIn,
  bouwstenenIn,
  maandenTekstIn,
  pakketIn,
  tijdvakInZin,
  ui,
} from '../../lib/i18n';
import { formatPrijs } from '../../lib/i18n/opmaak';
import { fotoIn } from '../../lib/i18n/foto-alt';
import { vul } from '../../lib/i18n/vul';
import {
  PADEN,
  SLUGS,
  detailAlternates,
  detailPad,
  nlSlug,
  paginaAlternates,
  type Vertaald,
} from '../../lib/talen';
import { BouwsteenKaart } from '../bouwsteen-kaart';
import { Breadcrumbs, EventOrProductSchema, FaqSchema } from '../seo-jsonld';
import { Band, BoekBlok, HOEKEN, Knop, PaginaKop, Sticker } from '../ui';
import { boekBlok } from './home';
import { vertaaldeMeta } from './meta';

// ============== Overzicht ==============

export function bouwstenenMetadata(taal: Vertaald): Metadata {
  const t = ui(taal).bouwstenen;
  const meta = vertaaldeMeta(taal, {
    titel: t.metaTitel(bouwstenenIn(taal).length),
    omschrijving: t.metaOmschrijving,
    alternates: paginaAlternates(taal, 'bouwstenen'),
    foto: fotos.kanoGracht,
  });
  return { ...meta, openGraph: { ...meta.openGraph, description: t.ogOmschrijving } };
}

const SECTIES: Array<{ cluster: Cluster; kleur: 'zee' | 'vlam' | 'zon'; achtergrond: string }> = [
  { cluster: 'amelisweerd', kleur: 'zee', achtergrond: 'bg-zee-50' },
  { cluster: 'centrum', kleur: 'vlam', achtergrond: 'bg-vlam-50' },
  { cluster: 'beide', kleur: 'zon', achtergrond: 'bg-zon-100' },
];

export function BouwstenenOverzicht({ taal }: { taal: Vertaald }) {
  const t = ui(taal).bouwstenen;
  const a = aanbodTekst(taal);
  const alle = bouwstenenIn(taal);
  const lijst = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.lijstNaam,
    numberOfItems: alle.length,
    itemListElement: alle.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://dagjeutrecht.nl${detailPad(taal, 'bouwsteen', b.slug)}`,
      name: b.tekst.naam,
    })),
  };

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: ui(taal).landing.kruimelHome, url: PADEN.home[taal] },
          { name: t.kruimel, url: PADEN.bouwstenen[taal] },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lijst) }}
      />
      <PaginaKop
        titel={t.titel}
        intro={t.intro}
        kleur="vlam"
        foto={fotoIn(taal, fotos.kanoGracht)}
        label={t.label(alle.length)}
        knop={{ href: PADEN.boeken[taal], tekst: t.knop }}
      />
      <div className="-mt-3">
        <Band woorden={alle.map((b) => b.tekst.naam)} kleur="bg-zee-400 text-inkt" />
      </div>
      {SECTIES.map((s) => (
        <section key={s.cluster} className={s.achtergrond}>
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <Sticker kleur={s.kleur} hoek="rotate-2">
              {t.secties[s.cluster].sticker}
            </Sticker>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">
              {t.secties[s.cluster].titel}
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-grijs">{a.clusters[s.cluster].uitleg}</p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {alle
                .filter((b) => b.cluster === s.cluster)
                .map((b, i) => (
                  <BouwsteenKaart
                    key={b.slug}
                    blok={b}
                    hoek={HOEKEN[i % HOEKEN.length]}
                    taal={taal}
                  />
                ))}
            </div>
          </div>
        </section>
      ))}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">
            {t.aanvraagKop}
          </h2>
          <p className="mt-3 text-lg text-grijs">{t.aanvraagTekst}</p>
        </div>
      </section>
      <BoekBlok {...boekBlok(taal)} foto={fotoIn(taal, fotos.supOudegracht)} />
    </>
  );
}

// ============== Detail ==============

export function bouwsteenParams(taal: Vertaald) {
  return bouwstenenIn(taal).map((b) => ({ slug: SLUGS.bouwsteen[b.slug]![taal] }));
}

function vind(taal: Vertaald, slug: string) {
  return bouwsteenIn(taal, vindBouwsteen(nlSlug(taal, 'bouwsteen', slug)));
}

/** Zoekmachineteksten met {prijs} ingevuld. */
function seoVan(taal: Vertaald, b: NonNullable<ReturnType<typeof vind>>) {
  const prijs = formatPrijs(taal, b.verkoopCents);
  const v = (s: string) => vul(s, { prijs });
  const seo = b.tekst.seo;
  return {
    ...seo,
    titel: v(seo.titel),
    beschrijving: v(seo.beschrijving),
    tekst: seo.tekst.map(v),
    vragen: seo.vragen.map((x) => ({ q: v(x.q), a: v(x.a) })),
  };
}

export function bouwsteenMetadata(taal: Vertaald, slug: string): Metadata {
  const b = vind(taal, slug);
  if (!b) return {};
  const seo = seoVan(taal, b);
  return vertaaldeMeta(taal, {
    titel: seo.titel,
    omschrijving: seo.beschrijving,
    alternates: detailAlternates(taal, 'bouwsteen', b.slug),
    foto: fotoVoorBouwsteen(b.slug),
  });
}

export function BouwsteenDetail({ taal, slug }: { taal: Vertaald; slug: string }) {
  const b = vind(taal, slug);
  if (!b) notFound();
  const t = ui(taal).bouwsteen;
  const a = aanbodTekst(taal);
  const seo = seoVan(taal, b);
  const foto = fotoVoorBouwsteen(b.slug);
  const href = detailPad(taal, 'bouwsteen', b.slug)!;
  const prijs = formatPrijs(taal, b.verkoopCents);
  const tijden = TIJDVAKKEN.filter((x) => b.tijdvakken.includes(x.id));
  const inPakketten = PAKKETTEN.filter((p) => Object.values(p.blokken).includes(b.slug))
    .map((p) => pakketIn(taal, p))
    .filter((p) => p !== null);
  const verwant = bouwstenenIn(taal)
    .filter((x) => x.slug !== b.slug && x.cluster === b.cluster)
    .slice(0, 3);

  const praktisch: Array<[string, string]> = [
    [t.waar, b.tekst.locatie],
    [t.duur, b.tekst.duur],
    [
      t.wanneer,
      tijden.map((x) => `${tijdvakInZin(taal, x.id)} ${x.van} ${t.tot} ${x.tot}`).join(t.of),
    ],
    [t.groep, t.groepTekst(b.minPers, b.maxPers)],
    [t.inclusief, b.tekst.inclusief.join(', ')],
    ...(b.seizoen
      ? ([[t.seizoen, maandenTekstIn(taal, b.seizoen)]] as Array<[string, string]>)
      : []),
  ];

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: ui(taal).landing.kruimelHome, url: PADEN.home[taal] },
          { name: t.kruimel, url: PADEN.bouwstenen[taal] },
          { name: b.tekst.naam, url: href },
        ]}
      />
      <EventOrProductSchema
        name={b.tekst.naam}
        description={b.tekst.beschrijving}
        price={b.verkoopCents}
        image={`https://dagjeutrecht.nl${foto.src}`}
        category={a.clusters[b.cluster].naam}
        url={href}
      />
      <FaqSchema items={seo.vragen} />

      <PaginaKop
        titel={b.tekst.naam}
        intro={
          <>
            <p>{b.tekst.beschrijving}</p>
            <p className="mt-2 font-bold">
              {b.tekst.duur} · {t.vanaf(b.minPers)}
              {b.seizoen ? ` · ${maandenTekstIn(taal, b.seizoen)}` : ''}
            </p>
          </>
        }
        kleur={b.cluster === 'amelisweerd' ? 'zee' : b.cluster === 'centrum' ? 'vlam' : 'zon'}
        foto={fotoIn(taal, foto)}
        label={`${prijs} ${t.perPersoon}`}
        knop={{ href: PADEN.boeken[taal], tekst: t.stelSamen }}
      />

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

      <section className="bg-zee-50">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">{t.praktisch}</h2>
          <dl className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-[8rem_1fr]">
            {praktisch.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-extrabold uppercase tracking-wide text-inkt">{k}</dt>
                <dd className="text-lg text-grijs">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <p className="text-5xl font-black text-inkt">{prijs}</p>
            <div>
              <p className="font-bold text-inkt">{t.perPersoonBtw}</p>
              <p className="text-grijs">{t.regels}</p>
            </div>
          </div>
          <div className="mt-8">
            <Knop href={PADEN.boeken[taal]} className="text-lg">
              {t.stelSamen}
            </Knop>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">{t.faqKop}</h2>
        <dl className="mt-8 space-y-6">
          {seo.vragen.map((v) => (
            <div key={v.q}>
              <dt className="text-xl font-extrabold text-inkt">{v.q}</dt>
              <dd className="mt-2 text-lg text-grijs">{v.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {inPakketten.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">
            {t.inPakketten}
          </h2>
          <ul className="mt-6 space-y-3">
            {inPakketten.map((p) => (
              <li key={p.slug} className="text-lg text-grijs">
                <Link
                  href={detailPad(taal, 'pakket', p.slug)!}
                  className="font-extrabold text-inkt underline decoration-vlam-400 decoration-2 underline-offset-4"
                >
                  {p.tekst.naam}
                </Link>{' '}
                ({formatPrijs(taal, prijsPerPersoon(p.blokken))} {t.perPersoon}): {p.tekst.kort}
              </li>
            ))}
          </ul>
        </section>
      )}

      {verwant.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">{t.combineer}</h2>
          <p className="mt-3 text-lg text-grijs">
            {t.andere(b.cluster === 'beide' ? t.onderweg : t.inCluster(a.clusters[b.cluster].naam))}
          </p>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {verwant.map((x, i) => (
              <li key={x.slug}>
                <BouwsteenKaart blok={x} hoek={HOEKEN[i % HOEKEN.length]} taal={taal} />
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href={PADEN.bouwstenen[taal]} className="text-lg font-bold text-inkt underline">
              {t.alleBekijken}
            </Link>
          </p>
        </section>
      )}

      <BoekBlok {...boekBlok(taal)} foto={fotoIn(taal, foto)} />
    </>
  );
}

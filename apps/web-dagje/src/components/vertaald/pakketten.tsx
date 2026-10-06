import type { Metadata } from 'next';
import { fotoIn } from '../../lib/i18n/foto-alt';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PAKKETTEN,
  REGELS,
  TIJDVAKKEN,
  pakketMaanden,
  pakkettenOpSeizoen,
  prijsPerPersoon,
  vindBouwsteen,
  vindPakket,
} from '../../lib/aanbod';
import { fotos, fotoVoorBouwsteen, fotoVoorPakket } from '../../lib/fotos';
import {
  VERTAALDE_LANDINGS,
  bouwsteenIn,
  clusterLabel,
  landingTekst,
  maandenTekstIn,
  pakketIn,
  pakkettenIn,
  ui,
} from '../../lib/i18n';
import { formatPrijs } from '../../lib/i18n/opmaak';
import { LANDINGS } from '../../lib/landings';
import {
  PADEN,
  SLUGS,
  detailAlternates,
  detailPad,
  nlSlug,
  paginaAlternates,
  type Vertaald,
} from '../../lib/talen';
import { PakketKaart } from '../pakket-kaart';
import { Breadcrumbs, EventOrProductSchema, FaqSchema } from '../seo-jsonld';
import { Band, BoekBlok, Foto, HOEKEN, Knop, PaginaKop } from '../ui';
import { boekBlok } from './home';
import { vertaaldeMeta } from './meta';

// ============== Overzicht ==============

function prijsGrenzen(taal: Vertaald) {
  const prijzen = PAKKETTEN.map((p) => prijsPerPersoon(p.blokken));
  return {
    laagste: formatPrijs(taal, Math.min(...prijzen)),
    hoogste: formatPrijs(taal, Math.max(...prijzen)),
  };
}

export function pakkettenMetadata(taal: Vertaald): Metadata {
  const t = ui(taal).pakketten;
  const { laagste, hoogste } = prijsGrenzen(taal);
  const aantal = pakkettenIn(taal).length;
  return vertaaldeMeta(taal, {
    titel: t.metaTitel(aantal, laagste),
    omschrijving: t.metaOmschrijving(aantal, laagste, hoogste),
    alternates: paginaAlternates(taal, 'pakketten'),
    foto: fotos.supVrijgezellen,
  });
}

export function PakkettenOverzicht({ taal }: { taal: Vertaald }) {
  const t = ui(taal).pakketten;
  const alle = pakkettenIn(taal);
  const { laagste } = prijsGrenzen(taal);
  // Zelfde regel als de Nederlandse pagina: de kortere pakketten beginnen met 'Halve'.
  const halveDagen = alle.filter((p) => /^Halve/.test(p.kort));
  const home = ui(taal).landing.kruimelHome;
  const lijst = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.lijstNaam,
    numberOfItems: alle.length,
    itemListElement: alle.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://dagjeutrecht.nl${detailPad(taal, 'pakket', p.slug)}`,
      name: p.tekst.naam,
    })),
  };

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: home, url: PADEN.home[taal] },
          { name: t.kruimel, url: PADEN.pakketten[taal] },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lijst) }}
      />
      <PaginaKop
        titel={t.titel}
        intro={t.intro}
        kleur="zee"
        foto={fotoIn(taal, fotos.supVrijgezellen)}
        label={t.label}
        knop={{ href: PADEN.boeken[taal], tekst: t.knop }}
      />
      <div className="-mt-3">
        <Band woorden={alle.map((p) => p.tekst.naam)} />
      </div>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <ul className="grid gap-8 sm:grid-cols-2">
          {pakkettenIn(taal, pakkettenOpSeizoen()).map((p, i) => (
            <li key={p.slug}>
              <PakketKaart pakket={p} hoek={HOEKEN[i % HOEKEN.length]} taal={taal} />
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-zee-50">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-inkt">
              {t.zoWerktKop}
            </h2>
            <p className="mt-3 text-lg text-grijs">{t.zoWerkt1}</p>
            <p className="mt-3 text-lg text-grijs">
              {t.zoWerkt2(TIJDVAKKEN[0]!.van, TIJDVAKKEN[TIJDVAKKEN.length - 1]!.tot)}
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-inkt">
              {t.halfKop}
            </h2>
            <p className="mt-3 text-lg text-grijs">
              {t.half(halveDagen.length, halveDagen.map((p) => p.tekst.naam).join(', '), laagste)}
            </p>
            <p className="mt-3 text-lg text-grijs">{t.gelegenheid}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {VERTAALDE_LANDINGS.map((s) => (
                <li key={s}>
                  <Link
                    href={PADEN[s][taal]}
                    className="inline-flex rounded-full border-2 border-zee-400 bg-white px-4 py-2 font-bold text-inkt transition-colors hover:bg-zee-400"
                  >
                    {landingTekst(taal, s).link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <BoekBlok
        {...boekBlok(taal)}
        titel={t.boekBlokTitel}
        tekst={t.boekBlokTekst}
        foto={fotoIn(taal, fotos.kickbikeGracht)}
      />
    </>
  );
}

// ============== Detail ==============

/** Slugs in de taal van de pagina, voor generateStaticParams. */
export function pakketParams(taal: Vertaald) {
  return pakkettenIn(taal).map((p) => ({ slug: SLUGS.pakket[p.slug]![taal] }));
}

function vind(taal: Vertaald, slug: string) {
  const nl = nlSlug(taal, 'pakket', slug);
  return pakketIn(taal, vindPakket(nl));
}

export function pakketMetadata(taal: Vertaald, slug: string): Metadata {
  const p = vind(taal, slug);
  if (!p) return {};
  const t = ui(taal).pakket;
  const prijs = formatPrijs(taal, prijsPerPersoon(p.blokken));
  return vertaaldeMeta(taal, {
    titel: t.metaTitel(p.tekst.naam, prijs),
    omschrijving: t.metaOmschrijving(p.tekst.naam, p.tekst.kort, p.tekst.voorWie, prijs),
    alternates: detailAlternates(taal, 'pakket', p.slug),
    foto: fotoVoorPakket(p.slug),
  });
}

const TIJD_KLEUR = ['bg-zee-400', 'bg-zon-400', 'bg-vlam-400', 'bg-zee-400', 'bg-inkt text-white'];

export function PakketDetail({ taal, slug }: { taal: Vertaald; slug: string }) {
  const p = vind(taal, slug);
  if (!p) notFound();
  const t = ui(taal).pakket;
  const home = ui(taal).landing.kruimelHome;
  const pp = prijsPerPersoon(p.blokken);
  const prijs = formatPrijs(taal, pp);
  const href = detailPad(taal, 'pakket', p.slug)!;
  const boeken = PADEN.boeken[taal];
  const onderdelen = TIJDVAKKEN.flatMap((tv, i) => {
    const b = bouwsteenIn(taal, vindBouwsteen(p.blokken[tv.id]));
    return b ? [{ t: tv, b, i }] : [];
  });
  const maanden = pakketMaanden(p);
  const minimum = Math.max(REGELS.minPers, ...onderdelen.map((o) => o.b.minPers));
  const maximum = Math.min(REGELS.maxPers, ...onderdelen.map((o) => o.b.maxPers));
  const pastBij = VERTAALDE_LANDINGS.filter((s) => LANDINGS[s].pakketten.includes(p.slug));
  const vragen = t.vragen({
    naam: p.tekst.naam,
    inbegrepen: onderdelen
      .map(({ b }) => `${b.tekst.naam}: ${b.tekst.inclusief.join(', ')}`)
      .join('. '),
    eerste: onderdelen[0]?.t.van ?? '',
    laatste: onderdelen[onderdelen.length - 1]?.t.tot ?? '',
    minimum,
    maximum,
    prijs,
    maanden: maanden ? maandenTekstIn(taal, maanden) : null,
  });

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: home, url: PADEN.home[taal] },
          { name: ui(taal).pakketten.kruimel, url: PADEN.pakketten[taal] },
          { name: p.tekst.naam, url: href },
        ]}
      />
      <EventOrProductSchema
        name={p.tekst.naam}
        description={p.tekst.beschrijving}
        price={pp}
        image={`https://dagjeutrecht.nl${fotoVoorPakket(p.slug).src}`}
        category={t.categorie}
        url={href}
      />
      <FaqSchema items={vragen} />
      <PaginaKop
        titel={p.tekst.naam}
        intro={
          <>
            <p>{p.tekst.beschrijving}</p>
            <p className="mt-2 font-bold">
              {t.voor} {p.tekst.voorWie}
            </p>
            {maanden && (
              <p className="mt-1 font-bold">
                {t.teBoekenVan} {maandenTekstIn(taal, maanden)}
              </p>
            )}
          </>
        }
        kleur="inkt"
        foto={fotoIn(taal, fotoVoorPakket(p.slug))}
        label={`${prijs} ${t.perPersoon}`}
        knop={{ href: `${boeken}?pakket=${p.slug}`, tekst: t.kiesDatum }}
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">
          {t.programma}
        </h2>
        <ol className="mt-10 space-y-10">
          {onderdelen.map(({ t: tv, b, i }, n) => (
            <li key={tv.id} className="grid items-center gap-6 md:grid-cols-5">
              <Foto
                foto={fotoIn(taal, fotoVoorBouwsteen(b.slug, p.seizoen))}
                verhouding={`aspect-[4/3] md:col-span-2 ${HOEKEN[n % HOEKEN.length]} ${n % 2 ? 'md:order-2' : ''}`}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="kantel polaroid rounded-sm"
              />
              <div className="md:col-span-3">
                <span
                  className={`inline-flex rounded-lg px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-inkt ${TIJD_KLEUR[i]}`}
                >
                  {tv.van} {t.tot} {tv.tot}
                </span>
                <h3 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight text-inkt">
                  <Link
                    href={detailPad(taal, 'bouwsteen', b.slug)!}
                    className="hover:text-vlam-700"
                  >
                    {b.tekst.naam}
                  </Link>
                </h3>
                <p className="mt-3 text-lg text-grijs">{b.tekst.beschrijving}</p>
                <p className="mt-2 text-sm font-bold text-inkt">
                  {clusterLabel(taal, b)} · {b.tekst.locatie}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-vlam-50">
        <div className="relative mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-6xl font-black text-inkt">{prijs}</p>
            <p className="mt-1 text-lg font-bold text-inkt">{t.perPersoonBtw}</p>
            <p className="mt-2 text-grijs">{t.regels}</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Knop href={`${boeken}?pakket=${p.slug}`} className="text-lg">
              {t.kiesDatum}
            </Knop>
            <Knop href={boeken} variant="secundair">
              {t.wisselen}
            </Knop>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">{t.faqKop}</h2>
        <dl className="mt-6 space-y-5">
          {vragen.map((v) => (
            <div key={v.q}>
              <dt className="text-lg font-extrabold text-inkt">{v.q}</dt>
              <dd className="mt-1 text-grijs">{v.a}</dd>
            </div>
          ))}
        </dl>
        {pastBij.length > 0 && (
          <p className="mt-8 text-lg text-grijs">
            {t.pastBij}{' '}
            {pastBij.map((s, i) => (
              <span key={s}>
                {i > 0 && ', '}
                <Link
                  href={PADEN[s][taal]}
                  className="font-bold text-inkt underline decoration-vlam-400 decoration-2 underline-offset-4"
                >
                  {landingTekst(taal, s).link} {t.inUtrecht}
                </Link>
              </span>
            ))}
            .
          </p>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-black uppercase tracking-tight text-inkt">
          {t.anderePakketten}
        </h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {pakkettenIn(taal)
            .filter((x) => x.slug !== p.slug)
            .map((x, i) => (
              <li key={x.slug}>
                <PakketKaart pakket={x} hoek={HOEKEN[i % HOEKEN.length]} taal={taal} />
              </li>
            ))}
        </ul>
      </section>

      <BoekBlok {...boekBlok(taal)} foto={fotoIn(taal, fotoVoorPakket(p.slug))} />
    </>
  );
}

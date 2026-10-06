import type { Metadata } from 'next';
import { fotoIn } from '../../lib/i18n/foto-alt';
import Link from 'next/link';
import {
  TIJDVAKKEN,
  prijsPerPersoon,
  uitgelichtSeizoen,
  vindBouwsteen,
  vindPakket,
} from '../../lib/aanbod';
import {
  VERTAALDE_LANDINGS,
  bouwsteenIn,
  clusterLabel,
  landingTekst,
  pakketIn,
  ui,
  type VertaaldeLanding,
  type VertaaldPakket,
} from '../../lib/i18n';
import { formatPrijs } from '../../lib/i18n/opmaak';
import { LANDINGS } from '../../lib/landings';
import { PADEN, detailPad, paginaAlternates, type Vertaald } from '../../lib/talen';
import { PakketKaart } from '../pakket-kaart';
import { Breadcrumbs, FaqSchema } from '../seo-jsonld';
import { Band, BoekBlok, Foto, HOEKEN, Knop, PaginaKop } from '../ui';
import { boekBlok } from './home';
import { vertaaldeMeta } from './meta';

/**
 * Engelse of Duitse gelegenheidspagina. Pakketten, voorbeelddag, foto's en kleur
 * komen uit LANDINGS (landings.ts), de woorden uit lib/i18n/landings-en.ts of -de.ts.
 */
export function landingMetadataIn(taal: Vertaald, sleutel: VertaaldeLanding): Metadata {
  const l = landingTekst(taal, sleutel);
  return vertaaldeMeta(taal, {
    titel: l.metaTitel,
    omschrijving: l.metaOmschrijving,
    alternates: paginaAlternates(taal, sleutel),
    foto: LANDINGS[sleutel].foto,
  });
}

export function VertaaldeLandingPagina({
  taal,
  sleutel,
}: {
  taal: Vertaald;
  sleutel: VertaaldeLanding;
}) {
  const nl = LANDINGS[sleutel];
  const l = landingTekst(taal, sleutel);
  const t = ui(taal).landing;
  const pad = PADEN[sleutel][taal];
  const boeken = PADEN.boeken[taal];
  const seizoen = uitgelichtSeizoen();
  const rang = (s: string) => (s === seizoen ? 0 : s === 'jaarrond' ? 1 : 2);
  const pakketten = nl.pakketten
    .map((slug) => pakketIn(taal, vindPakket(slug)))
    .filter((p): p is VertaaldPakket => p !== null)
    .sort((a, b) => rang(a.seizoen) - rang(b.seizoen));
  const prijzen = pakketten.map((p) => prijsPerPersoon(p.blokken));
  const voorbeeld = pakketIn(taal, vindPakket(nl.voorbeeld));
  const dag = voorbeeld
    ? TIJDVAKKEN.flatMap((tv) => {
        const b = bouwsteenIn(taal, vindBouwsteen(voorbeeld.blokken[tv.id]));
        return b ? [{ t: tv, b }] : [];
      })
    : [];

  const dienst = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: l.titel,
    description: l.metaOmschrijving,
    url: `https://dagjeutrecht.nl${pad}`,
    image: `https://dagjeutrecht.nl${nl.foto.src}`,
    provider: { '@id': 'https://dagjeutrecht.nl#organization' },
    areaServed: { '@type': 'City', name: 'Utrecht' },
    offers: prijzen.length
      ? {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: (Math.min(...prijzen) / 100).toFixed(2),
          highPrice: (Math.max(...prijzen) / 100).toFixed(2),
          offerCount: prijzen.length,
          url: `https://dagjeutrecht.nl${pad}`,
        }
      : undefined,
  };

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: t.kruimelHome, url: PADEN.home[taal] },
          { name: l.titel, url: pad },
        ]}
      />
      <FaqSchema items={l.faq} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dienst) }}
      />

      <PaginaKop
        titel={l.titel}
        intro={l.intro}
        kleur={nl.kleur}
        foto={fotoIn(taal, nl.foto)}
        label={l.boven}
        knop={{ href: '#pakketten', tekst: t.bekijkPakketten }}
      />
      <div className="-mt-3">
        <Band
          woorden={l.band}
          kleur={nl.kleur === 'vlam' ? 'bg-zee-400 text-inkt' : 'bg-vlam-400 text-inkt'}
        />
      </div>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          {l.alineas.map((a) => (
            <div key={a.kop}>
              <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-inkt">
                {a.kop}
              </h2>
              <p className="mt-3 text-lg text-grijs">{a.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {voorbeeld && dag.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">
            {t.zoDag}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-grijs">
            {t.voorbeeld(
              voorbeeld.tekst.naam,
              formatPrijs(taal, prijsPerPersoon(voorbeeld.blokken)),
            )}
          </p>
          <ol className="mt-8 divide-y-2 divide-zee-100 rounded-2xl border-2 border-zee-100 bg-white">
            {dag.map(({ t: tv, b }) => (
              <li key={tv.id} className="grid gap-2 px-5 py-4 sm:grid-cols-[8rem_1fr]">
                <p className="font-black text-vlam-700">
                  {tv.van} {t.tot} {tv.tot}
                </p>
                <div>
                  <h3 className="text-lg font-extrabold text-inkt">
                    <Link
                      href={detailPad(taal, 'bouwsteen', b.slug)!}
                      className="underline decoration-zee-400 decoration-2 underline-offset-4 hover:text-vlam-700"
                    >
                      {b.tekst.naam}
                    </Link>
                  </h3>
                  <p className="text-grijs">{b.tekst.kort}</p>
                  <p className="mt-1 text-sm text-grijs">
                    {t.inbegrepen} {b.tekst.inclusief.join(', ')}. {clusterLabel(taal, b)},{' '}
                    {b.tekst.locatie}.
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-grijs">
            {t.regels}{' '}
            <Link
              href={detailPad(taal, 'pakket', voorbeeld.slug)!}
              className="font-bold text-inkt underline decoration-vlam-400 decoration-2 underline-offset-4"
            >
              {t.bekijk(voorbeeld.tekst.naam)}
            </Link>
          </p>
        </section>
      )}

      <section id="pakketten" className="scroll-mt-24 bg-zee-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">
            {t.passend}
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pakketten.map((p, i) => (
              <li key={p.slug}>
                <PakketKaart pakket={p} hoek={HOEKEN[i % HOEKEN.length]} taal={taal} />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <Knop href={boeken}>{t.zelf}</Knop>
            <Knop href={PADEN.bouwstenen[taal]} variant="secundair">
              {t.alleOnderdelen}
            </Knop>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {nl.galerij.map((foto, i) => (
            <li key={foto.src}>
              <Foto
                foto={fotoIn(taal, foto)}
                verhouding={`aspect-square ${HOEKEN[i % HOEKEN.length]}`}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="kantel polaroid rounded-sm transition-transform hover:rotate-0"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-vlam-50">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">
            {t.faqKop}
          </h2>
          <div className="mt-8 divide-y divide-vlam-100 overflow-hidden rounded-2xl bg-white shadow-lg">
            {l.faq.map((v) => (
              <details key={v.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-inkt [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg">{v.q}</h3>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vlam-400 text-xl leading-none text-inkt transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-grijs">{v.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-black uppercase tracking-tight text-inkt">
          {t.ookInteressant}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {[
            ...VERTAALDE_LANDINGS.filter((s) => s !== sleutel).map((s) => ({
              href: PADEN[s][taal],
              label: landingTekst(taal, s).link,
            })),
            { href: PADEN.pakketten[taal], label: t.allePakketten },
            { href: PADEN.bouwstenen[taal], label: t.alleActiviteiten },
          ].map((x) => (
            <li key={x.href}>
              <Link
                href={x.href}
                className="inline-flex rounded-full border-2 border-zee-400 px-4 py-2 font-bold text-inkt transition-colors hover:bg-zee-400"
              >
                {x.label}
              </Link>
            </li>
          ))}
        </ul>
        {l.zuster && (
          <p className="mt-6 text-lg text-grijs">
            {l.zuster.tekst}{' '}
            <a
              href={l.zuster.href}
              className="font-extrabold text-inkt underline decoration-vlam-400 decoration-2 underline-offset-4"
            >
              {l.zuster.label}
            </a>{' '}
            {t.zusterNa}
          </p>
        )}
      </section>

      <BoekBlok {...boekBlok(taal)} titel={t.boekBlok} foto={fotoIn(taal, nl.galerij[0]!)} />
    </>
  );
}

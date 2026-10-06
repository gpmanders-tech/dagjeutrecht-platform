import type { Metadata } from 'next';
import { fotoIn } from '../../lib/i18n/foto-alt';
import Link from 'next/link';
import {
  BOUWSTENEN,
  TIJDVAKKEN,
  pakketMaanden,
  pakkettenOpSeizoen,
  prijsPerPersoon,
  uitgelichtSeizoen,
  vindBouwsteen,
} from '../../lib/aanbod';
import { fotos, fotoVoorBouwsteen, fotoVoorPakket } from '../../lib/fotos';
import {
  aanbodTekst,
  bouwsteenIn,
  bouwstenenIn,
  maandenTekstIn,
  pakketIn,
  pakkettenIn,
  ui,
} from '../../lib/i18n';
import { formatPrijs, goedkoopste } from '../../lib/i18n/opmaak';
import { PADEN, detailPad, paginaAlternates, type Vertaald } from '../../lib/talen';
import { KaartUtrecht } from '../kaart-utrecht';
import { PakketKaart } from '../pakket-kaart';
import { FaqSchema } from '../seo-jsonld';
import { Band, BoekBlok, Foto, HOEKEN, Knop, RondeSticker, Sticker } from '../ui';
import { vertaaldeMeta } from './meta';

export function homeMetadata(taal: Vertaald): Metadata {
  const t = ui(taal).home;
  const prijs = formatPrijs(taal, goedkoopste());
  return vertaaldeMeta(taal, {
    titel: { absolute: t.metaTitel(prijs) },
    omschrijving: t.metaOmschrijving(prijs),
    alternates: paginaAlternates(taal, 'home'),
  });
}

const KLEUREN = [
  'bg-zee-400 text-inkt',
  'bg-zon-300 text-inkt',
  'bg-vlam-400 text-inkt',
  'bg-white text-inkt',
];
const STAP_KLEUR = ['text-zee-400', 'text-zon-400', 'text-vlam-400'];

export function Home({ taal }: { taal: Vertaald }) {
  const t = ui(taal).home;
  const a = aanbodTekst(taal);
  const seizoen = uitgelichtSeizoen();
  const winter = seizoen === 'winter';
  const pakketten = pakkettenIn(taal, pakkettenOpSeizoen(seizoen));
  const uitgelicht = pakketten[0]!;
  const maanden = pakketMaanden(uitgelicht);
  const boeken = PADEN.boeken[taal];
  const pakketHref = detailPad(taal, 'pakket', uitgelicht.slug)!;
  const vanaf = formatPrijs(taal, goedkoopste());
  const heroFotos = winter
    ? { groot: fotos.boulesBinnen, klein: fotos.gluhwein, boven: fotos.borrel }
    : { groot: fotos.supGroep, klein: fotos.kickbikeDomkerk, boven: fotos.boules };
  const clusters = winter
    ? (['centrum', 'amelisweerd'] as const)
    : (['amelisweerd', 'centrum'] as const);
  const faq = t.faq({ goedkoopste: vanaf });
  const school = pakketIn(
    taal,
    pakketten.find((p) => p.slug === 'schooluitje'),
  );

  const voorWie = [
    {
      ...t.voorWie.bedrijfsuitje,
      foto: fotos.boulesSpelers,
      kleur: 'bg-zee-400',
      href: PADEN.bedrijfsuitje[taal],
    },
    {
      ...t.voorWie.vrijgezellenfeest,
      foto: fotos.supVrijgezellen,
      kleur: 'bg-vlam-500',
      href: PADEN.vrijgezellenfeest[taal],
    },
    {
      ...t.voorWie.teambuilding,
      foto: fotos.kanoDuo,
      kleur: 'bg-zon-400',
      href: PADEN.teambuilding[taal],
    },
    ...(school
      ? [
          {
            ...t.voorWie.school,
            foto: fotos.domtoren,
            kleur: 'bg-inkt',
            href: detailPad(taal, 'pakket', school.slug)!,
          },
        ]
      : []),
    {
      ...t.voorWie.personeelsuitje,
      foto: fotos.terrassen,
      kleur: 'bg-zee-400',
      href: PADEN.personeelsuitje[taal],
    },
    {
      ...t.voorWie.familiedag,
      foto: fotos.rondvaart,
      kleur: 'bg-vlam-500',
      href: PADEN.familiedag[taal],
    },
  ];

  const galerij = [
    fotos.supOudegracht,
    fotos.kickbikeGracht,
    fotos.kanoGracht,
    fotos.oudegrachtDom,
    fotos.supRood,
    fotos.kickbikePark,
  ];

  return (
    <main>
      <section className="op-donker relative isolate overflow-hidden bg-inkt text-white">
        <Foto
          foto={fotoIn(taal, fotos.heroAchtergrond)}
          verhouding="absolute inset-0 h-full w-full"
          sizes="100vw"
          className="opacity-25"
          prioriteit
        />
        <div className="absolute inset-0 bg-gradient-to-br from-inkt via-inkt/90 to-inkt/60" />
        <KaartUtrecht className="absolute inset-0 h-full w-full opacity-25 [mask-image:radial-gradient(ellipse_at_55%_45%,black_35%,transparent_80%)]" />
        <div
          aria-hidden="true"
          className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-zee-400/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-vlam-500/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-4 pb-24 pt-10 sm:px-6 md:grid-cols-2">
          <div>
            <Sticker kleur="zon">{t.heroSticker}</Sticker>
            <h1 className="mt-5 text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl">
              <span className="block">{t.heroRegels[0]}</span>
              <span className="block text-zon-300">{t.heroRegels[1]}</span>
              <span className="block">{t.heroRegels[2]}</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-zee-100 sm:text-xl">
              {winter ? t.heroWinter : t.heroZomer}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Knop href={PADEN.pakketten[taal]} variant="zon" className="text-lg">
                {t.bekijkPakketten}
              </Knop>
              <Link
                href={boeken}
                className="text-lg font-extrabold uppercase tracking-wide text-white underline decoration-vlam-400 decoration-4 underline-offset-8 hover:text-zon-300"
              >
                {t.zelfSamenstellen}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm md:ml-auto md:mr-4">
            <Foto
              foto={fotoIn(taal, heroFotos.groot)}
              verhouding="aspect-[4/5] -rotate-3"
              sizes="(min-width: 768px) 40vw, 90vw"
              className="kantel polaroid rounded-sm"
              prioriteit
            />
            <Foto
              foto={fotoIn(taal, heroFotos.klein)}
              verhouding="aspect-square absolute -bottom-10 -left-6 w-40 rotate-6 sm:w-48"
              sizes="200px"
              className="kantel polaroid rounded-sm"
            />
            <Foto
              foto={fotoIn(taal, heroFotos.boven)}
              verhouding="aspect-[4/3] absolute -right-4 -top-8 w-36 rotate-6 sm:w-44"
              sizes="180px"
              className="kantel polaroid hidden rounded-sm sm:block"
            />
            {winter ? (
              <Link href={pakketHref} aria-label={uitgelicht.tekst.naam}>
                <RondeSticker
                  boven={t.stickerWinter}
                  midden={formatPrijs(taal, prijsPerPersoon(uitgelicht.blokken))}
                  onder={t.perPersoon}
                  className="absolute -bottom-6 right-0 sm:-right-6"
                />
              </Link>
            ) : (
              <RondeSticker
                boven={t.stickerPakketten}
                midden={vanaf}
                onder={t.perPersoon}
                className="absolute -bottom-6 right-0 sm:-right-6"
              />
            )}
          </div>
        </div>
      </section>

      <div className="-mt-4 mb-4 sm:-mt-6">
        <Band woorden={winter ? t.bandWinter : t.bandZomer} />
      </div>

      <section aria-label={t.inHetKort} className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.cijfers(BOUWSTENEN.length).map((c, i) => (
            <li
              key={c.label}
              className={`rounded-2xl border-2 border-inkt/10 p-5 shadow-md ${KLEUREN[i]}`}
            >
              <p className="text-3xl font-black leading-none">{c.getal}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-wide">{c.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={`op-donker relative isolate overflow-hidden text-white ${winter ? 'bg-zee-700' : 'bg-vlam-500'}`}
      >
        <Foto
          foto={fotoIn(taal, winter ? fotos.winterUtrecht : fotos.supOudegracht)}
          verhouding="absolute inset-0 h-full w-full"
          sizes="100vw"
          className="opacity-25"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${winter ? 'from-zee-700 via-zee-700/90' : 'from-vlam-600 via-vlam-600/90'} to-transparent`}
        />
        {winter && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 select-none text-4xl text-white/20"
          >
            <span className="zweef absolute left-[8%] top-6">❄</span>
            <span className="zweef absolute left-[46%] top-16 text-2xl">❄</span>
            <span className="zweef absolute right-[12%] top-8 text-5xl">❄</span>
            <span className="zweef absolute bottom-10 left-[30%] text-3xl">❄</span>
            <span className="zweef absolute bottom-6 right-[35%]">❄</span>
          </div>
        )}
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <Sticker kleur="zon">{winter ? t.uitgelichtWinter : t.uitgelichtZomer}</Sticker>
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
              {uitgelicht.tekst.naam}
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/90">{uitgelicht.tekst.beschrijving}</p>
            <ul className="mt-5 space-y-1">
              {TIJDVAKKEN.map((tv) => {
                const b = bouwsteenIn(taal, vindBouwsteen(uitgelicht.blokken[tv.id]));
                return b ? (
                  <li key={tv.id} className="flex gap-3 text-lg">
                    <span className="w-14 shrink-0 font-black text-zon-300">{tv.van}</span>
                    <span className="font-semibold">{b.tekst.naam}</span>
                  </li>
                ) : null;
              })}
            </ul>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-black">
                {formatPrijs(taal, prijsPerPersoon(uitgelicht.blokken))}
              </span>
              <span className="text-white/80">{t.perPersoon}</span>
            </p>
            {maanden && (
              <p className="mt-1 text-sm text-white/80">
                {t.teBoekenVan} {maandenTekstIn(taal, maanden)}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-4">
              <Knop href={`${boeken}?pakket=${uitgelicht.slug}`} variant="zon">
                {t.boekDezeDag}
              </Knop>
              <Knop href={pakketHref} variant="lijn">
                {t.bekijkProgramma}
              </Knop>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Foto
              foto={fotoIn(taal, fotoVoorPakket(uitgelicht.slug))}
              verhouding="aspect-[4/5] rotate-3"
              sizes="(min-width: 768px) 40vw, 90vw"
              className="kantel polaroid rounded-sm"
            />
            {(winter
              ? [fotos.erwtensoep, fotos.borrel]
              : [fotos.picknick, fotos.kickbikeGracht]
            ).map((f, i) => (
              <Foto
                key={f.src}
                foto={fotoIn(taal, f)}
                verhouding={`aspect-square absolute w-32 sm:w-40 ${i === 0 ? '-bottom-8 -left-8 -rotate-6' : '-right-6 -top-8 rotate-6'}`}
                sizes="160px"
                className="kantel polaroid rounded-sm"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vlam-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">
              {t.pakketten}
            </h2>
            <p className="text-lg font-bold text-inkt">{t.vastePrijs}</p>
          </div>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {pakketten.map((p, i) => (
              <li key={p.slug}>
                <PakketKaart pakket={p} hoek={HOEKEN[i % HOEKEN.length]} taal={taal} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="op-donker relative isolate overflow-hidden bg-inkt text-white">
        <div
          aria-hidden="true"
          className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-zee-400/30 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            {t.hoeWerktHet}
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {t.stappen.map((s, i) => (
              <li key={s.titel} className="relative pl-4">
                <span
                  aria-hidden="true"
                  className={`absolute -left-2 -top-8 text-8xl font-black leading-none opacity-40 ${STAP_KLEUR[i]}`}
                >
                  {i + 1}
                </span>
                <h3 className="relative text-2xl font-extrabold">
                  <span className="sr-only">
                    {t.stap} {i + 1}:{' '}
                  </span>
                  {s.titel}
                </h3>
                <p className="relative mt-2 text-zee-100">{s.tekst}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Knop href={boeken} variant="zon">
              {t.stelSamen}
            </Knop>
          </div>
        </div>
      </section>

      {clusters.map((c, ci) => {
        const blokken = bouwstenenIn(taal).filter(
          (b) => b.cluster === c || (c === 'amelisweerd' && b.cluster === 'beide'),
        );
        const buiten = c === 'amelisweerd';
        return (
          <section key={c} className={ci === 0 ? 'bg-zee-50' : 'bg-white'}>
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
              <Sticker kleur={buiten ? 'zee' : 'vlam'} hoek={ci === 0 ? 'rotate-2' : '-rotate-2'}>
                {buiten
                  ? winter
                    ? t.stickerBuitenWinter
                    : t.stickerBuiten
                  : winter
                    ? t.stickerBinnenWinter
                    : t.stickerSpelen}
              </Sticker>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">
                {a.clusters[c].naam}
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-grijs">{a.clusters[c].uitleg}</p>
              <ul className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
                {blokken.map((b, i) => (
                  <li key={b.slug}>
                    <Link href={`${PADEN.bouwstenen[taal]}#${b.slug}`} className="group block">
                      <Foto
                        foto={fotoIn(
                          taal,
                          fotoVoorBouwsteen(b.slug, winter ? 'winter' : undefined),
                        )}
                        verhouding={`aspect-square ${HOEKEN[i % HOEKEN.length]}`}
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="kantel polaroid rounded-sm transition-transform group-hover:rotate-0 group-hover:scale-105"
                      />
                      <p className="mt-4 font-extrabold uppercase leading-tight text-inkt group-hover:text-vlam-700">
                        {b.tekst.naam}
                      </p>
                      <p className="text-sm font-bold text-grijs">
                        {formatPrijs(taal, b.verkoopCents)} {t.pp}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <Band woorden={t.bandPlekken} kleur="bg-zee-400 text-inkt" hoek="rotate-1" />

      <section className="bg-zon-100">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">
            {t.voorWieKop}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {voorWie.map((d, i) => (
              <li
                key={d.titel}
                className={`kantel overflow-hidden rounded-2xl bg-white shadow-xl transition-transform hover:-translate-y-1 hover:rotate-0 ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
              >
                <Link href={d.href} className="block">
                  <Foto
                    foto={fotoIn(taal, d.foto)}
                    verhouding="aspect-[16/10]"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                  <div className={`h-2 ${d.kleur}`} />
                  <div className="p-5">
                    <h3 className="text-2xl font-extrabold text-inkt underline decoration-vlam-400 decoration-4 underline-offset-4">
                      {d.titel}
                    </h3>
                    <p className="mt-2 text-grijs">{d.tekst}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">
          {t.waterKop}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-grijs">{t.waterTekst}</p>
        <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
          {galerij.map((foto, i) => (
            <li key={foto.src}>
              <Foto
                foto={fotoIn(taal, foto)}
                verhouding={`aspect-square ${HOEKEN[i % HOEKEN.length]}`}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="kantel polaroid rounded-sm transition-transform hover:rotate-0"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-vlam-50">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">
            {t.faqKop}
          </h2>
          <div className="mt-8 divide-y divide-vlam-100 overflow-hidden rounded-2xl bg-white shadow-lg">
            {faq.map((v) => (
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
      <FaqSchema items={faq} />

      <BoekBlok {...boekBlok(taal)} />
    </main>
  );
}

/** Teksten en knop van het afsluitblok in een taal. */
export function boekBlok(taal: Vertaald) {
  const b = ui(taal).boekBlok;
  return { titel: b.titel, tekst: b.tekst, knop: { href: PADEN.boeken[taal], tekst: b.knop } };
}

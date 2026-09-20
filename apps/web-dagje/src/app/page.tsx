import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BOUWSTENEN,
  CLUSTERS,
  PAKKETTEN,
  REGELS,
  TIJDVAKKEN,
  formatEuro,
  maandenTekst,
  pakketMaanden,
  pakkettenOpSeizoen,
  prijsPerPersoon,
  uitgelichtSeizoen,
  vindBouwsteen,
} from '../lib/aanbod';
import { fotos, fotoVoorBouwsteen, fotoVoorPakket } from '../lib/fotos';
import { PakketKaart } from '../components/pakket-kaart';
import { Band, BoekBlok, Foto, HOEKEN, Knop, RondeSticker, Sticker } from '../components/ui';
import { KaartUtrecht } from '../components/kaart-utrecht';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export const revalidate = 86400;

const goedkoopste = Math.min(...PAKKETTEN.map((p) => prijsPerPersoon(p.blokken)));

const cijfers = [
  { getal: `Vanaf ${REGELS.minPers}`, label: 'personen per groep', kleur: 'bg-zee-400 text-inkt' },
  { getal: `${BOUWSTENEN.length}`, label: 'onderdelen om te combineren', kleur: 'bg-zon-300 text-inkt' },
  { getal: '3', label: 'werkdagen tot bevestiging', kleur: 'bg-vlam-400 text-inkt' },
  { getal: 'Vast', label: 'prijs per persoon, incl. btw', kleur: 'bg-white text-inkt' },
];

const stappen = [
  {
    titel: 'Kies je dag',
    tekst: 'Pak een pakket of stel zelf samen per tijdvak. Je ziet meteen wat het kost.',
    kleur: 'text-zee-400',
  },
  {
    titel: 'Wij regelen het',
    tekst: 'Binnen 3 werkdagen bevestigen onze partners alles en krijg je een betaallink.',
    kleur: 'text-zon-400',
  },
  {
    titel: 'Gaan met die banaan',
    tekst: 'De dag ervoor krijg je alle tijden en adressen. Jullie hoeven alleen te komen.',
    kleur: 'text-vlam-400',
  },
];

const voorWie = [
  {
    titel: 'Bedrijfsuitje',
    tekst: 'Samen spelen, peddelen en afsluiten met een borrel.',
    foto: fotos.boulesSpelers,
    kleur: 'bg-zee-400',
    href: '/bedrijfsuitje-utrecht',
  },
  {
    titel: 'Vrijgezellenfeest',
    tekst: 'Suppen, picknicken en per kickbike naar de borrel.',
    foto: fotos.supVrijgezellen,
    kleur: 'bg-vlam-500',
    href: '/vrijgezellenfeest-utrecht',
  },
  {
    titel: 'Teambuilding',
    tekst: 'Samenwerken in de kano of strijden op de boulesbaan.',
    foto: fotos.kanoDuo,
    kleur: 'bg-zon-400',
    href: '/teambuilding-utrecht',
  },
  {
    titel: 'Schooluitje',
    tekst: 'De Domtoren op, samen lunchen en de grachten over.',
    foto: fotos.domtoren,
    kleur: 'bg-inkt',
    href: '/schooluitje-utrecht',
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

export default function Home() {
  const seizoen = uitgelichtSeizoen();
  const winter = seizoen === 'winter';
  const pakketten = pakkettenOpSeizoen(seizoen);
  const uitgelicht = pakketten[0]!;
  const maanden = pakketMaanden(uitgelicht);
  const heroFotos = winter
    ? { groot: fotos.boulesSpelers, klein: fotos.gluhwein, boven: fotos.domtoren }
    : { groot: fotos.supGroep, klein: fotos.kickbikeDomkerk, boven: fotos.boules };
  const clusters = winter ? (['centrum', 'amelisweerd'] as const) : (['amelisweerd', 'centrum'] as const);

  return (
    <main>
      <section className="op-donker relative isolate overflow-hidden bg-inkt text-white">
        <Foto
          foto={fotos.heroAchtergrond}
          verhouding="absolute inset-0 h-full w-full"
          sizes="100vw"
          className="opacity-25"
          prioriteit
        />
        <div className="absolute inset-0 bg-gradient-to-br from-inkt via-inkt/90 to-inkt/60" />
        {/* Kaart van de Utrechtse binnenstad als watermerk, gegevens van OpenStreetMap */}
        <KaartUtrecht className="absolute inset-0 h-full w-full opacity-25 [mask-image:radial-gradient(ellipse_at_55%_45%,black_35%,transparent_80%)]" />
        <div aria-hidden="true" className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-zee-400/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-vlam-500/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-4 pb-24 pt-10 sm:px-6 md:grid-cols-2">
          <div>
            <Sticker kleur="zon">Groepen vanaf {REGELS.minPers} personen</Sticker>
            <h1 className="mt-5 text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl">
              <span className="block">Een dagje</span>
              <span className="block text-zon-300">Utrecht</span>
              <span className="block">met je groep</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-zee-100 sm:text-xl">
              {winter
                ? 'Glühwein, jeu de boules, de Domtoren op en borrelen. Kies je onderdelen, wij regelen de rest.'
                : 'Suppen, kanoën, kickbiken, jeu de boules en borrelen. Kies je onderdelen, wij regelen de rest.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Knop href="/pakketten" variant="zon" className="text-lg">
                Bekijk pakketten
              </Knop>
              <Link
                href="/boeken"
                className="text-lg font-extrabold uppercase tracking-wide text-white underline decoration-vlam-400 decoration-4 underline-offset-8 hover:text-zon-300"
              >
                Zelf samenstellen
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm md:ml-auto md:mr-4">
            <Foto
              foto={heroFotos.groot}
              verhouding="aspect-[4/5] -rotate-3"
              sizes="(min-width: 768px) 40vw, 90vw"
              className="kantel polaroid rounded-sm"
              prioriteit
            />
            <Foto
              foto={heroFotos.klein}
              verhouding="aspect-square absolute -bottom-10 -left-6 w-40 rotate-6 sm:w-48"
              sizes="200px"
              className="kantel polaroid rounded-sm"
            />
            <Foto
              foto={heroFotos.boven}
              verhouding="aspect-[4/3] absolute -right-4 -top-8 w-36 rotate-6 sm:w-44"
              sizes="180px"
              className="kantel polaroid hidden rounded-sm sm:block"
            />
            {winter ? (
              <Link href={`/pakketten/${uitgelicht.slug}`} aria-label={`${uitgelicht.naam} bekijken`}>
                <RondeSticker
                  boven="Nieuw: winter"
                  midden={formatEuro(prijsPerPersoon(uitgelicht.blokken))}
                  onder="per persoon"
                  className="absolute -bottom-6 right-0 sm:-right-6"
                />
              </Link>
            ) : (
              <RondeSticker
                boven="Pakketten"
                midden={formatEuro(goedkoopste)}
                onder="per persoon"
                className="absolute -bottom-6 right-0 sm:-right-6"
              />
            )}
          </div>
        </div>
      </section>

      <div className="-mt-4 mb-4 sm:-mt-6">
        <Band
          woorden={
            winter
              ? ['Warme Winterdag', 'Glühwein', 'Jeu de boules', 'Domtoren', 'Erwtensoep', 'Shuffleboard', 'Borrel']
              : ['Suppen', 'Kanoën', 'Kickbiken', 'Jeu de boules', 'Shuffleboard', 'Rondvaart', 'Borrel', 'BBQ']
          }
        />
      </div>

      <section aria-label="In het kort" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cijfers.map((c) => (
            <li key={c.label} className={`rounded-2xl border-2 border-inkt/10 p-5 shadow-md ${c.kleur}`}>
              <p className="text-3xl font-black leading-none">{c.getal}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-wide">{c.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`op-donker relative isolate overflow-hidden text-white ${winter ? 'bg-zee-700' : 'bg-vlam-500'}`}>
        <Foto
          foto={winter ? fotos.winterUtrecht : fotos.supOudegracht}
          verhouding="absolute inset-0 h-full w-full"
          sizes="100vw"
          className="opacity-25"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${winter ? 'from-zee-700 via-zee-700/90' : 'from-vlam-600 via-vlam-600/90'} to-transparent`} />
        {winter && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none text-4xl text-white/20">
            <span className="zweef absolute left-[8%] top-6">❄</span>
            <span className="zweef absolute left-[46%] top-16 text-2xl">❄</span>
            <span className="zweef absolute right-[12%] top-8 text-5xl">❄</span>
            <span className="zweef absolute bottom-10 left-[30%] text-3xl">❄</span>
            <span className="zweef absolute bottom-6 right-[35%]">❄</span>
          </div>
        )}
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <Sticker kleur="zon">{winter ? '❄️ Uitgelicht deze winter' : '☀️ Uitgelicht deze zomer'}</Sticker>
            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">{uitgelicht.naam}</h2>
            <p className="mt-4 max-w-md text-lg text-white/90">{uitgelicht.beschrijving}</p>
            <ul className="mt-5 space-y-1">
              {TIJDVAKKEN.map((t) => {
                const b = vindBouwsteen(uitgelicht.blokken[t.id]);
                return b ? (
                  <li key={t.id} className="flex gap-3 text-lg">
                    <span className="w-14 shrink-0 font-black text-zon-300">{t.van}</span>
                    <span className="font-semibold">{b.naam}</span>
                  </li>
                ) : null;
              })}
            </ul>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-black">{formatEuro(prijsPerPersoon(uitgelicht.blokken))}</span>
              <span className="text-white/80">per persoon</span>
            </p>
            {maanden && <p className="mt-1 text-sm text-white/80">Te boeken van {maandenTekst(maanden)}</p>}
            <div className="mt-6 flex flex-wrap gap-4">
              <Knop href={`/boeken?pakket=${uitgelicht.slug}`} variant="zon">
                Boek deze dag
              </Knop>
              <Knop href={`/pakketten/${uitgelicht.slug}`} variant="lijn">
                Bekijk programma
              </Knop>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Foto
              foto={fotoVoorPakket(uitgelicht.slug)}
              verhouding="aspect-[4/5] rotate-3"
              sizes="(min-width: 768px) 40vw, 90vw"
              className="kantel polaroid rounded-sm"
            />
            {(winter ? [fotos.erwtensoep, fotos.domtoren] : [fotos.picknick, fotos.kickbikeGracht]).map((f, i) => (
              <Foto
                key={f.src}
                foto={f}
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
            <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">Pakketten</h2>
            <p className="text-lg font-bold text-inkt">Vaste prijs per persoon, incl. btw</p>
          </div>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {pakketten.map((p, i) => (
              <li key={p.slug}>
                <PakketKaart pakket={p} hoek={HOEKEN[i % HOEKEN.length]} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="op-donker relative isolate overflow-hidden bg-inkt text-white">
        <div aria-hidden="true" className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-zee-400/30 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">Hoe werkt het?</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {stappen.map((s, i) => (
              <li key={s.titel} className="relative pl-4">
                <span aria-hidden="true" className={`absolute -left-2 -top-8 text-8xl font-black leading-none opacity-40 ${s.kleur}`}>
                  {i + 1}
                </span>
                <h3 className="relative text-2xl font-extrabold">
                  <span className="sr-only">Stap {i + 1}: </span>
                  {s.titel}
                </h3>
                <p className="relative mt-2 text-zee-100">{s.tekst}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Knop href="/boeken" variant="zon">
              Stel je dag samen
            </Knop>
          </div>
        </div>
      </section>

      {clusters.map((c, ci) => {
        const blokken = BOUWSTENEN.filter((b) => b.cluster === c || (c === 'amelisweerd' && b.cluster === 'beide'));
        const buiten = c === 'amelisweerd';
        return (
          <section key={c} className={ci === 0 ? 'bg-zee-50' : 'bg-white'}>
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
              <Sticker kleur={buiten ? 'zee' : 'vlam'} hoek={ci === 0 ? 'rotate-2' : '-rotate-2'}>
                {buiten ? (winter ? 'Actief en buiten, april tot en met oktober' : 'Actief en buiten') : winter ? 'Binnen, lekker warm' : 'Spelen en borrelen'}
              </Sticker>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">{CLUSTERS[c].naam}</h2>
              <p className="mt-3 max-w-2xl text-lg text-grijs">{CLUSTERS[c].uitleg}</p>
              <ul className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
                {blokken.map((b, i) => (
                  <li key={b.slug}>
                    <Link href={`/bouwstenen#${b.slug}`} className="group block">
                      <Foto
                        foto={fotoVoorBouwsteen(b.slug)}
                        verhouding={`aspect-square ${HOEKEN[i % HOEKEN.length]}`}
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="kantel polaroid rounded-sm transition-transform group-hover:rotate-0 group-hover:scale-105"
                      />
                      <p className="mt-4 font-extrabold uppercase leading-tight text-inkt group-hover:text-vlam-700">{b.naam}</p>
                      <p className="text-sm font-bold text-grijs">{formatEuro(b.verkoopCents)} p.p.</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <Band woorden={['Oudegracht', 'Amelisweerd', 'Kromme Rijn', 'Domtoren', 'Paardenveld', 'Rhijnauwen']} kleur="bg-zee-400 text-inkt" hoek="rotate-1" />

      <section className="bg-zon-100">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">Voor wie?</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {voorWie.map((d, i) => (
              <li
                key={d.titel}
                className={`kantel overflow-hidden rounded-2xl bg-white shadow-xl transition-transform hover:-translate-y-1 hover:rotate-0 ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
              >
                <Link href={d.href} className="block">
                  <Foto foto={d.foto} verhouding="aspect-[16/10]" sizes="(min-width: 640px) 50vw, 100vw" />
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
        <h2 className="text-4xl font-black uppercase tracking-tight text-inkt sm:text-5xl">Utrecht vanaf het water</h2>
        <p className="mt-3 max-w-2xl text-lg text-grijs">Over de grachten, langs de Kromme Rijn en door de binnenstad.</p>
        <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
          {galerij.map((foto, i) => (
            <li key={foto.src}>
              <Foto
                foto={foto}
                verhouding={`aspect-square ${HOEKEN[i % HOEKEN.length]}`}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="kantel polaroid rounded-sm transition-transform hover:rotate-0"
              />
            </li>
          ))}
        </ul>
      </section>

      <BoekBlok />
    </main>
  );
}

import Link from 'next/link';
import { UtrechtSkyline } from '@utrecht/ui';
import { BOUWSTENEN, CLUSTERS, PAKKETTEN, REGELS } from '../lib/aanbod';
import { PakketKaart } from '../components/pakket-kaart';

const STAPPEN = [
  {
    titel: 'Kies een pakket of stel zelf samen',
    tekst: 'Per tijdvak kies je een onderdeel. Je ziet meteen de vaste prijs per persoon.',
  },
  {
    titel: 'Wij regelen de reserveringen',
    tekst: 'Binnen 2 werkdagen bevestigen we de beschikbaarheid bij onze partners en krijg je een betaallink.',
  },
  {
    titel: 'Jullie hoeven alleen te komen',
    tekst: 'De dag ervoor krijg je alle tijden, adressen en een telefoonnummer voor op de dag zelf.',
  },
];

const VOOR_WIE = [
  { href: '/bedrijfsuitje-utrecht', naam: 'Bedrijfsuitje' },
  { href: '/teambuilding-utrecht', naam: 'Teambuilding' },
  { href: '/schooluitje-utrecht', naam: 'Schooluitje' },
  { href: '/vrijgezellenfeest-utrecht', naam: 'Vrijgezellenfeest' },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-canal-900 text-white">
        <UtrechtSkyline
          className="absolute inset-x-0 bottom-0 w-full h-48 text-white opacity-[0.07] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
          <p className="text-cream/70 mb-3">Dagje Utrecht voor groepen van {REGELS.minPers} tot {REGELS.maxPers} personen</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6 max-w-3xl">
            Een dag Utrecht met je groep, zonder gedoe.
          </h1>
          <p className="text-xl text-cream/90 max-w-2xl">
            Jeu de boules, kanoën, kickbiken, rondvaart en borrel. Kies een pakket of stel zelf je
            dag samen, met een vaste prijs per persoon.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/pakketten"
              className="inline-flex items-center rounded-full bg-terracotta-500 hover:bg-terracotta-400 px-6 py-3 font-medium text-white shadow-lg"
            >
              Bekijk de pakketten →
            </Link>
            <Link
              href="/boeken"
              className="inline-flex items-center rounded-full border border-white/40 hover:border-white/70 px-6 py-3 font-medium text-white"
            >
              Zelf samenstellen
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl mb-10 text-canal-900">Zo werkt het</h2>
        <ol className="grid md:grid-cols-3 gap-6">
          {STAPPEN.map((s, i) => (
            <li key={s.titel} className="flex gap-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-terracotta-500 text-white grid place-items-center font-semibold">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-canal-900">{s.titel}</p>
                <p className="text-sm text-canal-700 mt-1">{s.tekst}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-3xl mb-3 text-canal-900">Pakketten</h2>
          <p className="text-canal-700 mb-10 max-w-2xl">
            Kant-en-klare dagen. Boek ze zoals ze zijn of wissel onderdelen om.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {PAKKETTEN.map((p) => (
              <PakketKaart key={p.slug} pakket={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl mb-3 text-canal-900">Twee plekken, één dag</h2>
        <p className="text-canal-700 mb-10 max-w-2xl">
          Spelen en borrelen in het centrum, of actief op het water in Amelisweerd. Met de kickbike
          ga je van het een naar het ander.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {(['centrum', 'amelisweerd'] as const).map((c) => (
            <div key={c} className="rounded-2xl border border-canal-100 p-6">
              <h3 className="font-serif text-2xl text-canal-900">{CLUSTERS[c].naam}</h3>
              <p className="text-sm text-canal-600 mt-1 mb-4">{CLUSTERS[c].uitleg}</p>
              <ul className="space-y-1 text-canal-800">
                {BOUWSTENEN.filter((b) => b.cluster === c).map((b) => (
                  <li key={b.slug}>
                    <Link href={`/bouwstenen#${b.slug}`} className="hover:text-terracotta-600">
                      <span aria-hidden="true">{b.emoji}</span> {b.naam}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-8">
        <h2 className="font-serif text-3xl mb-6 text-canal-900">Voor wie?</h2>
        <div className="flex flex-wrap gap-3">
          {VOOR_WIE.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className="rounded-full border border-canal-200 hover:border-terracotta-500 hover:text-terracotta-600 px-5 py-2 text-canal-800"
            >
              {v.naam}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

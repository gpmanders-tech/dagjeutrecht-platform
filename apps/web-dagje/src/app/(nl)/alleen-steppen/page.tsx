import type { Metadata } from 'next';
import Link from 'next/link';

const STEPVERHUUR = 'https://stepverhuurutrecht.nl';

// Steppen hoort bij stepverhuurutrecht.nl (zoekwoordverdeling): deze pagina verwijst door
// en concurreert daarom niet in Google. De links worden wel gevolgd.
export const metadata: Metadata = {
  title: 'Alleen steps huren in Utrecht? Boek bij Stepverhuur Utrecht',
  description:
    'Wil je alleen kickbikes huren in Utrecht? Boek dan direct en snel bij stepverhuurutrecht.nl. Zoek je een hele dag uit, dan stel je die hier samen.',
  alternates: { canonical: '/alleen-steppen' },
  robots: { index: false, follow: true },
};

export default function AlleenSteppenPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-inkt">
      <p className="inline-block rounded-full bg-zon-300 px-4 py-1 text-sm font-bold uppercase tracking-wide">
        Ons kleine broertje
      </p>
      <h1 className="mt-4 text-5xl font-black uppercase tracking-tight">Alleen steps huren in Utrecht?</h1>
      <p className="mt-6 text-lg">
        Wil je met je groep alleen steppen, zonder rest van het programma? Boek dan direct en snel bij{' '}
        <strong>Stepverhuur Utrecht</strong>. Zij bezorgen de kickbikes op jullie startplek en halen ze na afloop
        weer op, voor groepen vanaf 8 personen.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={STEPVERHUUR}
          className="inline-flex min-h-12 items-center rounded-full bg-vlam-400 px-7 font-extrabold uppercase tracking-wide text-inkt hover:bg-vlam-500"
        >
          Naar stepverhuurutrecht.nl
        </a>
        <a
          href={`${STEPVERHUUR}/aanvragen`}
          className="inline-flex min-h-12 items-center rounded-full border-2 border-inkt px-7 font-extrabold uppercase tracking-wide hover:bg-zee-50"
        >
          Direct steps aanvragen
        </a>
      </div>

      <div className="mt-14 rounded-2xl bg-zee-50 p-6">
        <h2 className="text-2xl font-black uppercase tracking-tight">Liever een hele dag uit?</h2>
        <p className="mt-3">
          Dan zit je hier goed. Bij DagjeUtrecht combineer je de kickbike-tocht met jeu de boules, shuffleboard,
          suppen, kanoën, een rondvaart, lunch en borrel. Kies een vast pakket of stel je dag zelf samen.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/pakketten"
            className="inline-flex min-h-12 items-center rounded-full bg-vlam-400 px-7 font-extrabold uppercase tracking-wide text-inkt hover:bg-vlam-500"
          >
            Bekijk de pakketten
          </Link>
          <Link
            href="/boeken"
            className="inline-flex min-h-12 items-center rounded-full border-2 border-inkt px-7 font-extrabold uppercase tracking-wide hover:bg-white"
          >
            Stel je dag samen
          </Link>
        </div>
      </div>
    </main>
  );
}

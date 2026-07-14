import Link from 'next/link';
import { prisma } from '@utrecht/db';
import { AUDIENCES } from '../lib/audiences';
import { HeroRotator } from '../components/hero-rotator';
import { HERO_PHOTOS } from '../lib/hero-photos';
import { AUDIENCE_PHOTOS } from '../lib/audience-photos';

export const revalidate = 300;

async function safeFeatured() {
  try {
    return await prisma.program.findMany({
      where: { channel: 'DAGJE', published: true },
      orderBy: { order: 'asc' },
      take: 3,
    });
  } catch (e) {
    console.error('Program.findMany failed (DB down?):', e);
    return [];
  }
}

export default async function Home() {
  const featured = await safeFeatured();

  return (
    <main>
      <section className="relative overflow-hidden text-white min-h-[70vh] grid">
        <HeroRotator slides={HERO_PHOTOS} />
        <div className="relative max-w-5xl mx-auto px-6 py-24 w-full self-end">
          <p className="text-cream/80 mb-3">Dagje Utrecht voor elke groep</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6 max-w-3xl drop-shadow-lg">
            Stel je eigen dag in Utrecht samen.
          </h1>
          <p className="text-xl text-cream/90 max-w-2xl drop-shadow">
            Team-uitje, studentenclubje, schoolgroep, gezinsdag of vrijgezellen. Wij combineren
            activiteiten, lunch en borrels; jij hoeft alleen te komen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/samensteller"
              className="inline-flex items-center rounded-full bg-terracotta-500 hover:bg-terracotta-400 px-6 py-3 font-medium text-white shadow-lg"
            >
              Zelf samenstellen →
            </Link>
            <Link
              href="#doelgroepen"
              className="inline-flex items-center rounded-full border border-white/40 hover:border-white/70 backdrop-blur px-6 py-3 font-medium text-white"
            >
              Voorbeeldprogramma's bekijken
            </Link>
          </div>
        </div>
      </section>

      <section id="doelgroepen" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl mb-3 text-canal-900">Voor wie is dit?</h2>
        <p className="text-canal-700 mb-10 max-w-2xl">
          Kies je groep en je krijgt voorbeeldprogramma's die passen bij jullie sfeer en budget.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AUDIENCES.map((a) => (
            <Link
              key={a.slug}
              href={a.landingUrl ?? `/doelgroep/${a.slug}`}
              className="group relative block rounded-2xl overflow-hidden shadow-soft aspect-[4/3] transition-transform hover:-translate-y-1"
            >
              <img
                src={AUDIENCE_PHOTOS[a.slug]}
                alt={`Sfeerbeeld ${a.title}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
              <div className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs ${a.accentClass}`}>
                {a.heroEmoji} {a.title}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-serif text-2xl drop-shadow">{a.title}</h3>
                <p className="opacity-90 text-sm drop-shadow">{a.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-cream/40 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-serif text-3xl mb-3 text-canal-900">Populair deze week</h2>
            <p className="text-canal-700 mb-10 max-w-2xl">
              Kant-en-klare programma's die je zo kunt aanvragen, of aanpassen naar eigen wens.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  href={`/programma/${p.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-soft border border-canal-100 hover:border-terracotta-400 transition-colors"
                >
                  {p.heroImage && (
                    <img src={p.heroImage} alt={p.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-5">
                    <h3 className="font-serif text-xl text-canal-900">{p.title}</h3>
                    {p.subtitle && <p className="text-canal-600 text-sm mt-1">{p.subtitle}</p>}
                    <p className="mt-3 text-canal-700 text-sm">
                      {p.durationHours}u · vanaf €{(p.pricePerPerson / 100).toFixed(0)} p.p.
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="rounded-3xl bg-terracotta-500 text-white overflow-hidden grid md:grid-cols-[3fr_2fr]">
          <div className="p-10">
            <p className="text-white/70 text-sm mb-2">Cadeau geven</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Een dagje Utrecht als cadeau
            </h2>
            <p className="text-white/90 mb-6 max-w-md">
              Cadeaubon van &euro;25, &euro;50, &euro;100 of een compleet arrangement voor twee.
              De ontvanger stelt zelf de dag samen.
            </p>
            <Link
              href="/cadeau"
              className="inline-flex items-center rounded-full bg-white text-terracotta-600 hover:bg-cream px-6 py-3 font-medium shadow-lg"
            >
              Cadeaubon bestellen →
            </Link>
          </div>
          <div className="hidden md:block relative min-h-[240px] bg-terracotta-600">
            <img
              src="https://loremflickr.com/800/600/gift,present,ribbon?lock=1234"
              alt="Cadeau"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
            />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-canal-900">
        <h2 className="font-serif text-3xl mb-6">Hoe werkt het?</h2>
        <ol className="space-y-4 text-canal-800">
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta-500 text-white grid place-items-center font-semibold">
              1
            </span>
            <span>
              Kies je doelgroep en een voorbeeldprogramma, of start blanco in de samensteller.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta-500 text-white grid place-items-center font-semibold">
              2
            </span>
            <span>
              Pas het aan: onze AI-chat helpt je met suggesties op basis van budget, datum en type
              groep.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta-500 text-white grid place-items-center font-semibold">
              3
            </span>
            <span>
              Vraag je programma aan; Ger stuurt binnen 48u een vrijblijvende offerte.
            </span>
          </li>
        </ol>
      </section>
    </main>
  );
}

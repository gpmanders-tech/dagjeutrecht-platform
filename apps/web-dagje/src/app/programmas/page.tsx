import Link from 'next/link';
import { prisma } from '@utrecht/db';
import { AUDIENCES } from '../../lib/audiences';

export const revalidate = 300;

export default async function ProgrammasPage() {
  let programs: Awaited<ReturnType<typeof prisma.program.findMany>> = [];
  try {
    programs = await prisma.program.findMany({
      where: { channel: 'DAGJE', published: true },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    });
  } catch (e) {
    console.error('programmas DB fetch failed:', e);
  }

  // Groepeer per doelgroep
  const byAudience = new Map<string, typeof programs>();
  for (const a of AUDIENCES) byAudience.set(a.db, []);
  for (const p of programs) {
    for (const tag of p.audienceTags) {
      const list = byAudience.get(tag);
      if (list) list.push(p);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl text-canal-900 mb-3">Voorbeeldprogramma's</h1>
      <p className="text-canal-700 mb-10 max-w-2xl">
        Kant-en-klare dagprogramma's per type gezelschap. Kies er een en pas hem daarna aan naar
        jullie wens.
      </p>

      {AUDIENCES.map((a) => {
        const list = byAudience.get(a.db) ?? [];
        if (list.length === 0) return null;
        return (
          <section key={a.slug} className="mb-14">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl">{a.heroEmoji}</span>
              <h2 className="font-serif text-2xl text-canal-900">{a.title}</h2>
              <Link
                href={`/doelgroep/${a.slug}`}
                className="text-sm text-terracotta-600 hover:underline ml-auto"
              >
                Meer voor {a.title.toLowerCase()} →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((p) => (
                <Link
                  key={p.id}
                  href={`/programma/${p.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-soft border border-canal-100 hover:border-terracotta-400 transition-colors"
                >
                  {p.heroImage ? (
                    <img src={p.heroImage} alt={p.title} className="w-full h-40 object-cover" />
                  ) : (
                    <div className={`w-full h-40 grid place-items-center text-4xl ${a.accentClass}`}>
                      {a.heroEmoji}
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-canal-900">{p.title}</h3>
                    {p.subtitle && <p className="text-canal-600 text-sm mt-1">{p.subtitle}</p>}
                    <p className="text-canal-700 text-sm mt-3">
                      {p.durationHours} uur · vanaf €{(p.pricePerPerson / 100).toFixed(0)} p.p.
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}

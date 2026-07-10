import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@utrecht/db';
import { findAudience } from '../../../lib/audiences';
import { Breadcrumbs, FaqSchema } from '../../../components/seo-jsonld';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = findAudience(params.slug);
  if (!a) return {};
  return {
    title: `${a.title} in Utrecht - programma's en ideeën`,
    description: a.intro,
    alternates: { canonical: `https://dagjeutrecht.nl/doelgroep/${a.slug}` },
  };
}

export const revalidate = 300;

export default async function AudiencePage({ params }: { params: { slug: string } }) {
  const audience = findAudience(params.slug);
  if (!audience) notFound();

  const programs = await prisma.program.findMany({
    where: {
      channel: 'DAGJE',
      published: true,
      audienceTags: { has: audience.db },
    },
    orderBy: { order: 'asc' },
  });

  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Voor wie', url: '/#doelgroepen' },
          { name: audience.title, url: `/doelgroep/${audience.slug}` },
        ]}
      />
      <FaqSchema items={audience.faq} />
      <section className={`${audience.accentClass} py-20`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-5xl mb-4">{audience.heroEmoji}</div>
          <h1 className="font-serif text-5xl mb-4">{audience.title}</h1>
          <p className="text-xl opacity-90 max-w-2xl">{audience.intro}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl text-canal-900 mb-8">Voorbeeldprogramma's</h2>

        {programs.length === 0 ? (
          <div className="rounded-2xl bg-cream/40 p-8 text-canal-800">
            <p className="mb-4">
              Nog geen kant-en-klaar programma voor deze doelgroep. Geen nood - de samensteller
              werkt precies zo goed op maat.
            </p>
            <Link
              href={`/samensteller?doelgroep=${audience.slug}`}
              className="inline-flex items-center rounded-full bg-terracotta-500 hover:bg-terracotta-400 px-6 py-3 font-medium text-white"
            >
              Zelf samenstellen →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p) => (
              <Link
                key={p.id}
                href={`/programma/${p.slug}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-soft border border-canal-100 hover:border-terracotta-400 transition-colors"
              >
                {p.heroImage && (
                  <img src={p.heroImage} alt={p.title} className="w-full h-44 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-canal-900">{p.title}</h3>
                  {p.subtitle && <p className="text-canal-600 mt-1">{p.subtitle}</p>}
                  <p className="text-canal-700 mt-3">
                    {p.durationHours} uur · vanaf{' '}
                    <span className="font-semibold">
                      €{(p.pricePerPerson / 100).toFixed(0)}
                    </span>{' '}
                    p.p.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Link
            href={`/samensteller?doelgroep=${audience.slug}`}
            className="inline-flex items-center rounded-full border border-canal-300 hover:border-terracotta-400 px-6 py-3 font-medium text-canal-800"
          >
            Of stel zelf een programma samen →
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl text-canal-900 mb-6">Veelgestelde vragen</h2>
        <dl className="space-y-6">
          {audience.faq.map((f, i) => (
            <div key={i}>
              <dt className="font-semibold text-canal-900">{f.q}</dt>
              <dd className="mt-1 text-canal-700">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return [
    { slug: 'teamuitje' },
    { slug: 'studenten' },
    { slug: 'schoolgroep' },
    { slug: 'gezin' },
    { slug: 'vrijgezel' },
  ];
}

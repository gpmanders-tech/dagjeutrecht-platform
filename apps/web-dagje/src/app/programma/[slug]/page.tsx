import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@utrecht/db';
import { providerImage } from '../../../lib/provider-image';
import { Breadcrumbs } from '../../../components/seo-jsonld';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await prisma.program.findUnique({ where: { slug: params.slug } });
  if (!p) return {};
  return {
    title: `${p.title} - programma Utrecht`,
    description: p.description.slice(0, 155),
    alternates: { canonical: `https://dagjeutrecht.nl/programma/${p.slug}` },
    openGraph: p.heroImage ? { images: [{ url: p.heroImage }] } : undefined,
  };
}

export const revalidate = 300;

export default async function ProgramDetail({ params }: { params: { slug: string } }) {
  let program;
  try {
    program = await prisma.program.findUnique({
      where: { slug: params.slug },
      include: {
        items: {
          orderBy: { order: 'asc' },
          include: { provider: true },
        },
      },
    });
  } catch (e) {
    console.error('program detail DB fetch failed:', e);
    notFound();
  }
  if (!program) notFound();

  const slugs = program.items.map((it) => it.provider.slug).join(',');
  const composerUrl = `/samensteller?slugs=${slugs}&pax=${program.defaultPax}`;

  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Programma\'s', url: '/programmas' },
          { name: program.title, url: `/programma/${program.slug}` },
        ]}
      />
      <section className="relative bg-canal-900 text-white overflow-hidden">
        {program.heroImage && (
          <img
            src={program.heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <p className="text-cream/70 text-sm mb-2">
            Programma · {program.durationHours} uur · vanaf €{(program.pricePerPerson / 100).toFixed(0)} p.p.
          </p>
          <h1 className="font-serif text-5xl mb-3">{program.title}</h1>
          {program.subtitle && <p className="text-xl text-cream/80">{program.subtitle}</p>}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-14 grid md:grid-cols-[2fr_1fr] gap-10">
        <div>
          <p className="text-lg text-canal-800 mb-8">{program.description}</p>

          <h2 className="font-serif text-2xl text-canal-900 mb-4">Dagindeling</h2>
          <ol className="space-y-3">
            {program.items.map((it) => (
              <li
                key={it.id}
                className="bg-white rounded-2xl border border-canal-100 p-5 flex gap-4"
              >
                <img
                  src={providerImage(it.provider, 'sm')}
                  alt=""
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-terracotta-600 font-mono text-sm">
                      {it.timeSlot ?? `Stop ${it.order + 1}`}
                    </span>
                    <span className="text-xs text-canal-500">{it.provider.category}</span>
                  </div>
                  <p className="font-serif text-xl text-canal-900">{it.provider.name}</p>
                  {it.notes && <p className="text-canal-700 text-sm mt-1">{it.notes}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside>
          <div className="sticky top-24 rounded-2xl border border-canal-200 bg-white p-6">
            <p className="text-sm text-canal-600">Vanaf</p>
            <p className="font-serif text-3xl text-canal-900">
              €{(program.pricePerPerson / 100).toFixed(0)}
            </p>
            <p className="text-sm text-canal-600 mb-4">per persoon (indicatie)</p>
            <p className="text-sm text-canal-700 mb-6">
              Standaard voor {program.defaultPax} personen. Meer of minder? Dat kan - pas aan in de
              samensteller.
            </p>
            <Link
              href={composerUrl}
              className="block rounded-full bg-terracotta-500 hover:bg-terracotta-400 text-white text-center font-medium py-3 mb-3"
            >
              Pas aan voor mijn groep
            </Link>
            <Link
              href={`/aanvraag?slugs=${slugs}&pax=${program.defaultPax}`}
              className="block rounded-full border border-canal-300 hover:border-canal-500 text-canal-800 text-center py-3"
            >
              Direct aanvragen
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}

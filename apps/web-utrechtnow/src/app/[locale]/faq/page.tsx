import { prisma } from '@utrecht/db';

export const revalidate = 60;

export const metadata = {
  title: 'Veelgestelde vragen — Utrecht Now',
};

export default async function FaqPage({ params: { locale } }: { params: { locale: string } }) {
  const items = await prisma.faqItem.findMany({
    where: { domain: 'UTRECHTNOW', locale: locale as any },
    orderBy: [{ category: 'asc' }, { position: 'asc' }],
  });

  // Schema.org markup
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };

  // Groeperen per category
  const byCategory = items.reduce<Record<string, typeof items>>((acc, i) => {
    const key = i.category || 'Algemeen';
    (acc[key] ??= []).push(i);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-terracotta uppercase tracking-wide text-xs mb-2">FAQ</p>
      <h1 className="font-serif text-4xl text-canal-900 mb-8">Veelgestelde vragen</h1>

      {items.length === 0 && <p className="text-canal-500">Geen FAQ-items beschikbaar.</p>}

      {Object.entries(byCategory).map(([cat, list]) => (
        <section key={cat} className="mb-10">
          <h2 className="font-serif text-2xl text-canal-900 mb-3">{cat}</h2>
          <div className="space-y-2">
            {list.map((i) => (
              <details key={i.id} className="bg-white border border-canal-100 rounded-xl shadow-soft group">
                <summary className="cursor-pointer p-4 font-medium text-canal-900 list-none flex justify-between items-center">
                  <span>{i.question}</span>
                  <span className="text-terracotta group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <div className="px-4 pb-4 text-canal-700 whitespace-pre-line">{i.answer}</div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

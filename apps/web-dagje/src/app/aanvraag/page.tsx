import { prisma } from '@utrecht/db';
import { AanvraagForm } from '../../components/aanvraag-form';
import type { AudienceSlug } from '../../lib/audiences';

export default async function AanvraagPage({
  searchParams,
}: {
  searchParams: { slugs?: string; pax?: string; doelgroep?: string };
}) {
  const slugs = (searchParams.slugs ?? '').split(',').filter(Boolean);
  const pax = Number(searchParams.pax ?? 10) || 10;
  const audience = searchParams.doelgroep as AudienceSlug | undefined;

  if (slugs.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16 text-canal-800">
        <h1 className="font-serif text-3xl mb-4">Je programma is leeg</h1>
        <p>
          Ga eerst naar de <a className="underline" href="/samensteller">samensteller</a> en kies
          een aantal activiteiten.
        </p>
      </main>
    );
  }

  const providers = await prisma.provider.findMany({ where: { slug: { in: slugs } } });
  const bySlug = new Map(providers.map((p) => [p.slug, p]));

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-[2fr_3fr] gap-10">
      <aside>
        <h2 className="font-serif text-2xl text-canal-900 mb-3">Jullie programma</h2>
        <ul className="space-y-2">
          {slugs.map((s, i) => {
            const p = bySlug.get(s);
            return (
              <li key={s} className="rounded-lg bg-white border border-canal-100 p-3">
                <p className="text-xs text-canal-500">Stop {i + 1}</p>
                <p className="text-canal-900">{p?.name ?? s}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm text-canal-600">
          {pax} personen{audience ? ` · ${audience}` : ''}
        </p>
      </aside>

      <section>
        <h1 className="font-serif text-3xl text-canal-900 mb-3">Vraag Ger om een offerte</h1>
        <p className="text-canal-700 mb-6">
          Jullie samenstelling is klaar. Vul kort je gegevens in - Ger van DagjeUtrecht zorgt voor
          de boekingen bij alle leveranciers en stuurt binnen 48u een vrijblijvende offerte.
        </p>
        <AanvraagForm providerSlugs={slugs} initialPax={pax} initialAudience={audience} />
      </section>
    </main>
  );
}

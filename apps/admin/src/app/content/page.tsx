import { prisma } from '@utrecht/db';
import { Badge, Button } from '@utrecht/ui';
import Link from 'next/link';

export const revalidate = 10;

export default async function ContentPage() {
  const [posts, faqs] = await Promise.all([
    prisma.blogPost.findMany({ orderBy: { updatedAt: 'desc' }, take: 50 }),
    prisma.faqItem.findMany({ orderBy: [{ domain: 'asc' }, { position: 'asc' }] }),
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-3xl text-canal-900">Blog & FAQ</h1>
        <Link href="/content/new">
          <Button>+ Nieuw artikel</Button>
        </Link>
      </div>

      <section className="mb-10">
        <h2 className="font-serif text-xl text-canal-900 mb-3">Blogartikelen ({posts.length})</h2>
        <div className="bg-white rounded-2xl border border-canal-100 shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-canal-50 text-left text-canal-700">
              <tr>
                <th className="px-4 py-3">Titel</th>
                <th className="px-4 py-3">Domein</th>
                <th className="px-4 py-3">Taal</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Bijgewerkt</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t border-canal-100">
                  <td className="px-4 py-2">
                    <Link href={`/content/${p.id}`} className="text-canal-900 hover:underline">{p.title}</Link>
                  </td>
                  <td className="px-4 py-2">{p.domain}</td>
                  <td className="px-4 py-2 uppercase text-xs">{p.locale}</td>
                  <td className="px-4 py-2">
                    <Badge tone={p.published ? 'success' : 'default'}>
                      {p.published ? 'Gepubliceerd' : 'Concept'}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-xs text-canal-500">{p.updatedAt.toLocaleDateString('nl-NL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && <p className="text-center py-12 text-canal-500">Geen artikelen — klik "+ Nieuw artikel"</p>}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-serif text-xl text-canal-900">FAQ-items ({faqs.length})</h2>
          <Link href="/content/faq/new"><Button size="sm" variant="outline">+ Nieuw FAQ-item</Button></Link>
        </div>
        <div className="bg-white rounded-2xl border border-canal-100 shadow-soft p-4">
          {faqs.length === 0 ? (
            <p className="text-canal-500 text-center py-6">Geen FAQ-items.</p>
          ) : (
            <ul className="divide-y divide-canal-100">
              {faqs.map((f) => (
                <li key={f.id} className="py-3">
                  <p className="font-medium text-canal-900">{f.question}</p>
                  <p className="text-sm text-canal-600 mt-1 line-clamp-2">{f.answer}</p>
                  <p className="text-xs text-canal-500 mt-1">{f.domain} · {f.locale}{f.category ? ` · ${f.category}` : ''}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

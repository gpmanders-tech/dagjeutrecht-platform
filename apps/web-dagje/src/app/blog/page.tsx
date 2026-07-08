import Link from 'next/link';
import { prisma } from '@utrecht/db';

export const revalidate = 300;

export default async function BlogIndex() {
  const posts = await prisma.blogPost.findMany({
    where: { domain: 'DAGJEUTRECHT', locale: 'nl', published: true },
    orderBy: { publishedAt: 'desc' },
    take: 30,
  });

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="font-serif text-4xl text-canal-900 mb-3">Inspiratie</h1>
      <p className="text-canal-700 mb-10 max-w-2xl">
        Ideeën, tips en verhalen voor jullie dag Utrecht.
      </p>

      {posts.length === 0 ? (
        <p className="text-canal-500">Nog geen artikelen gepubliceerd. Kom binnenkort terug.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="block bg-white rounded-2xl overflow-hidden shadow-soft border border-canal-100 hover:border-terracotta-400 transition-colors"
            >
              {p.heroImage && (
                <img src={p.heroImage} alt={p.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-5">
                <h2 className="font-serif text-xl text-canal-900">{p.title}</h2>
                {p.excerpt && (
                  <p className="text-canal-600 text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

import Link from 'next/link';
import { prisma } from '@utrecht/db';

export const revalidate = 300;

export default async function BlogIndex() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { domain: 'DAGJEUTRECHT', locale: 'nl', published: true },
      orderBy: { publishedAt: 'desc' },
      take: 30,
    });
  } catch (e) {
    console.error('blog list DB fetch failed:', e);
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-3">Inspiratie</h1>
      <p className="text-inkt mb-10 max-w-2xl">
        Ideeën, tips en verhalen voor jullie dag Utrecht.
      </p>

      {posts.length === 0 ? (
        <p className="text-grijs">Nog geen artikelen gepubliceerd. Kom binnenkort terug.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="block bg-white rounded-2xl overflow-hidden shadow-xl border border-inkt/10 hover:border-vlam-400 transition-colors"
            >
              {p.heroImage && (
                <img src={p.heroImage} alt={p.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-5">
                <h2 className="text-xl font-extrabold text-inkt">{p.title}</h2>
                {p.excerpt && (
                  <p className="text-grijs text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

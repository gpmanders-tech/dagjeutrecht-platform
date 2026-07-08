import { prisma } from '@utrecht/db';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'Blog — Utrecht Now',
  description: 'Inspiratie, tips en gidsen voor je bezoek aan Utrecht.',
};

export default async function BlogIndex({ params: { locale } }: { params: { locale: string } }) {
  const posts = await prisma.blogPost.findMany({
    where: { domain: 'UTRECHTNOW', locale: locale as any, published: true },
    orderBy: { publishedAt: 'desc' },
    take: 50,
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <p className="text-terracotta-600 uppercase text-xs tracking-wide mb-2">Blog</p>
      <h1 className="font-serif text-4xl text-canal-900 mb-8">Verhalen over Utrecht</h1>

      {posts.length === 0 && (
        <p className="text-canal-500">Nog geen artikelen. Kom binnenkort terug.</p>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <Link key={p.id} href={`/${locale}/blog/${p.slug}`} className="block group">
            {p.heroImage && (
              <img src={p.heroImage} alt={p.title} className="rounded-xl mb-3 aspect-[16/9] object-cover" />
            )}
            <p className="text-xs text-canal-500">{p.publishedAt?.toLocaleDateString('nl-NL')}</p>
            <h2 className="font-serif text-2xl text-canal-900 mt-1 group-hover:text-terracotta-600 transition-colors">{p.title}</h2>
            {p.excerpt && <p className="text-canal-700 mt-2">{p.excerpt}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}

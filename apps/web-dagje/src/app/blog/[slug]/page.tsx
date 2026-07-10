import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@utrecht/db';
import { Breadcrumbs } from '../../../components/seo-jsonld';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await prisma.blogPost.findFirst({
    where: { domain: 'DAGJEUTRECHT', locale: 'nl', slug: params.slug, published: true },
  });
  if (!p) return {};
  return {
    title: p.metaTitle ?? p.title,
    description: p.metaDesc ?? p.excerpt ?? undefined,
    alternates: { canonical: `https://dagjeutrecht.nl/blog/${p.slug}` },
    openGraph: p.heroImage
      ? { images: [{ url: p.heroImage }], type: 'article', publishedTime: p.publishedAt?.toISOString() }
      : undefined,
  };
}

export const revalidate = 300;

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await prisma.blogPost.findFirst({
      where: { domain: 'DAGJEUTRECHT', locale: 'nl', slug: params.slug, published: true },
    });
  } catch (e) {
    console.error('blog post DB fetch failed:', e);
    notFound();
  }
  if (!post) notFound();

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Person', name: post.authorName ?? 'Ger Manders' },
    publisher: {
      '@type': 'Organization',
      name: 'DagjeUtrecht',
      logo: { '@type': 'ImageObject', url: 'https://dagjeutrecht.nl/favicon.svg' },
    },
    mainEntityOfPage: `https://dagjeutrecht.nl/blog/${post.slug}`,
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-14">
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Inspiratie', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {post.heroImage && (
        <img
          src={post.heroImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-2xl mb-8"
        />
      )}
      <h1 className="font-serif text-4xl text-canal-900 mb-3">{post.title}</h1>
      {post.publishedAt && (
        <p className="text-sm text-canal-500 mb-6">
          {new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long' }).format(post.publishedAt)}
          {post.authorName ? ` · ${post.authorName}` : ''}
        </p>
      )}
      <div
        className="prose prose-canal max-w-none text-canal-800 whitespace-pre-wrap"
        // Markdown blijft ruw - de admin CMS mag deze pagina later omzetten met een MD-renderer.
      >
        {post.body}
      </div>
    </article>
  );
}

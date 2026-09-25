import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@utrecht/db';
import { Breadcrumbs } from '../../../components/seo-jsonld';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await prisma.blogPost.findFirst({
    where: { domain: 'DAGJEUTRECHT', locale: 'nl', slug: params.slug, published: true },
  });
  if (!p) return {};
  // De merknaam uit de template maakt deze titels boven de 65 tekens, en dan kapt
  // Google ze af. Bij een korte titel past de merknaam er nog wel bij.
  const titel = p.metaTitle ?? p.title;
  return {
    title: titel.length > 45 ? { absolute: titel } : titel,
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

  // Geen achternaam op de site: van de auteur tonen we alleen de voornaam.
  const auteur = post.authorName?.replace(/\s+Manders$/i, '') || null;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: auteur
      ? { '@type': 'Person', name: auteur }
      : { '@type': 'Organization', name: 'DagjeUtrecht' },
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
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-3">{post.title}</h1>
      {post.publishedAt && (
        <p className="text-sm text-grijs mb-6">
          {new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long' }).format(post.publishedAt)}
          {auteur ? ` · ${auteur}` : ''}
        </p>
      )}
      <div
        className="prose max-w-none text-inkt whitespace-pre-wrap"
        // Markdown blijft ruw - de admin CMS mag deze pagina later omzetten met een MD-renderer.
      >
        {post.body}
      </div>
    </article>
  );
}

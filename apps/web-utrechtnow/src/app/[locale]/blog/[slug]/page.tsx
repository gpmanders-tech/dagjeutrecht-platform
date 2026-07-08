import { prisma } from '@utrecht/db';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export const revalidate = 60;

export async function generateMetadata({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { domain_locale_slug: { domain: 'UTRECHTNOW', locale: locale as any, slug } },
  });
  if (!post) return { title: 'Niet gevonden' };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
  };
}

export default async function BlogPost({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { domain_locale_slug: { domain: 'UTRECHTNOW', locale: locale as any, slug } },
  });
  if (!post || !post.published) notFound();

  const html = await marked(post.body);

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-xs text-canal-500">{post.publishedAt?.toLocaleDateString('nl-NL', {
        day: 'numeric', month: 'long', year: 'numeric',
      })}</p>
      <h1 className="font-serif text-4xl text-canal-900 mt-2 mb-6">{post.title}</h1>
      {post.heroImage && <img src={post.heroImage} alt={post.title} className="rounded-2xl mb-8 w-full" />}
      <div
        className="prose prose-canal max-w-none text-canal-800 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_p]:my-4 [&_a]:text-terracotta-600 [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}

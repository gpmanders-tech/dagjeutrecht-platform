import { notFound } from 'next/navigation';
import { prisma } from '@utrecht/db';

export const revalidate = 300;

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findFirst({
    where: { domain: 'DAGJEUTRECHT', locale: 'nl', slug: params.slug, published: true },
  });
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-14">
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

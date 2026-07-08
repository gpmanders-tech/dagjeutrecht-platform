import { prisma } from '@utrecht/db';
import { notFound } from 'next/navigation';
import { BlogEditor } from '@/components/blog-editor';

export default async function EditPost({ params: { id } }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();
  return (
    <div>
      <h1 className="font-serif text-3xl mb-6 text-canal-900">Bewerk artikel</h1>
      <BlogEditor
        initial={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt ?? '',
          body: post.body,
          heroImage: post.heroImage ?? '',
          domain: post.domain,
          locale: post.locale,
          published: post.published,
          metaTitle: post.metaTitle ?? '',
          metaDesc: post.metaDesc ?? '',
        }}
      />
    </div>
  );
}

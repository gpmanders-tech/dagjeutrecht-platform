import { BlogEditor } from '@/components/blog-editor';

export default function NewPost() {
  return (
    <div>
      <h1 className="font-serif text-3xl mb-6 text-canal-900">Nieuw blogartikel</h1>
      <BlogEditor />
    </div>
  );
}

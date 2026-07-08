import { FaqEditor } from '@/components/faq-editor';

export default function NewFaq() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl mb-6 text-canal-900">Nieuw FAQ-item</h1>
      <FaqEditor />
    </div>
  );
}

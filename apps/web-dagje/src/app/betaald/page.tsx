import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Bedankt voor je betaling', robots: { index: false, follow: false } };

export default function BetaaldPage({ searchParams }: { searchParams: { code?: string } }) {
  const code = (searchParams.code || '').replace(/[^A-Z0-9]/gi, '').slice(0, 12);
  return (
    <main className="max-w-xl mx-auto px-6 py-20 text-canal-800">
      <h1 className="font-serif text-4xl text-canal-900 mb-4">Bedankt!</h1>
      <p className="mb-3">
        Zodra de betaling bij ons binnen is, is jullie boeking{code ? ` ${code}` : ''} definitief.
      </p>
      <p className="mb-8">De dag voor het uitje krijg je per mail alle praktische informatie.</p>
      <Link href="/" className="text-terracotta-600 underline">
        Terug naar de homepage
      </Link>
    </main>
  );
}

import { GiftForm } from '../../components/gift-form';

export const metadata = {
  title: 'Cadeaubon - DagjeUtrecht',
  description: 'Een dagje Utrecht als cadeau. Bonnen van 25, 50 en 100 euro of onze Belevenisbox.',
};

export default function CadeauPage({ searchParams }: { searchParams: { bon?: string } }) {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      <p className="text-canal-500 text-sm">Cadeau geven</p>
      <h1 className="font-serif text-4xl md:text-5xl text-canal-900 mt-1 mb-4">
        Een dagje Utrecht als cadeau
      </h1>
      <p className="text-canal-700 max-w-2xl mb-10">
        Geef een verjaardag, huwelijk of afscheid extra glans: de ontvanger stelt zelf de dag samen
        uit onze 150+ Utrechtse leveranciers. Wij regelen alles daarna.
      </p>

      <GiftForm initialSlug={searchParams.bon} />
    </main>
  );
}

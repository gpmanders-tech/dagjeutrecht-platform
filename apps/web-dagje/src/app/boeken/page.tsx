import type { Metadata } from 'next';
import { BoekenFormulier } from '../../components/boeken-formulier';

export const metadata: Metadata = {
  title: 'Stel je dag samen en boek',
  description:
    'Kies een pakket of stel zelf je dag in Utrecht samen uit vaste onderdelen. Vaste prijs per persoon, bevestiging binnen 2 werkdagen.',
  alternates: { canonical: '/boeken' },
  robots: { index: false, follow: true },
};

export default function BoekenPage({ searchParams }: { searchParams: { pakket?: string } }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl md:text-5xl text-canal-900 mb-3">Stel je dag samen</h1>
      <p className="text-canal-700 max-w-2xl mb-10">
        Kies per tijdvak een onderdeel. De prijs is vast en je ziet hem meteen. Wij regelen de
        reserveringen bij onze partners.
      </p>
      <BoekenFormulier startPakket={searchParams.pakket} />
    </main>
  );
}

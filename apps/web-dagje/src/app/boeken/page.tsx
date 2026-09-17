import type { Metadata } from 'next';
import { BoekenFormulier } from '../../components/boeken-formulier';
import { fotos } from '../../lib/fotos';
import { PaginaKop } from '../../components/ui';

export const metadata: Metadata = {
  title: 'Stel je dag samen en boek',
  description:
    'Kies een pakket of stel zelf je dag in Utrecht samen uit vaste onderdelen. Vaste prijs per persoon, bevestiging binnen 3 werkdagen.',
  alternates: { canonical: '/boeken' },
  robots: { index: false, follow: true },
};

export default function BoekenPage({ searchParams }: { searchParams: { pakket?: string } }) {
  return (
    <>
      <PaginaKop
        titel="Stel je dag samen"
        intro="Kies per tijdvak een onderdeel. De prijs is vast en je ziet hem meteen. Wij regelen de reserveringen bij onze partners."
        kleur="zon"
        foto={fotos.kickbikePoort}
        label="In 3 stappen"
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <BoekenFormulier startPakket={searchParams.pakket} />
      </div>
    </>
  );
}

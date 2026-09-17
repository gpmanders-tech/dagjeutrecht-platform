import type { Metadata } from 'next';
import { PAKKETTEN, pakkettenOpSeizoen } from '../../lib/aanbod';
import { fotos } from '../../lib/fotos';
import { PakketKaart } from '../../components/pakket-kaart';
import { Band, BoekBlok, HOEKEN, PaginaKop } from '../../components/ui';

export const metadata: Metadata = {
  title: 'Pakketten voor een dagje Utrecht',
  description:
    'Kant-en-klare dagpakketten in Utrecht voor bedrijven, scholen en vriendengroepen: jeu de boules, kanoën, kickbike, rondvaart en borrel. Vaste prijs per persoon.',
  alternates: { canonical: '/pakketten' },
};

export const revalidate = 86400;

export default function PakkettenPage() {
  return (
    <>
      <PaginaKop
        titel="Pakketten"
        intro="Dagen die goed werken. Boek ze zoals ze zijn, of wissel onderdelen om in de samensteller."
        kleur="zee"
        foto={fotos.supVrijgezellen}
        label="Vaste prijs per persoon"
        knop={{ href: '/boeken', tekst: 'Zelf samenstellen' }}
      />
      <div className="-mt-3">
        <Band woorden={PAKKETTEN.map((p) => p.naam)} />
      </div>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <ul className="grid gap-8 sm:grid-cols-2">
          {pakkettenOpSeizoen().map((p, i) => (
            <li key={p.slug}>
              <PakketKaart pakket={p} hoek={HOEKEN[i % HOEKEN.length]} />
            </li>
          ))}
        </ul>
      </section>
      <BoekBlok titel="Liever zelf kiezen?" tekst="Stel per tijdvak je eigen dag samen uit alle onderdelen." foto={fotos.kickbikeGracht} />
    </>
  );
}

import type { Metadata } from 'next';
import { FOTO_BRONNEN } from '../../lib/fotos';
import { Foto } from '../../components/ui';

export const metadata: Metadata = {
  title: 'Fotobronnen',
  robots: { index: false, follow: true },
};

export default function FotobronnenPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt">Fotobronnen</h1>
      <p className="mt-4 text-lg text-grijs">
        De meeste foto&apos;s op deze site zijn van DagjeSuppen.nl. Onderstaande foto&apos;s komen van Wikimedia
        Commons en worden gebruikt onder de genoemde licentie.
      </p>
      <ul className="mt-10 space-y-6">
        {FOTO_BRONNEN.map((b) => (
          <li key={b.foto.src} className="flex items-center gap-5">
            <Foto foto={b.foto} verhouding="aspect-square w-24 shrink-0" sizes="96px" className="rounded-lg" />
            <p className="text-sm text-inkt">
              <strong>{b.foto.alt}</strong>
              <br />
              Foto: {b.maker}, licentie {b.licentie}.{' '}
              <a href={b.bron} className="font-bold text-vlam-700 underline underline-offset-2" rel="noopener noreferrer" target="_blank">
                Bron
              </a>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

import type { Metadata } from 'next';
import { FOTO_BRONNEN, fotos } from '../../../lib/fotos';

const SFEERBEELDEN = Object.values(fotos).filter((f) => f.src.startsWith('/fotos/sfeer-'));
import { Foto } from '../../../components/ui';

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
        Commons en worden gebruikt onder de genoemde licentie. De foto&apos;s op de pagina{' '}
        <a href="/rondvaart-utrecht" className="font-bold text-vlam-700 underline underline-offset-2">
          Rondvaart Utrecht
        </a>{' '}
        zijn van Rederij Schuttevaer.
      </p>
      <p className="mt-4 text-lg text-grijs">
        Een deel van de beelden zijn sfeerbeelden: die zijn met Canva gemaakt en laten geen echte groep of echte dag
        van ons zien. Het gaat om de foto&apos;s{' '}
        {SFEERBEELDEN.map((f, i) => (
          <span key={f.src}>
            {i > 0 && (i === SFEERBEELDEN.length - 1 ? ' en ' : ', ')}
            <em>{f.alt.charAt(0).toLowerCase() + f.alt.slice(1)}</em>
          </span>
        ))}
        .
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

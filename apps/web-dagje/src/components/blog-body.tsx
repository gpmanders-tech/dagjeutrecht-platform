import type { ReactNode } from 'react';
import Link from 'next/link';

/**
 * Lichte parser voor de blogtekst in de database: alleen de paar markdown-tekens die
 * seed-blog.ts gebruikt (## en ### koppen, "- " lijstjes, **vet** en [tekst](url) links).
 * Geen externe markdown-library nodig voor dit kleine stukje syntax.
 */
function renderInline(tekst: string, prefix: string): ReactNode[] {
  const delen = tekst.split(/(\*\*[^*]+\*\*|\[[^[\]]+\]\([^()]+\))/g).filter((d) => d !== '');
  return delen.map((deel, i) => {
    const key = `${prefix}-${i}`;
    const vet = deel.match(/^\*\*(.+)\*\*$/);
    if (vet) return <strong key={key}>{vet[1]}</strong>;
    const link = deel.match(/^\[([^[\]]+)\]\(([^()]+)\)$/);
    if (link) {
      const label = link[1] as string;
      const href = link[2] as string;
      if (href.startsWith('/')) {
        return (
          <Link key={key} href={href} className="font-bold text-inkt underline decoration-vlam-400 decoration-2 underline-offset-4">
            {label}
          </Link>
        );
      }
      return (
        <a key={key} href={href} className="font-bold text-inkt underline decoration-vlam-400 decoration-2 underline-offset-4">
          {label}
        </a>
      );
    }
    return <span key={key}>{deel}</span>;
  });
}

export function BlogBody({ body }: { body: string }) {
  const blokken = body.trim().split(/\n\n+/);
  return (
    <div className="prose max-w-none text-inkt">
      {blokken.map((blok, i) => {
        const key = `blok-${i}`;
        const regels = blok.split('\n').map((r) => r.trim()).filter(Boolean);
        if (blok.startsWith('### ')) {
          return (
            <h3 key={key} className="text-xl font-extrabold text-inkt mt-8 mb-2">
              {renderInline(blok.slice(4), key)}
            </h3>
          );
        }
        if (blok.startsWith('## ')) {
          return (
            <h2 key={key} className="text-2xl font-extrabold text-inkt mt-10 mb-3">
              {renderInline(blok.slice(3), key)}
            </h2>
          );
        }
        if (regels.length > 0 && regels.every((r) => r.startsWith('- '))) {
          return (
            <ul key={key} className="list-disc pl-6 space-y-1 mb-4">
              {regels.map((r, j) => (
                <li key={`${key}-${j}`}>{renderInline(r.slice(2), `${key}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={key} className="mb-4 whitespace-pre-line">
            {renderInline(blok, key)}
          </p>
        );
      })}
    </div>
  );
}

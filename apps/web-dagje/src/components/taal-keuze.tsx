'use client';

import { usePathname } from 'next/navigation';
import { TAAL_INFO, TALEN, taalVanPad, vertaalPad } from '../lib/talen';

/**
 * Taalknop NL / EN / DE. Gaat naar dezelfde pagina in de andere taal, of naar de
 * voorpagina als die pagina alleen in het Nederlands bestaat.
 * Gewone links (geen next/link): elke taal heeft een eigen layout met eigen
 * html-lang, dus een volledige paginawissel is hier juist goed.
 */
export function TaalKeuze({
  label,
  compact = false,
  className = '',
}: {
  label: string;
  /** Klein, voor de kop op een groot scherm; anders tikvriendelijk (44 px). */
  compact?: boolean;
  className?: string;
}) {
  const pad = usePathname() || '/';
  const huidig = taalVanPad(pad);
  return (
    <nav aria-label={label} className={className}>
      <ul className={`flex items-center ${compact ? 'gap-0.5' : 'gap-1'}`}>
        {TALEN.map((t) => (
          <li key={t}>
            <a
              href={vertaalPad(pad, t)}
              hrefLang={t}
              lang={t}
              aria-current={t === huidig ? 'true' : undefined}
              title={TAAL_INFO[t].naam}
              className={`inline-flex items-center justify-center rounded-md font-extrabold text-inkt hover:bg-zee-50 hover:text-zee-700 aria-[current=true]:bg-zee-400 aria-[current=true]:text-inkt ${
                compact ? 'h-7 min-w-8 px-1.5 text-xs' : 'min-h-11 min-w-11 px-2 text-sm'
              }`}
            >
              <span className="sr-only">{TAAL_INFO[t].naam}</span>
              <span aria-hidden="true">{TAAL_INFO[t].kort}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

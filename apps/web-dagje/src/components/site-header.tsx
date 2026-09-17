'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Logo } from './ui';

export const NAVIGATIE = [
  { href: '/', label: 'Home' },
  { href: '/pakketten', label: 'Pakketten' },
  { href: '/bouwstenen', label: 'Alle onderdelen' },
  { href: '/bedrijfsuitje-utrecht', label: 'Bedrijfsuitje' },
  { href: '/vrijgezellenfeest-utrecht', label: 'Vrijgezellen' },
  { href: '/schooluitje-utrecht', label: 'School' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pad = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur">
      <div className="h-1.5 bg-gradient-to-r from-zee-400 via-zon-400 to-vlam-500" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <Link href="/" onClick={() => setOpen(false)} aria-label="DagjeUtrecht, naar de homepage">
          <Logo className="text-2xl sm:text-3xl" />
        </Link>

        <nav aria-label="Hoofdmenu" className="hidden items-center gap-1 lg:flex">
          {NAVIGATIE.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pad === item.href ? 'page' : undefined}
              className="rounded-md px-3 py-2 font-semibold text-inkt hover:bg-zee-50 hover:text-zee-700 aria-[current=page]:text-vlam-700 aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/boeken"
            className="ml-2 inline-flex min-h-11 items-center rounded-full bg-vlam-400 px-5 font-bold text-inkt hover:bg-vlam-500"
          >
            Boeken
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/boeken"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-11 items-center rounded-full bg-vlam-400 px-4 text-sm font-bold text-inkt hover:bg-vlam-500"
          >
            Boeken
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobiel-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border-2 border-zee-400 text-inkt"
          >
            <span className="sr-only">{open ? 'Menu sluiten' : 'Menu openen'}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav id="mobiel-menu" aria-label="Hoofdmenu mobiel" hidden={!open} className="border-t-2 border-zee-100 bg-white lg:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
          {NAVIGATIE.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pad === item.href ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-3 font-semibold text-inkt hover:bg-zee-50 aria-[current=page]:text-vlam-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

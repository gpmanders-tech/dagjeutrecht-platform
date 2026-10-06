'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Logo } from './ui';
import { TaalKeuze } from './taal-keuze';

export const NAVIGATIE = [
  { href: '/', label: 'Home' },
  { href: '/pakketten', label: 'Pakketten' },
  { href: '/bouwstenen', label: 'Alle onderdelen' },
  { href: '/bedrijfsuitje-utrecht', label: 'Bedrijfsuitje' },
  { href: '/vrijgezellenfeest-utrecht', label: 'Vrijgezellen' },
  { href: '/schooluitje-utrecht', label: 'School' },
  { href: '/contact', label: 'Contact' },
];

/** Teksten en adressen van de kop in een andere taal; zonder deze prop is de kop Nederlands. */
export type KopTekst = {
  home: string;
  nav: Array<{ href: string; label: string }>;
  boeken: string;
  aanvragen: string;
  logoLabel: string;
  hoofdmenu: string;
  hoofdmenuMobiel: string;
  menuOpen: string;
  menuDicht: string;
  taal: string;
};

const NL: KopTekst = {
  home: '/',
  nav: NAVIGATIE,
  boeken: '/boeken',
  aanvragen: 'Aanvragen',
  logoLabel: 'DagjeUtrecht, naar de homepage',
  hoofdmenu: 'Hoofdmenu',
  hoofdmenuMobiel: 'Hoofdmenu mobiel',
  menuOpen: 'Menu openen',
  menuDicht: 'Menu sluiten',
  taal: 'Taal',
};

export function SiteHeader({ tekst = NL }: { tekst?: KopTekst }) {
  const pad = usePathname();
  const [open, setOpen] = useState(false);
  const t = tekst;

  return (
    <>
      {/*
      Taalknop op een groot scherm: een smalle balk boven de kop, want naast het menu is
      geen ruimte. Hij scrolt mee weg, zodat de vaste kop even hoog blijft als voorheen.
      Op mobiel staat de taalknop in het uitklapmenu.
    */}
      <div className="hidden bg-white lg:block">
        <div className="mx-auto flex max-w-6xl justify-end px-4 sm:px-6">
          <TaalKeuze label={t.taal} compact />
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur">
        <div className="h-1.5 bg-gradient-to-r from-zee-400 via-zon-400 to-vlam-500" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <Link href={t.home} onClick={() => setOpen(false)} aria-label={t.logoLabel}>
            <Logo className="text-2xl sm:text-3xl" />
          </Link>

          <nav aria-label={t.hoofdmenu} className="hidden items-center gap-1 lg:flex">
            {t.nav.slice(1).map((item) => (
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
              href={t.boeken}
              className="ml-2 inline-flex min-h-11 items-center rounded-full bg-vlam-400 px-5 font-bold text-inkt hover:bg-vlam-500"
            >
              {t.aanvragen}
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={t.boeken}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center rounded-full bg-vlam-400 px-4 text-sm font-bold text-inkt hover:bg-vlam-500"
            >
              {t.aanvragen}
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobiel-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border-2 border-zee-400 text-inkt"
            >
              <span className="sr-only">{open ? t.menuDicht : t.menuOpen}</span>
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="mobiel-menu"
          hidden={!open}
          className="border-t-2 border-zee-100 bg-white lg:hidden"
        >
          <nav aria-label={t.hoofdmenuMobiel}>
            <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
              {t.nav.map((item) => (
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
          <TaalKeuze
            label={t.taal}
            className="mx-auto max-w-6xl border-t-2 border-zee-100 px-4 py-2 sm:px-6"
          />
        </div>
      </header>
    </>
  );
}

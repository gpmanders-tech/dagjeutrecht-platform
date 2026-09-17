import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { UtrechtSkyline } from '@utrecht/ui';
import { fotos, type Foto as FotoType } from '../lib/fotos';

/** Het DagjeUtrecht-logo: woordmerk met de skyline van Utrecht erachter. */
export function Logo({ wit = false, className = '' }: { wit?: boolean; className?: string }) {
  return (
    <span className={`relative inline-flex items-end px-2 pb-1 pt-4 font-logo font-bold leading-none ${className}`}>
      <UtrechtSkyline
        className={`pointer-events-none absolute inset-0 h-full w-full ${wit ? 'text-white opacity-20' : 'text-inkt opacity-[0.16]'}`}
      />
      <span className="relative">
        <span className={wit ? 'text-zon-300' : 'text-terracotta-500'}>Dagje</span>
        <span className={wit ? 'text-white' : 'text-inkt'}>Utrecht</span>
      </span>
    </span>
  );
}

/** Foto in een vaste verhouding, altijd bijgesneden. */
export function Foto({
  foto,
  verhouding = 'aspect-[4/3]',
  className = '',
  sizes = '(min-width: 1024px) 33vw, 100vw',
  prioriteit = false,
}: {
  foto: FotoType;
  verhouding?: string;
  className?: string;
  sizes?: string;
  prioriteit?: boolean;
}) {
  const positie = verhouding.includes('absolute') ? '' : 'relative';
  return (
    <div className={`${positie} overflow-hidden ${verhouding} ${className}`}>
      <Image src={foto.src} alt={foto.alt} fill sizes={sizes} priority={prioriteit} className="object-cover" />
    </div>
  );
}

/** Lopende band met woorden. Puur decoratief. */
export function Band({
  woorden,
  kleur = 'bg-vlam-400 text-inkt',
  hoek = '-rotate-2',
}: {
  woorden: string[];
  kleur?: string;
  hoek?: string;
}) {
  const rij = [...woorden, ...woorden];
  return (
    <div aria-hidden="true" className={`relative z-10 overflow-hidden ${hoek} ${kleur} py-3`}>
      <div className="band-inhoud flex w-max gap-8 whitespace-nowrap text-lg font-extrabold uppercase tracking-wider">
        {rij.map((woord, i) => (
          <span key={`${woord}-${i}`} className="flex items-center gap-8">
            {woord}
            <span className="text-2xl leading-none">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const stickerKleuren = {
  zon: 'bg-zon-400 text-inkt',
  vlam: 'bg-vlam-400 text-inkt',
  zee: 'bg-zee-400 text-inkt',
  wit: 'bg-white text-inkt',
};

/** Schuin geplakt labeltje. */
export function Sticker({
  children,
  kleur = 'zon',
  hoek = '-rotate-3',
  className = '',
}: {
  children: ReactNode;
  kleur?: keyof typeof stickerKleuren;
  hoek?: string;
  className?: string;
}) {
  return (
    <span
      className={`kantel inline-flex items-center rounded-lg px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide shadow-lg ${stickerKleuren[kleur]} ${hoek} ${className}`}
    >
      {children}
    </span>
  );
}

/** Ronde sticker, voor een prijs of een belofte. */
export function RondeSticker({
  boven,
  midden,
  onder,
  className = '',
}: {
  boven?: string;
  midden: string;
  onder?: string;
  className?: string;
}) {
  return (
    <span
      className={`kantel zweef flex h-28 w-28 rotate-12 flex-col items-center justify-center rounded-full bg-zon-400 text-center text-inkt shadow-xl ${className}`}
    >
      {boven && <span className="text-[11px] font-bold uppercase leading-tight">{boven}</span>}
      <span className="text-2xl font-black leading-none">{midden}</span>
      {onder && <span className="text-[11px] font-bold uppercase leading-tight">{onder}</span>}
    </span>
  );
}

const knopStijlen = {
  primair: 'bg-vlam-400 text-inkt hover:bg-vlam-500 shadow-lg shadow-vlam-600/25',
  secundair: 'border-2 border-zee-600 text-zee-700 hover:bg-zee-50',
  wit: 'bg-white text-vlam-700 hover:bg-vlam-50 shadow-lg',
  zon: 'bg-zon-400 text-inkt hover:bg-zon-300 shadow-lg',
  lijn: 'border-2 border-white/60 text-white hover:border-white hover:bg-white/10',
};

export function Knop({
  href,
  children,
  variant = 'primair',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof knopStijlen;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-base font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5 ${knopStijlen[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

const kopKleuren = {
  zee: 'bg-zee-400 text-inkt',
  vlam: 'bg-vlam-400 text-inkt',
  zon: 'bg-zon-300 text-inkt',
  inkt: 'bg-inkt text-white',
};

/** Gekleurde paginakop met schuine polaroid. */
export function PaginaKop({
  titel,
  intro,
  kleur = 'zee',
  foto,
  label,
  knop,
}: {
  titel: ReactNode;
  intro?: ReactNode;
  kleur?: keyof typeof kopKleuren;
  foto?: FotoType;
  label?: string;
  knop?: { href: string; tekst: string };
}) {
  const donker = kleur === 'inkt';
  return (
    <section className={`relative overflow-hidden ${kopKleuren[kleur]} ${donker ? 'op-donker' : ''}`}>
      <div aria-hidden="true" className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/20 blur-2xl" />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-vlam-500/30 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-5">
        <div className={foto ? 'md:col-span-3' : 'md:col-span-5'}>
          {label && (
            <Sticker kleur={donker ? 'zon' : 'wit'} className="mb-4">
              {label}
            </Sticker>
          )}
          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">{titel}</h1>
          {intro && (
            <div className={`mt-5 max-w-2xl text-lg ${donker ? 'text-white/90' : 'text-inkt'}`}>{intro}</div>
          )}
          {knop && (
            <div className="mt-6">
              <Knop href={knop.href} variant={donker ? 'zon' : kleur === 'vlam' ? 'wit' : 'primair'}>
                {knop.tekst}
              </Knop>
            </div>
          )}
        </div>
        {foto && (
          <Foto
            foto={foto}
            verhouding="aspect-[4/3] md:col-span-2 rotate-2"
            sizes="(min-width: 768px) 40vw, 100vw"
            className="kantel polaroid rounded-sm"
            prioriteit
          />
        )}
      </div>
    </section>
  );
}

/** Donker afsluitblok met foto en boekknop. */
export function BoekBlok({
  titel = 'Klaar voor een dagje Utrecht?',
  tekst = 'Kies een pakket of stel zelf jullie dag samen. Je ziet meteen wat het kost.',
  foto = fotos.kanoBrug,
}: {
  titel?: string;
  tekst?: string;
  foto?: FotoType;
}) {
  return (
    <section className="op-donker relative isolate overflow-hidden bg-inkt text-white">
      <Foto foto={foto} verhouding="absolute inset-0 h-full w-full" sizes="100vw" className="opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-inkt via-inkt/90 to-transparent" />
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-vlam-500/40 blur-3xl" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">{titel}</h2>
          <p className="mt-3 max-w-xl text-lg text-zee-100">{tekst}</p>
        </div>
        <Knop href="/boeken" variant="zon" className="shrink-0 text-lg">
          Stel je dag samen
        </Knop>
      </div>
    </section>
  );
}

export const HOEKEN = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1'];

/**
 * Ingang voor de Engelse en Duitse site. Combineert de vaste gegevens uit
 * aanbod.ts (prijzen, tijden, aantallen) met de vertaalde woorden.
 * Alleen voor servercode: het boekformulier krijgt wat het nodig heeft als props.
 */
import {
  BOUWSTENEN,
  PAKKETTEN,
  TIJDVAKKEN,
  controleerKeuze,
  type Bouwsteen,
  type Keuze,
  type Maanden,
  type Pakket,
} from '../aanbod';
import { SLUGS, type Vertaald } from '../talen';
import { AANBOD_DE } from './aanbod-de';
import { AANBOD_EN } from './aanbod-en';
import { LANDINGS_DE } from './landings-de';
import { LANDINGS_EN, type VertaaldeLanding } from './landings-en';
import { maandenIn } from './opmaak';
import type {
  AanbodTekst,
  BouwsteenTekst,
  FormulierNamen,
  LandingTekst,
  PakketTekst,
} from './types';
import { UI_DE } from './ui-de';
import { UI_EN, type UiTekst } from './ui-en';
import { foutTekstMet } from './fouten';

export type { VertaaldeLanding };
export { foutTekstMet };

const UI: Record<Vertaald, UiTekst> = { en: UI_EN, de: UI_DE };
const AANBOD: Record<Vertaald, AanbodTekst> = { en: AANBOD_EN, de: AANBOD_DE };
const LANDINGS: Record<Vertaald, Record<VertaaldeLanding, LandingTekst>> = {
  en: LANDINGS_EN,
  de: LANDINGS_DE,
};

export const VERTAALDE_LANDINGS: VertaaldeLanding[] = [
  'bedrijfsuitje',
  'teambuilding',
  'personeelsuitje',
  'vrijgezellenfeest',
  'familiedag',
];

export function ui(taal: Vertaald) {
  return UI[taal];
}

export function aanbodTekst(taal: Vertaald) {
  return AANBOD[taal];
}

export function landingTekst(taal: Vertaald, sleutel: VertaaldeLanding) {
  return LANDINGS[taal][sleutel];
}

export type VertaaldeBouwsteen = Bouwsteen & { tekst: BouwsteenTekst };
export type VertaaldPakket = Pakket & { tekst: PakketTekst };

/** Een bouwsteen met zijn vertaalde teksten, of null als die (nog) niet vertaald is. */
export function bouwsteenIn(
  taal: Vertaald,
  b: Bouwsteen | null | undefined,
): VertaaldeBouwsteen | null {
  if (!b || !SLUGS.bouwsteen[b.slug]) return null;
  const tekst = AANBOD[taal].bouwstenen[b.slug];
  return tekst ? { ...b, tekst } : null;
}

export function pakketIn(taal: Vertaald, p: Pakket | null | undefined): VertaaldPakket | null {
  if (!p || !SLUGS.pakket[p.slug]) return null;
  const tekst = AANBOD[taal].pakketten[p.slug];
  return tekst ? { ...p, tekst } : null;
}

/** Alle vertaalde bouwstenen, in de volgorde van aanbod.ts. */
export function bouwstenenIn(taal: Vertaald) {
  return BOUWSTENEN.map((b) => bouwsteenIn(taal, b)).filter(
    (b): b is VertaaldeBouwsteen => b !== null,
  );
}

/** Pakketten in een gegeven volgorde, alleen de vertaalde. */
export function pakkettenIn(taal: Vertaald, lijst: Pakket[] = PAKKETTEN) {
  return lijst.map((p) => pakketIn(taal, p)).filter((p): p is VertaaldPakket => p !== null);
}

export function tijdvakNaam(taal: Vertaald, id: (typeof TIJDVAKKEN)[number]['id']) {
  return AANBOD[taal].tijdvakken[id];
}

/** Tijdvaknaam midden in een zin: Engels met kleine letter, Duits houdt de hoofdletter. */
export function tijdvakInZin(taal: Vertaald, id: (typeof TIJDVAKKEN)[number]['id']) {
  const naam = AANBOD[taal].tijdvakken[id];
  return taal === 'en' ? naam.toLowerCase() : naam;
}

/** Clusternaam zoals op de kaarten: de kickbike-tocht staat er als 'onderweg'. */
export function clusterLabel(taal: Vertaald, b: Bouwsteen) {
  return b.cluster === 'beide' ? AANBOD[taal].onderweg : AANBOD[taal].clusters[b.cluster].naam;
}

export function maandenTekstIn(taal: Vertaald, m: Maanden) {
  return maandenIn(AANBOD[taal].maanden, AANBOD[taal].maandenSjabloon, m);
}

/** Wat het boekformulier (client) nodig heeft aan namen, als gewone tekst. */
export function formulierNamen(taal: Vertaald): FormulierNamen {
  const a = AANBOD[taal];
  return {
    bouwstenen: Object.fromEntries(
      Object.entries(a.bouwstenen).map(([slug, b]) => [slug, { naam: b.naam, duur: b.duur }]),
    ),
    pakketten: Object.fromEntries(
      Object.entries(a.pakketten).map(([slug, p]) => [slug, { naam: p.naam, kort: p.kort }]),
    ),
    tijdvakken: a.tijdvakken,
    tijdvakKlein: taal === 'en',
    clusters: {
      centrum: a.clusters.centrum.naam,
      amelisweerd: a.clusters.amelisweerd.naam,
      beide: a.clusters.beide.naam,
    },
    onderweg: a.onderweg,
    maanden: a.maanden,
    maandenSjabloon: a.maandenSjabloon,
  };
}

/** Zoals controleer() in aanbod.ts, maar in het Engels of Duits. */
export function controleerIn(taal: Vertaald, keuze: Keuze): string[] {
  const t = UI[taal].formulier.fouten;
  const namen = formulierNamen(taal);
  return [...new Set(controleerKeuze(keuze).map((f) => foutTekstMet(t, namen, f)))];
}

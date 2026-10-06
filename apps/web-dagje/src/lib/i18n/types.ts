/**
 * Vormen van de Engelse en Duitse teksten.
 *
 * Alles wat met geld, aantallen, tijden en seizoenen te maken heeft komt uit
 * aanbod.ts en wordt hier nooit overgetypt: de vertaling levert alleen woorden.
 * Zo kan een prijs in het Engels of Duits nooit afwijken van het Nederlands.
 */
import type { Cluster, TijdvakId } from '../aanbod';
import type { Foto } from '../fotos';

export type Vraag = { q: string; a: string };

export type BouwsteenTekst = {
  naam: string;
  kort: string;
  beschrijving: string;
  locatie: string;
  duur: string;
  inclusief: string[];
  /** Zoekmachineteksten, zoals bouwsteen-seo.ts voor het Nederlands. */
  seo: {
    titel: string;
    beschrijving: string;
    tekst: string[];
    vragen: Vraag[];
    verwijzing?: { tekst: string; href: string; link: string };
  };
};

export type PakketTekst = {
  naam: string;
  kort: string;
  beschrijving: string;
  voorWie: string;
};

export type AanbodTekst = {
  tijdvakken: Record<TijdvakId, string>;
  clusters: Record<Cluster, { naam: string; uitleg: string }>;
  /** Label voor de kickbike-tocht, die tussen de twee clusters in zit. */
  onderweg: string;
  /** Maandnamen, januari eerst. */
  maanden: string[];
  /** "april tot en met oktober" in de eigen taal, met {van} en {tot}. */
  maandenSjabloon: string;
  bouwstenen: Record<string, BouwsteenTekst>;
  pakketten: Record<string, PakketTekst>;
};

/** Een gelegenheidspagina (bedrijfsuitje, teambuilding enz.) in een andere taal. */
export type LandingTekst = {
  metaTitel: string;
  metaOmschrijving: string;
  boven: string;
  titel: string;
  intro: string;
  alineas: Array<{ kop: string; tekst: string }>;
  faq: Vraag[];
  band: string[];
  /** Korte naam voor links tussen de gelegenheidspagina's. */
  link: string;
  /** Verwijzing naar de (Nederlandstalige) zusterpagina op Stepverhuur Utrecht. */
  zuster?: { href: string; label: string; tekst: string };
};

/**
 * Teksten van het boekformulier. Het formulier is een client-component, dus dit
 * moet gewone tekst zijn (geen functies): {naam} en dergelijke worden ingevuld
 * met vul() uit lib/i18n/vul.ts.
 */
export type FormulierTekst = {
  groepen: Record<'TEAM' | 'SCHOOL' | 'STUDENT' | 'BACHELORETTE' | 'FAMILY', string>;
  stap1Kop: string;
  /** {dagen} {min} */
  stap1Uitleg: string;
  datum: string;
  personen: string;
  stap2Kop: string;
  stap2Uitleg: string;
  dezeWinter: string;
  dezeZomer: string;
  vanafApril: string;
  vanafNovember: string;
  pp: string;
  stap3Kop: string;
  stap3Uitleg: string;
  tot: string;
  nietsInTijdvak: string;
  jullieDag: string;
  perPersoon: string;
  /** {n} */
  totaal: string;
  totaalZonder: string;
  inclusiefBtw: string;
  soortGroep: string;
  naam: string;
  email: string;
  telefoon: string;
  bedrijf: string;
  opmerking: string;
  versturen: string;
  bezig: string;
  kleineletters: string;
  foutVersturen: string;
  bedanktKop: string;
  /** {code} */
  bedanktNummer: string;
  bedanktTekst: string;
  /** Fouten bij de keuze, op code; zie KeuzeFout in aanbod.ts. */
  fouten: {
    'geen-datum': string;
    'verkeerde-dag': string;
    /** {dagen} */
    'te-kort-vooruit': string;
    /** {min} {max} */
    aantal: string;
    /** {tijdvak} */
    'onbekend-onderdeel': string;
    'geen-activiteit': string;
    /** {blok} {tijdvak} */
    'verkeerd-tijdvak': string;
    /** {blok} {min} {max} */
    'aantal-blok': string;
    /** {blok} {maanden} */
    seizoen: string;
    /** {van} {naar} */
    'kickbike-nodig': string;
    'te-veel-wissels': string;
  };
  /** Meldingen bij de velden, als de server ze afkeurt. */
  veldFouten: { naam: string; email: string; telefoon: string; algemeen: string };
};

/** Namen uit het aanbod die het boekformulier nodig heeft, als gewone tekst. */
export type FormulierNamen = {
  bouwstenen: Record<string, { naam: string; duur: string }>;
  pakketten: Record<string, { naam: string; kort: string }>;
  tijdvakken: Record<TijdvakId, string>;
  /** Tijdvaknamen midden in een zin met kleine letter (Engels), of zoals ze zijn (Duits: zelfstandige naamwoorden). */
  tijdvakKlein: boolean;
  clusters: Record<Cluster, string>;
  onderweg: string;
  maanden: string[];
  /** Sjabloon met {van} en {tot}, bijvoorbeeld "{van} to {tot}". */
  maandenSjabloon: string;
};

export type { Foto };

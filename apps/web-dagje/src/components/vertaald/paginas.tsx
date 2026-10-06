import type { Metadata } from 'next';
import { fotoIn } from '../../lib/i18n/foto-alt';
import Link from 'next/link';
import { BOUWSTENEN, PAKKETTEN } from '../../lib/aanbod';
import { fotos } from '../../lib/fotos';
import { VERTAALDE_LANDINGS, formulierNamen, landingTekst, ui } from '../../lib/i18n';
import { PADEN, paginaAlternates, type Vertaald } from '../../lib/talen';
import { BoekenFormulier } from '../boeken-formulier';
import { Breadcrumbs } from '../seo-jsonld';
import { PaginaKop } from '../ui';
import { vertaaldeMeta } from './meta';

/** Kleinere Engelse en Duitse pagina's: contact, over ons, voorwaarden, privacy, boeken, betaald, 404. */

const h2 = 'text-2xl font-black uppercase tracking-tight text-inkt mt-8 mb-3';

// ============== Contact ==============

export function contactMetadata(taal: Vertaald): Metadata {
  const t = ui(taal).contact;
  return vertaaldeMeta(taal, {
    titel: t.metaTitel,
    omschrijving: t.metaOmschrijving,
    alternates: paginaAlternates(taal, 'contact'),
  });
}

export function Contact({ taal }: { taal: Vertaald }) {
  const t = ui(taal).contact;
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-6">{t.titel}</h1>
      <p className="text-inkt mb-8">
        {t.voor}{' '}
        <Link href={PADEN.boeken[taal]} className="text-vlam-700 underline">
          {t.link}
        </Link>
        {t.na}
      </p>
      <div className="rounded-2xl border border-inkt/10 bg-zee-50 p-6 text-inkt space-y-2">
        <p>
          <strong>DagjeUtrecht</strong>
        </p>
        <p>Ger</p>
        <p>
          <a href="mailto:info@dagjeutrecht.nl" className="text-vlam-700 underline">
            info@dagjeutrecht.nl
          </a>
        </p>
        <p>
          <a href="tel:+31302271439" className="text-vlam-700 underline">
            {t.telefoon}
          </a>
        </p>
      </div>
      <p className="text-inkt mt-6">{t.taal}</p>
      <p className="text-xs text-grijs mt-3">{t.handelsnaam}</p>
    </main>
  );
}

// ============== Over ons ==============

export function overOnsMetadata(taal: Vertaald): Metadata {
  const t = ui(taal).overOns;
  const meta = vertaaldeMeta(taal, {
    titel: t.metaTitel,
    omschrijving: t.metaOmschrijving,
    alternates: paginaAlternates(taal, 'overOns'),
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      title: t.ogTitel,
      description: t.ogOmschrijving,
      images: [{ url: '/og-image.png', width: 1200, height: 600, alt: t.ogAlt }],
    },
  };
}

export function OverOns({ taal }: { taal: Vertaald }) {
  const t = ui(taal).overOns;
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 prose">
      <Breadcrumbs
        trail={[
          { name: ui(taal).landing.kruimelHome, url: PADEN.home[taal] },
          { name: t.kruimel, url: PADEN.overOns[taal] },
        ]}
      />
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-6">{t.titel}</h1>
      <p>{t.p1}</p>
      <p>{t.p2}</p>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">{t.waaromKop}</h2>
      <p>{t.waarom}</p>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">{t.partnersKop}</h2>
      <p>{t.partners(BOUWSTENEN.length)}</p>
      <ul>
        {t.partnerLijst.map((p) => (
          <li key={p.naam}>
            <strong>{p.naam}</strong>: {p.wat}
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">{t.werkenKop}</h2>
      <p>{t.werken(PAKKETTEN.length)}</p>
      <p>
        {t.maatwerk}{' '}
        <Link href={PADEN.pakketten[taal]} className="text-vlam-700 underline">
          {t.bekijkPakketten}
        </Link>{' '}
        {t.of}{' '}
        <Link href={PADEN.bouwstenen[taal]} className="text-vlam-700 underline">
          {t.alleOnderdelen}
        </Link>
        .
      </p>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">{t.voorWieKop}</h2>
      <ul>
        {VERTAALDE_LANDINGS.map((s) => (
          <li key={s}>
            <Link href={PADEN[s][taal]} className="text-vlam-700 underline">
              {landingTekst(taal, s).link} {t.inUtrecht}
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">{t.contactKop}</h2>
      <ul>
        <li>
          <a href="mailto:info@dagjeutrecht.nl" className="text-vlam-700 underline">
            info@dagjeutrecht.nl
          </a>
        </li>
        <li>
          <a href="tel:+31302271439" className="text-vlam-700 underline">
            {t.telefoon}
          </a>
        </li>
      </ul>
      <h2 className="text-2xl font-black uppercase tracking-tight mt-8">{t.bedrijfKop}</h2>
      <ul>
        <li>Traxeo</li>
        <li>{t.kvk}</li>
        <li>Utrecht</li>
      </ul>
    </main>
  );
}

// ============== Voorwaarden ==============

export function voorwaardenMetadata(taal: Vertaald): Metadata {
  const t = ui(taal).voorwaarden;
  return vertaaldeMeta(taal, {
    titel: t.metaTitel,
    omschrijving: t.metaOmschrijving,
    alternates: paginaAlternates(taal, 'voorwaarden'),
  });
}

export function Voorwaarden({ taal }: { taal: Vertaald }) {
  const t = ui(taal).voorwaarden;
  const lijst = (items: string[]) => (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-inkt">
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-6">{t.titel}</h1>
      <p className="mb-4">{t.intro}</p>
      <h2 className={h2}>{t.boekenKop}</h2>
      {lijst(t.boeken)}
      <h2 className={h2}>{t.prijzenKop}</h2>
      {lijst(t.prijzen)}
      <h2 className={h2}>{t.wijzigenKop}</h2>
      {lijst(t.wijzigen)}
      <h2 className={h2}>{t.annulerenKop}</h2>
      <p>{t.annuleren}</p>
      <h2 className={h2}>{t.dagKop}</h2>
      <p>{t.dag}</p>
    </main>
  );
}

// ============== Privacy ==============

export function privacyMetadata(taal: Vertaald): Metadata {
  const t = ui(taal).privacy;
  return vertaaldeMeta(taal, {
    titel: t.metaTitel,
    omschrijving: t.metaOmschrijving,
    alternates: paginaAlternates(taal, 'privacy'),
  });
}

export function Privacy({ taal }: { taal: Vertaald }) {
  const t = ui(taal).privacy;
  const lijst = (items: string[]) => (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-inkt">
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-6">{t.titel}</h1>
      <p className="mb-4">{t.intro}</p>
      <h2 className={h2}>{t.verzamelenKop}</h2>
      {lijst(t.verzamelen)}
      <h2 className={h2}>{t.gebruikKop}</h2>
      {lijst(t.gebruik)}
      <h2 className={h2}>{t.delenKop}</h2>
      <p>{t.delen}</p>
      <h2 className={h2}>{t.bewarenKop}</h2>
      <p>{t.bewaren}</p>
      <h2 className={h2}>{t.contactKop}</h2>
      <p>
        {t.contact}{' '}
        <a href="mailto:info@dagjeutrecht.nl" className="text-vlam-700 underline">
          info@dagjeutrecht.nl
        </a>
        .
      </p>
    </main>
  );
}

// ============== Boeken ==============

export function boekenMetadata(taal: Vertaald): Metadata {
  const t = ui(taal).boeken;
  return vertaaldeMeta(taal, {
    titel: t.metaTitel,
    omschrijving: t.metaOmschrijving,
    alternates: paginaAlternates(taal, 'boeken'),
    index: false,
  });
}

export function Boeken({ taal, pakket }: { taal: Vertaald; pakket?: string }) {
  const t = ui(taal).boeken;
  return (
    <>
      <PaginaKop
        titel={t.titel}
        intro={t.intro}
        kleur="zon"
        foto={fotoIn(taal, fotos.kickbikePoort)}
        label={t.label}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <BoekenFormulier
          startPakket={pakket}
          taal={taal}
          tekst={ui(taal).formulier}
          namen={formulierNamen(taal)}
        />
      </div>
    </>
  );
}

// ============== Betaald ==============

export function betaaldMetadata(taal: Vertaald): Metadata {
  return { title: ui(taal).betaald.metaTitel, robots: { index: false, follow: false } };
}

export function Betaald({ taal, code: ruw }: { taal: Vertaald; code?: string }) {
  const t = ui(taal).betaald;
  const code = (ruw || '').replace(/[^A-Z0-9]/gi, '').slice(0, 12);
  return (
    <main className="max-w-xl mx-auto px-6 py-20 text-inkt">
      <h1 className="text-5xl font-black uppercase tracking-tight text-inkt mb-4">{t.titel}</h1>
      <p className="mb-3">{t.tekst(code)}</p>
      <p className="mb-8">{t.dagErvoor}</p>
      <Link href={PADEN.home[taal]} className="text-vlam-700 underline">
        {t.terug}
      </Link>
    </main>
  );
}

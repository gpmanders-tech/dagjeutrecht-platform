import '@utrecht/ui/styles';
import '../../app/site.css';
import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import { SiteHeader, type KopTekst } from '../site-header';
import { SiteFooter, type VoetTekst } from '../site-footer';
import { landingTekst, ui, VERTAALDE_LANDINGS } from '../../lib/i18n';
import { PADEN, TAAL_INFO, type Vertaald } from '../../lib/talen';

/**
 * Gedeelde layout van de Engelse en de Duitse site (src/app/en en src/app/de).
 * Zelfde opbouw als de Nederlandse layout in src/app/(nl), maar met lang="en" of
 * lang="de" en de kop, voet en metadata in die taal.
 */

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
});

const SITE_URL = 'https://dagjeutrecht.nl';

export function vertaaldeLayoutMetadata(taal: Vertaald): Metadata {
  const t = ui(taal).layout;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.titel, template: '%s | DagjeUtrecht' },
    description: t.omschrijving,
    authors: [{ name: 'DagjeUtrecht', url: SITE_URL }],
    creator: 'Traxeo',
    publisher: 'DagjeUtrecht',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: TAAL_INFO[taal].og,
      url: `${SITE_URL}${PADEN.home[taal]}`,
      siteName: 'DagjeUtrecht',
      title: t.ogTitel,
      description: t.ogOmschrijving,
      images: [{ url: '/og-image.png', width: 1200, height: 600, alt: t.ogAlt }],
    },
    twitter: { card: 'summary_large_image', title: t.ogTitel, description: t.ogOmschrijving },
    // Geen canonical hier: die staat per pagina (zie de Nederlandse layout).
    category: 'travel',
    formatDetection: { email: true, telephone: true, address: true },
  };
}

function jsonLd(taal: Vertaald) {
  const t = ui(taal).layout;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'TravelAgency'],
        '@id': `${SITE_URL}#organization`,
        name: 'DagjeUtrecht',
        alternateName: 'DagjeUtrecht.nl',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og-image.png`,
        email: 'info@dagjeutrecht.nl',
        telephone: '+31302271439',
        priceRange: '€€',
        description: t.orgOmschrijving,
        address: { '@type': 'PostalAddress', addressLocality: 'Utrecht', addressCountry: 'NL' },
        areaServed: { '@type': 'City', name: 'Utrecht' },
        sameAs: ['https://www.google.com/maps?cid=9905427139979114669'],
        parentOrganization: { '@type': 'Organization', name: 'Traxeo', identifier: 'KvK 63330393' },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}${PADEN.home[taal]}#website`,
        url: `${SITE_URL}${PADEN.home[taal]}`,
        name: 'DagjeUtrecht',
        description: t.siteOmschrijving,
        publisher: { '@id': `${SITE_URL}#organization` },
        inLanguage: TAAL_INFO[taal].schema,
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}${PADEN.home[taal]}#service`,
        name: t.dienst,
        provider: { '@id': `${SITE_URL}#organization` },
        areaServed: { '@type': 'City', name: 'Utrecht' },
        audience: { '@type': 'Audience', audienceType: t.publiek },
      },
    ],
  };
}

export function kopTekst(taal: Vertaald): KopTekst {
  const k = ui(taal).kop;
  return {
    home: PADEN.home[taal],
    nav: k.nav.map((n) => ({ href: PADEN[n.sleutel as keyof typeof PADEN][taal], label: n.label })),
    boeken: PADEN.boeken[taal],
    aanvragen: k.aanvragen,
    logoLabel: k.logoLabel,
    hoofdmenu: k.hoofdmenu,
    hoofdmenuMobiel: k.hoofdmenuMobiel,
    menuOpen: k.menuOpen,
    menuDicht: k.menuDicht,
    taal: k.taal,
  };
}

export function voetTekst(taal: Vertaald): VoetTekst {
  const v = ui(taal).voet;
  return {
    tagline: v.tagline,
    knop: { href: PADEN.boeken[taal], label: v.knop },
    steps: { voor: v.steps, na: v.stepsNa },
    contactKop: v.contact,
    telefoon: v.telefoon,
    kvk: v.kvk,
    paginasKop: v.paginas,
    links: v.links.map((l) => ({
      href: PADEN[l.sleutel as keyof typeof PADEN][taal],
      label: l.label,
    })),
    voorWieKop: v.voorWie,
    voorWie: VERTAALDE_LANDINGS.map((s) => ({
      href: PADEN[s][taal],
      label: landingTekst(taal, s).link,
    })),
    onder: { handelsnaam: v.handelsnaam, kaart: v.kaart, osm: v.osm },
  };
}

const GSC_TAG = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const BING_TAG = process.env.NEXT_PUBLIC_BING_VERIFICATION;

export function VertaaldeLayout({ taal, children }: { taal: Vertaald; children: React.ReactNode }) {
  return (
    <html lang={taal} className={`${inter.variable} ${playfair.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {GSC_TAG && <meta name="google-site-verification" content={GSC_TAG} />}
        {BING_TAG && <meta name="msvalidate.01" content={BING_TAG} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(taal)) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-inkt">
        <SiteHeader tekst={kopTekst(taal)} />
        <div id="inhoud" className="flex-1">
          {children}
        </div>
        <SiteFooter tekst={voetTekst(taal)} />
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`,
              }}
            />
          </>
        )}
        {/* Dommie, de chatbot van de Customer Service Agent, zoals op de Nederlandse site */}
        <Script
          src="https://klantenservice-chi.vercel.app/widget.js"
          data-project="DAG"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

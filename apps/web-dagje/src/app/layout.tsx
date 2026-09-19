import '@utrecht/ui/styles';
import './site.css';
import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'], variable: '--font-playfair', display: 'swap' });

const SITE_URL = 'https://dagjeutrecht.nl';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DagjeUtrecht: dagje uit in Utrecht voor groepen',
    template: '%s | DagjeUtrecht',
  },
  description:
    'Vaste dagpakketten in Utrecht voor bedrijven, scholen en vriendengroepen: jeu de boules, kanoën, kickbike, rondvaart en borrel. Vaste prijs per persoon.',
  keywords: [
    'dagje Utrecht',
    'dagje uit Utrecht',
    'bedrijfsuitje Utrecht',
    'teamuitje Utrecht',
    'personeelsuitje Utrecht',
    'schoolreis Utrecht',
    'schoolreisje Utrecht',
    'vrijgezellenfeest Utrecht',
    'studentenuitje Utrecht',
    'familiedag Utrecht',
    'gezinsuitje Utrecht',
    'groepsactiviteit Utrecht',
    'programma Utrecht',
    'activiteiten Utrecht',
    'uitje Utrecht',
    'jeu de boules Utrecht',
    'kickbike Utrecht',
    'Amelisweerd',
    'SUP Utrecht',
    'kanoën Utrecht',
    'rondvaart Utrecht',
    'Domtoren',
    'DagjeUtrecht',
  ],
  authors: [{ name: 'Ger Manders', url: SITE_URL }],
  creator: 'Handelsonderneming Manders',
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
    locale: 'nl_NL',
    url: SITE_URL,
    siteName: 'DagjeUtrecht',
    title: 'Dagje Utrecht voor groepen, met vaste pakketten',
    description:
      'Jeu de boules, kanoën, kickbike, rondvaart en borrel. Kies een pakket of stel zelf samen, met een vaste prijs per persoon.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 600,
        alt: 'DagjeUtrecht - dagprogramma\'s in Utrecht',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dagje Utrecht voor groepen',
    description:
      'Jeu de boules, kanoën, kickbike, rondvaart en borrel met een vaste prijs per persoon.',
  },
  // Geen canonical hier: die is per pagina gezet. Een canonical in de root layout
  // erft naar alle pagina's en laat ze allemaal naar de homepage wijzen.
  category: 'travel',
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
};

const jsonLd = {
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
      priceRange: '\u20AC\u20AC',
      description:
        'DagjeUtrecht verzorgt vaste dagpakketten in Utrecht voor bedrijven, scholen en vriendengroepen.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Utrecht',
        addressCountry: 'NL',
      },
      areaServed: {
        '@type': 'City',
        name: 'Utrecht',
      },
      sameAs: [],
      parentOrganization: {
        '@type': 'Organization',
        name: 'Handelsonderneming Manders',
        identifier: 'KvK 63330393',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: 'DagjeUtrecht',
      description: 'Dagpakketten in Utrecht met een vaste prijs per persoon.',
      publisher: { '@id': `${SITE_URL}#organization` },
      inLanguage: 'nl-NL',
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#service`,
      name: 'Dagprogramma\'s Utrecht op maat',
      provider: { '@id': `${SITE_URL}#organization` },
      areaServed: { '@type': 'City', name: 'Utrecht' },
      audience: {
        '@type': 'Audience',
        audienceType: 'Bedrijven, scholen, verenigingen, gezinnen, vrijgezellenfeesten',
      },
    },
  ],
};

const GSC_TAG = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const BING_TAG = process.env.NEXT_PUBLIC_BING_VERIFICATION;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {GSC_TAG && <meta name="google-site-verification" content={GSC_TAG} />}
        {BING_TAG && <meta name="msvalidate.01" content={BING_TAG} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`,
              }}
            />
          </>
        )}
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-inkt">
        <SiteHeader />
        <div id="inhoud" className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

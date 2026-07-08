import '@utrecht/ui/styles';
import type { Metadata } from 'next';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { ChatWidget } from '../components/chat-widget';

const SITE_URL = 'https://dagjeutrecht.nl';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DagjeUtrecht - Stel je dag Utrecht zelf samen | Bedrijfsuitjes, groepen & meer',
    template: '%s | DagjeUtrecht',
  },
  description:
    'Het complete platform voor een dag Utrecht: teamuitjes, studentenclubjes, schoolgroepen, gezinnen en vrijgezellenfeesten. 150+ getoetste leveranciers, AI-gids en offerte binnen 48u.',
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
    'workshops Utrecht',
    'SUP Utrecht',
    'kanoën Utrecht',
    'rondvaart Utrecht',
    'Domtoren',
    'Kasteel de Haar',
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
    title: 'Dagje Utrecht voor elke groep - stel je dag zelf samen',
    description:
      'Kant-en-klare dagprogramma\'s of maak je eigen: activiteiten, lunch en borrels bij 150+ Utrechtse leveranciers. Één aanspreekpunt, offerte binnen 48u.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DagjeUtrecht - dagprogramma\'s in Utrecht',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dagje Utrecht voor elke groep',
    description:
      'Teamuitje, studentenclubje, schoolreis of vrijgezellenfeest - stel zelf samen bij 150+ Utrechtse leveranciers.',
  },
  alternates: {
    canonical: SITE_URL,
  },
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
      image: `${SITE_URL}/og-image.jpg`,
      email: 'info@dagjeutrecht.nl',
      telephone: '+31302271439',
      priceRange: '\u20AC\u20AC',
      description:
        'DagjeUtrecht organiseert dagprogramma\'s in Utrecht voor teamuitjes, studentenclubjes, schoolgroepen, gezinnen en vrijgezellenfeesten. Ruim 150 getoetste leveranciers.',
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
      description: 'Stel je eigen dag Utrecht samen - activiteiten, lunch en borrels bij 150+ Utrechtse leveranciers.',
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
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        lowPrice: 25,
        highPrice: 250,
        offerCount: 150,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-canal-900 flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <ChatWidget />
      </body>
    </html>
  );
}

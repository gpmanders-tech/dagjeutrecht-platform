import '@utrecht/ui/styles';
import type { Metadata } from 'next';
import { SEITEN, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Gruppenreise Utrecht: Incoming-Partner für Reiseveranstalter',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Utrecht Incoming ist Ihr Partner für Gruppenreisen und Busreisen nach Utrecht: Gruppenprogramme, Partnertarife, mehrsprachige Vouchers und eine Sammelrechnung.',
  applicationName: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: 'Gruppenreise Utrecht mit Utrecht Incoming',
    description:
      'Gruppenprogramme, Partnertarife und mehrsprachige Vouchers für Reiseveranstalter, Busunternehmen und Schulreise-Spezialisten.',
  },
  twitter: { card: 'summary_large_image' },
  // Keine Canonical hier: jede Seite setzt ihre eigene. Eine Canonical im Root-Layout
  // würde auf alle Seiten vererbt und sie alle auf die Startseite zeigen lassen.
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'TravelAgency'],
      '@id': `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description:
        'B2B-Incoming-Partner für Gruppenreisen nach Utrecht: Gruppenprogramme, Partnertarife, mehrsprachige Vouchers und Sammelrechnung für Reiseveranstalter.',
      areaServed: { '@type': 'City', name: 'Utrecht' },
      knowsLanguage: ['de', 'nl'],
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Reiseveranstalter, Busunternehmen, DMC und Schulreise-Spezialisten',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'de-DE',
      publisher: { '@id': `${SITE_URL}#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-incoming-navy text-white">
        {children}
        <footer className="border-t border-white/10 bg-incoming-navy text-white/80">
          <div className="max-w-5xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-incoming-orange uppercase tracking-wide text-sm">{SITE_NAME}</p>
              <p className="mt-2 text-sm max-w-sm">
                Ihr Incoming-Partner für Gruppenreisen nach Utrecht. Für Reiseveranstalter, DMC, Busunternehmen und
                Schulreise-Spezialisten.
              </p>
            </div>
            <nav aria-label="Footer">
              <ul className="grid gap-2 text-sm">
                {SEITEN.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} className="underline underline-offset-2 hover:text-white">
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/login" className="underline underline-offset-2 hover:text-white">
                    Partner-Login
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}

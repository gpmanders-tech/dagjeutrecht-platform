/** Adres van Utrecht Incoming: sinds 24-10-2026 op het eigen domein (UIN-02). */
export const SITE_URL = (process.env.NEXT_PUBLIC_INCOMING_URL || 'https://utrechtincoming.nl').replace(/\/$/, '');

export const SITE_NAME = 'Utrecht Incoming';

/** Öffentliche Seiten, in der Reihenfolge von Navigation, Footer und Sitemap. */
export const SEITEN = [
  { href: '/', label: 'Startseite' },
  { href: '/gruppenprogramme', label: 'Gruppenprogramme' },
  { href: '/busreise-utrecht', label: 'Busreisen nach Utrecht' },
  { href: '/anfrage', label: 'Gruppenanfrage' },
  { href: '/registrieren', label: 'Partner werden' },
];

/**
 * Adres waarop Utrecht Incoming nu echt draait.
 *
 * utrechtincoming.nl serveert nog de placeholder van Hostnet (UIN-02). Zolang dat zo is,
 * wijzen canonical, sitemap en structured data naar het Vercel-adres; anders sturen we
 * Google naar een pagina die niet van ons is. Staat het domein op Vercel, zet dan
 * NEXT_PUBLIC_INCOMING_URL op https://utrechtincoming.nl (of pas de standaard hieronder aan).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_INCOMING_URL || 'https://dagjeutrecht-platform-web-incoming.vercel.app').replace(/\/$/, '');

export const SITE_NAME = 'Utrecht Incoming';

/** Öffentliche Seiten, in der Reihenfolge von Navigation, Footer und Sitemap. */
export const SEITEN = [
  { href: '/', label: 'Startseite' },
  { href: '/gruppenprogramme', label: 'Gruppenprogramme' },
  { href: '/busreise-utrecht', label: 'Busreisen nach Utrecht' },
  { href: '/registrieren', label: 'Partner werden' },
];

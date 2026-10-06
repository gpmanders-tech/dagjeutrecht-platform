import type { Metadata } from 'next';
import type { Foto } from '../../lib/fotos';
import { fotoIn } from '../../lib/i18n/foto-alt';
import { TAAL_INFO, VERTAALD, type Taal, type Vertaald } from '../../lib/talen';

/**
 * Metadata voor een Engelse of Duitse pagina: titel, omschrijving, canonical,
 * hreflang en Open Graph in de taal van de pagina.
 */
export function vertaaldeMeta(
  taal: Vertaald,
  m: {
    titel: string | { absolute: string };
    omschrijving: string;
    alternates: { canonical: string; languages?: Record<string, string> };
    foto?: Foto;
    index?: boolean;
  },
): Metadata {
  const titel = typeof m.titel === 'string' ? m.titel : m.titel.absolute;
  const beeld = m.foto
    ? [{ url: m.foto.src, alt: fotoIn(taal, m.foto).alt }]
    : [{ url: '/og-image.png', width: 1200, height: 600, alt: 'DagjeUtrecht' }];
  return {
    title: m.titel,
    description: m.omschrijving,
    alternates: m.alternates,
    ...(m.index === false ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: 'website',
      locale: TAAL_INFO[taal].og,
      alternateLocale: (['nl', ...VERTAALD] as Taal[])
        .filter((t) => t !== taal)
        .map((t) => TAAL_INFO[t].og),
      siteName: 'DagjeUtrecht',
      title: titel,
      description: m.omschrijving,
      url: m.alternates.canonical,
      images: beeld,
    },
    twitter: {
      card: 'summary_large_image',
      title: titel,
      description: m.omschrijving,
      images: [beeld[0]!.url],
    },
  };
}

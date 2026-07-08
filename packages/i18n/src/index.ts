export const LOCALES = ['nl', 'en', 'de', 'fr', 'es', 'it', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE_BY_DOMAIN = {
  utrechtnow: 'nl',
  dagjeutrecht: 'nl',
  nachtjeutrecht: 'nl',
  utrechtincoming: 'de',
} as const;

export const LOCALE_LABELS: Record<Locale, string> = {
  nl: 'Nederlands',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  nl: '🇳🇱',
  en: '🇬🇧',
  de: '🇩🇪',
  fr: '🇫🇷',
  es: '🇪🇸',
  it: '🇮🇹',
  pt: '🇵🇹',
};

export async function loadMessages(locale: Locale) {
  return (await import(`../messages/${locale}.json`)).default;
}

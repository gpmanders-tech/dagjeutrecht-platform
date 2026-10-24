import { getRequestConfig } from 'next-intl/server';
import { LOCALES, type Locale } from '@utrecht/i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = requested && LOCALES.includes(requested as Locale) ? (requested as Locale) : 'nl';
  return {
    locale,
    messages: (await import(`../../../packages/i18n/messages/${locale}.json`)).default,
  };
});

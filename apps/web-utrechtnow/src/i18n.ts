import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LOCALES, type Locale } from '@utrecht/i18n';

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale as Locale)) notFound();
  return {
    messages: (await import(`../../../packages/i18n/messages/${locale}.json`)).default,
  };
});

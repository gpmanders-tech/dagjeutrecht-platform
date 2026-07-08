import createMiddleware from 'next-intl/middleware';
import { LOCALES } from '@utrecht/i18n';

export default createMiddleware({
  locales: LOCALES as unknown as string[],
  defaultLocale: 'nl',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

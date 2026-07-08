import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { LOCALES, type Locale } from '@utrecht/i18n';
import '@utrecht/ui/styles';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ChatWidget } from '@/components/chat-widget';

export const metadata: Metadata = {
  title: { default: 'Utrecht Now', template: '%s · Utrecht Now' },
  description: 'Dé digitale VVV van Utrecht. Activiteiten, hotels, restaurants en events op één plek.',
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

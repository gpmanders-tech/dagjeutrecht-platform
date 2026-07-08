'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { LOCALE_FLAGS, LOCALES } from '@utrecht/i18n';
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { UtrechtNowLogo } from '@utrecht/ui';

export function SiteHeader() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-canal-100 bg-cream">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`}>
          <UtrechtNowLogo />
        </Link>
        <nav className="hidden md:flex gap-6 text-sm text-canal-800">
          <Link href={`/${locale}/aanbod?cat=activity`}>{t('activities')}</Link>
          <Link href={`/${locale}/aanbod?cat=hotel`}>{t('hotels')}</Link>
          <Link href={`/${locale}/aanbod?cat=restaurant`}>{t('restaurants')}</Link>
          <Link href={`/${locale}/aanbod?cat=event`}>{t('events')}</Link>
          <Link href={`/${locale}/shop`}>{t('shop')}</Link>
        </nav>
        <div className="relative">
          <button
            className="inline-flex items-center gap-1 text-sm text-canal-700 hover:text-canal-900"
            onClick={() => setOpen((o) => !o)}
          >
            <Globe className="h-4 w-4" /> {LOCALE_FLAGS[locale as keyof typeof LOCALE_FLAGS]}
          </button>
          {open && (
            <div className="absolute right-0 top-8 bg-white shadow-soft rounded-md border border-canal-100 p-2 z-10">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className="block px-3 py-1.5 text-sm hover:bg-canal/5 rounded"
                  onClick={() => setOpen(false)}
                >
                  {LOCALE_FLAGS[l]} {l.toUpperCase()}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

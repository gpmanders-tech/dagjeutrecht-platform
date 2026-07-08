import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export function SiteFooter() {
  const t = useTranslations('footer');
  const locale = useLocale();
  return (
    <footer className="bg-canal text-cream/90 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-serif text-2xl text-white">Utrecht Now</p>
          <p className="mt-2 opacity-80">Dé digitale VVV van Utrecht.</p>
        </div>
        <div>
          <p className="font-medium mb-2 text-white">{t('about')}</p>
          <ul className="space-y-1 opacity-80">
            <li><Link href={`/${locale}/over`}>{t('about')}</Link></li>
            <li><Link href={`/${locale}/contact`}>{t('contact')}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-2 text-white">Juridisch</p>
          <ul className="space-y-1 opacity-80">
            <li><Link href={`/${locale}/voorwaarden`}>{t('terms')}</Link></li>
            <li><Link href={`/${locale}/privacy`}>{t('privacy')}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-2 text-white">Domeinen</p>
          <ul className="space-y-1 opacity-80">
            <li><a href="https://dagjeutrecht.nl">DagjeUtrecht.nl</a></li>
            <li><a href="https://nachtjeutrecht.nl">NachtjeUtrecht.nl</a></li>
            <li><a href="https://utrechtincoming.nl">{t('partners')}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-canal-700 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Utrecht Platform
      </div>
    </footer>
  );
}

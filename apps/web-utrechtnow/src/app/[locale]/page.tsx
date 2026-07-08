import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button, UtrechtSkyline } from '@utrecht/ui';
import { CategoryGrid } from '@/components/category-grid';
import { PopularStrip } from '@/components/popular-strip';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      <section className="relative overflow-hidden bg-canal text-white">
        <UtrechtSkyline
          className="absolute inset-x-0 bottom-0 w-full h-[55%] text-white opacity-[0.12] pointer-events-none"
        />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <h1 className="font-serif text-5xl md:text-6xl mb-6 max-w-3xl">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-cream/90 max-w-2xl mb-8">
            {t('hero.subtitle')}
          </p>
          <Link href="/plan">
            <Button variant="accent" size="lg">
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl mb-8 text-canal-900">{t('categories')}</h2>
        <CategoryGrid />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl mb-8 text-canal-900">{t('popular')}</h2>
        <PopularStrip />
      </section>
    </>
  );
}

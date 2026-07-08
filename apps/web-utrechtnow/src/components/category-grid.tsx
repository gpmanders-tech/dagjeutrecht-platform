import Link from 'next/link';
import { useLocale } from 'next-intl';

const CATEGORIES = [
  { slug: 'activity', label: 'Activiteiten', emoji: '🎯' },
  { slug: 'water', label: 'Op het water', emoji: '🚣' },
  { slug: 'workshop', label: 'Workshops', emoji: '🎨' },
  { slug: 'hotel', label: 'Overnachten', emoji: '🛏️' },
  { slug: 'restaurant', label: 'Eten & drinken', emoji: '🍽️' },
  { slug: 'event', label: 'Events', emoji: '🎭' },
  { slug: 'wellness', label: 'Wellness', emoji: '🧖' },
  { slug: 'shop', label: 'Webshop', emoji: '🛍️' },
];

export function CategoryGrid() {
  const locale = useLocale();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/${locale}/aanbod?cat=${c.slug}`}
          className="bg-white border border-canal-100 hover:border-terracotta-400 transition-colors rounded-xl p-6 text-center shadow-soft"
        >
          <div className="text-4xl mb-2">{c.emoji}</div>
          <div className="text-canal-900 font-medium">{c.label}</div>
        </Link>
      ))}
    </div>
  );
}

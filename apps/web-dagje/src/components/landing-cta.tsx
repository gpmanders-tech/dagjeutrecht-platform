import Link from 'next/link';

export function LandingCTA({
  title,
  text,
  primaryLabel = 'Vraag vrijblijvend een offerte aan',
  href = '/samensteller',
  variant = 'terracotta',
}: {
  title: string;
  text: string;
  primaryLabel?: string;
  href?: string;
  variant?: 'terracotta' | 'canal';
}) {
  const bg = variant === 'canal' ? 'bg-canal-900 text-white' : 'bg-terracotta-500 text-white';
  const btn =
    variant === 'canal'
      ? 'bg-terracotta-500 hover:bg-terracotta-400 text-white'
      : 'bg-white text-terracotta-600 hover:bg-cream';
  return (
    <section className={`rounded-3xl ${bg} p-10 my-12`}>
      <h2 className="font-serif text-3xl md:text-4xl mb-3">{title}</h2>
      <p className="opacity-90 max-w-2xl mb-6">{text}</p>
      <Link
        href={href}
        className={`inline-flex items-center rounded-full px-6 py-3 font-medium shadow-lg ${btn}`}
      >
        {primaryLabel} →
      </Link>
    </section>
  );
}

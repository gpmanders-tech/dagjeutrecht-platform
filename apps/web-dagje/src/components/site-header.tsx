import Link from 'next/link';
import { UtrechtSkyline } from '@utrecht/ui';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-canal-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-end justify-between pb-2">
        <Link
          href="/"
          className="relative flex items-end font-serif text-2xl text-canal-900 px-4 pt-6 pb-2 h-full"
        >
          <UtrechtSkyline
            className="absolute inset-0 w-full h-full text-canal-800 opacity-[0.18] pointer-events-none"
            aria-hidden="true"
          />
          <span className="relative leading-none">
            <span className="text-terracotta-600">Dagje</span>Utrecht
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-canal-800 pb-1">
          <Link href="/samensteller" className="hover:text-terracotta-600">Stel samen</Link>
          <Link href="/programmas" className="hover:text-terracotta-600">Voorbeeldprogramma's</Link>
          <Link href="/aanbod" className="hover:text-terracotta-600">Activiteiten</Link>
          <Link href="/#doelgroepen" className="hover:text-terracotta-600">Voor wie</Link>
          <Link href="/blog" className="hover:text-terracotta-600">Inspiratie</Link>
          <Link href="/contact" className="hover:text-terracotta-600">Contact</Link>
        </nav>
        <Link
          href="/samensteller"
          className="rounded-full bg-terracotta-500 hover:bg-terracotta-400 text-white text-sm px-4 py-2 mb-1"
        >
          Plan mijn dag →
        </Link>
      </div>
    </header>
  );
}

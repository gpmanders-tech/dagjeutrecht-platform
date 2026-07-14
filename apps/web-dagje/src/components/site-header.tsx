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
        <nav className="hidden md:flex items-center gap-5 text-sm text-canal-800 pb-1">
          <div className="relative group">
            <button className="hover:text-terracotta-600 flex items-center gap-1">Voor wie ▾</button>
            <div className="absolute top-full left-0 mt-1 min-w-[220px] rounded-xl border border-canal-100 bg-white shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              <Link href="/bedrijfsuitje-utrecht" className="block px-4 py-2 hover:bg-cream rounded-t-xl">Bedrijfsuitje</Link>
              <Link href="/schooluitje-utrecht" className="block px-4 py-2 hover:bg-cream">Schooluitje</Link>
              <Link href="/vrijgezellenfeest-utrecht" className="block px-4 py-2 hover:bg-cream">Vrijgezellenfeest</Link>
              <Link href="/teambuilding-utrecht" className="block px-4 py-2 hover:bg-cream">Teambuilding</Link>
              <Link href="/#doelgroepen" className="block px-4 py-2 hover:bg-cream rounded-b-xl text-canal-500 border-t border-canal-100">Alle doelgroepen</Link>
            </div>
          </div>
          <Link href="/samensteller" className="hover:text-terracotta-600">Stel samen</Link>
          <Link href="/programmas" className="hover:text-terracotta-600">Voorbeeldprogramma's</Link>
          <Link href="/aanbod" className="hover:text-terracotta-600">Activiteiten</Link>
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

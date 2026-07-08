import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-canal-900 text-cream/80">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-8 text-sm">
        <div className="md:col-span-2">
          <p className="font-serif text-xl text-white">
            <span className="text-terracotta-400">Dagje</span>Utrecht
          </p>
          <p className="mt-3 max-w-sm">
            Dé plek voor georganiseerde dagen Utrecht - teamuitjes, studentengroepen, scholen,
            gezinnen en vrijgezellenfeesten. Handmatig ingekocht bij lokale leveranciers, één
            aanspreekpunt: Ger.
          </p>
          <p className="mt-4 text-xs text-cream/60">
            <a href="mailto:info@dagjeutrecht.nl" className="hover:text-white">info@dagjeutrecht.nl</a>
            {' · '}
            <a href="tel:+31302271439" className="hover:text-white">030 - 227 14 39</a>
          </p>
        </div>
        <div>
          <p className="text-white font-medium mb-3">Site</p>
          <ul className="space-y-2">
            <li><Link href="/samensteller" className="hover:text-white">Zelf samenstellen</Link></li>
            <li><Link href="/aanbod" className="hover:text-white">Alle activiteiten</Link></li>
            <li><Link href="/blog" className="hover:text-white">Inspiratie</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-medium mb-3">Zakelijk</p>
          <ul className="space-y-2">
            <li><Link href="/over-ons" className="hover:text-white">Over ons</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/voorwaarden" className="hover:text-white">Voorwaarden</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-cream/50 flex flex-wrap justify-between gap-2">
          <span>DagjeUtrecht is een handelsnaam van Handelsonderneming Manders</span>
          <span>KvK 63330393</span>
        </div>
      </div>
    </footer>
  );
}

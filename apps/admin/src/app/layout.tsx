import '@utrecht/ui/styles';
import Link from 'next/link';

export const metadata = {
  title: 'Utrecht Platform · Beheer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-cream">
        <div className="flex">
          <aside className="w-64 min-h-screen bg-canal text-cream p-6">
            <p className="font-serif text-xl mb-8">Beheer</p>
            <nav className="space-y-1 text-sm">
              <Nav href="/">Dashboard</Nav>
              <Nav href="/providers">Leveranciers</Nav>
              <Nav href="/enquiries">Aanvragen</Nav>
              <Nav href="/orders">Orders</Nav>
              <Nav href="/modifications">Wijzigingen</Nav>
              <Nav href="/mail-queue">Mail-queue</Nav>
              <Nav href="/partners">B2B-partners</Nav>
              <Nav href="/invoices">Facturen (WeFact)</Nav>
              <Nav href="/giftcards">Cadeaubonnen</Nav>
              <Nav href="/shop">Webshop voorraad</Nav>
              <Nav href="/content">Blog & FAQ</Nav>
              <Nav href="/reviews">Reviews</Nav>
              <Nav href="/settings">Instellingen</Nav>
            </nav>
          </aside>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

function Nav({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-3 py-2 rounded-md hover:bg-canal-700 text-cream/90 hover:text-white">
      {children}
    </Link>
  );
}

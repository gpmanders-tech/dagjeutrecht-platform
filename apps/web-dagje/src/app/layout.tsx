/**
 * Doorgeefluik. De echte layouts met <html> staan per taal: (nl)/layout.tsx voor de
 * Nederlandse site op de bestaande adressen, en en/layout.tsx en de/layout.tsx voor
 * de Engelse en Duitse site. Zo krijgt elke taal zijn eigen lang-attribuut zonder
 * middleware en blijven de Nederlandse pagina's statisch.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

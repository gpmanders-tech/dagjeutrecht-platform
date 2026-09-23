import { SITE_URL } from '@/lib/site';

/** JSON-LD in een script-tag; wordt tijdens SSR gerenderd. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Brotkrumen({ pfad }: { pfad: Array<{ name: string; url: string }> }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: pfad.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.name,
          item: `${SITE_URL}${p.url === '/' ? '' : p.url}`,
        })),
      }}
    />
  );
}

export type Frage = { q: string; a: string };

/** Häufige Fragen: sichtbar auf der Seite und als FAQPage-Daten. */
export function Fragen({ titel = 'Häufige Fragen', fragen }: { titel?: string; fragen: Frage[] }) {
  return (
    <section className="bg-cream text-canal-900 py-16">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: fragen.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-serif text-3xl mb-8">{titel}</h2>
        <div className="divide-y divide-canal-100 rounded-xl bg-white shadow-soft">
          {fragen.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg">{f.q}</h3>
                <span aria-hidden="true" className="text-incoming-orange text-2xl leading-none group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-canal-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Kopfzeile für die öffentlichen Inhaltsseiten. */
export function Kopf({ aktiv }: { aktiv?: string }) {
  const links = [
    { href: '/gruppenprogramme', label: 'Gruppenprogramme' },
    { href: '/busreise-utrecht', label: 'Busreisen' },
    { href: '/login', label: 'Login' },
  ];
  return (
    <header className="border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <a href="/" className="font-serif text-xl text-white">
          Utrecht <span className="text-incoming-orange">Incoming</span>
        </a>
        <nav aria-label="Hauptmenü">
          <ul className="flex flex-wrap gap-4 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={aktiv === l.href ? 'page' : undefined}
                  className="text-white/80 hover:text-white aria-[current=page]:text-incoming-orange"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/registrieren" className="rounded-md bg-incoming-orange px-3 py-1.5 font-medium text-white hover:opacity-90">
                Partner werden
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

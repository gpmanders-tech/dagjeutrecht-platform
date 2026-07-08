export const metadata = { title: 'Contact - DagjeUtrecht.nl' };

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-canal-900 mb-6">Contact</h1>
      <p className="text-canal-800 mb-8">
        De snelste manier om een dag samen te stellen is via onze{' '}
        <a href="/samensteller" className="text-terracotta-600 underline">
          samensteller
        </a>{' '}
        - dan komt je aanvraag direct bij Ger op de mat. Ook rechtstreeks contact kan:
      </p>
      <div className="rounded-2xl border border-canal-100 bg-cream/40 p-6 text-canal-800 space-y-2">
        <p>
          <strong>DagjeUtrecht</strong>
        </p>
        <p>Ger Manders</p>
        <p>
          <a href="mailto:info@dagjeutrecht.nl" className="text-terracotta-600 underline">
            info@dagjeutrecht.nl
          </a>
        </p>
        <p>
          <a href="tel:+31302271439" className="text-terracotta-600 underline">
            030 - 227 14 39
          </a>
        </p>
      </div>
      <p className="text-xs text-canal-500 mt-3">
        DagjeUtrecht is een handelsnaam van Handelsonderneming Manders - KvK 63330393.
      </p>
    </main>
  );
}

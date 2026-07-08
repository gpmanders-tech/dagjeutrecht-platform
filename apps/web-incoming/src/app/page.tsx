import { Button, UtrechtSkyline } from '@utrecht/ui';

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <UtrechtSkyline className="absolute inset-x-0 bottom-0 w-full h-[60%] text-white opacity-[0.08] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 py-24">
        <p className="text-incoming-orange mb-3 uppercase tracking-wide text-sm">Utrecht Incoming</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-6 max-w-3xl text-white">
          Ihr Partner für Gruppenreisen nach Utrecht.
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mb-8">
          Partnertarife, Gruppenkapazitäten, mehrsprachige Vouchers, Sammelrechnung pro Monat.
          Reiseveranstalter, DMC und Schulreise-Spezialisten willkommen.
        </p>
        <div className="flex gap-3">
          <a href="/de/registrieren">
            <Button variant="incoming" size="lg">Als Partner registrieren</Button>
          </a>
          <a href="/de/login">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Login
            </Button>
          </a>
        </div>
        </div>
      </section>

      <section className="bg-white text-canal-900 py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Feature title="Nettopreise" desc="Partnertarife für alle ~100 Anbieter in Utrecht." />
          <Feature title="Eine Plattform" desc="Aktivitäten, Hotels, Restaurants, Touren in einer Buchung." />
          <Feature title="Whitelabel-Vouchers" desc="Mit Ihrem Logo, in 7 Sprachen, als PDF." />
        </div>
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="font-serif text-2xl mb-2">{title}</h3>
      <p className="text-canal-600">{desc}</p>
    </div>
  );
}

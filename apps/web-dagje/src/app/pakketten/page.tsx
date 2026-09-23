import type { Metadata } from 'next';
import Link from 'next/link';
import { PAKKETTEN, REGELS, TIJDVAKKEN, formatEuro, pakkettenOpSeizoen, prijsPerPersoon } from '../../lib/aanbod';
import { LANDING_LIJST } from '../../lib/landings';
import { Breadcrumbs } from '../../components/seo-jsonld';
import { fotos } from '../../lib/fotos';
import { PakketKaart } from '../../components/pakket-kaart';
import { Band, BoekBlok, HOEKEN, PaginaKop } from '../../components/ui';

const prijzen = PAKKETTEN.map((p) => prijsPerPersoon(p.blokken));
const laagste = formatEuro(Math.min(...prijzen));
const hoogste = formatEuro(Math.max(...prijzen));
// De kortere pakketten beginnen hun korte omschrijving met 'Halve dag' of 'Halve ochtend'.
const halveDagen = PAKKETTEN.filter((p) => /^Halve/.test(p.kort));

const TITEL = `Groepsuitje Utrecht: ${PAKKETTEN.length} pakketten vanaf ${laagste}`;
const OMSCHRIJVING = `Groepsuitje in Utrecht voor bedrijven, scholen en vrienden: ${PAKKETTEN.length} vaste pakketten van ${laagste} tot ${hoogste} per persoon, incl. btw. Kies en boek direct.`;

export const metadata: Metadata = {
  title: TITEL,
  description: OMSCHRIJVING,
  alternates: { canonical: '/pakketten' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'DagjeUtrecht',
    title: TITEL,
    description: OMSCHRIJVING,
    url: '/pakketten',
    images: [{ url: fotos.supVrijgezellen.src, alt: fotos.supVrijgezellen.alt }],
  },
};

/** Lijst van alle pakketten met hun prijs, zodat Google ze als overzicht herkent. */
const lijst = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Pakketten voor een groepsuitje in Utrecht',
  numberOfItems: PAKKETTEN.length,
  itemListElement: PAKKETTEN.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://dagjeutrecht.nl/pakketten/${p.slug}`,
    name: p.naam,
  })),
};

export const revalidate = 86400;

export default function PakkettenPage() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Home', url: '/' },
          { name: 'Pakketten', url: '/pakketten' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lijst) }} />
      <PaginaKop
        titel="Pakketten voor je groepsuitje"
        intro="Dagen die goed werken. Boek ze zoals ze zijn, of wissel onderdelen om in de samensteller."
        kleur="zee"
        foto={fotos.supVrijgezellen}
        label="Vaste prijs per persoon"
        knop={{ href: '/boeken', tekst: 'Zelf samenstellen' }}
      />
      <div className="-mt-3">
        <Band woorden={PAKKETTEN.map((p) => p.naam)} />
      </div>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <ul className="grid gap-8 sm:grid-cols-2">
          {pakkettenOpSeizoen().map((p, i) => (
            <li key={p.slug}>
              <PakketKaart pakket={p} hoek={HOEKEN[i % HOEKEN.length]} />
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-zee-50">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-inkt">Een groepsuitje in Utrecht, zo werkt het</h2>
            <p className="mt-3 text-lg text-grijs">
              Elk pakket is een vaste dag of een vast dagdeel bij onze partners in Utrecht: JEU de boules bar en The Grand
              Shuffle in het centrum, De Rijnstroom in Amelisweerd, de Domtoren en de rondvaart door de grachten. De prijs
              per persoon is de som van de onderdelen, inclusief btw. Je ziet dus vooraf precies wat het uitje kost.
            </p>
            <p className="mt-3 text-lg text-grijs">
              Pakketten zijn te boeken vanaf {REGELS.minPers} personen, op donderdag, vrijdag en zaterdag, minimaal{' '}
              {REGELS.minDagenVooruit} dagen vooruit. Een hele dag loopt van {TIJDVAKKEN[0]!.van} tot{' '}
              {TIJDVAKKEN[TIJDVAKKEN.length - 1]!.tot}.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-inkt">Hele dag of halve dag</h2>
            <p className="mt-3 text-lg text-grijs">
              Heeft de groep maar een ochtend of een middag, kies dan een van de {halveDagen.length} kortere pakketten:{' '}
              {halveDagen.map((p) => p.naam).join(', ')}. Het goedkoopste uitje kost {laagste} per persoon.
            </p>
            <p className="mt-3 text-lg text-grijs">Zoek je een uitje voor een bepaalde gelegenheid?</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {LANDING_LIJST.map((l) => (
                <li key={l.pad}>
                  <Link
                    href={l.pad}
                    className="inline-flex rounded-full border-2 border-zee-400 bg-white px-4 py-2 font-bold text-inkt transition-colors hover:bg-zee-400"
                  >
                    {l.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <BoekBlok titel="Liever zelf kiezen?" tekst="Stel per tijdvak je eigen dag samen uit alle onderdelen." foto={fotos.kickbikeGracht} />
    </>
  );
}

import Link from 'next/link';
import { LANDING_LIJST } from '../lib/landings';
import { Logo } from './ui';

/** Teksten en adressen van de voet in een andere taal; zonder deze prop is de voet Nederlands. */
export type VoetTekst = {
  tagline: string;
  knop: { href: string; label: string };
  steps: { voor: string; na: string };
  contactKop: string;
  telefoon: string;
  kvk: string;
  paginasKop: string;
  links: Array<{ href: string; label: string }>;
  voorWieKop: string;
  voorWie: Array<{ href: string; label: string }>;
  onder: { handelsnaam: string; kaart: string; osm: string };
};

const NL: VoetTekst = {
  tagline: 'Vaste dagpakketten in Utrecht voor bedrijven, scholen en vriendengroepen. Met een vaste prijs per persoon.',
  knop: { href: '/boeken', label: 'Stel je dag samen' },
  steps: { voor: 'Alleen steps huren? Boek direct bij', na: '.' },
  contactKop: 'Contact',
  telefoon: '030 227 14 39',
  kvk: 'KvK 63330393',
  paginasKop: "Pagina's",
  links: [
    { href: '/pakketten', label: 'Pakketten' },
    { href: '/bouwstenen', label: 'Alle onderdelen' },
    { href: '/rondvaart-utrecht', label: 'Rondvaart boeken' },
    { href: '/boeken', label: 'Zelf samenstellen' },
    { href: '/blog', label: 'Inspiratie' },
    { href: '/alleen-steppen', label: 'Alleen steps huren' },
    { href: '/over-ons', label: 'Over ons' },
    { href: '/voorwaarden', label: 'Voorwaarden' },
    { href: '/privacy', label: 'Privacy' },
  ],
  voorWieKop: 'Voor wie?',
  voorWie: LANDING_LIJST.map((x) => ({ href: x.pad, label: x.link })),
  onder: {
    handelsnaam: "DagjeUtrecht, een handelsnaam van Traxeo. Prijzen per persoon inclusief btw. Foto's: DagjeSuppen.nl, Rederij Schuttevaer en",
    kaart: 'Kaartgegevens:',
    osm: '© OpenStreetMap-bijdragers',
  },
};

export function SiteFooter({ tekst = NL }: { tekst?: VoetTekst }) {
  const t = tekst;
  return (
    <footer className="op-donker bg-inkt text-zee-100">
      <div className="h-1.5 bg-gradient-to-r from-vlam-500 via-zon-400 to-zee-400" />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <Logo wit className="text-3xl" />
          <p className="mt-3 text-sm">{t.tagline}</p>
          <Link
            href={t.knop.href}
            className="mt-4 inline-flex min-h-11 items-center rounded-full bg-zon-400 px-5 font-bold text-inkt hover:bg-zon-300"
          >
            {t.knop.label}
          </Link>
          <p className="mt-4 text-sm">
            {t.steps.voor}{' '}
            <a href="https://stepverhuurutrecht.nl" className="font-bold underline underline-offset-2 hover:text-white">
              stepverhuurutrecht.nl
            </a>
            {t.steps.na === '.' ? '.' : ` ${t.steps.na}`}
          </p>
        </div>

        <div>
          <h2 className="font-bold text-zon-300">{t.contactKop}</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a href="mailto:info@dagjeutrecht.nl" className="underline underline-offset-2 hover:text-white">
                info@dagjeutrecht.nl
              </a>
            </li>
            <li>
              <a href="tel:+31302271439" className="underline underline-offset-2 hover:text-white">
                {t.telefoon}
              </a>
            </li>
            <li>Utrecht</li>
            <li>{t.kvk}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-zon-300">{t.paginasKop}</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {t.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline underline-offset-2 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-3">
          <h2 className="font-bold text-zon-300">{t.voorWieKop}</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {t.voorWie.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex rounded-full border border-inkt-700 px-3 py-1.5 hover:border-zon-300 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-inkt-700">
        <p className="mx-auto max-w-5xl px-4 py-4 text-xs text-zee-200 sm:px-6">
          © {new Date().getFullYear()} {t.onder.handelsnaam}{' '}
          <Link href="/fotobronnen" className="underline underline-offset-2 hover:text-white">
            Wikimedia Commons
          </Link>
          {`. ${t.onder.kaart}`}{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white"
          >
            {t.onder.osm}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

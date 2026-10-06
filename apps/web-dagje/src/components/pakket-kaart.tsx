import Link from 'next/link';
import {
  TIJDVAKKEN,
  buitenSeizoen,
  formatEuro,
  pakketMaanden,
  prijsPerPersoon,
  uitgelichtSeizoen,
  vindBouwsteen,
  type Pakket,
} from '../lib/aanbod';
import { fotoVoorPakket } from '../lib/fotos';
import { bouwsteenIn, maandenTekstIn, pakketIn, ui } from '../lib/i18n';
import { formatPrijs } from '../lib/i18n/opmaak';
import { fotoIn } from '../lib/i18n/foto-alt';
import { detailPad, type Vertaald } from '../lib/talen';
import { Foto, Sticker } from './ui';

const MAANDEN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
const maandenNaam = (m: number) => MAANDEN[m - 1];

const STREEP = ['bg-zee-400', 'bg-vlam-400', 'bg-zon-400', 'bg-inkt'];

/** Zonder taal Nederlands; met taal ('en' of 'de') de vertaalde kaart met het vertaalde adres. */
export function PakketKaart({ pakket, hoek = '', taal }: { pakket: Pakket; hoek?: string; taal?: Vertaald }) {
  const v = taal ? pakketIn(taal, pakket) : null;
  const t = taal ? ui(taal).pakketKaart : null;
  const kleur = STREEP[pakket.slug.length % STREEP.length];
  const seizoen = uitgelichtSeizoen();
  const inSeizoen = pakket.seizoen === seizoen;
  const buiten = buitenSeizoen(pakket, seizoen);
  const maanden = pakketMaanden(pakket);
  return (
    <Link
      href={taal ? detailPad(taal, 'pakket', pakket.slug)! : `/pakketten/${pakket.slug}`}
      className={`kantel group relative flex h-full flex-col rounded-2xl bg-white shadow-xl transition-transform hover:-translate-y-1 hover:rotate-0 ${hoek}`}
    >
      {inSeizoen && (
        <Sticker kleur="zee" hoek="rotate-6" className="absolute -right-3 -top-3 z-10">
          {seizoen === 'winter' ? t?.dezeWinter ?? '❄️ Deze winter' : t?.dezeZomer ?? '☀️ Deze zomer'}
        </Sticker>
      )}
      {buiten && (
        <Sticker kleur="wit" hoek="rotate-3" className="absolute -right-3 -top-3 z-10">
          {pakket.seizoen === 'zomer' ? t?.vanafApril ?? 'Vanaf april' : t?.vanafNovember ?? 'Vanaf november'}
        </Sticker>
      )}
      <div className="overflow-hidden rounded-t-2xl">
        <Foto
          foto={taal ? fotoIn(taal, fotoVoorPakket(pakket.slug)) : fotoVoorPakket(pakket.slug)}
          verhouding="aspect-[16/10]"
          sizes="(min-width: 640px) 50vw, 100vw"
          className={`transition-all duration-500 group-hover:scale-105 ${buiten ? 'grayscale-[60%] group-hover:grayscale-0' : ''}`}
        />
      </div>
      <div className={`h-2 ${kleur}`} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl font-extrabold text-inkt underline decoration-vlam-400 decoration-4 underline-offset-4">
          {v?.tekst.naam ?? pakket.naam}
        </h3>
        <p className="mt-1 text-sm font-bold uppercase tracking-wide text-grijs">{v?.tekst.voorWie ?? pakket.voorWie}</p>
        {maanden && (
          <p className="mt-1 text-sm font-semibold text-zee-700">
            {taal && t ? (
              <>
                {t.teBoeken} {maandenTekstIn(taal, maanden)}
              </>
            ) : (
              <>
                Te boeken van {maandenNaam(maanden.van)} tot en met {maandenNaam(maanden.tot)}
              </>
            )}
          </p>
        )}
        <ul className="mt-4 flex-1 space-y-1 text-inkt">
          {TIJDVAKKEN.map((t) => {
            const b = vindBouwsteen(pakket.blokken[t.id]);
            return b ? (
              <li key={t.id} className="flex gap-3">
                <span className="w-12 shrink-0 font-bold text-zee-600">{t.van}</span>
                <span>{taal ? bouwsteenIn(taal, b)?.tekst.naam ?? b.naam : b.naam}</span>
              </li>
            ) : null;
          })}
        </ul>
        <p className="mt-5 flex items-baseline gap-2">
          <span className="text-4xl font-black text-inkt">
            {taal ? formatPrijs(taal, prijsPerPersoon(pakket.blokken)) : formatEuro(prijsPerPersoon(pakket.blokken))}
          </span>
          <span className="text-sm text-grijs">{t?.perPersoon ?? 'per persoon'}</span>
        </p>
      </div>
    </Link>
  );
}

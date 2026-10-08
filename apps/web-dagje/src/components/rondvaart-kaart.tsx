import { boekLink, type Rondvaart } from '../lib/rondvaarten';
import { Foto } from './ui';

const SOORT_KLEUR = {
  groep: 'bg-zee-400 text-inkt',
  eten: 'bg-vlam-400 text-inkt',
  stad: 'bg-zon-400 text-inkt',
  buiten: 'bg-zee-400 text-inkt',
} as const;

/**
 * Kaart voor een rondvaart van Schuttevaer, in de stijl van de bouwsteenkaart.
 * De knoppen zijn gewone links naar FareHarbor; het lightframe-script op de pagina
 * opent ze in een venster op onze site. Zonder JavaScript openen ze als losse pagina.
 */
export function RondvaartKaart({ vaart, hoek = '' }: { vaart: Rondvaart; hoek?: string }) {
  return (
    <div
      id={vaart.id}
      className={`kantel group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-transform hover:rotate-0 ${hoek}`}
    >
      <div className="relative overflow-hidden">
        <Foto
          foto={vaart.foto}
          verhouding="aspect-[16/10]"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={`px-5 py-2 text-sm font-extrabold uppercase tracking-wide ${SOORT_KLEUR[vaart.soort]}`}>
        {vaart.balk}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl font-extrabold leading-tight text-inkt">{vaart.naam}</h3>
        <p className="mt-2 text-grijs">{vaart.omschrijving}</p>
        <dl className="mt-4 grid grid-cols-[6rem_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="font-bold text-inkt">Duur</dt>
          <dd className="text-grijs">{vaart.duur}</dd>
          <dt className="font-bold text-inkt">Vertrek</dt>
          <dd className="text-grijs">{vaart.vertrek}</dd>
          {vaart.groep && (
            <>
              <dt className="font-bold text-inkt">Groep</dt>
              <dd className="text-grijs">{vaart.groep}</dd>
            </>
          )}
          {vaart.letOp && (
            <>
              <dt className="font-bold text-inkt">Let op</dt>
              <dd className="text-grijs">{vaart.letOp}</dd>
            </>
          )}
        </dl>
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-3">
            {vaart.boeken.map((b) => (
              <a
                key={b.pk}
                href={boekLink(b.pk)}
                rel="sponsored"
                data-fh-item={b.pk}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-vlam-400 px-6 py-3 text-base font-extrabold uppercase tracking-wide text-inkt shadow-lg shadow-vlam-600/25 transition-transform hover:-translate-y-0.5 hover:bg-vlam-500"
              >
                {b.knop}
              </a>
            ))}
          </div>
          <p className="mt-3 text-sm text-grijs">Prijs en beschikbaarheid zie je bij het boeken.</p>
        </div>
      </div>
    </div>
  );
}

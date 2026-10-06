import NederlandseLayout, { metadata as nederlandseMetadata } from './(nl)/layout';

/**
 * 404 voor adressen die nergens bij horen. De root-layout geeft alleen door, dus
 * deze pagina zet zelf de Nederlandse layout eromheen. De tekst is dezelfde als
 * de standaard-404 van Next.js die hier eerder stond. Ook onbekende adressen onder
 * /en en /de komen hier: een eigen 404 per taal gaf in Next 14 een lege foutpagina
 * zonder html, omdat de root-layout alleen doorgeeft.
 */
// Zelfde metadata als voorheen: die van de Nederlandse layout (Next.js zet er zelf noindex bij).
export const metadata = nederlandseMetadata;

export default function NietGevonden() {
  return (
    <NederlandseLayout>
      <div
        style={{
          fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
          height: '60vh',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <h1
            style={{
              display: 'inline-block',
              margin: '0 20px 0 0',
              padding: '0 23px 0 0',
              fontSize: 24,
              fontWeight: 500,
              verticalAlign: 'top',
              lineHeight: '49px',
              borderRight: '1px solid rgba(0,0,0,.3)',
            }}
          >
            404
          </h1>
          <div style={{ display: 'inline-block' }}>
            <h2 style={{ fontSize: 14, fontWeight: 400, lineHeight: '49px', margin: 0 }}>
              This page could not be found.
            </h2>
          </div>
        </div>
      </div>
    </NederlandseLayout>
  );
}

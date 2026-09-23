import { ImageResponse } from 'next/og';

/** Social-Vorschau für alle Seiten: Navy und Orange wie die Website. */
export const alt = 'Utrecht Incoming: Ihr Partner für Gruppenreisen nach Utrecht';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#1a2e4a',
          color: '#ffffff',
        }}
      >
        <div style={{ fontSize: 32, color: '#e85d26', letterSpacing: 4, textTransform: 'uppercase' }}>Utrecht Incoming</div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          Ihr Partner für Gruppenreisen nach Utrecht
        </div>
        <div style={{ fontSize: 32, marginTop: 32, color: 'rgba(255,255,255,0.8)' }}>
          Gruppenprogramme · Partnertarife · Vouchers in 7 Sprachen
        </div>
      </div>
    ),
    size
  );
}

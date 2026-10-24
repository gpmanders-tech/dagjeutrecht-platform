import nodemailer from 'nodemailer';

/** Interne Benachrichtigung an info@utrechtincoming.nl (SMTP von Hostnet, Zugangsdaten in den Vercel-Umgebungsvariablen). */
export async function meldeIntern({ betreff, text, antwortAn }: { betreff: string; text: string; antwortAn?: string }) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_NAAR } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) throw new Error('SMTP nicht konfiguriert');
  await nodemailer
    .createTransport({ host: SMTP_HOST, port: 465, secure: true, auth: { user: SMTP_USER, pass: SMTP_PASS } })
    .sendMail({
      from: `Utrecht Incoming <${SMTP_USER}>`,
      to: MAIL_NAAR || SMTP_USER,
      replyTo: antwortAn,
      subject: betreff.slice(0, 200),
      text,
    });
}

/** Herkunft (gclid, utm) aus dem Browser; "[Google Ads]" im Betreff zählt die Anfrage für das Ads-Dashboard. */
export const adsKennung = (herkunft?: string) => (/gclid|google-ads|utm_source=google/i.test(herkunft || '') ? '[Google Ads] ' : '');

import nodemailer from 'nodemailer';

const SMTP_HOST = (process.env.SMTP_HOST || 'mail.dagjeutrecht.nl').trim();
const SMTP_PORT = Number((process.env.SMTP_PORT || '587').trim());
const SMTP_USER = (process.env.SMTP_USER || '').trim();
const SMTP_PASS = (process.env.SMTP_PASS || '').trim();

export const MAIL_FROM = (process.env.MAIL_FROM || 'info@dagjeutrecht.nl').trim();
export const OPS_MAIL_TO = (process.env.OPS_MAIL_TO || 'info@dagjeutrecht.nl').trim();
/** Waar klanten op antwoorden; los van de afzender, want die kan een ander (verzend)adres zijn. */
export const REPLY_TO = (process.env.MAIL_REPLY_TO || 'info@dagjeutrecht.nl').trim();

/** Alleen met INKOOP_AGENT_LIVE=true gaan agent-mails echt naar leveranciers en klanten. */
export const AGENT_LIVE = (process.env.INKOOP_AGENT_LIVE || '').trim() === 'true';

let _transport: nodemailer.Transporter | null | undefined;
function transport() {
  if (_transport !== undefined) return _transport;
  _transport =
    SMTP_USER && SMTP_PASS
      ? nodemailer.createTransport({
          host: SMTP_HOST,
          port: SMTP_PORT,
          secure: SMTP_PORT === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        })
      : null;
  return _transport;
}

/** Verstuurt een mail. Geeft false terug als SMTP ontbreekt of versturen mislukt. */
export async function stuurMail(m: { aan: string; onderwerp: string; tekst: string; replyTo?: string }) {
  const t = transport();
  if (!t) {
    console.error('SMTP niet ingesteld, mail niet verstuurd:', m.onderwerp);
    return false;
  }
  try {
    await t.sendMail({ from: MAIL_FROM, to: m.aan, subject: m.onderwerp, text: m.tekst, replyTo: m.replyTo });
    return true;
  } catch (e) {
    console.error('Mail mislukt:', m.onderwerp, e);
    return false;
  }
}

/**
 * Mail vanuit de inkoop-agent naar een leverancier of klant.
 * In testmodus gaat alles naar Ger, met het bedoelde adres in het onderwerp.
 */
export async function stuurAgentMail(m: { aan: string; onderwerp: string; tekst: string }) {
  if (AGENT_LIVE) return stuurMail({ ...m, replyTo: OPS_MAIL_TO });
  return stuurMail({
    aan: OPS_MAIL_TO,
    onderwerp: `[TEST, bedoeld voor ${m.aan}] ${m.onderwerp}`,
    tekst: m.tekst,
  });
}

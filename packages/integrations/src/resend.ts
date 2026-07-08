export async function sendMail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  from?: string;
  attachments?: Array<{ filename: string; content: string }>;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY ontbreekt');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: opts.from ?? process.env.MAIL_FROM ?? 'boekingen@utrechtnow.nl',
      to: Array.isArray(opts.to) ? opts.to : [opts.to],
      subject: opts.subject,
      html: opts.html,
      reply_to: opts.replyTo ?? process.env.MAIL_REPLY_TO,
      attachments: opts.attachments,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

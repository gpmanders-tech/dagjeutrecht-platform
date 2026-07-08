'use server';

import { prisma } from '@utrecht/db';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { findGiftOption } from '../../lib/giftcards';

const schema = z.object({
  giftSlug: z.string(),
  buyerName: z.string().min(2),
  buyerEmail: z.string().email(),
  buyerPhone: z.string().optional(),
  recipientName: z.string().min(2),
  recipientEmail: z.string().email().optional().or(z.literal('')),
  personalMessage: z.string().optional(),
  deliverBy: z.string().optional(),
});

const SMTP_HOST = process.env.SMTP_HOST || 'mail.samenskien.nl';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const MAIL_FROM = process.env.MAIL_FROM || 'info@dagjeutrecht.nl';
const OPS_MAIL_TO = process.env.OPS_MAIL_TO || 'info@dagjeutrecht.nl';

function transporter() {
  if (!SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function submitGiftOrder(input: z.input<typeof schema>) {
  const data = schema.parse(input);
  const gift = findGiftOption(data.giftSlug);
  if (!gift) throw new Error('Onbekend cadeaubon-type');

  const provider = await prisma.provider.findUnique({ where: { slug: gift.slug } });
  if (!provider) throw new Error('Cadeaubon-provider niet gevonden in DB');

  const summary = `CADEAUBON BESTELLING
Type: ${gift.title} (${(gift.priceCents / 100).toFixed(0)} EUR)
Ontvanger: ${data.recipientName}${data.recipientEmail ? ` <${data.recipientEmail}>` : ''}
Bezorgen voor: ${data.deliverBy || 'geen deadline'}

Persoonlijke boodschap:
${data.personalMessage || '(geen)'}
`;

  const enquiry = await prisma.enquiry.create({
    data: {
      channel: 'DAGJE',
      status: 'NEW',
      contactName: data.buyerName,
      contactEmail: data.buyerEmail,
      contactPhone: data.buyerPhone,
      paxAdults: 1,
      message: summary,
      items: {
        create: [
          {
            providerId: provider.id,
            order: 0,
            pax: 1,
            costPriceCents: gift.priceCents,
            sellPriceCents: gift.priceCents,
          },
        ],
      },
    },
  });

  const t = transporter();
  if (t) {
    await t
      .sendMail({
        from: MAIL_FROM,
        to: OPS_MAIL_TO,
        subject: `[DagjeUtrecht] Cadeaubon-bestelling ${enquiry.publicCode} - ${gift.title}`,
        text: `Nieuwe cadeaubon-bestelling ${enquiry.publicCode}

Koper: ${data.buyerName} <${data.buyerEmail}>${data.buyerPhone ? ` / ${data.buyerPhone}` : ''}

${summary}

Open in admin: ${process.env.NEXT_PUBLIC_ADMIN_URL || ''}/enquiries/${enquiry.id}
`,
      })
      .catch((e) => console.error('gift ops mail failed', e));

    await t
      .sendMail({
        from: MAIL_FROM,
        to: data.buyerEmail,
        replyTo: OPS_MAIL_TO,
        subject: `Je cadeaubon-bestelling bij DagjeUtrecht - ${enquiry.publicCode}`,
        text: `Hoi ${data.buyerName.split(' ')[0]},

Bedankt voor je cadeaubon-bestelling bij DagjeUtrecht!

Type: ${gift.title}
Ontvanger: ${data.recipientName}
Referentie: ${enquiry.publicCode}

Ger neemt binnen 48u contact met je op om betaling af te ronden en de cadeaubon te bezorgen.

Vragen? Reply op deze mail of bel 030 - 227 14 39.

Groet,
Ger Manders
DagjeUtrecht
`,
      })
      .catch((e) => console.error('gift confirm mail failed', e));
  }

  return { enquiryCode: enquiry.publicCode };
}

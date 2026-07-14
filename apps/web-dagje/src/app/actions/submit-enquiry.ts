'use server';

import { prisma } from '@utrecht/db';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const schema = z.object({
  audience: z.enum(['TEAM', 'STUDENT', 'SCHOOL', 'FAMILY', 'BACHELORETTE']).nullable().optional(),
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  companyName: z.string().optional(),
  vatNumber: z.string().optional(),
  requestedDate: z.string().optional(),
  paxAdults: z.number().int().min(1).max(500),
  paxChildren: z.number().int().min(0).max(500).optional().default(0),
  budgetMinEuro: z.number().nullable().optional(),
  budgetMaxEuro: z.number().nullable().optional(),
  message: z.string().optional(),
  providerSlugs: z.array(z.string()).min(1),
});

type Input = z.input<typeof schema>;

const SMTP_HOST = (process.env.SMTP_HOST || 'mail.dagjeutrecht.nl').trim();
const SMTP_PORT = Number((process.env.SMTP_PORT || '587').trim());
const SMTP_USER = (process.env.SMTP_USER || '').trim();
const SMTP_PASS = (process.env.SMTP_PASS || '').trim();
const MAIL_FROM = (process.env.MAIL_FROM || 'info@dagjeutrecht.nl').trim();
const OPS_MAIL_TO = (process.env.OPS_MAIL_TO || 'info@dagjeutrecht.nl').trim();

function transporter() {
  if (!SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function submitEnquiry(input: Input) {
  const data = schema.parse(input);

  const providers = await prisma.provider.findMany({
    where: { slug: { in: data.providerSlugs } },
    include: { products: { where: { active: true }, take: 1 } },
  });
  const bySlug = new Map(providers.map((p) => [p.slug, p]));

  const enquiry = await prisma.enquiry.create({
    data: {
      channel: 'DAGJE',
      audience: data.audience ?? null,
      status: 'NEW',
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      companyName: data.companyName,
      vatNumber: data.vatNumber,
      requestedDate: data.requestedDate ? new Date(data.requestedDate) : null,
      paxAdults: data.paxAdults,
      paxChildren: data.paxChildren ?? 0,
      budgetMinCents: data.budgetMinEuro ? Math.round(data.budgetMinEuro * 100) : null,
      budgetMaxCents: data.budgetMaxEuro ? Math.round(data.budgetMaxEuro * 100) : null,
      message: data.message,
      items: {
        create: data.providerSlugs
          .map((slug, i) => {
            const p = bySlug.get(slug);
            if (!p) return null;
            const product = p.products[0];
            return {
              providerId: p.id,
              order: i,
              pax: data.paxAdults + (data.paxChildren ?? 0),
              costPriceCents: product?.costPriceCents ?? null,
            };
          })
          .filter((x): x is Exclude<typeof x, null> => x !== null),
      },
    },
    include: { items: { include: { provider: true } } },
  });

  const t = transporter();
  if (t) {
    const programLines = enquiry.items
      .map(
        (it) =>
          `- ${it.provider.name}${it.provider.city ? ` (${it.provider.city})` : ''}`
      )
      .join('\n');

    const opsBody = `Nieuwe DagjeUtrecht.nl aanvraag - ${enquiry.publicCode}

Contact: ${data.contactName} <${data.contactEmail}>
Telefoon: ${data.contactPhone ?? '-'}
Bedrijf: ${data.companyName ?? '-'}
BTW: ${data.vatNumber ?? '-'}
Doelgroep: ${data.audience ?? '-'}
Datum: ${data.requestedDate ?? '-'}
Aantal: ${data.paxAdults} volw + ${data.paxChildren ?? 0} kind
Budget: €${data.budgetMinEuro ?? '?'} - €${data.budgetMaxEuro ?? '?'}

Programma:
${programLines}

Wensen:
${data.message || '(geen)'}

Open in admin: ${process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.utrechtnow.nl'}/enquiries/${enquiry.id}
`;

    await t
      .sendMail({
        from: MAIL_FROM,
        to: OPS_MAIL_TO,
        subject: `[DagjeUtrecht] Nieuwe aanvraag ${enquiry.publicCode} - ${data.contactName}`,
        text: opsBody,
      })
      .catch((e) => console.error('Ops mail failed:', e));

    const confirmBody = `Hoi ${data.contactName.split(' ')[0]},

Bedankt voor je aanvraag bij DagjeUtrecht.nl!

Binnen 48u ontvang je van Ger een vrijblijvende offerte. Je aanvraag-nummer is ${enquiry.publicCode}.

Jullie voorstel:
${programLines}

Wensen die je meegaf:
${data.message || '(geen)'}

Vragen? Reply op deze mail of bel Ger op 030 - 227 14 39.

Groet,
Ger Manders
DagjeUtrecht (Handelsonderneming Manders)
`;

    await t
      .sendMail({
        from: MAIL_FROM,
        to: data.contactEmail,
        replyTo: OPS_MAIL_TO,
        subject: `Je aanvraag bij DagjeUtrecht.nl - ${enquiry.publicCode}`,
        text: confirmBody,
      })
      .catch((e) => console.error('Confirm mail failed:', e));
  }

  return { enquiryCode: enquiry.publicCode, enquiryId: enquiry.id };
}

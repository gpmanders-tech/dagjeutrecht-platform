/**
 * Dagrapport DagjeUtrecht.nl - verzamelt kernstats en verstuurt naar Ger.
 * Runt via GitHub Actions elke dag 07:00 UTC.
 *
 * Vereist env: DATABASE_URL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
 * MAIL_FROM, DAILY_REPORT_TO (of OPS_MAIL_TO), SITE_URL.
 */
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const SITE_URL = process.env.SITE_URL || 'https://dagjeutrecht.nl';
const SMTP_HOST = process.env.SMTP_HOST || 'mail.dagjeutrecht.nl';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const MAIL_FROM = process.env.MAIL_FROM || 'info@dagjeutrecht.nl';
const MAIL_TO = process.env.DAILY_REPORT_TO || process.env.OPS_MAIL_TO || 'gpmanders@gmail.com';

async function checkUrl(url: string): Promise<{ ok: boolean; status: number | string; ms: number }> {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'DagjeUtrechtDailyReport/1.0' },
      signal: AbortSignal.timeout(15_000),
    });
    return { ok: res.ok, status: res.status, ms: Date.now() - start };
  } catch (e: any) {
    return { ok: false, status: e.message || 'error', ms: Date.now() - start };
  }
}

async function collectStats() {
  const now = new Date();
  const startOfYesterday = new Date(now);
  startOfYesterday.setDate(now.getDate() - 1);
  startOfYesterday.setHours(0, 0, 0, 0);
  const endOfYesterday = new Date(startOfYesterday);
  endOfYesterday.setHours(23, 59, 59, 999);

  const [
    enquiriesYesterday,
    enquiriesTotal,
    enquiriesOpen,
    providersActive,
    programsPublished,
  ] = await Promise.all([
    prisma.enquiry.count({
      where: { createdAt: { gte: startOfYesterday, lte: endOfYesterday } },
    }),
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: { in: ['NEW', 'IN_PROGRESS'] } } }),
    prisma.provider.count({ where: { active: true } }),
    prisma.program.count({ where: { published: true } }),
  ]);

  return {
    enquiriesYesterday,
    enquiriesTotal,
    enquiriesOpen,
    providersActive,
    programsPublished,
  };
}

async function checkKeyPages() {
  const pages = [
    { name: 'Homepage', path: '/' },
    { name: 'Aanbod', path: '/aanbod' },
    { name: 'Samensteller', path: '/samensteller' },
    { name: 'Cadeau', path: '/cadeau' },
    { name: 'Programma\'s', path: '/programmas' },
    { name: 'Sitemap', path: '/sitemap.xml' },
    { name: 'Robots', path: '/robots.txt' },
  ];
  const results = await Promise.all(
    pages.map(async (p) => ({ ...p, ...(await checkUrl(`${SITE_URL}${p.path}`)) }))
  );
  return results;
}

async function main() {
  const [stats, pages] = await Promise.all([collectStats(), checkKeyPages()]);
  const failedPages = pages.filter((p) => !p.ok);

  const dateNL = new Intl.DateTimeFormat('nl-NL', { dateStyle: 'full' }).format(new Date());

  const lines: string[] = [
    `Dagrapport DagjeUtrecht - ${dateNL}`,
    ''.padEnd(60, '='),
    '',
    'AANVRAGEN',
    `  Gisteren binnengekomen: ${stats.enquiriesYesterday}`,
    `  Totaal ooit: ${stats.enquiriesTotal}`,
    `  Open (NEW + IN_PROGRESS): ${stats.enquiriesOpen}`,
    '',
    'CATALOGUS',
    `  Actieve leveranciers: ${stats.providersActive}`,
    `  Gepubliceerde programma\'s: ${stats.programsPublished}`,
    '',
    'SITE-HEALTH',
    ...pages.map((p) => `  ${p.ok ? 'OK ' : 'FAIL'} [${p.status}] ${p.ms}ms - ${p.name} (${p.path})`),
  ];

  if (failedPages.length > 0) {
    lines.push('', 'LET OP:');
    for (const f of failedPages) {
      lines.push(`  Pagina "${f.name}" niet bereikbaar (status: ${f.status})`);
    }
  }

  lines.push('', 'VINDBAARHEID');
  lines.push('  Google Search Console: nog niet gekoppeld.');
  lines.push('  Zodra verificatie klaar is, komen hier:');
  lines.push('  - impressions & clicks van gisteren');
  lines.push('  - gemiddelde positie in zoekresultaten');
  lines.push('  - top 5 zoektermen waarop de site verscheen');
  lines.push('');
  lines.push('---');
  lines.push('Rapport gegenereerd door DagjeUtrecht daily-report script.');
  lines.push(`Meer via ${SITE_URL}`);

  const body = lines.join('\n');
  console.log(body);

  if (!SMTP_USER || !SMTP_PASS) {
    console.log('\n(SMTP niet geconfigureerd, mail niet verstuurd)');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: `Dagrapport DagjeUtrecht - ${dateNL}${failedPages.length ? ' [!]' : ''}`,
    text: body,
  });
  console.log(`\nMail verstuurd naar ${MAIL_TO}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

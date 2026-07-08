import { prisma } from '@utrecht/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const STATUS_LABEL: Record<string, string> = {
  NEW: 'Nieuw',
  IN_PROGRESS: 'In behandeling',
  QUOTED: 'Offerte uit',
  WON: 'Geboekt',
  LOST: 'Verloren',
};

const CHANNEL_LABEL: Record<string, string> = {
  DAGJE: 'DagjeUtrecht.nl',
  INCOMING: 'UtrechtIncoming.nl',
};

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: { status?: string; channel?: string };
}) {
  const where: any = {};
  if (searchParams.status) where.status = searchParams.status;
  if (searchParams.channel) where.channel = searchParams.channel;

  const enquiries = await prisma.enquiry.findMany({
    where,
    include: { items: { include: { provider: true } } },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  const counts = await prisma.enquiry.groupBy({
    by: ['status'],
    _count: { _all: true },
  });

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="font-serif text-3xl text-canal-900">Aanvragen</h1>
        <p className="text-canal-600 text-sm">{enquiries.length} zichtbaar (max 100)</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <FilterLink label="Alle" href="/enquiries" active={!searchParams.status && !searchParams.channel} />
        {(['NEW', 'IN_PROGRESS', 'QUOTED', 'WON', 'LOST'] as const).map((s) => (
          <FilterLink
            key={s}
            label={`${STATUS_LABEL[s]} (${counts.find((c) => c.status === s)?._count._all ?? 0})`}
            href={`/enquiries?status=${s}`}
            active={searchParams.status === s}
          />
        ))}
        <span className="mx-2 text-canal-300">|</span>
        <FilterLink label="Dagje" href="/enquiries?channel=DAGJE" active={searchParams.channel === 'DAGJE'} />
        <FilterLink label="Incoming" href="/enquiries?channel=INCOMING" active={searchParams.channel === 'INCOMING'} />
      </div>

      <div className="rounded-lg bg-white border border-canal-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-canal-50 text-canal-700">
            <tr>
              <th className="text-left px-4 py-2">Code</th>
              <th className="text-left px-4 py-2">Datum</th>
              <th className="text-left px-4 py-2">Site</th>
              <th className="text-left px-4 py-2">Contact</th>
              <th className="text-left px-4 py-2">Pax</th>
              <th className="text-left px-4 py-2">Programma</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e.id} className="border-t border-canal-100 hover:bg-cream/40">
                <td className="px-4 py-2 font-mono text-xs">
                  <Link href={`/enquiries/${e.id}`} className="text-terracotta-700 hover:underline">
                    {e.publicCode.slice(-8)}
                  </Link>
                </td>
                <td className="px-4 py-2">{formatDate(e.createdAt)}</td>
                <td className="px-4 py-2">{CHANNEL_LABEL[e.channel] ?? e.channel}</td>
                <td className="px-4 py-2">
                  <div>{e.contactName}</div>
                  <div className="text-xs text-canal-500">{e.contactEmail}</div>
                </td>
                <td className="px-4 py-2">
                  {e.paxAdults}
                  {e.paxChildren ? `+${e.paxChildren}k` : ''}
                </td>
                <td className="px-4 py-2 text-xs text-canal-600">
                  {e.items.length} onderdelen: {e.items.map((it) => it.provider.name).join(', ').slice(0, 60)}
                  {e.items.length > 3 ? '…' : ''}
                </td>
                <td className="px-4 py-2">
                  <StatusBadge status={e.status} />
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-canal-500">
                  Geen aanvragen met deze filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1 text-sm border transition-colors ${
        active
          ? 'bg-canal-900 text-white border-canal-900'
          : 'bg-white text-canal-700 border-canal-200 hover:border-canal-400'
      }`}
    >
      {label}
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    NEW: 'bg-amber-100 text-amber-800',
    IN_PROGRESS: 'bg-sky-100 text-sky-800',
    QUOTED: 'bg-violet-100 text-violet-800',
    WON: 'bg-emerald-100 text-emerald-800',
    LOST: 'bg-canal-100 text-canal-600',
  };
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colors[status] ?? ''}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(d);
}

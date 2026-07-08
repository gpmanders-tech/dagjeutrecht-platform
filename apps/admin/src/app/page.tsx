import { prisma } from '@utrecht/db';
import { formatEuro } from '@utrecht/ui';

export const revalidate = 30;

export default async function Dashboard() {
  const [providerCount, bookable, tips, orderStats] = await Promise.all([
    prisma.provider.count({ where: { active: true } }),
    prisma.provider.count({ where: { active: true, bookable: true } }),
    prisma.provider.count({ where: { active: true, bookable: false } }),
    prisma.order.aggregate({
      where: { status: { in: ['PAID', 'CONFIRMED', 'FULFILLED'] } },
      _sum: { totalCents: true, marginCents: true },
      _count: true,
    }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8 text-canal-900">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Leveranciers" value={providerCount.toString()} sub={`${bookable} boekbaar · ${tips} TIP`} />
        <Stat label="Orders" value={(orderStats._count ?? 0).toString()} />
        <Stat label="Omzet" value={formatEuro(orderStats._sum.totalCents ?? 0)} />
        <Stat label="Marge (intern)" value={formatEuro(orderStats._sum.marginCents ?? 0)} />
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-canal-100 shadow-soft p-5">
      <p className="text-sm text-canal-600">{label}</p>
      <p className="font-serif text-3xl text-canal-900 mt-1">{value}</p>
      {sub && <p className="text-xs text-canal-500 mt-1">{sub}</p>}
    </div>
  );
}

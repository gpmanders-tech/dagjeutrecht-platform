import { prisma } from '@utrecht/db';
import { notFound } from 'next/navigation';
import { ProviderEditor } from '@/components/provider-editor';

export default async function ProviderEdit({ params: { id } }: { params: { id: string } }) {
  const provider = await prisma.provider.findUnique({
    where: { id },
    include: { products: { take: 1 } },
  });
  if (!provider) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-2 text-canal-900">{provider.name}</h1>
      <p className="text-canal-600 mb-8 text-sm">{provider.slug} · {provider.category} · {provider.channel}</p>
      <ProviderEditor
        provider={{
          id: provider.id,
          slug: provider.slug,
          websiteUrl: provider.websiteUrl ?? '',
          heroImage: provider.heroImage ?? '',
          bookable: provider.bookable,
          active: provider.active,
          rating: provider.rating,
          modifyDeadlineHours: provider.modifyDeadlineHours,
          canChangeTime: provider.canChangeTime,
          canChangeCount: provider.canChangeCount,
        }}
      />
    </div>
  );
}

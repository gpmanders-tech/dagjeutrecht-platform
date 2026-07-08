/**
 * Seed ~100 Utrecht-leveranciers volgens MASTERPROMPT § 4.
 * Prijzen zijn inkoopprijzen (cents). Verkoop = ceil(cost × 1.10).
 *
 * Run: pnpm db:seed
 */
import { PrismaClient, Category, BookingChannel, Locale, FulfilmentType } from '@prisma/client';
import { providers } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${providers.length} providers…`);

  for (const p of providers) {
    const provider = await prisma.provider.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        category: p.category,
        channel: p.channel,
        bookable: p.bookable ?? true,
        vatRate: p.vatRate ?? 0.21,
        modifyDeadlineHours: p.modifyDeadlineHours ?? 48,
        canChangeTime: p.canChangeTime ?? true,
        canChangeCount: p.canChangeCount ?? true,
        rating: p.rating,
        ratingCount: p.ratingCount,
        websiteUrl: p.websiteUrl,
      },
      create: {
        slug: p.slug,
        name: p.name,
        category: p.category,
        channel: p.channel,
        bookable: p.bookable ?? true,
        vatRate: p.vatRate ?? 0.21,
        modifyDeadlineHours: p.modifyDeadlineHours ?? 48,
        canChangeTime: p.canChangeTime ?? true,
        canChangeCount: p.canChangeCount ?? true,
        rating: p.rating,
        ratingCount: p.ratingCount,
        websiteUrl: p.websiteUrl,
      },
    });

    if (p.bookable !== false && p.priceCents) {
      await prisma.product.upsert({
        where: { providerId_slug: { providerId: provider.id, slug: 'default' } },
        update: {
          costPriceCents: p.priceCents,
          fulfilment: p.fulfilment ?? FulfilmentType.ACTIVITY,
          maxParticipants: p.maxParticipants,
          durationMinutes: p.durationMinutes,
        },
        create: {
          providerId: provider.id,
          slug: 'default',
          fulfilment: p.fulfilment ?? FulfilmentType.ACTIVITY,
          costPriceCents: p.priceCents,
          maxParticipants: p.maxParticipants,
          durationMinutes: p.durationMinutes,
          translations: {
            create: [
              {
                locale: Locale.nl,
                name: p.name,
                description: p.descriptionNL ?? `Standaard ticket voor ${p.name}.`,
              },
            ],
          },
        },
      });
    }
  }

  console.log('Settings…');
  await prisma.setting.upsert({
    where: { key: 'margin.b2c' },
    update: { value: 0.10 },
    create: { key: 'margin.b2c', value: 0.10 },
  });
  await prisma.setting.upsert({
    where: { key: 'margin.b2b' },
    update: { value: 0.05 },
    create: { key: 'margin.b2b', value: 0.05 },
  });

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

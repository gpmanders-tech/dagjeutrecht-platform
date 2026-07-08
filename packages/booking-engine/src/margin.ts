/**
 * Marge-logica. Klantprijs = ceil(inkoop × (1 + marge)).
 * Klant ziet ALLEEN sellPriceCents. De aanroeper is verantwoordelijk
 * voor het verbergen van costPriceCents en marginCents in alle klant-UI.
 */

export type PriceTier = 'B2C' | 'B2B' | 'GIFTCARD';

export interface MarginConfig {
  /** Globale marges; per provider/categorie overschrijfbaar via Setting/Provider.marginOverride. */
  b2c: number;        // 0.10
  b2b: number;        // 0.05
  /** Cadeaubonnen krijgen GEEN marge — nominale waarde. */
  giftcard: number;   // 0.00
}

export const DEFAULT_MARGIN: MarginConfig = { b2c: 0, b2b: 0, giftcard: 0 };

export interface ComputePriceArgs {
  costCents: number;
  tier: PriceTier;
  vatRate: number;            // 0.09 of 0.21 (incl. in eindprijs)
  marginOverride?: number | null;
  config?: MarginConfig;
}

export interface ComputedPrice {
  sellPriceCents: number;     // wat de klant ziet (incl. BTW)
  vatCents: number;
  costCents: number;          // intern
  marginCents: number;        // intern
}

export function computePrice({
  costCents,
  tier,
  vatRate,
  marginOverride,
  config = DEFAULT_MARGIN,
}: ComputePriceArgs): ComputedPrice {
  const marginRate =
    marginOverride != null
      ? marginOverride
      : tier === 'B2B'
        ? config.b2b
        : tier === 'GIFTCARD'
          ? config.giftcard
          : config.b2c;

  const gross = Math.ceil(costCents * (1 + marginRate));
  const vatCents = Math.round((gross * vatRate) / (1 + vatRate));
  const marginCents = gross - costCents;

  return { sellPriceCents: gross, vatCents, costCents, marginCents };
}

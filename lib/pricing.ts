export const STRIPE_PRICE_IDS = {
  starter: {
    dev: "price_1S01dpIk5hDvmUOWJEtAG7hl",
    prod: "price_1STdPlIk5hDvmUOWd9yC7vi6"
  },
  pro: {
    dev: "price_1Rj4L4Ik5hDvmUOWBrrQ2iwX",
    prod: "price_1R8dWQIk5hDvmUOWdlwOMayb"
  },
  team: {
    dev: "price_1S8eePIBZN3mPAToEG7ECmHE",
    prod: "price_1S8TGVIk5hDvmUOWO41ci17D"
  }
} as const;

export type PricingTier = keyof typeof STRIPE_PRICE_IDS;

export function getPriceId(tier: PricingTier): string {
  const isProduction = process.env.NODE_ENV === "production";
  return isProduction ? STRIPE_PRICE_IDS[tier].prod : STRIPE_PRICE_IDS[tier].dev;
}

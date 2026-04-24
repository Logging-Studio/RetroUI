export interface CheckoutSessionResponse {
  sessionUrl?: string;
  error?: string;
}

export interface CheckoutSessionRequest {
  priceId: string;
  promoCode?: string;
  endorsely_referral?: string;
}

export type PricingTier = "starter" | "pro" | "team";

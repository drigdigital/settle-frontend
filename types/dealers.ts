import type { BannerLink } from "./banner";
import type { BrandValue } from "./brand";

export interface DealerBenefitsContent {
  eyebrow: string;
  heading: string;
  description: string;
  items: BrandValue[];
}

export interface DealersCtaContent {
  heading: string;
  primaryCta: BannerLink;
}

/** One dealer in the "Find Settle near you" locator. */
export interface Dealer {
  id: string;
  name: string;
  /** Street address, without city or pin code. */
  address: string;
  city: string;
  pincode: string;
  phone: string;
}

export interface DealerLocatorContent {
  eyebrow: string;
  heading: string;
  text: string;
  /** Shown while the dealer list is empty. */
  emptyState: { text: string; cta: BannerLink };
  /** Map shown before any dealer is selected (and while the list is empty). */
  defaultMapQuery: string;
}

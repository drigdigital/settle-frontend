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

import type { PartnerHighlightContent, PartnerPillar } from "@/types/partner";

/**
 * Homepage Section 05 — retailer & dealer support band.
 *
 * CTA LINK — points at the dealer application form on /dealers until a
 * dedicated partner page exists. Swap `cta.href` to "/partner" (or
 * "/become-a-partner") once that route is built.
 */
export const PARTNER_HIGHLIGHT: PartnerHighlightContent = {
  eyebrow: "For Retailers & Dealers",
  heading: "Built to support the retailers who carry us.",
  subtext:
    "We back every retailer and dealer who stocks Settle with the pricing, support and reliability it takes to keep a showroom floor moving.",
  cta: { label: "Become A Settle Partner", href: "/dealers#apply" },
};

export const PARTNER_PILLARS: PartnerPillar[] = [
  {
    id: "empowering-partnership",
    icon: "handshake",
    title: "Empowering Partnership",
    description: "A relationship built on shared growth, not just supply orders.",
  },
  {
    id: "online-b2b-access",
    icon: "monitor",
    title: "Online B2B Access",
    description: "Browse the full catalog and track orders from a single dealer portal.",
  },
  {
    id: "store-design-support",
    icon: "store",
    title: "Store Design Support",
    description: "Hands-on guidance for laying out and merchandising Settle inside your showroom.",
  },
  {
    id: "marketing-activities",
    icon: "megaphone",
    title: "Marketing Activities",
    description: "Co-branded campaigns and launch support, so you're not selling us alone.",
  },
  {
    id: "quality-assurance",
    icon: "badge-check",
    title: "Quality Assurance",
    description: "Every piece checked before it ever leaves our Coimbatore facility.",
  },
  {
    id: "logistic-fulfillment",
    icon: "truck",
    title: "Logistic Fulfillment",
    description: "Delivery timelines you can plan around, so your floor's never short.",
  },
];

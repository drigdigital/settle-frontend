import type { PartnerHighlightContent, PartnerPillar } from "@/types/partner";

/**
 * Homepage Section 05 — "Partner With Settle" business strip.
 *
 * CTA LINK — points at the dealer application form on /dealers until a
 * dedicated partner page exists. Swap `cta.href` to "/partner" (or
 * "/become-a-partner") once that route is built.
 */
export const PARTNER_HIGHLIGHT: PartnerHighlightContent = {
  eyebrow: "For dealers, distributors and businesses",
  heading: "Partner with Settle.",
  subtext:
    "Wooden, modular and upholstered furniture from one manufacturer, supplied through five warehouses and backed by a team that stays with you after the sale.",
  cta: { label: "Become A Settle Partner", href: "/dealers#apply" },
};

export const PARTNER_PILLARS: PartnerPillar[] = [
  {
    id: "empowering-partnerships",
    icon: "handshake",
    title: "Empowering Partnerships",
    description: "Growth we build together.",
  },
  {
    id: "one-manufacturer-three-ranges",
    icon: "layers",
    title: "One Manufacturer, Three Ranges",
    description: "Wooden, modular and upholstered furniture through a single relationship.",
  },
  {
    id: "five-warehouses",
    icon: "truck",
    title: "Five Warehouses, Zone-Wise Delivery",
    description: "Planned delivery timelines, so your floor is never short.",
  },
  {
    id: "marketing-support",
    icon: "megaphone",
    title: "Marketing Support",
    description: "Co-branded campaigns and launch material that help new collections sell.",
  },
  {
    id: "reliable-supply",
    icon: "factory",
    title: "Reliable Supply",
    description: "Steady stock from our own plants.",
  },
  {
    id: "quality-after-sales",
    icon: "badge-check",
    title: "Quality And After-Sales Service",
    description:
      "Every piece checked before it leaves Coimbatore, with service support once it’s delivered.",
  },
];

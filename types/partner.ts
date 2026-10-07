/** Icon keys for partner support pillars — mapped to SVG components in the component, so data stays serializable. */
export type PartnerPillarIcon =
  "handshake" | "monitor" | "store" | "megaphone" | "badge-check" | "truck";

export interface PartnerPillar {
  id: string;
  icon: PartnerPillarIcon;
  title: string;
  /** One line; shown on every breakpoint. */
  description: string;
}

export interface PartnerHighlightContent {
  eyebrow: string;
  heading: string;
  subtext: string;
  cta: { label: string; href: string };
}

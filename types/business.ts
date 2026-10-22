import type { BannerLink } from "./banner";
import type { BrandValue } from "./brand";

/** Icon keys for icon tiles — mapped to SVG components in IconTileGrid, so data stays serializable. */
export type TileIcon = "bed" | "building" | "briefcase" | "graduation-cap" | "store" | "swatch";

export interface IconTile {
  id: string;
  icon: TileIcon;
  label: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  body: string;
}

export interface BusinessSection<TItem> {
  eyebrow: string;
  heading: string;
  /** Optional intro under the heading. */
  description?: string;
  items: TItem[];
}

export interface BusinessCtaContent {
  heading: string;
  primaryCta: BannerLink;
}

export type BulkOrderPoint = BrandValue;

/** One audience card in "Who we work with" (dealers, distributors, corporate). */
export interface BusinessAudience {
  id: string;
  title: string;
  /** Who it's for ("For furniture retailers and showroom owners."). */
  audience: string;
  /** One-line promise under the audience line. */
  lead: string;
  points: string[];
  /** Optional chip list, e.g. the industries served by the corporate team. */
  industries?: { label: string; items: string[] };
  cta: BannerLink;
}

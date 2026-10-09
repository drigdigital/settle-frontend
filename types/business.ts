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
  description: string;
  items: TItem[];
}

export interface BusinessCtaContent {
  heading: string;
  primaryCta: BannerLink;
}

export type BulkOrderPoint = BrandValue;

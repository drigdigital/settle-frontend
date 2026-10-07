/** Icon keys for brand values — mapped to SVG components in the section, so data stays serializable. */
export type BrandValueIcon = "factory" | "shield-check" | "home" | "tag";

export interface BrandValue {
  id: string;
  icon: BrandValueIcon;
  title: string;
  /** Glanceable line shown on every breakpoint. */
  shortLine: string;
  /** Full sentence, shown as a second line on desktop (screen-reader only below that). */
  description: string;
}

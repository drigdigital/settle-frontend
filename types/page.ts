/** Shared shapes for page-level sections (heroes, viewport sections, image/text rows). */

/** Background band for a full-viewport section. */
export type SectionTone = "paper" | "linen" | "navy";

export interface PageImage {
  src: string;
  alt: string;
  /** CSS object-position, to keep the furniture in frame when cropped. */
  objectPosition?: string;
}

/** Icon keys for hero highlight strips — mapped to SVG components in SplitHero, so data stays serializable. */
export type PageHighlightIcon = "factory" | "layers" | "home";

export interface PageHighlight {
  id: string;
  icon: PageHighlightIcon;
  title: string;
  line: string;
}

export interface PageHeroContent {
  eyebrow: string;
  heading: string;
  intro: string;
  image: PageImage;
  /** Optional three-item strip under the intro. */
  highlights?: PageHighlight[];
}

/** Copy for an EnquirySection: heading block beside a shared EnquiryForm. */
export interface EnquirySectionContent {
  eyebrow: string;
  heading: string;
  description: string;
  submitLabel: string;
}

/** A titled line in a story row's list, e.g. "Dedicated account support" + its explanation. */
export interface StoryPoint {
  id: string;
  title: string;
  body: string;
}

/** Content for StorySplit: an alternating image/text row in its own viewport section. */
export interface StoryContent {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  /** Optional list under the body. */
  points?: StoryPoint[];
  /** 1 image: single frame. 2: offset pair. 4: 2 × 2 mosaic. */
  images: PageImage[];
  imageSide: "left" | "right";
  tone: SectionTone;
}

/** Products page hero copy; the photo mosaic comes from catalog products with images. */
export interface ProductsHeroContent {
  eyebrow: string;
  heading: string;
  intro: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

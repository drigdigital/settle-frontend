import type { BannerLink } from "./banner";

/** Background band for a full-viewport section. */
export type SectionTone = "paper" | "linen" | "navy";

export interface AboutImage {
  src: string;
  alt: string;
  /** CSS object-position, to keep the furniture in frame when cropped. */
  objectPosition?: string;
}

/** Icon keys for the hero strip — mapped to SVG components in the section, so data stays serializable. */
export type AboutHighlightIcon = "factory" | "layers" | "home";

export interface AboutHighlight {
  id: string;
  icon: AboutHighlightIcon;
  title: string;
  line: string;
}

export interface AboutHeroContent {
  eyebrow: string;
  heading: string;
  intro: string;
  image: AboutImage;
  highlights: AboutHighlight[];
}

export interface AboutStory {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  /** 1 image: single frame. 2: offset pair. 4: 2 × 2 mosaic. */
  images: AboutImage[];
  imageSide: "left" | "right";
  tone: SectionTone;
}

export interface LeaderProfile {
  id: string;
  name: string;
  title: string;
  /** 2–3 lines. */
  bio?: string;
  /** Square headshot. */
  photo?: string;
}

export interface AboutLeadershipContent {
  eyebrow: string;
  heading: string;
  /** Real profiles. While empty, the reserved titles render as "coming soon" cards. */
  profiles: LeaderProfile[];
  reservedTitles: string[];
}

export interface AboutCtaContent {
  heading: string;
  primaryCta: BannerLink;
}

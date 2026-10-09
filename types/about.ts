import type { BannerLink } from "./banner";
import type { StoryContent } from "./page";

export type AboutStory = StoryContent;

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

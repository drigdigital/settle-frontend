import type { BannerLink } from "./banner";
import type { StoryContent } from "./page";

export type AboutStory = StoryContent;

export interface AboutCtaContent {
  heading: string;
  primaryCta: BannerLink;
}

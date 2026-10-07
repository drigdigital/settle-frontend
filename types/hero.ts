export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroContent {
  headline: string;
  subtext: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
}

export interface HeroSlide {
  id: string;
  /** Short room name, announced to screen readers ("Living Room"). */
  label: string;
  image: {
    src: string;
    alt: string;
    /** CSS object-position, used to keep the furniture in frame when the image is cropped. */
    objectPosition?: string;
  };
}

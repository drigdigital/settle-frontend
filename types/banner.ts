export interface BannerLink {
  label: string;
  href: string;
}

/** Background images are decorative (the banner copy carries the meaning), so there's no alt text. */
export interface BannerImage {
  src: string;
  /** CSS object-position, to keep the subject clear of the text side when cropped. */
  objectPosition?: string;
}

export interface BannerMedia {
  /**
   * Always rendered: the only frame on phones, slow connections and under
   * reduced motion, the backdrop while a video loads, and the gallery's first slide.
   */
  poster: BannerImage;
  /** Muted looping clip. When absent, the gallery plays instead. */
  video?: { mp4: string; webm?: string } | null;
  /** Slides after the poster for the crossfading Ken Burns gallery. */
  gallery?: BannerImage[];
}

export interface ImmersiveBannerContent {
  eyebrow: string;
  heading: string;
  subtext: string;
  primaryCta: BannerLink;
  secondaryCta?: BannerLink;
  location?: { label: string; mapUrl: string };
  /** Short highlight shown as a gold chip beside the location ("3,00,000 sq ft facility"). */
  stat?: string;
}

export interface ClosingCtaContent {
  eyebrow?: string;
  heading: string;
  subtext: string;
  primaryCta: BannerLink;
  secondaryCta?: BannerLink;
  /** Optional background photo, shown faintly under a 90% navy overlay. Omit for solid navy with gold accents. */
  image?: BannerImage;
}

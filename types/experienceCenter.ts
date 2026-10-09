import type { BannerLink } from "./banner";
import type { PageImage } from "./page";

export interface GalleryItem {
  id: string;
  image: PageImage;
  caption: string;
}

export interface StoreGalleryContent {
  eyebrow: string;
  heading: string;
  description: string;
  items: GalleryItem[];
}

export interface VisitLocation {
  name: string;
  addressLines: string[];
  phone: string;
  emails: string[];
}

export interface VisitDetailsContent {
  heading: string;
  description: string;
  location: VisitLocation;
  hours: {
    heading: string;
    description: string;
    /** Day range and opening time, e.g. "Monday – Saturday" / "10:00 AM – 7:00 PM". */
    slots: { day: string; time: string }[];
    /** Extra line under the slots, e.g. "Closed on public holidays". */
    note?: string;
  };
}

export interface ExperienceCenterCtaContent {
  heading: string;
  primaryCta: BannerLink;
}

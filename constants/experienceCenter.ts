import type { BannerMedia, ImmersiveBannerContent } from "@/types/banner";

/**
 * Homepage Section 06 — "Our Plants" preview banner.
 *
 * MAP LINK — PLACEHOLDER Google Maps search, used by the "View On Map" button
 * and the location chip. Replace with the plant's own share link
 * (Google Maps → Share → Copy link).
 *
 * CLIENT TO CONFIRM — the plant count and the 3,00,000 sq ft figure in `stat`
 * (it may refer to one plant or the total).
 */
const PLANT_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Settle+Furnitures+Coimbatore+Tamil+Nadu";

export const EXPERIENCE_CENTER_BANNER: ImmersiveBannerContent = {
  eyebrow: "Made in Coimbatore",
  heading: "See where Settle is made.",
  subtext:
    "Every Settle piece is made in our plants in Coimbatore. Walk the floor to see how furniture is cut, joined, finished and checked, then step into our factory display center to see full room setups and feel the finishes in person, before you buy or stock a single piece.",
  primaryCta: { label: "Plan A Plant Visit", href: "/our-plants#book" },
  secondaryCta: { label: "View On Map", href: PLANT_MAP_URL },
  location: {
    label: "Coimbatore, Tamil Nadu",
    mapUrl: PLANT_MAP_URL,
  },
  stat: "3 plants · 3,00,000 sq ft of manufacturing space",
};

/**
 * Background media — decorative; the copy above carries the meaning.
 *
 * VIDEO — none yet, so the image gallery plays. When footage arrives, add the
 * files to public/videos/ and set, for example:
 *   video: { mp4: "/videos/experience-center.mp4", webm: "/videos/experience-center.webm" }
 * Aim for a 10–20s seamless loop, no audio track, 1280–1920px wide, under ~3 MB.
 * Point `poster` at a still from the clip so the hand-off is seamless.
 *
 * PLACEHOLDER PHOTOGRAPHY — showroom images already in public/images/ (also
 * used on /our-plants). Replace with photos of the Coimbatore facility,
 * showroom room setups and craftsmen at work.
 */
export const EXPERIENCE_CENTER_MEDIA: BannerMedia = {
  poster: { src: "/images/experience-center-hero.jpg" },
  video: null,
  gallery: [
    { src: "/images/walkthrough-booking.jpg" },
    { src: "/images/gallery-dining.jpg" },
    { src: "/images/gallery-bedroom.jpg" },
  ],
};

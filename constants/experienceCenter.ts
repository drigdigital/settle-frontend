import type { BannerMedia, ImmersiveBannerContent } from "@/types/banner";

/**
 * Homepage Section 06 — Experience Center preview banner.
 *
 * MAP LINK — PLACEHOLDER Google Maps search. Replace `location.mapUrl` with
 * the Experience Center's own share link (Google Maps → Share → Copy link).
 */
export const EXPERIENCE_CENTER_BANNER: ImmersiveBannerContent = {
  eyebrow: "Experience Center · Coimbatore",
  heading: "See Settle before it's in your home.",
  subtext:
    "Settle comes to life on the factory floor, a 3,00,000 sq ft facility in Coimbatore where you can walk through full room setups, run a hand over the finishes, and meet the people who actually build the furniture, before you buy or stock a single piece.",
  primaryCta: { label: "Explore Our Experience Center", href: "/experience-center" },
  secondaryCta: { label: "Book A Visit", href: "/experience-center#book" },
  location: {
    label: "Coimbatore, Tamil Nadu",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Settle+Furnitures+Coimbatore+Tamil+Nadu",
  },
  stat: "3,00,000 sq ft facility",
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
 * used on /experience-center). Replace with photos of the Coimbatore facility,
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

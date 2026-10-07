import type { Price } from "./product";

/** Card background tone, light → dark. Shows behind the photo and replaces it if the image fails. */
export type WoodTone = "sand" | "oak" | "teak" | "cherry" | "walnut";

export interface ShowcaseItem {
  id: string;
  name: string;
  /** Display label above the name ("Wooden Sofas"). */
  category: string;
  description: string;
  href: string;
  tone: WoodTone;
  image?: {
    src: string;
    alt: string;
  };
  /** Optional; rendered only when present with `display: true`. */
  price?: Price;
}

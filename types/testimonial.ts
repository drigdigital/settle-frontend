export type TestimonialType = "dealer" | "customer";

export interface Testimonial {
  _id: string;
  /** 1–3 sentences. */
  quote: string;
  name: string;
  /** Role and location in one line: "Dealer, Madurai", "Homeowner, Chennai". */
  role: string;
  type: TestimonialType;
  /** Product the testimonial is about ("Aura Wardrobe"). */
  product?: string;
  /** 1–5; stars render only when present. */
  rating?: number;
  /** Square headshot; an initials avatar is shown when absent. */
  photo?: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface ClientLogo {
  id: string;
  /** Partner name; also the image alt text. */
  name: string;
  image: { src: string; width: number; height: number };
  /** Partner website; the logo links out when present. */
  url?: string;
}

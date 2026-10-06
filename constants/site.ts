import type { Department } from "@/types/enquiry";

export const SITE_CONFIG = {
  name: "Settle Furnitures",
  legalName: "Vaanam Furniture Private Limited",
  tagline: "Furniture built to settle in for a lifetime.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Settle Furnitures is a premium showcase of seasoned Mahogany and Teak furniture — wardrobes, sofas, dining sets, cots and more. Browse the collection and enquire; every piece is made to order.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "911234567890",
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  contact: {
    salesEmail: "sales@settlefurnitures.com",
    supportEmail: "support@settlefurnitures.com",
    phone: "+91 12345 67890",
  },
  social: {
    instagram: "https://instagram.com/settlefurnitures",
    facebook: "https://facebook.com/settlefurnitures",
  },
} as const;

/**
 * Single source of truth for department routing: which enquiry department
 * gets which inbox. Used both by the Contact page's department directory and
 * by the enquiry notification hook (services/enquiries.ts) — never hardcode
 * these addresses a second time.
 */
export const DEPARTMENT_CONTACTS: { department: Department; label: string; email: string }[] = [
  { department: "sales", label: "Retail Sales", email: "sales@settlefurniture.in" },
  { department: "b2b", label: "B2B / Bulk Orders", email: "b2b@settlefurniture.in" },
  {
    department: "dealer-relations",
    label: "Dealer Partnerships",
    email: "partners@settlefurniture.in",
  },
  {
    department: "experience-center",
    label: "Experience Center",
    email: "visit@settlefurniture.in",
  },
  { department: "support", label: "Customer Support", email: "hello@settlefurniture.in" },
];

export const FINISHES = ["Walnut", "Cherry", "Oak", "Sand", "Baverian", "Teak"] as const;

export const MATERIALS = ["Seasoned Mahogany", "Seasoned Teak"] as const;

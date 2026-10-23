import type { Dealer, DealerLocatorContent } from "@/types/dealers";

/**
 * "Find a Settle Dealer" locator on /dealers. Headline and text are verbatim
 * from "Settle Furniture content.docx" (DEALERS PAGE → Find a Settle Dealer);
 * the eyebrow is a layout label.
 *
 * PLACEHOLDER COPY — `emptyState.text` is not from the document; it shows
 * only until the dealer list below is filled in. Confirm or replace it.
 */
export const DEALER_LOCATOR: DealerLocatorContent = {
  eyebrow: "04",
  heading: "Find Settle near you.",
  text: "See Settle in person at a dealer in your city. Search by city or pin code, or browse the map.",
  emptyState: {
    text: "Dealer locations are being added. Get in touch and we’ll point you to your nearest Settle dealer.",
    cta: { label: "Get In Touch", href: "/contact" },
  },
  defaultMapQuery: "Coimbatore, Tamil Nadu",
};

/**
 * CLIENT TO SUPPLY — the dealer list and locations (content document: "[Dealer
 * list and locations to be supplied by client]"). Add one entry per dealer,
 * e.g. { id: "chennai-1", name: "…", address: "…", city: "Chennai",
 * pincode: "600001", phone: "+91 …" }. The search, list and map pick them up
 * automatically; nothing else needs to change.
 */
export const DEALERS: Dealer[] = [];

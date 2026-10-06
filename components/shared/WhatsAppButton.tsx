"use client";

import { SITE_CONFIG } from "@/constants/site";
import { WhatsAppIcon } from "@/components/ui/icons";
import { trackEvent } from "@/services/analytics";

/**
 * Persistent WhatsApp quick-connect — conversion-critical, do not remove or
 * bury in a redesign (CLAUDE.md §6).
 */
export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi Settle Furnitures, I'd like to know more about your collection.",
  );
  const href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
      aria-label="Chat with us on WhatsApp"
      className="bg-whatsapp shadow-large fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-105"
    >
      <WhatsAppIcon />
    </a>
  );
}

"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SITE_CONFIG } from "@/constants/site";
import { WhatsAppIcon } from "@/components/ui/icons";
import { fadeUp, viewportOnce } from "@/lib/animations";

// CLIENT TO CONFIRM — the primary email is still "[primary email]" in the content document, so none is shown yet.
const PHONE = "+91 90421 12233";

/**
 * "Talk to us directly": phone and WhatsApp quick connect, split out into its own section now that Location &
 * Map (sections/contact/LocationSection.tsx) has its own premium card
 * treatment and no longer shares a row with this block.
 */
export function WhatsAppQuickConnect() {
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;

  return (
    <section className="border-border bg-surface py-section-sm border-y">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center"
        >
          <SectionHeading
            align="center"
            title="Talk to us directly"
            description="Quick questions or order status, message us directly."
            className="mx-auto"
          />
          <p className="text-muted mt-4 text-sm">
            Phone:{" "}
            <a
              href={`tel:${PHONE.replace(/s/g, "")}`}
              className="text-ink font-medium underline-offset-4 hover:underline"
            >
              {PHONE}
            </a>
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whatsapp mt-6 inline-flex h-12 items-center gap-2 rounded px-8 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat On WhatsApp
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

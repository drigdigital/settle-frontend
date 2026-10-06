"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SITE_CONFIG } from "@/constants/site";
import { WhatsAppIcon } from "@/components/ui/icons";
import { fadeUp, viewportOnce } from "@/lib/animations";

/**
 * WhatsApp Quick Connect, split out into its own section now that Location &
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
            title="WhatsApp Quick Connect"
            description="For quick questions, order status or a fast reply, message the Settle team directly on WhatsApp, no form required."
            className="mx-auto"
          />
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

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

/**
 * Smart routing (enquiry form) section. Same premium-background treatment as
 * ContactHero, but with a light overlay instead of a dark one — the section
 * still holds a form built from light `bg-surface` inputs (Input/Select/
 * Textarea), so a dark backdrop would fight the existing form styling
 * instead of the background image.
 */
export function ContactPageClient() {
  return (
    <section
      id="enquiry-form"
      className="border-border bg-surface py-section-sm relative overflow-hidden border-y"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/placeholder.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10"
        />
        <div className="bg-surface/90 absolute inset-0" />
      </div>

      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start"
        >
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow="Smart routing"
              title="Send us an enquiry"
              description="Tell us what you need and we'll route it to the right department automatically."
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <EnquiryForm page="/contact" allowTypeSelection submitLabel="Send Message" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

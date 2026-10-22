"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

/**
 * Smart routing (enquiry form) section over a soft living-room photo. A light
 * overlay keeps it subtle, since the form is built from light `bg-surface`
 * inputs (Input/Select/Textarea) and its labels need to stay readable.
 *
 * PLACEHOLDER PHOTOGRAPHY — royalty-free stock photo (Unsplash License).
 */
export function ContactPageClient() {
  return (
    <section
      id="enquiry-form"
      className="border-border bg-surface py-section-sm relative overflow-hidden border-y"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero/living-room-sofa-sunlit.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="bg-surface/85 absolute inset-0" />
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
              title="Send us a message"
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

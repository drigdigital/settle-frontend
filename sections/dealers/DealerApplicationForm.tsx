"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

/**
 * Full-bleed background image (same dark base + dimmed image + solid overlay
 * technique as DealersHero/ContactHero), with the caption on the left and
 * the form — in its own opaque card so the photo never affects its
 * readability — on the right.
 */
export function DealerApplicationForm() {
  return (
    <section
      id="apply"
      className="bg-ink text-paper relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/dealers-partnership.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="bg-ink/70 absolute inset-0" />
      </div>

      <Container className="relative py-16">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center"
        >
          <motion.div variants={fadeUp}>
            <p className="text-paper/80 text-sm font-medium tracking-widest uppercase">Apply</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Dealer Application Form
            </h2>
            <p className="text-paper/80 mt-4 max-w-md">
              Tell us about your business, and our partnerships team will be in touch.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="bg-surface shadow-large rounded-lg p-6 sm:p-8">
              <EnquiryForm type="dealer" page="/dealers" submitLabel="Submit Application" />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

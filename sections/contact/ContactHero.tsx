"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * Full-bleed image hero for the Contact page: a showroom photo under a dark
 * left-to-right scrim, so the copy on the left keeps strong contrast while
 * the room stays visible on the right (a stronger, even scrim on phones).
 *
 * PLACEHOLDER PHOTOGRAPHY — royalty-free stock photo (Unsplash License).
 * Replace with a photo of a Settle showroom or plant.
 */
export function ContactHero() {
  return (
    <section className="bg-ink text-paper relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/dealers-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="bg-ink/70 lg:from-ink/90 lg:via-ink/70 lg:to-ink/25 absolute inset-0 lg:bg-transparent lg:bg-linear-to-r" />
      </div>

      <Container className="py-section relative">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-paper/70 text-sm font-semibold tracking-widest uppercase"
          >
            Contact Us
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            Reach the right team, the first time.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-paper/80 mt-6 max-w-xl text-lg">
            Furnishing a home, placing a bulk order, becoming a partner or planning a plant visit:
            tell us what you need and we’ll route it to the right person.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

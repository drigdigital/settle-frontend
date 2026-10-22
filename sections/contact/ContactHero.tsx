"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * Full-bleed image hero for the Contact page — same treatment as the
 * homepage Hero (sections/home/Hero.tsx): dark base + dimmed image + a solid
 * overlay on top so text contrast holds regardless of what the underlying
 * image looks like once real photography replaces the placeholder.
 */
export function ContactHero() {
  return (
    <section className="bg-ink text-paper relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/placeholder.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="bg-ink/60 absolute inset-0" />
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

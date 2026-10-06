"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * Full-bleed, full-viewport image hero — same base technique as
 * ContactHero/DealersHero (dark base + dimmed image), but with a
 * left-to-right gradient overlay instead of a flat one: strong enough behind
 * the text to guarantee contrast, fading out toward the right so the real
 * showroom photo (public/images/experience-center-hero.jpg) still reads as
 * warm and premium rather than uniformly dark.
 */
export function ExperienceCenterHero() {
  return (
    <section className="bg-ink text-paper relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/experience-center-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="from-ink/85 via-ink/55 absolute inset-0 bg-linear-to-r to-transparent" />
      </div>

      <Container className="relative py-24">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Experience Center
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-xl font-medium sm:text-2xl">
            Walk through Settle before it&apos;s in your home.
          </motion.p>
          <motion.p variants={fadeUp} className="text-paper/80 mt-6 max-w-xl text-lg">
            Our Experience Center sits inside Vaanam Furniture&apos;s own manufacturing facility in
            Coimbatore, the same floor where every Settle piece is built. It&apos;s where retailers,
            dealers and customers come to see full room setups, run a hand over real finishes, and
            get a feel for how Settle lives.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

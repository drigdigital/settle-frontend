"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * Full-bleed image hero — same technique as the homepage Hero and
 * ContactHero: dark base + dimmed image + a solid overlay on top so text
 * contrast holds regardless of the underlying photo. Background photo is a
 * real furniture showroom floor (public/images/dealers-hero.jpg).
 */
export function DealersHero() {
  return (
    <section className="bg-ink text-paper relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/dealers-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="bg-ink/70 absolute inset-0" />
      </div>

      <Container className="relative flex min-h-screen flex-col justify-center py-24">
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
            Dealers &amp; Partners
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-xl font-medium sm:text-2xl">
            Grow with a manufacturer that backs its dealers.
          </motion.p>
          <motion.p variants={fadeUp} className="text-paper/80 mt-6 max-w-xl text-lg">
            Settle Furniture is one of three brands manufactured by Vaanam Furniture in Coimbatore,
            alongside Chera and Kov. As a dealer or partner, you&apos;re backed by that same
            in-house manufacturing strength, consistent quality, and a team invested in your
            store&apos;s success, not just your next order.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

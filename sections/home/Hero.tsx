"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="bg-ink text-paper relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/placeholder.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </div>

      <Container className="relative flex min-h-[70vh] flex-col justify-center py-24 sm:min-h-[80vh]">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-paper/80 text-sm font-medium tracking-widest uppercase"
          >
            Settle Furnitures
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Furniture built to settle in for a lifetime.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-paper/80 mt-6 max-w-lg text-base sm:text-lg">
            Seasoned Mahogany and Teak, crafted into wardrobes, sofas, dining sets and more — browse
            the showroom and enquire, we&apos;ll take it from there.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/collections"
              className="bg-paper text-ink inline-flex h-12 items-center rounded px-8 text-sm font-medium transition-opacity duration-200 hover:opacity-90"
            >
              Explore Collections
            </Link>
            <Link
              href="/contact"
              className="border-paper/40 text-paper hover:bg-paper/10 inline-flex h-12 items-center rounded border px-8 text-sm font-medium transition-colors duration-200"
            >
              Book a Walkthrough
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

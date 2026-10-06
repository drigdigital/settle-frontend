"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function B2BHighlight() {
  return (
    <section className="py-section">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-ink text-paper grid items-center gap-10 rounded-lg px-8 py-14 sm:px-14 lg:grid-cols-2"
        >
          <div>
            <p className="text-paper/70 text-sm font-medium tracking-widest uppercase">
              For Businesses
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Bulk and dealer solutions, built around your project
            </h2>
            <p className="text-paper/80 mt-4 max-w-md">
              Hotels, offices, and dealer partners get dedicated pricing, a structured process, and
              a single point of contact from enquiry to delivery.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link
              href="/business"
              className="bg-paper text-ink inline-flex h-12 items-center rounded px-8 text-sm font-medium hover:opacity-90"
            >
              Explore B2B Solutions
            </Link>
            <Link
              href="/dealers"
              className="border-paper/40 text-paper hover:bg-paper/10 inline-flex h-12 items-center rounded border px-8 text-sm font-medium"
            >
              Become a Dealer
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function FinalCTA() {
  return (
    <section className="border-border bg-ink py-section text-paper border-t">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to settle in?</h2>
          <p className="text-paper/80 mx-auto mt-4 max-w-md">
            Browse the full collection or talk to us directly — we&apos;ll help you find the right
            piece.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/collections"
              className="bg-paper text-ink inline-flex h-12 items-center rounded px-8 text-sm font-medium hover:opacity-90"
            >
              Browse Collections
            </Link>
            <Link
              href="/contact"
              className="border-paper/40 text-paper hover:bg-paper/10 inline-flex h-12 items-center rounded border px-8 text-sm font-medium"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

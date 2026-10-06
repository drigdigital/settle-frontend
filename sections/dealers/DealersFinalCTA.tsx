"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, viewportOnce, smoothScrollTo } from "@/lib/animations";

export function DealersFinalCTA() {
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
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Settle Furniture. Built to grow with the people who sell it.
          </h2>
          <div className="mt-8">
            <a
              href="#apply"
              onClick={(event) => {
                event.preventDefault();
                smoothScrollTo("apply");
              }}
              className="bg-paper text-ink inline-flex h-12 items-center rounded px-8 text-sm font-medium transition-opacity duration-200 hover:opacity-90"
            >
              Become A Dealer
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

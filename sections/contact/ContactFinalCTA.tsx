"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, viewportOnce, smoothScrollTo } from "@/lib/animations";

export function ContactFinalCTA() {
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
            Settle Furniture. Always within reach.
          </h2>
          <div className="mt-8">
            <a
              href="#enquiry-form"
              onClick={(event) => {
                event.preventDefault();
                smoothScrollTo("enquiry-form");
              }}
              className="bg-paper text-ink inline-flex h-12 items-center rounded px-8 text-sm font-medium transition-opacity duration-200 hover:opacity-90"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

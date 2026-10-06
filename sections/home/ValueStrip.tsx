"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const VALUES = [
  {
    title: "Seasoned Hardwood",
    description: "Mahogany and Teak, kiln-seasoned for lasting stability.",
  },
  {
    title: "Made to Order",
    description: "Every piece is built for you — finish, size, and configuration.",
  },
  {
    title: "Bulk & Dealer Ready",
    description: "Volume pricing and a dedicated process for B2B orders.",
  },
  {
    title: "Showroom Experience",
    description: "See and feel the craftsmanship before you decide.",
  },
];

export function ValueStrip() {
  return (
    <section className="border-border bg-surface py-section-sm border-y">
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VALUES.map((value) => (
            <motion.div key={value.title} variants={fadeUp}>
              <h3 className="text-ink text-base font-semibold">{value.title}</h3>
              <p className="text-muted mt-2 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

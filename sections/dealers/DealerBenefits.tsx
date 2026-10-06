"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LayersIcon, TagIcon, MegaphoneIcon, TruckIcon } from "@/components/ui/icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const BENEFITS = [
  {
    icon: LayersIcon,
    title: "Three brands, one partner",
    body: "Access Chera, Settle and Kov through a single relationship, covering multiple price points and styles.",
  },
  {
    icon: TagIcon,
    title: "Competitive dealer pricing",
    body: "Margins built for sustainable retail business.",
  },
  {
    icon: MegaphoneIcon,
    title: "Marketing and launch support",
    body: "Co-branded campaigns and material to help new collections sell.",
  },
  {
    icon: TruckIcon,
    title: "Reliable supply",
    body: "Consistent stock from an in-house manufacturing floor, not third-party sourcing.",
  },
];

export function DealerBenefits() {
  return (
    <section className="border-border bg-surface py-section border-y">
      <Container>
        <SectionHeading
          eyebrow="Partnership"
          title="Dealer Benefits"
          description="Partnering with Settle means more than stocking furniture."
        />
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BENEFITS.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={fadeUp}
              className="shadow-soft hover:shadow-medium rounded-lg p-6 transition-shadow duration-200"
            >
              <span className="bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-full">
                <benefit.icon className="h-6 w-6" />
              </span>
              <h3 className="text-ink mt-4 text-base font-semibold">{benefit.title}</h3>
              <p className="text-muted mt-2 text-sm">{benefit.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

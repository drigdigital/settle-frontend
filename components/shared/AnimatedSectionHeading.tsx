"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeUp, viewportOnce } from "@/lib/animations";

/** Centred SectionHeading that fades up on scroll; used by the viewport sections on the Business and Experience Center pages. */
export function AnimatedSectionHeading({
  id,
  eyebrow,
  heading,
  description,
  tone = "navy",
}: {
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  tone?: "navy" | "inverse";
}) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
      <SectionHeading
        id={id}
        eyebrow={eyebrow}
        title={heading}
        description={description}
        align="center"
        tone={tone}
        className="max-w-3xl text-balance"
      />
    </motion.div>
  );
}

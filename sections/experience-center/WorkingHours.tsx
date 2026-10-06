"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const HOURS = [
  { day: "Monday – Saturday", time: "10:00 AM – 7:00 PM" },
  { day: "Public holidays", time: "Closed" },
];

/**
 * Concise information strip, now a full-bleed band in the logo's primary
 * orange (--color-primary, #F5821F). Text stays text-ink (not text-muted or
 * the shared SectionHeading, which use lighter tones) since dark ink text
 * clears ~6.5:1 contrast against this orange — comfortably past WCAG AA —
 * while the site's default muted/accent tones would drop below 3:1 here.
 */
export function WorkingHours() {
  return (
    <section className="bg-primary py-section-sm">
      <Container>
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <motion.div variants={fadeUp} className="text-ink max-w-2xl">
            <p className="mb-3 text-sm font-medium tracking-widest uppercase">Working Hours</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Working Hours</h2>
            <p className="mt-4 text-base">
              The Experience Center is open through the week, with visits best booked in advance so
              a team member can walk you through the range.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-ink min-w-64 space-y-2">
            {HOURS.map((slot) => (
              <div key={slot.day} className="flex justify-between gap-8 text-sm">
                <span>{slot.day}</span>
                <span>{slot.time}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

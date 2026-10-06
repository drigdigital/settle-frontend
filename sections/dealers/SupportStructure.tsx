"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeUp, viewportOnce } from "@/lib/animations";

const SUPPORT = [
  {
    title: "Onboarding and store setup",
    body: "Guidance on layout, merchandising and initial stock selection.",
  },
  {
    title: "Dedicated account support",
    body: "A single point of contact for orders, queries and escalations.",
  },
  {
    title: "Logistics and fulfillment",
    body: "Planned delivery timelines so your floor is never short of stock.",
  },
  {
    title: "Training and product knowledge",
    body: "Briefings on new collections so your team can sell with confidence.",
  },
];

/**
 * Same image/text row used for the About page's Manufacturing section
 * (sections/home/ExperienceCenterPreview.tsx follows the identical pattern),
 * used here as a single block covering all four support pillars.
 */
export function SupportStructure() {
  return (
    <section className="py-section">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-ink/10 relative aspect-4/3 overflow-hidden rounded-lg"
        >
          <Image
            src="/images/dealers-support.jpg"
            alt="Settle account support representative assisting a dealer"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <SectionHeading eyebrow="Support" title="Support Structure" />
          <p className="text-muted mt-4">
            Every dealer is backed by a dedicated support structure at each stage of the
            relationship.
          </p>
          <div className="mt-8 space-y-6">
            {SUPPORT.map((item) => (
              <div key={item.title}>
                <h3 className="text-ink text-base font-semibold">{item.title}</h3>
                <p className="text-muted mt-1 text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

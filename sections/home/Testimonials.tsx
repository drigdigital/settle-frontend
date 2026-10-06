"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StarIcon } from "@/components/ui/icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { Testimonial } from "@/types/admin";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-section">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="What our customers say"
          className="mx-auto"
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.figure
              key={testimonial._id}
              variants={fadeUp}
              className="bg-surface shadow-soft rounded-lg p-6"
            >
              <div className="text-accent flex gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} filled={index < testimonial.rating} />
                ))}
              </div>
              <blockquote className="text-ink mt-4 text-sm">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="text-muted mt-4 text-sm font-medium">
                {testimonial.name}
                {testimonial.location && (
                  <span className="font-normal"> · {testimonial.location}</span>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

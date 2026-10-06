"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function ExperienceCenterPreview() {
  return (
    <section className="bg-surface py-section">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative aspect-4/3 overflow-hidden rounded-lg"
        >
          <Image
            src="/images/placeholder.svg"
            alt="Settle Experience Center showroom"
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
          <SectionHeading
            eyebrow="Experience Center"
            title="See it, sit in it, decide with confidence"
          />
          <p className="text-muted mt-4 max-w-md">
            Walk through our showroom floor before you order — book a slot and one of our
            consultants will guide you through the collection in person.
          </p>
          <Link
            href="/experience-center"
            className="bg-primary text-primary-foreground mt-8 inline-flex h-12 items-center rounded px-8 text-sm font-medium hover:opacity-90"
          >
            Book a Walkthrough
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

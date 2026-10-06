"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

/**
 * Two-column layout: a real showroom photo as the left visual, with the
 * heading and description centered on top of it, and the walkthrough
 * EnquiryForm on the right. Replaces the previous faint full-section
 * background-image treatment now that the photo is a proper visual element
 * in its own right rather than a backdrop.
 */
export function WalkthroughBookingForm() {
  return (
    <section id="book" className="border-border bg-surface py-section-sm border-y">
      <Container>
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-10 lg:grid-cols-2 lg:items-stretch"
        >
          <motion.div
            variants={fadeUp}
            className="bg-ink relative aspect-4/3 overflow-hidden rounded-lg lg:aspect-auto"
          >
            <Image
              src="/images/walkthrough-booking.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="bg-ink/60 absolute inset-0" />
            <div className="text-paper relative flex h-full flex-col items-center justify-center p-8 text-center sm:p-10">
              <p className="text-paper/80 text-sm font-medium tracking-widest uppercase">
                Book a slot
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Walkthrough Booking Form
              </h2>
              <p className="text-paper/80 mt-4 max-w-sm">
                Reserve a slot and a member of our team will be ready for you at the door.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <EnquiryForm
              type="walkthrough"
              page="/experience-center"
              submitLabel="Book A Walkthrough"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

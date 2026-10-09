"use client";

import { motion } from "framer-motion";
import { LocationMapCard } from "@/components/shared/LocationMapCard";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { fadeUp, viewportOnce } from "@/lib/animations";
import type { VisitDetailsContent } from "@/types/experienceCenter";

const HEADING_ID = "location-heading";
const HOURS_HEADING_ID = "working-hours-heading";

/**
 * Experience Center Section 02: the shared location + map card (same as the
 * Contact page) with the working hours as a navy band beneath it, so where
 * and when to visit read as one screen. Gold-light on navy is 5.9:1.
 */
export function VisitDetails({ content }: { content: VisitDetailsContent }) {
  const { heading, description, location, hours } = content;

  return (
    <ViewportSection tone="linen" labelledBy={HEADING_ID}>
      <LocationMapCard
        eyebrow="02"
        title={heading}
        description={description}
        name={location.name}
        addressLines={location.addressLines}
        phone={location.phone}
        emails={location.emails}
        mapQuery={`${location.name}, ${location.addressLines.join(" ")}`}
        headingId={HEADING_ID}
      />

      <motion.section
        aria-labelledby={HOURS_HEADING_ID}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="bg-navy focus-ring-gold mt-6 grid gap-6 rounded-xl p-8 sm:p-10 lg:grid-cols-5 lg:items-center lg:gap-12"
      >
        <div className="lg:col-span-3">
          <h2
            id={HOURS_HEADING_ID}
            className="text-paper text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {hours.heading}
          </h2>
          <p className="text-paper/80 mt-3 max-w-xl text-base">{hours.description}</p>
        </div>

        <div className="lg:col-span-2">
          <dl className="space-y-3">
            {hours.slots.map((slot) => (
              <div
                key={slot.day}
                className="border-paper/10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b pb-3"
              >
                <dt className="text-gold-light text-sm font-medium">{slot.day}</dt>
                <dd className="text-paper text-base font-semibold">{slot.time}</dd>
              </div>
            ))}
          </dl>
          {hours.note && <p className="text-paper/70 mt-3 text-sm">{hours.note}</p>}
        </div>
      </motion.section>
    </ViewportSection>
  );
}

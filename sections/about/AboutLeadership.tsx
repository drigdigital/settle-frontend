"use client";

import { motion } from "framer-motion";
import { ProfileCard } from "@/components/shared/ProfileCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { AboutLeadershipContent } from "@/types/about";

const HEADING_ID = "leadership-heading";

/**
 * About page Section 05: leadership profile grid. Shows real profiles when
 * present; until then, reserved "coming soon" cards hold the layout. Content
 * lives in constants/about.ts.
 */
export function AboutLeadership({ content }: { content: AboutLeadershipContent }) {
  const { eyebrow, heading, profiles, reservedTitles } = content;
  const hasProfiles = profiles.length > 0;

  return (
    <ViewportSection tone="linen" labelledBy={HEADING_ID}>
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <SectionHeading
          id={HEADING_ID}
          eyebrow={eyebrow}
          title={heading}
          align="center"
          tone="navy"
          className="text-balance"
        />
      </motion.div>

      <motion.ul
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {hasProfiles
          ? profiles.map((profile) => (
              <motion.li key={profile.id} variants={fadeUp}>
                <ProfileCard profile={profile} />
              </motion.li>
            ))
          : reservedTitles.map((title) => (
              <motion.li key={title} variants={fadeUp}>
                <ProfileCard reservedTitle={title} />
              </motion.li>
            ))}
      </motion.ul>
    </ViewportSection>
  );
}

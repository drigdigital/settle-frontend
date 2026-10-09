"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSectionHeading } from "@/components/shared/AnimatedSectionHeading";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { StoreGalleryContent } from "@/types/experienceCenter";

const HEADING_ID = "store-gallery-heading";

/**
 * Experience Center Section 01: a straight photo gallery of the showroom
 * floor, one 4:5 frame per area with its caption beneath. 2 × 2 below `lg`,
 * one row of four from `lg`, capped in width so the row fits one screen.
 */
export function StoreGallery({ content }: { content: StoreGalleryContent }) {
  const { eyebrow, heading, description, items } = content;

  return (
    <ViewportSection labelledBy={HEADING_ID}>
      <AnimatedSectionHeading
        id={HEADING_ID}
        eyebrow={eyebrow}
        heading={heading}
        description={description}
      />

      <motion.ul
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:mt-14 lg:grid-cols-4"
      >
        {items.map((item) => (
          <motion.li key={item.id} variants={fadeUp}>
            <figure className="group">
              <div className="bg-wood-sand relative aspect-4/5 overflow-hidden rounded-xl">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 15rem, 45vw"
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  style={{ objectPosition: item.image.objectPosition }}
                />
              </div>
              <figcaption className="text-navy mt-3 text-sm font-medium sm:text-base">
                {item.caption}
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </motion.ul>
    </ViewportSection>
  );
}

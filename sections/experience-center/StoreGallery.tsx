"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSectionHeading } from "@/components/shared/AnimatedSectionHeading";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { StoreGalleryContent } from "@/types/experienceCenter";

const HEADING_ID = "store-gallery-heading";

/**
 * Our Plants Section 01 ("What you can see"): one photo per stop on a plant
 * visit, with its caption beneath. Two square frames per row on phones and
 * tablets (an odd last frame centres on its own row), one row of 4:5 frames
 * from `lg`, capped in width so the row fits one screen.
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
        className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-4 lg:mt-12 lg:grid-cols-5 lg:gap-6"
      >
        {items.map((item) => (
          <motion.li
            key={item.id}
            variants={fadeUp}
            className="odd:last:col-span-2 odd:last:mx-auto odd:last:w-1/2 lg:odd:last:col-span-1 lg:odd:last:w-auto"
          >
            <figure className="group">
              <div className="bg-wood-sand relative aspect-square overflow-hidden rounded-xl lg:aspect-4/5">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 14rem, 45vw"
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                  style={{ objectPosition: item.image.objectPosition }}
                />
              </div>
              <figcaption className="mt-3 text-sm lg:text-base">
                {item.title ? (
                  <>
                    <span className="text-navy font-semibold">{item.title}</span>
                    <span className="text-muted block">{item.caption}</span>
                  </>
                ) : (
                  <span className="text-navy font-medium">{item.caption}</span>
                )}
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </motion.ul>
    </ViewportSection>
  );
}

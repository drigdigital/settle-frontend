"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSectionHeading } from "@/components/shared/AnimatedSectionHeading";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { BusinessAudience, BusinessSection } from "@/types/business";

const HEADING_ID = "who-we-work-with-heading";

/**
 * For Businesses Section 02: one card per audience (dealers, distributors,
 * corporate) with its promise, benefits and own CTA, on navy. Stacked on
 * phones/tablets, three across from `lg`.
 */
export function WhoWeWorkWith({ content }: { content: BusinessSection<BusinessAudience> }) {
  const { eyebrow, heading, description, items } = content;

  return (
    <ViewportSection tone="navy" labelledBy={HEADING_ID}>
      <AnimatedSectionHeading
        id={HEADING_ID}
        eyebrow={eyebrow}
        heading={heading}
        description={description}
        tone="inverse"
      />

      <motion.ul
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-8 grid gap-4 sm:gap-6 lg:mt-12 lg:grid-cols-3"
      >
        {items.map((item) => (
          <motion.li
            key={item.id}
            variants={fadeUp}
            className="border-paper/10 bg-paper/5 hover:border-gold/40 flex flex-col rounded-xl border p-6 transition-colors duration-300 sm:p-8"
          >
            <div className="flex-1">
              <h3 className="text-paper text-xl font-semibold sm:text-2xl">{item.title}</h3>
              <p className="text-gold-light mt-2 text-sm font-medium">{item.audience}</p>
              <p className="text-paper/80 mt-4 text-base leading-relaxed">{item.lead}</p>

              <ul className="mt-6 space-y-3">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="text-paper/80 flex gap-3 text-sm leading-relaxed sm:text-base"
                  >
                    <CheckIcon className="text-gold mt-0.5 size-5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              {item.industries && (
                <div className="border-paper/10 mt-6 border-t pt-5">
                  <p className="text-paper text-xs font-semibold tracking-widest uppercase">
                    {item.industries.label}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {item.industries.items.map((industry) => (
                      <li
                        key={industry}
                        className="border-paper/15 text-paper/80 rounded-full border px-3 py-1 text-xs"
                      >
                        {industry}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              href={item.cta.href}
              className={cn(
                buttonVariants({ variant: "gold", size: "md" }),
                "group/cta mt-8 inline-flex w-full items-center justify-center gap-2",
              )}
            >
              {item.cta.label}
              <ArrowRightIcon className="size-4 transition-transform duration-300 motion-safe:group-hover/cta:translate-x-1" />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </ViewportSection>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { ProcessStep } from "@/types/business";

/**
 * Numbered process as an ordered list: a vertical timeline on phones and
 * tablets, a horizontal strip with a connecting rule from `lg`. Steps stagger
 * in on scroll. Numbers are gold-light on navy (5.9:1).
 */
export function ProcessSteps({ steps, className }: { steps: ProcessStep[]; className?: string }) {
  return (
    <motion.ol
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("grid gap-8 lg:grid-cols-4 lg:gap-6", className)}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <motion.li
            key={step.id}
            variants={fadeUp}
            className="relative flex gap-5 lg:flex-col lg:gap-6"
          >
            {/* Connector to the next step: down on phones/tablets, across from `lg`. */}
            {!isLast && (
              <span
                aria-hidden="true"
                className="bg-gold/40 absolute top-12 -bottom-8 left-6 w-px lg:top-6 lg:right-0 lg:bottom-auto lg:left-12 lg:-mr-6 lg:h-px lg:w-auto"
              />
            )}
            <span
              aria-hidden="true"
              className="bg-navy text-gold-light relative flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold tracking-wider"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="pt-2 lg:pt-0">
              <h3 className="text-navy text-lg font-semibold">
                <span className="sr-only">{`Step ${index + 1}: `}</span>
                {step.title}
              </h3>
              <p className="text-muted mt-2 text-base leading-relaxed">{step.body}</p>
            </div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

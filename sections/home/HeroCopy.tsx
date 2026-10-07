"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { HeroContent } from "@/types/hero";

const CTA_CLASSES = "focus-visible:outline-paper w-full text-center sm:w-auto";

/** Headline → subtext → CTAs, staggered in on load. */
export function HeroCopy({ content }: { content: HeroContent }) {
  const { headline, subtext, primaryCta, secondaryCta } = content;

  return (
    <motion.div
      variants={staggerContainer(0.15, 0.1)}
      initial="hidden"
      animate="visible"
      className="max-w-xl lg:max-w-2xl"
    >
      <motion.h1
        variants={fadeUp}
        className="text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl"
      >
        {headline}
      </motion.h1>
      <motion.p variants={fadeUp} className="text-paper/85 mt-6 max-w-xl text-base sm:text-lg">
        {subtext}
      </motion.p>
      <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link
          href={primaryCta.href}
          className={cn(buttonVariants({ variant: "primary", size: "lg" }), CTA_CLASSES)}
        >
          {primaryCta.label}
        </Link>
        <Link
          href={secondaryCta.href}
          className={cn(buttonVariants({ variant: "outlineInverse", size: "lg" }), CTA_CLASSES)}
        >
          {secondaryCta.label}
        </Link>
      </motion.div>
    </motion.div>
  );
}

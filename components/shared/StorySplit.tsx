"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/utils/cn";
import type { PageImage, StoryContent } from "@/types/page";

const TEXT_TONES = {
  light: {
    eyebrow: "text-gold-deep",
    heading: "text-navy",
    body: "text-muted",
    ring: "ring-paper",
    pointTitle: "text-navy",
    pointRule: "border-gold",
  },
  // gold-light: plain gold text on navy is 4.6:1, gold-light 5.9:1.
  dark: {
    eyebrow: "text-gold-light",
    heading: "text-paper",
    body: "text-paper/80",
    ring: "ring-navy",
    pointTitle: "text-paper",
    pointRule: "border-gold/60",
  },
} as const;

function Frame({
  image,
  sizes,
  className,
}: {
  image: PageImage;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn("group bg-wood-sand relative overflow-hidden rounded-xl", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
        style={{ objectPosition: image.objectPosition }}
      />
    </div>
  );
}

/** 1 image: one frame. 2: large frame with a smaller one overlapping its corner. 4: 2 × 2 mosaic. */
function StoryMedia({ images, ring }: { images: PageImage[]; ring: string }) {
  if (images.length >= 4) {
    return (
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-3 sm:gap-4 lg:mx-0">
        {images.slice(0, 4).map((image) => (
          <Frame
            key={image.src}
            image={image}
            sizes="(min-width: 1024px) 18rem, 45vw"
            className="aspect-square"
          />
        ))}
      </div>
    );
  }

  const [primary, secondary] = images;
  if (!primary) return null;

  if (secondary) {
    return (
      <div className="relative pb-10 sm:pb-12">
        <Frame
          image={primary}
          sizes="(min-width: 1024px) 40vw, 85vw"
          className="aspect-4/3 w-5/6"
        />
        <Frame
          image={secondary}
          sizes="(min-width: 1024px) 20vw, 42vw"
          className={cn("absolute right-0 bottom-0 aspect-4/5 w-5/12 ring-8", ring)}
        />
      </div>
    );
  }

  return <Frame image={primary} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-4/3" />;
}

/**
 * Alternating image/text row in its own viewport-height section: eyebrow,
 * heading, body and an optional titled list beside 1, 2 or 4 photos. The image goes on top on phones
 * and tablets and to the chosen side from `lg`. Media scales in and the text
 * staggers up on scroll.
 */
export function StorySplit({ story }: { story: StoryContent }) {
  const { id, eyebrow, heading, body, points, images, imageSide, tone } = story;
  const textTone = TEXT_TONES[tone === "navy" ? "dark" : "light"];
  const headingId = `${id}-heading`;

  return (
    <ViewportSection tone={tone} labelledBy={headingId}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={cn(imageSide === "right" && "lg:order-last")}
        >
          <StoryMedia images={images} ring={textTone.ring} />
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-xl"
        >
          <motion.p
            variants={fadeUp}
            className={cn("text-sm font-medium tracking-widest uppercase", textTone.eyebrow)}
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id={headingId}
            className={cn(
              "mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
              textTone.heading,
            )}
          >
            {heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className={cn("mt-6 text-base leading-relaxed sm:text-lg", textTone.body)}
          >
            {body}
          </motion.p>
          {points && points.length > 0 && (
            <dl className="mt-8 space-y-5">
              {points.map((point) => (
                <motion.div
                  key={point.id}
                  variants={fadeUp}
                  className={cn("border-l-2 pl-4", textTone.pointRule)}
                >
                  <dt className={cn("text-base font-semibold", textTone.pointTitle)}>
                    {point.title}
                  </dt>
                  <dd className={cn("mt-1 text-sm leading-relaxed sm:text-base", textTone.body)}>
                    {point.body}
                  </dd>
                </motion.div>
              ))}
            </dl>
          )}
        </motion.div>
      </div>
    </ViewportSection>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { ViewportSection } from "@/components/shared/ViewportSection";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { EnquiryType } from "@/types/enquiry";
import type { EnquirySectionContent, PageImage } from "@/types/page";

/**
 * Viewport section pairing a heading block with the shared EnquiryForm in a
 * card: side by side from `lg` (2 : 3), stacked below. The left column can
 * carry an optional photo above the heading and a direct-contact line below
 * it. A form is taller than a phone screen, so the section grows past one
 * viewport there rather than clipping fields.
 */
export function EnquirySection({
  id,
  tone = "linen",
  content,
  formType,
  page,
  contact,
  image,
}: {
  /** Anchor target (e.g. "book" for /experience-center#book); also prefixes the heading id. */
  id: string;
  tone?: "paper" | "linen";
  content: EnquirySectionContent;
  formType: EnquiryType;
  /** Page path recorded as the enquiry's source. */
  page: string;
  contact?: { label: string; email: string };
  image?: PageImage;
}) {
  const headingId = `${id}-heading`;
  const { eyebrow, heading, description, submitLabel } = content;

  return (
    <ViewportSection id={id} tone={tone} labelledBy={headingId}>
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-10 lg:grid-cols-5 lg:items-center lg:gap-16"
      >
        <motion.div variants={fadeUp} className="lg:col-span-2">
          {image && (
            <div className="bg-wood-sand relative mb-8 aspect-4/3 overflow-hidden rounded-xl sm:aspect-video">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
                style={{ objectPosition: image.objectPosition }}
              />
            </div>
          )}
          <p className="text-gold-deep text-sm font-medium tracking-widest uppercase">{eyebrow}</p>
          <h2
            id={headingId}
            className="text-navy mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {heading}
          </h2>
          <p className="text-muted mt-4 max-w-md text-base sm:text-lg">{description}</p>
          {contact && (
            <p className="border-navy/10 mt-8 border-t pt-6 text-sm">
              <span className="text-navy block font-semibold">{contact.label}</span>
              <a
                href={`mailto:${contact.email}`}
                className="text-muted hover:text-navy underline-offset-4 hover:underline"
              >
                {contact.email}
              </a>
            </p>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="bg-surface shadow-medium rounded-xl p-6 sm:p-8 lg:col-span-3"
        >
          <EnquiryForm type={formType} page={page} submitLabel={submitLabel} />
        </motion.div>
      </motion.div>
    </ViewportSection>
  );
}

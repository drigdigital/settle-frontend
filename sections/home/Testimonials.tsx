import { Container } from "@/components/shared/Container";
import { LogoMarquee } from "@/components/shared/LogoMarquee";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCarousel } from "@/components/shared/TestimonialCarousel";
import {
  CLIENT_LOGOS,
  TESTIMONIALS_AUTOPLAY_MS,
  TESTIMONIALS_CONTENT,
} from "@/constants/testimonials";
import { cn } from "@/utils/cn";
import type { Testimonial } from "@/types/testimonial";

const HEADING_ID = "testimonials-heading";
const LOGOS_LABEL_ID = "partner-logos-label";

/**
 * Homepage Section 07 — testimonial carousel above a partner logo marquee.
 * Testimonials come from getFeaturedTestimonials() (services/testimonials.ts);
 * copy and logos live in constants/testimonials.ts. Either half hides when
 * its data is empty; the section hides when both are.
 */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const logos = CLIENT_LOGOS;
  const hasTestimonials = testimonials.length > 0;
  if (!hasTestimonials && logos.length === 0) return null;

  const { eyebrow, heading, logoStripLabel } = TESTIMONIALS_CONTENT;

  return (
    <section
      aria-labelledby={hasTestimonials ? HEADING_ID : LOGOS_LABEL_ID}
      className="bg-cream py-section-sm lg:py-section"
    >
      <Container>
        {hasTestimonials && (
          <TestimonialCarousel
            testimonials={testimonials}
            autoplayMs={TESTIMONIALS_AUTOPLAY_MS}
            header={
              <SectionHeading
                id={HEADING_ID}
                eyebrow={eyebrow}
                title={heading}
                align="center"
                tone="navy"
                className="text-balance"
              />
            }
          />
        )}

        <LogoMarquee
          logos={logos}
          label={logoStripLabel}
          labelId={LOGOS_LABEL_ID}
          className={cn(hasTestimonials && "border-navy/10 mt-14 border-t pt-12 lg:mt-20 lg:pt-14")}
        />
      </Container>
    </section>
  );
}

import type { ReactNode } from "react";
import { Carousel } from "@/components/shared/Carousel";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import type { Testimonial } from "@/types/testimonial";

/**
 * Testimonial cards on the shared Carousel: 1 card with a peek of the next on
 * phones, 2 from `sm`, 3 from `lg`. Navy/gold controls sit under the track so
 * the heading can be centred. The track is a tab stop, so ← / → work even
 * though the cards hold no links.
 */
export function TestimonialCarousel({
  testimonials,
  label = "Testimonials",
  header,
  autoplayMs,
  className,
}: {
  testimonials: Testimonial[];
  /** Accessible name for the carousel region. */
  label?: string;
  header?: ReactNode;
  autoplayMs?: number;
  className?: string;
}) {
  if (testimonials.length === 0) return null;

  return (
    <Carousel
      label={label}
      slideLabels={testimonials.map((testimonial) => `${testimonial.name}, ${testimonial.role}`)}
      header={header}
      autoplayMs={autoplayMs}
      tone="navy"
      controlsPosition="footer"
      slideClassName="basis-peek-1 sm:basis-fit-2 lg:basis-fit-3"
      itemsLabel="testimonials"
      focusableTrack
      className={className}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial._id} testimonial={testimonial} />
      ))}
    </Carousel>
  );
}

import Image from "next/image";
import { QuoteIcon, StarIcon } from "@/components/ui/icons";
import { cn } from "@/utils/cn";
import { initials } from "@/utils/initials";
import type { Testimonial, TestimonialType } from "@/types/testimonial";

const TYPE_TAGS: Record<TestimonialType, { label: string; className: string }> = {
  dealer: { label: "Dealer", className: "border-navy bg-navy text-paper" },
  // gold-deep text: plain gold on white is only 3:1.
  customer: { label: "Homeowner", className: "border-gold text-gold-deep" },
};

const STARS = [1, 2, 3, 4, 5];

/**
 * One testimonial as a figure: quote mark + trade/consumer tag, optional
 * stars, the quote, then avatar (photo or initials), name and role. Fills its
 * slide's height so cards in a row line up. Lifts on hover; transform only.
 */
export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  const { quote, name, role, type, product, rating, photo } = testimonial;
  const tag = TYPE_TAGS[type];

  return (
    <figure
      className={cn(
        "group bg-surface shadow-soft hover:shadow-medium flex w-full flex-col rounded-xl p-6 transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 sm:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <QuoteIcon className="text-gold group-hover:text-gold-light h-8 w-10 transition-colors duration-300" />
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase",
            tag.className,
          )}
        >
          {tag.label}
        </span>
      </div>

      {rating !== undefined && (
        <div className="text-gold mt-5 flex gap-1">
          <span className="sr-only">{`Rated ${rating} out of 5`}</span>
          {STARS.map((star) => (
            <StarIcon key={star} filled={star <= rating} />
          ))}
        </div>
      )}

      <blockquote className="text-navy mt-5 flex-1 text-base leading-relaxed lg:text-lg">
        <p>{quote}</p>
      </blockquote>

      <figcaption className="border-navy/10 mt-6 flex items-center gap-4 border-t pt-6">
        {photo ? (
          <Image
            src={photo}
            alt=""
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="bg-navy text-gold flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
          >
            {initials(name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="text-navy block font-semibold">{name}</span>
          <span className="text-navy/70 block text-sm">
            {role}
            {product && ` · ${product}`}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

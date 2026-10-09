import { cn } from "@/utils/cn";

type SectionHeadingTone = "default" | "navy" | "inverse";

const TONE_CLASSES: Record<
  SectionHeadingTone,
  { eyebrow: string; title: string; description: string }
> = {
  default: { eyebrow: "text-accent", title: "text-ink", description: "text-muted" },
  // For cream / partner-palette bands.
  navy: { eyebrow: "text-gold-deep", title: "text-navy", description: "text-muted" },
  // For navy bands; gold-light because plain gold text is only 4.6:1 on navy.
  inverse: { eyebrow: "text-gold-light", title: "text-paper", description: "text-paper/80" },
};

export function SectionHeading({
  eyebrow,
  title,
  id,
  description,
  align = "left",
  tone = "default",
  className,
}: {
  eyebrow?: string;
  title: string;
  /** Put on the <h2>, so a parent <section> can reference it with aria-labelledby. */
  id?: string;
  description?: string;
  align?: "left" | "center";
  tone?: SectionHeadingTone;
  className?: string;
}) {
  const toneClasses = TONE_CLASSES[tone];

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn("mb-3 text-sm font-medium tracking-widest uppercase", toneClasses.eyebrow)}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn("text-3xl font-semibold tracking-tight sm:text-4xl", toneClasses.title)}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base", toneClasses.description)}>{description}</p>
      )}
    </div>
  );
}

import { cn } from "@/utils/cn";

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
  /** "navy": navy title and gold-deep eyebrow, for cream / partner-palette bands. */
  tone?: "default" | "navy";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-medium tracking-widest uppercase",
            tone === "navy" ? "text-gold-deep" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-3xl font-semibold tracking-tight sm:text-4xl",
          tone === "navy" ? "text-navy" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && <p className="text-muted mt-4 text-base">{description}</p>}
    </div>
  );
}

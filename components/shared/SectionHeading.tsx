import { cn } from "@/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-accent mb-3 text-sm font-medium tracking-widest uppercase">{eyebrow}</p>
      )}
      <h2 className="text-ink text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="text-muted mt-4 text-base">{description}</p>}
    </div>
  );
}

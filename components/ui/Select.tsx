import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/utils/cn";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, "aria-describedby": describedBy, id, ...props }, ref) => {
    const errorId = error && id ? `${id}-error` : undefined;

    return (
      <div className="relative">
        <select
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={[describedBy, errorId].filter(Boolean).join(" ") || undefined}
          className={cn(
            "border-border bg-surface text-ink h-11 w-full appearance-none rounded border px-4 pr-10 text-sm",
            "focus-visible:border-accent transition-colors duration-200",
            error && "border-danger",
            className,
          )}
          {...props}
        />
        <ChevronDownIcon className="text-muted pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
      </div>
    );
  },
);
Select.displayName = "Select";

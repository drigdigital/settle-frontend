import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, "aria-describedby": describedBy, id, ...props }, ref) => {
    const errorId = error && id ? `${id}-error` : undefined;

    return (
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={[describedBy, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(
          "border-border bg-surface text-ink placeholder:text-muted h-11 w-full rounded border px-4 text-sm",
          "focus-visible:border-accent transition-colors duration-200",
          error && "border-danger",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

import type { LabelHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("text-ink mb-1.5 block text-sm font-medium", className)} {...props} />
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-danger mt-1.5 text-sm">
      {message}
    </p>
  );
}

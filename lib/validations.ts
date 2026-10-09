import { z } from "zod";

/**
 * Shared Zod schema for every enquiry form (B2C, B2B, dealer, walkthrough).
 * Imported by both the client form (React Hook Form resolver) and the
 * `/api/enquiries` route handler — CLAUDE.md §6 requires validation on both
 * sides, never trusting the client alone.
 */
export const B2B_INDUSTRIES = [
  "hospitality",
  "real-estate",
  "corporate",
  "education",
  "retail-dealer",
  "interior-design",
  "other",
] as const;

export const enquirySchema = z
  .object({
    type: z.enum(["general", "b2c", "b2b", "dealer", "walkthrough", "support"]),
    name: z.string().trim().min(2, "Enter your full name").max(100),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .regex(/^[+\d][\d\s-]{7,15}$/, "Enter a valid phone number"),
    message: z.string().trim().max(1000).optional().or(z.literal("")),
    company: z.string().trim().max(150).optional().or(z.literal("")),
    city: z.string().trim().max(100).optional().or(z.literal("")),
    preferredDate: z.string().trim().optional().or(z.literal("")),
    preferredTime: z.string().trim().optional().or(z.literal("")),
    // No empty-string fallback: these are <select>s, so they're either
    // unregistered (form types that don't mount the field) or a real value.
    businessType: z.enum(["retailer", "new-business", "interior-design", "other"]).optional(),
    yearsInBusiness: z.string().trim().max(50).optional().or(z.literal("")),
    visitPurpose: z.enum(["personal", "dealer", "bulk-order"]).optional(),
    visitorCount: z.string().trim().max(10).optional().or(z.literal("")),
    // B2B. Industry's <select> starts on an empty "Select…" option, hence the "" fallback.
    industry: z.enum(B2B_INDUSTRIES).optional().or(z.literal("")),
    productCategories: z.string().trim().max(300).optional().or(z.literal("")),
    estimatedQuantity: z.string().trim().max(100).optional().or(z.literal("")),
    deliveryTimeline: z.string().trim().max(100).optional().or(z.literal("")),
    // Honeypot — real users never fill this in; bots typically do.
    website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
    source: z.object({
      productId: z.string().optional(),
      productName: z.string().optional(),
      productSlug: z.string().optional(),
      page: z.string(),
    }),
  })
  // A B2B lead needs to say who's asking and for what kind of business.
  .superRefine((values, ctx) => {
    if (values.type !== "b2b") return;
    if (!values.company) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["company"],
        message: "Enter your business or company name",
      });
    }
    if (!values.industry) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["industry"],
        message: "Select your industry",
      });
    }
  });

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

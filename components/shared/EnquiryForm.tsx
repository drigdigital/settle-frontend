"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryFormValues } from "@/lib/validations";
import type { BusinessType, EnquiryType, VisitPurpose } from "@/types/enquiry";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Label, FieldError } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { trackEnquirySubmitted } from "@/services/analytics";

export interface EnquiryFormProps {
  /** Fixed enquiry type for this form. Omit (and set `allowTypeSelection`) to let the visitor choose. */
  type?: EnquiryType;
  page: string;
  product?: { id: string; name: string; slug: string };
  className?: string;
  /** Shows the "I'm getting in touch with" dropdown and lets the visitor pick the enquiry type themselves. */
  allowTypeSelection?: boolean;
  submitLabel?: string;
}

const COMPANY_FIELD_TYPES: EnquiryType[] = ["b2b", "dealer"];

const ENQUIRY_TYPE_OPTIONS: { value: EnquiryType; label: string }[] = [
  { value: "general", label: "General" },
  { value: "b2c", label: "Retail Purchase" },
  { value: "b2b", label: "Bulk & B2B Order" },
  { value: "dealer", label: "Dealer Partnership" },
  { value: "walkthrough", label: "Experience Center Visit" },
  { value: "support", label: "Support" },
];

const BUSINESS_TYPE_OPTIONS: { value: BusinessType; label: string }[] = [
  { value: "retailer", label: "Furniture Retailer" },
  { value: "new-business", label: "New Business" },
  { value: "interior-design", label: "Interior Design Firm" },
  { value: "other", label: "Other" },
];

const VISIT_PURPOSE_OPTIONS: { value: VisitPurpose; label: string }[] = [
  { value: "personal", label: "Personal" },
  { value: "dealer", label: "Dealer" },
  { value: "bulk-order", label: "Bulk Order" },
];

export function EnquiryForm({
  type,
  page,
  product,
  className,
  allowTypeSelection = false,
  submitLabel = "Send enquiry",
}: EnquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      type: type ?? "general",
      source: {
        page,
        productId: product?.id,
        productName: product?.name,
        productSlug: product?.slug,
      },
    },
  });

  const currentType = useWatch({ control, name: "type" });

  const onSubmit = async (values: EnquiryFormValues) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");

      trackEnquirySubmitted(values.type, page);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="bg-success/10 flex flex-col items-center gap-3 rounded-lg p-8 text-center"
      >
        <span className="bg-success flex h-10 w-10 items-center justify-center rounded-full text-white">
          <CheckIcon />
        </span>
        <p className="text-ink font-medium">Thank you — we&apos;ve received your enquiry.</p>
        <p className="text-muted text-sm">Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={className}>
      {/* Honeypot — hidden from sighted users and screen readers, real users never fill it in */}
      <div aria-hidden="true" className="absolute top-auto left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{currentType === "dealer" ? "Contact person" : "Full name"}</Label>
          <Input id="name" autoComplete="name" error={errors.name?.message} {...register("name")} />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>

        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        {allowTypeSelection && (
          <div className="sm:col-span-2">
            <Label htmlFor="type">I&apos;m getting in touch with</Label>
            <Select id="type" error={errors.type?.message} {...register("type")}>
              {ENQUIRY_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <FieldError id="type-error" message={errors.type?.message} />
          </div>
        )}

        {COMPANY_FIELD_TYPES.includes(currentType) && (
          <div className="sm:col-span-2">
            <Label htmlFor="company">Company / business name</Label>
            <Input id="company" error={errors.company?.message} {...register("company")} />
            <FieldError id="company-error" message={errors.company?.message} />
          </div>
        )}

        {currentType === "dealer" && (
          <>
            <div>
              <Label htmlFor="city">Business location / city</Label>
              <Input id="city" error={errors.city?.message} {...register("city")} />
              <FieldError id="city-error" message={errors.city?.message} />
            </div>

            <div>
              <Label htmlFor="businessType">Current business type</Label>
              <Select
                id="businessType"
                error={errors.businessType?.message}
                {...register("businessType")}
              >
                {BUSINESS_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FieldError id="businessType-error" message={errors.businessType?.message} />
            </div>

            <div>
              <Label htmlFor="yearsInBusiness">Years in business</Label>
              <Input
                id="yearsInBusiness"
                error={errors.yearsInBusiness?.message}
                {...register("yearsInBusiness")}
              />
              <FieldError id="yearsInBusiness-error" message={errors.yearsInBusiness?.message} />
            </div>
          </>
        )}

        {currentType === "walkthrough" && (
          <>
            <div>
              <Label htmlFor="preferredDate">Preferred date</Label>
              <Input
                id="preferredDate"
                type="date"
                error={errors.preferredDate?.message}
                {...register("preferredDate")}
              />
              <FieldError id="preferredDate-error" message={errors.preferredDate?.message} />
            </div>

            <div>
              <Label htmlFor="preferredTime">Preferred time</Label>
              <Input
                id="preferredTime"
                type="time"
                error={errors.preferredTime?.message}
                {...register("preferredTime")}
              />
              <FieldError id="preferredTime-error" message={errors.preferredTime?.message} />
            </div>

            <div>
              <Label htmlFor="visitPurpose">Purpose of visit</Label>
              <Select
                id="visitPurpose"
                error={errors.visitPurpose?.message}
                {...register("visitPurpose")}
              >
                {VISIT_PURPOSE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FieldError id="visitPurpose-error" message={errors.visitPurpose?.message} />
            </div>

            <div>
              <Label htmlFor="visitorCount">Number of visitors</Label>
              <Input
                id="visitorCount"
                type="number"
                min={1}
                error={errors.visitorCount?.message}
                {...register("visitorCount")}
              />
              <FieldError id="visitorCount-error" message={errors.visitorCount?.message} />
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <Label htmlFor="message">Message {currentType === "b2c" ? "(optional)" : ""}</Label>
          <Textarea id="message" error={errors.message?.message} {...register("message")} />
          <FieldError id="message-error" message={errors.message?.message} />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="text-danger mt-4 text-sm">
          Something went wrong sending your enquiry. Please try again.
        </p>
      )}

      <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

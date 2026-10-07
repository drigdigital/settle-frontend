import { Schema, model, models, type Model, type Document } from "mongoose";
import type { TestimonialType } from "@/types/testimonial";

export interface TestimonialDocument extends Document {
  quote: string;
  name: string;
  role: string;
  type: TestimonialType;
  product?: string;
  rating?: number;
  photo?: string;
  isFeatured: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<TestimonialDocument>(
  {
    quote: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    type: { type: String, enum: ["dealer", "customer"], required: true },
    product: { type: String, trim: true },
    rating: { type: Number, min: 1, max: 5 },
    photo: String,
    isFeatured: { type: Boolean, default: false, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const Testimonial: Model<TestimonialDocument> =
  models.Testimonial ?? model<TestimonialDocument>("Testimonial", TestimonialSchema);

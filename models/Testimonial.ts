import { Schema, model, models, type Model, type Document } from "mongoose";

export interface TestimonialDocument extends Document {
  name: string;
  location?: string;
  quote: string;
  rating: number;
  avatar?: string;
  isFeatured: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<TestimonialDocument>(
  {
    name: { type: String, required: true },
    location: String,
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    avatar: String,
    isFeatured: { type: Boolean, default: false, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const Testimonial: Model<TestimonialDocument> =
  models.Testimonial ?? model<TestimonialDocument>("Testimonial", TestimonialSchema);

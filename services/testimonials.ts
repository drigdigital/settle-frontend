import { connectToDatabase } from "@/lib/db";
import { PLACEHOLDER_TESTIMONIALS } from "@/constants/testimonials";
import { Testimonial as TestimonialModel } from "@/models/Testimonial";
import type { Testimonial } from "@/types/testimonial";

/** Featured testimonials, newest first. Falls back to the marked placeholders while the database is unavailable. */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const connection = await connectToDatabase();
  if (!connection) return PLACEHOLDER_TESTIMONIALS;

  const docs = await TestimonialModel.find({ isFeatured: true }).sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    _id: String(doc._id),
    quote: doc.quote,
    name: doc.name,
    role: doc.role,
    type: doc.type,
    product: doc.product,
    rating: doc.rating,
    photo: doc.photo,
    isFeatured: doc.isFeatured,
    createdAt: doc.createdAt.toISOString(),
  }));
}

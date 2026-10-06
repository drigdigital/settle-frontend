import { connectToDatabase } from "@/lib/db";
import { Testimonial as TestimonialModel } from "@/models/Testimonial";
import type { Testimonial } from "@/types/admin";

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    _id: "t1",
    name: "Priya R.",
    location: "Chennai",
    quote:
      "The wardrobe we ordered arrived exactly as shown, and the finish quality is a level above what we saw elsewhere.",
    rating: 5,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "t2",
    name: "Arun K.",
    location: "Coimbatore",
    quote:
      "Settle handled our restaurant's bulk seating order end to end — on time, and well within budget.",
    rating: 5,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "t3",
    name: "Meena S.",
    location: "Bengaluru",
    quote:
      "Booked a showroom walkthrough before deciding — seeing the pieces in person made all the difference.",
    rating: 4,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
];

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const connection = await connectToDatabase();
  if (!connection) return PLACEHOLDER_TESTIMONIALS;

  const docs = await TestimonialModel.find({ isFeatured: true }).lean();
  return docs.map((doc) => ({
    _id: String(doc._id),
    name: doc.name,
    location: doc.location,
    quote: doc.quote,
    rating: doc.rating,
    avatar: doc.avatar,
    isFeatured: doc.isFeatured,
    createdAt: doc.createdAt.toISOString(),
  }));
}

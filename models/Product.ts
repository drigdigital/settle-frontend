import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

const DimensionsSchema = new Schema(
  {
    height: Number,
    width: Number,
    depth: Number,
    diameter: Number,
    unit: { type: String, enum: ["ft", "in"], required: true },
  },
  { _id: false },
);

const SizeOptionSchema = new Schema(
  {
    label: { type: String, required: true },
    dimensions: { type: DimensionsSchema, required: true },
  },
  { _id: false },
);

const ProductImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true },
    isPrimary: { type: Boolean, default: false },
    type: { type: String, enum: ["studio", "lifestyle"], required: true },
  },
  { _id: false },
);

export interface ProductDocument extends Document {
  name: string;
  slug: string;
  category: Types.ObjectId;
  subLine?: "ECO" | "PRIME" | "ULTRA" | "RECLINE" | null;
  description: string;
  highlights: string[];
  dimensions?: Record<string, unknown>;
  sizeOptions?: unknown[];
  finishes: string[];
  material?: string;
  configuration?: string;
  price?: { amount: number; currency: "INR"; display: boolean };
  isPackage: boolean;
  images: { url: string; alt: string; isPrimary: boolean; type: "studio" | "lifestyle" }[];
  isFeatured: boolean;
  status: "active" | "draft" | "archived";
  seo?: { title?: string; description?: string; ogImage?: string };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    subLine: { type: String, enum: ["ECO", "PRIME", "ULTRA", "RECLINE", null], default: null },
    description: { type: String, required: true },
    highlights: { type: [String], default: [] },
    dimensions: DimensionsSchema,
    sizeOptions: [SizeOptionSchema],
    finishes: { type: [String], default: [] },
    material: String,
    configuration: String,
    price: {
      amount: Number,
      currency: { type: String, default: "INR" },
      display: { type: Boolean, default: false },
    },
    isPackage: { type: Boolean, default: false },
    images: { type: [ProductImageSchema], default: [] },
    isFeatured: { type: Boolean, default: false, index: true },
    status: { type: String, enum: ["active", "draft", "archived"], default: "draft", index: true },
    seo: {
      title: String,
      description: String,
      ogImage: String,
    },
  },
  { timestamps: true },
);

ProductSchema.index({ name: "text", description: "text" });

export const Product: Model<ProductDocument> =
  models.Product ?? model<ProductDocument>("Product", ProductSchema);

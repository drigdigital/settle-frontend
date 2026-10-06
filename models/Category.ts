import { Schema, model, models, type Model, type Document } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  slug: string;
  description?: string;
  heroImage?: string;
  sizeChart?: { label: string; dimensions: Record<string, unknown> }[];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: String,
    heroImage: String,
    sizeChart: [
      {
        label: { type: String, required: true },
        dimensions: { type: Schema.Types.Mixed, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const Category: Model<CategoryDocument> =
  models.Category ?? model<CategoryDocument>("Category", CategorySchema);

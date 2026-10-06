import { Schema, model, models, type Model, type Document } from "mongoose";

export interface EnquiryDocument extends Document {
  type: "general" | "b2c" | "b2b" | "dealer" | "walkthrough" | "support";
  name: string;
  email: string;
  phone: string;
  message?: string;
  company?: string;
  city?: string;
  preferredDate?: string;
  preferredTime?: string;
  visitPurpose?: string;
  visitorCount?: string;
  businessType?: string;
  yearsInBusiness?: string;
  source: { productId?: string; productName?: string; productSlug?: string; page: string };
  status: "new" | "contacted" | "qualified" | "converted" | "closed";
  assignedDepartment: "sales" | "b2b" | "dealer-relations" | "experience-center" | "support";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<EnquiryDocument>(
  {
    type: {
      type: String,
      enum: ["general", "b2c", "b2b", "dealer", "walkthrough", "support"],
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: String,
    company: String,
    city: String,
    preferredDate: String,
    preferredTime: String,
    visitPurpose: String,
    visitorCount: String,
    businessType: String,
    yearsInBusiness: String,
    source: {
      productId: String,
      productName: String,
      productSlug: String,
      page: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "closed"],
      default: "new",
      index: true,
    },
    assignedDepartment: {
      type: String,
      enum: ["sales", "b2b", "dealer-relations", "experience-center", "support"],
      required: true,
    },
  },
  { timestamps: true },
);

export const Enquiry: Model<EnquiryDocument> =
  models.Enquiry ?? model<EnquiryDocument>("Enquiry", EnquirySchema);

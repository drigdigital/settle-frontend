import { Schema, model, models, type Model, type Document } from "mongoose";

export interface AdminUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "superadmin" | "admin" | "editor";
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<AdminUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["superadmin", "admin", "editor"], default: "editor" },
  },
  { timestamps: true },
);

export const AdminUser: Model<AdminUserDocument> =
  models.AdminUser ?? model<AdminUserDocument>("AdminUser", AdminUserSchema);

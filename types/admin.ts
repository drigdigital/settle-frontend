export type AdminRole = "superadmin" | "admin" | "editor";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSession {
  userId: string;
  email: string;
  role: AdminRole;
}

export interface Testimonial {
  _id: string;
  name: string;
  location?: string;
  quote: string;
  rating: number; // 1-5
  avatar?: string;
  isFeatured: boolean;
  createdAt: string;
}

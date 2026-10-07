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

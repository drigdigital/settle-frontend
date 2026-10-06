import type { ReactNode } from "react";
import { AdminNav } from "@/app/admin/_components/AdminNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

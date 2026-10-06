import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken, hasRole } from "@/lib/auth";
import type { AdminRole } from "@/types/admin";
import type { AdminSession } from "@/types/admin";

/** Reads and verifies the admin session cookie in a route handler or Server Component. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireAdmin(roles: AdminRole[] = ["superadmin", "admin", "editor"]) {
  const session = await getAdminSession();
  if (!hasRole(session, roles)) return null;
  return session;
}

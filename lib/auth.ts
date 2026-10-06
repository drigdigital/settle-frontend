import jwt from "jsonwebtoken";
import type { AdminSession } from "@/types/admin";

const JWT_SECRET = process.env.JWT_SECRET;
export const SESSION_COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? "settle_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function requireSecret(): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  return JWT_SECRET;
}

export function signSessionToken(session: AdminSession): string {
  return jwt.sign(session, requireSecret(), { expiresIn: SESSION_MAX_AGE_SECONDS });
}

export function verifySessionToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, requireSecret()) as AdminSession;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  name: SESSION_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};

export function hasRole(session: AdminSession | null, roles: AdminSession["role"][]): boolean {
  return !!session && roles.includes(session.role);
}

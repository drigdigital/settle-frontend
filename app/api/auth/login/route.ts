import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";
import { signSessionToken, sessionCookieOptions } from "@/lib/auth";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`login:${ip}`)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again shortly." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const connection = await connectToDatabase();
  if (!connection) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const user = await AdminUser.findOne({ email: parsed.data.email.toLowerCase() }).select(
    "+passwordHash",
  );
  const isValid = user && (await bcrypt.compare(parsed.data.password, user.passwordHash));

  if (!user || !isValid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = signSessionToken({ userId: String(user._id), email: user.email, role: user.role });

  const response = NextResponse.json({ ok: true, role: user.role });
  response.cookies.set(sessionCookieOptions.name, token, sessionCookieOptions);
  return response;
}

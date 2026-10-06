import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations";
import { createEnquiry, listEnquiries } from "@/services/enquiries";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const enquiries = await listEnquiries();
  return NextResponse.json({ enquiries });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`enquiry:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid enquiry data", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot tripped — pretend success so bots don't learn to avoid the field.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website: _website, ...input } = parsed.data;
  const enquiry = await createEnquiry(input);

  return NextResponse.json({ ok: true, id: enquiry._id }, { status: 201 });
}

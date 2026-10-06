import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { getProductBySlug } from "@/services/products";
import { requireAdmin } from "@/lib/requireAdmin";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await requireAdmin(["superadmin", "admin", "editor"]);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const connection = await connectToDatabase();
  if (!connection) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { slug } = await params;
  const updates = await request.json().catch(() => null);
  if (!updates) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const product = await Product.findOneAndUpdate({ slug }, updates, { new: true });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await requireAdmin(["superadmin", "admin"]);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const connection = await connectToDatabase();
  if (!connection) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { slug } = await params;
  await Product.findOneAndDelete({ slug });
  return NextResponse.json({ ok: true });
}

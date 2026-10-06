import { connectToDatabase } from "@/lib/db";
import { Enquiry as EnquiryModel } from "@/models/Enquiry";
import { DEPARTMENT_CONTACTS } from "@/constants/site";
import type { BusinessType, Department, Enquiry, EnquiryType, VisitPurpose } from "@/types/enquiry";

const DEPARTMENT_BY_TYPE: Record<EnquiryType, Department> = {
  general: "support",
  b2c: "sales",
  b2b: "b2b",
  dealer: "dealer-relations",
  walkthrough: "experience-center",
  support: "support",
};

const EMAIL_BY_DEPARTMENT: Record<Department, string> = Object.fromEntries(
  DEPARTMENT_CONTACTS.map((dept) => [dept.department, dept.email]),
) as Record<Department, string>;

export interface CreateEnquiryInput {
  type: EnquiryType;
  name: string;
  email: string;
  phone: string;
  message?: string;
  company?: string;
  city?: string;
  preferredDate?: string;
  preferredTime?: string;
  visitPurpose?: VisitPurpose;
  visitorCount?: string;
  businessType?: BusinessType;
  yearsInBusiness?: string;
  source: { productId?: string; productName?: string; productSlug?: string; page: string };
}

/**
 * Persists a lead to MongoDB and fires the notification hook. A lead is
 * never only an email (CLAUDE.md §6) — the DB write is the source of truth
 * for the admin dashboard, notification is best-effort on top of it.
 */
export async function createEnquiry(input: CreateEnquiryInput): Promise<Enquiry> {
  const connection = await connectToDatabase();
  const assignedDepartment = DEPARTMENT_BY_TYPE[input.type];

  if (!connection) {
    // No database configured yet — surface a clear signal in dev rather than
    // silently dropping the lead.
    console.warn("[enquiries] MONGODB_URI not set — enquiry was not persisted:", input);
    return {
      _id: "unsaved",
      ...input,
      status: "new",
      assignedDepartment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const doc = await EnquiryModel.create({
    ...input,
    status: "new",
    assignedDepartment,
  });

  await notifyNewEnquiry(doc.toObject() as unknown as Enquiry);

  return {
    ...(doc.toObject() as unknown as Enquiry),
    _id: String(doc._id),
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export async function listEnquiries(limit = 100): Promise<Enquiry[]> {
  const connection = await connectToDatabase();
  if (!connection) return [];

  const docs = await EnquiryModel.find().sort({ createdAt: -1 }).limit(limit).lean();
  return docs.map((doc) => ({
    ...(doc as unknown as Enquiry),
    _id: String(doc._id),
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  }));
}

async function notifyNewEnquiry(enquiry: Enquiry): Promise<void> {
  // Hook point for email/WhatsApp notification (CLAUDE.md §6). The routing
  // decision (which department/inbox this enquiry belongs to) is resolved
  // here regardless of credentials; only the actual send is a no-op fallback
  // pending real Resend/WhatsApp Business API credentials.
  const destinationEmail = EMAIL_BY_DEPARTMENT[enquiry.assignedDepartment];

  if (!process.env.RESEND_API_KEY) {
    console.warn(
      `[enquiries] RESEND_API_KEY not set — enquiry ${enquiry._id} routed to ${enquiry.assignedDepartment} (${destinationEmail}) but not emailed`,
    );
    return;
  }

  console.info(
    `[enquiries] TODO: send notification for enquiry ${enquiry._id} to ${destinationEmail}`,
  );
}

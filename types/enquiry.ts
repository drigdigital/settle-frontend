export type EnquiryType = "general" | "b2c" | "b2b" | "dealer" | "walkthrough" | "support";

export type BusinessType = "retailer" | "new-business" | "interior-design" | "other";

export type VisitPurpose = "personal" | "dealer" | "bulk-order";

export type EnquiryStatus = "new" | "contacted" | "qualified" | "converted" | "closed";

export type Department = "sales" | "b2b" | "dealer-relations" | "experience-center" | "support";

export interface EnquirySourceProduct {
  productId?: string;
  productName?: string;
  productSlug?: string;
  page: string;
}

export interface Enquiry {
  _id: string;
  type: EnquiryType;
  name: string;
  email: string;
  phone: string;
  message?: string;
  company?: string; // b2b / dealer
  city?: string;
  preferredDate?: string; // walkthrough
  preferredTime?: string; // walkthrough
  visitPurpose?: VisitPurpose; // walkthrough
  visitorCount?: string; // walkthrough
  businessType?: BusinessType; // dealer
  yearsInBusiness?: string; // dealer
  source: EnquirySourceProduct;
  status: EnquiryStatus;
  assignedDepartment: Department;
  createdAt: string;
  updatedAt: string;
}

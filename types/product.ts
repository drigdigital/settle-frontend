export type DimensionUnit = "ft" | "in";

export interface Dimensions {
  height?: number;
  width?: number;
  depth?: number;
  diameter?: number;
  unit: DimensionUnit;
}

export interface SizeOption {
  label: string; // "King", "Queen", "6x4ft"
  dimensions: Dimensions;
}

export type SubLine = "ECO" | "PRIME" | "ULTRA" | "RECLINE";

export type ProductImageType = "studio" | "lifestyle";

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
  type: ProductImageType;
}

export interface Price {
  amount: number;
  currency: "INR";
  display: boolean;
}

export type ProductStatus = "active" | "draft" | "archived";

export interface ProductSeo {
  title?: string;
  description?: string;
  ogImage?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  heroImage?: string;
  productCount?: number;
  sizeChart?: SizeOption[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string; // unique, formatted "category-name"
  category: Category | string;
  subLine?: SubLine | null;
  description: string;
  highlights: string[];
  dimensions?: Dimensions;
  sizeOptions?: SizeOption[];
  finishes: string[];
  material?: string;
  configuration?: string;
  price?: Price;
  isPackage: boolean;
  images: ProductImage[];
  isFeatured: boolean;
  status: ProductStatus;
  seo?: ProductSeo;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  subLine?: SubLine;
  material?: string;
  finish?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  configuration?: string;
  search?: string;
  sort?: "featured" | "newest" | "price-asc" | "price-desc" | "name-asc";
  page?: number;
}

# CLAUDE.md — Settle Furnitures Website

Project instructions for Claude Code. Read this before writing any code in this repository.

---

## 1. Project Context

| | |
|---|---|
| **Client** | Vaanam Furniture Private Limited |
| **Brand** | Settle Furnitures |
| **Product** | Premium furniture showcase website — a "digital showroom", **not** an e-commerce checkout site |
| **Audience** | B2C retail buyers **and** B2B / bulk / dealer enquiries |
| **Primary KPI** | Qualified lead generation (enquiry forms, WhatsApp, walkthrough bookings) |
| **Catalog at go-live** | ~170 products across 13 categories (see §5) |

### Objectives (from the approved proposal)

- Premium furniture showcase platform with smooth product discovery
- Generate qualified B2B and B2C enquiries
- Dealer ecosystem readiness
- Complete admin dashboard for user + product management
- High performance, scalable, future-ready architecture
- Ready-to-launch catalogue supporting 100–150+ products at go-live

**There is no cart, no payment gateway, no online ordering.** Every product path ends in an *enquiry*, not a purchase. If a feature request implies checkout, confirm before building it.

---

## 2. Technology Stack (approved — do not substitute)

| Layer | Technology |
|---|---|
| Framework | Next.js (latest, **App Router only** — no `pages/`) |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS |
| Animation | Framer Motion (primary); GSAP only for complex scroll timelines |
| Forms | React Hook Form + Zod |
| Backend | Node.js + Express.js REST APIs |
| Database | MongoDB Atlas (Mongoose ODM) |



| Auth | JWT-based admin auth, role-based access |
| Hosting | Vercel Pro (global CDN) |
| Integrations | WhatsApp click-to-chat, Google Analytics 4, basic SEO tooling |
| Tooling | ESLint + Prettier |

**Rules**

- Server Components by default. Add `"use client"` only where interactivity, hooks, or browser APIs are genuinely needed, and keep the boundary as small as possible.
- No implicit `any`, no unnecessary `as` casts. Shared contracts live in `types/`.
- Do not add UI / state / animation libraries without strong justification — keep the dependency surface lean.
- Product listing and detail pages must be **server-rendered or statically generated** (SSR/ISR) for SEO. Never client-fetch the primary product content.

---

## 3. Design & UX Direction

The site must read as **premium, elegant, warm, and craft-led** — this is solid seasoned Mahogany/Teak furniture, not flat-pack. Large photography, generous whitespace, restrained color, confident typography.

- Mobile-first. Test at 375 / 768 / 1024 / 1440 / 1920.
- Product imagery is the hero — layouts exist to serve the photography. Use `next/image` everywhere, priority-load above-the-fold, lazy-load the rest, AVIF/WebP.
- Every homepage section gets its own visual rhythm while staying inside one design language (color, type, spacing, radius, motion).
- All design tokens (colors, type scale, spacing, radii, shadows) are declared once in `tailwind.config.ts`. **Never hardcode a hex value or arbitrary spacing in a component.**
- Motion: fade-ups, staggered grids, scroll reveals, image zoom on hover, smooth page transitions. Durations 200–600ms for micro-interactions. Animate `transform`/`opacity` only. Always honor `prefers-reduced-motion`.
- Accessibility target: **WCAG 2.1 AA**. Keyboard navigable, visible focus states, labeled forms, meaningful `alt` text on every product image, single `h1` per page.

> The Settle palette and fonts are set during Phase 1 (UI/UX). Until they are approved, do not invent brand colors — ask, or use neutral placeholders clearly marked as such.

---

## 4. Site Structure

### Home
Hero banner with primary CTAs → brand value strip → featured collections showcase → dynamic featured-products carousel → B2B solutions highlight → experience center preview → testimonials + client logos → final conversion CTA.

### About Settle
Brand story and vision, manufacturing strength, quality commitment, leadership profiles.

### Collections (product listing)
Advanced filters (category, sub-line, material/finish, price band, size, seater config), search, sorting, wishlist + compare, SEO-friendly pagination.

### Product Detail
High-resolution gallery with zoom, summary and highlights, specification/dimensions tabs, finish options, recommended products, **sticky enquiry CTA**.

### For Businesses (B2B)
Bulk order solutions, industries served, process workflow, B2B enquiry form.

### Experience Center
Store gallery, location + map, working hours, walkthrough booking form.

### Dealers & Partners
Dealer benefits, support structure, dealer application form.

### Contact
Smart enquiry routing form, WhatsApp quick connect, map, department-wise contacts.

### Admin Dashboard (`/admin`, protected)
Analytics overview, product CRUD, category/subcategory management, customer + enquiry management, user roles and access control, secure login. Ships with written admin guidelines for the client.

---

## 5. Product Data Model

The catalog is the backbone of the site. Model it once, correctly.

### Categories (13) and go-live counts

| Category | Count | Notes |
|---|---|---|
| Wardrobes | 8 | Includes 2 bedroom *packages* (Essen Queen/King) |
| Study Tables | 5 | Model 1–5, dimension-led |
| TV Units | 9 | Model 1–9, dimension-led |
| Shoe Racks | 5 | Model 1–5, dimension-led |
| Upholstered Sofas | 24 | Split across **ECO / PRIME / ULTRA** lines |
| Recliners | 8 | RECLINE line, 1-seater and 3-seater |
| Sofa Cum Beds | 5 | |
| Wooden Sofas | 16 | Mostly 3+1+1; one L-corner (3+3+C) |
| Wooden Cots | 16 | Plus a shared size chart |
| Dining Sets | 30 | Plus a shared size chart; includes marble-top 4/6-seater variants |
| Dining Chairs | 15 | Sold standalone |
| Dining Tables | 15 | Sold standalone |
| Center Tables | 13 | Incl. teapoys |

**~169 products + 12 hero/featured products.** Products repeat names across categories (Denver, Orlando, Vienna, Shanghai, Chicago, Montreal…) — **name is not unique. Slug must be `category-name`, and uniqueness must be enforced on the slug, not the name.**

### Suggested schema

```ts
Product {
  _id
  name: string                 // "Aura", "TV Unit – Model 3"
  slug: string                 // unique: "wardrobes-aura"
  category: ObjectId -> Category
  subLine?: "ECO" | "PRIME" | "ULTRA" | "RECLINE" | null
  description: string
  highlights: string[]
  dimensions: { height?, width?, depth?, unit: "ft" | "in" }
  sizeOptions?: [{ label, dimensions }]   // King/Queen/Double/Single, 4/6-seater
  finishes: string[]                      // Wallnut, Cherry, Oak, Sand, Baverian, Teak
  material?: string                       // "Seasoned Mahogany", "Seasoned Teak"
  configuration?: string                  // "3+1+1", "3+3+C", "2+2+1+C", "8-seater"
  price?: { amount: number, currency: "INR", display: boolean }
  isPackage: boolean                      // Essen bedroom packages
  images: [{ url, alt, isPrimary, type: "studio" | "lifestyle" }]
  isFeatured: boolean                     // the 12 catalog hero models
  status: "active" | "draft" | "archived"
  seo: { title, description, ogImage }
  createdAt / updatedAt
}
```

### Data realities to handle — do not assume otherwise

- **Prices are partial.** Wardrobes, study tables, TV units and shoe racks carry ₹ prices; sofas, cots, dining and center tables mostly do not. Price must be **optional and independently hideable** per product. Where absent, the UI shows "Price on request" and pushes the enquiry CTA — never a blank or ₹0.
- **Dimensions come in mixed units** (feet for storage, inches for sofas/cots). Store a unit with every measurement; format at render time.
- **Sizes are shared at category level** for cots (King 72x75/78", Queen 60x75/78", Double 48x75/78", Single 36x75/78") and dining sets (6x4ft, 5x3ft, 4x4ft, 4ft dia). Model these as reusable category-level size charts, not copy-pasted per product.
- **Sub-lines are a real merchandising axis.** ECO (affordable) → PRIME (premium) → ULTRA (high-density comfort) for upholstered sofas. Surface as a filter and as a badge on cards.
- **12 hero products** (Aura, Essen, Munich, Barnet, Orlando L-Corner, Cairo, Brampton, Lindsay, Wales, Montreal, Garden, Wylam) have dedicated lifestyle imagery and drive the homepage carousel and collection headers. Flag them, don't hardcode them.
- Descriptions in the source sheet are marketing prose. Keep them editable in the admin dashboard; never bake catalog copy into components.

### Other collections

`Category`, `Enquiry` (type: `b2c` | `b2b` | `dealer` | `walkthrough`, with source product/page, status pipeline, assigned department), `AdminUser` (role: `superadmin` | `admin` | `editor`), `Testimonial`, `Lead activity log`.

---

## 6. Forms & Lead Capture

Lead generation is the point of the site. Every form ships with:

- Zod schema validated on **both** client and server — never trust the client
- Loading, success, and error states (no silent success)
- Spam protection: honeypot + server-side rate limiting
- Enquiry routing by type (B2C / B2B / dealer / walkthrough) to the right department
- Persistence to MongoDB **and** notification (email/WhatsApp) — a lead is never only an email
- GA4 event on submission
- Full responsive layout and accessible labelling/errors

Sticky enquiry CTA on product detail pages and a persistent WhatsApp quick-connect are conversion-critical — do not remove or bury them in a redesign.

---

## 7. Performance, SEO & Security

**Performance targets:** Lighthouse > 95 across all four categories. LCP < 2.5s, CLS < 0.1, INP < 200ms. Route-based code splitting, `next/dynamic` for heavy below-fold components, `next/font` for fonts, optimized images with correct `sizes`.

**SEO:** `generateMetadata` on every route including dynamic product pages; Open Graph + Twitter cards; Schema.org `Product`, `Organization`, `LocalBusiness` (experience center), `BreadcrumbList`, `FAQPage`; `sitemap.ts` covering all product/category routes; `robots.ts`; canonical URLs; clean slugs; semantic HTML5.

**Security:** JWT auth with httpOnly cookies, role-based route guards on both UI and API, input validation on every endpoint, rate limiting on public POST routes, no secrets in client bundles (`NEXT_PUBLIC_` only for genuinely public values), CORS locked to known origins, MongoDB Atlas IP allowlist + least-privilege DB user.

---

## 8. Folder Structure

```
settle/
├── app/
│   ├── (site)/                 # public marketing + catalog routes
│   │   ├── page.tsx            # home
│   │   ├── about/
│   │   ├── collections/
│   │   │   ├── page.tsx        # listing + filters
│   │   │   └── [category]/[slug]/page.tsx   # product detail
│   │   ├── business/           # B2B
│   │   ├── experience-center/
│   │   ├── dealers/
│   │   └── contact/
│   ├── admin/                  # protected dashboard
│   ├── api/                    # route handlers / BFF layer
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                     # primitives: Button, Input, Badge, Modal
│   └── shared/                 # Navbar, Footer, EnquiryCTA, WhatsAppButton
├── sections/                   # page-specific compositions (Hero, FeaturedCollections…)
├── hooks/                      # useProductFilters, useWishlist, useMediaQuery
├── lib/                        # db connection, auth, fonts, animation presets, seo helpers
├── models/                     # Mongoose schemas
├── services/                   # API clients, email/WhatsApp/analytics integrations
├── utils/                      # formatters (price, dimensions), cn()
├── types/                      # shared TS contracts
├── constants/                  # nav, categories, site metadata, finish lists
├── styles/
├── public/                     # served verbatim
└── assets/                     # build-processed images/icons
```

**Conventions:** Components `PascalCase` matching filename; hooks `useCamelCase`; types `PascalCase`; constants `UPPER_SNAKE_CASE`. Route files stay thin — delegate to `sections/` and `components/`. Extract shared logic to `hooks/`, `lib/`, or `utils/` rather than duplicating.

---

## 9. Working Agreements

- **Phase 1 is UI/UX** (sitemap, wireframes, hi-fi design, mobile-first layouts, review iterations). **Phase 2 is build + deploy.** Don't jump ahead of an unapproved design.
- Run `npm run lint` and formatting before considering any task complete. Fix type errors; don't suppress them.
- Every new page ships with metadata, OG/Twitter tags, semantic HTML, and structured data where relevant.
- Every new form ships with the §6 checklist complete.
- Every new token (color, size, spacing, radius, shadow) goes into `tailwind.config.ts` first.
- Test animations with `prefers-reduced-motion` on before marking work done.
- Product content is admin-editable data, never hardcoded — the client must be able to add products 171 through 300 without a developer.
- Ask before: adding a dependency, changing the approved stack, introducing checkout/payment, or restructuring folders.

### Timeline & cost reference (proposal)

UI/UX 20 days · Development 30–35 days · QA 5 days · Deployment 2 days.
Annual platform cost: Vercel Pro ₹20,400 · MongoDB Atlas ₹4,000 · Domain ₹800.

---

## 10. Definition of Done

A feature is done when it is: typed, lint-clean, mobile-first responsive across all five breakpoints, accessible (keyboard + screen reader + contrast), server-rendered where SEO matters, metadata-complete, reduced-motion safe, Lighthouse-verified, and — if it touches the catalog — driven entirely by admin-managed data.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

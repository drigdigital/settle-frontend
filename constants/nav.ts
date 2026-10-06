export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Collections", href: "/collections" },
  { label: "For Businesses", href: "/business" },
  { label: "Experience Center", href: "/experience-center" },
  { label: "Dealers", href: "/dealers" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Collections", href: "/collections" },
      { label: "About Settle", href: "/about" },
      { label: "Experience Center", href: "/experience-center" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "For Businesses", href: "/business" },
      { label: "Dealers & Partners", href: "/dealers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Book a Walkthrough", href: "/experience-center" },
    ],
  },
];

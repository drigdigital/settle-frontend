export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/collections" },
  { label: "For Businesses", href: "/business" },
  { label: "Our Plants", href: "/our-plants" },
  { label: "Dealers", href: "/dealers" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Products", href: "/collections" },
      { label: "About Settle", href: "/about" },
      { label: "Our Plants", href: "/our-plants" },
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
      { label: "Book A Plant Visit", href: "/our-plants#book" },
    ],
  },
];

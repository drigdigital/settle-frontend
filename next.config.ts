import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder catalog images are SVG until real product photography is
    // uploaded via the admin dashboard (CLAUDE.md §3).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

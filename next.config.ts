import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder catalog images are SVG until real product photography is
    // uploaded via the admin dashboard (CLAUDE.md §3).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      // The Experience Center page was renamed Our Plants; keep old links and bookmarks working.
      { source: "/experience-center", destination: "/our-plants", permanent: true },
    ];
  },
};

export default nextConfig;

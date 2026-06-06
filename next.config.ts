import type { NextConfig } from "next";

// ---------------------------------------------------------------------------
// COMING SOON MODE
// All sub-pages redirect to the locale landing page.
// Remove the `redirects` function below when you are ready to launch them.
// ---------------------------------------------------------------------------
const COMING_SOON_PAGES = ["products", "visualizer", "calculator", "gallery", "contact"];
const LOCALES = ["en", "ar"];

const comingSoonRedirects = LOCALES.flatMap((locale) =>
  COMING_SOON_PAGES.map((page) => ({
    source: `/${locale}/${page}`,
    destination: `/${locale}`,
    permanent: false, // 307 – easy to remove later
  }))
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "lanfawzy.com",
      },
    ],
  },
  async redirects() {
    return comingSoonRedirects;
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/siteConfig";

/**
 * Next.js automatically serves this at /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE_CONFIG.domain.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

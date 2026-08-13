import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { SITE_CONFIG } from "@/data/siteConfig";

/**
 * Next.js automatically serves this at /sitemap.xml.
 * It stays in sync with data/products.ts — no manual edits needed
 * when you add or remove products.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.domain.replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/catalog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages];
}

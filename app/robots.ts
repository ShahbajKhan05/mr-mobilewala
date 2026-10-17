import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(SITE_URL
      ? { sitemap: new URL("/sitemap.xml", SITE_URL).toString() }
      : {}),
  };
}

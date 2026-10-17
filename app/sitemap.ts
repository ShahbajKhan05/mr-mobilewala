import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];

  return [
    {
      url: new URL("/", SITE_URL).toString(),
    },
  ];
}

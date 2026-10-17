const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === "production"
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : undefined);

const configuredUrl = configuredSiteUrl
  ? new URL(
      /^https?:\/\//i.test(configuredSiteUrl)
        ? configuredSiteUrl
        : `https://${configuredSiteUrl}`,
    )
  : undefined;

export const SITE_URL = configuredUrl
  ? new URL(configuredUrl.origin)
  : undefined;

export const SITE_NAME = "MR Mobile Wala";
export const SITE_DESCRIPTION =
  "Buy, sell, and repair smartphones with MR Mobile Wala.";
export const BRAND_LOGO_PATH = "/mr-mobile-wala-logo.png";
export const INSTAGRAM_URL = "https://instagram.com/mrmobilewala.2.0";
export const WHATSAPP_PHONE = "918349813831";

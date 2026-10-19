
import type { Metadata } from "next";
import { Manrope, Geist } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import {
  BRAND_LOGO_PATH,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: SITE_URL } : {}),
  title: {
    default: "MR Mobile Wala | Buy, Sell & Repair Smartphones",
    template: "%s | MR Mobile Wala",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: "MR Mobile Wala | Buy, Sell & Repair Smartphones",
    description: SITE_DESCRIPTION,
    ...(SITE_URL
      ? {
          url: new URL("/", SITE_URL).toString(),
          images: [
            {
              url: BRAND_LOGO_PATH,
              width: 2160,
              height: 728,
              alt: "MR Mobile Wala",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "MR Mobile Wala | Buy, Sell & Repair Smartphones",
    description: SITE_DESCRIPTION,
    ...(SITE_URL ? { images: [BRAND_LOGO_PATH] } : {}),
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  sameAs: [INSTAGRAM_URL],
  ...(SITE_URL
    ? {
        url: SITE_URL.toString(),
        logo: new URL(BRAND_LOGO_PATH, SITE_URL).toString(),
      }
    : {}),
};

const websiteJsonLd = SITE_URL
  ? {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL.toString(),
    }
  : null;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", manrope.variable, "font-sans", geist.variable)}>
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />

        {websiteJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
            }}
          />
        )}

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

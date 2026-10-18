import type { Metadata } from "next";
import AboutStory from "@/components/AboutStory";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SITE_URL } from "@/lib/site-config";

const title = "About MR Mobile Wala | Technology should feel personal";
const description =
  "Get to know MR Mobile Wala: explore smartphones, sell or exchange your device, find accessories, or ask about a repair.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  ...(SITE_URL ? { alternates: { canonical: "/about" } } : {}),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MR Mobile Wala",
    title,
    description,
    ...(SITE_URL ? { url: new URL("/about", SITE_URL).toString() } : {}),
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AboutStory />
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandMarquee from "@/components/BrandMarquee";
import AboutStory from "@/components/AboutStory"; 
import TeamCarousel from "@/components/TeamCarousel"; 
import ContactRequestForm from "@/components/ContactRequestForm";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site-config";
import CookieNotice from "@/components/CookieNotice";


export const metadata: Metadata = {
  title: "Buy, Sell & Repair Smartphones",
  description:
    "Explore smartphones, accessories, and buy, sell, and repair services from MR Mobile Wala.",
  ...(SITE_URL ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MR Mobile Wala",
    title: "Buy, Sell & Repair Smartphones | MR Mobile Wala",
    description:
      "Explore smartphones, accessories, and buy, sell, and repair services from MR Mobile Wala.",
    ...(SITE_URL
      ? {
          url: new URL("/", SITE_URL).toString(),
          images: [
            {
              url: "/mr-mobile-wala-logo.png",
              alt: "MR Mobile Wala",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy, Sell & Repair Smartphones | MR Mobile Wala",
    description:
      "Explore smartphones, accessories, and buy, sell, and repair services from MR Mobile Wala.",
    ...(SITE_URL ? { images: ["/mr-mobile-wala-logo.png"] } : {}),
  },
};

export default function Home() {
  return (
    
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <HeroSection />
        <BrandMarquee />
        <AboutStory />
        <TeamCarousel />
        <ContactRequestForm /> 
      </main>
      <Footer />
      <CookieNotice />
    </div>
  );
}

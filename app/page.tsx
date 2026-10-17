import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandMarquee from "@/components/BrandMarquee";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  ...(SITE_URL ? { alternates: { canonical: "/" } } : {}),
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <BrandMarquee />
      </main>
      <Footer />
    </div>
  );
}

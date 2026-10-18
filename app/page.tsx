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
        <section
          id="services"
          aria-labelledby="services-title"
          className="px-5 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/65 sm:text-xs">
              Phones, accessories & service
            </p>
            <h2
              id="services-title"
              className="mt-3 text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.06em]"
            >
              Buy. Sell. Repair.
            </h2>
            <div className="mt-9 grid gap-3 border-t border-black/10 pt-4 sm:mt-12 sm:grid-cols-3 sm:gap-4 sm:pt-5 lg:mt-16">
              {[
                {
                  number: "01",
                  title: "Buy",
                  service: "buy",
                  description:
                    "Looking for a phone or an accessory? Ask us what is available.",
                },
                {
                  number: "02",
                  title: "Sell",
                  service: "sell",
                  description:
                    "Have a phone to move on? Get in touch to start a conversation.",
                },
                {
                  number: "03",
                  title: "Repair",
                  service: "repair",
                  description:
                    "Need help with a device? Tell us what is going on.",
                },
              ].map((service) => (
                <article
                  key={service.number}
                  data-story-card
                  className="flex min-h-[220px] flex-col border-b border-black/10 py-5 sm:min-h-[250px] sm:border-b-0 sm:border-r sm:pr-5 sm:last:border-r-0 lg:min-h-[230px] lg:pr-8"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/65">
                    {service.number} / {service.title}
                  </p>
                  <h3 className="mt-4 text-2xl font-medium tracking-tight sm:mt-6">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-black/70 sm:mt-3">
                    {service.description}
                  </p>
                  <Link
                    href={`/contact?service=${service.service}`}
                    className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-5 text-sm font-medium text-[#191a18] underline decoration-black/35 underline-offset-4 transition-colors hover:decoration-black focus-visible:rounded-sm"
                  >
                    Get in touch
                    <span aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <AboutStory />
        <TeamCarousel />
        <ContactRequestForm />

       
        
      </main>
      <Footer />
    </div>
  );
}

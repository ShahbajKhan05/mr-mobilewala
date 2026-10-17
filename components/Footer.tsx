import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import AnimatedFooterLink, { FooterLinkPalette } from "@/components/AnimatedFooterLink";

interface FooterLinkItem {
  label: string;
  href: string;
  palette: FooterLinkPalette;
}

interface SocialLinkItem {
  label: string;
  href: string;
  iconSrc: string;
  ariaLabel: string;
  palette: FooterLinkPalette;
  isExternal?: boolean;
}

const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/917984057884",
    iconSrc: "/Social-icons/Whatsapp-3d.svg",
    ariaLabel: "Chat on WhatsApp",
    palette: "emerald-cyan",
    isExternal: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/mrmobilewala.2.0",
    iconSrc: "/Social-icons/Instagram-3d.svg",
    ariaLabel: "Follow on Instagram",
    palette: "insta-gradient",
    isExternal: true,
  },
  {
    label: "Email",
    href: "mailto:contact@mrmobilewala.com",
    iconSrc: "/Social-icons/Gmail-3d.svg",
    ariaLabel: "Send us an Email",
    palette: "cyan-blue",
    isExternal: false,
  },
];

const EXPLORE_LINKS: FooterLinkItem[] = [
  { label: "Phones", href: "/phones", palette: "cyan-blue" },
  { label: "Accessories", href: "/accessories", palette: "violet-blue" },
  { label: "Services", href: "/services", palette: "orange-pink" },
  { label: "About", href: "/about", palette: "magenta-violet" },
  { label: "Contact", href: "/contact", palette: "cyan-violet" },
];

const VISIT_LINKS: FooterLinkItem[] = [
  { label: "Visit Store", href: "/store", palette: "orange-pink" },
  { label: "Login", href: "/login", palette: "violet-blue" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#EDEDED] text-[#1E1E1E] border-t border-[#1E1E1E]/8 overflow-hidden z-20">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 pt-12 sm:pt-20 md:pt-24 pb-6">
        {/* =========================================================
            EDITORIAL CONTENT GRID
            - Mobile (<640px): 1 column
            - Tablet (640px-1023px): 2 columns
            - Desktop (1024px+): 3 columns
        ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
          
          {/* COLUMN 1 — Social (3D Icons + Text-Behind-Color Aura) */}
          <div className="flex flex-col">
            <h3 className="text-[12px] sm:text-[13px] font-mono tracking-[0.15em] uppercase text-[#1E1E1E]/40 mb-3.5 sm:mb-4 select-none">
              Social
            </h3>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <AnimatedFooterLink
                    href={social.href}
                    label={social.label}
                    palette={social.palette}
                    isExternal={social.isExternal}
                    ariaLabel={social.ariaLabel}
                    icon={
                      <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] md:w-[44px] md:h-[44px] flex items-center justify-center">
                        <Image
                          src={social.iconSrc}
                          alt=""
                          width={44}
                          height={44}
                          className="w-full h-full object-contain select-none pointer-events-none drop-shadow-sm"
                        />
                      </div>
                    }
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2 — Explore */}
          <div className="flex flex-col">
            <h3 className="text-[12px] sm:text-[13px] font-mono tracking-[0.15em] uppercase text-[#1E1E1E]/40 mb-3.5 sm:mb-4 select-none">
              Explore
            </h3>
            <ul className="flex flex-col gap-1.5 sm:gap-2">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.label}>
                  <AnimatedFooterLink
                    href={item.href}
                    label={item.label}
                    palette={item.palette}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 — Visit */}
          <div className="flex flex-col">
            <h3 className="text-[12px] sm:text-[13px] font-mono tracking-[0.15em] uppercase text-[#1E1E1E]/40 mb-3.5 sm:mb-4 select-none">
              Visit
            </h3>
            <ul className="flex flex-col gap-1.5 sm:gap-2">
              {VISIT_LINKS.map((item) => (
                <li key={item.label}>
                  <AnimatedFooterLink
                    href={item.href}
                    label={item.label}
                    palette={item.palette}
                  />
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* =========================================================
            FINAL BUSINESS STORY CONCLUSION (Section 48)
            ========================================================= */}
        <div className="w-full text-center mt-12 sm:mt-16 pt-10 sm:pt-14 border-t border-[#1E1E1E]/10 select-none">
          <div className="font-mono text-[11px] sm:text-[12px] font-bold text-[#00796B] uppercase tracking-[0.28em] mb-2">
            [ MR. MOBILE WALA ]
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] md:text-[2.8rem] font-black text-[#1E1E1E] tracking-tight uppercase leading-tight mb-2">
            BUY &bull; SELL &bull; REPAIR
          </h2>
          <p className="text-[13px] sm:text-[15px] font-medium text-[#1E1E1E]/70 max-w-[480px] mx-auto mb-6">
            At Mr. Mobile Wala, anything phone related. Walk in with a question, walk out with confidence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/phones"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E1E1E] text-white text-[12px] sm:text-[13px] font-bold hover:bg-black transition-all shadow-sm"
            >
              <span>Explore Phones</span>
              <span>&rarr;</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#1E1E1E]/15 text-[#1E1E1E] text-[12px] sm:text-[13px] font-bold hover:bg-[#F5F5F5] transition-all"
            >
              <span>Repair Services</span>
              <span>&rarr;</span>
            </Link>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#1E1E1E]/15 text-[#1E1E1E] text-[12px] sm:text-[13px] font-bold hover:bg-[#F5F5F5] transition-all"
            >
              <span>Visit Store</span>
              <span>&rarr;</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#1E1E1E]/15 text-[#1E1E1E] text-[12px] sm:text-[13px] font-bold hover:bg-[#F5F5F5] transition-all"
            >
              <span>Contact Us</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* =========================================================
            FINAL BRAND SIGNATURE (Official Mr. Mobile Wala Logo)
            - Contained within relative local container with safe padding
            ========================================================= */}
        <div className="relative w-full flex justify-center items-center my-6 sm:my-8 md:my-10 py-4 sm:py-6 md:py-8 px-2 overflow-hidden">
          <div className="relative flex justify-center max-w-full">
            <BrandLogo variant="footer" />
          </div>
        </div>

        {/* =========================================================
            BOTTOM COPYRIGHT BAR
        ========================================================= */}
        <div className="border-t border-[#1E1E1E]/10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] sm:text-[13px] font-mono text-[#1E1E1E]/40 tracking-tight select-none">
          <div>
            &copy; 2026 Mr. Mobile Wala
          </div>
          <div>
            All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}

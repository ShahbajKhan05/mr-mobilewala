
"use client";

import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import AnimatedFooterLink, {
  FooterLinkPalette,
} from "@/components/AnimatedFooterLink";

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

const LEGAL_LINKS: FooterLinkItem[] = [
  { label: "Privacy Policy", href: "#", palette: "muted-violet" },
  { label: "Terms & Conditions", href: "#", palette: "muted-violet" },
  { label: "Shipping Policy", href: "#", palette: "muted-violet" },
  { label: "Return Policy", href: "#", palette: "muted-violet" },
];

interface FooterProps {
  showReturnToTop?: boolean;
  onReturnToTop?: () => void;
}

export default function Footer({
  showReturnToTop,
  onReturnToTop,
}: FooterProps) {
  const handleReturnToTop = () => {
    if (onReturnToTop) {
      onReturnToTop();
      return;
    }

    if (typeof window !== "undefined") {
      const win = window as unknown as {
        lenis?: {
          scrollTo: (
            target: number | string | HTMLElement,
            options?: { duration?: number }
          ) => void;
        };
      };

      if (win.lenis) {
        win.lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative z-20 w-full overflow-hidden border-t border-[#1E1E1E]/10 bg-[#EDEDED] text-[#1E1E1E]">
      <div className="mx-auto w-full max-w-screen-2xl px-4 pt-8 pb-2 sm:px-6 sm:pt-10 sm:pb-3 md:px-10 md:pt-12 lg:px-12 xl:px-16">

        {/* Return to top */}
        {showReturnToTop && (
          <div className="mb-8 flex flex-col items-center justify-center border-b border-[#1E1E1E]/10 pb-8 text-center sm:mb-10 sm:pb-9 md:mb-12 md:pb-10">
            <span className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[#1E1E1E]/50 sm:text-[10px] sm:tracking-[0.2em]">
              [ DESTINATION REACHED • MR. MOBILE WALA ]
            </span>

            <button
              type="button"
              onClick={handleReturnToTop}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1E1E1E] px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-black active:scale-[0.98] sm:gap-3 sm:px-8 sm:text-[11px] sm:tracking-[0.18em]"
              aria-label="Return to top of journey"
            >
              <span className="text-[#00E5FF] transition-transform group-hover:-translate-y-1">
                ↑
              </span>
              <span>Return to Top</span>
            </button>

            <span className="mt-3 font-mono text-[9px] tracking-wide text-[#1E1E1E]/40 sm:text-[10px]">
              Rewind through the 3D cinematic story
            </span>
          </div>
        )}

        {/* Responsive links grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-8 sm:gap-y-8 md:grid-cols-4 md:gap-x-6 lg:gap-x-10">

          {/* Social */}
          <div className="min-w-0">
            <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.13em] text-[#1E1E1E]/45 sm:mb-4 sm:text-[12px] sm:tracking-[0.15em]">
              Social
            </h3>

            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label} className="min-w-0">
                  <AnimatedFooterLink
                    href={social.href}
                    label={social.label}
                    palette={social.palette}
                    isExternal={social.isExternal}
                    ariaLabel={social.ariaLabel}
                    icon={
                      <div className="flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10 md:h-11 md:w-11">
                        <Image
                          src={social.iconSrc}
                          alt=""
                          width={44}
                          height={44}
                          className="h-full w-full select-none object-contain drop-shadow-sm"
                        />
                      </div>
                    }
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="min-w-0">
            <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.13em] text-[#1E1E1E]/45 sm:mb-4 sm:text-[12px] sm:tracking-[0.15em]">
              Explore
            </h3>

            <ul className="flex flex-col gap-1.5 sm:gap-2">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.label} className="min-w-0">
                  <AnimatedFooterLink
                    href={item.href}
                    label={item.label}
                    palette={item.palette}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div className="min-w-0">
            <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.13em] text-[#1E1E1E]/45 sm:mb-4 sm:text-[12px] sm:tracking-[0.15em]">
              Visit
            </h3>

            <ul className="flex flex-col gap-1.5 sm:gap-2">
              {VISIT_LINKS.map((item) => (
                <li key={item.label} className="min-w-0">
                  <AnimatedFooterLink
                    href={item.href}
                    label={item.label}
                    palette={item.palette}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="min-w-0">
            <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.13em] text-[#1E1E1E]/45 sm:mb-4 sm:text-[12px] sm:tracking-[0.15em]">
              Legal
            </h3>

            <ul className="flex flex-col gap-1.5 sm:gap-2">
              {LEGAL_LINKS.map((item) => (
                <li key={item.label} className="min-w-0">
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

        {/* Brand conclusion */}
        <section className="mt-9 border-t border-[#1E1E1E]/10 pt-8 text-center sm:mt-10 sm:pt-10 md:mt-12">
          <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00796B] sm:text-[11px] sm:tracking-[0.28em]">
            [ MR. MOBILE WALA ]
          </div>

          <h2 className="mb-2 text-[1.65rem] font-black uppercase leading-tight tracking-tight text-[#1E1E1E] sm:text-[2.1rem] md:text-[2.8rem]">
            BUY <span>•</span> SELL <span>•</span> REPAIR
          </h2>

          <p className="mx-auto mb-5 max-w-[480px] px-1 text-[12px] font-medium leading-5 text-[#1E1E1E]/70 sm:mb-6 sm:text-[14px] sm:leading-6">
            At Mr. Mobile Wala, anything phone related. Walk in with a
            question, walk out with confidence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { href: "/phones", label: "Explore Phones", dark: true },
              { href: "/services", label: "Repair Services", dark: false },
              { href: "/store", label: "Visit Store", dark: false },
              { href: "/contact", label: "Contact Us", dark: false },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-bold transition-colors sm:px-5 sm:text-[12px] ${
                  item.dark
                    ? "border-[#1E1E1E] bg-[#1E1E1E] text-white hover:bg-black"
                    : "border-[#1E1E1E]/15 bg-white text-[#1E1E1E] hover:bg-[#F5F5F5]"
                }`}
              >
                <span>{item.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Logo */}
        <div className="my-4 flex w-full justify-center overflow-hidden px-2 py-3 sm:my-5 sm:py-4 md:my-6">
          <div className="flex w-full max-w-full justify-center">
            <BrandLogo variant="footer" />
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-[#1E1E1E]/10 py-4 text-center font-mono text-[10px] tracking-tight text-[#1E1E1E]/45 sm:flex-row sm:gap-4 sm:py-5 sm:text-left sm:text-[11px] md:text-[12px]">
          <span>© {new Date().getFullYear()} Mr. Mobile Wala</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

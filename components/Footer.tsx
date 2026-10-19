
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";

interface FooterLinkItem {
  label: string;
  href: string;
  palette: string;
}

interface SocialLinkItem {
  label: string;
  href: string;
  iconSrc: string;
  ariaLabel: string;
  isExternal?: boolean;
}

const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/919131383323",
    iconSrc: "/Social-icons/Whatsapp-3d.svg",
    ariaLabel: "Chat with Mr Mobile Wala on WhatsApp",
    isExternal: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/mrmobilewala.2.0",
    iconSrc: "/Social-icons/Instagram-3d.svg",
    ariaLabel: "Follow Mr Mobile Wala on Instagram",
    isExternal: true,
  },
  {
    label: "Email",
    href: "mailto:mrmobilewala610@gmail.com",
    iconSrc: "/Social-icons/Gmail-3d.svg",
    ariaLabel: "Email Mr Mobile Wala",
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
  { label: "Privacy Policy", href: "/privacy", palette: "muted-violet" },
  {
    label: "Terms & Conditions",
    href: "/terms",
    palette: "muted-violet",
  },
];

interface FooterProps {
  showReturnToTop?: boolean;
  onReturnToTop?: () => void;
}

function FooterTextLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-8 max-w-full items-center text-[13px] text-[#1E1E1E]/75 transition-colors duration-200 hover:text-[#e1306c] sm:min-h-7 sm:text-sm"
    >
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4] transition-all duration-300 group-hover:w-full" />
      </span>

      <span
        aria-hidden="true"
        className="ml-1 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
      >
        →
      </span>
    </Link>
  );
}

export default function Footer({
  showReturnToTop = false,
  onReturnToTop,
}: FooterProps) {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleReturnToTop = () => {
    if (onReturnToTop) {
      onReturnToTop();
      return;
    }

    const win = window as unknown as {
      lenis?: {
        scrollTo: (
          target: number | string | HTMLElement,
          options?: { duration?: number },
        ) => void;
      };
    };

    if (win.lenis) {
      win.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-20 w-full overflow-hidden border-t border-[#1E1E1E]/10 bg-[#FAFAF8] font-semibold text-[#1E1E1E]">
      <div className="mx-auto w-full max-w-screen-2xl px-4 pb-2 pt-6 sm:px-6 sm:pb-3 sm:pt-8 md:px-10 md:pt-10 lg:px-12 xl:px-16">
        {/* Return to top */}
        {showReturnToTop && (
          <div className="mb-6 flex flex-col items-center justify-center border-b border-[#1E1E1E]/10 pb-6 text-center sm:mb-8 sm:pb-8">
            <span className="mb-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#1E1E1E]/50 sm:mb-3 sm:text-[10px] sm:tracking-[0.2em]">
              [ DESTINATION REACHED • MR. MOBILE WALA ]
            </span>

            <button
              type="button"
              onClick={handleReturnToTop}
              className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4] px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 active:scale-[0.98] sm:gap-3 sm:px-7 sm:text-[11px] sm:tracking-[0.16em]"
              aria-label="Return to top of page"
            >
              <span className="transition-transform group-hover:-translate-y-0.5">
                ↑
              </span>
              <span>Return to Top</span>
            </button>

            <span className="mt-2 font-mono text-[9px] text-[#1E1E1E]/40 sm:mt-3 sm:text-[10px]">
              Rewind through the 3D cinematic story
            </span>
          </div>
        )}

        {/* Responsive links grid: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-8 sm:gap-y-7 md:grid-cols-4 md:gap-x-6 lg:gap-x-10">
          {/* Social */}
          <div className="min-w-0">
            <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.13em] text-[#1E1E1E]/45 sm:mb-3 sm:text-[12px] sm:tracking-[0.15em]">
              Social
            </h3>

            <ul className="flex flex-col gap-1.5 sm:gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label} className="min-w-0">
                  <a
                    href={social.href}
                    target={social.isExternal ? "_blank" : undefined}
                    rel={
                      social.isExternal ? "noopener noreferrer" : undefined
                    }
                    aria-label={social.ariaLabel}
                    className="group inline-flex min-h-9 max-w-full items-center gap-2 text-[13px] text-[#1E1E1E]/75 transition-colors hover:text-[#e1306c] sm:min-h-10 sm:text-sm"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-105 sm:size-9 md:size-10">
                      <Image
                        src={social.iconSrc}
                        alt=""
                        width={40}
                        height={40}
                        className="size-full select-none object-contain"
                      />
                    </span>

                    <span className="truncate">{social.label}</span>

                    {social.isExternal && (
                      <span aria-hidden="true" className="text-xs opacity-50">
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="min-w-0">
            <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.13em] text-[#1E1E1E]/45 sm:mb-3 sm:text-[12px] sm:tracking-[0.15em]">
              Explore
            </h3>

            <ul className="flex flex-col gap-0.5 sm:gap-1">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.label} className="min-w-0">
                  <FooterTextLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div className="min-w-0">
            <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.13em] text-[#1E1E1E]/45 sm:mb-3 sm:text-[12px] sm:tracking-[0.15em]">
              Visit
            </h3>

            <ul className="flex flex-col gap-0.5 sm:gap-1">
              {VISIT_LINKS.map((item) => (
                <li key={item.label} className="min-w-0">
                  <FooterTextLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="min-w-0">
            <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.13em] text-[#1E1E1E]/45 sm:mb-3 sm:text-[12px] sm:tracking-[0.15em]">
              Legal
            </h3>

            <ul className="flex flex-col gap-0.5 sm:gap-1">
              {LEGAL_LINKS.map((item) => (
                <li key={item.label} className="min-w-0">
                  <FooterTextLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand conclusion */}
        <section className="mt-7 border-t border-[#1E1E1E]/10 pt-6 text-center sm:mt-9 sm:pt-8 md:mt-10 md:pt-9">
          <h2 className="mb-2 text-[1.55rem] font-black uppercase leading-tight tracking-[-0.04em] text-[#1E1E1E] sm:text-[2.1rem] md:text-[2.8rem]">
            BUY <span className="text-[#e1306c]">•</span> SELL{" "}
            <span className="text-[#833ab4]">•</span> REPAIR
          </h2>

          <p className="mx-auto mb-4 max-w-[480px] px-2 text-[11px] font-medium leading-5 text-[#1E1E1E]/70 sm:mb-5 sm:text-[14px] sm:leading-6">
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
                className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border px-3.5 py-2 text-[10px] font-bold transition-colors duration-200 sm:min-h-10 sm:gap-2 sm:px-5 sm:text-[12px] ${
                  item.dark
                    ? "border-transparent bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4] text-white hover:opacity-90"
                    : "border-[#e1306c]/25 bg-white text-[#1E1E1E] hover:border-[#e1306c] hover:bg-[#e1306c]/5"
                }`}
              >
                <span>{item.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Logo */}
        <div className="my-3 flex w-full justify-center overflow-hidden px-1 py-2 sm:my-4 sm:px-2 sm:py-3 md:my-5">
          <div className="flex w-full max-w-full justify-center">
            <BrandLogo variant="footer" />
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-1.5 border-t border-[#1E1E1E]/10 py-3 text-center font-mono text-[9px] tracking-tight text-[#1E1E1E]/45 sm:flex-row sm:gap-4 sm:py-4 sm:text-left sm:text-[11px] md:text-[12px]">
          <span>© {currentYear ?? 2026} Mr. Mobile Wala</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

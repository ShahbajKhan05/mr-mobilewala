import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import AnimatedFooterLink from "@/components/AnimatedFooterLink";
import { WHATSAPP_PHONE } from "@/lib/site-config";

interface FooterLinkItem {
  label: string;
  href: string;
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
    href: `https://wa.me/${WHATSAPP_PHONE}`,
    iconSrc: "/Social-icons/Whatsapp-3d.svg",
    ariaLabel: "Chat on WhatsApp",
    isExternal: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/mrmobilewala.2.0",
    iconSrc: "/Social-icons/Instagram-3d.svg",
    ariaLabel: "Follow on Instagram",
    isExternal: true,
  },
  {
    label: "Email",
    href: "mailto:contact@mrmobilewala.com",
    iconSrc: "/Social-icons/Gmail-3d.svg",
    ariaLabel: "Send us an Email",
    isExternal: false,
  },
];

const ABOUT_LINKS: FooterLinkItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const EXPLORE_LINKS: FooterLinkItem[] = [
  { label: "Phones", href: "/phones" },
  { label: "Accessories", href: "/accessories" },
  { label: "Services", href: "/services" },
];

const VISIT_LINKS: FooterLinkItem[] = [
  { label: "Visit Store", href: "/store" },
  { label: "Login", href: "/login" },
];

export default function Footer() {
  return (
    <footer className="relative z-20 w-full overflow-hidden border-t border-black/10 bg-[#FAFAF8] text-[#1E1E1E]">
      <div className="mx-auto w-full max-w-screen-2xl px-5 pb-4 pt-8 sm:px-8 sm:pb-5 sm:pt-10 md:px-10 lg:px-12 lg:pt-12 xl:px-16">
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-4 lg:gap-8 xl:gap-12">
          <section aria-labelledby="footer-social-title" className="min-w-0">
            <h2 id="footer-social-title" className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1E1E1E]/55 sm:mb-3 sm:text-xs">
              Social
            </h2>
            <ul className="flex flex-col items-start gap-0.5">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <AnimatedFooterLink
                    href={social.href}
                    label={social.label}
                    isExternal={social.isExternal}
                    ariaLabel={social.ariaLabel}
                    className="gap-2"
                    icon={
                      <span className="flex h-8 w-8 items-center justify-center">
                        <Image
                          src={social.iconSrc}
                          alt=""
                          width={44}
                          height={44}
                          className="w-full h-full object-contain select-none pointer-events-none drop-shadow-sm"
                        />
                      </span>
                    }
                  />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-about-title" className="min-w-0">
            <h2 id="footer-about-title" className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1E1E1E]/55 sm:mb-3 sm:text-xs">
              About
            </h2>
            <ul className="flex flex-col">
              {ABOUT_LINKS.map((item) => (
                <li key={item.label}>
                  <AnimatedFooterLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-explore-title" className="min-w-0">
            <h2 id="footer-explore-title" className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1E1E1E]/55 sm:mb-3 sm:text-xs">
              Explore
            </h2>
            <ul className="flex flex-col">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.label}>
                  <AnimatedFooterLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-visit-title" className="min-w-0">
            <h2 id="footer-visit-title" className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1E1E1E]/55 sm:mb-3 sm:text-xs">
              Visit
            </h2>
            <ul className="flex flex-col">
              {VISIT_LINKS.map((item) => (
                <li key={item.label}>
                  <AnimatedFooterLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-8 grid gap-5 border-t border-black/10 pt-6 sm:mt-10 sm:grid-cols-[1fr_1fr] sm:items-center sm:gap-8 sm:pt-7 lg:grid-cols-[1.05fr_1fr_auto] lg:gap-10">
          <div>
            <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#263D38] sm:text-[11px]">
              MR. MOBILE WALA
            </p>
            <h2 className="text-[clamp(1.65rem,4vw,2.7rem)] font-medium uppercase leading-[1.02] tracking-[-0.05em] text-[#1E1E1E]">
              Buy <span className="text-[#263D38]">&middot;</span> Sell{" "}
              <span className="text-[#263D38]">&middot;</span> Repair
            </h2>
          </div>
          <div className="min-w-0">
            <p className="max-w-md text-sm leading-6 text-[#1E1E1E]/65">
              At MR Mobile Wala, anything phone related. Walk in with a
              question, walk out with confidence.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#263D38] px-5 text-sm font-medium text-white transition-colors hover:bg-[#1E302C] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#263D38]"
              >
                Talk to our team <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/phones"
                className="inline-flex min-h-11 items-center text-sm font-medium text-[#1E1E1E]/75 underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#263D38] hover:decoration-[#263D38] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#263D38]"
              >
                Explore phones
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-11 items-center text-sm font-medium text-[#1E1E1E]/75 underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#263D38] hover:decoration-[#263D38] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#263D38]"
              >
                Services
              </Link>
            </div>
          </div>
          <div className="justify-self-start sm:col-span-2 sm:justify-self-end lg:col-span-1">
            <BrandLogo
              variant="footer"
              imageClassName="!w-[min(45vw,220px)] !max-w-[220px]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-1 border-t border-black/10 pt-3 text-center font-mono text-[10px] tracking-tight text-[#1E1E1E]/50 sm:mt-7 sm:flex-row sm:gap-2 sm:text-left sm:text-[11px]">
          <p>&copy; 2026 Mr. Mobile Wala</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

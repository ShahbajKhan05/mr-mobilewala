"use client";



import Link from "next/link";

import Image from "next/image";

import { useState, useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import gsap from "gsap";

import BrandLogo from "@/components/BrandLogo";
import { WHATSAPP_PHONE } from "@/lib/site-config";



// ============================================================================

// SOCIAL LINKS CONFIGURATION (Preserved)

// ============================================================================

const SOCIAL_CONFIG = {
  whatsapp: `https://wa.me/${WHATSAPP_PHONE}`,

  instagram: "https://instagram.com/mrmobilewala.2.0",

  email: "mailto:contact@mrmobilewala.com",

};



const NAV_LINKS = [

  { href: "/phones", label: "Phones" },

  { href: "/accessories", label: "Accessories" },

  { href: "/services", label: "Services" },

  { href: "/about", label: "About" },

  { href: "/contact", label: "Contact" },

];



export default function Navbar() {

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);



  // References

  const headerRef = useRef<HTMLElement>(null);

  const leftPillWrapperRef = useRef<HTMLDivElement>(null);

  const leftPillRef = useRef<HTMLDivElement>(null);

  const rightPillRef = useRef<HTMLDivElement>(null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const menuPanelRef = useRef<HTMLElement>(null);



  // -------------------------------------------------------------

  // 1. SCROLL DETECTOR (Subtle height & shadow compression)

  // -------------------------------------------------------------

  useEffect(() => {

    const handleScroll = () => {

      const scrollY = window.scrollY || document.documentElement.scrollTop;

      setIsScrolled(scrollY > 45);

    };



    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);



  useEffect(() => {

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);



    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);

  }, []);



  // -------------------------------------------------------------

  // 2. ENTRANCE ANIMATION (GSAP Orchestrated Entrance)

  // -------------------------------------------------------------

  useEffect(() => {

    if (!headerRef.current) return;



    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;



    const ctx = gsap.context(() => {

      const entranceTl = gsap.timeline({

        defaults: { ease: "power3.out" },

      });



      // Left Navbar Pill Entrance

      if (leftPillWrapperRef.current) {

        entranceTl.fromTo(

          leftPillWrapperRef.current,

          { opacity: 0, y: -18, scale: 0.97 },

          { opacity: 1, y: 0, scale: 1, duration: 0.9 },

          0.1

        );

      }



      // Right CTA Pill Entrance (ALWAYS enters and remains)

      if (rightPillRef.current) {

        entranceTl.fromTo(

          rightPillRef.current,

          { opacity: 0, y: -14, scale: 0.97 },

          { opacity: 1, y: 0, scale: 1, duration: 0.85 },

          0.18

        );

      }



      const headerEl = headerRef.current;

      if (!headerEl) return;



      // Navigation Links Staggered Reveal

      const inlineLinks = headerEl.querySelectorAll(".nav-inline-link");

      if (inlineLinks.length > 0) {

        entranceTl.fromTo(

          inlineLinks,

          { opacity: 0, y: 8 },

          { opacity: 1, y: 0, stagger: 0.05, duration: 0.65 },

          0.35

        );

      }



      // 3-Dot Button Scale Reveal

      const menuTrigger = headerEl.querySelector(".nav-menu-btn");

      if (menuTrigger) {

        entranceTl.fromTo(

          menuTrigger,

          { opacity: 0, scale: 0.8 },

          { opacity: 1, scale: 1, duration: 0.6 },

          0.45

        );

      }

    }, headerRef);



    return () => ctx.revert();

  }, []);



  // -------------------------------------------------------------

  // 3. MENU PANEL OPEN / CLOSE CHOREOGRAPHY (Vertical morph inside left column)

  // -------------------------------------------------------------

  useEffect(() => {

    if (!menuPanelRef.current) return;

    const panel = menuPanelRef.current;

    const items = panel.querySelectorAll(".menu-item-anim");

    const socials = panel.querySelectorAll(".menu-social-anim");

    const cta = panel.querySelector(".menu-cta-anim");


    if (isOpen) {

      gsap.killTweensOf([panel, items, socials, cta]);

      const openTl = gsap.timeline({ defaults: { ease: "power3.out" } });



      openTl.fromTo(

        panel,

        { opacity: 0, scaleY: 0.96, y: -10, transformOrigin: "top center" },

        { opacity: 1, scaleY: 1, y: 0, duration: 0.4 },

        0

      );



      if (items.length > 0) {

        openTl.fromTo(

          items,

          { opacity: 0, y: 18 },

          { opacity: 1, y: 0, stagger: 0.06, duration: 0.45 },

          0.08

        );

      }



      if (socials.length > 0) {

        openTl.fromTo(

          socials,

          { opacity: 0, scale: 0.85 },

          { opacity: 1, scale: 1, stagger: 0.04, duration: 0.35 },

          0.22

        );

      }



      if (cta) {

        openTl.fromTo(

          cta,

          { opacity: 0, y: 12 },

          { opacity: 1, y: 0, duration: 0.4 },

          0.28

        );

      }

    }

  }, [isOpen]);



  // -------------------------------------------------------------

  // 4. OUTSIDE CLICK & ESCAPE KEY DISMISSAL

  // -------------------------------------------------------------

  useEffect(() => {

    const handleClickOutside = (e: MouseEvent) => {

      if (leftPillWrapperRef.current && !leftPillWrapperRef.current.contains(e.target as Node)) {

        setIsOpen(false);

      }

    };



    const handleEscape = (e: KeyboardEvent) => {

      if (e.key === "Escape" && isOpen) {

        setIsOpen(false);

        menuButtonRef.current?.focus();

      }

    };



    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleEscape);

    return () => {

      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleEscape);

    };

  }, [isOpen]);



  // ============================================================================

  // ADMIN ROUTE CHECK: Hide Navbar on Admin Pages

  // ============================================================================

  if (pathname?.startsWith("/admin")) {

    return null;

  }



  return (

    <header

      ref={headerRef}

      className="fixed top-[max(8px,env(safe-area-inset-top))] left-[max(8px,env(safe-area-inset-left))] right-[max(8px,env(safe-area-inset-right))] sm:top-[12px] sm:left-[12px] sm:right-[12px] md:top-[20px] md:left-[24px] md:right-[24px] z-[100] flex items-start justify-between gap-3 sm:gap-[16px] pointer-events-none"

    >

      {/* =========================================================

          LEFT NAVIGATION WRAPPER (Pill & Dropdown Menu)

          - Desktop width: strictly locked to 720px (does NOT push right CTA)

          ========================================================= */}

      <div

        ref={leftPillWrapperRef}

        className="relative pointer-events-auto transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] w-full lg:w-[720px] xl:w-[740px] shrink-0"

      >

        {/* Top Navbar Pill */}

        <div

          ref={leftPillRef}

          className={`flex items-center justify-between px-3 sm:px-5 md:px-6 lg:px-7 bg-[#FAFAF8] border border-[#1E1E1E]/10 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden group/pill ${

            isScrolled

              ? "h-[54px] sm:h-[58px] lg:h-[70px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md"

              : "h-[58px] sm:h-[64px] lg:h-[80px] shadow-[0_2px_16px_rgba(0,0,0,0.05)]"

          } ${isOpen ? "rounded-[24px]" : "rounded-full"}`}

        >

          {/* Subtle Ambient Light Sheen on Pill Hover */}

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none group-hover/pill:translate-x-[150%]" />



          {/* =====================================================

              OFFICIAL MR. MOBILE WALA LOGO

              - Controlled optical weight inside navbar pill

              - Clean brand anchor balanced with navigation links

              ===================================================== */}

          <div className="flex-shrink-0 z-10" onClick={() => setIsOpen(false)}>

            <BrandLogo variant="navbar" priority />

          </div>



          {/* =====================================================

              INLINE DESKTOP LINKS

              - Subtle upward hover translation

              - Directional underline appearing L->R, leaving R->L

              ===================================================== */}

          <nav

            aria-label="Primary"

            className={`hidden lg:flex flex-1 min-w-0 justify-center items-center gap-4 xl:gap-6 px-4 font-medium text-[15px] tracking-tight text-[#1E1E1E] transition-all duration-300 ${

              isOpen ? "opacity-0 invisible scale-95 pointer-events-none" : "opacity-100 visible scale-100"

            }`}

          >

            {NAV_LINKS.map((link) => (

              <Link

                key={link.href}

                href={link.href}

                className="nav-inline-link group/link relative py-1 px-1.5 hover:text-[#1E1E1E] transition-colors whitespace-nowrap"

              >

                <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:-translate-y-[2px]">

                  {link.label}

                </span>



                {/* Directional underline (Enters L->R, leaves to R) */}

                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1E1E1E] transform scale-x-0 origin-right transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:scale-x-100 group-hover/link:origin-left" />

              </Link>

            ))}

          </nav>



          {/* =====================================================

              3-DOT MENU BUTTON / CLOSE TOGGLE

              - Dot hover micro-movement

              - Smooth morphing transition into X

              ===================================================== */}

          <button

            ref={menuButtonRef}

            className="nav-menu-btn flex-shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 group/btn z-10 p-1 min-w-[44px] min-h-[44px]"

            onClick={() => setIsOpen(!isOpen)}

            aria-expanded={isOpen}

            aria-controls="main-menu"

            aria-label={isOpen ? "Close menu" : "Open menu"}

          >

            <span

              className={`font-medium text-[13px] sm:text-[14px] md:text-[15px] text-[#1E1E1E] tracking-tight transition-all duration-300 ${

                isOpen ? "opacity-100 block" : "opacity-0 hidden"

              }`}

            >

              Close

            </span>



            <div

              className={`relative flex items-center justify-center w-[36px] h-[36px] md:w-[40px] md:h-[40px] transition-all duration-300 ${

                isOpen

                  ? "rounded-[12px] bg-[#1E1E1E]/10"

                  : "rounded-full hover:bg-[#1E1E1E]/5 group-hover/btn:scale-105"

              }`}

            >

              {isOpen ? (

                <svg

                  width="18"

                  height="18"

                  viewBox="0 0 24 24"

                  fill="none"

                  stroke="currentColor"

                  strokeWidth="2.4"

                  strokeLinecap="round"

                  strokeLinejoin="round"

                  className="transition-transform duration-300 rotate-90 scale-105"

                >

                  <path d="M18 6L6 18M6 6l12 12" />

                </svg>

              ) : (

                <div className="flex flex-col items-center justify-center gap-[3px]">

                  <span className="w-[3.5px] h-[3.5px] rounded-full bg-[#1E1E1E] transition-transform duration-300 group-hover/btn:-translate-y-[1px]" />

                  <span className="w-[3.5px] h-[3.5px] rounded-full bg-[#1E1E1E] transition-transform duration-300 group-hover/btn:scale-110" />

                  <span className="w-[3.5px] h-[3.5px] rounded-full bg-[#1E1E1E] transition-transform duration-300 group-hover/btn:translate-y-[1px]" />

                </div>

              )}

            </div>

          </button>

        </div>



        {/* =====================================================

            EXPANDED MENU PANEL (Ecosystem Dropdown)

            - Content-driven height (NO awkward giant empty space)

            - 16:9 RECTANGULAR VIDEO CARDS (Phones / Accessories / Services)

            ===================================================== */}

        <nav

          ref={menuPanelRef}

          id="main-menu"

          aria-label="Main menu"

          aria-hidden={!isOpen}

          inert={!isOpen}

          className={`absolute top-[calc(100%+8px)] left-0 w-full bg-[#FAFAF8] border border-[#1E1E1E]/10 rounded-[24px] shadow-[0_24px_48px_rgba(0,0,0,0.12)] overflow-y-auto overscroll-contain transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] custom-scrollbar ${

            isOpen

              ? "max-h-[calc(100dvh-74px-env(safe-area-inset-top)-env(safe-area-inset-bottom,16px))] opacity-100 pointer-events-auto"

              : "max-h-0 opacity-0 pointer-events-none"

          }`}

        >

          <div className="flex flex-col p-4 md:p-6 lg:p-7 gap-1">

            {/* 1. PHONES — 16:9 RECTANGULAR VIDEO CARD */}

            <Link

              href="/phones"

              onClick={() => setIsOpen(false)}

              className="menu-item-anim flex items-center gap-4 lg:gap-5 py-2.5 border-b border-[#1E1E1E]/10 group/item"

            >

              <div className="w-[92px] h-[52px] sm:w-[130px] sm:h-[74px] lg:w-[170px] lg:h-[96px] aspect-video rounded-[12px] sm:rounded-[14px] lg:rounded-[18px] bg-[#1E1E1E] overflow-hidden relative shrink-0 shadow-sm">

                {isOpen && !prefersReducedMotion && (

                  <video

                    src="/videos/Nav/Phone.mp4"

                    preload="none"

                    autoPlay

                    muted

                    loop

                    playsInline

                    aria-hidden="true"

                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover/item:opacity-100 group-hover/item:scale-[1.045] transition-all duration-400"

                  />

                )}

              </div>

              <div>

                <span className="font-medium text-[17px] md:text-[19px] xl:text-[21px] tracking-tight text-[#1E1E1E] inline-block transition-transform duration-300 group-hover/item:translate-x-[5px]">

                  Phones

                </span>

                <p className="text-[12px] sm:text-[13px] text-[#1E1E1E]/55 font-mono uppercase tracking-wider">

                  Flagship hardware

                </p>

              </div>

            </Link>



            {/* 2. ACCESSORIES — 16:9 RECTANGULAR VIDEO CARD */}

            <Link

              href="/accessories"

              onClick={() => setIsOpen(false)}

              className="menu-item-anim flex items-center gap-4 lg:gap-5 py-2.5 border-b border-[#1E1E1E]/10 group/item"

            >

              <div className="w-[92px] h-[52px] sm:w-[130px] sm:h-[74px] lg:w-[170px] lg:h-[96px] aspect-video rounded-[12px] sm:rounded-[14px] lg:rounded-[18px] bg-[#3C3C3C] overflow-hidden relative shrink-0 shadow-sm">

                {isOpen && !prefersReducedMotion && (

                  <video

                    src="/videos/Nav/Accesories.mp4"

                    preload="none"

                    autoPlay

                    muted

                    loop

                    playsInline

                    aria-hidden="true"

                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover/item:opacity-100 group-hover/item:scale-[1.045] transition-all duration-400"

                  />

                )}

              </div>

              <div>

                <span className="font-medium text-[17px] md:text-[19px] xl:text-[21px] tracking-tight text-[#1E1E1E] inline-block transition-transform duration-300 group-hover/item:translate-x-[5px]">

                  Accessories

                </span>

                <p className="text-[12px] sm:text-[13px] text-[#1E1E1E]/55 font-mono uppercase tracking-wider">

                  Tactile power & audio

                </p>

              </div>

            </Link>



            {/* 3. SERVICES — 16:9 RECTANGULAR VIDEO CARD */}

            <Link

              href="/services"

              onClick={() => setIsOpen(false)}

              className="menu-item-anim flex items-center gap-4 lg:gap-5 py-2.5 border-b border-[#1E1E1E]/10 group/item"

            >

              <div className="w-[92px] h-[52px] sm:w-[130px] sm:h-[74px] lg:w-[170px] lg:h-[96px] aspect-video rounded-[12px] sm:rounded-[14px] lg:rounded-[18px] bg-[#808080] overflow-hidden relative shrink-0 shadow-sm">

                {isOpen && !prefersReducedMotion && (

                  <video

                    src="/videos/Nav/Services.mp4"

                    preload="none"

                    autoPlay

                    muted

                    loop

                    playsInline

                    aria-hidden="true"

                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover/item:opacity-100 group-hover/item:scale-[1.045] transition-all duration-400"

                  />

                )}

              </div>

              <div>

                <span className="font-medium text-[17px] md:text-[19px] xl:text-[21px] tracking-tight text-[#1E1E1E] inline-block transition-transform duration-300 group-hover/item:translate-x-[5px]">

                  Services

                </span>

                <p className="text-[12px] sm:text-[13px] text-[#1E1E1E]/55 font-mono uppercase tracking-wider">

                  Diagnostics & care

                </p>

              </div>

            </Link>



            {/* TEXT LINKS */}

            <Link

              href="/about"

              onClick={() => setIsOpen(false)}

              className="menu-item-anim flex items-center py-3 border-b border-[#1E1E1E]/10 group/item"

            >

              <span className="font-medium text-[17px] md:text-[19px] xl:text-[20px] tracking-tight text-[#1E1E1E] transition-transform duration-300 group-hover/item:translate-x-1.5">

                About

              </span>

            </Link>



            <Link

              href="/contact"

              onClick={() => setIsOpen(false)}

              className="menu-item-anim flex items-center py-3 border-b border-[#1E1E1E]/10 group/item"

            >

              <span className="font-medium text-[17px] md:text-[19px] xl:text-[20px] tracking-tight text-[#1E1E1E] transition-transform duration-300 group-hover/item:translate-x-1.5">

                Contact

              </span>

            </Link>



            {/* SOCIAL ICONS */}

            <div className="flex items-center gap-5 pt-3.5 pb-1">

              <Link

                href={SOCIAL_CONFIG.whatsapp}

                target="_blank"

                rel="noopener noreferrer"

                aria-label="Chat on WhatsApp"

                className="menu-social-anim w-[48px] h-[48px] flex items-center justify-center transition-transform duration-300 ease-out hover:scale-[1.08] active:scale-[0.96]"

              >

                <Image

                  src="/Social-icons/Whatsapp-3d.svg"

                  alt="WhatsApp"

                  width={42}

                  height={42}

                  className="w-[38px] h-[38px] object-contain drop-shadow-sm select-none"

                />

              </Link>

              <Link

                href={SOCIAL_CONFIG.instagram}

                target="_blank"

                rel="noopener noreferrer"

                aria-label="Follow us on Instagram"

                className="menu-social-anim w-[48px] h-[48px] flex items-center justify-center transition-transform duration-300 ease-out hover:scale-[1.08] active:scale-[0.96]"

              >

                <Image

                  src="/Social-icons/Instagram-3d.svg"

                  alt="Instagram"

                  width={42}

                  height={42}

                  className="w-[38px] h-[38px] object-contain drop-shadow-sm select-none"

                />

              </Link>

              <Link

                href={SOCIAL_CONFIG.email}

                aria-label="Send us an Email"

                className="menu-social-anim w-[48px] h-[48px] flex items-center justify-center transition-transform duration-300 ease-out hover:scale-[1.08] active:scale-[0.96]"

              >

                <Image

                  src="/Social-icons/Gmail-3d.svg"

                  alt="Email"

                  width={42}

                  height={42}

                  className="w-[38px] h-[38px] object-contain drop-shadow-sm select-none"

                />

              </Link>

            </div>



            {/* VISIT STORE & LOGIN CTAS (Inside Menu) */}

            <div className="menu-cta-anim mt-3 flex items-center gap-2.5">

              <Link

                href="/login"

                onClick={() => setIsOpen(false)}

                className={`lg:hidden flex-1 rounded-full h-[48px] sm:h-[52px] flex items-center justify-center font-medium text-[14px] sm:text-[15px] tracking-tight active:scale-[0.98] transition-all min-h-[44px] ${

                  pathname === "/login"

                    ? "bg-[#1E1E1E] text-white border border-[#1E1E1E]"

                    : "border border-[#1E1E1E]/20 text-[#1E1E1E] hover:bg-[#1E1E1E]/5"

                }`}

              >

                Login

              </Link>

              <Link

                href="/store"

                onClick={() => setIsOpen(false)}

                className="group/store flex-1 bg-[#3C3C3C] text-[#EDEDED] rounded-full h-[48px] sm:h-[52px] lg:h-[56px] flex items-center justify-center font-medium text-[14px] sm:text-[15px] tracking-tight hover:bg-[#2A2A2A] active:scale-[0.99] transition-all shadow-sm relative overflow-hidden min-h-[44px]"

              >

                <span className="relative z-10 transition-transform duration-200 group-hover/store:scale-[1.02]">

                  Visit Store

                </span>

                <span className="relative z-10 ml-1.5 inline-block transition-transform duration-200 group-hover/store:translate-x-1">

                  &rarr;

                </span>

              </Link>

            </div>
          </div>
        </nav>
      </div>



      {/* =========================================================

          RIGHT CTA PILL (Independent Desktop CTA)

          CRITICAL: THIS PILL MUST ALWAYS REMAIN VISIBLE!

          Does NOT disappear or move when menu opens.

          ========================================================= */}

      <div

        ref={rightPillRef}

        className={`hidden lg:flex pointer-events-auto items-center bg-[#FAFAF8] rounded-full pl-7 pr-2 shrink-0 border border-[#1E1E1E]/10 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${

          isScrolled

            ? "h-[58px] lg:h-[70px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md"

            : "h-[64px] lg:h-[80px] shadow-[0_2px_16px_rgba(0,0,0,0.05)]"

        }`}

      >

        {/* Login with Micro-Motion */}

        <Link

          href="/login"

          className={`group/login relative font-medium text-[15px] text-[#1E1E1E] tracking-tight mr-6 py-1 hover:text-[#1E1E1E] transition-colors whitespace-nowrap ${

            pathname === "/login" ? "font-semibold" : ""

          }`}

        >

          <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/login:-translate-y-[1.5px]">

            Login

          </span>

          <span

            className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1E1E1E] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${

              pathname === "/login"

                ? "scale-x-100 origin-left"

                : "scale-x-0 origin-right group-hover/login:scale-x-100 group-hover/login:origin-left"

            }`}

          />

        </Link>



        {/* Visit Store Button with Sheen Sweep */}

        <Link

          href="/store"

          className="group/visit relative flex h-[48px] items-center justify-center overflow-hidden rounded-full bg-[#3C3C3C] px-7 text-[15px] font-medium tracking-tight text-white shadow-sm transition-all duration-300 hover:scale-[1.025] hover:bg-[#2A2A2A] active:scale-[0.98] lg:h-[54px]"

        >

          {/* Inner Light Sweep on Hover */}

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-22deg] -translate-x-[180%] transition-transform duration-700 ease-out group-hover/visit:translate-x-[260%]" />

          </div>



          <span className="relative z-10 transition-transform duration-200 group-hover/visit:translate-x-[-1px]">

            Visit Store

          </span>

          <span className="relative z-10 ml-1.5 inline-block transition-transform duration-200 group-hover/visit:translate-x-1">

            &rarr;

          </span>

        </Link>

      </div>

    </header>

  );

}
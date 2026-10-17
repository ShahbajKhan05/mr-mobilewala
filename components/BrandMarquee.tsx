"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 8 authentic brands with curated optical scales
const BRANDS_DATABASE = {
  apple: { name: "Apple", src: "/brands/apple.svg", className: "h-9 sm:h-11 md:h-12 lg:h-13 w-auto", width: 48, height: 48 },
  samsung: { name: "Samsung", src: "/brands/samsung.svg", className: "h-5 sm:h-7 md:h-8 lg:h-9 w-auto", width: 130, height: 38 },
  oneplus: { name: "OnePlus", src: "/brands/oneplus.svg", className: "h-6 sm:h-7 md:h-8 lg:h-9 w-auto", width: 135, height: 40 },
  xiaomi: { name: "Xiaomi", src: "/brands/xiaomi.svg", className: "h-7 sm:h-9 md:h-10 lg:h-11 w-auto", width: 55, height: 48 },
  google: { name: "Google", src: "/brands/google.svg", className: "h-6 sm:h-7 md:h-8 lg:h-9 w-auto", width: 115, height: 40 },
  nothing: { name: "Nothing", src: "/brands/nothing.svg", className: "h-6 sm:h-7 md:h-8 lg:h-9 w-auto", width: 125, height: 40 },
  oppo: { name: "OPPO", src: "/brands/oppo.svg", className: "h-6 sm:h-7 md:h-8 lg:h-9 w-auto", width: 105, height: 40 },
  vivo: { name: "vivo", src: "/brands/vivo.svg", className: "h-5 sm:h-6 md:h-7 lg:h-8 w-auto", width: 95, height: 36 },
};

// Brand sequence for the single marquee row
const ROW_1_BASE = [
  BRANDS_DATABASE.apple,
  BRANDS_DATABASE.samsung,
  BRANDS_DATABASE.oneplus,
  BRANDS_DATABASE.xiaomi,
  BRANDS_DATABASE.google,
  BRANDS_DATABASE.nothing,
  BRANDS_DATABASE.oppo,
  BRANDS_DATABASE.vivo,
];

// Duplicate base array once for seamless infinite loop
const ROW_1_ITEMS = [...ROW_1_BASE, ...ROW_1_BASE];

export default function BrandMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  const row1WrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered entrance reveal for the header and single marquee row.
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      if (labelRef.current) {
        revealTl.fromTo(
          labelRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }

      if (headingRef.current) {
        revealTl.fromTo(
          headingRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
      }

      // Line 1 draws from left
      if (line1Ref.current) {
        revealTl.fromTo(
          line1Ref.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
          "-=0.2"
        );
      }

      // Row 1 fade + subtle y
      if (row1WrapRef.current) {
        revealTl.fromTo(
          row1WrapRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Line 2 (closing line) draws from left
      if (line2Ref.current) {
        revealTl.fromTo(
          line2Ref.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes marqueeScrollLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .animate-marquee-left {
          animation: marqueeScrollLeft 28s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left {
            animation-play-state: paused !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full bg-[#DEDEDE] py-12 sm:py-16 md:py-20 overflow-hidden select-none z-10"
        aria-label="Supported Mobile Brands - Buy, Sell, Repair"
      >
        <div className="w-full">
          
          {/* =========================================================
              1. EDITORIAL HEADER (Grounded Business Story)
              ========================================================= */}
          <div className="flex flex-col items-center text-center mb-7 sm:mb-9 md:mb-10 px-4">
            <span
              ref={labelRef}
              className="text-[#00796B] font-mono text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-bold mb-2 select-none will-change-transform"
            >
              [ SUPPORTED BRANDS &bull; BUY &bull; SELL &bull; REPAIR ]
            </span>

            <h2
              ref={headingRef}
              className="text-[2rem] sm:text-[2.4rem] md:text-[2.8rem] lg:text-[3.2rem] font-black tracking-tight text-[#1E1E1E] leading-none select-none will-change-transform uppercase"
            >
              EVERY PHONE WE TOUCH.
            </h2>

            <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#1E1E1E]/70 max-w-[500px] leading-relaxed font-medium">
              Whether you want to buy, sell, or repair &mdash; we work on every major smartphone brand.
            </p>
          </div>

          {/* =========================================================
              2. SINGLE LEFT-MOVING MARQUEE ROW
              - Top Divider
              - Row 1: moves LEFT (28s)
              - Bottom Divider
              ========================================================= */}
          <div className="relative w-full flex flex-col">
            
            {/* Edge Gradient Dissolve Masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[#DEDEDE] to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[#DEDEDE] to-transparent z-20" />

            {/* ────────────── LINE 1 (Top Divider) ────────────── */}
            <div
              ref={line1Ref}
              className="w-full h-[1px] bg-[#1E1E1E]/10 will-change-transform origin-left"
            />

            {/* ROW 1: Moves Left */}
            <div
              ref={row1WrapRef}
              className="relative w-full overflow-hidden py-4 sm:py-5 md:py-6 group"
            >
              <div className="flex w-max items-center gap-10 sm:gap-14 md:gap-18 lg:gap-22 pr-10 sm:pr-14 md:pr-18 lg:pr-22 animate-marquee-left group-hover:[animation-play-state:paused]">
                {ROW_1_ITEMS.map((brand, idx) => (
                  <div
                    key={`r1-${brand.name}-${idx}`}
                    className="flex shrink-0 items-center justify-center transition-transform duration-300 ease-out hover:scale-[1.08] cursor-default"
                    aria-label={brand.name}
                  >
                    <Image
                      src={brand.src}
                      alt={`${brand.name} logo`}
                      width={brand.width}
                      height={brand.height}
                      style={{ width: "auto" }}
                      className={`${brand.className} object-contain select-none pointer-events-none drop-shadow-sm`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ────────────── LINE 2 (Bottom Closing Line) ────────────── */}
            <div
              ref={line2Ref}
              className="w-full h-[1px] bg-[#1E1E1E]/10 will-change-transform origin-left"
            />

          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BRANDS = [
  { name: "Apple", src: "/brands/apple.svg", width: 48, height: 48 },
  { name: "Samsung", src: "/brands/samsung.svg", width: 130, height: 38 },
  { name: "OnePlus", src: "/brands/oneplus.svg", width: 135, height: 40 },
  { name: "Xiaomi", src: "/brands/xiaomi.svg", width: 55, height: 48 },
  { name: "Google", src: "/brands/google.svg", width: 115, height: 40 },
  { name: "Nothing", src: "/brands/nothing.svg", width: 125, height: 40 },
  { name: "OPPO", src: "/brands/OPPO.svg", width: 105, height: 40 },
  { name: "Vivo", src: "/brands/Vivo.svg", width: 95, height: 36 },
];

function BrandSequence({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="brand-showcase__sequence"
      aria-hidden={duplicate || undefined}
    >
      {BRANDS.map((brand) => (
        <li key={brand.name} className="brand-showcase__item">
          <Image
            src={brand.src}
            alt={duplicate ? "" : `${brand.name} logo`}
            width={brand.width}
            height={brand.height}
            sizes="(max-width: 639px) 88px, (max-width: 1023px) 112px, 120px"
            className="brand-showcase__logo"
            draggable={false}
          />
        </li>
      ))}
    </ul>
  );
}

export default function BrandMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="brands"
      aria-labelledby="brands-title"
      className="brand-showcase w-full overflow-hidden border-y border-[#eee8ef] bg-white py-7 sm:py-9"
    >
      {/* Centered heading */}
      <div className="mx-auto mb-6 flex max-w-7xl flex-col items-center justify-center gap-3 px-5 text-center sm:mb-7 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e1306c] sm:text-[11px]">
            Trusted technology brands
          </p>

          <h2
            id="brands-title"
            className="text-xl font-semibold tracking-[-0.04em] text-[#1d1d1f] sm:text-2xl"
          >
            Find your next favourite.
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#6e6e73] sm:text-sm">
            Explore brands for every style and budget.
          </p>
        </div>

        <span
          aria-hidden="true"
          className="h-1 w-16 shrink-0 rounded-full bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4]"
        />
      </div>

      {/* Scrolling brand logos */}
      <div
        ref={viewportRef}
        className="brand-showcase__viewport"
        role="region"
        aria-label="Mobile phone brand logos"
        tabIndex={0}
        data-in-view={isInView}
      >
        <div className="brand-showcase__track">
          <BrandSequence />
          <BrandSequence duplicate />
        </div>
      </div>

      {/* Centered bottom tagline */}
      <div className="mx-auto mt-5 flex max-w-7xl items-center justify-center gap-2 px-5 text-center sm:px-8 lg:px-12">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e1306c]"
        />

        <p className="text-[11px] text-[#6e6e73] sm:text-xs">
          Multiple brands. More ways to find your fit.
        </p>
      </div>

      <style>{`
        .brand-showcase__viewport {
          width: 100%;
          overflow: hidden;
          outline-offset: -2px;
        }

        .brand-showcase__viewport:focus-visible {
          outline: 2px solid #833ab4;
        }

        .brand-showcase__track {
          display: flex;
          width: max-content;
          animation: brand-showcase-scroll 36s linear infinite paused;
        }

        .brand-showcase__sequence {
          box-sizing: border-box;
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: space-around;
          gap: 30px;
          width: max-content;
          min-width: 100vw;
          margin: 0;
          padding: 0 24px;
          list-style: none;
        }

        .brand-showcase__item {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          min-width: 70px;
          height: 46px;
        }

        /* Preserve original SVG colours */
        .brand-showcase__logo {
          display: block;
          width: auto;
          max-width: 88px;
          height: auto;
          max-height: 30px;
          object-fit: contain;
          opacity: 1;
          filter: none;
          transform: none;
          transition: transform 220ms ease;
        }

        @keyframes brand-showcase-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* Desktop hover */
        @media (hover: hover) and (pointer: fine) {
          .brand-showcase__item:hover .brand-showcase__logo {
            transform: translateY(-2px);
          }

          .brand-showcase__viewport:hover .brand-showcase__track {
            animation-play-state: paused;
          }
        }

        .brand-showcase__viewport[data-in-view="true"]
        .brand-showcase__track {
          animation-play-state: running;
        }

        .brand-showcase__viewport:focus .brand-showcase__track {
          animation-play-state: paused;
        }

        @media (min-width: 640px) {
          .brand-showcase__sequence {
            gap: 44px;
            padding-inline: 40px;
          }

          .brand-showcase__item {
            min-width: 90px;
            height: 52px;
          }

          .brand-showcase__logo {
            max-width: 112px;
            max-height: 36px;
          }
        }

        @media (min-width: 1024px) {
          .brand-showcase__sequence {
            gap: 52px;
            padding-inline: 64px;
          }

          .brand-showcase__item {
            min-width: 100px;
            height: 58px;
          }

          .brand-showcase__logo {
            max-width: 120px;
            max-height: 40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .brand-showcase__viewport {
            overflow-x: auto;
            scrollbar-width: none;
          }

          .brand-showcase__viewport::-webkit-scrollbar {
            display: none;
          }

          .brand-showcase__track {
            animation: none;
          }

          .brand-showcase__sequence {
            min-width: auto;
          }

          .brand-showcase__logo {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
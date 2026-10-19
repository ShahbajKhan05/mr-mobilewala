
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    title: "Latest Smartphones",
    description: "Explore phones from popular brands.",
    video: "https://www.youtube.com/embed/bxSGfpoFP30",
    type: "youtube",
  },
 {
    title: "Latest Accessories",
    description: "Discover the latest mobile accessories.",
    video: "https://www.youtube.com/embed/oWaYlnV0VuU",
    type: "youtube",
  },
  {
    title: "Repair & Service",
    description: "Ask about support for your phone.",
    video: "https://www.youtube.com/embed/6bOvXpE9M_s",
    type: "youtube",
  },
] as const;


const highlights = [
  {
    icon: "▣",
    title: "Latest Smartphones",
    description: "Explore the latest phones from leading brands.",
    iconColor: "text-[#7c3aed]",
  },
  {
    icon: "↗",
    title: "Smart Accessories",
    description: "Find accessories for your everyday mobile needs.",
    iconColor: "text-[#e1306c]",
  },
  {
    icon: "✓",
    title: "Customer Support",
    description: "Get friendly guidance for your mobile needs.",
    iconColor: "text-[#087443]",
  },
];


function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c02670] sm:text-[11px] sm:tracking-[0.28em]">
      {children}
    </p>
  );
}

function PremiumHeading({
  first,
  accent,
}: {
  first: string;
  accent: string;
}) {
  return (
    <h2 className="about-3d-heading max-w-2xl text-[clamp(2rem,5vw,3.8rem)] font-extrabold leading-[0.98] tracking-[-0.065em]">
      <span className="about-3d-main">{first} </span>
      <span className="about-3d-accent">{accent}</span>
    </h2>
  );
}

function HighlightCards() {
  return (
    <section
      aria-label="What makes MR Mobile Wala different"
      className="relative mx-auto grid max-w-7xl gap-4 px-5 py-7 sm:grid-cols-3 sm:px-7 sm:py-10 lg:px-12"
    >
      {highlights.map((item, index) => (
        <article
          key={item.title}
          className="highlight-card group relative isolate flex min-h-[112px] items-center gap-4 overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-5 shadow-[0_5px_18px_rgba(20,20,35,0.045),inset_0_1px_0_rgba(255,255,255,0.95)] transition-colors duration-300 hover:border-[#ead8e5] sm:gap-4 sm:p-5 lg:gap-5 lg:p-6"
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#f6d8eb]/60 to-[#e8e2ff]/20 blur-2xl transition duration-500 group-hover:scale-150"
          />

          <div
            aria-hidden="true"
            className={`highlight-icon relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white bg-gradient-to-br from-white to-[#f4f3f8] shadow-[0_5px_10px_rgba(30,20,45,0.07),inset_0_1px_1px_white] transition-shadow duration-300 group-hover:shadow-[0_10px_18px_rgba(30,20,45,0.12)] sm:h-12 sm:w-12 lg:h-14 lg:w-14 ${item.iconColor}`}
          >
            <span className="absolute inset-[3px] rounded-[13px] border border-black/[0.025]" />
            <span className="relative text-[27px] font-medium leading-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.08)]">
              {item.icon}
            </span>
          </div>

          <div className="relative min-w-0 flex-1">
            <h2 className="text-[15px] font-bold tracking-[-0.035em] text-[#202027] sm:text-base lg:text-lg">
              {item.title}
            </h2>

            <p className="mt-1.5 max-w-[250px] text-[13px] leading-5 text-[#686873] sm:text-xs sm:leading-5 lg:text-sm">
              {item.description}
            </p>

            <div
              aria-hidden="true"
              className="mt-3 h-[2px] w-8 rounded-full bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4] opacity-60 transition-all duration-300 group-hover:w-14 group-hover:opacity-100"
            />
          </div>
        </article>
      ))}

      <style jsx>{`
        .highlight-card {
          transform-style: preserve-3d;
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
        }

        .highlight-icon {
          transform-style: preserve-3d;
        }

        @media (prefers-reduced-motion: reduce) {
          .highlight-card,
          .highlight-icon {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default function AboutStory() {
  const aboutRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      gsap.from(".about-hero-copy > *", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
      });

      gsap.to(".about-3d-accent", {
        y: -4,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      gsap.from(".highlight-card", {
        scrollTrigger: {
          trigger: ".about-highlights",
          start: "top 88%",
          once: true,
        },
        y: 32,
        opacity: 0,
        rotateX: 5,
        transformPerspective: 900,
        stagger: 0.14,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".highlight-card", {
        y: -3,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.22,
      });

      gsap.from(".about-video-card", {
        scrollTrigger: {
          trigger: ".about-video-grid",
          start: "top 86%",
          once: true,
        },
        y: 42,
        opacity: 0,
        scale: 0.97,
        stagger: 0.15,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.to(".about-shop-image", {
        y: -5,
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".about-ambient-light", {
        x: 22,
        y: -16,
        scale: 1.08,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: aboutRef },
  );

  return (
    <main
      ref={aboutRef}
      id="main-content"
      className="overflow-hidden bg-white font-sans text-[#1d1d1f] antialiased"
    >
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#f5f5f7]">
        <Image
          src="/unnamed.webp"
          alt="MR Mobile Wala mobile shop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10 sm:via-white/85 sm:to-transparent"
        />

        <div className="relative mx-auto flex min-h-[340px] max-w-7xl items-center px-5 py-10 sm:min-h-[390px] sm:px-8 lg:min-h-[440px] lg:px-12">
          <div className="about-hero-copy max-w-[540px]">
            <SectionEyebrow>About MR Mobile Wala</SectionEyebrow>

            <h1 className="about-3d-heading text-[clamp(2.8rem,7vw,5.3rem)] font-extrabold leading-[0.91] tracking-[-0.075em]">
              <span className="about-3d-main block">Your local</span>
              <span className="about-3d-accent mt-1 block">
                mobile store.
              </span>
            </h1>

            <p className="text-sm font-semibold text-[#424245] sm:text-base">
              Phones <span className="mx-1.5 text-[#a1a1a6]">·</span>
              Accessories <span className="mx-1.5 text-[#a1a1a6]">·</span>
              Repair <span className="mx-1.5 text-[#a1a1a6]">·</span>
              Exchange
            </p>

            <p className="max-w-sm text-sm leading-6 text-[#515154] sm:text-base sm:leading-7">
              Technology ko simple banane ke liye, hum hamesha aapke saath hain.
            </p>

            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(225,48,108,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(225,48,108,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#833ab4]"
            >
              Talk to our team <span aria-hidden="true">→</span>
            </Link>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#424245]">
              <span>✓ Trusted advice</span>
              <span>✓ Genuine products</span>
              <span>✓ Friendly support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight cards */}
      <div className="about-highlights">
        <HighlightCards />
      </div>

      {/* About text and video cards */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-7 sm:py-12 lg:grid-cols-[0.9fr_1.7fr] lg:items-center lg:gap-12 lg:px-12">
        <div className="about-copy">
          <SectionEyebrow>A little about us</SectionEyebrow>

          <PremiumHeading
            first="Technology should feel"
            accent="personal."
          />

          <p className="mt-5 max-w-lg text-sm leading-7 text-[#666671] sm:text-base sm:leading-8">
            We help people explore smartphones, sell or exchange a device,
            find accessories, and ask about phone repairs.
          </p>

          <Link
            href="/contact"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d2d2d7] bg-white px-5 text-sm font-semibold shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#e1306c] hover:text-[#c02670] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#833ab4]"
          >
            Know more about us <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="about-video-grid grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
          {services.map((service, index) => {
            const videoId =
              service.type === "youtube"
                ? service.video.split("/embed/")[1]
                : "";

            return (
              <article
                key={service.title}
                className="about-video-card group min-w-0"
              >
                <div className="relative h-52 overflow-hidden rounded-2xl bg-[#1E1E1E] shadow-[0_8px_24px_rgba(20,20,40,0.07)] transition-shadow duration-300 group-hover:shadow-[0_16px_32px_rgba(20,20,40,0.13)] sm:h-36 lg:h-48">
                  {service.type === "youtube" ? (
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoId}&controls=0&rel=0`}
                      title={service.title}
                      allow="autoplay; encrypted-media; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={service.title}
                    >
                      <source src={service.video} type="video/mp4" />
                      Your browser does not support HTML video.
                    </video>
                  )}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10"
                  />

                  <span className="pointer-events-none absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/50 bg-white/80 text-xs font-bold text-[#29242b] shadow-sm backdrop-blur">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-bold leading-5 tracking-tight sm:text-base">
                  {service.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#6e6e73] sm:text-sm">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Our story */}
      <section className="relative mt-2 overflow-hidden bg-[#fafafc]">
        <div
          aria-hidden="true"
          className="about-ambient-light pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f5cce0]/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-9 sm:px-7 sm:py-12 md:grid-cols-[1.15fr_1fr] lg:gap-12 lg:px-12">
          <div className="about-shop-image group relative h-[230px] overflow-hidden rounded-2xl bg-[#e8e8ed] shadow-[0_14px_36px_rgba(20,20,40,0.1)] sm:h-[300px] lg:h-[360px]">
            <Image
              src="/unnamed.webp"
              alt="MR Mobile Wala store front"
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
            />

            <span className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-white/90 px-4 py-2 text-xs font-semibold text-[#29242b] shadow-lg backdrop-blur">
              Your local mobile destination
            </span>
          </div>

          <div>
            <SectionEyebrow>Our story</SectionEyebrow>

            <PremiumHeading
              first="Making phone decisions"
              accent="simpler."
            />

            <p className="mt-5 text-sm leading-7 text-[#666671] sm:text-base sm:leading-8">
              Har enquiry ek conversation se shuru hoti hai. Apni need
              batayein, questions poochhein aur available options samajhkar
              agla step choose karein.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-[#424245] sm:text-sm">
              <span>♧ Personal guidance</span>
              <span>◇ Clear options</span>
              <span>✓ Informed decisions</span>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#c02670] transition hover:gap-3 hover:text-[#833ab4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#833ab4]"
            >
              Talk to our team <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Cinematic 3D typography */}
      <style jsx global>{`
        .about-3d-heading {
          position: relative;
          isolation: isolate;
          overflow-wrap: anywhere;
          text-wrap: balance;
          transform-style: preserve-3d;
          -webkit-font-smoothing: antialiased;
        }

        .about-3d-main {
          color: #202024;
          text-shadow:
            0 1px 0 #ffffff,
            0 2px 0 #e9e7ec,
            0 3px 0 #d9d6de,
            0 4px 0 #cbc7d1,
            0 7px 12px rgba(34, 24, 44, 0.12);
        }

        .about-3d-accent {
          display: inline-block;
          color: transparent;
          background-image: linear-gradient(
            105deg,
            #ff792d 0%,
            #f04479 42%,
            #a43ac0 72%,
            #6d42c7 100%
          );
          background-size: 180% 180%;
          background-clip: text;
          -webkit-background-clip: text;
          filter:
            drop-shadow(0 2px 0 rgba(142, 48, 112, 0.17))
            drop-shadow(0 7px 9px rgba(142, 48, 112, 0.12));
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-3d-main,
          .about-3d-accent {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}

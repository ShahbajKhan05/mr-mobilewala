
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const COOKIE_KEY = "mr-mobile-cookie-notice";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const noticeRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(COOKIE_KEY) !== "accepted") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible || !noticeRef.current) return;

    const notice = noticeRef.current;

    const animation = gsap.fromTo(
      notice,
      {
        y: 35,
        x: -12,
        opacity: 0,
        scale: 0.94,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        delay: 0.15,
        ease: "back.out(1.5)",
      }
    );

    return () => {
      animation.kill();
    };
  }, [visible]);

  function dismissNotice() {
    const notice = noticeRef.current;

    if (!notice) {
      setVisible(false);
      return;
    }

    gsap.to(notice, {
      y: 24,
      opacity: 0,
      scale: 0.95,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        try {
          window.localStorage.setItem(COOKIE_KEY, "accepted");
        } catch {
          // Keep the notice dismissible if storage is unavailable.
        }
        setVisible(false);
      },
    });
  }

  if (!visible) return null;

  return (
    <aside
      ref={noticeRef}
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-4 left-4 z-[9999] w-[min(350px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-white/80 bg-white/95 p-4 text-[#171717] shadow-[0_18px_60px_rgba(20,30,25,0.18)] backdrop-blur-xl"
    >
      {/* Animated gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 overflow-hidden">
        <div className="cookie-gradient h-full w-[200%]" />
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-violet-400 shadow-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 text-[#142b27]"
            aria-hidden="true"
          >
            <path
              d="M12 3a3 3 0 0 0 4 4 3 3 0 0 0 4 3 8 8 0 1 1-8-7Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="8" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="17" r="1" fill="currentColor" />
            <circle cx="7" cy="16" r="1" fill="currentColor" />
          </svg>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold tracking-tight">
              Cookie notice
            </h2>

            <button
              type="button"
              onClick={dismissNotice}
              aria-label="Close cookie notice"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg text-black/50 transition hover:bg-black/5 hover:text-black"
            >
              ×
            </button>
          </div>

          <p className="mt-1.5 text-xs leading-[1.6] text-black/60">
            We use essential and analytics cookies to improve
            your browsing experience.
          </p>
        </div>
      </div>

      <button
        ref={buttonRef}
        type="button"
        onClick={dismissNotice}
        onMouseEnter={() => {
          if (!buttonRef.current) return;

          gsap.to(buttonRef.current, {
            scale: 1.025,
            duration: 0.2,
            ease: "power2.out",
          });
        }}
        onMouseLeave={() => {
          if (!buttonRef.current) return;

          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        }}
        className="cookie-button relative mt-4 flex min-h-11 w-full items-center justify-center overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md outline-none transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        <span className="relative z-10 flex items-center gap-2">
          Got it
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="m5 10 3.2 3.2L15 6.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <style jsx>{`
        .cookie-gradient {
          background: linear-gradient(
            90deg,
            #10b981,
            #06b6d4,
            #8b5cf6,
            #ec4899,
            #10b981
          );
          background-size: 200% 100%;
          animation: gradient-flow 4s linear infinite;
        }

        .cookie-button {
          background: linear-gradient(
            110deg,
            #102f29,
            #087f67,
            #2563eb,
            #7c3aed,
            #102f29
          );
          background-size: 250% 100%;
          animation: button-flow 5s ease infinite;
        }

        @keyframes gradient-flow {
          from {
            background-position: 0% 50%;
          }
          to {
            background-position: 200% 50%;
          }
        }

        @keyframes button-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cookie-gradient,
          .cookie-button {
            animation: none;
          }
        }
      `}</style>
    </aside>
  );
}

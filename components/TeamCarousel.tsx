
"use client";

import Image from "next/image";
import { useState } from "react";

const TEAM = [
  {
    name: "Ainul Khan",
    role: "Owner & Founder",
    image: "/Logo.png",
    number: "01",
    initials: "AK",
  },
  {
    name: "Mo.Shahbaj",
    role: "Developer & Designer",
    image: "/Logo.png",
    number: "02",
    initials: "TM",
  },
  {
    name: "Abdul Haque",
    role: "Service & Accessories",
    image: "/Logo.png",
    number: "03",
    initials: "TM",
  },
];

export default function TeamCarousel() {
  const [active, setActive] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const move = (step: number) => {
    setActive((current) => (current + step + TEAM.length) % TEAM.length);
  };

  return (
    <section
      id="our-team"
      aria-labelledby="team-title"
      className="relative isolate flex min-h-[calc(100svh-100px)] flex-col justify-center overflow-hidden bg-[#f7f7f5] px-4 py-5 text-neutral-950 sm:min-h-[calc(100svh-110px)] sm:px-6 sm:py-6 lg:min-h-[calc(100svh-125px)] lg:py-6"
    >
      {/* Soft background highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 -z-10 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl sm:h-64 sm:w-64"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-16 -z-10 h-48 w-48 rounded-full bg-orange-100/60 blur-3xl"
      />

      <div className="mx-auto w-full max-w-6xl">
        {/* Compact heading */}
        <div className="flex flex-col gap-2 border-b border-neutral-900/10 pb-3 sm:flex-row sm:items-end sm:justify-between sm:pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white/80 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                MR Mobile Wala · Our Team
              </p>
            </div>

            <h2
              id="team-title"
              className="mt-2 text-2xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-3xl md:text-4xl lg:text-5xl"
            >
              People who make
              <br />
              <span className="text-neutral-500">
                technology feel simple.
              </span>
            </h2>
          </div>

          <p className="max-w-xs text-[11px] leading-4 text-neutral-600 sm:text-xs sm:leading-5 md:text-sm">
            Friendly people, helpful advice, and a better experience with every
            visit.
          </p>
        </div>

        {/* Responsive carousel */}
        <div className="mx-auto mt-4 max-w-4xl sm:mt-5">
          <div
            className="relative h-[250px] overflow-hidden sm:h-[310px] md:h-[340px] lg:h-[370px]"
            role="region"
            aria-roledescription="carousel"
            aria-label="MR Mobile Wala team"
          >
            {TEAM.map((person, index) => {
              let offset = index - active;

              if (offset > TEAM.length / 2) offset -= TEAM.length;
              if (offset < -TEAM.length / 2) offset += TEAM.length;

              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <button
                  key={person.number}
                  type="button"
                  aria-label={`Show ${person.name}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(index)}
                  className="absolute left-1/2 top-0 h-full w-[min(62vw,200px)] outline-none transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-amber-500 sm:w-[min(38vw,245px)] md:w-[260px] lg:w-[275px]"
                  style={{
                    transform: `translateX(calc(-50% + ${
                      offset === 0
                        ? "0px"
                        : offset > 0
                          ? "clamp(48px, 12vw, 110px)"
                          : "clamp(-110px, -12vw, -48px)"
                    })) scale(${isActive ? 1 : 0.82})`,
                    opacity: isActive ? 1 : isVisible ? 0.48 : 0,
                    filter: isActive ? "saturate(1)" : "saturate(0.55)",
                    zIndex: 10 - Math.abs(offset),
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                >
                  {/* Image */}
                  <div
                    className={`relative h-[180px] overflow-hidden rounded-t-xl bg-neutral-200 transition-shadow duration-500 sm:h-[235px] md:h-[260px] lg:h-[280px] ${
                      isActive
                        ? "shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                        : "shadow-sm"
                    }`}
                  >
                    {failedImages.includes(person.image) ? (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-300">
                        <span className="text-4xl font-semibold tracking-tight text-neutral-400 sm:text-5xl">
                          {person.initials}
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 639px) 62vw, 275px"
                        className="object-cover object-center transition-transform duration-700"
                        onError={() =>
                          setFailedImages((current) =>
                            current.includes(person.image)
                              ? current
                              : [...current, person.image]
                          )
                        }
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/20 px-2 py-1 text-[8px] tracking-widest text-white backdrop-blur-md sm:left-3.5 sm:top-3.5 sm:text-[9px]">
                      {person.number} / {String(TEAM.length).padStart(2, "0")}
                    </span>

                    <span className="absolute bottom-3 left-3 text-[8px] font-medium tracking-[0.16em] text-white/90">
                      MR MOBILE WALA
                    </span>

                    {isActive && (
                      <span className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        >
                          <path
                            d="m7 12.5 3.2 3L17 8.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* Member details */}
                  <div
                    className={`rounded-b-xl border border-t-0 border-neutral-900/10 bg-white/95 px-3 py-2.5 text-left backdrop-blur-sm transition-all duration-500 sm:px-3.5 sm:py-3 ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0"
                    }`}
                  >
                    <h3 className="truncate text-sm font-semibold tracking-tight sm:text-base md:text-lg">
                      {person.name}
                    </h3>
                    <p className="mt-0.5 truncate text-[9px] text-neutral-500 sm:text-[10px] md:text-xs">
                      {person.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Compact navigation footer */}
          <div className="mt-1 flex items-center justify-between border-t border-neutral-900/10 pt-2">
            <div className="min-w-0">
              <p className="text-[8px] font-medium uppercase tracking-[0.15em] text-neutral-500 sm:text-[9px]">
                Meet the team
              </p>
              <p className="mt-0.5 truncate text-[11px] font-semibold text-neutral-900 sm:text-xs">
                {TEAM[active].name}
                <span className="ml-2 font-normal text-neutral-400">
                  {TEAM[active].number} /{" "}
                  {String(TEAM.length).padStart(2, "0")}
                </span>
              </p>
            </div>

            <div className="ml-3 flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous team member"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-900/15 bg-white/80 transition duration-300 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white sm:h-9 sm:w-9"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M19 12H5m7 7-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next team member"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-900/15 bg-white/80 transition duration-300 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white sm:h-9 sm:w-9"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14m-7-7 7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {TEAM[active].name}, member {active + 1} of {TEAM.length}.
          </p>
        </div>
      </div>
    </section>
  );
}

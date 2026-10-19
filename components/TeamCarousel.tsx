
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
    initials: "MS",
  },
  {
    name: "Abdul Haque",
    role: "Service & Accessories",
    image: "/Logo.png",
    number: "03",
    initials: "AH",
  },
];

function TechIcon() {
  return (
    <span
      aria-hidden="true"
      className="team-tech-icon relative mx-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white text-[#e1306c] shadow-[0_5px_15px_rgba(100,50,100,0.13)] sm:mx-2 sm:h-12 sm:w-12 sm:rounded-2xl"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="h-5 w-5 sm:h-7 sm:w-7"
      >
        <rect
          x="8"
          y="2.5"
          width="16"
          height="27"
          rx="3.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 6h8M13 25.5h6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="15.5" r="3" fill="#833ab4" />
      </svg>
    </span>
  );
}

export default function TeamCarousel() {
  const [active, setActive] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const move = (step: number) => {
    setActive(
      (current) => (current + step + TEAM.length) % TEAM.length
    );
  };

  return (
    <section
      id="our-team"
      aria-labelledby="team-title"
      className="team-showcase relative isolate flex min-h-[620px] flex-col justify-center overflow-hidden bg-[#faf9f7] px-4 py-10 text-neutral-950 sm:min-h-[690px] sm:px-6 sm:py-12 lg:min-h-[740px] lg:px-10"
    >
      {/* Soft ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 -z-10 h-64 w-64 rounded-full bg-[#f2c5dd]/40 blur-3xl sm:h-96 sm:w-96"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 -z-10 h-64 w-64 rounded-full bg-[#f6d9bc]/50 blur-3xl sm:h-96 sm:w-96"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-white/80 blur-3xl"
      />

      <div className="mx-auto w-full max-w-6xl">
        {/* Premium team heading */}
        <header className="border-b border-neutral-900/10 pb-5 sm:pb-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/75 px-3 py-1.5 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e1306c] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e1306c]" />
                </span>

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 sm:text-[10px]">
                  MR Mobile Wala · Our Team
                </p>
              </div>

              <h2
                id="team-title"
                className="team-3d-heading text-[clamp(2.15rem,6vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.075em]"
              >
                <span className="team-heading-main">People who make</span>

                <span className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-2 sm:gap-x-2">
                  <span className="team-heading-accent">
                    technology
                  </span>

                  <TechIcon />

                  <span className="team-heading-muted">
                    feel simple.
                  </span>
                </span>
              </h2>
            </div>

            <p className="max-w-xs text-xs leading-6 text-neutral-600 sm:text-sm">
              Friendly people, helpful advice, and a better experience
              with every visit.
              <span className="mt-2 block font-semibold text-[#c02670]">
                Personal service. Real people.
              </span>
            </p>
          </div>
        </header>

        {/* Team carousel */}
        <div className="mx-auto mt-7 max-w-4xl sm:mt-9">
          <div
            className="relative h-[300px] overflow-hidden sm:h-[390px] md:h-[420px] lg:h-[450px]"
            role="region"
            aria-roledescription="carousel"
            aria-label="MR Mobile Wala team"
          >
            {TEAM.map((person, index) => {
              let offset = index - active;

              if (offset > TEAM.length / 2) {
                offset -= TEAM.length;
              }

              if (offset < -TEAM.length / 2) {
                offset += TEAM.length;
              }

              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <button
                  key={person.number}
                  type="button"
                  aria-label={`Show ${person.name}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(index)}
                  className="team-member-card absolute left-1/2 top-0 h-full w-[min(62vw,220px)] outline-none transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-[#e1306c] sm:w-[min(38vw,270px)] md:w-[285px] lg:w-[300px]"
                  style={{
                    transform: `translateX(calc(-50% + ${
                      offset === 0
                        ? "0px"
                        : offset > 0
                          ? "clamp(55px, 14vw, 155px)"
                          : "clamp(-155px, -14vw, -55px)"
                    })) scale(${isActive ? 1 : 0.83})`,
                    opacity: isActive ? 1 : isVisible ? 0.65 : 0,
                    filter: isActive ? "saturate(1)" : "saturate(0.65)",
                    zIndex: 10 - Math.abs(offset),
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                >
                  {/* Portrait */}
                  <div
                    className={`team-portrait relative h-[215px] overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#f0eaf2] via-[#e5e0e7] to-[#d4cbd7] sm:h-[295px] md:h-[320px] lg:h-[345px] ${
                      isActive
                        ? "shadow-[0_22px_50px_rgba(52,30,60,0.18)]"
                        : "shadow-lg"
                    }`}
                  >
                    {failedImages.includes(person.image) ? (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#fff1f5] via-[#eee5f3] to-[#ded7e8]">
                        <span className="team-initials text-5xl font-black tracking-[-0.08em] text-[#a43ac0] sm:text-7xl">
                          {person.initials}
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 639px) 62vw, 300px"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        onError={() =>
                          setFailedImages((current) =>
                            current.includes(person.image)
                              ? current
                              : [...current, person.image]
                          )
                        }
                      />
                    )}

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#211728]/75 via-transparent to-black/10"
                    />

                    <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-black/20 px-2.5 py-1.5 text-[9px] font-semibold tracking-[0.15em] text-white shadow-sm backdrop-blur-lg sm:left-4 sm:top-4 sm:text-[10px]">
                      {person.number} / {String(TEAM.length).padStart(2, "0")}
                    </span>

                    <span className="absolute bottom-4 left-3 text-[8px] font-bold tracking-[0.18em] text-white/90 sm:left-4 sm:text-[9px]">
                      MR MOBILE WALA
                    </span>

                    {isActive && (
                      <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-lg backdrop-blur-lg sm:bottom-4 sm:right-4">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-4 w-4"
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

                  {/* Member information */}
                  <div
                    className={`team-member-info rounded-b-2xl border border-t-0 border-white/80 bg-white/90 px-3 py-3 text-left shadow-[0_12px_30px_rgba(35,25,40,0.08)] backdrop-blur-xl transition-all duration-500 sm:px-4 sm:py-4 ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0"
                    }`}
                  >
                    <h3 className="truncate text-sm font-extrabold tracking-[-0.035em] text-[#242027] sm:text-lg">
                      {person.name}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="h-1 w-5 shrink-0 rounded-full bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4]" />

                      <p className="truncate text-[9px] font-medium text-neutral-500 sm:text-xs">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Carousel controls */}
          <div className="mt-3 flex items-center justify-between border-t border-neutral-900/10 pt-4 sm:mt-5">
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 sm:text-[10px]">
                Meet the team
              </p>

              <p className="mt-1 truncate text-xs font-bold text-neutral-900 sm:text-sm">
                {TEAM[active].name}

                <span className="ml-2 font-medium text-neutral-400">
                  {TEAM[active].number} /{" "}
                  {String(TEAM.length).padStart(2, "0")}
                </span>
              </p>
            </div>

            <div className="ml-3 flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous team member"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/10 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#e1306c] hover:text-[#c02670] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#833ab4]"
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
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next team member"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/10 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#e1306c] hover:text-[#c02670] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#833ab4]"
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
                    strokeWidth="1.7"
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

      {/* Premium typography and responsive polish */}
      <style jsx global>{`
        .team-3d-heading {
          text-wrap: balance;
          -webkit-font-smoothing: antialiased;
        }

        .team-heading-main {
          color: #222027;
          text-shadow:
            0 1px 0 #ffffff,
            0 2px 0 #e8e4eb,
            0 3px 0 #d8d2df,
            0 5px 0 #c9c1d1,
            0 9px 18px rgba(35, 20, 45, 0.12);
        }

        .team-heading-accent {
          color: transparent;
          background: linear-gradient(
            110deg,
            #ff792d 0%,
            #f04479 42%,
            #a43ac0 72%,
            #7044c6 100%
          );
          background-size: 180% 180%;
          background-clip: text;
          -webkit-background-clip: text;
          filter: drop-shadow(0 2px 0 rgba(142, 48, 112, 0.15))
            drop-shadow(0 7px 10px rgba(142, 48, 112, 0.12));
          animation: team-gradient-flow 8s ease-in-out infinite alternate;
        }

        .team-heading-muted {
          color: #77717e;
          text-shadow:
            0 1px 0 #ffffff,
            0 2px 0 #e5e0e8,
            0 4px 0 #d6d0dc,
            0 7px 14px rgba(35, 20, 45, 0.1);
        }

        .team-tech-icon {
          animation: team-icon-float 4s ease-in-out infinite;
        }

        .team-member-card {
          transform-style: preserve-3d;
          -webkit-tap-highlight-color: transparent;
        }

        .team-portrait {
          isolation: isolate;
        }

        .team-member-info {
          transform-style: preserve-3d;
        }

        .team-initials {
          text-shadow:
            0 1px 0 #ffffff,
            0 3px 0 #e4d8eb,
            0 8px 18px rgba(100, 50, 120, 0.15);
        }

        @keyframes team-gradient-flow {
          from {
            background-position: 0% 50%;
          }
          to {
            background-position: 100% 50%;
          }
        }

        @keyframes team-icon-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @media (hover: hover) and (pointer: fine) {
          .team-member-card:hover .team-portrait {
            box-shadow: 0 25px 55px rgba(52, 30, 60, 0.2);
          }
        }

        @media (max-width: 380px) {
          .team-3d-heading {
            letter-spacing: -0.07em;
          }

          .team-tech-icon {
            width: 30px;
            height: 30px;
            border-radius: 10px;
          }

          .team-tech-icon svg {
            width: 17px;
            height: 17px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .team-heading-accent,
          .team-tech-icon {
            animation: none;
          }

          .team-member-card,
          .team-member-info,
          .team-portrait {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

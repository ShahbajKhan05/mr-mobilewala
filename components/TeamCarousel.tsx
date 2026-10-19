
"use client";

import Image from "next/image";
import { useCallback, useId, useState } from "react";
import type { KeyboardEvent } from "react";

const TEAM = [
  {
    name: "Ainul Khan",
    role: "Owner & Founder",
    image: "/Logo.png",
    initials: "AK",
  },
  {
    name: "Mo.Shahbaj",
    role: "Developer & Designer",
    image: "/Logo.png",
    initials: "MS",
  },
  {
    name: "Abdul Haque",
    role: "Service & Accessories",
    image: "/Logo.png",
    initials: "AH",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
    >
      {direction === "left" ? (
        <path
          d="M19 12H5m7 7-7-7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 12h14m-7-7 7 7-7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function TeamCarousel() {
  const [active, setActive] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const carouselId = useId();

  const move = useCallback((step: number) => {
    setActive((current) => (current + step + TEAM.length) % TEAM.length);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        setActive(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setActive(TEAM.length - 1);
      }
    },
    [move],
  );

  const person = TEAM[active];

  return (
    <section
      id="our-team"
      aria-labelledby={`${carouselId}-heading`}
      className="relative isolate overflow-hidden bg-[#FAFAF8] px-4 py-10 text-[#1E1E1E] sm:px-6 sm:py-14 md:py-16 lg:px-10 lg:py-20"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 -z-10 size-64 rounded-full bg-[#F5CCE0]/45 blur-3xl sm:size-80 lg:size-96"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 -z-10 size-64 rounded-full bg-[#F6D9BC]/55 blur-3xl sm:size-80 lg:size-96"
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* Responsive heading */}
        <header className="grid grid-cols-1 gap-5 border-b border-black/10 pb-6 sm:gap-6 sm:pb-8 lg:grid-cols-[1fr_300px] lg:items-end xl:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-2 shadow-sm">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-[#E1306C]"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#666671] sm:text-xs">
                MR Mobile Wala · Our Team
              </span>
            </div>

            <h2
              id={`${carouselId}-heading`}
              className="team-heading text-[clamp(2rem,5.5vw,4.8rem)] font-extrabold leading-[1.06] tracking-[-0.06em]"
            >
              <span className="block">Our</span>

              <span className="mt-1 block">
                <span className="team-gradient-text">Team</span>{" "}
                <span className="team-heading-muted">Members</span>
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end">
            <p className="text-sm leading-6 text-[#666671] sm:text-base sm:leading-7">
             Personal service. Apne log. Dil se madad.
            </p>

            <p className="mt-2 text-sm font-semibold text-[#C02670] sm:text-base">
             Sirf phone nahi, milega sahi solution bhi!
            </p>
          </div>
        </header>

        {/* Carousel */}
        <div className="mx-auto mt-7 w-full max-w-5xl sm:mt-9 lg:mt-12">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="MR Mobile Wala team members"
            aria-describedby={`${carouselId}-instructions`}
            onKeyDown={handleKeyDown}
            className="w-full"
          >
            <p id={`${carouselId}-instructions`} className="sr-only">
              Use the left and right arrow keys to change the team member.
              Home selects the first member. End selects the last member.
            </p>

            {/* One centred card, no horizontal clipping */}
            <div className="mx-auto w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px]">
              <article
                aria-labelledby={`${carouselId}-member`}
                className="overflow-hidden rounded-2xl sm:rounded-3xl"
              >
                <div className="relative h-[260px] overflow-hidden bg-gradient-to-br from-[#F5CCE0] via-[#EEE5F3] to-[#F6D9BC] sm:h-[340px] md:h-[370px] lg:h-[400px] xl:h-[420px]">
                  {failedImages.includes(person.name) ? (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#FFF1F5] via-[#EEE5F3] to-[#DED7E8]">
                      <span className="text-7xl font-black tracking-[-0.08em] text-[#833AB4] sm:text-8xl">
                        {person.initials}
                      </span>
                    </div>
                  ) : (
                    <Image
                      key={`${person.name}-${person.image}`}
                      src={person.image}
                      alt={`Portrait of ${person.name}`}
                      fill
                      priority={active === 0}
                      sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 400px, 480px"
                      className="team-member-image object-cover object-center"
                      onError={() => {
                        setFailedImages((current) =>
                          current.includes(person.name)
                            ? current
                            : [...current, person.name],
                        );
                      }}
                    />
                  )}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10"
                  />

                  <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-black/25 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-white backdrop-blur-md sm:left-4 sm:top-4 sm:text-xs">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(TEAM.length).padStart(2, "0")}
                  </span>

                  <span className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[0.18em] text-white sm:bottom-5 sm:left-5 sm:text-xs">
                    MR MOBILE WALA
                  </span>
                </div>

                <div className="border border-t-0 border-black/5 bg-white px-4 py-5 shadow-[0_12px_30px_rgba(35,25,40,0.06)] sm:px-6 sm:py-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A1A1A6] sm:text-xs">
                    Team member
                  </p>

                  <h3
                    id={`${carouselId}-member`}
                    className="mt-2 break-words text-xl font-extrabold tracking-[-0.04em] sm:text-2xl md:text-3xl"
                  >
                    {person.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-1 w-8 shrink-0 rounded-full bg-gradient-to-r from-[#FE9A00] via-[#E1306C] to-[#833AB4]"
                    />

                    <p className="text-sm font-medium text-[#666671] sm:text-base">
                      {person.role}
                    </p>
                  </div>
                </div>
              </article>
            </div>

            {/* Previous / Next buttons */}
            <div className="mt-5 flex flex-col gap-4 border-t border-black/10 pt-5 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between sm:mt-7 sm:pt-6">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#737373] sm:text-xs">
                  Meet the team
                </p>

                <p className="mt-1 break-words text-sm font-bold text-[#1E1E1E] sm:text-base">
                  {person.name}
                  <span className="ml-2 font-medium text-[#A1A1A6]">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(TEAM.length).padStart(2, "0")}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Previous team member"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-3 text-[#1E1E1E] shadow-sm transition-colors hover:border-[#E1306C] hover:text-[#C02670] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#833AB4] active:scale-[0.98] sm:min-h-14 sm:gap-2.5 sm:px-5"
                >
                  <ArrowIcon direction="left" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wide sm:text-sm">
                    Previous
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Next team member"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-3 text-[#1E1E1E] shadow-sm transition-colors hover:border-[#E1306C] hover:text-[#C02670] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#833AB4] active:scale-[0.98] sm:min-h-14 sm:gap-2.5 sm:px-5"
                >
                  <span className="text-[11px] font-extrabold uppercase tracking-wide sm:text-sm">
                    Next
                  </span>
                  <ArrowIcon direction="right" />
                </button>
              </div>
            </div>

            {/* Direct selection */}
            <div
              className="mt-5 flex justify-center gap-2"
              role="group"
              aria-label="Choose a team member"
            >
              {TEAM.map((member, index) => (
                <button
                  key={member.name}
                  type="button"
                  aria-label={`Show ${member.name}`}
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition-[width,background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#833AB4] ${
                    active === index
                      ? "w-8 bg-[#E1306C]"
                      : "w-2.5 bg-[#D4D4D4] hover:bg-[#737373]"
                  }`}
                />
              ))}
            </div>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              Showing {person.name}, member {active + 1} of {TEAM.length}.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .team-heading {
          text-wrap: balance;
          -webkit-font-smoothing: antialiased;
        }

        .team-heading-muted {
          color: #77717e;
          text-shadow:
            0 1px 0 #ffffff,
            0 2px 0 #e5e0e8,
            0 4px 0 #d6d0dc,
            0 7px 14px rgba(35, 20, 45, 0.08);
        }

        .team-gradient-text {
          color: transparent;
          background: linear-gradient(
            110deg,
            #ff792d 0%,
            #f04479 42%,
            #a43ac0 72%,
            #7044c6 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          filter: drop-shadow(0 3px 7px rgba(142, 48, 112, 0.1));
        }

        .team-member-image {
          transition: transform 350ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .team-member-image:hover {
            transform: scale(1.025);
          }
        }

        @media (max-width: 380px) {
          .team-heading {
            letter-spacing: -0.07em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .team-member-image {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

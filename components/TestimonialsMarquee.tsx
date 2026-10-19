
"use client";

import * as React from "react";

const reviews = [
  {
    name: "Customer Review",
    detail: "Smartphone purchase",
    initials: "MR",
    body: "Yahan apne customer ka genuine feedback add karein, jo unke shopping experience ko describe karta ho.",
  },
  {
    name: "Customer Review",
    detail: "Mobile accessories",
    initials: "MR",
    body: "Customer ka actual experience yahan share karein, jaise product quality ya helpful service.",
  },
  {
    name: "Customer Review",
    detail: "Store experience",
    initials: "MR",
    body: "Apni shop ke liye real customer feedback use karein, taaki naye visitors ko genuine information mile.",
  },
  {
    name: "Customer Review",
    detail: "Phone servicing",
    initials: "MR",
    body: "Repair ya servicing ke baad customer ne jo feedback diya hai, use yahan add karein.",
  },
  {
    name: "Customer Review",
    detail: "New smartphone",
    initials: "MR",
    body: "Customer ki permission ke saath unka original review yahan publish karein.",
  },
  {
    name: "Customer Review",
    detail: "Accessories purchase",
    initials: "MR",
    body: "Is placeholder ko actual customer ke words se replace karna na bhoolein.",
  },
];

type Review = (typeof reviews)[number];

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex w-[260px] shrink-0 flex-col rounded-2xl border border-[#E5E5E5] bg-white p-4 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(30,30,30,0.06)] sm:w-[300px] sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F5CCE0]/60 text-xs font-bold text-[#833AB4]">
          {review.initials}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-extrabold tracking-tight text-[#1E1E1E]">
            {review.name}
          </h3>
          <p className="mt-0.5 text-xs text-[#666671]">
            {review.detail}
          </p>
        </div>
      </div>

      <div
        className="mt-3 text-sm tracking-[3px] text-[#FE9A00]"
        aria-label="Sample five-star display"
      >
        ★★★★★
      </div>

      <p className="mt-2 text-[13px] leading-[1.7] text-[#525252] sm:mt-3 sm:text-sm sm:leading-6">
        {review.body}
      </p>
    </article>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration = 36,
}: {
  items: Review[];
  reverse?: boolean;
  duration?: number;
}) {
  const [paused, setPaused] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);

  const trackRef = React.useRef<HTMLDivElement>(null);
  const startX = React.useRef(0);
  const startOffset = React.useRef(0);
  const offset = React.useRef(0);
  const didDrag = React.useRef(false);
  const pointerId = React.useRef<number | null>(null);

  const animationName = reverse
    ? "testimonial-marquee-reverse"
    : "testimonial-marquee-forward";

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    const computed = window.getComputedStyle(track);
    const matrix = new DOMMatrixReadOnly(computed.transform);
    const currentX = computed.transform === "none" ? 0 : matrix.m41;

    offset.current = currentX;
    startOffset.current = currentX;
    startX.current = event.clientX;
    didDrag.current = false;
    pointerId.current = event.pointerId;

    track.style.animation = "none";
    track.style.transform = `translate3d(${currentX}px, 0, 0)`;

    setPaused(true);
    setDragging(true);

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (
      !dragging ||
      pointerId.current !== event.pointerId ||
      !trackRef.current
    ) {
      return;
    }

    const delta = event.clientX - startX.current;

    if (Math.abs(delta) > 4) {
      didDrag.current = true;
    }

    offset.current = startOffset.current + delta;

    trackRef.current.style.transform =
      `translate3d(${offset.current}px, 0, 0)`;
  };

  const resumeAnimation = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;

    if (halfWidth <= 0) {
      setPaused(false);
      return;
    }

    // Keep the offset within one repeated content cycle.
    let normalized = offset.current % halfWidth;

    if (normalized > 0) normalized -= halfWidth;

    offset.current = normalized;

    // Rebase animation from the current drag position.
    const progress = Math.min(
      1,
      Math.abs(normalized) / halfWidth
    );

    const elapsed = progress * duration;

    track.style.transform = `translate3d(${normalized}px, 0, 0)`;
    track.style.animation = "none";

    // Force style calculation before restarting the CSS animation.
    void track.offsetWidth;

    track.style.animation =
      `${animationName} ${duration}s linear ${-elapsed}s infinite`;

    track.style.animationDirection = "normal";
    track.style.animationPlayState = "running";

    setPaused(false);
  }, [animationName, duration]);

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (pointerId.current !== event.pointerId) return;

    const target = event.currentTarget;

    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }

    pointerId.current = null;
    setDragging(false);

    resumeAnimation();
  };

  const handlePointerCancel = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (pointerId.current !== event.pointerId) return;

    pointerId.current = null;
    setDragging(false);
    resumeAnimation();
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    // Mouse-only hover; touch devices should not remain paused.
    if (!dragging && event.buttons === 0) {
      setPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (!dragging && pointerId.current === null) {
      setPaused(false);
    }
  };

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.style.animationPlayState =
      paused || dragging ? "paused" : "running";
  }, [paused, dragging]);

  return (
    <div
      className={`overflow-hidden ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        className="testimonial-marquee-track flex w-max"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          animationPlayState:
            paused || dragging ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
          >
            {items.map((review, index) => (
              <ReviewCard
                key={`${review.detail}-${index}`}
                review={review}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  const firstRow = reviews.slice(0, 3);
  const secondRow = reviews.slice(3, 6);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative isolate overflow-hidden bg-[#FAFAF8] py-10 sm:py-16 md:py-20"
    >
      <style>{`
        @keyframes testimonial-marquee-forward {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes testimonial-marquee-reverse {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-marquee-track {
            animation-play-state: paused !important;
          }
        }
      `}</style>

      <header className="mx-auto mb-7 max-w-3xl px-4 text-center sm:mb-10 sm:px-5 md:mb-12">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C02670] sm:text-xs sm:tracking-[0.25em]">
          THE MR MOBILE WALA EXPERIENCE
        </p>

        <h2
          id="testimonials-heading"
          className="mt-3 text-[28px] font-bold leading-[1.1] tracking-[-0.05em] text-[#1E1E1E] sm:text-4xl md:text-5xl"
        >
          Good service speaks
          <br className="hidden sm:block" /> for itself.
        </h2>

        <p className="mx-auto mt-3 max-w-md text-[13px] leading-5 text-[#666671] sm:mt-4 sm:text-sm sm:leading-6">
          Technology is personal. So is the way we help you choose it.
        </p>
      </header>

      <div className="relative flex flex-col gap-3 sm:gap-4">
        <MarqueeRow items={firstRow} duration={38} />
        <MarqueeRow items={secondRow} reverse duration={42} />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-[#FAFAF8] to-transparent sm:w-20"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-[#FAFAF8] to-transparent sm:w-20"
        />
      </div>
    </section>
  );
}


import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-x-hidden bg-[#FAFAF8] px-4 py-8 text-center text-[#222222] sm:px-5 sm:py-10">
      {/* Top border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-2 bg-[#263D38]"
      />

      {/* Brand Logo */}
      <Link
        href="/"
        aria-label="MR Mobile Wala homepage"
        className="absolute top-7 sm:top-9"
      >
        <BrandLogo variant="navbar" priority />
      </Link>

      {/* Main Content */}
      <section className="flex w-full max-w-xl flex-col items-center pt-12">
        {/* Icon */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          <Image
            src="/Logo.png"
            alt="Noor Tech logo"
            width={48}
            height={32}
            priority
            className="h-8 w-12 object-contain"
          />
        </div>

        {/* Version Label */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[#263D38]"
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/65">
            Version 0.1 · First Look
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl md:text-6xl">
          Coming Soon<span className="text-black/25">.</span>
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-md text-sm leading-6 text-black/65 sm:text-base sm:leading-7">
          We&apos;re working hard to bring you a better experience.
          <br />
          This is only the beginning.
          <br />
          <span className="text-black/80">
            A better experience is on its way.
          </span>
        </p>

        {/* Status */}
        <div className="mt-5 rounded-2xl bg-white px-5 py-3.5 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-medium text-[#263D38]">
            Something better is coming.
          </p>
          <p className="mt-1 text-xs leading-5 text-black/60">
            Stay tuned. We&apos;re building it for you.
          </p>
        </div>

        {/* Home Button */}
        <Link
          href="/"
          className="mt-5 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#222222] px-7 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
        >
          Back to Home
          <span aria-hidden="true">↗</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="absolute inset-x-0 bottom-3 px-4 text-center sm:bottom-4">
        <p className="text-xs text-black/55">
          Made with <span className="text-rose-400">♡</span> by Noor-Technologies
        </p>
      </footer>
    </main>
  );
}

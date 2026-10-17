
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080808] px-6 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.08] blur-[120px]" />

      {/* Center logo */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-8 w-[220px] sm:w-[300px]">
          <Image
            src="/Skull-logo.jpg"
            alt="Skull and crossbones"
            width={1248}
            height={1248}
            priority
            className="h-auto w-full object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.08)]"
          />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-red-500">
          Coming Soon
        </p>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Coming Soon<span className="text-red-500">.</span>
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-400">
          This page is coming soon. Check back soon.
        </p>

        <Link
          href="/"
          className="mt-8 rounded-full border border-white/20 px-7 py-3 text-sm font-medium transition duration-300 hover:border-white hover:bg-white hover:text-black"
        >
          ← Back to Home
        </Link>
      </div>

      <p className="absolute bottom-6 text-[10px] uppercase tracking-[0.3em] text-neutral-600">
        MR Mobile Wala
      </p>
    </main>
  );
}

import Link from "next/link";

export type FooterLinkPalette =
  | "cyan-blue"
  | "violet-blue"
  | "orange-pink"
  | "magenta-violet"
  | "cyan-violet"
  | "emerald-cyan"
  | "insta-gradient";

interface AnimatedFooterLinkProps {
  href: string;
  label: string;
  palette?: FooterLinkPalette;
  isExternal?: boolean;
  ariaLabel?: string;
  className?: string;
  icon?: React.ReactNode;
}

const PALETTES: Record<
  FooterLinkPalette,
  {
    bg: string;
    glow: string;
  }
> = {
  "cyan-blue": {
    bg: "from-[#06B6D4] via-[#3B82F6] to-[#2563EB]",
    glow: "bg-[#06B6D4]",
  },
  "violet-blue": {
    bg: "from-[#8B5CF6] via-[#6366F1] to-[#3B82F6]",
    glow: "bg-[#8B5CF6]",
  },
  "orange-pink": {
    bg: "from-[#F97316] via-[#FB7185] to-[#EC4899]",
    glow: "bg-[#F97316]",
  },
  "magenta-violet": {
    bg: "from-[#D946EF] via-[#A855F7] to-[#7C3AED]",
    glow: "bg-[#D946EF]",
  },
  "cyan-violet": {
    bg: "from-[#06B6D4] via-[#8B5CF6] to-[#A855F7]",
    glow: "bg-[#06B6D4]",
  },
  "emerald-cyan": {
    bg: "from-[#10B981] via-[#059669] to-[#06B6D4]",
    glow: "bg-[#10B981]",
  },
  "insta-gradient": {
    bg: "from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    glow: "bg-[#DD2A7B]",
  },
};

export default function AnimatedFooterLink({
  href,
  label,
  palette = "cyan-blue",
  isExternal = false,
  ariaLabel,
  className = "",
  icon,
}: AnimatedFooterLinkProps) {
  const colors = PALETTES[palette] || PALETTES["cyan-blue"];

  return (
    <Link
      href={href}
      aria-label={ariaLabel || label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group relative inline-flex items-center gap-3 sm:gap-3.5 w-fit py-1 px-1.5 -mx-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1E1E]/20 transition-all select-none ${className}`}
    >
      {/* =========================================================
          OPTIONAL ICON (For Social links - untouched, scales gently)
          ========================================================= */}
      {icon && (
        <div className="relative z-10 shrink-0 transition-transform duration-300 ease-out group-hover:scale-[1.08]">
          {icon}
        </div>
      )}

      {/* =========================================================
          TEXT CONTAINER WITH LIVING COLORFUL GLOW BEHIND THE WORD
          ========================================================= */}
      <span className="relative inline-flex items-center">
        {/* Soft Organic Color Aura Living Underneath the Typography */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-2 -inset-y-1 overflow-hidden rounded-full transition-all duration-500 ease-out"
        >
          {/* Subtle Base Wash (Always lightly present: opacity 0.08–0.12) */}
          <span
            className={`absolute inset-0 scale-x-95 scale-y-90 rounded-full bg-gradient-to-r ${colors.bg} opacity-[0.09] blur-[8px] transition-all duration-500 will-change-transform group-hover:scale-x-110 group-hover:scale-y-125 group-hover:opacity-[0.28] group-hover:blur-[6px] sm:opacity-[0.11] sm:group-hover:opacity-[0.32] sm:group-hover:blur-[8px]`}
          />

          {/* Micro Fluid Traveling Particle (Moves gently across the word on hover) */}
          <span
            className={`absolute left-[10%] top-1/2 h-6 w-6 scale-75 -translate-y-1/2 rounded-full ${colors.glow} opacity-0 blur-[6px] transition-all duration-700 ease-out will-change-transform group-hover:left-[70%] group-hover:scale-125 group-hover:opacity-40`}
          />
        </span>

        {/* Sharp, Clean Typography (#1E1E1E) sitting above color layer */}
        <span className="relative z-10 text-[15px] sm:text-[16px] font-medium text-[#1E1E1E] tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-0.5">
          {label}
        </span>
      </span>
    </Link>
  );
}

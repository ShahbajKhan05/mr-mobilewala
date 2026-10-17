import Image from "next/image";
import Link from "next/link";

export type LogoVariant = "navbar" | "footer" | "admin" | "login" | "custom";

export interface BrandLogoProps {
  /**
   * Layout context variant for intentional optical sizing
   * @default "navbar"
   */
  variant?: LogoVariant;
  /**
   * Navigation link target. Set to null or empty string to disable link wrapping.
   * @default "/" (or "/admin" for admin variant)
   */
  href?: string | null;
  /**
   * Additional container class names
   */
  className?: string;
  /**
   * Additional image class names
   */
  imageClassName?: string;
  /**
   * Prioritize image loading for above-the-fold/critical viewports
   * @default false
   */
  priority?: boolean;
  /**
   * Wrap inside a refined light surface pill when placed against dark backgrounds
   * @default false
   */
  withSurface?: boolean;
  /**
   * Optional manual width override (maintains 2.97:1 aspect ratio)
   */
  width?: number;
  /**
   * Optional manual height override
   */
  height?: number;
  /**
   * Optional custom alt text
   * @default "Mr. Mobile Wala"
   */
  alt?: string;
}

// ============================================================================
// OFFICIAL ASSET SOURCE OF TRUTH
// Native dimensions: 2160 x 728 (Aspect Ratio: ~2.967:1)
// Visible mark: ~2070 x 251 horizontally centered within safe PNG margins
// ============================================================================
const OFFICIAL_LOGO_PATH = "/mr-mobile-wala-logo.png";
const NATIVE_WIDTH = 2160;
const NATIVE_HEIGHT = 728;

// Contextual optical configurations
const VARIANT_CONFIGS: Record<
  LogoVariant,
  {
    defaultHref: string | null;
    width: number;
    height: number;
    sizes: string;
    imageClasses: string;
  }
> = {
  navbar: {
    defaultHref: "/",
    width: 162,
    height: 55,
    sizes: "(max-width: 640px) 120px, (max-width: 1024px) 144px, 162px",
    // Responsive optical scale: mobile -> tablet -> desktop (capped on ultrawide)
    imageClasses:
      "w-[112px] sm:w-[122px] md:w-[138px] lg:w-[152px] xl:w-[158px] max-w-[162px]",
  },
  footer: {
    defaultHref: "/",
    width: 520,
    height: 175,
    sizes: "(max-width: 640px) 260px, (max-width: 1024px) 380px, 500px",
    // Refined final brand signature (balanced, never excessively giant)
    imageClasses:
      "w-[min(72vw,250px)] sm:w-[min(58vw,360px)] md:w-[min(48vw,440px)] lg:w-[min(40vw,490px)] max-w-[500px]",
  },
  admin: {
    defaultHref: "/admin/inventory",
    width: 124,
    height: 42,
    sizes: "(max-width: 768px) 100px, 120px",
    // Compact operational size for sidebar & mobile app bar
    imageClasses: "w-[96px] sm:w-[108px] md:w-[118px] max-w-[124px]",
  },
  login: {
    defaultHref: "/",
    width: 170,
    height: 57,
    sizes: "(max-width: 640px) 140px, 170px",
    // Welcoming auth entry mark
    imageClasses: "w-[136px] sm:w-[155px] md:w-[168px] max-w-[175px]",
  },
  custom: {
    defaultHref: "/",
    width: 162,
    height: 55,
    sizes: "162px",
    imageClasses: "w-auto max-w-full",
  },
};

export default function BrandLogo({
  variant = "navbar",
  href,
  className = "",
  imageClassName = "",
  priority = false,
  withSurface = false,
  width,
  height,
  alt = "Mr. Mobile Wala",
}: BrandLogoProps) {
  const currentConfig = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.navbar;

  const targetHref = href !== undefined ? href : currentConfig.defaultHref;
  const renderWidth = width || currentConfig.width;
  const renderHeight = height || Math.round(renderWidth * (NATIVE_HEIGHT / NATIVE_WIDTH));

  const imageElement = (
    <Image
      src={OFFICIAL_LOGO_PATH}
      alt={alt}
      width={renderWidth}
      height={renderHeight}
      priority={priority}
      sizes={currentConfig.sizes}
      style={{ height: "auto" }}
      className={`h-auto object-contain select-none pointer-events-none drop-shadow-2xs transition-transform duration-200 ease-out group-hover/logo:scale-[1.015] ${currentConfig.imageClasses} ${imageClassName}`}
    />
  );

  const containerContent = withSurface ? (
    <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl bg-[#EDEDED] border border-white/10 shadow-2xs">
      {imageElement}
    </div>
  ) : (
    imageElement
  );

  const innerWrapper = (
    <div
      className={`group/logo relative inline-flex items-center justify-center select-none shrink-0 ${
        targetHref ? "cursor-pointer" : ""
      } ${className}`}
    >
      {containerContent}
    </div>
  );

  if (targetHref) {
    return (
      <Link
        href={targetHref}
        aria-label={`${alt} - Home`}
        className="inline-flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00796B]/50 rounded-lg shrink-0"
      >
        {innerWrapper}
      </Link>
    );
  }

  return innerWrapper;
}

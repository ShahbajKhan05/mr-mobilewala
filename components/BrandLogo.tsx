
import Image from "next/image";
import Link from "next/link";

export type LogoVariant = "navbar" | "footer" | "admin" | "login" | "custom";

export interface BrandLogoProps {
  variant?: LogoVariant;
  href?: string | null;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  withSurface?: boolean;
  width?: number;
  height?: number;
  alt?: string;
}

const OFFICIAL_LOGO_PATH = "/mr-mobile-wala-logo.png";

const NATIVE_WIDTH = 2160;
const NATIVE_HEIGHT = 728;
const LOGO_RATIO = NATIVE_WIDTH / NATIVE_HEIGHT;

const VARIANT_CONFIGS: Record<
  LogoVariant,
  {
    defaultHref: string | null;
    width: number;
    sizes: string;
    imageClasses: string;
  }
> = {
  navbar: {
    defaultHref: "/",
    width: 162,
    sizes: "(max-width: 360px) 108px, (max-width: 640px) 120px, (max-width: 1024px) 144px, 162px",
    imageClasses:
      "w-[108px] min-[400px]:w-[120px] sm:w-[132px] md:w-[144px] lg:w-[154px] xl:w-[162px]",
  },

  footer: {
    defaultHref: "/",
    width: 500,
    sizes: "(max-width: 360px) 200px, (max-width: 640px) 250px, (max-width: 1024px) 360px, 500px",
    imageClasses:
      "w-[min(72vw,250px)] sm:w-[min(58vw,360px)] md:w-[min(48vw,440px)] lg:w-[min(40vw,500px)]",
  },

  admin: {
    defaultHref: "/admin/inventory",
    width: 124,
    sizes: "(max-width: 360px) 88px, (max-width: 768px) 104px, 124px",
    imageClasses:
      "w-[88px] min-[400px]:w-[100px] sm:w-[108px] md:w-[118px] lg:w-[124px]",
  },

  login: {
    defaultHref: "/",
    width: 175,
    sizes: "(max-width: 360px) 128px, (max-width: 640px) 148px, 175px",
    imageClasses:
      "w-[128px] min-[400px]:w-[144px] sm:w-[158px] md:w-[168px] lg:w-[175px]",
  },

  custom: {
    defaultHref: "/",
    width: 162,
    sizes: "(max-width: 640px) 80vw, 162px",
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
  height: _height,
  alt = "Mr. Mobile Wala",
}: BrandLogoProps) {
  const config = VARIANT_CONFIGS[variant] ?? VARIANT_CONFIGS.navbar;

  const targetHref = href !== undefined ? href : config.defaultHref;
  const imageWidth = width ?? config.width;
  const imageHeight = Math.round(imageWidth / LOGO_RATIO);

  const imageElement = (
    <Image
      src={OFFICIAL_LOGO_PATH}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      priority={priority}
      sizes={config.sizes}
      draggable={false}
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        maxWidth: "100%",
        aspectRatio: `${NATIVE_WIDTH} / ${NATIVE_HEIGHT}`,
      }}
      className={[
        "h-auto max-w-full select-none object-contain",
        "transition-transform duration-300 ease-out",
        "motion-safe:group-hover/logo:scale-[1.02]",
        config.imageClasses,
        imageClassName,
      ].join(" ")}
    />
  );

  const content = withSurface ? (
    <span className="inline-flex max-w-full items-center justify-center rounded-xl border border-black/[0.05] bg-white px-3 py-2 shadow-sm">
      {imageElement}
    </span>
  ) : (
    imageElement
  );

  const logo = (
    <span
      className={[
        "group/logo relative inline-flex min-w-0 max-w-full",
        "shrink-0 items-center justify-center align-middle",
        className,
      ].join(" ")}
    >
      {content}
    </span>
  );

  if (!targetHref) {
    return logo;
  }

  return (
    <Link
      href={targetHref}
      aria-label={`${alt} - Home`}
      className={[
        "inline-flex min-w-0 max-w-full shrink-0 items-center justify-center",
        "rounded-lg focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#00796B]/60",
        "focus-visible:ring-offset-2",
      ].join(" ")}
    >
      {logo}
    </Link>
  );
}

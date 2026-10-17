import Link from "next/link";

interface AnimatedFooterLinkProps {
  href: string;
  label: string;
  isExternal?: boolean;
  ariaLabel?: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function AnimatedFooterLink({
  href,
  label,
  isExternal = false,
  ariaLabel,
  className = "",
  icon,
}: AnimatedFooterLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel || label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group inline-flex min-h-11 w-fit items-center gap-3 rounded-sm py-1 text-[#242420]/80 transition-colors hover:text-[#242420] focus-visible:outline-none ${className}`}
    >
      {icon && (
        <span className="shrink-0 transition-transform duration-200 group-hover:scale-[1.04]">
          {icon}
        </span>
      )}
      <span className="text-sm font-medium tracking-tight">
        {label}
      </span>
    </Link>
  );
}

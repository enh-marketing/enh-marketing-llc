import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

const BASE =
  "inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-300";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-deep",
  secondary: "border border-line text-snow hover:border-brand hover:text-brand",
};

/** Shared CTA. Renders a Link internally, an anchor for tel/mailto/wa.me. */
export function Button({
  href,
  variant = "primary",
  external,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M1 8h13M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

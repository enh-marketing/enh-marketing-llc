import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Page-wide content container — max 1320px, centered. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1320px] px-6 sm:px-10", className)}>
      {children}
    </div>
  );
}

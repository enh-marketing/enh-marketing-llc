import { cn } from "@/lib/cn";

/* Was next/image. astro:assets cannot be reached from a React component, so
   this is a plain <img>. The mark is a small PNG served straight from /public
   and it was never being resized by next/image anyway: the intrinsic 1000x488
   is kept so the browser still reserves the right box before it loads, and
   `priority` becomes the platform equivalents, eager + high fetchpriority. */

export function Logo({
  className,
  variant = "mark",
}: {
  className?: string;
  variant?: "mark" | "full";
}) {
  return (
    <img
      src="/logo.png"
      alt="ENH Marketing"
      width={1000}
      height={488}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className={cn(
        "logo-theme h-auto w-auto object-contain",
        variant === "mark" ? "max-h-10" : "max-h-14",
        className,
      )}
    />
  );
}

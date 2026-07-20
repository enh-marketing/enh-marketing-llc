import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  variant = "mark",
}: {
  className?: string;
  variant?: "mark" | "full";
}) {
  return (
    <Image
      src="/logo.png"
      alt="ENH Marketing"
      width={1000}
      height={488}
      priority
      className={cn(
        "logo-theme h-auto w-auto object-contain",
        variant === "mark" ? "max-h-10" : "max-h-14",
        className,
      )}
    />
  );
}

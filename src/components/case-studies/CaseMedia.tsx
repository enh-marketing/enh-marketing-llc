import { cn } from "@/lib/cn";
import type { Figure } from "@/content/case-studies";

/** A case study's picture, wherever one is shown.
 *
 *  EVERY RESULT CARD IS THE SAME SHAPE, 2160×1512, so unlike the archive's
 *  square title cards these can take a fixed frame without being cropped
 *  through their own artwork. The frame is still driven by the file's own
 *  dimensions rather than by a hardcoded ratio, so a future study exported at
 *  another size gets its own frame with no code change.
 *
 *  TWO WIDTHS, DECLARED. The converter writes a 1400px file and a 700px file
 *  for every card; `sizes` is measured against Container's 1320px cap so a
 *  plate five columns wide fetches the small one and the lead story fetches
 *  the large one. Without it a browser assumes 100vw and pulls the 1400px file
 *  for a 380px box on a phone.
 *
 *  astro:assets IS NOT AVAILABLE HERE. These are React islands, so this is a
 *  plain <img> with its intrinsic width and height written out. See AGENTS.md. */
export function CaseMedia({
  figure,
  slot = "plate",
  eager = false,
  className,
}: {
  figure: Figure;
  slot?: "plate" | "plateWide" | "lead" | "hero" | "compact";
  eager?: boolean;
  className?: string;
}) {
  return (
    <img
      src={figure.src}
      srcSet={figure.small ? `${figure.small} 700w, ${figure.src} 1400w` : undefined}
      sizes={SIZES[slot]}
      alt={figure.alt}
      width={figure.w}
      height={figure.h}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      /* Native image drag off. Several of these sit inside a Motion drag
         carousel, where starting a browser image-drag cancels the gesture. */
      draggable={false}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}

const SIZES: Record<NonNullable<Parameters<typeof CaseMedia>[0]["slot"]>, string> = {
  plate: "(min-width: 1024px) 520px, (min-width: 640px) 46vw, 92vw",
  plateWide: "(min-width: 1024px) 740px, (min-width: 640px) 46vw, 92vw",
  lead: "(min-width: 1024px) 1240px, 92vw",
  hero: "(min-width: 1024px) 620px, 92vw",
  compact: "(min-width: 1024px) 320px, 40vw",
};

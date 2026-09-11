import { cn } from "@/lib/cn";
import type { Figure } from "@/content/portfolio";

/** A portfolio picture, wherever one is shown.
 *
 *  ITS OWN COMPONENT RATHER THAN `CaseMedia`, for one reason that matters:
 *  CaseMedia hardcodes `700w, 1400w` in its srcset, because every result card
 *  in that archive is exported at the same two widths. This section holds
 *  three kinds of file at three width pairs — index cards at 1400/700,
 *  artwork at 1080/540, website screenshots at 1600/800 — and thirteen of the
 *  artwork files are 219px square upstream with no second width at all. So the
 *  descriptors are derived from the figure's own width instead of written out,
 *  which is correct for any pair and for a file that has no pair.
 *
 *  THE INTRINSIC SIZE IS ALWAYS WRITTEN OUT, so nothing shifts while the file
 *  loads. `astro:assets` is not reachable from a React island, which is why
 *  this is a plain <img>. See AGENTS.md.
 *
 *  `fit` EXISTS BECAUSE A SCREENSHOT IS NOT A CARD. Cards and artwork fill
 *  their frame and crop; a screenshot of somebody's website is a document, and
 *  cropping it cuts off the page it is there to show. */
export function ProjectMedia({
  figure,
  slot = "card",
  fit = "cover",
  eager = false,
  className,
}: {
  figure: Figure;
  slot?: "card" | "hero" | "compact" | "tile" | "sheet";
  fit?: "cover" | "contain";
  eager?: boolean;
  className?: string;
}) {
  const half = Math.round(figure.w / 2);

  return (
    <img
      src={figure.src}
      srcSet={figure.small ? `${figure.small} ${half}w, ${figure.src} ${figure.w}w` : undefined}
      sizes={SIZES[slot]}
      alt={figure.alt}
      width={figure.w}
      height={figure.h}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      draggable={false}
      className={cn(
        "absolute inset-0 h-full w-full",
        fit === "contain" ? "object-contain" : "object-cover",
        className,
      )}
    />
  );
}

/* Measured against Container's 1240px cap. `tile` is the gallery grid, which
 * runs five across from lg — about 230px, which is also roughly the intrinsic
 * width of the smallest files in it. */
const SIZES: Record<NonNullable<Parameters<typeof ProjectMedia>[0]["slot"]>, string> = {
  card: "(min-width: 1024px) 420px, (min-width: 640px) 46vw, 92vw",
  hero: "(min-width: 1024px) 620px, 92vw",
  compact: "(min-width: 1024px) 320px, 40vw",
  tile: "(min-width: 1024px) 232px, (min-width: 640px) 30vw, 44vw",
  sheet: "(min-width: 1024px) 1240px, 92vw",
};

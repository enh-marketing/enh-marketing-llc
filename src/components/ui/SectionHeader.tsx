import type { ReactNode } from "react";
import { Chars, Rise } from "@/components/fx/Reveal";
import { SectionMark } from "@/components/ui/SectionMark";
import { cn } from "@/lib/cn";

/** Every section heading on the site.
 *  Locked to display-xl with a stroked second line, which is exactly what the
 *  homepage uses for 8 of its 10 section headings. Do not step this down. */
export function SectionHeader({
  index,
  title,
  strokeTitle,
  lede,
  mark,
  markNode,
  aside,
  className,
  children,
}: {
  index?: string;
  title: string;
  strokeTitle?: string;
  lede?: string;
  /** Subject-specific diagram that occupies the space beside the heading. */
  mark?: { variant: "growth" | "network" | "progression" | "contrast" | "ecosystem"; label: string };
  /** A ready-made decorative mark, for pages whose marks are their own rather
   *  than one of the generic variants. Sits in the same slot as `mark`. */
  markNode?: ReactNode;
  /** Real content to set beside the heading. Takes the place of `mark`: a
   *  heading with nothing to its right leaves half the band empty, and actual
   *  copy fills it better than a diagram does. */
  aside?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        aside
          ? "grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16"
          : "flex items-start justify-between gap-10 lg:gap-16",
        className,
      )}
    >
      <div className={aside ? undefined : "max-w-3xl"}>
        {/* Index only. The source document has no kicker text, so none is invented. */}
        {index && (
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.3em] text-brand-text">({index})</p>
        )}
        <h2 className="font-display display-xl font-extrabold uppercase text-snow">
          <span className="block">
            <Chars text={title} />
          </span>
          {/* Non-rendering space: without it the two block spans concatenate in
              textContent, so the accessible name reads "What WeActually Do". */}
          {strokeTitle && " "}
          {strokeTitle && (
            <span className="block text-stroke">
              <Chars text={strokeTitle} delay={0.15} />
            </span>
          )}
        </h2>
        {lede && (
          <Rise delay={0.25} className="mt-7">
            <p className=" text-base leading-relaxed text-fog sm:text-lg">{lede}</p>
          </Rise>
        )}
        {children}
      </div>

      {aside ?? markNode ?? (mark && <SectionMark variant={mark.variant} label={mark.label} />)}
    </div>
  );
}

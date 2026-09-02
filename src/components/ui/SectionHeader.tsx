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
          : "flex items-start justify-between gap-8 lg:gap-10",
        className,
      )}
    >
      {/* max-w-4xl, not 3xl. Now that the heading runs as one continuous line
          instead of two stacked halves, 48rem was clipping it: "Our AI
          Automation Services" needs 866px at display-xl and had 768px, so it
          wrapped for want of a hundred pixels while the decorative mark beside
          it sat in empty space. The mark shrinks before the words do. */}
      <div className={aside ? undefined : "min-w-0 max-w-4xl"}>
        {/* Index only. The source document has no kicker text, so none is invented. */}
        {index && (
          <p className="mb-7 text-xs font-semibold uppercase text-brand-text">({index})</p>
        )}
        {/* One continuous heading, not two stacked rows.
            The two halves used to be `block`, which forced a line break between
            them however much room was left: "Our AI Automation Services" came
            out as "OUR AI" over "AUTOMATION SERVICES" even on a wide screen.
            Inline instead, so the heading fills the line and wraps only where
            it actually runs out of width. The colour change still marks the two
            halves; it no longer needs a break to do it.

            The space between them is real, not decorative: without it the two
            spans concatenate in textContent and the accessible name reads
            "What WeActually Do". */}
        <h2 className="font-display display-xl font-extrabold uppercase text-snow">
          <span>
            <Chars text={title} />
          </span>
          {strokeTitle && " "}
          {strokeTitle && (
            <span className="text-stroke">
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

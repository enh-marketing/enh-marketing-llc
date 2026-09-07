"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** The five kinds of content, drawn as the one website they add up to.
 *
 *  WHY A SITE PLAN. The document does not describe five services, it describes
 *  five parts of one website, and it ranks them: the homepage "introduce[s] the
 *  business clearly and direct[s] visitors towards the most relevant services",
 *  the commercial pages are the focus, and blog creation "remains a supporting
 *  part of this service". Five equal tiles would contradict copy printed inside
 *  them, so each entry owns the region of the plan where it actually sits: the
 *  homepage across the top, the two commercial page types beneath it, the
 *  catalogue wide at the foot, and the supporting one off to the side on a
 *  broken line.
 *
 *  THE PLAN IS ALWAYS WHOLE. Selecting an entry lifts its region and quiets the
 *  rest; it never empties the frame. Every region is drawn whatever is
 *  selected, because the document's claim is that these five coexist.
 *
 *  NOTHING IS COUNTED. The bars and tiles are a legible grid, not a claim about
 *  how many pages a site has. This document contains no figure of any kind.
 *
 *  Driven entirely by CSS transitions on the selected index: no timeline and
 *  nothing to fall out of sync. */

/** Which entry owns which region. The document's own order is Service (01),
 *  Landing (02), Homepage (03), Product and Category (04), Blog (05). */
const SERVICE = 0;
const LANDING = 1;
const HOME = 2;
const CATALOGUE = 3;
const BLOG = 4;

/** Bars standing in for copy inside a region. Decorative, and never text. */
function Fill({ rows, on, aside = false }: { rows: number[]; on: boolean; aside?: boolean }) {
  return (
    <span aria-hidden className="mt-2 flex flex-col gap-1.5">
      {rows.map((w, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-colors duration-500 motion-reduce:transition-none",
            on ? "bg-brand/60" : aside ? "bg-ash/25" : "bg-line",
          )}
          style={{ width: `${w}%` }}
        />
      ))}
    </span>
  );
}

function Region({
  label,
  on,
  dashed = false,
  className,
  children,
}: {
  label: string;
  on: boolean;
  dashed?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border p-2.5 transition-all duration-500 motion-reduce:transition-none",
        dashed ? "border-dashed" : "border-solid",
        on
          ? "border-brand bg-brand/[0.07] shadow-[0_10px_30px_-18px_rgba(232,0,13,0.65)]"
          : "border-line/60 bg-transparent opacity-40",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "text-[0.55rem] font-semibold uppercase leading-tight tracking-wide transition-colors duration-500 motion-reduce:transition-none lg:text-[0.62rem]",
          on ? "text-brand-text" : "text-ash",
        )}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

export function SitePlan({
  active,
  pin,
  labels,
}: {
  active: number;
  pin: PinRenderer;
  /** The entries' own titles, so the regions are named by the document. */
  labels: string[];
}) {
  const on = (i: number) => active === i;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.5)]">
      {/* Browser chrome, so the plan reads as a website rather than a diagram.
          Decorative, and carries no text of its own. */}
      <div aria-hidden className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-brand" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-2 h-3 flex-1 rounded-full bg-ink-3" />
      </div>

      <div className="flex flex-col gap-2.5 p-4 sm:p-5">
        <Region label={labels[HOME]} on={on(HOME)}>
          {pin(HOME, "absolute -right-2 -top-2")}
          <Fill rows={[70, 46]} on={on(HOME)} />
          <span aria-hidden className="mt-2 flex gap-1.5">
            {[0, 1, 2, 3].map((k) => (
              <span
                key={k}
                className={cn(
                  "h-5 flex-1 rounded transition-colors duration-500 motion-reduce:transition-none",
                  on(HOME) ? "bg-brand/25" : "bg-line/60",
                )}
              />
            ))}
          </span>
        </Region>

        <div className="grid grid-cols-2 gap-2.5">
          <Region label={labels[SERVICE]} on={on(SERVICE)}>
            {pin(SERVICE, "absolute -right-2 -top-2")}
            <Fill rows={[88, 66, 78]} on={on(SERVICE)} />
          </Region>
          <Region label={labels[LANDING]} on={on(LANDING)}>
            {pin(LANDING, "absolute -right-2 -top-2")}
            <Fill rows={[80, 54]} on={on(LANDING)} />
            <span
              aria-hidden
              className={cn(
                "mt-2 h-4 w-16 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                on(LANDING) ? "bg-brand" : "bg-line",
              )}
            />
          </Region>
        </div>

        <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] gap-2.5">
          <Region label={labels[CATALOGUE]} on={on(CATALOGUE)}>
            {pin(CATALOGUE, "absolute -right-2 -top-2")}
            <span aria-hidden className="mt-2 grid grid-cols-3 gap-1.5">
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <span
                  key={k}
                  className={cn(
                    "h-6 rounded transition-colors duration-500 motion-reduce:transition-none",
                    on(CATALOGUE) ? "bg-brand/25" : "bg-line/60",
                  )}
                />
              ))}
            </span>
          </Region>
          {/* Drawn apart, on a broken line, because the document sets it apart
              in its own sentence. */}
          <Region label={labels[BLOG]} on={on(BLOG)} dashed>
            {pin(BLOG, "absolute -right-2 -top-2")}
            <Fill rows={[90, 70, 84, 60]} on={on(BLOG)} aside />
          </Region>
        </div>
      </div>
    </div>
  );
}

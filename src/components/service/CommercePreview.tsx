"use client";

import { cn } from "@/lib/cn";

export type PreviewVariant =
  | "catalogue"
  | "storefront"
  | "integrations"
  | "checkout"
  | "speed"
  | "tracking";

/** Abstract interface previews, one per workstream in the build.
 *
 *  WHY THESE EXIST. The six items in "Everything Inside the Build" are the
 *  parts of an interface being built, so the cards that carry them show that
 *  interface rather than an icon standing in for it. A category tree looks like
 *  a category tree; a checkout looks like a checkout. That is the difference
 *  between a card about ecommerce and a card that looks like ecommerce.
 *
 *  NOT ONE WORD OF TEXT. Every preview is bars, tiles and nodes, following the
 *  rule CreativeFeed set on the Meta Ads page and AnswerStream on the AEO page:
 *  an abstract visual cannot be misread as a claim. Naming a payment provider
 *  or a real integration inside a decorative panel would be asserting a
 *  capability the document has not stated in those terms.
 *
 *  Motion lives in CSS on `group-hover`, not in a per-card animation loop. Six
 *  of these render at once, and six independent rAF loops on a marketing page
 *  is a cost with no return. Under `prefers-reduced-motion` the transitions are
 *  already suppressed globally.
 *
 *  Everything is aria-hidden: the card's heading and body carry the meaning. */
export function CommercePreview({
  variant,
  className,
}: {
  variant: PreviewVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative h-28 w-full overflow-hidden rounded-lg border border-line bg-ink-3/60",
        className,
      )}
    >
      <Shape variant={variant} />
    </div>
  );
}

function Shape({ variant }: { variant: PreviewVariant }) {
  switch (variant) {
    /** A category tree with its filters — what discovery produces. */
    case "catalogue":
      return (
        <div className="flex h-full gap-2 p-3">
          <div className="flex w-1/3 flex-col gap-1.5">
            {[100, 78, 88, 64].map((w, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full bg-snow/20 transition-colors duration-500 group-hover:bg-brand/60"
                style={{ width: `${w}%`, transitionDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
          <div className="flex-1 border-l border-line pl-2">
            <div className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="aspect-square rounded-sm bg-snow/12" />
              ))}
            </div>
          </div>
        </div>
      );

    /** A product grid, phone-shaped, because the copy says phone first. */
    case "storefront":
      return (
        <div className="flex h-full items-end justify-center gap-2 px-3 pt-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-t-md border border-b-0 border-line bg-ink-2 p-1.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                i === 1 ? "h-full group-hover:-translate-y-1" : "h-[82%]",
              )}
            >
              <span className="block h-1/2 w-full rounded-sm bg-snow/15" />
              <span className="mt-1.5 block h-1 w-3/4 rounded-full bg-snow/20" />
              <span className="mt-1 block h-1 w-1/2 rounded-full bg-brand/50" />
            </div>
          ))}
        </div>
      );

    /** The store in the middle, the systems it has to talk to around it. */
    case "integrations":
      return (
        <svg viewBox="0 0 200 112" className="h-full w-full">
          {[
            [30, 26],
            [30, 86],
            [170, 26],
            [170, 86],
          ].map(([x, y], i) => (
            <g key={i}>
              <line
                x1="100"
                y1="56"
                x2={x}
                y2={y}
                stroke="var(--color-line)"
                strokeWidth="1.5"
              />
              <rect
                x={x - 13}
                y={y - 8}
                width="26"
                height="16"
                rx="4"
                fill="var(--color-ink-2)"
                stroke="var(--color-line)"
                strokeWidth="1.5"
              />
            </g>
          ))}
          <rect
            x="82"
            y="44"
            width="36"
            height="24"
            rx="6"
            fill="var(--color-ink-2)"
            stroke="var(--color-brand)"
            strokeWidth="2"
            className="transition-all duration-500 group-hover:fill-[var(--color-brand)]"
          />
        </svg>
      );

    /** Payment rows stacking up in a checkout sheet. */
    case "checkout":
      return (
        <div className="flex h-full flex-col gap-1.5 p-3">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "flex items-center gap-2 rounded-md border px-2 py-1.5 transition-colors duration-500",
                i === 0
                  ? "border-brand/50 bg-brand/10 group-hover:border-brand"
                  : "border-line bg-ink-2",
              )}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span
                className={cn(
                  "h-2 w-4 shrink-0 rounded-[2px]",
                  i === 0 ? "bg-brand/70" : "bg-snow/20",
                )}
              />
              <span className="h-1 flex-1 rounded-full bg-snow/15" />
            </span>
          ))}
        </div>
      );

    /** A loading waterfall that shortens — the whole point of the workstream. */
    case "speed":
      return (
        <div className="flex h-full flex-col justify-center gap-2 p-3">
          {[92, 74, 58, 38].map((w, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-line" />
              <span
                className="h-2 rounded-full bg-snow/20 transition-[width,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-brand/60"
                style={{ width: `${w}%`, transitionDelay: `${i * 80}ms` }}
              />
            </span>
          ))}
        </div>
      );

    /** An event stream: discrete hits arriving on a timeline. */
    case "tracking":
      return (
        <svg viewBox="0 0 200 112" className="h-full w-full">
          <line
            x1="14"
            y1="86"
            x2="186"
            y2="86"
            stroke="var(--color-line)"
            strokeWidth="1.5"
          />
          {[
            [34, 54],
            [66, 38],
            [98, 62],
            [130, 26],
            [162, 46],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1={x} y1="86" x2={x} y2={y} stroke="var(--color-line)" strokeWidth="1.5" />
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="var(--color-ink-2)"
                stroke="var(--color-brand)"
                strokeWidth="2"
                className="transition-all duration-500 group-hover:fill-[var(--color-brand)]"
                style={{ transitionDelay: `${i * 70}ms` }}
              />
            </g>
          ))}
        </svg>
      );
  }
}

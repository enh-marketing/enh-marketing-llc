"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: one page, two visitors.
 *
 *  WHAT IT HAS TO SAY. The banner's own list is "personalise content for
 *  different visitors, display live information from your business systems and
 *  use a clear structure". The first of those is the one a reader can be shown
 *  rather than told, and it is also the one that separates this page from every
 *  other web design page in the market. So the drawing is a single page whose
 *  parts change while its layout does not.
 *
 *  WHY THE FRAME NEVER MOVES. The document is careful that personalisation is a
 *  rule, not a different website: "Headlines, offers, case studies, calls to
 *  action, forms and page sections can change for different visitors." Same
 *  structure, different contents. If the frame redrew itself the drawing would
 *  claim two builds, which is not what is being sold.
 *
 *  THE TWO LABELS ARE RULES, NOT PEOPLE. Both come from the document's own list
 *  of what a rule may use: referral source and campaign for one, previous visits
 *  and client status for the other. No persona is invented, nobody is named, and
 *  nothing about either visitor is asserted beyond the rule that matched.
 *
 *  Same shell as every other hero visual on the site: 356/396 wide, panel on
 *  border-line over bg-ink-2, grid backdrop at 10%. See MissedCall. */

/** Which blocks change between the two states, and by how much. Only the parts
 *  the document lists: a headline, an offer, a case study, a call to action. */
const HEADLINE = [78, 62];
const OFFER = [54, 70];
const CASES = [
  [60, 82, 46],
  [84, 52, 72],
];
const RUN_MS = 3200;

export function PageSwap({
  visitors,
  className,
}: {
  /** The two rules that matched, in order. */
  visitors: [string, string];
  className?: string;
}) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setV((x) => (x + 1) % 2), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="One website whose headline, offer, case studies and call to action change between two visitors while its layout stays the same."
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-6 xl:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div aria-hidden className="relative">
          {/* Which rule matched. Two, alternating, so neither reads as the
              default and the other as an exception. */}
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500",
                "bg-brand",
              )}
            />
            <p className="font-display truncate text-[0.625rem] font-bold uppercase tracking-[0.08em] text-brand-text transition-colors duration-500">
              {visitors[v]}
            </p>
          </div>

          {/* The page. Its frame is fixed; only what sits in it changes. */}
          <div className="mt-4 rounded-lg border border-line bg-ink-3 p-4">
            {/* Nav, which never personalises. */}
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <span className="h-2.5 w-8 rounded-sm bg-ash/40" />
              <span className="ml-auto h-1.5 w-7 rounded-full bg-line" />
              <span className="h-1.5 w-7 rounded-full bg-line" />
              <span className="h-1.5 w-7 rounded-full bg-line" />
            </div>

            {/* Headline. */}
            <div className="mt-4 space-y-2">
              <span
                className="block h-3 rounded-sm bg-snow/35 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: `${HEADLINE[v]}%` }}
              />
              <span
                className="block h-3 rounded-sm bg-snow/20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: `${HEADLINE[1 - v]}%` }}
              />
            </div>

            {/* The offer, and the call to action beside it. */}
            <div className="mt-5 flex items-center gap-3">
              <span
                className="block h-2 rounded-full bg-snow/22 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: `${OFFER[v]}%` }}
              />
              <span className="ml-auto h-6 w-[26%] shrink-0 rounded-full bg-brand" />
            </div>

            {/* Case studies. Three slots, different ones in each state. */}
            <div className="mt-5 flex gap-2.5">
              {CASES[v].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-md border border-line p-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <span className="block h-8 rounded-sm bg-ash/20" />
                  <span
                    className="mt-2 block h-1 rounded-full bg-snow/25 transition-all duration-700"
                    style={{ width: `${h}%` }}
                  />
                </div>
              ))}
            </div>

            {/* The form, which the document lists among the parts that change. */}
            <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
              <span className="h-5 flex-1 rounded-md border border-ash/40" />
              <span
                className="h-5 shrink-0 rounded-md border border-ash/40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: v === 0 ? "34%" : "18%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

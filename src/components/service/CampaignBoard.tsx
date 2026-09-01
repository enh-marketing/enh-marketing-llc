"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** The artefacts a creator campaign actually runs on.
 *
 *  WHY THIS DRAWING. The section's claim is that influencer work "can become
 *  messy before the first post is even filmed" and that the team keeps it "in
 *  one place". Each of the seven workstreams handles a specific object: a plan,
 *  a shortlist, a brief, a contract, a submission under review, an amplified
 *  post, a report. Drawing those seven objects on one board is the claim made
 *  visible — one surface, everything on it, nothing loose.
 *
 *  Each artefact is shaped like what it is: the shortlist is rows of people,
 *  the contract has a signature rule, the review has an approval mark, the
 *  report has bars. That is what makes this a board rather than seven
 *  rectangles with numbers on them.
 *
 *  No text anywhere. The panel beside carries every word. */
export function CampaignBoard({ active, pin }: { active: number; pin: PinRenderer }) {
  const on = (i: number) => active === i;
  const shell = (i: number) =>
    cn(
      "relative flex flex-col gap-2 rounded-xl border p-3 transition-all duration-500",
      on(i) ? "border-brand/60 bg-brand/[0.08]" : "border-line bg-ink-2/70",
    );
  const bar = (i: number, w: string) =>
    cn("block h-1.5 rounded-full transition-colors duration-500", on(i) ? "bg-brand/60" : "bg-snow/18", w);

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-3/60 p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(circle at 80% 100%, black, transparent 76%)",
        }}
      />

      <div className="relative grid grid-cols-2 gap-2.5">
        {/* 01 — the plan. */}
        <div className={shell(0)}>
          {pin(0, "absolute -right-2 -top-2")}
          <span aria-hidden className={bar(0, "w-2/3")} />
          <span aria-hidden className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((k) => (
              <span key={k} className="h-4 rounded bg-snow/10" />
            ))}
          </span>
        </div>

        {/* 02 — the shortlist: rows of people. */}
        <div className={shell(1)}>
          {pin(1, "absolute -right-2 -top-2")}
          {[0, 1, 2].map((k) => (
            <span key={k} aria-hidden className="flex items-center gap-2">
              <span
                className={cn(
                  "h-4 w-4 shrink-0 rounded-full transition-colors duration-500",
                  on(1) && k === 1 ? "bg-brand" : "bg-snow/20",
                )}
              />
              <span className="h-1 flex-1 rounded-full bg-snow/15" />
            </span>
          ))}
        </div>

        {/* 03 — the brief. */}
        <div className={shell(2)}>
          {pin(2, "absolute -right-2 -top-2")}
          <span aria-hidden className={bar(2, "w-1/2")} />
          <span aria-hidden className="space-y-1">
            {[92, 78, 60].map((w, k) => (
              <span key={k} className="block h-1 rounded-full bg-snow/12" style={{ width: `${w}%` }} />
            ))}
          </span>
        </div>

        {/* 04 — the contract: a signature rule. */}
        <div className={shell(3)}>
          {pin(3, "absolute -right-2 -top-2")}
          <span aria-hidden className="space-y-1">
            {[88, 70].map((w, k) => (
              <span key={k} className="block h-1 rounded-full bg-snow/12" style={{ width: `${w}%` }} />
            ))}
          </span>
          <span
            aria-hidden
            className={cn(
              "mt-auto block h-px w-2/3 transition-colors duration-500",
              on(3) ? "bg-brand" : "bg-line",
            )}
          />
        </div>

        {/* 05 — the submission under review: an approval mark. */}
        <div className={shell(4)}>
          {pin(4, "absolute -right-2 -top-2")}
          <span aria-hidden className="relative block h-10 w-full rounded-md bg-snow/10">
            <span
              className={cn(
                "absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border transition-colors duration-500",
                on(4) ? "border-brand bg-brand" : "border-ash",
              )}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M20 6 9 17l-5-5"
                  stroke={on(4) ? "#fff" : "var(--color-ash)"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </div>

        {/* 06 — amplification: the same post, reaching further. */}
        <div className={shell(5)}>
          {pin(5, "absolute -right-2 -top-2")}
          <span aria-hidden className="flex items-center gap-2">
            <span
              className={cn(
                "h-6 w-6 shrink-0 rounded-md transition-colors duration-500",
                on(5) ? "bg-brand/50" : "bg-snow/15",
              )}
            />
            {[0, 1, 2].map((k) => (
              <span
                key={k}
                className={cn(
                  "h-px flex-1 transition-colors duration-500",
                  on(5) ? "bg-brand/60" : "bg-line",
                )}
              />
            ))}
            <span
              className={cn(
                "h-2 w-2 shrink-0 rounded-full transition-colors duration-500",
                on(5) ? "bg-brand" : "bg-line",
              )}
            />
          </span>
          <span aria-hidden className={bar(5, "w-3/5")} />
        </div>

        {/* 07 — the report, across the full width because it covers everything
             above it. */}
        <div className={cn(shell(6), "col-span-2")}>
          {pin(6, "absolute -right-2 -top-2")}
          <span aria-hidden className="flex items-end gap-1.5">
            {[10, 18, 12, 24, 16, 28].map((h, k) => (
              <span
                key={k}
                className={cn(
                  "flex-1 rounded-sm transition-colors duration-500",
                  on(6) ? "bg-brand/70" : "bg-snow/20",
                )}
                style={{ height: `${h}px` }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

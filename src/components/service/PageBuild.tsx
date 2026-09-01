"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

export type BuildAnchor = "offer" | "copy" | "form" | "test" | "live";

/** The page being built, one stage at a time.
 *
 *  WHY THIS RATHER THAN THE STAGE TRACK. Performance Marketing and Meta Ads use
 *  a track because their stages are periods of time. These five are not: they
 *  are the parts of a page, assembled in order. Stage one settles the offer,
 *  stage two writes the words, stage three builds the form, stage four tests
 *  the submit, stage five watches what happens after launch. Selecting a stage
 *  lights the part of the page it produces, which is the same idea as the
 *  Instagram account anatomy and for the same reason: the reader learns where
 *  the work lands rather than being told.
 *
 *  Parts not yet reached are dimmed, so the drawing also shows the page coming
 *  into existence as the reader moves down the list.
 *
 *  Abstract throughout — bars, fields and blocks, never a word. */
export function PageBuild({
  anchors,
  active,
  pin,
}: {
  anchors: BuildAnchor[];
  active: number;
  pin: PinRenderer;
}) {
  const current = anchors[active];
  const order: BuildAnchor[] = ["offer", "copy", "form", "test", "live"];
  const reached = (a: BuildAnchor) => order.indexOf(a) <= order.indexOf(current);
  const lit = (a: BuildAnchor) => current === a;
  const pinFor = (a: BuildAnchor, className?: string) => {
    const i = anchors.indexOf(a);
    return i < 0 ? null : pin(i, className);
  };

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-3/60 p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at 15% 0%, black, transparent 80%)",
        }}
      />

      {/* The offer: the value the page is built around. */}
      <div
        className={cn(
          "relative flex items-center gap-3 rounded-xl border p-3 transition-all duration-500",
          lit("offer")
            ? "border-brand/60 bg-brand/[0.08]"
            : reached("offer")
              ? "border-line bg-ink-2"
              : "border-line bg-ink-2/40 opacity-45",
        )}
      >
        {pinFor("offer", "absolute -left-2 -top-3")}
        <span
          className={cn(
            "h-9 w-9 shrink-0 rounded-lg transition-colors duration-500",
            lit("offer") ? "bg-brand/45" : "bg-snow/12",
          )}
        />
        <span aria-hidden className="flex flex-1 flex-col gap-1.5">
          <span className="h-1.5 w-2/3 rounded-full bg-snow/22" />
          <span className="h-1.5 w-2/5 rounded-full bg-snow/12" />
        </span>
      </div>

      {/* The copy: headline and proof. */}
      <div
        className={cn(
          "relative mt-3 space-y-2.5 rounded-xl border p-3 transition-all duration-500",
          lit("copy")
            ? "border-brand/60 bg-brand/[0.08]"
            : reached("copy")
              ? "border-transparent"
              : "border-transparent opacity-45",
        )}
      >
        {pinFor("copy", "absolute -left-2 -top-3")}
        <span
          aria-hidden
          className={cn(
            "block h-3 w-4/5 rounded-full transition-colors duration-500",
            lit("copy") ? "bg-brand/60" : "bg-snow/28",
          )}
        />
        <span aria-hidden className="block h-2 w-3/5 rounded-full bg-snow/16" />
        <span aria-hidden className="flex gap-2 pt-1">
          {[0, 1].map((i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full bg-snow/12" />
          ))}
        </span>
      </div>

      {/* The form, and the button it ends on. */}
      <div
        className={cn(
          "relative mt-3 space-y-2 rounded-xl border p-3 transition-all duration-500",
          lit("form")
            ? "border-brand/60 bg-brand/[0.08]"
            : reached("form")
              ? "border-line bg-ink-2"
              : "border-line bg-ink-2/40 opacity-45",
        )}
      >
        {pinFor("form", "absolute -left-2 -top-3")}
        {pinFor("test", "absolute -right-2 top-1/2 -translate-y-1/2")}
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden
            className="block h-7 rounded-lg border border-line bg-ink-3"
          />
        ))}
        <span
          aria-hidden
          className={cn(
            "relative flex h-9 items-center justify-center rounded-lg transition-colors duration-500",
            lit("form") || lit("test") ? "bg-brand" : "bg-brand/45",
          )}
        >
          {/* The submit, confirmed working. */}
          <span
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-500",
              lit("test") ? "border-white opacity-100" : "border-transparent opacity-0",
            )}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20 6 9 17l-5-5"
                stroke="#fff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </div>

      {/* What the first week shows. */}
      <div
        className={cn(
          "relative mt-3 flex items-end gap-1.5 rounded-xl border p-3 transition-all duration-500",
          lit("live")
            ? "border-brand/60 bg-brand/[0.08]"
            : reached("live")
              ? "border-line bg-ink-2"
              : "border-line bg-ink-2/40 opacity-45",
        )}
      >
        {pinFor("live", "absolute -left-2 -top-3")}
        {[12, 20, 14, 26, 18, 30].map((h, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "flex-1 rounded-sm transition-colors duration-500",
              lit("live") ? "bg-brand/70" : "bg-snow/20",
            )}
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    </div>
  );
}

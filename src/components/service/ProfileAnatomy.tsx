"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";
import type { ServiceAnchor } from "@/content/services/instagram-marketing";

/** An abstract account. Every region is a shape, never a word, so the drawing
 *  cannot be read as a claim about a real profile. */
export function ProfileAnatomy({
  anchors,
  active,
  pin,
}: {
  /** Which region each item acts on, in item order. */
  anchors: ServiceAnchor[];
  active: number;
  pin: PinRenderer;
}) {
  const anchor = anchors[active];
  const lit = (a: ServiceAnchor) => anchor === a;
  /** The pin for whichever item owns this region. */
  const pinFor = (a: ServiceAnchor, className?: string) => {
    const i = anchors.indexOf(a);
    return i < 0 ? null : pin(i, className);
  };

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-3/60 p-5">
        {/* Profile: avatar, bio, insights. */}
        <div
          className={cn(
            "relative flex items-center gap-3 rounded-xl border p-3 transition-colors duration-500",
            lit("profile") ? "border-brand/60 bg-brand/[0.07]" : "border-transparent",
          )}
        >
          {pinFor("look", "absolute -left-2 -top-3")}
          {pinFor("profile", "absolute left-1/2 -top-3 -translate-x-1/2")}
          {pinFor("insights", "absolute -right-2 -top-3")}
          <span
            className={cn(
              "h-12 w-12 shrink-0 rounded-full border-2 transition-colors duration-500",
              lit("look") ? "border-brand bg-brand/20" : "border-line bg-ink-2",
            )}
          />
          <span className="flex flex-1 flex-col gap-2">
            <span className="h-1.5 w-2/3 rounded-full bg-snow/25" />
            <span className="h-1.5 w-2/5 rounded-full bg-snow/12" />
          </span>
          <span
            className={cn(
              "flex h-9 items-end gap-1 rounded-lg border px-2 py-1.5 transition-colors duration-500",
              lit("insights") ? "border-brand/60 bg-brand/10" : "border-line",
            )}
          >
            {[9, 15, 6, 18].map((h, i) => (
              <span
                key={i}
                className={cn(
                  "w-1 rounded-full transition-colors duration-500",
                  lit("insights") ? "bg-brand" : "bg-snow/25",
                )}
                style={{ height: `${h}px` }}
              />
            ))}
          </span>
        </div>

        <div className="mt-3 flex gap-2.5 px-3">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "h-7 w-7 rounded-full border transition-colors duration-500",
                lit("profile") ? "border-brand/60 bg-brand/10" : "border-line bg-ink-2",
              )}
            />
          ))}
        </div>

        <div
          className={cn(
            "relative mt-4 grid grid-cols-3 gap-1 rounded-xl border p-1 transition-colors duration-500",
            lit("posts") ? "border-brand/60" : "border-transparent",
          )}
        >
          {pinFor("posts", "absolute -left-3 top-1/2 -translate-y-1/2")}
          {pinFor("creators", "absolute -right-3 top-1/2 -translate-y-1/2")}
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "relative aspect-square overflow-hidden rounded-[3px] transition-colors duration-500",
                lit("posts") || lit("look") ? "bg-brand/15" : "bg-ink-2",
              )}
            >
              <span
                className={cn(
                  "absolute inset-x-2 bottom-2 h-1 rounded-full transition-colors duration-500",
                  lit("look") ? "bg-brand/70" : "bg-snow/12",
                )}
              />
              {i === 5 && (
                <span
                  className={cn(
                    "absolute right-1.5 top-1.5 h-2 w-2 rounded-full border transition-colors duration-500",
                    lit("creators") ? "border-brand bg-brand" : "border-ash bg-transparent",
                  )}
                />
              )}
            </span>
          ))}
        </div>

        <div
          className={cn(
            "relative mt-4 flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-500",
            lit("inbox") ? "border-brand/60 bg-brand/[0.08]" : "border-line bg-ink-2",
          )}
        >
          {pinFor("inbox", "absolute -left-3 top-1/2 -translate-y-1/2")}
          <span className="h-7 w-7 shrink-0 rounded-full bg-snow/20" />
          <span className="flex flex-1 flex-col gap-1.5">
            <span className="h-1.5 w-3/4 rounded-full bg-snow/25" />
            <span className="h-1.5 w-1/2 rounded-full bg-snow/12" />
          </span>
          <span
            className={cn(
              "h-2 w-2 shrink-0 rounded-full transition-colors duration-500",
              lit("inbox") ? "bg-brand" : "bg-line",
            )}
          />
      </div>
    </div>
  );
}

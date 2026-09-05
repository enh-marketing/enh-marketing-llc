"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: material generated, reviewed, and delivered.
 *
 *  WHAT IT HAS TO SAY. The banner's own sentence is the whole service: "We
 *  manage the concept, AI production, editing, brand review and final platform
 *  versions." Its three verbs are Generated, Reviewed, Delivered, and those are
 *  the three rows drawn here, top to bottom.
 *
 *  WHY IT LOOKS LIKE THIS. Generation is cheap and plural, so the top row is a
 *  band of rough frames on dashed edges that runs off the edge of the panel:
 *  there is no natural end to how many the machine will make. Review is
 *  singular and human, so the middle row holds one frame large enough to see
 *  what is in it, marked, with a second struck through beside it: the document
 *  is explicit that "visible errors and unsuitable scenes are removed", and a
 *  page selling honesty about AI should draw the removal, not only the output.
 *  Delivery is plural again but finished, so the bottom row is three solid
 *  frames at 9:16, 1:1 and 16:9, which is what "final platform versions" means.
 *
 *  The size of the objects carries the argument on its own: many small, then
 *  one large, then three finished. Everything the machine makes passes a person.
 *
 *  PROPORTION. Same shell as every other hero visual on the site: 356/396 wide,
 *  rounded-[1.25rem] on border-line over bg-ink-2, p-7, a grid backdrop at 10%,
 *  and rows as bg-ink-3 cards. See MissedCall, which this follows.
 *
 *  NO FAKE CREATIVE. Frames, silhouettes, caption bars and marks only. Nothing
 *  here pretends to be a finished ad, and the three labels are the banner's own
 *  words. */
export function ProductionRun({
  stages,
  className,
}: {
  /** The banner's three verbs, in order: Generated, Reviewed, Delivered. */
  stages: [string, string, string];
  className?: string;
}) {
  const [at, setAt] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAt((a) => (a + 1) % 3), 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="Material moving through production. A band of rough frames is generated, one is reviewed at full size and marked while another is struck out, and three finished versions are delivered at three different aspect ratios."
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div aria-hidden className="relative space-y-3">
          {/* ── generated: many, rough, and running off the edge ───────────── */}
          <Row on={at === 0} label={stages[0]}>
            <div className="relative h-[48px] overflow-hidden">
              <div className="flex gap-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "relative h-[48px] w-[84px] shrink-0 overflow-hidden rounded-md border border-dashed",
                      at === 0 ? "border-brand/50" : "border-line",
                    )}
                  >
                    <Subject w={84} h={48} dim />
                  </span>
                ))}
              </div>
              {/* the band does not end; it is cut by the panel */}
              <span className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ink-3 via-ink-3/85 to-transparent" />
            </div>
          </Row>

          {/* ── reviewed: one, at a size where you can see what is in it ───── */}
          <Row on={at === 1} label={stages[1]}>
            <div className="flex items-end gap-3">
              <span
                className={cn(
                  "relative h-[110px] w-[196px] shrink-0 overflow-hidden rounded-md border transition-colors duration-500",
                  at === 1 ? "border-brand/70" : "border-line",
                )}
              >
                {/* head and shoulders: this is footage, not a box */}
                <Subject w={196} h={110} />
                {/* the mark a person leaves on it */}
                <svg
                  viewBox="0 0 40 40"
                  className="absolute right-2 top-2 h-[34px] w-[34px]"
                  fill="none"
                >
                  <path
                    d="M8 21 l9 9 l16 -23"
                    stroke={at === 1 ? "var(--color-brand)" : "var(--color-line)"}
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* and the one taken out of the set */}
              <span className="relative h-[62px] w-[100px] shrink-0 overflow-hidden rounded-md border border-line opacity-55">
                <Subject w={100} h={62} dim />
                <svg viewBox="0 0 100 62" className="absolute inset-0 h-full w-full" fill="none">
                  <path
                    d="M6 6 L94 56"
                    stroke="var(--color-ash)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </Row>

          {/* ── delivered: finished, in the formats the platforms take ─────── */}
          <Row on={at === 2} label={stages[2]}>
            <div className="flex items-end gap-3">
              <Final on={at === 2} w={50} h={89} />
              <Final on={at === 2} w={66} h={66} />
              <Final on={at === 2} w={152} h={86} />
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
}

/** One stage of the run, on the site's own hero card. */
function Row({ on, label, children }: { on: boolean; label: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-ink-3 p-4 transition-colors duration-500",
        on ? "border-brand/60" : "border-line",
      )}
    >
      <p
        className={cn(
          "font-display mb-2.5 text-[0.625rem] font-bold uppercase tracking-[0.14em] transition-colors duration-500",
          on ? "text-brand-text" : "text-ash",
        )}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

/** A delivered asset: a solid frame at one real aspect ratio, with a subject
 *  and a caption, so it reads as finished rather than as an empty rectangle. */
function Final({ on, w, h }: { on: boolean; w: number; h: number }) {
  return (
    <span
      className={cn(
        "relative shrink-0 overflow-hidden rounded-md border transition-colors duration-500",
        on ? "border-brand/70 bg-brand/[0.06]" : "border-line",
      )}
      style={{ width: w, height: h }}
    >
      <Subject w={w} h={h} />
    </span>
  );
}

/** The take itself: head, shoulders and a line of subtitle, sized from the
 *  frame's own height rather than its width. Drawn identically in every frame
 *  on the panel, so the three delivered sizes read as three crops of one asset
 *  rather than three unrelated rectangles. */
function Subject({ w, h, dim = false }: { w: number; h: number; dim?: boolean }) {
  const head = Math.round(h * 0.2);
  return (
    <>
      <span
        className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full", dim ? "bg-snow/10" : "bg-snow/15")}
        style={{ width: Math.round(h * 0.44), height: Math.round(h * 0.3) }}
      />
      <span
        className={cn("absolute left-1/2 -translate-x-1/2 rounded-full", dim ? "bg-snow/14" : "bg-snow/22")}
        style={{ width: head, height: head, bottom: Math.round(h * 0.28) }}
      />
      <span
        className={cn("absolute bottom-1.5 left-1/2 h-[3px] -translate-x-1/2 rounded-full", dim ? "bg-snow/18" : "bg-snow/32")}
        style={{ width: Math.round(w * 0.5) }}
      />
    </>
  );
}

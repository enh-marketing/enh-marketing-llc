"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Stage } from "@/content/services/explainer-video";

/** The production process, drawn as a window that closes.
 *
 *  WHY THIS SHAPE. A numbered list would flatten the one thing the document
 *  keeps saying about this process: that the point of reviewing early is that
 *  early is when changing the structure is still practical. Step three is "the
 *  main opportunity to change the structure before detailed illustration and
 *  animation work begins", and the promises repeat it in plainer words -- the
 *  script and storyboard are "reviewed early, when structural changes are still
 *  practical to make".
 *
 *  So the six steps run down a wedge that starts wide and narrows. The width at
 *  any step is how much of the video's structure is still open, and the two
 *  gates sit where the document puts its review points. Nothing else has to
 *  argue that approving late is expensive; the shape says it.
 *
 *  THE WEDGE IS NOT A MEASUREMENT. It carries no axis, no scale, no cost and no
 *  hours, because the document attaches none. It narrows monotonically because
 *  the copy says structural change stops being practical, and that is the whole
 *  claim being drawn. Its meaning comes from step three's own copy, which sits
 *  beside its widest part: the two sentences the document offers as a caption
 *  are both already on this page, so printing one here would say the same thing
 *  to the reader twice.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, transform only: every
 *  row carries a step title and a paragraph, so nothing may begin at an opacity
 *  of zero. See globals.css, "Change window". */

export function ChangeWindow({
  items,
  gates,
}: {
  items: Stage[];
  /** Zero-based indices of the steps the document names as review points. */
  gates: number[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const gate = new Set(gates);

  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      <div className="relative">
        {/* The wedge, behind the rail. Clip-path rather than an SVG so it takes
            its height from the list beside it and stays correct at any type
            size or line count. */}
        <div
          role="img"
          aria-label="A wedge running down beside the steps, widest at the first and narrowing to the last: how much of the video's structure is still open to change at each stage."
          className="cw-wedge pointer-events-none absolute left-0 top-0 h-full w-14 sm:w-20"
        >
          <div
            className="h-full w-full"
            style={{
              clipPath: "polygon(4% 0%, 96% 0%, 62% 100%, 38% 100%)",
              background:
                "linear-gradient(to bottom, color-mix(in srgb, var(--color-brand) 26%, transparent), color-mix(in srgb, var(--color-brand) 6%, transparent))",
            }}
          />
        </div>

        <ol className="relative">
          {items.map((step, i) => {
            const isGate = gate.has(i);
            return (
              <li
                key={step.title}
                className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-6 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-x-10"
              >
                <div className="relative flex justify-center pt-7">
                  <span
                    aria-hidden
                    className={cn(
                      "cw-node relative z-10 flex h-9 w-9 items-center justify-center rounded-full border bg-ink-2 text-[0.7rem] font-bold tabular-nums transition-colors duration-500",
                      isGate
                        ? "border-brand text-brand ring-4 ring-brand/15"
                        : "border-line text-fog",
                    )}
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    {step.no}
                  </span>
                </div>

                <div
                  className={cn(
                    "cw-in border-b border-line py-7",
                    i === 0 && "border-t",
                  )}
                  style={{ animationDelay: `${i * 90 + 60}ms` }}
                >
                  <h3 className="font-display text-[clamp(1rem,1.9vw,1.35rem)] font-extrabold uppercase leading-[1.15] text-snow">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-fog">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

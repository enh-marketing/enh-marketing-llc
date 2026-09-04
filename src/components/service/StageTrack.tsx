"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type TrackStage = { no: string; title: string; body: string };

/** A staged process, as a track rather than a list.
 *
 *  WHY A THIRD PROCESS SHAPE. This site already draws two: the Explainer page's
 *  wedge, which exists to show a window closing, and the B2B page's vertical
 *  chain, which exists to show hand-offs between stages. Neither claim applies
 *  here. The pillar documents describe an ordinary sequence with nothing
 *  narrowing and nothing changing hands, so the drawing is an ordinary
 *  sequence: numbered stops on a rail that runs through them.
 *
 *  THE RAIL IS THE ONLY DEVICE. It runs behind the row on wide screens and down
 *  the side on narrow ones, so the order is visible without numbering having to
 *  carry it alone. Stages are equal in size because these documents give no
 *  stage more weight than another.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, transform only: every
 *  stage carries a title and a paragraph. The rail scales from its start rather
 *  than fading, so a stalled clock still leaves a complete track. See
 *  globals.css, "Stage track". */
export function StageTrack({
  stages,
  columns = 4,
}: {
  stages: TrackStage[];
  /** How many stops sit on one row at the widest breakpoint. Varied per pillar
   *  so four process sections across the site do not read as one template. */
  columns?: 3 | 4;
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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      <ol
        className={cn(
          "grid gap-x-8 gap-y-10 sm:grid-cols-2",
          columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        )}
      >
        {stages.map((stage, i) => (
          <li key={stage.title} className="relative">
            {/* The rail through this stop. It stops short of the last one, so
                the track ends rather than running off the row. */}
            <span
              aria-hidden
              className="st-rail absolute left-0 top-[1.15rem] h-px w-full bg-line"
              style={{ animationDelay: `${i * 70}ms` }}
            />
            <span
              aria-hidden
              className="st-node relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink-2 text-[0.7rem] font-bold tabular-nums text-brand"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {stage.no}
            </span>

            <div
              className="st-in mt-6"
              style={{ animationDelay: `${i * 70 + 60}ms` }}
            >
              <h3 className="font-display text-[clamp(1rem,1.7vw,1.2rem)] font-extrabold uppercase leading-[1.16] text-snow">
                {stage.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{stage.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

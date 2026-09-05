"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: an event running in parallel, and one camera that cannot.
 *
 *  WHY THIS. The page opens on a simultaneity problem, and it is specific about
 *  it: a conference "may have a keynote on stage, demonstrations in the
 *  exhibition area, interviews with speakers, and conversations between
 *  attendees happening at the same time. One camera with no coverage plan will
 *  miss something important."
 *
 *  So the drawing is four lanes, running left to right across the programme,
 *  with blocks that overlap in time. A single marker travels the lanes: at any
 *  instant it is on exactly one of them, and the other three keep going without
 *  it. That is the document's sentence, drawn. Nothing else on this page needs
 *  to argue the point afterwards.
 *
 *  FOUR LANES BECAUSE THE DOCUMENT NAMES FOUR. Stage, exhibition area,
 *  interviews, attendees. The count is the source's, not a composition choice,
 *  and the lanes carry no labels because the sentence beside the hero already
 *  names them.
 *
 *  NOTHING IS COUNTED. No camera count appears anywhere on this page: the
 *  document says the number "is based on the venue, programme and required
 *  deliverables" and refuses to fix one. The single marker here is not a claim
 *  that one camera is what you get; it is the thing the copy warns against.
 *  There is no clock, no timecode and no duration either.
 *
 *  MOTION. CSS keyframes on an interval that re-keys the marker. The lanes and
 *  their blocks are static, so a browser that never animates still renders the
 *  full programme with everything overlapping. See globals.css, "Run of show". */

/** Four lanes, in the order the document names them. Each block is a start and
 *  a width as a percentage of the programme: a shape, never a duration. Set by
 *  hand so the overlaps are legible and so the server and browser agree. */
const LANES: { blocks: { at: number; len: number }[] }[] = [
  { blocks: [{ at: 4, len: 30 }, { at: 44, len: 22 }, { at: 74, len: 22 }] },
  { blocks: [{ at: 0, len: 40 }, { at: 46, len: 54 }] },
  { blocks: [{ at: 18, len: 16 }, { at: 40, len: 14 }, { at: 62, len: 18 }, { at: 86, len: 14 }] },
  { blocks: [{ at: 8, len: 26 }, { at: 38, len: 20 }, { at: 66, len: 34 }] },
];

/** Where the single marker sits on each pass: which lane, and how far along.
 *  Fixed rather than random so the sequence is reproducible and hydration
 *  matches. */
const MARKER: { lane: number; at: number }[] = [
  { lane: 0, at: 16 },
  { lane: 2, at: 26 },
  { lane: 1, at: 52 },
  { lane: 3, at: 72 },
  { lane: 0, at: 82 },
];

const RUN_MS = 1900;

export function RunOfShow({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const at = MARKER[run % MARKER.length];

  return (
    <div
      className={cn(
        // The house placement for a hero visual: right gutter, centred, out of
        // the flow, large screens only.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="An event programme drawn as four parallel tracks: stage, exhibition area, interviews and attendees. Their sessions overlap, and a single camera marker can only be on one track at a time."
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div aria-hidden className="relative space-y-4">
          {LANES.map((lane, li) => (
            <div key={li} className="relative h-7">
              {/* The lane itself: the programme runs the full width whether or
                  not anyone is covering it. */}
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
              {lane.blocks.map((b, bi) => (
                <span
                  key={bi}
                  className="absolute top-1/2 h-5 -translate-y-1/2 rounded-[3px] border border-line bg-snow/[0.06]"
                  style={{ left: `${b.at}%`, width: `${b.len}%` }}
                />
              ))}

              {/* The one thing being covered right now. */}
              {at.lane === li && (
                <span
                  key={run}
                  className="ros-mark absolute top-1/2 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-ink-2"
                  style={{ left: `${at.at}%` }}
                >
                  <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* The instant the marker is at, carried down through every lane: the
            three tracks it is not on are running at the same moment. */}
        <div aria-hidden className="pointer-events-none absolute inset-y-7 left-7 right-7">
          <span
            key={run}
            className="ros-now absolute top-0 h-full w-px bg-brand/35"
            style={{ left: `${at.at}%` }}
          />
        </div>
      </div>
    </div>
  );
}

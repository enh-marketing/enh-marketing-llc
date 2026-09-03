"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: the same explanation given over and over, and then once.
 *
 *  WHY THIS. The document opens on a very specific observation: "If your sales
 *  team spends the first ten minutes of every meeting explaining how the
 *  product works, the same explanation probably belongs in a video." That is
 *  not a statement about video production, it is a statement about repetition.
 *  So the drawing is a stack of meetings, each opening with the same block, and
 *  those blocks feeding one thing underneath.
 *
 *  A play triangle or a storyboard strip would say "video" and stop there. This
 *  says why the video exists, which is the only argument the page needs to make
 *  before the reader has finished the first sentence beside it.
 *
 *  NOTHING IS COUNTED OR TIMED. There is no clock, no duration and no meeting
 *  count: the document says "every meeting" and gives no number, and the "ten
 *  minutes" in its sentence is the copy's, not a measurement this drawing may
 *  restate. Five rows are texture meaning "again and again", and the repeated
 *  block is a proportion of a bar rather than a span of time.
 *
 *  MOTION. CSS keyframes on an interval that moves which meeting is lit. The
 *  rows, the blocks and the single output are static, so a browser that never
 *  animates still renders the full argument. See globals.css, "Said once". */

const ROWS = 5;
const RUN_MS = 1500;

export function SaidOnce({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const lit = run % ROWS;

  return (
    <div
      className={cn(
        // The house placement for a hero visual: right gutter, centred, out of
        // the flow, large screens only.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A stack of meetings, each beginning with the same block of explanation, all feeding into a single video underneath."
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

        <svg viewBox="0 0 300 232" className="relative w-full" aria-hidden>
          {/* Each meeting: a bar that opens with the same explanation. */}
          {Array.from({ length: ROWS }, (_, i) => {
            const y = 8 + i * 26;
            const on = i === lit;
            return (
              <g key={i}>
                <rect
                  x="4"
                  y={y}
                  width="292"
                  height="18"
                  rx="4"
                  fill="none"
                  stroke="var(--color-line)"
                  strokeWidth="1.4"
                />
                {/* The part that is the same every time. */}
                <rect
                  key={`${i}-${run}`}
                  x="4"
                  y={y}
                  width="78"
                  height="18"
                  rx="4"
                  className={cn("said-block", on && "is-lit")}
                  fill="var(--color-brand)"
                  opacity={on ? 0.85 : 0.28}
                />
                {/* The rest of the meeting, which differs. */}
                <path
                  d={`M96 ${y + 6}h${120 + i * 22}M96 ${y + 12}h${72 + i * 14}`}
                  stroke="var(--color-line)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* Every repeat feeding one thing. */}
          {Array.from({ length: ROWS }, (_, i) => {
            const y = 8 + i * 26 + 9;
            return (
              <path
                key={i}
                d={`M43 ${y}C43 ${y + 40} 150 ${y + 30} 150 196`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.2"
                opacity="0.24"
              />
            );
          })}

          {/* The one video. */}
          <rect
            x="96"
            y="196"
            width="108"
            height="30"
            rx="7"
            fill="var(--color-brand)"
            opacity="0.14"
          />
          <rect
            x="96"
            y="196"
            width="108"
            height="30"
            rx="7"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="1.6"
          />
          <path
            d="M144 205.5v11l10-5.5z"
            fill="var(--color-brand)"
          />
        </svg>
      </div>
    </div>
  );
}

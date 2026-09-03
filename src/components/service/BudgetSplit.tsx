"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { ChannelIcon } from "@/components/service/ChannelIcon";
import { cn } from "@/lib/cn";
import type { Channel } from "@/content/services/campaign-intelligence";

/** The hero visual: one budget, divided across the channels the document
 *  names, and the split rebalancing.
 *
 *  WHY THIS SHAPE. The banner's own sentence is the drawing: "recommend how it
 *  should be divided between channels, and monitor whether the campaign is
 *  performing within the expected range". So one bar at the top is the budget;
 *  five segments beneath it are the division; the bracket under each segment is
 *  that channel's expected range, wider where the share is larger. Every few
 *  seconds the split moves to another allocation, which is Scenario Planning's
 *  "increasing spend, reducing it, or moving it between platforms" made
 *  visible.
 *
 *  NO NUMBERS, AND NO CLAIM. The three allocations below are arbitrary shapes
 *  chosen so the movement can be seen; they assert nothing about any channel.
 *  The document commits to no figure and neither does this.
 *
 *  LABELLED, BECAUSE IT WAS UNREADABLE WITHOUT. The first build was bars and
 *  brackets with nothing but the channel names, and a reader had no way to
 *  learn what the rows were. Each row now carries its own name, and the three
 *  names are the banner's own words: one budget, divided between channels,
 *  within the expected range. Names, not figures, so nothing is claimed.
 *
 *  HOW IT MOVES. Segment x and width are SVG attributes, which motion/react
 *  animates directly (attrX, not x: motion treats `x` on SVG as a transform),
 *  so nothing is scaled and the rounded ends stay round. The connectors from
 *  segment to channel chip animate their path the same way. On every move a
 *  packet of light runs down each divider and each connector, re-keyed per
 *  step so the CSS animation restarts (the same agent-signal mechanic as the
 *  AI Automation hero), which is what makes a rebalance every couple of
 *  seconds read as motion rather than as a still that occasionally changes.
 *  Reduced motion shows the first allocation as a still. */

const W = 220;
const BAR_X = 16;
const BAR_W = W - BAR_X * 2;

/** Three allocations, each summing to one. Arbitrary by design; see above. */
const SCENARIOS: number[][] = [
  [0.3, 0.26, 0.16, 0.14, 0.14],
  [0.22, 0.32, 0.12, 0.2, 0.14],
  [0.34, 0.2, 0.2, 0.1, 0.16],
];

const HOLD_MS = 2600;
const EASE = [0.16, 1, 0.3, 1] as const;

function layout(shares: number[]) {
  const gap = 4;
  const usable = BAR_W - gap * (shares.length - 1);
  let x = BAR_X;
  return shares.map((s) => {
    const w = usable * s;
    const seg = { x, w, cx: x + w / 2 };
    x += w + gap;
    return seg;
  });
}

export function BudgetSplit({ channels, className }: { channels: Channel[]; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setStep((s) => s + 1), HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const shares = SCENARIOS[step % SCENARIOS.length].slice(0, channels.length);
  const segs = layout(shares);
  const chipW = BAR_W / channels.length;
  const chipCx = (i: number) => BAR_X + chipW * i + chipW / 2;
  const t = reduced ? { duration: 0 } : { duration: 1.1, ease: EASE };

  return (
    <div
      className={cn(
        // The house placement for a hero visual: right gutter, centred, out of
        // the flow, not rendered below the large breakpoint.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[440px] -translate-y-1/2 select-none lg:block xl:w-[500px]",
        className,
      )}
      role="img"
      aria-label={`A diagram in three rows: one campaign budget, that budget divided between ${channels.map((c) => c.name).join(", ")}, and the expected range for each channel. The split rebalances between scenarios, and each range widens or narrows with its channel's share.`}
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <svg viewBox={`0 0 ${W} 148`} className="relative block w-full" aria-hidden>
          {/* Every row says what it is. The drawing was legible only to
              someone who already knew what it drew; three labels, taken from
              the banner's own sentence ("recommend how it should be divided
              between channels ... within the expected range"), give a reader
              the way in. They are names, never figures. */}
          <text
            x={BAR_X}
            y="8"
            className="font-display"
            fill="var(--color-ash)"
            fontSize="6.4"
            fontWeight="600"
            letterSpacing="0.7"
          >
            ONE BUDGET
          </text>

          {/* The budget. One bar, always whole. */}
          <rect x={BAR_X} y="14" width={BAR_W} height="10" rx="3" fill="var(--color-snow)" />

          {/* Where it flows out of. Short ticks rather than full dividers: the
              label below explains the relationship, so the lines no longer
              have to, and they used to run straight through it. */}
          {segs.map((s, i) => (
            <motion.line
              key={`d${i}`}
              y1="26"
              y2="34"
              stroke="var(--color-line)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              animate={{ x1: s.cx, x2: s.cx }}
              initial={false}
              transition={t}
            />
          ))}

          <text
            x={BAR_X}
            y="45"
            className="font-display"
            fill="var(--color-ash)"
            fontSize="6.4"
            fontWeight="600"
            letterSpacing="0.7"
          >
            DIVIDED BETWEEN CHANNELS
          </text>

          {/* The allocation. */}
          {segs.map((s, i) => (
            <motion.rect
              key={`s${i}`}
              y="51"
              height="10"
              rx="3"
              fill="var(--color-fog)"
              opacity={0.85 - i * 0.12}
              animate={{ attrX: s.x, width: s.w }}
              initial={false}
              transition={t}
            />
          ))}

          <text
            x={BAR_X}
            y="82"
            className="font-display"
            fill="var(--color-brand-text)"
            fontSize="6.4"
            fontWeight="600"
            letterSpacing="0.7"
          >
            EXPECTED RANGE
          </text>

          {/* Each channel's expected range: a bracket, wider with the share. */}
          {segs.map((s, i) => {
            const half = Math.max(6, s.w * 0.42);
            return (
              <g key={`r${i}`}>
                <motion.line
                  y1="92"
                  y2="92"
                  stroke="var(--color-brand)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  animate={{ x1: s.cx - half, x2: s.cx + half }}
                  initial={false}
                  transition={t}
                />
                <motion.line
                  y1="88"
                  y2="96"
                  stroke="var(--color-brand)"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                  animate={{ x1: s.cx - half, x2: s.cx - half }}
                  initial={false}
                  transition={t}
                />
                <motion.line
                  y1="88"
                  y2="96"
                  stroke="var(--color-brand)"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                  animate={{ x1: s.cx + half, x2: s.cx + half }}
                  initial={false}
                  transition={t}
                />
                <motion.circle
                  cy="92"
                  r="2.4"
                  fill="var(--color-brand)"
                  animate={{ cx: s.cx }}
                  initial={false}
                  transition={t}
                />
              </g>
            );
          })}

          {/* From each allocation to the channel it belongs to. */}
          {segs.map((s, i) => (
            <motion.path
              key={`c${i}`}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              animate={{ d: `M ${s.cx} 102 C ${s.cx} 122, ${chipCx(i)} 122, ${chipCx(i)} 142` }}
              initial={false}
              transition={t}
            />
          ))}

          {/* The budget moving. Re-keyed on every step so each packet runs
              again: out of the bar, then on to the channel.
              ALWAYS RENDERED, never gated on `reduced`. Gating it produced a
              hydration mismatch: the server has no media query, so it emitted
              this group, and a client that prefers reduced motion removed it on
              the first render and React regenerated the tree. globals.css
              already stops `.agent-signal` under reduced motion and hides it,
              which is the correct mechanism and needs no branch here. */}
          {(
            <g key={`run-${step}`}>
              {segs.map((s, i) => (
                <motion.line
                  key={`ds${i}`}
                  y1="26"
                  y2="34"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="agent-signal"
                  style={{ animationDelay: `${300 + i * 90}ms` }}
                  animate={{ x1: s.cx, x2: s.cx }}
                  initial={false}
                  transition={t}
                />
              ))}
              {segs.map((s, i) => (
                <motion.path
                  key={`cs${i}`}
                  fill="none"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="agent-signal"
                  style={{ animationDelay: `${1100 + i * 110}ms` }}
                  animate={{ d: `M ${s.cx} 102 C ${s.cx} 122, ${chipCx(i)} 122, ${chipCx(i)} 142` }}
                  initial={false}
                  transition={t}
                />
              ))}
            </g>
          )}
        </svg>

        {/* The channels, in the document's order, with their official marks. */}
        <div
          className="relative -mt-3 grid"
          style={{ gridTemplateColumns: `repeat(${channels.length}, minmax(0, 1fr))` }}
        >
          {channels.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink-3 text-fog">
                <ChannelIcon name={c.icon} size={18} />
              </span>
              <span className="font-display text-[0.6875rem] font-semibold uppercase text-ash">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

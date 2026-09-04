"use client";

import { cn } from "@/lib/cn";

/** The hero visual: a business becoming something an AI system can find,
 *  understand and reference, drawn as three stations on one line.
 *
 *  WHY THIS SHAPE. The page's own thesis sentence is "making accurate
 *  information about your business easier for AI search systems to find,
 *  understand, and reference". Three verbs, in order, and each one is a
 *  different act: a crawler reaching a page, scattered facts resolving into one
 *  consistent record, and that record being named in an answer. So the drawing
 *  is three stations with a signal travelling through them, and each station
 *  draws its own act rather than a generic node.
 *
 *  NOT THE AEO PAGE'S PICTURE. That page's hero is an assistant composing an
 *  answer with sources resolving beneath it. This page is about everything
 *  that has to be true before that moment, so the answer here is the smallest
 *  part of the drawing, at the far end, and the work is the two stations in
 *  front of it.
 *
 *  NO TEXT THAT COULD BE A CLAIM. The page is an abstract page, the record is
 *  four unlabelled rows, the answer is redacted bars with one citation chip.
 *  The only words are the three verbs from the sentence and the five platform
 *  names the banner lists, as a caption row beneath. No figures anywhere: the
 *  document says "no general AI score".
 *
 *  HOW IT MOVES. All CSS, all looping, nothing branching on the reader's
 *  motion preference in markup: globals.css stops every one of these under
 *  reduced motion, and each ends on the finished state the markup already
 *  renders. The find beam sweeps the page; the record's rows draw in one after
 *  another; the citation chip pulses; and a packet runs the line between them
 *  on a loop, which is what makes the three read as one journey. */
export function SignalPath({
  stations,
  platforms,
  className,
}: {
  stations: [string, string, string];
  platforms: string[];
  className?: string;
}) {
  const label = {
    // 6.6 units, not 6.4: at lg the panel is 440px wide, so the svg is 374px
  // and 6.4 would render at 10.88px, just under the 11px floor.
  fontSize: 6.6,
    fontWeight: 600,
    letterSpacing: 0.7,
  } as const;
  const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, vectorEffect: "non-scaling-stroke" as const };

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[440px] -translate-y-1/2 select-none lg:block xl:w-[500px]",
        className,
      )}
      role="img"
      aria-label={`A diagram in three stations: an AI crawler finding a page, scattered business facts resolving into one consistent record, and that record being referenced in an AI answer. Beneath, the platforms covered: ${platforms.join(", ")}.`}
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

        <svg viewBox="0 0 220 88" className="relative block w-full text-fog" aria-hidden>
          {/* The line through all three, and the signal running it. */}
          <path d="M40 74 H180" {...S} className="text-line" />
          <path d="M40 74 H180" pathLength="100" stroke="var(--color-brand)" strokeWidth="0.9" strokeLinecap="round" fill="none" className="ci-flow" />

          {/* ---- FIND: a page, and a crawler's beam sweeping it. ---- */}
          <text x="16" y="10" className="font-display" fill="var(--color-ash)" {...label}>
            {stations[0].toUpperCase()}
          </text>
          <rect x="16" y="20" width="48" height="60" rx="3" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {[30, 38, 46, 54, 62].map((y, i) => (
            <rect key={y} x="22" y={y} width={i === 4 ? 22 : 36} height="2.6" rx="1.3" fill="var(--color-fog)" opacity="0.45" />
          ))}
          {/* The beam. Clipped to the page so it never spills. */}
          <clipPath id="sp-page">
            <rect x="16" y="20" width="48" height="60" rx="3" />
          </clipPath>
          <g clipPath="url(#sp-page)">
            <rect x="16" y="20" width="48" height="7" fill="var(--color-brand)" opacity="0.22" className="ci-scan-y" />
          </g>
          <circle cx="40" cy="74" r="3" fill="var(--color-brand)" />

          {/* ---- UNDERSTAND: four facts resolving into one record. ---- */}
          <text x="84" y="10" className="font-display" fill="var(--color-ash)" {...label}>
            {stations[1].toUpperCase()}
          </text>
          <rect x="84" y="20" width="52" height="60" rx="3" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {[
            { y: 31, w: 30 },
            { y: 43, w: 38 },
            { y: 55, w: 24 },
            { y: 67, w: 34 },
          ].map((r, i) => (
            <g key={r.y}>
              <rect x="90" y={r.y - 2} width="5" height="5" rx="1.2" fill="var(--color-brand)" opacity="0.85" />
              <path d={`M99 ${r.y + 0.5} h${r.w}`} pathLength="100" stroke="var(--color-snow)" strokeWidth="1.3" strokeLinecap="round" fill="none" className="ci-draw" style={{ animationDelay: `${i * 380}ms` }} />
            </g>
          ))}
          <circle cx="110" cy="74" r="3" fill="var(--color-brand)" />

          {/* ---- REFERENCE: an answer, and the one chip that names you. ---- */}
          <text x="156" y="10" className="font-display" fill="var(--color-ash)" {...label}>
            {stations[2].toUpperCase()}
          </text>
          <rect x="156" y="20" width="48" height="60" rx="3" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {[30, 37, 44, 51].map((y, i) => (
            <rect key={y} x="162" y={y} width={i === 3 ? 20 : 36} height="2.6" rx="1.3" fill="var(--color-fog)" opacity="0.45" />
          ))}
          {/* The citation. */}
          <rect x="162" y="62" width="30" height="10" rx="3" fill="var(--color-brand)" opacity="0.14" />
          <rect x="162" y="62" width="30" height="10" rx="3" {...S} className="text-brand" />
          <rect x="167" y="66" width="14" height="2" rx="1" fill="var(--color-brand)" />
          <circle cx="177" cy="67" r="9" {...S} className="glyph-pulse text-brand" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
          <circle cx="180" cy="74" r="3" fill="var(--color-brand)" />

          {/* Where each station hands to the next. */}
          <path d="M64 74 h20 M136 74 h20" {...S} className="text-brand" opacity="0.5" strokeDasharray="2 3" />
        </svg>

        {/* The platforms the banner names. Text, never marks: these are not
            the site's own channels, and inventing logos is not an option. */}
        <div className="relative mt-6 flex flex-wrap justify-center gap-2">
          {platforms.map((p) => (
            <span
              key={p}
              className="font-display rounded-full border border-line bg-ink-3 px-3 py-1 text-[0.6875rem] font-semibold uppercase text-ash"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

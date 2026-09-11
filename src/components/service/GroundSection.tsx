import { cn } from "@/lib/cn";

/** The hero visual: a live website, and the ground it stands on, in section.
 *
 *  WHY THIS. The banner sells five things at once ("regional servers, SSL,
 *  daily backups, monitoring and technical support"), and a picture of five
 *  things is five icons in a row, which says nothing. What the document
 *  actually argues, in every section, is that a website stands on something:
 *  hosting decides "how quickly your website loads, how reliably it stays
 *  available and how well it handles visitors when traffic increases", and when
 *  a problem appears the question is which layer it is in. So the hero is a
 *  section through the ground, with the site on the surface and the work
 *  happening underneath it, where a visitor never sees it. That is the whole
 *  proposition of managed hosting: keep the site running "without managing the
 *  server".
 *
 *  THE NOTATION IS A GEOLOGICAL SECTION, which this site already uses on the
 *  Insights masthead. Diagonal hatching under a surface line reads as ground
 *  rather than as an area chart, and it needs no key.
 *
 *  NOT ONE WORD AND NOT ONE FIGURE. This document contains no uptime, no
 *  storage allowance and no retention period: all of them are deferred to the
 *  proposal. So nothing here is labelled, nothing is counted, and the row of
 *  recovery points runs off both edges of the frame rather than resolving into
 *  a number of days.
 *
 *  FOUR THINGS ARE STILL RUNNING at rest: requests descending into the ground
 *  and the page returning, the allocation widening to carry a surge and
 *  settling, a watch sweeping the section, and a light walking the recovery
 *  points. All four are the shared ci-* classes from globals.css, so all four
 *  stop under prefers-reduced-motion and all four rest on a finished drawing:
 *  the marks stay, only the light on them stops. */

const LINE = "var(--color-line)";
const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";

/** The recovery points. Laid past both frame edges on purpose: the document
 *  states no retention period, so the row must not resolve into a count. */
const POINTS = [-8, 16, 40, 64, 88, 112, 136, 160, 184, 208, 232];

export function GroundSection({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[360px] -translate-y-1/2 select-none lg:block xl:w-[400px]",
        className,
      )}
      role="img"
      aria-label="A website drawn on the surface with visitors arriving at it, and the hosting environment drawn underneath it as ground in section: requests pass down into it and the page returns, the allocation widens to carry a rise in traffic and settles back, a watch sweeps the whole section, and a row of recovery points runs past both edges of the frame."
    >
      <svg viewBox="0 0 240 252" aria-hidden className="h-auto w-full overflow-visible">
        <defs>
          {/* Ground. Texture, not meaning, so it stays quiet in both themes. */}
          <pattern id="wh-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke={ASH} strokeWidth="0.75" opacity="0.42" />
          </pattern>
          <clipPath id="wh-ground">
            <rect x="12" y="96" width="216" height="144" rx="3" />
          </clipPath>
        </defs>

        {/* ---- above the surface: visitors, and the site they arrive at ---- */}
        {[78, 120, 162].map((x, i) => (
          <path
            key={x}
            d={`M${x} 2 V 24`}
            pathLength="100"
            stroke={BRAND}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            className="ci-flow"
            style={{ animationDelay: `${i * 0.55}s` }}
          />
        ))}

        <rect x="58" y="28" width="124" height="56" rx="6" stroke={LINE} strokeWidth="1.2" fill="var(--color-ink-3)" />
        <rect x="58" y="28" width="124" height="11" rx="6" fill={LINE} opacity="0.4" />
        <circle cx="66" cy="33.5" r="1.6" fill={ASH} opacity="0.7" />
        <circle cx="72" cy="33.5" r="1.6" fill={ASH} opacity="0.5" />
        <rect x="67" y="47" width="36" height="3" rx="1.5" fill={ASH} opacity="0.55" />
        <rect x="67" y="55" width="64" height="2.4" rx="1.2" fill={LINE} />
        <rect x="67" y="62" width="52" height="2.4" rx="1.2" fill={LINE} />
        <rect x="67" y="69" width="28" height="7" rx="3.5" fill={BRAND} opacity="0.8" />
        <rect x="139" y="47" width="34" height="29" rx="3" stroke={LINE} strokeWidth="1" fill="none" />

        {/* The surface itself. */}
        <line x1="12" y1="96" x2="228" y2="96" stroke={ASH} strokeWidth="1.4" />
        {/* What the site stands on. */}
        <path d="M108 84 V 96" stroke={LINE} strokeWidth="1.2" />
        <path d="M132 84 V 96" stroke={LINE} strokeWidth="1.2" />

        {/* ---- below the surface: the environment ---- */}
        <g clipPath="url(#wh-ground)">
          <rect x="12" y="96" width="216" height="144" fill="url(#wh-hatch)" />

          {/* The allocation under the site. One element, widening and settling:
              a row of bars on staggered delays would be a chart of a weighting
              this document does not give. */}
          <rect x="30" y="104" width="180" height="9" rx="2" fill={BRAND} opacity="0.14" className="ci-grow-x" />
          <rect x="30" y="104" width="180" height="9" rx="2" stroke={BRAND} strokeWidth="0.9" fill="none" opacity="0.5" className="ci-grow-x" />

          {/* Strata. Divisions only: nothing here is named, because naming four
              layers would need four labels and the drawing answers one
              question, not four. */}
          <line x1="12" y1="126" x2="228" y2="126" stroke={ASH} strokeWidth="1" strokeDasharray="4 5" opacity="0.7" />
          <line x1="12" y1="156" x2="228" y2="156" stroke={ASH} strokeWidth="1" strokeDasharray="4 5" opacity="0.7" />
          <line x1="12" y1="192" x2="228" y2="192" stroke={ASH} strokeWidth="1" strokeDasharray="4 5" opacity="0.7" />

          {/* The request going down and the page coming back. */}
          <path d="M113 86 V 172" pathLength="100" stroke={ASH} strokeWidth="1.1" fill="none" opacity="0.6" />
          <path d="M127 86 V 172" pathLength="100" stroke={ASH} strokeWidth="1.1" fill="none" opacity="0.6" />
          <path d="M113 86 V 172" pathLength="100" stroke={BRAND} strokeWidth="2" strokeLinecap="round" fill="none" className="ci-flow" />
          <path d="M127 172 V 86" pathLength="100" stroke={BRAND} strokeWidth="2" strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDelay: "1.1s" }} />
          <rect x="92" y="170" width="56" height="15" rx="3" stroke={ASH} strokeWidth="1.2" fill="var(--color-ink-2)" />
          <rect x="99" y="176" width="18" height="2.8" rx="1.4" fill={ASH} opacity="0.7" />
          <rect x="123" y="176" width="10" height="2.8" rx="1.4" fill={ASH} opacity="0.45" />

          {/* The recovery points, and the newest one being written. */}
          <line x1="120" y1="185" x2="120" y2="204" stroke={ASH} strokeWidth="1" strokeDasharray="3 4" opacity="0.8" />
          <line x1="-10" y1="212" x2="250" y2="212" stroke={ASH} strokeWidth="1" opacity="0.6" />
          {POINTS.map((x, i) => (
            <g key={x}>
              <rect x={x} y="205" width="10" height="15" rx="2" stroke={ASH} strokeWidth="1" fill="var(--color-ink-2)" opacity="0.95" />
              <rect
                x={x + 2.5}
                y="208"
                width="5"
                height="9"
                rx="1"
                fill={BRAND}
                className="ci-blink"
                style={{ animationDelay: `${(i * 6) / POINTS.length}s` }}
              />
            </g>
          ))}

          {/* The watch. It sweeps the whole section rather than one layer,
              because the copy's own claim is that a problem may come from any
              of them. */}
          <rect x="0" y="96" width="2.5" height="144" fill={BRAND} opacity="0.55" className="ci-scan-x" />
        </g>

        <rect x="12" y="96" width="216" height="144" rx="3" stroke={ASH} strokeWidth="1.2" fill="none" opacity="0.8" />
      </svg>
    </div>
  );
}

import type { Cover } from "@/content/services/web-hosting";

/** Seven covered areas, seven drawings.
 *
 *  RULE SEVEN OF DESIGN.md, APPLIED. One drawing that only changes state cannot
 *  depict an environment being specified AND a site being moved AND a
 *  certificate being renewed: it collapses into the one abstract shape all
 *  seven have in common. So each plate answers exactly one question about its
 *  own entry, in that entry's own terms, and none of them is labelled: the card
 *  the plate sits in carries the words.
 *
 *  EVERY PLATE IS A SECTION THROUGH THE SAME GROUND, which is what makes seven
 *  different drawings read as one sheet rather than as seven clip-art marks.
 *  The surface rule, the hatch and the brand-for-the-work convention are the
 *  hero's, carried down.
 *
 *  EACH ONE HAS SOMETHING STILL RUNNING, and all of it is the shared ci-*
 *  vocabulary from globals.css: those classes are already correct about
 *  vector-effect, they already stop under prefers-reduced-motion, and each one
 *  rests on a finished drawing. Where a light walks a strip, the first mark
 *  carries data-first-tick so the strip rests lit rather than blank.
 *
 *  NO FIGURE ANYWHERE. No storage bar, no uptime, no retention count. The row
 *  of recovery points runs off both edges of its frame for exactly that reason:
 *  the document defers retention to the proposal, so the drawing must not
 *  answer it. */

const LINE = "var(--color-line)";
const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";

/** Hosting Environment and Setup. The same standard package above, the parts
 *  the recommended setup is actually made of below. Difference in shape, never
 *  in size: a row of five different heights would be a chart of a specification
 *  this document does not give. */
function Setup() {
  const seats = [26, 86, 146, 206, 266];
  return (
    <svg viewBox="0 0 320 74" role="img" aria-label="Five identical dashed outlines above, standing for the same standard package, and below them five differently shaped parts seated on one rail, standing for a setup configured around the website." className="h-full w-full overflow-visible">
      {seats.map((x) => (
        <rect key={`g${x}`} x={x} y="6" width="28" height="18" rx="2" stroke={LINE} strokeWidth="1.1" strokeDasharray="4 4" fill="none" />
      ))}
      <line x1="10" y1="52" x2="310" y2="52" stroke={ASH} strokeWidth="1.3" />
      <g data-first-tick>
        {/* Five parts of five shapes, seated on the rail. */}
        <rect x={seats[0]} y="34" width="28" height="18" rx="2" stroke={ASH} strokeWidth="1.2" fill="none" />
        <rect x={seats[0] + 3} y="37" width="22" height="12" rx="1" fill={BRAND} className="ci-blink" style={{ animationDelay: "0s" }} />

        <rect x={seats[1] + 6} y="26" width="16" height="26" rx="2" stroke={ASH} strokeWidth="1.2" fill="none" />
        <rect x={seats[1] + 9} y="29" width="10" height="20" rx="1" fill={BRAND} className="ci-blink" style={{ animationDelay: "1.2s" }} />

        <rect x={seats[2] - 6} y="40" width="40" height="12" rx="2" stroke={ASH} strokeWidth="1.2" fill="none" />
        <rect x={seats[2] - 3} y="43" width="34" height="6" rx="1" fill={BRAND} className="ci-blink" style={{ animationDelay: "2.4s" }} />

        <circle cx={seats[3] + 14} cy="40" r="12" stroke={ASH} strokeWidth="1.2" fill="none" />
        <circle cx={seats[3] + 14} cy="40" r="7" fill={BRAND} className="ci-blink" style={{ animationDelay: "3.6s" }} />

        <path d={`M${seats[4] + 14} 28 L${seats[4] + 28} 52 H${seats[4]} Z`} stroke={ASH} strokeWidth="1.2" fill="none" />
        <path d={`M${seats[4] + 14} 34 L${seats[4] + 23} 49 H${seats[4] + 5} Z`} fill={BRAND} className="ci-blink" style={{ animationDelay: "4.8s" }} />
      </g>
      <rect x="10" y="52" width="300" height="20" fill="url(#wh-plate-hatch)" />
      <rect x="10" y="52" width="300" height="20" stroke={LINE} strokeWidth="1" fill="none" />
    </svg>
  );
}

/** Website Migration. The site leaves one ground and arrives on another, its
 *  files, database, domain settings and dependencies crossing on their own
 *  lines, and the arrived site drawn again as the check that follows. */
function Migration() {
  return (
    <svg viewBox="0 0 280 92" role="img" aria-label="A website standing on one patch of ground, its parts crossing on parallel lines to a second patch, and the arrived website being drawn again as the post-transfer check." className="h-full w-full overflow-visible">
      <line x1="6" y1="66" x2="112" y2="66" stroke={ASH} strokeWidth="1.4" />
      <rect x="6" y="66" width="106" height="20" fill="url(#wh-plate-hatch)" />
      <rect x="6" y="66" width="106" height="20" stroke={LINE} strokeWidth="1" fill="none" />
      <rect x="22" y="34" width="74" height="30" rx="3" stroke={LINE} strokeWidth="1.2" fill="var(--color-ink-3)" />
      <rect x="29" y="41" width="26" height="3" rx="1.5" fill={ASH} opacity="0.6" />
      <rect x="29" y="49" width="48" height="2.4" rx="1.2" fill={LINE} />
      <rect x="29" y="56" width="34" height="2.4" rx="1.2" fill={LINE} />

      {[40, 49, 58].map((y) => (
        <g key={y}>
          <path d={`M100 ${y} H 182`} stroke={LINE} strokeWidth="1" fill="none" />
          <path d={`M100 ${y} H 182`} pathLength="100" stroke={BRAND} strokeWidth="2.4" strokeLinecap="round" fill="none" className="ci-flow" />
        </g>
      ))}

      <line x1="168" y1="66" x2="274" y2="66" stroke={ASH} strokeWidth="1.4" />
      <rect x="168" y="66" width="106" height="20" fill="url(#wh-plate-hatch)" />
      <rect x="168" y="66" width="106" height="20" stroke={LINE} strokeWidth="1" fill="none" />
      <path
        d="M184 34 H 258 A3 3 0 0 1 261 37 V 61 A3 3 0 0 1 258 64 H 184 A3 3 0 0 1 181 61 V 37 A3 3 0 0 1 184 34 Z"
        pathLength="100"
        stroke={BRAND}
        strokeWidth="1.6"
        fill="var(--color-ink-3)"
        className="ci-draw"
      />
      <rect x="188" y="41" width="26" height="3" rx="1.5" fill={BRAND} opacity="0.7" />
      <rect x="188" y="49" width="48" height="2.4" rx="1.2" fill={LINE} />
      <rect x="188" y="56" width="34" height="2.4" rx="1.2" fill={LINE} />
    </svg>
  );
}

/** SSL Certificate Management. What passes between a visitor and the site, and
 *  the seal on it: the marks inside the channel never resolve into legible
 *  rows, which is the whole of what encryption means here. */
function Ssl() {
  return (
    <svg viewBox="0 0 260 100" role="img" aria-label="A visitor and a website joined by a sealed channel, with the traffic inside it broken into unreadable marks and a lock on the channel being re-issued." className="h-full w-full overflow-visible">
      <rect x="6" y="30" width="52" height="42" rx="4" stroke={LINE} strokeWidth="1.2" fill="var(--color-ink-3)" />
      <rect x="6" y="30" width="52" height="9" rx="4" fill={LINE} opacity="0.45" />
      <circle cx="13" cy="34.5" r="1.4" fill={ASH} opacity="0.7" />
      <rect x="13" y="46" width="30" height="2.4" rx="1.2" fill={LINE} />
      <rect x="13" y="53" width="22" height="2.4" rx="1.2" fill={LINE} />

      <rect x="202" y="30" width="52" height="42" rx="4" stroke={LINE} strokeWidth="1.2" fill="var(--color-ink-3)" />
      <rect x="209" y="40" width="24" height="3" rx="1.5" fill={ASH} opacity="0.6" />
      <rect x="209" y="49" width="34" height="2.4" rx="1.2" fill={LINE} />
      <rect x="209" y="56" width="26" height="2.4" rx="1.2" fill={LINE} />

      <line x1="58" y1="38" x2="202" y2="38" stroke={ASH} strokeWidth="1.2" />
      <line x1="58" y1="64" x2="202" y2="64" stroke={ASH} strokeWidth="1.2" />
      {[46, 55].map((y, i) => (
        <path key={y} d={`M64 ${y} H 196`} pathLength="100" stroke={BRAND} strokeWidth="2.2" strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
      {[70, 86, 102, 118, 134, 150, 166, 182].map((x) => (
        <line key={x} x1={x} y1="44" x2={x} y2="58" stroke={LINE} strokeWidth="1" opacity="0.7" />
      ))}

      <rect x="112" y="20" width="36" height="26" rx="4" fill="var(--color-void)" stroke={BRAND} strokeWidth="1.4" />
      <path d="M124 20 V 14 A6 6 0 0 1 136 14 V 20" stroke={BRAND} strokeWidth="1.4" fill="none" />
      <circle cx="130" cy="32" r="3" fill={BRAND} />
      <path d="M130 5 A 28 28 0 0 1 130 61 A 28 28 0 0 1 130 5" pathLength="100" stroke={BRAND} strokeWidth="1" strokeDasharray="100" fill="none" opacity="0.45" className="ci-draw" />
    </svg>
  );
}

/** Daily Website Backups. A recovery point written under the site at an
 *  interval, and one of them coming back up. The row runs off both edges
 *  because the document states no retention period and the drawing must not
 *  answer a question the proposal answers. */
function Backup() {
  const points = [-10, 20, 50, 80, 110, 140, 170, 200, 230, 260];
  return (
    <svg viewBox="0 0 260 100" role="img" aria-label="A website above a surface line, writing a recovery point into the ground beneath it at an interval, with the row of points running past both edges of the frame and one of them returning to the site." className="h-full w-full overflow-visible">
      <rect x="92" y="6" width="76" height="30" rx="3" stroke={LINE} strokeWidth="1.2" fill="var(--color-ink-3)" />
      <rect x="99" y="13" width="24" height="3" rx="1.5" fill={ASH} opacity="0.6" />
      <rect x="99" y="21" width="50" height="2.4" rx="1.2" fill={LINE} />
      <rect x="99" y="28" width="36" height="2.4" rx="1.2" fill={LINE} />

      <line x1="6" y1="52" x2="254" y2="52" stroke={ASH} strokeWidth="1.3" />
      <path d="M130 36 V 62" pathLength="100" stroke={BRAND} strokeWidth="2" strokeLinecap="round" fill="none" className="ci-flow" />
      <rect x="6" y="52" width="248" height="44" fill="url(#wh-plate-hatch)" />
      <rect x="6" y="52" width="248" height="44" stroke={LINE} strokeWidth="1" fill="none" />

      <g data-first-tick>
        {points.map((x, i) => (
          <g key={x}>
            <rect x={x} y="66" width="16" height="22" rx="2" stroke={ASH} strokeWidth="1" fill="var(--color-ink-2)" />
            <rect x={x + 4} y="70" width="8" height="14" rx="1" fill={BRAND} className="ci-blink" style={{ animationDelay: `${(i * 6) / points.length}s` }} />
          </g>
        ))}
      </g>
      <path d="M44 66 C 44 44 64 44 76 44" stroke={BRAND} strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
      <path d="M76 44 l -6 -4 M76 44 l -6 4" stroke={BRAND} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/** Uptime and Technical Monitoring. The entry's own sentence names four places
 *  a problem can come from, so the drawing is four bands and one fault that
 *  moves between them while the watch sweeps: the question the section asks is
 *  which layer, not whether. */
function Monitor() {
  const bands = [24, 42, 60, 78];
  return (
    <svg viewBox="0 0 260 100" role="img" aria-label="Four stacked bands with a watch on the left reading all four, a single fault mark appearing in one band at a time, and a beam sweeping the whole stack." className="h-full w-full overflow-visible">
      <defs>
        <clipPath id="wh-monitor-clip">
          <rect x="44" y="16" width="210" height="76" />
        </clipPath>
      </defs>
      {bands.map((y) => (
        <g key={y}>
          <rect x="44" y={y - 6} width="206" height="13" rx="2" stroke={LINE} strokeWidth="1.1" fill="none" />
          <line x1="14" y1="52" x2="44" y2={y} stroke={ASH} strokeWidth="1" opacity="0.55" />
        </g>
      ))}
      <circle cx="14" cy="52" r="9" stroke={ASH} strokeWidth="1.3" fill="var(--color-ink-2)" />
      <circle cx="14" cy="52" r="3.2" fill={BRAND} />

      <g data-first-tick>
        {bands.map((y, i) => (
          <rect key={y} x="150" y={y - 5} width="11" height="11" rx="2" fill={BRAND} className="ci-blink" style={{ animationDelay: `${(i * 6) / bands.length}s` }} />
        ))}
      </g>
      <g clipPath="url(#wh-monitor-clip)">
        <rect x="0" y="16" width="2.5" height="76" fill={BRAND} opacity="0.55" className="ci-scan-x" />
      </g>
    </svg>
  );
}

/** Performance and Resource Management. One allocation, the usage inside it
 *  rising to meet a predictable increase and settling, and the room the
 *  environment can be extended into drawn open on the right. One growing
 *  element only: several on staggered delays would put a row of different
 *  lengths on screen at every instant, which is a chart of a figure this
 *  document does not give. */
function Resources() {
  return (
    <svg viewBox="0 0 280 86" role="img" aria-label="A single allocation band with the usage inside it rising and settling, and a dashed extension to its right standing for the room the environment can be adjusted into." className="h-full w-full overflow-visible">
      <line x1="10" y1="70" x2="270" y2="70" stroke={ASH} strokeWidth="1.3" />
      <rect x="10" y="70" width="260" height="13" fill="url(#wh-plate-hatch)" />

      <rect x="14" y="34" width="184" height="28" rx="3" stroke={ASH} strokeWidth="1.3" fill="none" />
      <rect x="14" y="34" width="184" height="28" rx="3" fill={BRAND} opacity="0.16" className="ci-grow-x" />
      <rect x="200" y="34" width="66" height="28" rx="3" stroke={LINE} strokeWidth="1.2" strokeDasharray="5 5" fill="none" />

      {[40, 76, 112, 148].map((x) => (
        <path key={x} d={`M${x} 4 V 28`} pathLength="100" stroke={BRAND} strokeWidth="2" strokeLinecap="round" fill="none" className="ci-flow" />
      ))}
      <line x1="198" y1="28" x2="198" y2="68" stroke={ASH} strokeWidth="1" strokeDasharray="3 4" />
    </svg>
  );
}

/** Technical Hosting Support. A contact reached inside the boundary, and the
 *  four kinds of work the entry's last sentence puts outside it, standing past
 *  a gate on a broken outline. Four blocks because the sentence names four
 *  things, countable by eye, which is the test every figure on this site has
 *  to pass. */
function Support() {
  return (
    <svg viewBox="0 0 320 82" role="img" aria-label="A closed boundary holding the hosting environment with a contact point inside it being reached, a gate in its right edge, and four blocks standing outside the gate on a broken outline." className="h-full w-full overflow-visible">
      <path d="M12 20 H 186 M12 20 A 6 6 0 0 0 6 26 V 62 A 6 6 0 0 0 12 68 H 186" stroke={ASH} strokeWidth="1.3" fill="none" />
      <path d="M186 20 H 196 M186 68 H 196" stroke={ASH} strokeWidth="1.3" fill="none" />

      <path d="M52 0 V 34" pathLength="100" stroke={BRAND} strokeWidth="2.2" strokeLinecap="round" fill="none" className="ci-flow" />
      <circle cx="52" cy="44" r="11" stroke={BRAND} strokeWidth="1.4" fill="var(--color-ink-2)" />
      <circle cx="52" cy="44" r="4" fill={BRAND} />

      <rect x="92" y="32" width="34" height="24" rx="3" stroke={LINE} strokeWidth="1.1" fill="none" />
      <rect x="136" y="32" width="34" height="24" rx="3" stroke={LINE} strokeWidth="1.1" fill="none" />
      <line x1="70" y1="44" x2="92" y2="44" stroke={ASH} strokeWidth="1" opacity="0.6" />
      <line x1="126" y1="44" x2="136" y2="44" stroke={ASH} strokeWidth="1" opacity="0.6" />

      {/* The gate, and what stands past it. */}
      <line x1="210" y1="14" x2="210" y2="74" stroke={LINE} strokeWidth="1.1" strokeDasharray="5 5" />
      {[224, 248, 272, 296].map((x) => (
        <rect key={x} x={x} y="32" width="18" height="24" rx="3" stroke={LINE} strokeWidth="1.1" strokeDasharray="4 4" fill="none" />
      ))}
    </svg>
  );
}

const PLATES: Record<Cover["plate"], () => React.ReactElement> = {
  setup: Setup,
  migration: Migration,
  ssl: Ssl,
  backup: Backup,
  monitor: Monitor,
  resources: Resources,
  support: Support,
};

/** The ground hatch, defined once for every plate on the page. Rendered by the
 *  section rather than by each plate, so seven copies of one pattern do not end
 *  up in the DOM with seven ids to keep unique. */
export function PlateHatch() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <pattern id="wh-plate-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={ASH} strokeWidth="0.75" opacity="0.42" />
        </pattern>
      </defs>
    </svg>
  );
}

export function HostingPlate({ plate }: { plate: Cover["plate"] }) {
  const Shape = PLATES[plate];
  return (
    <div className="h-[116px] w-full">
      <Shape />
    </div>
  );
}

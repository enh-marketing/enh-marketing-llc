"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { getLenis } from "@/components/fx/SmoothScroll";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

/** "What Our Marketing Consultation Covers" — the nine areas, drawn as the one
 *  business they are nine readings of.
 *
 *  WHY ONE DRAWING AND NOT NINE, WHEN `docs/DESIGN.md` RULE 7 SAYS THE
 *  OPPOSITE. Rule 7 kills a single diagram in N states because it "collapses
 *  into the one abstract shape all seven have in common" -- true of seven
 *  different services, which are seven different things. These nine are not.
 *  They are nine parts of ONE business: what it already runs, what it is for,
 *  who comes to it, what stands around it, what it says, where they land, what
 *  it publishes, where it appears, and what joins all of that up. Nothing
 *  collapses here, because each stage draws a different, specific part -- there
 *  are still nine pictures, they just share a ground, and the shared ground is
 *  the claim the section is making. A reader who has scrolled the nine has
 *  watched a survey of their own business get drawn.
 *
 *  AND THE DOCUMENT ENDS ON CONNECTION, WHICH IS WHY THE DRAWING DOES. The
 *  ninth area is "repetitive processes that could be connected or simplified".
 *  So the plan starts as one outline with a strip of things already running
 *  over it, and finishes as a business with its audience arriving, its market
 *  beside it, its surfaces above it and a layer underneath joining them. The
 *  last frame is the deliverable, and it is the client's own last sentence.
 *
 *  NOTHING IS COUNTED. Eight marks in the audit strip because the sentence
 *  names eight channels; five surfaces because it names five destinations;
 *  three peers in a cluster and one empty footprint because the sentence says
 *  crowded and says room. No axis, no scale, no figure, and nothing on the
 *  drawing carries a word -- every one of the nine is named in the index and
 *  in the list beside it.
 *
 *  RESOLVED IS ASH, ACTIVE IS BRAND, UNREACHED IS ABSENT. Not a grey film:
 *  everything already surveyed stays fully legible, which is what makes the
 *  last frame a complete drawing rather than a dim one.
 *
 *  THE INDEX IS THE ANSWER TO RULE 1. Nine areas across nine viewports of
 *  scroll would otherwise mean a reader never sees more than one name at a
 *  time, which is the failure that rule names. So the sticky column carries
 *  all nine, and each is a control that jumps the scroll to its own stage --
 *  through Lenis, because a bare `scrollTo` is glided back.
 *
 *  STICKY, NEVER A PINNED SCROLL HIJACK, and `overflow-x-clip` never
 *  `overflow-hidden`, which would silently make the section a scroll container
 *  and kill the sticky panel. Same rules as `CreativeRhythm`, which is the
 *  approved section this arrangement is built from.
 *
 *  ACTIVE STAGE COMES FROM A TRIGGER PER ITEM, not from `floor(progress * n)`.
 *  The nine items are deliberately different heights -- one carries a register
 *  of eight, another carries three -- so dividing the section's progress into
 *  nine equal bands would light the wrong heading. Each item owns a trigger
 *  that reports when it is the one across the middle of the screen. */

export type CoverageArea = {
  no: string;
  title: string;
  lead?: string;
  leadMark?: string[];
  /** The clause the document runs its list off. */
  stem?: string;
  items?: string[];
  /** Whatever the paragraph says once the list closes. */
  tail?: string;
  tailMark?: string[];
  /** The document's own conditional list, kept conditional. */
  mayStem?: string;
  may?: string[];
  mayTail?: string;
};

/* ------------------------------------------------------------- the plan --- */

/** The eight things already running, along the top. Different shapes at one
 *  scale, because the sentence names eight different kinds of channel and
 *  ranks none of them. */
const AUDIT_X = [46, 94, 142, 190, 238, 286, 334, 382];

/** Five content destinations above the business, at five proportions. Drawn as
 *  PAGES -- a head rule and a body -- so they cannot be mistaken for the feed
 *  on the right, which is a different kind of surface entirely. */
const PAGES: [number, number, number, number][] = [
  [140, 86, 22, 30],
  [168, 76, 20, 34],
  [194, 92, 24, 22],
  [224, 80, 20, 32],
  [252, 90, 22, 26],
];

/** The feed, and the cadence under it. */
const FEED_CARDS = [80, 96, 112];
const CADENCE = [300, 308, 316, 324, 332, 340, 348];

/** The market on the ground: a crowded cluster and, next to the business, one
 *  empty footprint.
 *
 *  DRAWN AS PREMISES, NOT AS RECTANGLES. Four outlined boxes of four heights
 *  standing on a baseline is a bar chart, whatever it is meant to be, and a
 *  bar chart here would be claiming a size for four businesses the document
 *  never measures. A parapet, a pitched roof, a stepped frontage and an
 *  awning cost four extra segments each and make them buildings instead --
 *  the same fix the hospitality page's "eight premises on one ground line"
 *  already landed. The doors matter for the same reason: a shape with a way
 *  in is a premises, and a shape without one is a bar. */
const PEERS: { d: string; door: number }[] = [
  { d: "M30 216 V174 H56 V216 M27 174 H59", door: 38 },
  { d: "M60 216 V194 L71 186 L82 194 V216", door: 68 },
  { d: "M86 216 V186 H95 V176 H110 V216", door: 96 },
  { d: "M114 216 V196 H134 V216 M111 202 H137", door: 120 },
];

/** Where the tech layer rises through the ground. */
const RISERS = [86, 158, 230, 302];

/** The message, wherever it is repeated: one mark, one length, everywhere. */
function Mark({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y} H${x + 10}`}
      stroke="var(--color-brand)"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  );
}

function Plan({ stage, reduced }: { stage: number; reduced: boolean }) {
  /** A stage's own group: absent until reached, brand while it is the subject,
   *  ash once surveyed. */
  const g = (n: number) =>
    cn(
      "transition-[color,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
      n > stage ? "opacity-0" : "opacity-100",
      n === stage ? "text-brand" : "text-ash",
    );
  /** ONLY THE STAGE BEING SURVEYED CARRIES A LOOP, and the moving parts are
   *  not rendered at all otherwise.
   *
   *  This was a class toggle at first -- `className={live(n, "ci-flow")}` --
   *  and it was wrong in a way that only showed when every stage was drawn
   *  side by side: with no `ci-flow` on it, a travelling packet is just a
   *  solid brand stroke sitting on the path. So a surveyed stage kept a red
   *  route, a red connector and a red loop, three stages were competing for
   *  the eye at once, and "resolved is ash" was not true of any of them.
   *  Rendering the overlay only while the stage is live is the whole fix, and
   *  it also means a reader who asked for no motion gets no dead marks. */
  const live = (n: number) => n === stage && !reduced;

  return (
    <svg viewBox="0 0 420 256" className="block w-full" fill="none" aria-hidden>
      {/* THE SHEET the survey is drawn on: the ground the business stands on
          and the outline of the business itself. Present from the first frame,
          because both existed before anyone was asked to look at them. */}
      <g className="text-ash">
        <path d="M24 216 H396" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.75" />
        <rect
          x="168"
          y="132"
          width="104"
          height="84"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeOpacity="0.85"
        />
      </g>

      {/* 1 — WHAT IS ALREADY RUNNING. Eight marks over a rule, read one at a
          time: the audit passing across the work already being done. */}
      <g className={g(0)}>
        <path
          d="M24 66 H396"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeDasharray="4 5"
        />
        {AUDIT_X.map((x, i) => (
          <g key={x}>
            {i % 4 === 0 && (
              <rect x={x - 11} y="20" width="22" height="26" stroke="currentColor" strokeWidth="1.3" />
            )}
            {i % 4 === 1 && <circle cx={x} cy="33" r="13" stroke="currentColor" strokeWidth="1.3" />}
            {i % 4 === 2 && (
              <path
                d="M0 13 L12 -13 L24 13 Z"
                transform={`translate(${x - 12} 33)`}
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            )}
            {i % 4 === 3 && (
              <rect
                x={x - 12}
                y="23"
                width="24"
                height="20"
                rx="10"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            )}
            <circle cx={x} cy="57" r="2.6" fill="currentColor" opacity="0.5" />
            {live(0) && (
              <circle
                cx={x}
                cy="57"
                r="3.4"
                fill="var(--color-brand)"
                className="ci-blink"
                style={{ animationDelay: `${(i * 6) / 8}s` }}
              />
            )}
          </g>
        ))}
      </g>

      {/* 2 — WHAT IT IS FOR. A marker the business does not stand on, and a
          line joining the two: "marketing goals need to connect to something
          the business values". */}
      <g className={g(1)}>
        <path d="M356 132 V216" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M356 132 H396 L386 141 L396 150 H356"
          stroke="var(--color-brand)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M276 160 H350"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeDasharray="4 5"
        />
        {live(1) && (
          <path
            d="M276 160 H350"
            pathLength="100"
            stroke="var(--color-brand)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="ci-flow"
          />
        )}
      </g>

      {/* 3 — WHO COMES, AND BY WHAT STEPS. One route with four stops, ending
          at the business rather than inside it: the journey is what happens
          BEFORE contacting or buying. */}
      <g className={g(2)}>
        <path
          d="M28 82 C66 82 62 112 96 124 C122 133 118 156 142 168 C152 173 158 176 168 180"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {[
          [28, 82],
          [66, 100],
          [104, 132],
          [142, 168],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="4.5" stroke="currentColor" strokeWidth="1.4" />
        ))}
        {live(2) && (
          <path
            d="M28 82 C66 82 62 112 96 124 C122 133 118 156 142 168 C152 173 158 176 168 180"
            pathLength="100"
            stroke="var(--color-brand)"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="ci-flow"
          />
        )}
      </g>

      {/* 4 — WHAT STANDS AROUND IT. A crowded cluster on one side and, right
          against the business, one empty footprint. The sentence says where the
          market is crowded and where there is room, and the only thing drawn is
          the difference between those two. */}
      <g className={g(3)}>
        {PEERS.map((peer, i) => (
          <g
            key={peer.d}
            // The peers flicker rather than carrying a marker each: a dot
            // floating over a building is a label nobody can read, and
            // ci-twinkle is the class this site keeps for "peers in a
            // category, none of them the subject".
            className={live(3) ? "ci-twinkle" : undefined}
            style={live(3) ? { animationDelay: `${i * 0.7}s` } : undefined}
          >
            <path
              d={peer.d}
              stroke="currentColor"
              strokeWidth="1.3"
              strokeOpacity="0.85"
              strokeLinejoin="round"
            />
            <path
              d={`M${peer.door} 216 V207 H${peer.door + 7} V216`}
              stroke="currentColor"
              strokeWidth="1.1"
              strokeOpacity="0.6"
              strokeLinejoin="round"
            />
          </g>
        ))}
        <rect
          x="136"
          y="188"
          width="24"
          height="28"
          stroke="var(--color-brand)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </g>

      {/* 5 — WHAT IT SAYS. One mark on the face of the business, and the same
          mark on every surface once those are drawn. Identical everywhere,
          because the claim is consistency and not weight. */}
      <g className={g(4)}>
        <rect x="178" y="146" width="84" height="16" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M184 154 H194"
          stroke="var(--color-brand)"
          strokeWidth="2.2"
          strokeLinecap="round"
          className={live(4) ? "ci-grow-x" : undefined}
        />
      </g>

      {/* 6 — WHERE THEY LAND, AND WHAT IS SUPPOSED TO HAPPEN THERE. The
          business gets its inside, and the route finally enters it. The only
          inked part is the action at the foot, which is the sentence's own
          subject. */}
      <g className={g(5)}>
        <path d="M178 140 H262" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
        <path
          d="M178 172 H248 M178 182 H262 M178 192 H238"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />
        <path
          d="M152 180 H168 M160 175 L168 180 L160 185"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M180 204 H222"
          stroke="var(--color-brand)"
          strokeWidth="7"
          strokeLinecap="round"
          className={live(5) ? "ci-grow-x" : undefined}
        />
      </g>

      {/* 7 — WHAT IT PUBLISHES AND WHERE THAT BELONGS. Five pages at five
          proportions, each carrying the same message mark, each tied back to
          the business. Pages, not panels: a head rule and a body, so the eye
          separates them from the feed on the right. */}
      <g className={g(6)}>
        {PAGES.map(([x, y, w, h], i) => (
          <g key={`p-${x}`}>
            <rect x={x} y={y} width={w} height={h} stroke="currentColor" strokeWidth="1.3" />
            <path
              d={`M${x + 4} ${y + 7} H${x + w - 4}`}
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.55"
            />
            <Mark x={x + 4} y={y + 14} />
            <path
              d={`M${x + w / 2} ${y + h} L218 132`}
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3 4"
            />
            {i === 2 && live(6) && (
              <path
                d={`M${x + w / 2} ${y + h} L218 132`}
                pathLength="100"
                stroke="var(--color-brand)"
                strokeWidth="2"
                strokeLinecap="round"
                className="ci-flow"
              />
            )}
          </g>
        ))}
      </g>

      {/* 8 — WHERE IT APPEARS, AND HOW OFTEN. A feed rather than more pages:
          one column, posts stacked in it, and a cadence beneath with one tick
          lit at a time -- a rhythm, where several lit at once would be a chart
          of volume. */}
      <g className={g(7)}>
        <rect x="296" y="72" width="54" height="54" stroke="currentColor" strokeWidth="1.3" />
        {FEED_CARDS.map((y, i) => (
          <g key={`f-${y}`}>
            <rect
              x="302"
              y={y}
              width="42"
              height="12"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeOpacity="0.7"
            />
            {i === 0 && <Mark x={306} y={y + 6} />}
          </g>
        ))}
        <path d="M294 134 H352" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
        {CADENCE.map((x, i) => (
          <g key={`c-${x}`}>
            {/* Posts hanging off the run, never crossing it: a tick through a
                rule reads as a plus sign at this scale, which is what the
                first version looked like. */}
            <path
              d={`M${x} 134 V143`}
              stroke="currentColor"
              strokeWidth="1.2"
              strokeOpacity="0.65"
              strokeLinecap="round"
            />
            {live(7) && (
              <path
                d={`M${x} 134 V146`}
                stroke="var(--color-brand)"
                strokeWidth="2.4"
                strokeLinecap="round"
                className="ci-blink"
                style={{ animationDelay: `${(i * 6) / CADENCE.length}s` }}
              />
            )}
          </g>
        ))}
      </g>

      {/* 9 — WHAT JOINS IT UP. A layer under the ground with a return on it,
          because the document's own last words are "repetitive processes that
          could be connected or simplified". With this drawn the plan is
          finished, which is what the consultation hands over. */}
      <g className={g(8)}>
        <path d="M52 234 H368" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {RISERS.map((x) => (
          <g key={`r-${x}`}>
            <path d={`M${x} 234 V214`} stroke="currentColor" strokeWidth="1.5" />
            <circle cx={x} cy="234" r="4.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </g>
        ))}
        <path
          d="M368 234 C392 234 392 252 368 252 H52 C28 252 28 234 52 234"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.55"
          strokeDasharray="4 5"
        />
        {live(8) && (
          <path
            d="M368 234 C392 234 392 252 368 252 H52 C28 252 28 234 52 234"
            pathLength="100"
            stroke="var(--color-brand)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="ci-flow"
          />
        )}
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------- the register --- */

function Register({ stem, items, open }: { stem?: string; items: string[]; open?: boolean }) {
  return (
    <div className="mt-5">
      {stem && <p className="text-sm leading-relaxed text-ash">{stem}</p>}
      <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="group/i flex items-start gap-2.5">
            {open ? (
              <span
                aria-hidden
                className="mt-[0.42rem] h-[7px] w-[7px] shrink-0 rounded-full border border-ash/70 transition-colors duration-300 group-hover/i:border-brand motion-reduce:transition-none"
              />
            ) : (
              <span
                aria-hidden
                className="mt-[0.62rem] h-px w-3 shrink-0 bg-brand/70 transition-all duration-300 group-hover/i:w-5 group-hover/i:bg-brand motion-reduce:transition-none"
              />
            )}
            <span className="text-[0.9375rem] leading-snug text-snow">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------------------------------------- the section --- */

export function CoverageSurvey({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: readonly CoverageArea[];
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  /** Last index pushed to React, so scrolling does not re-render every frame. */
  const lastPushed = useRef(0);
  const count = items.length;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const rail = ScrollTrigger.create({
        trigger: list,
        start: "top 65%",
        end: "bottom 75%",
        invalidateOnRefresh: true,
        onUpdate(self) {
          if (railRef.current) railRef.current.style.transform = `scaleY(${self.progress})`;
        },
      });

      // One trigger per stage rather than a single progress split into nine
      // equal bands: the stages are different heights, so equal bands light
      // the wrong heading by the fourth one.
      const stages = gsap.utils.toArray<HTMLElement>("[data-stage]", list).map((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 62%",
          invalidateOnRefresh: true,
          onToggle(self) {
            if (!self.isActive || lastPushed.current === i) return;
            lastPushed.current = i;
            setActive(i);
          },
        }),
      );

      return () => {
        rail.kill();
        stages.forEach((t) => t.kill());
      };
    }, list);

    return () => ctx.revert();
  }, [count]);

  /** The index jumps the scroll. Through Lenis, which owns it: a bare
   *  `window.scrollTo` is glided straight back. The offset lands the stage
   *  across the middle of the screen, which is where its own trigger reads. */
  const jump = (i: number) => {
    const el = listRef.current?.querySelectorAll<HTMLElement>("[data-stage]")[i];
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -Math.round(window.innerHeight * 0.28) });
    else el.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          {/* ------------------------------------------------- the survey ---
              Sticky in both layouts: at the top of the viewport on small
              screens, beside the stages on large ones. */}
          <div className="sticky top-20 z-10 -mx-6 mb-8 bg-void/90 px-6 py-4 backdrop-blur-sm sm:-mx-10 sm:px-10 lg:top-28 lg:z-0 lg:mx-0 lg:mb-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 p-5 sm:p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative">
                <Plan stage={active} reduced={reduced} />
              </div>
            </div>

            {/* THE INDEX. All nine names on screen at every scroll position,
                which is what a nine-stage run owes the reader, and a control
                that jumps to any of them. Desktop only: on a phone this panel
                is already sharing the viewport with the list it indexes. */}
            <ul className="mt-5 hidden gap-x-6 gap-y-1 lg:grid lg:grid-cols-2">
              {items.map((area, i) => {
                const on = i === active;
                return (
                  <li key={area.no}>
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "group/x flex w-full items-baseline gap-2.5 rounded py-1 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none",
                        on ? "text-brand" : "text-ash hover:text-fog",
                      )}
                    >
                      <span className="font-display shrink-0 text-[0.6875rem] font-bold tabular-nums">
                        {area.no}
                      </span>
                      <span className="font-display text-[0.6875rem] font-bold uppercase leading-tight">
                        {area.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Where it is in the run. The stage's own name is in the list, so
                the rail carries no words of its own. */}
            <div className="mt-5 flex items-center gap-4 lg:hidden">
              <span aria-hidden className="relative h-px flex-1 overflow-hidden bg-line">
                <span
                  className="absolute inset-y-0 left-0 w-full origin-left bg-brand transition-transform duration-500 motion-reduce:transition-none"
                  style={{ transform: `scaleX(${(active + 1) / count})` }}
                />
              </span>
              <span
                aria-hidden
                className="font-display shrink-0 text-[0.6875rem] font-bold tabular-nums text-ash"
              >
                {active + 1}
                <span className="text-line"> / {count}</span>
              </span>
            </div>
          </div>

          {/* -------------------------------------------------- the areas --- */}
          <ol ref={listRef} className="relative lg:pl-12">
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-px bg-line lg:block"
            >
              <span
                ref={railRef}
                className="absolute inset-0 origin-top bg-brand"
                style={{ transform: "scaleY(0)" }}
              />
            </span>

            {items.map((area, i) => {
              const on = i === active;
              return (
                <li
                  key={area.no}
                  data-stage={area.no}
                  className="relative flex flex-col justify-center py-10 lg:min-h-[46vh] lg:py-0"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-12 hidden h-2.5 w-2.5 rounded-full border-2 transition-colors duration-500 motion-reduce:transition-none lg:block",
                      on ? "border-brand bg-brand" : "border-line bg-void",
                    )}
                    style={{ top: "calc(50% - 0.3125rem)", marginLeft: "-0.3125rem" }}
                  />

                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "font-display block text-[clamp(1.5rem,3.4vw,2.5rem)] font-extrabold uppercase leading-none transition-colors duration-500 motion-reduce:transition-none",
                        on ? "text-brand" : "text-snow/[0.14]",
                      )}
                    >
                      {area.no}
                    </span>
                    <h3
                      className={cn(
                        "font-display mt-4 text-[clamp(1.35rem,2.8vw,2.1rem)] font-extrabold uppercase leading-[1.1] transition-colors duration-500 motion-reduce:transition-none",
                        on ? "text-snow" : "text-fog",
                      )}
                    >
                      {area.title}
                    </h3>

                    {area.lead && (
                      <p className="mt-5 max-w-xl leading-relaxed text-fog sm:text-lg">
                        <Marked
                          text={area.lead}
                          mark={area.leadMark}
                          className="font-semibold text-snow"
                        />
                      </p>
                    )}

                    {area.items && <Register stem={area.stem} items={area.items} />}

                    {area.tail && (
                      <p className="mt-5 max-w-xl leading-relaxed text-fog">
                        <Marked
                          text={area.tail}
                          mark={area.tailMark}
                          className="font-semibold text-snow"
                        />
                      </p>
                    )}

                    {area.may && (
                      <div className="mt-6 border-t border-line pt-5">
                        <Register stem={area.mayStem} items={area.may} open />
                        {area.mayTail && (
                          <p className="mt-3 text-sm leading-relaxed text-ash">{area.mayTail}</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

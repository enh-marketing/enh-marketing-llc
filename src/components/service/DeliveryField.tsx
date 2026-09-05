"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Marked } from "@/components/service/Marked";
import { Crosslink } from "@/components/ui/Crosslink";
import { cn } from "@/lib/cn";

/** Paid and organic, drawn as two different ways of reaching a field of people.
 *
 *  WHY ONE CANVAS AND NOT THREE BLOCKS OF TEXT. This section makes three claims
 *  and attaches a boundary to each: organic posting reaches people who already
 *  follow or encounter the Page; paid distributes selected content to a defined
 *  audience for a budget; tracking improves the information available but does
 *  not create perfect attribution. Set as paragraphs those read as three
 *  unrelated notes. They are three states of the same thing -- one Page, one
 *  audience -- so the section is one field that changes as the reader moves
 *  down it, and the change is the argument.
 *
 *  WHAT EACH STATE DRAWS, AND WHERE IT COMES FROM. Organic lights the people
 *  already gathered around the Page and nothing else, because that is the reach
 *  the sentence describes. Paid lights a region away from the Page, joined to it
 *  by a budget, because paid "distributes selected content to a defined
 *  audience". Tracking draws the returns back from that region, and some of them
 *  do not arrive, because the document says attribution is not perfect across
 *  every device, browser and customer journey. Nothing is counted: the dots are
 *  a texture, every cluster is the same size, and no state carries a figure.
 *
 *  THE WARNING IS TETHERED TO ITS OBJECTIVE. The document names six objectives
 *  and then warns about exactly one of them, so a bracket rises from that
 *  objective to the warning instead of the warning floating under all six. The
 *  position is found from the copy, not written in here.
 *
 *  RESPONSIVE. Below the large breakpoint the sticky canvas would be a stack of
 *  the desktop layout, so it is not used: each block carries its own compact
 *  state of the same drawing directly above its copy, which is the same
 *  argument at reading width. */

type State = "organic" | "paid" | "tracking";

/** The field. Deterministic, not random: a reader scrolling back sees the same
 *  people in the same places. */
const COLS = 9;
const ROWS = 7;
const DOTS: { x: number; y: number }[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let cIdx = 0; cIdx < COLS; cIdx++) {
    // A fixed, repeatable jitter so the field reads as people rather than as a
    // spreadsheet, without a random number anywhere near the render.
    const j = ((r * COLS + cIdx) * 37) % 11;
    DOTS.push({ x: 150 + cIdx * 34 + (j - 5), y: 60 + r * 40 + ((j * 3) % 9) - 4 });
  }
}
/** The people already around the Page: everything inside this radius of it. */
const PAGE = { x: 96, y: 190 };
const NEAR = 96;
/** The defined audience: a region chosen away from the Page. */
const REGION = { x: 288, y: 122, w: 154, h: 168 };

function inRegion(d: { x: number; y: number }) {
  return (
    d.x >= REGION.x && d.x <= REGION.x + REGION.w && d.y >= REGION.y && d.y <= REGION.y + REGION.h
  );
}
function near(d: { x: number; y: number }) {
  return Math.hypot(d.x - PAGE.x, d.y - PAGE.y) < NEAR;
}

function Field({ state, compact = false }: { state: State; compact?: boolean }) {
  const label =
    state === "organic"
      ? "A page with the people already around it lit, and the rest of the field dark."
      : state === "paid"
        ? "A selected region of the field lit, joined to the page by an allocated budget."
        : "Returns coming back from the lit region, some of them arriving and some breaking on the way.";

  return (
    <svg
      viewBox="0 0 470 380"
      role="img"
      aria-label={label}
      className={cn("block w-full", compact && "max-h-64")}
    >
      {/* The Page. */}
      <g>
        <rect
          x={PAGE.x - 26}
          y={PAGE.y - 30}
          width="52"
          height="60"
          rx="8"
          className="fill-ink-2 stroke-brand"
          strokeWidth="1.8"
        />
        <rect x={PAGE.x - 15} y={PAGE.y - 18} width="30" height="5" rx="2.5" className="fill-brand" />
        <rect x={PAGE.x - 15} y={PAGE.y - 6} width="20" height="4" rx="2" className="fill-fog/40" />
        <rect x={PAGE.x - 15} y={PAGE.y + 3} width="26" height="4" rx="2" className="fill-fog/30" />
        <rect x={PAGE.x - 15} y={PAGE.y + 12} width="16" height="4" rx="2" className="fill-fog/20" />
      </g>

      {/* Normal platform activity: the ring the organic sentence describes. */}
      <circle
        cx={PAGE.x}
        cy={PAGE.y}
        r={NEAR}
        fill="none"
        className={cn(
          "stroke-brand transition-opacity duration-700 motion-reduce:transition-none",
          state === "organic" ? "opacity-40" : "opacity-0",
        )}
        strokeWidth="1.2"
        strokeDasharray="4 7"
      />

      {/* The defined audience. */}
      <rect
        x={REGION.x}
        y={REGION.y}
        width={REGION.w}
        height={REGION.h}
        rx="12"
        className={cn(
          "fill-brand/[0.07] stroke-brand transition-opacity duration-700 motion-reduce:transition-none",
          state === "organic" ? "opacity-0" : "opacity-100",
        )}
        strokeWidth="1.6"
      />

      {/* The people. */}
      {DOTS.map((d, i) => {
        const lit = state === "organic" ? near(d) : inRegion(d);
        return (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={lit ? 4.2 : 2.6}
            className={cn(
              "transition-all duration-500 motion-reduce:transition-none",
              lit ? "fill-brand" : "fill-ash/45",
            )}
            style={{ transitionDelay: (i % 13) * 18 + "ms" }}
          />
        );
      })}

      {/* The budget: what carries selected content out to the region. */}
      <g
        className={cn(
          "transition-opacity duration-700 motion-reduce:transition-none",
          state === "organic" ? "opacity-0" : "opacity-100",
        )}
      >
        <path
          d={"M" + (PAGE.x + 28) + " " + PAGE.y + "C170 " + PAGE.y + " 200 206 " + REGION.x + " 206"}
          fill="none"
          className="stroke-brand"
          strokeWidth="2"
        />
        <rect x="112" y="330" width="230" height="10" rx="5" className="fill-line" />
        <rect
          x="112"
          y="330"
          width={state === "organic" ? 0 : 230}
          height="10"
          rx="5"
          className="fill-brand transition-all duration-700 ease-out motion-reduce:transition-none"
        />
      </g>

      {/* The returns, and the ones that do not arrive. */}
      <g
        className={cn(
          "transition-opacity duration-700 motion-reduce:transition-none",
          state === "tracking" ? "opacity-100" : "opacity-0",
        )}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const y = REGION.y + 22 + i * 32;
          const arrives = i % 2 === 0;
          return (
            <path
              key={i}
              d={
                arrives
                  ? "M" + REGION.x + " " + y + "C240 " + y + " 170 " + (PAGE.y + 44) + " " + (PAGE.x + 4) + " " + (PAGE.y + 44)
                  : "M" + REGION.x + " " + y + "C258 " + y + " 236 " + (y + 14) + " 224 " + (y + 16)
              }
              fill="none"
              className={arrives ? "stroke-brand" : "stroke-ash"}
              strokeWidth="1.5"
              strokeDasharray={arrives ? "0" : "5 6"}
              strokeLinecap="round"
            />
          );
        })}
        <circle cx={PAGE.x + 4} cy={PAGE.y + 44} r="5" className="fill-brand" />
      </g>
    </svg>
  );
}

/** One scroll block, which owns a state of the field. */
function Block({
  state,
  onEnter,
  active,
  children,
}: {
  state: State;
  onEnter: (s: State) => void;
  active: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) onEnter(state);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [state, onEnter]);

  return (
    <div ref={ref} className="py-8 first:pt-0 last:pb-0">
      {/* Below the sticky breakpoint each block carries its own state of the
          field, so the argument survives at reading width. */}
      <div className="mb-7 rounded-2xl border border-line bg-ink-3 p-3 lg:hidden">
        <Field state={state} compact />
      </div>
      <div
        className={cn(
          "border-l-2 pl-6 transition-colors duration-500 motion-reduce:transition-none lg:pl-8",
          active ? "border-brand" : "border-line",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DeliveryField({
  organic,
  paid,
  scope,
  objectivesLead,
  objectives,
  objectivesRule,
  objectivesWarning,
  objectivesWarningMark,
  tracking,
  trackingCaveat,
  referenceLead,
  referenceLabel,
  referenceHref,
  referenceTail,
}: {
  organic: string;
  paid: string;
  scope: string;
  objectivesLead: string;
  objectives: string[];
  objectivesRule: string;
  objectivesWarning: string;
  /** The part of the warning that says what goes wrong. */
  objectivesWarningMark: string;
  tracking: string;
  trackingCaveat: string;
  referenceLead: string;
  referenceLabel: string;
  referenceHref: string;
  referenceTail: string;
}) {
  const [state, setState] = useState<State>("organic");

  /** The objective the warning is about, found in the copy rather than fixed
   *  here: if the document's list changes, the bracket follows it. */
  const warned = objectives.findIndex((o) => objectivesWarning.toLowerCase().includes(o));
  const warnedAt = warned < 0 ? -1 : ((warned + 0.5) / objectives.length) * 100;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-16">
      <div>
        <Block state="organic" active={state === "organic"} onEnter={setState}>
          <p className="statement font-display font-extrabold uppercase leading-[1.16] text-snow">
            {organic}
          </p>
        </Block>

        <Block state="paid" active={state === "paid"} onEnter={setState}>
          <p className="statement font-display font-extrabold uppercase leading-[1.16] text-snow">
            {paid}
          </p>
          <p className="mt-6 leading-relaxed text-fog">{scope}</p>

          <p className="mt-10 text-xs font-semibold uppercase text-brand-text">{objectivesLead}</p>
          {/* One row only where a row of six still leaves room to read them.
              Below that the objectives wrap, and the bracket goes with them:
              it points at a position in a single row and means nothing once the
              row breaks. */}
          <ol
            className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:[grid-template-columns:repeat(var(--obj-cols),minmax(0,1fr))]"
            style={{ "--obj-cols": objectives.length } as React.CSSProperties}
          >
            {objectives.map((o, i) => (
              <li
                key={o}
                className={cn(
                  "font-display flex min-w-0 items-center justify-center px-1 py-4 text-center text-[0.68rem] font-bold uppercase leading-tight transition-colors duration-400 motion-reduce:transition-none",
                  i === warned ? "bg-brand/[0.12] text-brand" : "bg-ink-3 text-snow",
                )}
              >
                {o}
              </li>
            ))}
          </ol>

          {/* The bracket that ties the one warned objective to its warning. */}
          {warnedAt >= 0 && (
            <div aria-hidden className="relative hidden h-9 lg:block">
              <svg
                viewBox="0 0 100 36"
                preserveAspectRatio="none"
                className="h-full w-full text-brand"
              >
                <path
                  d={"M" + warnedAt.toFixed(2) + " 0V22H4V36"}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          )}

          <p className="font-display mt-7 text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.16] text-snow lg:mt-0">
            {objectivesRule}
          </p>
          <p className="mt-4 flex gap-3 rounded-xl border border-brand/40 bg-brand/[0.05] px-5 py-4 text-sm leading-relaxed text-fog">
            <span aria-hidden className="mt-0.5 shrink-0 text-brand">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
              </svg>
            </span>
            <span>
              <Marked text={objectivesWarning} mark={objectivesWarningMark} />
            </span>
          </p>
        </Block>

        <Block state="tracking" active={state === "tracking"} onEnter={setState}>
          <p className="statement font-display font-extrabold uppercase leading-[1.16] text-snow">
            {tracking}
          </p>
          {/* The limit travels with the claim it limits. */}
          <p className="mt-6 leading-relaxed text-fog">{trackingCaveat}</p>
          <p className="mt-8 flex flex-wrap items-baseline gap-x-1.5 leading-relaxed text-fog">
            <span>{referenceLead}</span>
            <Crosslink href={referenceHref}>{referenceLabel}</Crosslink>
            <span>{referenceTail}</span>
          </p>
        </Block>
      </div>

      {/* The field, held while the copy moves past it. */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-line bg-ink-3 p-5">
          <Field state={state} />
        </div>
      </div>
    </div>
  );
}

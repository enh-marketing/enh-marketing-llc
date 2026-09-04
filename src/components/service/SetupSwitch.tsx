"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The setup question, asked of the reader rather than answered at them.
 *
 *  WHAT THIS SECTION IS FOR. Not "here are three kinds of client". The document
 *  is telling a reader what Google will accept from a business shaped like
 *  theirs: a storefront uses "its genuine public location and accurate
 *  customer-facing hours"; a service-area business "may define the areas it
 *  serves without displaying a residential or unstaffed address", gets "one
 *  profile for the central location", and is told plainly that Google "does not
 *  treat virtual offices as genuine operating locations"; a multi-location
 *  business gets a profile per branch, but only where the branch has "a real
 *  operating presence". Three entitlements, and exactly one of them is the
 *  reader's.
 *
 *  SO THE READER PICKS. This is the one place on the page where the section
 *  does something to the visitor instead of the other way round: three choices
 *  on a rule, one stage, and the stage answers with what that setup is actually
 *  entitled to. Everything else on this page is read; this is used.
 *
 *  THE STAGE DRAWS PROFILES, NOT BUILDINGS. What changes between the three
 *  models is not the architecture, it is the Business Profile you end up
 *  holding: one with a real address on it, one with the address withheld and an
 *  area in its place, or one per branch with their names and categories kept in
 *  agreement. So the diagram is a profile card with nothing written on it -- a
 *  pin, a name, a category, an address -- and each model adds the one thing its
 *  own paragraph is about: a week of customer-facing hours, an area that
 *  spreads out from a withheld address, or two more branches under a tie.
 *
 *  THE ELIGIBILITY CLAUSE IS MARKED IN PLACE. Each paragraph carries one phrase
 *  that decides whether the setup is allowed at all, and it is coloured where it
 *  stands rather than pulled out and paraphrased. The words are the document's.
 *
 *  ALL THREE PANELS ARE IN THE PAGE. Only one is shown, but the other two are
 *  in the markup rather than built on click, so nothing the client wrote depends
 *  on a visitor pressing something.
 *
 *  MOTION. The indicator grows along the rule under the chosen name, and the
 *  stage lifts as it arrives. Both are transforms. The panel that renders first
 *  is never at zero opacity, so a reader with no JavaScript, or with the clock
 *  stopped, gets a complete first setup rather than a blank stage. */

/** Bar widths for the profile skeleton, per branch, so three cards read as
 *  three real listings rather than one card copied. Names and categories are
 *  deliberately identical across branches: that is the consistency the document
 *  asks for. Addresses differ, because the branches are in different places. */
const ADDRESS_W = ["86%", "72%", "92%"];

/** A week of customer-facing hours: where each day opens and closes, as a
 *  fraction of the strip. No day is named and no time is given -- the drawing
 *  states that the hours are set, never what they are. */
const WEEK = [
  { from: 0.18, to: 0.82 },
  { from: 0.18, to: 0.82 },
  { from: 0.18, to: 0.86 },
  { from: 0.18, to: 0.86 },
  { from: 0.14, to: 0.9 },
  { from: 0.3, to: 0.9 },
  { from: 0.44, to: 0.66 },
];

/** The areas a service-area business covers, as capsules of unequal width laid
 *  inside the boundary it has defined. Widths are column spans out of twelve
 *  rather than free percentages: wrapping by measured width left every row
 *  ending short of the boundary and one capsule stranded on a line of its own,
 *  where a bed of twelve fills each row exactly at any size. The unevenness
 *  between capsules is the point; service areas are not tidy. */
const AREAS = ["col-span-5", "col-span-3", "col-span-4", "col-span-4", "col-span-5", "col-span-3", "col-span-7", "col-span-5"];

function PinMark() {
  return (
    <svg viewBox="0 0 16 22" className="h-[18px] w-[13px] shrink-0" fill="none" aria-hidden>
      <path
        d="M8 21c4-6 6.5-9.2 6.5-12.6a6.5 6.5 0 1 0-13 0C1.5 11.8 4 15 8 21Z"
        fill="var(--color-brand)"
        stroke="var(--color-brand)"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="8.2" r="2.3" fill="var(--color-ink-3)" />
    </svg>
  );
}

/** One Business Profile, with nothing written on it. `withheld` is the
 *  service-area case: the address line is present but not shown to customers,
 *  which is the whole of what that model is allowed to do. */
function ProfileCard({
  addressWidth = "88%",
  withheld = false,
  className,
}: {
  addressWidth?: string;
  withheld?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("rounded-xl border border-line bg-ink-3 px-5 py-5", className)}
    >
      <div className="flex items-center gap-2.5">
        <PinMark />
        <span className="block h-2.5 flex-1 rounded-full bg-snow/25" />
      </div>
      <span className="mt-4 block h-1.5 w-3/5 rounded-full bg-line" />
      <div className="relative mt-3">
        <span
          className={cn("block h-1.5 rounded-full", withheld ? "bg-line" : "bg-brand")}
          style={{ width: addressWidth }}
        />
        {withheld && (
          <span
            className="absolute left-0 top-1/2 block h-px -translate-y-1/2 rotate-[-5deg] bg-brand"
            style={{ width: addressWidth }}
          />
        )}
      </div>
    </div>
  );
}

/** 01 A storefront: one profile on a real address, and the week a customer can
 *  turn up in. */
function StorefrontStage() {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-stretch">
      <ProfileCard className="w-full shrink-0 sm:w-[228px]" />
      <div aria-hidden className="flex min-w-0 flex-1 flex-col justify-end">
        <div className="flex h-[118px] items-stretch gap-2 sm:gap-3">
          {WEEK.map((d, i) => (
            <div key={i} className="relative min-w-0 flex-1 rounded-md bg-line/40">
              <span
                className="absolute inset-x-0 rounded-md bg-brand/70"
                style={{ top: `${d.from * 100}%`, bottom: `${(1 - d.to) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <span className="mt-3 block h-px w-full bg-line" />
      </div>
    </div>
  );
}

/** 02 A service-area business: one profile at the central location with the
 *  address withheld, and the reach it has defined in its place. The boundary is
 *  drawn rather than described, and nothing inside it is named, because the
 *  document names no areas. */
function ServiceAreaStage() {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-stretch">
      <ProfileCard className="w-full shrink-0 sm:w-[228px]" withheld addressWidth="82%" />
      <div
        aria-hidden
        className="relative grid min-h-[132px] min-w-0 flex-1 grid-cols-12 content-center gap-2.5 rounded-2xl border border-dashed border-brand/45 px-5 py-5"
      >
        {/* The central location the profile is registered at, sitting on the
            boundary rather than inside it. */}
        <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-3 p-1.5">
          <PinMark />
        </span>
        {AREAS.map((span, i) => (
          <span
            key={i}
            className={cn("block h-6 rounded-full border border-brand/40 bg-brand/[0.09]", span)}
          />
        ))}
      </div>
    </div>
  );
}

/** 03 Multi-location: one profile per branch that genuinely operates, under a
 *  tie that keeps their names and categories in agreement.
 *
 *  The tie is built on the card grid's own arithmetic rather than on a stretched
 *  viewBox. A single SVG scaled to the width put its drops eight pixels off each
 *  card's centre, because the gap between cards is a fixed 24px while the
 *  columns are fluid; `(100% - 2 * gap) / 6` is half a column, which is exactly
 *  where a card's centre falls at every width. */
function MultiLocationStage() {
  return (
    <div aria-hidden className="relative">
      {/* Desktop only: stacked, there is nothing running across to tie. */}
      <div className="relative hidden h-9 sm:block">
        <span
          className="absolute top-2 h-px bg-brand/65"
          style={{ left: "calc((100% - 3rem) / 6)", right: "calc((100% - 3rem) / 6)" }}
        />
        <div className="grid h-full grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <span key={i} className="relative">
              <span className="absolute left-1/2 top-2 h-7 w-px -translate-x-1/2 bg-brand/65" />
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        {ADDRESS_W.map((w, i) => (
          <ProfileCard key={i} addressWidth={w} />
        ))}
      </div>
    </div>
  );
}

const STAGES = [StorefrontStage, ServiceAreaStage, MultiLocationStage];

/** The eligibility clause, coloured where it stands. */
function Marked({ text, mark }: { text: string; mark?: string }) {
  const at = mark ? text.indexOf(mark) : -1;
  if (at < 0 || !mark) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="font-semibold text-brand">{mark}</span>
      {text.slice(at + mark.length)}
    </>
  );
}

export function SetupSwitch({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  models,
  warningClaim,
  warningRisk,
  riskMark,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  models: { name: string; body: string; mark?: string }[];
  warningClaim: string;
  warningRisk: string;
  riskMark: string;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const warn = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(stage, { once: true, margin: "-80px" });
  const warnIn = useInView(warn, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "Three ways to be a local business" }}
          className="mb-12"
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">{lead}</p>
            </Rise>
          }
        />

        {/* The question, as three answers on one rule. */}
        <div role="tablist" aria-label={label} className="grid border-t border-line sm:grid-cols-3">
          {models.map((m, i) => {
            const on = active === i;
            return (
              <button
                key={m.name}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`${id}-panel-${i}`}
                id={`${id}-tab-${i}`}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative flex items-baseline gap-4 border-b border-line py-5 text-left outline-none sm:border-b-0 sm:border-l sm:border-line sm:px-7 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0",
                  on ? "cursor-default" : "cursor-pointer",
                )}
              >
                {/* The indicator, growing along the rule under the chosen
                    name. Transform only. */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -top-px left-0 right-0 h-0.5 origin-left bg-brand transition-transform duration-500 ease-out motion-reduce:transition-none",
                    on ? "scale-x-100" : "scale-x-0",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "font-display text-[0.6875rem] font-bold tabular-nums transition-colors duration-300",
                    on ? "text-brand" : "text-brand/35",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-display text-[clamp(1rem,1.7vw,1.22rem)] font-extrabold uppercase leading-[1.15] transition-colors duration-300",
                    on ? "text-brand" : "text-snow group-hover:text-brand/70",
                  )}
                >
                  {m.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* The answer. */}
        <motion.div
          ref={stage}
          initial={reduced ? false : { y: 22 }}
          animate={reduced || inView ? { y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-8 rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 sm:p-10"
        >
          {models.map((m, i) => {
            const Stage = STAGES[i] ?? STAGES[STAGES.length - 1];
            return (
              <div
                key={m.name}
                id={`${id}-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`${id}-tab-${i}`}
                hidden={active !== i}
              >
                <motion.div
                  initial={false}
                  animate={active === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Stage />
                  <p className="mt-9 max-w-4xl border-t border-line pt-8 text-[clamp(1.02rem,1.9vw,1.3rem)] leading-relaxed text-snow">
                    <Marked text={m.body} mark={m.mark} />
                  </p>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Whichever setup the reader picked, this is the same. */}
        <div ref={warn} className="mt-14">
          <div
            aria-hidden
            className="h-2.5 w-full rounded-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, color-mix(in srgb, var(--color-brand) 60%, transparent) 0 7px, transparent 7px 14px)",
            }}
          />
          <motion.p
            initial={reduced ? false : { y: 18 }}
            animate={reduced || warnIn ? { y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-display mt-8 max-w-5xl statement font-extrabold uppercase leading-[1.08] text-snow"
          >
            <Marked text={warningRisk} mark={riskMark} />
          </motion.p>
          <motion.p
            initial={reduced ? false : { y: 18 }}
            animate={reduced || warnIn ? { y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-7 max-w-2xl border-l-2 border-brand pl-5 leading-relaxed text-fog"
          >
            {warningClaim}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { MarkedKeys } from "@/components/service/MarkedKeys";
import { cn } from "@/lib/cn";

/** "How Does Healthcare Digital Marketing Generate Patient Enquiries?" — the
 *  opening.
 *
 *  THE SECTION'S ONE PICTURE IS THE CLIENT'S FOUR NOUNS. "reach people while
 *  they are researching symptoms, treatments, specialists and nearby providers"
 *  is the only sentence in the document that says WHEN a patient is reached,
 *  and the four are four different kinds of thing in an order the client chose:
 *  a symptom is a question, a treatment is an answer, a specialist is a person
 *  and a nearby provider is a place. Four different kinds of thing can be drawn
 *  as four different marks, which is why this run needs no captions: the
 *  sentence directly above it names all four, in brand, in the same
 *  left-to-right order the run puts them in. A drawing whose key is the
 *  paragraph above it has no key to learn.
 *
 *  THE SENTENCE IS THE DRAWING'S CONTROL. Each of the four nouns is a button
 *  in place, and pointing at one lights its stop and quiets the other three.
 *  That is the honest control here: the reader is already reading the sentence,
 *  the drawing has no captions of its own, and a row of dots under the run
 *  would be a second key to learn. With no pointer, no keyboard and no
 *  JavaScript the run rests with all four stops lit, which is the sentence's
 *  own claim -- people are researching all four.
 *
 *  THE RUN STOPS BEFORE THE PROVIDER IS CONTACTED. Its tail is dashed and open
 *  because the sentence under it ends "before contacting a provider". Drawing
 *  an arrival would put an enquiry in a section that is about the research that
 *  precedes one.
 *
 *  NOTHING IS COUNTED AND NOTHING IS SPACED TO MEAN ANYTHING. Four stops
 *  because the client names four subjects; the gaps between them are equal
 *  because the document gives no duration, no sequence length and no drop-off
 *  between one and the next.
 *
 *  TWO ORIENTATIONS, ONE SET OF MARKS. Compressed into a phone's width a
 *  960-unit run puts each mark at about nine pixels, so below `sm` the same
 *  four marks stand on a vertical spine instead. Same drawing, same order, same
 *  open end; only the axis changes.
 *
 *  ONE PARAGRAPH IS SET OUT OF THE DOCUMENT'S ORDER, AND ONLY ONE. The client
 *  writes the section as reach, then what the work joins, then how a campaign
 *  is organised, then the figures. The third of those -- "we structure
 *  healthcare campaigns around the services patients need and the information
 *  they look for before contacting a provider" -- is the caption of the run
 *  above it, ends on the exact clause the run's open tail draws, and reads as a
 *  footnote anywhere else. So it sits inside the run's frame and the other
 *  three paragraphs keep their order. No word of any of them is changed.
 *
 *  WHY THE CHANNELS ARE NOT MARKED AND THE ACTIONS ARE. The client's second
 *  sentence joins five things this agency does to three things a patient does.
 *  The heading above asks how patient enquiries are generated, so the enquiries
 *  are the subject and they carry the colour; marking all eight would flatten
 *  the sentence into one list of eight and answer nobody's question. */

const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";

/** One research subject, drawn. Each takes the point on the spine it stands on
 *  and draws itself above (horizontal run) or beside it (vertical run). */
function Mark({ kind, x, y }: { kind: 0 | 1 | 2 | 3; x: number; y: number }) {
  if (kind === 0) {
    // A question being asked: a field with something typed in it, no answer yet.
    return (
      <g stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.75" fill="none">
        <rect x={x - 56} y={y - 18} width="112" height="36" rx="18" />
        <circle cx={x - 34} cy={y} r="7" />
        <path d={`M${x - 29} ${y + 5} L${x - 23} ${y + 11}`} strokeLinecap="round" />
        <path d={`M${x - 12} ${y - 4} H${x + 40}`} strokeLinecap="round" strokeOpacity="0.5" />
        <path d={`M${x - 12} ${y + 5} H${x + 22}`} strokeLinecap="round" strokeOpacity="0.28" />
      </g>
    );
  }
  if (kind === 1) {
    // An answer, written down: the treatment page.
    return (
      <g stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.75" fill="none">
        <rect x={x - 40} y={y - 26} width="80" height="52" rx="5" />
        <rect
          x={x - 28}
          y={y - 16}
          width="34"
          height="8"
          rx="2"
          fill="currentColor"
          fillOpacity="0.45"
          stroke="none"
        />
        <path d={`M${x - 28} ${y + 1} H${x + 28}`} strokeLinecap="round" strokeOpacity="0.5" />
        <path d={`M${x - 28} ${y + 10} H${x + 16}`} strokeLinecap="round" strokeOpacity="0.5" />
        <path d={`M${x - 28} ${y + 19} H${x + 24}`} strokeLinecap="round" strokeOpacity="0.28" />
      </g>
    );
  }
  if (kind === 2) {
    // A person.
    return (
      <g stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.75" fill="none">
        <circle cx={x} cy={y - 14} r="11" />
        <path d={`M${x - 24} ${y + 24} Q${x} ${y - 4} ${x + 24} ${y + 24}`} strokeLinecap="round" />
        <path d={`M${x - 24} ${y + 24} H${x + 24}`} strokeLinecap="round" strokeOpacity="0.3" />
      </g>
    );
  }
  // A place, on the ground.
  return (
    <g stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.75" fill="none">
      <path
        d={`M${x} ${y + 20} L${x - 13} ${y - 2} A13 13 0 1 1 ${x + 13} ${y - 2} Z`}
        strokeLinejoin="round"
      />
      <circle cx={x} cy={y - 8} r="4.5" fill="currentColor" fillOpacity="0.6" stroke="none" />
      <path d={`M${x - 30} ${y + 26} H${x + 30}`} strokeLinecap="round" strokeOpacity="0.35" />
    </g>
  );
}

/** The stop's own node on the spine, with the reading that walks the four.
 *  `last` carries `data-first-tick`, so stopped the reader rests on the fourth
 *  subject — which is where the client's sentence leaves them. */
function Node({ x, y, i, last }: { x: number; y: number; i: number; last: boolean }) {
  return (
    <g {...(last ? { "data-first-tick": "" } : {})}>
      <circle cx={x} cy={y} r="6" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
      <circle
        cx={x}
        cy={y}
        r="3.4"
        className="ci-blink fill-brand"
        style={{ animationDelay: `${i * 1500}ms` }}
      />
    </g>
  );
}

const KINDS = [0, 1, 2, 3] as const;

/** One stop's own lever: everything inside the group reads currentColor. With
 *  nothing picked all four are lit equally, which is what the sentence says. */
function stop(active: number | null, i: number) {
  const on = active === i;
  const off = active !== null && !on;
  return cn(
    "transition-[color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
    on ? "text-brand opacity-100" : off ? "text-ash opacity-35" : "text-ash opacity-100",
  );
}

export function PatientResearch({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  subjects,
  structure,
  dimensions,
  actions,
  outcomes,
  figures,
  figuresMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  /** The four research subjects, in the client's order. They are the run's
   *  four stops and, as buttons in the sentence, its control. */
  subjects: readonly string[];
  /** Set inside the run's own frame: it is the caption the drawing was read
   *  from, and it ends "before contacting a provider", which is where the run
   *  stops. */
  structure: string;
  dimensions: readonly string[];
  actions: string;
  /** What the patient does. Marked; the five channels are not — see above. */
  outcomes: readonly string[];
  figures: string;
  figuresMark: string[];
}) {
  const [active, setActive] = useState<number | null>(null);

  const HX = [148, 388, 628, 868];
  const HY = 150;
  const VY = [92, 246, 400, 554];
  const VX = 104;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="statement text-balance text-snow">
              <MarkedKeys
                text={lead}
                keys={subjects}
                active={active}
                onPick={setActive}
                className="text-brand-text"
                activeClassName="text-brand"
              />
            </p>
          }
          className="mb-14"
        />

        {/* THE RESEARCH RUN. Four stops, one open end. */}
        <Rise>
          <div className="rounded-[1.25rem] border border-line bg-ink-2 p-5 sm:p-8">
            {/* Horizontal, from `sm` up. */}
            <svg
              viewBox="0 0 1000 210"
              aria-hidden
              className="hidden h-auto w-full sm:block"
              fill="none"
            >
              {/* The spine, at its own width so it reads as ground rather than
                  as a series on a chart. */}
              <path d="M48 150 H906" stroke={ASH} strokeWidth="10" strokeOpacity="0.10" strokeLinecap="round" />
              <path d="M48 150 H906" stroke={ASH} strokeWidth="1.3" strokeOpacity="0.55" strokeLinecap="round" />
              <path
                d="M48 150 H906"
                pathLength="100"
                stroke={BRAND}
                strokeWidth="2.2"
                strokeLinecap="round"
                className="ci-flow"
              />
              {/* Open end: the research is still running when the sentence
                  stops, "before contacting a provider". */}
              <path
                d="M906 150 H968"
                stroke={ASH}
                strokeWidth="1.3"
                strokeOpacity="0.4"
                strokeDasharray="4 7"
                strokeLinecap="round"
              />

              {KINDS.map((k, i) => (
                <g key={k} className={stop(active, i)}>
                  <path
                    d={`M${HX[i]} 150 V116`}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    strokeDasharray="3 5"
                  />
                  <Mark kind={k} x={HX[i]} y={72} />
                  <Node x={HX[i]} y={HY} i={i} last={i === KINDS.length - 1} />
                </g>
              ))}
            </svg>

            {/* Vertical, below `sm`. Same four marks in the same order. */}
            <svg
              viewBox="0 0 210 640"
              aria-hidden
              className="mx-auto block h-auto w-full max-w-[280px] sm:hidden"
              fill="none"
            >
              <path d="M40 60 V586" stroke={ASH} strokeWidth="10" strokeOpacity="0.10" strokeLinecap="round" />
              <path d="M40 60 V586" stroke={ASH} strokeWidth="1.3" strokeOpacity="0.55" strokeLinecap="round" />
              <path
                d="M40 60 V586"
                pathLength="100"
                stroke={BRAND}
                strokeWidth="2.2"
                strokeLinecap="round"
                className="ci-flow"
              />
              <path
                d="M40 586 V626"
                stroke={ASH}
                strokeWidth="1.3"
                strokeOpacity="0.4"
                strokeDasharray="4 7"
                strokeLinecap="round"
              />

              {KINDS.map((k, i) => (
                <g key={k} className={stop(active, i)}>
                  <path
                    d={`M40 ${VY[i]} H${VX - 62}`}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    strokeDasharray="3 5"
                  />
                  <Mark kind={k} x={VX + 34} y={VY[i]} />
                  <Node x={40} y={VY[i]} i={i} last={i === KINDS.length - 1} />
                </g>
              ))}
            </svg>

            {/* The sentence the run was read from. */}
            <p className="mt-8 max-w-[74ch] border-t border-line pt-7 text-sm leading-relaxed text-fog sm:text-base">
              <Marked
                text={structure}
                mark={dimensions as string[]}
                className="font-semibold text-snow"
              />
            </p>
          </div>
        </Rise>

        {/* WHAT THE WORK JOINS, AND WHAT IT HAS PRODUCED. Two statements of
            different kinds, on the page's own ground rather than in cells:
            one is a claim about method and the other is a record, and boxing
            them identically would say they are the same kind of sentence. */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Rise>
            <div className="group flex gap-6 sm:gap-8">
              <span
                aria-hidden
                className="mt-2 w-px shrink-0 self-stretch bg-line transition-colors duration-500 group-hover:bg-brand motion-reduce:transition-none"
              />
              <p className="max-w-[52ch] text-[clamp(1.05rem,1.9vw,1.45rem)] leading-[1.5] text-fog transition-colors duration-500 group-hover:text-ash motion-reduce:transition-none">
                <Marked
                  text={actions}
                  mark={outcomes as string[]}
                  className="font-semibold text-brand-text transition-colors duration-500 group-hover:text-brand motion-reduce:transition-none"
                />
              </p>
            </div>
          </Rise>

          <Rise delay={0.12}>
            <div className="group relative overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 p-7 transition-colors duration-500 hover:border-ash/50 hover:bg-ink-3 motion-reduce:transition-none sm:p-8">
              <span
                aria-hidden
                className="ci-blink absolute inset-x-0 top-0 h-[3px] bg-brand"
              />
              <p className="text-sm leading-relaxed text-fog sm:text-base">
                <Marked
                  text={figures}
                  mark={figuresMark}
                  className="font-semibold text-snow transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none"
                />
              </p>
            </div>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

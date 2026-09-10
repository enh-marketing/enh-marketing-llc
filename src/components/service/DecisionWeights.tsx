"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { MarkedKeys } from "@/components/service/MarkedKeys";
import { cn } from "@/lib/cn";

/** "Why Is Healthcare Digital Marketing Different?" — the page's signature
 *  section, because this is where the client explains the difference in their
 *  own words rather than leaving it to be inferred.
 *
 *  FOUR CLAIMS OF FOUR DIFFERENT KINDS, SO FOUR BANDS RATHER THAN FOUR
 *  PARAGRAPHS. What the decision rests on (three properties of the provider).
 *  How many providers are in play (several, held at once). What the website is
 *  forbidden from doing (the only such limit in any industry document on this
 *  site). And what is weighed (five things, named, in the client's order).
 *  Setting all four at one weight would bury the limit, which is the sentence a
 *  healthcare provider is most likely to be reading for.
 *
 *  THE DRAWING IS THE FIVE CONTRIBUTIONS AND NOTHING ELSE. Five members
 *  entering one decision, each carrying a mark for the thing it is — a page, a
 *  person, something said, a place, a slot — in the sentence's own order, with
 *  that sentence set beside them and its five phrases marked where they stand.
 *  The drawing has no captions because the sentence is its caption.
 *
 *  AND THE SENTENCE IS THE DRAWING'S CONTROL. Each of the five phrases is a
 *  button where it stands, and pointing at one lights its member and quiets the
 *  other four. Nothing is lifted out into a list beside the drawing -- that
 *  would print the same five phrases twice -- and nothing is hidden behind the
 *  interaction: with no pointer, no keyboard and no JavaScript all five members
 *  are lit, which is exactly what the sentence claims.
 *
 *  THE FIVE MEMBERS ARE THE SAME LENGTH, AND THAT IS THE POINT. The client
 *  writes that all five "contribute to the decision" and ranks none of them. A
 *  drawing that made one longer would be inventing a weighting, which is both a
 *  quantity nobody can measure by eye and a claim the document does not make.
 *  What differs between them is only the mark at the end, so five equal rules
 *  do not read as one rule printed five times.
 *
 *  AND THAT RULES OUT THE OBVIOUS ANIMATION. The first build grew each member
 *  from nothing on its own delay, which is `ci-grow-x` doing exactly what it is
 *  for -- and five rules at five different lengths on screen at every instant
 *  is a bar chart, however honest the rest state is. What runs now is a packet
 *  along each member: motion that says "contributing" without ever saying "this
 *  much".
 *
 *  THE CHAIN IS SET, NOT RAILED. The client typed "Search -> Research -> Trust
 *  -> Appointment", and the logistics document typed the same four words ending
 *  at "Enquiry". That page drew a rail with three unsynchronised markers on it,
 *  because its own next sentence says the chain is walked several times by
 *  several people. This document says no such thing. Here the chain is type at
 *  display scale, the client's arrows are the joins, and the light walks the
 *  arrows rather than a traveller walking a track — the same four words, a
 *  different claim, a different picture.
 *
 *  ONLY THE LAST WORD IS IN BRAND. "Appointment" is what the four-word chain
 *  arrives at and what the banner sells; colouring all four would say they are
 *  four of a kind, which is what an arrow between them already denies. */

const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";

/** One contribution's terminal mark, drawn at the left end of its member.
 *  Five different kinds of thing, in the order the client's sentence names
 *  them: treatment information, specialist profiles, reviews, locations,
 *  appointment options. */
function Contribution({ kind, x, y }: { kind: 0 | 1 | 2 | 3 | 4; x: number; y: number }) {
  const common = { stroke: "currentColor", strokeWidth: 1.5, strokeOpacity: 0.85, fill: "none" } as const;
  if (kind === 0) {
    return (
      <g {...common}>
        <rect x={x - 12} y={y - 14} width="24" height="28" rx="3" />
        <path d={`M${x - 6} ${y - 6} H${x + 6} M${x - 6} ${y} H${x + 4} M${x - 6} ${y + 6} H${x + 6}`} strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.55" />
      </g>
    );
  }
  if (kind === 1) {
    return (
      <g {...common}>
        <circle cx={x} cy={y - 6} r="6.5" />
        <path d={`M${x - 12} ${y + 13} Q${x} ${y - 1} ${x + 12} ${y + 13}`} strokeLinecap="round" />
      </g>
    );
  }
  if (kind === 2) {
    return (
      <g {...common}>
        <rect x={x - 13} y={y - 12} width="26" height="19" rx="4" />
        <path d={`M${x - 5} ${y + 7} L${x - 3} ${y + 14} L${x + 3} ${y + 7}`} strokeLinejoin="round" />
        <path d={`M${x - 6} ${y - 5} H${x + 6} M${x - 6} ${y} H${x + 2}`} strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.55" />
      </g>
    );
  }
  if (kind === 3) {
    return (
      <g {...common}>
        <path d={`M${x} ${y + 14} L${x - 9} ${y} A9 9 0 1 1 ${x + 9} ${y} Z`} strokeLinejoin="round" />
        <circle cx={x} cy={y - 4} r="3.2" fill="currentColor" fillOpacity="0.7" stroke="none" />
      </g>
    );
  }
  return (
    <g {...common}>
      <rect x={x - 13} y={y - 9} width="26" height="22" rx="3" />
      <path d={`M${x - 7} ${y - 9} V${y - 14} M${x + 7} ${y - 9} V${y - 14}`} strokeLinecap="round" />
      <path d={`M${x - 13} ${y - 2} H${x + 13}`} strokeWidth="1.1" strokeOpacity="0.6" />
      <path d={`M${x - 7} ${y + 5} H${x - 1} M${x + 3} ${y + 5} H${x + 9}`} strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.75" />
    </g>
  );
}

const KINDS = [0, 1, 2, 3, 4] as const;

/** One member's own lever: everything inside the group reads currentColor.
 *  With nothing picked all five are lit, because all five contribute. */
function weight(active: number | null, i: number) {
  const on = active === i;
  const off = active !== null && !on;
  return cn(
    "transition-[color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
    on ? "text-brand opacity-100" : off ? "text-ash opacity-35" : "text-brand opacity-100",
  );
}
/** One row per contribution. Equal spacing, equal length: see above. */
const ROWS = [40, 86, 132, 178, 224];

export function DecisionWeights({
  id,
  label,
  index,
  title,
  strokeTitle,
  basis,
  basisItems,
  shortlist,
  shortlistMark,
  constraint,
  constraintMark,
  contribution,
  contributors,
  journeyStem,
  journey,
  verdict,
  verdictMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  basis: string;
  basisItems: readonly string[];
  shortlist: string;
  shortlistMark: string[];
  constraint: string;
  constraintMark: string[];
  contribution: string;
  /** The five, in the client's order. Marked in place; the drawing beside them
   *  carries one member each and no words. */
  contributors: readonly string[];
  journeyStem: string;
  journey: readonly [string, string, string, string];
  verdict: string;
  verdictMark: string[];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="statement text-balance text-snow">
              <Marked text={basis} mark={basisItems as string[]} className="text-brand" />
            </p>
          }
          className="mb-14"
        />

        {/* WHAT PATIENTS DO, AND WHAT WE ARE NOT ALLOWED TO DO. Two sentences of
            different kinds: one is an observation about readers, the other is a
            rule about the website. The rule takes the brand rule, because it is
            the limit this whole page is written under. */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Rise>
            <div className="group flex gap-6">
              <span
                aria-hidden
                className="mt-2 w-px shrink-0 self-stretch bg-line transition-colors duration-500 group-hover:bg-ash motion-reduce:transition-none"
              />
              <p className="statement max-w-[34ch] leading-[1.28] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                <Marked text={shortlist} mark={shortlistMark} className="text-snow" />
              </p>
            </div>
          </Rise>

          <Rise delay={0.1}>
            <div className="group flex gap-6">
              <span
                aria-hidden
                className="mt-2 w-[2px] shrink-0 self-stretch bg-brand transition-opacity duration-500 group-hover:opacity-70 motion-reduce:transition-none"
              />
              <p className="statement max-w-[34ch] leading-[1.28] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                <Marked text={constraint} mark={constraintMark} className="text-brand" />
              </p>
            </div>
          </Rise>
        </div>

        {/* WHAT IS WEIGHED. Five members, one decision, one appointment. */}
        <Rise delay={0.12} className="mt-16">
          <div className="grid items-center gap-10 rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:p-10">
            <p className="max-w-[38ch] text-[clamp(1.05rem,1.7vw,1.35rem)] leading-[1.5] text-fog">
              <MarkedKeys
                text={contribution}
                keys={contributors}
                active={active}
                onPick={setActive}
                className="font-semibold text-snow"
                activeClassName="font-semibold text-brand"
              />
            </p>

            <svg viewBox="0 0 460 264" aria-hidden className="block h-auto w-full" fill="none">
              {KINDS.map((k, i) => (
                <g key={k} className={weight(active, i)}>
                  <Contribution kind={k} x={30} y={ROWS[i]} />
                  {/* The member. Same length for every contribution, because
                      the sentence ranks none of them. */}
                  <path
                    d={`M52 ${ROWS[i]} H300`}
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeOpacity="0.75"
                    strokeLinecap="round"
                  />
                  {/* A CONTRIBUTION ARRIVING, NOT A QUANTITY BEING MEASURED.
                      The first version grew the five members from nothing on
                      staggered delays, and at any instant they were five
                      different lengths -- which is a bar chart, and a bar chart
                      of a weighting this document does not give. The members
                      are now always their full length and what moves along them
                      is a packet. */}
                  <path
                    d={`M52 ${ROWS[i]} H300`}
                    pathLength="100"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    className="ci-flow"
                    style={{ animationDelay: `${i * 420}ms` }}
                  />
                  <circle cx="300" cy={ROWS[i]} r="3.2" fill="currentColor" fillOpacity="0.85" />
                </g>
              ))}

              {/* The decision the five arrive at. Not a scale and not a total:
                  a single upright the members meet. */}
              <path d="M306 24 V240" stroke={ASH} strokeWidth="2.4" strokeOpacity="0.9" strokeLinecap="round" />

              {/* And the one thing it produces. */}
              <path d="M306 132 H382" stroke={ASH} strokeWidth="1.2" strokeOpacity="0.45" strokeDasharray="4 6" />
              <path
                d="M306 132 H382"
                pathLength="100"
                stroke={BRAND}
                strokeWidth="2.2"
                strokeLinecap="round"
                className="ci-flow"
              />
              <g className="hc-hold">
                <rect
                  x="384"
                  y="112"
                  width="62"
                  height="40"
                  rx="6"
                  fill={BRAND}
                  fillOpacity="0.14"
                  stroke={BRAND}
                  strokeWidth="1.6"
                />
                <path d="M384 124 H446" stroke={BRAND} strokeWidth="1" strokeOpacity="0.5" />
                <path d="M398 118 V130 M432 118 V130" stroke={BRAND} strokeWidth="1.3" strokeOpacity="0.75" strokeLinecap="round" />
                <path d="M396 140 H414 M422 140 H436" stroke={ASH} strokeWidth="1.3" strokeOpacity="0.5" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </Rise>

        {/* THE CLIENT'S OWN DIAGRAM, printed as written. */}
        <Rise delay={0.16} className="mt-16">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash">
            {journeyStem}
          </p>
          <p className="font-display mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-[clamp(1.5rem,4.6vw,3.4rem)] font-extrabold uppercase leading-none">
            {journey.map((word, i) => (
              <span key={word} className="flex items-center gap-x-4">
                <span className={i === journey.length - 1 ? "text-brand" : "text-snow"}>{word}</span>
                {i < journey.length - 1 && (
                  <span aria-hidden className="relative inline-flex">
                    {/* The client typed an arrow between each pair. It is kept
                        as an arrow, and the light walks the three of them in
                        order, so the chain reads in the direction it was
                        written. */}
                    <span className="text-ash">→</span>
                    <span
                      className="ci-blink absolute inset-0 text-brand"
                      style={{ animationDelay: `${i * 2000}ms` }}
                    >
                      →
                    </span>
                  </span>
                )}
              </span>
            ))}
          </p>
        </Rise>

        <Rise delay={0.2} className="mt-12">
          <p className="max-w-[70ch] text-base leading-relaxed text-fog sm:text-lg">
            <Marked text={verdict} mark={verdictMark} className="font-semibold text-snow" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

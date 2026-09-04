"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

/** Twelve sectors, and the two the document actually works through.
 *
 *  THE LIST IS NOT THE POINT. Twelve names carry no argument, and the sentence
 *  under them does: "The campaign changes with the sector." The document then
 *  proves it with two specific cases -- a software company needing
 *  demonstrations and account-level targeting, an industrial supplier gaining
 *  more from high-intent searches and detailed product information. Those two
 *  cases are the only place on this page where a campaign is described
 *  differently for different readers, so they are given the room, and the list
 *  becomes the index that leads into them.
 *
 *  ONLY THE TWO THE DOCUMENT NAMES ARE LINKED. Two of the twelve entries are
 *  marked, because the document's own words name them; the other ten carry no
 *  case, and inventing one for each would be writing ten campaign plans the
 *  client never approved. Pointing at either end of a pair lights the other, so
 *  the link is discoverable from the list or from the case.
 *
 *  THE DRAWINGS ARE THE SENTENCES. A demonstration and a set of roles inside one
 *  account; a search with a specific intent behind it and a sheet of product
 *  detail. Nothing is measured, ranked or priced, and neither case is presented
 *  as the better one.
 *
 *  MOTION. Entries arrive on a stagger and then hold; everything after that is
 *  driven by the reader and cancelled under prefers-reduced-motion. */

const EASE = [0.16, 1, 0.3, 1] as const;

/** The words the document's two cases name. An entry is linked to a case when
 *  it contains that word: the match comes from the copy, not from a row number,
 *  so re-ordering the list cannot break it. */
const CASE_KEYS = ["software", "industrial"];

function CaseDrawing({ which }: { which: 0 | 1 }) {
  if (which === 0)
    return (
      <>
        {/* The demonstration. */}
        <rect x="8" y="16" width="150" height="94" rx="8" fill="none" className="stroke-brand" strokeWidth="1.7" />
        <path d="M8 36h150" className="stroke-brand/50" strokeWidth="1.4" />
        <path d="M72 58l26 15-26 15z" className="fill-brand" />
        <path d="M112 92l16 16m0 0l-5 1 5-1-1 5" fill="none" className="stroke-snow" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M112 92l4 22 5-9 9-4z" className="fill-snow" />
        {/* The account, and the roles inside it. */}
        <circle cx="250" cy="63" r="52" fill="none" className="stroke-brand/45" strokeWidth="1.4" strokeDasharray="5 6" />
        <path d="M224 92V44l26-14 26 14v48z" fill="none" className="stroke-ash" strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="236" cy="62" r="6" className="fill-brand" />
        <circle cx="250" cy="62" r="6" className="fill-brand/65" />
        <circle cx="264" cy="62" r="6" className="fill-brand/40" />
        <rect x="234" y="76" width="32" height="5" rx="2.5" className="fill-fog/30" />
      </>
    );
  return (
    <>
      {/* The search, with something specific behind it. */}
      <rect x="8" y="30" width="150" height="34" rx="17" fill="none" className="stroke-brand" strokeWidth="1.7" />
      <circle cx="32" cy="47" r="8" fill="none" className="stroke-brand" strokeWidth="1.8" />
      <path d="M38 53l7 7" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="52" y="44" width="72" height="6" rx="3" className="fill-snow/45" />
      <path d="M134 40v14" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M60 76h46m-10-6l10 6-10 6" fill="none" className="stroke-brand" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="24" y="92" width="110" height="6" rx="3" className="fill-fog/25" />
      {/* The product detail. */}
      <rect x="192" y="10" width="128" height="106" rx="8" fill="none" className="stroke-ash" strokeWidth="1.7" />
      <rect x="206" y="24" width="60" height="8" rx="4" className="fill-brand" />
      {[0, 1, 2, 3, 4].map((r) => (
        <g key={r}>
          <rect x="206" y={46 + r * 14} width="42" height="5" rx="2.5" className="fill-fog/40" />
          <rect x="256" y={46 + r * 14} width="50" height="5" rx="2.5" className="fill-fog/22" />
        </g>
      ))}
    </>
  );
}

export function SectorCases({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  caveatLead,
  cases,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  items: string[];
  /** The claim the two cases prove. */
  caveatLead: string;
  /** The document's two worked cases, in its own order and wording. */
  cases: [string, string];
}) {
  const [hot, setHot] = useState<0 | 1 | null>(null);

  /* A reader who asked for no motion gets the list where it already is. */
  const reduced = useReducedMotion();

  const linked = CASE_KEYS.map((key) => items.findIndex((s) => s.toLowerCase().includes(key)));

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">{lead}</p>
            </Rise>
          }
        />

        <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((name, i) => {
            const which = linked.indexOf(i);
            const isLinked = which >= 0;
            const lit = isLinked && hot === which;
            return (
              <motion.li
                key={name}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.05, ease: EASE }}
                onPointerEnter={() => isLinked && setHot(which as 0 | 1)}
                onPointerLeave={() => isLinked && setHot(null)}
                className={cn(
                  "group flex items-baseline gap-4 border-b border-line py-4 pr-6 transition-colors duration-400 motion-reduce:transition-none",
                  lit && "bg-brand/[0.07]",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "shrink-0 text-[0.62rem] font-semibold tabular-nums",
                    isLinked ? "text-brand" : "text-ash",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "leading-snug transition-colors duration-300 motion-reduce:transition-none",
                    isLinked ? "font-semibold text-snow" : "text-fog",
                    lit && "text-brand",
                  )}
                >
                  {name}
                </span>
                {/* The two the document goes on to work through. */}
                {isLinked && (
                  <span
                    aria-hidden
                    className={cn(
                      "ml-auto mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-400 motion-reduce:transition-none",
                      lit ? "bg-brand" : "bg-brand/45",
                    )}
                  />
                )}
              </motion.li>
            );
          })}
        </ol>

        <Rise delay={0.1} className="mt-14">
          <p className="statement font-display max-w-3xl font-extrabold uppercase leading-[1.14] text-snow">
            {caveatLead}
          </p>
        </Rise>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {cases.map((text, i) => (
            <Rise key={text} delay={0.06 * i}>
              <div
                onPointerEnter={() => setHot(i as 0 | 1)}
                onPointerLeave={() => setHot(null)}
                className={cn(
                  "flex h-full flex-col rounded-2xl border px-6 py-7 transition-colors duration-400 motion-reduce:transition-none sm:px-8",
                  hot === i ? "border-brand bg-brand/[0.06]" : "border-line bg-ink-3",
                )}
              >
                <svg
                  viewBox="0 0 330 126"
                  role="img"
                  aria-label={
                    i === 0
                      ? "A demonstration playing, and a single account with several roles inside it."
                      : "A search with a specific intent behind it, and a sheet of product detail."
                  }
                  className="w-full"
                >
                  <CaseDrawing which={i as 0 | 1} />
                </svg>
                <p className="mt-7 leading-relaxed text-snow sm:text-lg">{text}</p>
              </div>
            </Rise>
          ))}
        </div>
      </Container>
    </section>
  );
}

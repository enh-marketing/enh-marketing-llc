"use client";

import { Fragment, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Crosslink } from "@/components/ui/Crosslink";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The thirteen things a proposal states, drawn against the thing it replaces.
 *
 *  THE DOCUMENT NAMES THE ALTERNATIVE ITSELF. "Choosing a website maintenance
 *  company in the UAE should give you a clear support arrangement rather than an
 *  open-ended promise to handle anything connected to the website." That is a
 *  comparison, and it is the only comparison on the page that is about the
 *  paperwork rather than the work. So two sheets: one carrying a line that runs
 *  off its own edge and never lands, one carrying thirteen clauses that do.
 *
 *  THE EMPTY SHEET IS THE ARGUMENT. Its space is not unfinished design — an
 *  open-ended promise is exactly a document with one sentence in it, and every
 *  ruled line under that sentence is a question nobody answered. Nothing is
 *  written on it, because writing anything there would be inventing a
 *  competitor's copy.
 *
 *  A LIST OF THIRTEEN IS NOT A CARD GRID. Thirteen tiles would be the worst
 *  version of this: they are clauses of one document, not thirteen features, so
 *  they are set inside one sheet, on its own rail, and written in as the sheet
 *  comes into view. Pointing at a clause marks its field, which is what reading
 *  a contract with a pen in your hand looks like.
 *
 *  Motion: a per-clause entrance keyed off one in-view check, and a pointer
 *  spotlight written straight to the element as custom properties, so tracking
 *  the cursor costs no re-render. Reduced motion gets the sheet already
 *  written. */

/** Splits a sentence on the phrases that have pages behind them, so the copy is
 *  linked where it stands instead of being restated as a list of links. Any
 *  phrase that is not found is simply not linked. */
function linkify(text: string, links: { label: string; href: string }[]) {
  const present = links.filter((l) => text.includes(l.label));
  if (!present.length) return <>{text}</>;
  const escaped = present
    .map((l) => l.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length);
  const parts = text.split(new RegExp("(" + escaped.join("|") + ")", "g"));
  return (
    <>
      {parts.map((part, i) => {
        const hit = present.find((l) => l.label === part);
        return hit ? (
          <Crosslink
            key={i}
            href={hit.href}
            className="font-semibold text-snow underline decoration-brand decoration-1 underline-offset-4 transition-colors duration-300 hover:text-brand"
            pendingClassName="font-semibold text-snow"
          >
            {part}
          </Crosslink>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}

export function ProposalSheet({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  statesLead,
  items,
  wider,
  widerLinks,
  useful,
  usefulMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  leadMark: string;
  statesLead: string;
  items: string[];
  wider: string;
  widerLinks: { label: string; href: string }[];
  useful: string;
  usefulMark: string[];
}) {
  const sheet = useRef<HTMLDivElement>(null);
  const written = useInView(sheet, { once: true, margin: "0px 0px -18% 0px" });
  const reduced = usePrefersReducedMotion();
  const [pen, setPen] = useState<number | null>(null);

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = sheet.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="statement text-balance leading-[1.24] text-snow">
              <Marked text={lead} mark={leadMark} className="text-brand" />
            </p>
          }
          className="mb-14"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)] lg:gap-8">
          {/* ------------------------------------------- the open-ended one */}
          <div
            aria-hidden
            className="relative hidden overflow-hidden rounded-2xl border border-dashed border-line bg-ink/60 p-6 lg:block"
          >
            {/* One line, and it leaves the page. It runs past the sheet's own
                right edge and is cut there, rather than stopping politely
                inside the padding, because "open-ended" is the whole point. */}
            <div className="absolute left-7 right-0 top-8 h-1.5">
              <span className="wm-open absolute inset-y-0 left-0 block w-[260%] rounded-l-full" />
            </div>
            {/* And nothing after it. */}
            <div className="mt-16 space-y-7">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="block h-px w-full bg-line/70" />
              ))}
            </div>
            <span className="absolute bottom-6 left-7 right-7 flex items-center gap-3">
              <span className="h-px flex-1 border-t border-dashed border-line" />
              <span className="h-2 w-2 rotate-45 border border-line" />
            </span>
          </div>

          {/* ----------------------------------------------- the proposal */}
          <div
            ref={sheet}
            onPointerMove={track}
            onPointerLeave={() => setPen(null)}
            className="group relative isolate overflow-hidden rounded-2xl border border-line bg-ink-2 p-7 sm:p-10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(232,0,13,0.10), transparent 70%)",
              }}
            />
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
            <span
              aria-hidden
              className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
            />

            <p className="font-display text-[0.68rem] font-semibold uppercase tracking-wide text-brand-text">
              {statesLead}
            </p>

            {/* The clauses, on the sheet's own rail. */}
            <ul className="mt-7 grid gap-x-10 gap-y-0 sm:grid-cols-2">
              {items.map((clause, i) => {
                const marked = pen === i;
                return (
                  <li
                    key={clause}
                    onPointerEnter={() => setPen(i)}
                    className={cn(
                      "border-b border-line/70 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0",
                    )}
                  >
                    <motion.div
                      initial={reduced ? false : { opacity: 0, x: -10 }}
                      animate={reduced || written ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
                      className="flex items-center gap-3.5 py-3.5"
                    >
                      {/* The field, filled in. */}
                      <span
                        aria-hidden
                        className={cn(
                          "h-2.5 w-2.5 shrink-0 rounded-[2px] transition-colors duration-300 motion-reduce:transition-none",
                          marked ? "bg-brand" : "bg-line",
                        )}
                      />
                      <span
                        className={cn(
                          "text-[0.9375rem] leading-snug transition-colors duration-300 motion-reduce:transition-none",
                          marked ? "text-snow" : "text-fog",
                        )}
                      >
                        {clause}
                      </span>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* What else can be joined to it, linked where the words stand. */}
        <div className="mt-14 grid gap-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <Rise>
            <p className="leading-relaxed text-fog sm:text-lg">{linkify(wider, widerLinks)}</p>
          </Rise>
          <Rise delay={0.08} className="relative lg:pl-12">
            <span
              aria-hidden
              className="absolute left-0 top-1 hidden h-[calc(100%-0.25rem)] w-px bg-line lg:block"
            />
            <p className="leading-relaxed text-fog sm:text-lg">
              <Marked text={useful} mark={usefulMark} className="font-semibold text-snow" />
            </p>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

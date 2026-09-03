"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Stage } from "@/content/services/b2b-lead-generation";

/** The five lead stages, drawn as a chain rather than as the table they arrive
 *  in.
 *
 *  WHY THIS SHAPE. The document supplies three columns: the stage, what it
 *  means, and what happens next. Rendered as a table that is three parallel
 *  lists and the reader has to assemble the sequence themselves. But the third
 *  column is not a property of its row at all -- "Details are checked and
 *  routed" is what carries New Enquiry into Marketing-Qualified Lead. It is the
 *  join between two stages.
 *
 *  So it is drawn at the join: stage, then the hand-off, then the next stage.
 *  The table's third column becomes the connective tissue of a chain, which is
 *  what a pipeline actually is, and the reader gets the sequence for free
 *  instead of reconstructing it.
 *
 *  THE ARGUMENT UNDERNEATH. The document's point is not the stages, it is the
 *  sentence after them: "Leads delivered, qualified leads and meetings booked
 *  are three different outputs." A proposal that promises "leads" could mean
 *  any of three places on this chain, and they are not worth the same. The
 *  three phrases are marked inside that sentence rather than pinned onto
 *  specific rows, because the document names them without saying which stage
 *  each one is -- and guessing the mapping would be inventing a claim.
 *
 *  NOTHING IS QUANTIFIED. The chain does not narrow, and no stage carries a
 *  count or a rate. The document gives volumes nowhere except the opening
 *  scenario, and a funnel that tapers would be asserting attrition it never
 *  states.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, and every animation
 *  ends on the finished frame, so with no JavaScript the chain still reads.
 *  See globals.css, "Lead pipeline". */

export function LeadPipeline({
  columns,
  rows,
  verdict,
  outputs,
}: {
  columns: [string, string, string];
  rows: Stage[];
  verdict: string;
  /** The phrases to mark inside `verdict`. Marked in place, never reprinted. */
  outputs: string[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  /** Marks the document's three output phrases inside its own sentence.
   *  Longest first, so a shorter phrase cannot claim part of a longer one. */
  const marked = (() => {
    const sorted = [...outputs].sort((a, b) => b.length - a.length);
    const re = new RegExp(
      `(${sorted.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
      "gi",
    );
    return verdict.split(re).map((part, i) =>
      outputs.some((o) => o.toLowerCase() === part.toLowerCase()) ? (
        <span key={i} className="text-brand">
          {part}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
  })();

  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      {/* The two column headings the chain still uses. The third is not a
          column heading any more, because the hand-offs it names sit between
          rows rather than beside them; it is set below as the arrow's legend. */}
      <div
        aria-hidden
        className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 border-b border-line pb-3 sm:grid-cols-[2.25rem_minmax(0,1.1fr)_minmax(0,1fr)] sm:gap-x-10"
      >
        <span />
        <span className="pipe-head text-[0.62rem] font-semibold uppercase text-ash">
          {columns[0]}
        </span>
        <span className="pipe-head hidden text-[0.62rem] font-semibold uppercase text-ash sm:block">
          {columns[1]}
        </span>
      </div>

      {/* The third column heading, kept as a legend for the arrow rather than
          dropped. The hand-offs it names sit between rows and so have no column
          of their own, but the document's own word for them should still appear
          on the page -- once, against the mark it labels, instead of repeated
          over all five joins. */}
      <p className="pipe-head mt-3 flex items-center gap-2 text-[0.62rem] font-semibold uppercase text-ash">
        <span aria-hidden className="text-brand">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
            <path
              d="M8 2v12M3.5 9.5 8 14l4.5-4.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {columns[2]}
      </p>

      <ol className="relative">
        {rows.map((row, i) => {
          const last = i === rows.length - 1;
          return (
            <li key={row.name} className="relative">
              <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 pt-6 sm:grid-cols-[2.25rem_minmax(0,1.1fr)_minmax(0,1fr)] sm:gap-x-10">
                {/* The node, and the rule that carries it to the next stage. */}
                <div className="relative flex justify-center">
                  <span
                    aria-hidden
                    className="pipe-node relative z-10 mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink-3 text-[0.62rem] font-bold tabular-nums text-brand-text"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {!last && (
                    <span
                      aria-hidden
                      className="pipe-rail absolute left-1/2 top-10 h-[calc(100%-1.5rem)] w-px -translate-x-1/2 bg-line"
                      style={{ animationDelay: `${i * 120 + 80}ms` }}
                    />
                  )}
                </div>

                <p
                  className="font-display pipe-in text-[clamp(1.05rem,2vw,1.45rem)] font-extrabold uppercase leading-[1.15] text-snow"
                  style={{ animationDelay: `${i * 120 + 60}ms` }}
                >
                  {row.name}
                </p>

                {/* Rendered once, placed twice. On a narrow screen the grid has
                    two columns, so this wraps to the next row and col-start-2
                    keeps it under the stage name rather than under the node;
                    from sm it is simply the third column. Rendering a mobile
                    copy and a desktop copy instead would put every one of these
                    sentences into the page twice. */}
                <p
                  className="pipe-in col-start-2 mt-2 leading-relaxed text-fog sm:col-start-3 sm:mt-0"
                  style={{ animationDelay: `${i * 120 + 90}ms` }}
                >
                  {row.means}
                </p>
              </div>

              {/* THE HAND-OFF. The table's third column, moved to the join it
                  actually describes. It is set apart from both rows because it
                  belongs to neither: it is the thing that moves a contact from
                  this stage to the one below. The last row has no hand-off in
                  the document's sense, so its line is kept as the outcome it
                  is and simply sits without an arrow. */}
              <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[2.25rem_minmax(0,1.1fr)_minmax(0,1fr)] sm:gap-x-10">
                <span />
                <p
                  className="pipe-in col-span-1 mt-3 flex items-start gap-2.5 pb-2 text-sm leading-relaxed text-brand-text sm:col-span-2"
                  style={{ animationDelay: `${i * 120 + 120}ms` }}
                >
                  {!last && (
                    <span aria-hidden className="mt-1.5 shrink-0 text-brand">
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                        <path
                          d="M8 2v12M3.5 9.5 8 14l4.5-4.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                  <span>{row.next}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* The sentence the chain exists to support. */}
      <div className="mt-10 border-t border-line pt-8">
        <p
          className="font-display pipe-verdict max-w-4xl text-[clamp(1.15rem,2.3vw,1.75rem)] font-extrabold uppercase leading-[1.18] text-snow"
          style={{ animationDelay: "700ms" }}
        >
          {marked}
        </p>
      </div>
    </div>
  );
}

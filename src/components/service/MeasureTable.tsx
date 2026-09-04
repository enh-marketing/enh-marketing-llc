"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type MeasureRow = { track: string; tells: string };

/** "What we track / What it tells you", as the source actually writes it.
 *
 *  WHY A TABLE AT ALL. Every one of the four pillar documents supplies this as
 *  a real two-column table with those exact headers, and the pairing is the
 *  content: each measure is only meaningful next to the question it answers.
 *  Splitting the pairs into cards would put the metric on one side of the page
 *  and its meaning on the other, which is the failure the documents are
 *  guarding against -- they all end this section by warning that a number read
 *  without its question misleads.
 *
 *  WHY IT DOES NOT LOOK LIKE A TABLE. A bordered grid of small grey text would
 *  be the one dead zone on an otherwise composed page. The measure is set at
 *  heading scale and its meaning runs beside it as prose, so the section reads
 *  as a list of questions the reporting can answer rather than as a
 *  spreadsheet. It is still a real <dl>, so the pairing survives for a screen
 *  reader and for anyone copying it out.
 *
 *  NOTHING IS QUANTIFIED. These documents give no figures against any of these
 *  measures, so no row carries a number, a bar or a direction of travel. The
 *  section says what can be reported, never what the result was.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, transform only:
 *  every row is copy. See globals.css, "Measure table". */
export function MeasureTable({
  rows,
  headTrack,
  headTells,
  note,
}: {
  rows: MeasureRow[];
  /** The document's own column headers. Kept, because they are what make the
   *  two columns mean different things. */
  headTrack: string;
  headTells: string;
  /** The sentence each document closes the section with, which is always a
   *  warning about reading these numbers without their context. */
  note?: string;
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
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      {/* The headers, once, above the pairs. */}
      <div
        aria-hidden
        className="grid grid-cols-[minmax(0,1fr)] gap-x-10 border-b border-line pb-3 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      >
        <span className="mt-in text-[0.6875rem] font-semibold uppercase text-ash">
          {headTrack}
        </span>
        <span className="mt-in hidden text-[0.6875rem] font-semibold uppercase text-ash md:block">
          {headTells}
        </span>
      </div>

      <dl className="grid">
        {rows.map((row, i) => (
          <div
            key={row.track}
            className="mt-row group grid grid-cols-[minmax(0,1fr)] gap-x-10 border-b border-line py-6 transition-colors duration-500 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
            style={{ animationDelay: `${i * 55}ms` }}
          >
            <dt className="font-display flex items-start gap-3 text-[clamp(1rem,1.8vw,1.3rem)] font-extrabold uppercase leading-[1.18] text-snow">
              <span
                aria-hidden
                className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand transition-transform duration-500 group-hover:scale-[1.8]"
              />
              {row.track}
            </dt>
            <dd className="mt-2 leading-relaxed text-fog md:mt-0 md:pl-0">{row.tells}</dd>
          </div>
        ))}
      </dl>

      {note && (
        <p
          className="mt-in mt-8 flex max-w-3xl gap-3 leading-relaxed text-ash"
          style={{ animationDelay: "180ms" }}
        >
          <span aria-hidden className="mt-1 shrink-0 text-brand">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
            </svg>
          </span>
          <span>{note}</span>
        </p>
      )}
    </div>
  );
}

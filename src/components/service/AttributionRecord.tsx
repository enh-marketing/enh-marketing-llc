"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Touch, Remedy } from "@/content/services/linkedin-ads";

/** Attribution, drawn as the record rather than as a timeline.
 *
 *  WHY THIS SHAPE. The section used to draw four dots along a horizontal line,
 *  twice, on two rails. Three things were wrong with that. Dots on a line is
 *  the same visual language as the process section higher up this page, so it
 *  read as "here are the steps" when the steps are not the point. Drawing the
 *  same four touches a second time invited the reader to compare two models,
 *  when the document makes one claim, not two. And the claim itself arrived as
 *  two sentences sitting beside each other, which is an assertion, not a
 *  demonstration.
 *
 *  The document's sentence is literal: last-click reporting "will tell you
 *  LinkedIn did not work when it did". So the thing to draw is the record, and
 *  the fact that LinkedIn is absent from it. One journey down the left, what
 *  last-click keeps of it down the right, and three of the four rows on the
 *  right are empty sockets. The argument is the empty column. Nobody has to be
 *  told the reporting lost something; they can see the gap.
 *
 *  TIME IS THE VERTICAL AXIS. The touches are positioned by the document's own
 *  months rather than spaced evenly: March at the top, April a quarter down,
 *  July at the bottom, and the long silent stretch where three emails go
 *  unanswered occupying the gap it actually occupies. That is what carries the
 *  premise, "B2B purchases in this market take months" — the reader sees the
 *  distance instead of reading a number for it. Going vertical is also what
 *  made the spacing affordable: across the page, the March and April sentences
 *  were 25% apart and had to be crammed or alternated above and below the
 *  axis. Down the page they have the full column width and the gaps can be
 *  honest.
 *
 *  NOTHING IS QUANTIFIED, AND NOTHING IS PRINTED TWICE. The document never
 *  gives a split, so there is none here: the right-hand column is presence and
 *  absence, not a distribution. The months stay marked inside the sentences
 *  that contain them rather than being lifted into a separate axis label,
 *  which would print each month twice.
 *
 *  MOTION. CSS keyframes gated by one IntersectionObserver, deliberately not
 *  GSAP or framer-motion. Two reasons. The sequence is a fixed, one-shot
 *  reveal with no scrubbing, which is what CSS is for. And every animation
 *  here starts from a class that is only ever added, so with no JavaScript at
 *  all the section renders complete and readable rather than blank. See
 *  globals.css, "Attribution record". */

/** Pixels per unit of the document's own month distance. The trail's `at`
 *  values are 0 / 25 / 60 / 100, so at 1 this turns them into gaps of
 *  25 / 35 / 40px: the same 25 : 35 : 40 ratio, read straight off the
 *  document's months. Raise it to open the section up, lower it to tighten;
 *  the proportions hold either way. */
const GAP_SCALE = 1;

export function AttributionRecord({
  problem,
  trail,
  verdictWrong,
  verdictRight,
  remediesLead,
  remedies,
  reportsLead,
  metrics,
  demoted,
  demotedTail,
}: {
  problem: string;
  trail: Touch[];
  verdictWrong: string;
  verdictRight: string;
  remediesLead: string;
  remedies: Remedy[];
  reportsLead: string;
  metrics: string[];
  demoted: string;
  demotedTail: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const last = trail.length - 1;



  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      {/* The premise. Kept at display scale because it is the claim the whole
          section exists to answer. */}
      <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
        {problem}
      </p>

      {/* ---- The record ---- */}
      <div className="mt-12 grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[1.5rem_minmax(0,1fr)_minmax(0,15rem)] sm:gap-x-8 lg:gap-x-10">
        {/* Column heading, on the right only. The left column is the thing
            that happened and needs no label; the right one is a claim about a
            reporting model, and "last-click" is the document's own word. */}
        <div aria-hidden className="col-span-2 hidden sm:col-span-3 sm:grid sm:grid-cols-subgrid">
          <span />
          <span />
          <span className="attr-head border-b border-line pb-3 pl-6 text-[0.68rem] font-semibold uppercase text-ash lg:pl-8">
            Last-click
          </span>
        </div>

        {/* IN FLOW, NOT IN A FIXED-HEIGHT TRACK, and the gaps are the reason.

            Rows used to be absolutely positioned at top: at%, which made the
            track's height the only control over the spacing. That coupled every
            gap to the tallest row above it: the March row carries a verdict as
            well as its sentence, so the first gap had to clear 63px, and since
            it is the narrowest of the three at 25 units, the track had to be
            tall enough that the other two ended up with 88 and 104px of dead
            space. Three quarters of the block was empty, and shrinking it just
            cramped March against April while leaving the rest airy.

            In normal flow the gap between two rows is independent of how tall
            either one is, so the document's month distances can be applied at
            a scale that suits all three at once. GAP_SCALE below turns the
            document's units into pixels; the ratio is exactly 25 : 35 : 40
            either way, which is what carries "B2B purchases in this market
            take months". It also retires the bottom-margin hack: the last row
            is in flow now, so nothing hangs out of the box. */}
        <div className="relative col-span-2 mt-0 sm:col-span-3 sm:mt-6">
          {/* The two rules, drawn behind the rows and spanning whatever height
              the rows end up needing. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[1.5rem_minmax(0,1fr)_minmax(0,15rem)] sm:gap-x-8 lg:gap-x-10">
            <div className="relative">
              <span className="attr-spine absolute left-1/2 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-line" />
            </div>
            <div />
            {/* The register the record is kept in. A left rule rather than a
                centred spine: this column is a different kind of thing from
                the journey beside it, and framing it is what lets its blanks
                read as blanks rather than as empty page. */}
            <span className="hidden h-full w-px bg-line sm:block" />
          </div>

          <ol className="relative">
            {trail.map((touch, i) => {
              const started = i === 0;
              const credited = i === last;
              return (
                <li
                  key={touch.text}
                  className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[1.5rem_minmax(0,1fr)_minmax(0,15rem)] sm:gap-x-8 lg:gap-x-10"
                  style={{ marginTop: i === 0 ? 0 : (touch.at - trail[i - 1].at) * GAP_SCALE }}
                >
                  {/* The touch itself. The first is brand because the document
                      says it is what started the thing; the rest are neutral. */}
                  <span className="relative flex justify-center">
                    <span
                      aria-hidden
                      className={cn(
                        "attr-dot mt-1 block h-3.5 w-3.5 rounded-full border-2",
                        started ? "border-brand bg-brand" : "border-line bg-ink-3",
                      )}
                      style={{ animationDelay: `${i * 140}ms` }}
                    />
                  </span>

                  <div className="attr-text" style={{ animationDelay: `${i * 140 + 90}ms` }}>
                    <p
                      className={cn(
                        "text-sm leading-relaxed sm:text-base",
                        started || credited ? "text-snow" : "text-fog",
                      )}
                    >
                      {touch.month
                        ? touch.text.split(touch.month).map((part, j, all) => (
                            <Fragment key={j}>
                              {part}
                              {j < all.length - 1 && (
                                <span className="font-display font-bold uppercase text-brand">
                                  {touch.month}
                                </span>
                              )}
                            </Fragment>
                          ))
                        : touch.text}
                    </p>

                    {/* The verdict that belongs to this touch, attached to it
                        rather than parked at the bottom of the section. This
                        one is the document's answer, so it sits with the touch
                        it is about. */}
                    {started && (
                      <p
                        className="font-display attr-verdict mt-3 text-[clamp(1rem,1.6vw,1.25rem)] font-extrabold uppercase leading-[1.18] text-brand"
                        style={{ animationDelay: "1500ms" }}
                      >
                        {verdictRight}
                      </p>
                    )}
                  </div>

                  {/* The record. Three empty sockets and one entry: this is the
                      whole argument, and it is why the column is not allowed
                      to collapse on small screens. */}
                  {/* THE ARGUMENT. Three blanks and one entry. Drawn as
                      slots rather than as dots, because an empty slot reads as
                      something that should have been filled, while an empty
                      dot on an empty column just reads as empty page. This is
                      the document's sentence made literal: last-click will
                      tell you LinkedIn did not work, because in the record
                      LinkedIn is not there.

                      Small screens have no room for a second column, so the
                      slots are dropped and the cell spans the full width,
                      putting the verdict directly under the touch it belongs
                      to. That is also why it is not restated at the foot of
                      the section: the sentence renders once, in one place. */}
                  <div className="col-span-2 mt-2 sm:col-span-1 sm:mt-0 sm:pl-6 lg:pl-8">
                    <span
                      aria-hidden
                      className={cn(
                        "attr-socket mt-0.5 hidden h-7 origin-left rounded-md sm:block",
                        credited
                          ? "w-full border border-ash bg-ash/15"
                          : "w-16 border border-dashed border-line",
                      )}
                      style={{ animationDelay: `${credited ? 1150 : 950 + i * 90}ms` }}
                    />
                    {credited && (
                      <p
                        className="font-display attr-verdict mt-3 text-[clamp(1rem,1.6vw,1.25rem)] font-extrabold uppercase leading-[1.18] text-ash"
                        style={{ animationDelay: "1350ms" }}
                      >
                        {verdictWrong}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

      </div>

      {/* ---- What is done about it ---- */}
      <div className="border-t border-line pt-8">
        <p className="text-xs font-semibold uppercase text-brand-text">{remediesLead}</p>

        {/* Two of the five name the weaker thing they replace, in the
            document's own words. Three do not, and those keep an empty
            counterpart rather than being given an invented one, which is why
            the right-hand side is allowed to be blank on three rows. */}
        <ol className="mt-5 border-t border-line">
          {remedies.map((remedy, i) => (
            <li
              key={remedy.does}
              className="group relative grid gap-x-10 gap-y-1 border-b border-line py-2.5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-baseline"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <div className="flex gap-5">
                <span
                  aria-hidden
                  className="font-display shrink-0 pt-0.5 text-xs font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="leading-relaxed text-snow">{remedy.does}</p>
              </div>
              {remedy.instead && (
                <p className="leading-relaxed text-ash lg:border-l lg:border-line lg:pl-10">
                  <span className="text-[0.7rem] font-semibold uppercase text-ash/70">
                    rather than{" "}
                  </span>
                  <span className="line-through decoration-brand/50 decoration-2">
                    {remedy.instead}
                  </span>
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* ---- What the reports lead with ---- */}
      <div className="mt-10">
        <p className="text-xs font-semibold uppercase text-ash">{reportsLead}</p>
        <ul className="mt-5 flex flex-wrap items-center gap-2.5">
          {metrics.map((metric) => (
            <li
              key={metric}
              className="font-display rounded-xl border border-brand/50 bg-brand/[0.08] px-4 py-2.5 text-sm font-bold text-snow sm:text-base"
            >
              {metric}
            </li>
          ))}
        </ul>

        {/* The demoted metric keeps its sentence. It is not struck through:
            the document says it is reported, only that it is worth less than
            it appears to be. */}
        <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 leading-relaxed text-ash">
          <span className="font-display rounded-lg border border-line px-3 py-1.5 text-sm font-bold text-fog">
            {demoted}
          </span>
          <span>{demotedTail}</span>
        </p>
      </div>
    </div>
  );
}

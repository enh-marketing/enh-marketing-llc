"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** The page's centrepiece: the test a question has to pass.
 *
 *  WHY THIS. The document states one concrete, checkable rule about how the
 *  questions are written: "The questions are written to encourage complete
 *  answers, so the final video can still make sense when the interviewer's
 *  voice is removed." That is a pass/fail test on a sentence, and it is far
 *  more specific than anything a list of production services could say. So the
 *  section performs it: a question and an answer, and then the question is
 *  taken away.
 *
 *  TWO ANSWERS, ONE SURVIVES. A closed answer collapses into nothing once the
 *  question is gone; a complete answer still reads on its own. The drawing runs
 *  both, side by side, on the same removal. Nothing else on this page has to
 *  explain why preparation matters.
 *
 *  ABSTRACT, NOT TRANSCRIPT. The bars are lines of speech, not words. Writing
 *  an example question and answer would be inventing an interview for a client
 *  who has not given one, and the point survives without them: what is being
 *  shown is how much is left, not what was said.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, on an interval that
 *  removes and restores the question. Every element carrying copy animates
 *  transform only; the bars are marks and may fade. See globals.css,
 *  "Standalone answer". */

const RUN_MS = 3200;

/** Two answers as line lengths. The first depends on its question; the second
 *  restates enough to stand on its own, which is what "complete" means here. */
const CLOSED = [58, 34];
const COMPLETE = [92, 84, 71, 46];

export function StandaloneAnswer({
  test,
  filming,
  job,
}: {
  test: string;
  filming: string;
  job: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [gone, setGone] = useState(false);

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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  useEffect(() => {
    if (!shown) return;
    // Reduced motion keeps the question in place. That frame is complete on
    // its own -- a question and two answers of visibly different length, under
    // a rule that explains what is about to be done to them -- so there is
    // nothing to set here.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setGone((g) => !g), RUN_MS);
    return () => window.clearInterval(id);
  }, [shown]);

  const panel = (kind: "closed" | "complete") => {
    const lines = kind === "closed" ? CLOSED : COMPLETE;
    const survives = kind === "complete";
    return (
      <div
        className={cn(
          "sa-in relative flex h-full flex-col rounded-2xl border bg-ink-3 p-6 transition-colors duration-700",
          gone && survives ? "border-brand/60" : "border-line",
        )}
        style={{ animationDelay: kind === "complete" ? "120ms" : "0ms" }}
      >
        {/* The interviewer's question, which is what gets removed. */}
        <div
          aria-hidden
          className={cn(
            "flex items-center gap-3 transition-opacity duration-700",
            gone ? "opacity-0" : "opacity-100",
          )}
        >
          <span className="h-6 w-6 shrink-0 rounded-full border border-line" />
          <span className="h-1.5 flex-1 rounded-full bg-line" />
          <span className="h-1.5 w-6 rounded-full bg-line" />
        </div>

        {/* The answer. */}
        <div aria-hidden className="mt-6 flex flex-1 flex-col gap-2.5">
          {lines.map((w, i) => (
            <span
              key={i}
              className={cn(
                "block h-2 rounded-full transition-colors duration-700",
                gone && survives ? "bg-brand/70" : gone ? "bg-line" : "bg-snow/25",
              )}
              style={{ width: `${w}%` }}
            />
          ))}
          {/* What is left when the question goes. A closed answer has nothing
              to stand on, so its panel empties out. */}
          {gone && !survives && (
            <span className="mt-2 block text-[0.6875rem] font-semibold uppercase tracking-wide text-ash">
              &mdash;
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      {/* The rule the section is performing. */}
      <p className="sa-in font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
        {test}
      </p>

      <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2">
        {panel("closed")}
        {panel("complete")}
      </div>

      <div className="mt-12 grid gap-x-14 gap-y-6 border-t border-line pt-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <p className="sa-in leading-relaxed text-snow sm:text-lg" style={{ animationDelay: "180ms" }}>
          {filming}
        </p>
        <p
          className="sa-in font-display text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.16] text-snow"
          style={{ animationDelay: "240ms" }}
        >
          {job}
        </p>
      </div>
    </div>
  );
}

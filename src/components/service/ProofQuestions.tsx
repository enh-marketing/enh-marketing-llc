"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** The centrepiece: the questions that make a testimonial worth filming.
 *
 *  WHY THIS. The document answers its own opening. Having described a
 *  testimonial that told a buyer nothing, it says what was missing and lists it
 *  as questions: what problem did the customer have, why did they choose your
 *  business, what happened during the work, and what changed as a result. Those
 *  are the most concrete thing in the document, and they are what a reader can
 *  act on before they ever contact anyone.
 *
 *  SET AS QUESTIONS, NOT AS FEATURES. They are printed at display scale, in
 *  order, because they are the sequence of a story rather than a menu. The
 *  numbering is the order a buyer needs them in: situation, decision, work,
 *  result.
 *
 *  THE CONSENT PARAGRAPH SITS INSIDE THIS SECTION ON PURPOSE. The document
 *  places its warning about results, regulated claims and advertising use
 *  directly after the method, and separating the two would leave the method
 *  reading as an instruction to extract stronger claims. It is set apart and
 *  marked, not buried.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, transform only.
 *  See globals.css, "Proof questions". */
export function ProofQuestions({
  claim,
  needLead,
  questions,
  method,
  consent,
  aim,
}: {
  claim: string;
  needLead: string;
  questions: string[];
  method: string;
  consent: string;
  aim: string;
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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      <p className="pq-in font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
        {claim}
      </p>

      {/* The questions, in the order a buyer needs them. */}
      <p
        className="pq-in mt-12 text-[0.6875rem] font-semibold uppercase tracking-wide text-ash"
        style={{ animationDelay: "80ms" }}
      >
        {needLead}
      </p>
      <ol className="mt-6 grid border-t border-line">
        {questions.map((q, i) => (
          <li
            key={q}
            className="pq-in group flex items-start gap-6 border-b border-line py-7"
            style={{ animationDelay: `${i * 90 + 120}ms` }}
          >
            <span
              aria-hidden
              className="font-display shrink-0 text-[1.6rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_var(--color-brand)] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_var(--color-brand)]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-display text-[clamp(1.05rem,2.1vw,1.5rem)] font-extrabold uppercase leading-[1.18] text-snow">
              {q}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <p className="pq-in leading-relaxed text-snow sm:text-lg" style={{ animationDelay: "180ms" }}>
          {method}
        </p>
        {/* The limits. Kept in this section, next to the method they qualify. */}
        <p
          className="pq-in flex gap-3 leading-relaxed text-ash"
          style={{ animationDelay: "240ms" }}
        >
          <span aria-hidden className="mt-1 shrink-0 text-brand">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
            </svg>
          </span>
          <span>{consent}</span>
        </p>
      </div>

      <p
        className="pq-in mt-10 max-w-3xl border-t border-line pt-8 font-display text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.16] text-snow"
        style={{ animationDelay: "300ms" }}
      >
        {aim}
      </p>
    </div>
  );
}

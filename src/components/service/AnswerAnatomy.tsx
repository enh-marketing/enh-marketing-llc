"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** An AI answer, with the two things the acronyms actually name.
 *
 *  WHY THIS DRAWING. The section's job is to show that AEO and GEO are aimed at
 *  two ends of the same object. The document defines AEO as "being the source
 *  an AI assistant draws on when it answers a question", and GEO as the same
 *  thing "aimed at systems that generate an answer rather than list links". So
 *  the drawing is an answer being generated from sources: pin one sits on the
 *  cited source, pin two on the generated answer.
 *
 *  That is the whole argument in one picture — two labels, one pipeline, and
 *  the reader can see how little separates them before reading a word.
 *
 *  Abstract: bars and chips, never text. Naming a real source or writing a real
 *  answer would put words in an assistant's mouth on a page about exactly that
 *  risk. */
export function AnswerAnatomy({ active, pin }: { active: number; pin: PinRenderer }) {
  const source = active === 0;
  const generated = active === 1;

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-3/60 p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at 25% 0%, black, transparent 78%)",
        }}
      />

      {/* The question. */}
      <div aria-hidden className="relative flex items-center gap-2.5 rounded-full border border-line bg-ink-2 px-4 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        <span className="h-1.5 flex-1 rounded-full bg-snow/18" />
      </div>

      {/* The sources it draws on — what AEO is about. */}
      <div className="relative mt-6 flex items-start gap-4">
        {pin(0, "mt-1")}
        <div
          className={cn(
            "flex-1 rounded-xl border p-3 transition-colors duration-500",
            source ? "border-brand/60 bg-brand/[0.08]" : "border-line bg-ink-2/60",
          )}
        >
          <div aria-hidden className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "flex flex-1 items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-500",
                  source && i === 1 ? "border-brand bg-brand/15" : "border-line bg-ink-3",
                )}
              >
                <span
                  className={cn(
                    "h-3 w-3 shrink-0 rounded-[3px] transition-colors duration-500",
                    source && i === 1 ? "bg-brand" : "bg-snow/25",
                  )}
                />
                <span className="h-1 flex-1 rounded-full bg-snow/15" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The arrow of composition. */}
      <div aria-hidden className="relative my-3 ml-[3.25rem] flex flex-col items-start gap-1">
        {[0, 1].map((i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-ash" />
        ))}
      </div>

      {/* The generated answer — what GEO is about. */}
      <div className="relative flex items-start gap-4">
        {pin(1, "mt-1")}
        <div
          className={cn(
            "flex-1 rounded-xl border p-4 transition-colors duration-500",
            generated ? "border-brand/60 bg-brand/[0.08]" : "border-line bg-ink-2/60",
          )}
        >
          <div aria-hidden className="space-y-2.5">
            {[92, 78, 88, 54].map((w, i) => (
              <span key={i} className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 rounded-full transition-colors duration-500",
                    generated ? "bg-brand/55" : "bg-snow/22",
                  )}
                  style={{ width: `${w}%` }}
                />
                {i < 2 && (
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border text-[0.5rem] font-bold transition-colors duration-500",
                      source
                        ? "border-brand/70 bg-brand/20 text-brand-text"
                        : "border-line text-ash",
                    )}
                  >
                    {i + 1}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

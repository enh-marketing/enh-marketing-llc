"use client";

import { Fragment } from "react";
import { cn } from "@/lib/cn";
import type { Step } from "@/content/services/linkedin-ads";

/** The four steps, set as the worksheet they are.
 *
 *  WHY A SHEET AND NOT BOXES. An earlier pass drew four bordered cards joined
 *  by hairlines, which is a diagram of a list rather than a calculation. The
 *  document is doing arithmetic: two inputs, a rule line, a figure that follows
 *  from them, and a comparison. So it is set the way arithmetic is set on
 *  paper — question on the left, value on the right, a heavier rule where the
 *  sum happens.
 *
 *  THE VALUE COLUMN IS EMPTY ON PURPOSE, ALL THE WAY DOWN. The first two rows
 *  are the reader's own numbers and we do not have them. The third is what
 *  those two give you, so it cannot be filled either. The fourth is what
 *  LinkedIn actually costs, and the document is explicit that this arrives
 *  later: "We provide a realistic range at proposal stage." A sheet with
 *  invented figures in it would answer the question the section exists to hand
 *  back to the reader.
 *
 *  THE WORKED EXAMPLE STAYS WHERE THE DOCUMENT PUT IT. Its two figures — one in
 *  ten, AED 100,000 — appear inside the third step's own sentence, weighted in
 *  place rather than lifted into the value column, because in the source they
 *  are a conditional ("If you close one in ten and a client is worth...") and
 *  not an answer. They are never multiplied into a third number.
 *
 *  No operator is drawn anywhere. The example implies value multiplied by close
 *  rate, but the document never states the operation, and printing one would be
 *  asserting a formula on its behalf. */

/** The document's own figures, weighted where they occur in its sentence. */
function markFigures(text: string, figures: string[]) {
  const pattern = figures
    .filter((f) => text.includes(f))
    .sort((a, b) => b.length - a.length)
    .map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!pattern.length) return text;
  return text.split(new RegExp(`(${pattern.join("|")})`)).map((part, i) =>
    figures.includes(part) ? (
      <span key={i} className="font-display font-bold text-brand">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** An empty value slot. Three weights of the same mark: what you supply, what
 *  follows from it, and what we supply later. */
function Slot({ tone }: { tone: "input" | "derived" | "supplied" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-11 w-full items-center gap-1.5 rounded-xl border px-4 sm:w-48",
        tone === "input" && "border-dashed border-line",
        tone === "derived" && "border-brand/55 bg-brand/[0.07]",
        tone === "supplied" && "border-dashed border-brand/50",
      )}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 flex-1 rounded-full",
            tone === "input" ? "bg-line" : "bg-brand/30",
          )}
          style={{ opacity: 1 - i * 0.26 }}
        />
      ))}
    </span>
  );
}

export function ArithmeticSheet({
  steps,
  exampleCloseRate,
  exampleValue,
}: {
  steps: Step[];
  exampleCloseRate: string;
  exampleValue: string;
}) {
  const figures = [exampleValue, exampleCloseRate];

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-ink-2">
      <ol>
        {steps.map((step, i) => {
          // The rule above the third row is where the sum happens.
          const isSum = i === 2;
          const tone = i < 2 ? "input" : i === 2 ? "derived" : "supplied";
          return (
            <li
              key={step.no}
              className={cn(
                "group relative px-6 py-7 sm:px-9 sm:py-8",
                isSum
                  ? "border-t-2 border-brand/45 bg-brand/[0.035]"
                  : i > 0 && "border-t border-line",
              )}
            >
              <div className="grid gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                <div className="flex gap-5">
                  <span
                    aria-hidden
                    className="font-display shrink-0 pt-1 text-xs font-bold tabular-nums text-brand-text"
                  >
                    {step.no}
                  </span>
                  <div>
                    <p className="font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.18] text-snow">
                      {step.ask}
                    </p>
                    <p className="mt-3.5 max-w-xl leading-relaxed text-fog">
                      {markFigures(step.note, figures)}
                    </p>
                  </div>
                </div>

                <div className="lg:pt-1">
                  <Slot tone={tone} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

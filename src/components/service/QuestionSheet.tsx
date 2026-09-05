"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

/** The centrepiece: the questions, and the answers nobody writes for them.
 *
 *  WHY A QUESTION SHEET. The page opens on a testimonial that went fine and
 *  achieved nothing -- a polite answer that "tells a prospective buyer very
 *  little" -- and this section is the correction. The document is explicit
 *  about how the correction works: we prepare the questions, and "we do not ask
 *  them to memorise praise or pretend that an experience happened". So the only
 *  honest object this section can be is the sheet the interviewer brings: our
 *  questions, in our words, and beside each one a recording that is theirs.
 *
 *  THE ANSWER IS DRAWN AND NEVER WRITTEN. There is no quotation anywhere on
 *  this page, and inventing one to fill the layout would be fabricating a
 *  customer. What sits beside each question is a waveform and an open quotation
 *  mark: a voice, recorded, with the words left where they belong. That is the
 *  section's argument as a picture -- prepared question, unscripted answer --
 *  and it is the reason a card grid could never carry it.
 *
 *  THE CONSENT CLAUSE IS SET AS A CLAUSE. The document places its warning about
 *  results, regulated claims and advertising use directly after the method, and
 *  separating them would leave the method reading as an instruction to extract
 *  stronger claims. It is given the weight of a signed term, not a footnote.
 *
 *  NOTHING IS TIMED. The lanes carry tick marks and no numbers: the document
 *  gives one duration and one session length, both hedged and both inside FAQ
 *  answers, and neither is lifted out here.
 *
 *  MOTION. Pointing at a question puts its lane into record; everything else
 *  rests drawn and legible, and every transition is cancelled under
 *  prefers-reduced-motion. */

/** Three lanes, three different recordings. Fixed, not random: a reader
 *  scrolling back has to see the same waveform. */
const WAVES = [
  [8, 22, 14, 34, 18, 44, 26, 52, 20, 38, 12, 30, 16, 24, 10, 28, 18, 40, 22, 14],
  [12, 30, 20, 46, 28, 18, 38, 24, 50, 16, 34, 22, 42, 14, 26, 36, 18, 30, 12, 20],
  [16, 26, 40, 18, 32, 48, 22, 36, 14, 28, 44, 20, 34, 16, 42, 24, 30, 12, 38, 18],
];

function Lane({ index, live }: { index: number; live: boolean }) {
  const wave = WAVES[index % WAVES.length];
  /* The lane runs from the first tick to the last, so the voice never spills
     past the marks that measure it. */
  const step = 232 / wave.length;
  return (
    <svg
      viewBox="0 0 340 128"
      role="img"
      aria-label="A recorded answer: a voice on the lane, with the words left as the customer's own."
      className="block w-full"
    >
      {/* The open quotation the answer sits inside. */}
      <path
        d="M20 92c-9 0-15-6-15-15 0-14 10-27 24-33l4 7c-8 4-13 10-14 16 8 0 14 6 14 14 0 7-5 11-13 11zm38 0c-9 0-15-6-15-15 0-14 10-27 24-33l4 7c-8 4-13 10-14 16 8 0 14 6 14 14 0 7-5 11-13 11z"
        className={cn(
          "transition-colors duration-500 motion-reduce:transition-none",
          live ? "fill-brand/45" : "fill-line",
        )}
      />

      {/* The lane, and the ticks that mark it out. No numbers: the document
          fixes no duration outside its own FAQ answers. */}
      <path d="M96 108h236" className="stroke-line" strokeWidth="1.2" />
      {Array.from({ length: 13 }).map((_, k) => (
        <path
          key={k}
          d={"M" + (96 + k * 19.6) + " 108v" + (k % 4 === 0 ? -8 : -4)}
          className="stroke-line"
          strokeWidth="1.2"
        />
      ))}

      {/* The voice. */}
      <g
        className={cn(
          "transition-colors duration-500 motion-reduce:transition-none",
          live ? "fill-brand" : "fill-ash/50",
        )}
      >
        {wave.map((h, k) => (
          <rect
            key={k}
            x={98 + k * step}
            y={62 - h / 2}
            width={step * 0.52}
            height={h}
            rx={step * 0.26}
          />
        ))}
      </g>

      {/* In record. */}
      <g
        className={cn(
          "transition-opacity duration-400 motion-reduce:transition-none",
          live ? "opacity-100" : "opacity-0",
        )}
      >
        <circle cx="104" cy="26" r="6" className="fill-brand" />
        <path d="M118 26h44" className="stroke-brand" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function QuestionSheet({
  id,
  label,
  index,
  title,
  strokeTitle,
  claim,
  needLead,
  questions,
  method,
  methodMark,
  consent,
  aim,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  claim: string;
  needLead: string;
  questions: string[];
  method: string;
  /** The half of the method that says what we will not do. */
  methodMark: string;
  consent: string;
  aim: string;
}) {
  const [live, setLive] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="claim">
              <p className="statement font-display font-extrabold uppercase leading-[1.14] text-snow">
                {claim}
              </p>
            </Rise>
          }
        />

        <Rise>
          <p className="text-xs font-semibold uppercase text-brand-text">{needLead}</p>
        </Rise>

        {/* Our question on one side, their answer on the other. */}
        <ol className="mt-8 border-t border-line" onPointerLeave={() => setLive(null)}>
          {questions.map((q, i) => (
            <li
              key={q}
              onPointerEnter={() => setLive(i)}
              className="group grid items-center gap-6 border-b border-line py-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16"
            >
              <div className="flex gap-5 sm:gap-8">
                <span
                  aria-hidden
                  className={cn(
                    "font-display mt-2 shrink-0 text-sm font-extrabold tabular-nums transition-colors duration-400 motion-reduce:transition-none",
                    live === i ? "text-brand" : "text-ash",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className={cn(
                    "font-display statement font-extrabold uppercase leading-[1.08] transition-colors duration-400 motion-reduce:transition-none",
                    live === i ? "text-brand" : "text-snow",
                  )}
                >
                  {q}
                </p>
              </div>
              <div className="lg:pl-6">
                <Lane index={i} live={live === i} />
              </div>
            </li>
          ))}
        </ol>

        {/* How the questions are prepared, and the line we will not cross. */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <Rise>
            <p className="leading-relaxed text-snow sm:text-lg">
              <Marked text={method} mark={methodMark} className="font-semibold text-brand" />
            </p>
          </Rise>

          {/* Set as a term, because that is what it is. */}
          <Rise delay={0.08}>
            <div className="relative rounded-2xl border border-brand/45 bg-brand/[0.05] px-6 py-7 sm:px-8">
              <span aria-hidden className="absolute -top-4 left-7 flex h-8 w-8 items-center justify-center rounded-full border border-brand bg-ink-2">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-brand" fill="none">
                  <path d="M6 9V6.5a4 4 0 118 0V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <rect x="4.5" y="9" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
              <p className="leading-relaxed text-fog">{consent}</p>
            </div>
          </Rise>
        </div>

        <Rise delay={0.14} className="mt-12">
          <p className="statement font-display max-w-3xl font-extrabold uppercase leading-[1.14] text-snow">
            {aim}
          </p>
        </Rise>
      </Container>
    </section>
  );
}

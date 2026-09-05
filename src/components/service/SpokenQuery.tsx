"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Crosslink } from "@/components/ui/Crosslink";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

/** A spoken question arriving, and the honest end of it.
 *
 *  WHY THIS SHAPE. The section has one structure and the old layout hid it: four
 *  things people ask for out loud, three things that make them answerable, and a
 *  flat refusal to promise the answer. So it is drawn as the request travelling
 *  -- a question comes in, meets the three things that make it legible, and then
 *  stops at a boundary that is drawn as a boundary rather than written as a
 *  disclaimer under a paragraph.
 *
 *  THE LIMIT IS NOT SMALL PRINT. "It cannot guarantee that a business will be
 *  selected for a voice response or mentioned in an AI-generated answer" is the
 *  most important sentence here, because everything above it is the part that
 *  can be promised. It gets its own band at reading size, and the section
 *  deliberately ends on it rather than trailing off into a link.
 *
 *  The four requests cycle so the query line is alive, which is the only way a
 *  spoken question reads as spoken. Nothing is timed, counted or transcribed:
 *  the words are the document's four, nothing else is put in anyone's mouth.
 *
 *  CSS keyframes on an interval, so the level bars run whether or not the main
 *  thread is busy, and the resting frame is a complete question. */
export function SpokenQuery({
  id,
  label,
  index,
  title,
  strokeTitle,
  askLead,
  asks,
  answerLead,
  answerTail,
  limit,
  referenceLead,
  referenceLabel,
  referenceHref,
  referenceTail,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  askLead: string;
  asks: string[];
  answerLead: string;
  answerTail: string;
  limit: string;
  referenceLead: string;
  referenceLabel: string;
  referenceHref: string;
  referenceTail: string;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setStep((s) => s + 1), 2400);
    return () => window.clearInterval(id);
  }, []);

  const active = step % asks.length;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-12" />

        {/* The request, spoken. */}
        <Rise>
          <p className="font-display text-[0.6875rem] font-bold uppercase tracking-wide text-ash">
            {askLead}
          </p>
        </Rise>

        <Rise delay={0.06}>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-4 rounded-2xl border border-line bg-ink-3 px-6 py-5">
            {/* A level, so the line reads as spoken rather than typed. */}
            <span aria-hidden className="flex h-7 items-center gap-[3px]">
              {[8, 15, 22, 13, 18, 9].map((h, i) => (
                <span
                  key={i}
                  className="sq-bar w-[3px] rounded-full bg-brand"
                  style={{ height: h, animationDelay: `${i * 110}ms` }}
                />
              ))}
            </span>

            <ul className="flex flex-wrap items-center gap-2.5">
              {asks.map((ask, i) => (
                <li
                  key={ask}
                  className={cn(
                    "font-display rounded-full border px-4 py-1.5 text-sm font-bold uppercase transition-colors duration-500",
                    i === active
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-line text-fog",
                  )}
                >
                  {ask}
                </li>
              ))}
            </ul>
          </div>
        </Rise>

        {/* What makes it answerable. */}
        <Rise delay={0.12}>
          <p className="mt-10 max-w-4xl leading-relaxed text-snow sm:text-lg">
            <span className="font-semibold text-brand">{answerLead}</span> {answerTail}
          </p>
        </Rise>

        {/* And where it stops. Its own band, at reading size. */}
        <Rise delay={0.18}>
          <div className="mt-12 flex gap-4 rounded-2xl border border-brand/45 bg-brand/[0.05] p-7">
            <span aria-hidden className="mt-0.5 shrink-0 text-brand">
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.7" />
                <path d="M4.6 4.6l10.8 10.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </span>
            <p className="leading-relaxed text-snow sm:text-lg">{limit}</p>
          </div>
        </Rise>

        <Rise delay={0.24}>
          <p className="mt-8 flex flex-wrap items-baseline gap-x-1.5 leading-relaxed text-fog">
            <span>{referenceLead}</span>
            <Crosslink
              href={referenceHref}
              className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
            >
              {referenceLabel}
            </Crosslink>
            <span>{referenceTail}</span>
          </p>
        </Rise>
      </Container>
    </section>
  );
}

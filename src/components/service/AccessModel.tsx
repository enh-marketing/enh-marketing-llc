"use client";

import { Fragment, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

/** Who holds what, drawn as the thing that detaches.
 *
 *  THE WHOLE SECTION TURNS ON ONE STRUCTURAL FACT. The account belongs to the
 *  client and the agency reaches it "through agency access". Everything of value
 *  sits inside the account: conversion history, negative keyword lists,
 *  audience lists, tracking setup, performance data. And then the sentence that
 *  matters: "If the engagement ends, we remove our access and you keep the work
 *  completed during that time." So access is a layer, and it is the only layer
 *  that comes off. Drawing it as a detachable seam over five permanent ones
 *  answers the question the section exists to answer, before a word is read.
 *
 *  A LIST OF PROMISES WOULD HAVE SAID NONE OF THIS. Trust cards assert that the
 *  arrangement is safe. The drawing shows why it is: the valuable layers are
 *  not the agency's to take, and the reader can see which single layer is.
 *
 *  THE SENTENCE IS THE LEGEND. The five kinds of history are named once, inside
 *  the client's own sentence, and pointing at one lights the layer it refers to.
 *  No layer carries a label, because the label is already on the page. That
 *  also makes the copy do the explaining, which is what it is best at.
 *
 *  IT READS AT REST. Six layers, the seam, and the brand mark on the layer that
 *  detaches are all drawn before anything is pointed at. The interaction adds
 *  precision, never the meaning.
 *
 *  NOTHING IS COUNTED. No years, no volumes. The document says "years of
 *  conversion data" and "months of account knowledge" in prose and gives no
 *  figure, so the layers carry none. */

export function AccessModel({
  id,
  label,
  index,
  title,
  strokeTitle,
  opening,
  remains,
  remainsMark,
  whyLead,
  why,
  whyMark,
  warning,
  warningMark,
  cta,
  ctaHref,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  opening: string;
  remains: string;
  /** The five kinds of history, verbatim substrings of `remains`. */
  remainsMark: string[];
  whyLead: string;
  why: string;
  whyMark: string;
  warning: string;
  warningMark: string;
  cta: string;
  ctaHref: string;
}) {
  /** Which of the five the reader is pointing at. */
  const [lit, setLit] = useState<number | null>(null);

  /** The client's sentence, with each named layer pointable. */
  const legend = () => {
    const parts: React.ReactNode[] = [];
    let rest = remains;
    remainsMark.forEach((phrase, i) => {
      const k = rest.indexOf(phrase);
      if (k < 0) return;
      parts.push(<Fragment key={`t${i}`}>{rest.slice(0, k)}</Fragment>);
      parts.push(
        <span
          key={`p${i}`}
          onPointerEnter={() => setLit(i)}
          onFocus={() => setLit(i)}
          tabIndex={-1}
          className={cn(
            "cursor-default font-semibold transition-colors duration-300 motion-reduce:transition-none",
            lit === i ? "text-brand" : "text-snow",
          )}
        >
          {phrase}
        </span>,
      );
      rest = rest.slice(k + phrase.length);
    });
    parts.push(<Fragment key="tail">{rest}</Fragment>);
    return parts;
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{opening}</p>}
          className="mb-14"
        />

        <div
          className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16"
          onPointerLeave={() => setLit(null)}
        >
          {/* ------------------------------------------------ the stack --- */}
          <div aria-hidden className="order-2 lg:order-1">
            <div className="relative rounded-2xl border border-line bg-ink-2 p-6 sm:p-8">
              {/* The layer that comes off. Drawn detached, on a broken seam. */}
              <div className="relative">
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-brand/70 bg-brand/[0.07] px-4 py-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
                  <span className="h-1.5 flex-1 rounded-full bg-brand/40" />
                  <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-brand" fill="none">
                    <path
                      d="M8 3v10M4 7l4-4 4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {/* The seam. Everything below it stays. */}
                <div className="my-3 flex items-center gap-3">
                  <span className="h-px flex-1 border-t border-dashed border-line" />
                  <span className="h-1 w-1 rotate-45 bg-line" />
                  <span className="h-px flex-1 border-t border-dashed border-line" />
                </div>
              </div>

              {/* The five that do not. */}
              <div className="flex flex-col gap-2">
                {remainsMark.map((phrase, i) => {
                  const on = lit === i;
                  return (
                    <div
                      key={phrase}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-300 motion-reduce:transition-none",
                        on
                          ? "border-brand bg-brand/[0.06]"
                          : "border-line bg-ink-3",
                      )}
                    >
                      <span
                        className={cn(
                          "h-2.5 w-2.5 shrink-0 rounded-[2px] transition-colors duration-300 motion-reduce:transition-none",
                          on ? "bg-brand" : "bg-line",
                        )}
                      />
                      <span
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none",
                          on ? "bg-brand/45" : "bg-fog/25",
                        )}
                        style={{ width: `${[86, 68, 74, 58, 80][i]}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Whose it is. A base the stack sits on, not a label. */}
              <div className="mt-4 h-1.5 rounded-full bg-snow/[0.14]" />
            </div>
          </div>

          {/* ------------------------------------------------ the legend --- */}
          <div className="order-1 lg:order-2">
            <p className="text-base leading-relaxed text-fog sm:text-lg">{legend()}</p>

            <div className="mt-8 rounded-2xl border border-line bg-ink-2 p-6 sm:p-7">
              <p className="font-display text-[0.62rem] font-semibold uppercase tracking-wide text-brand-text">
                {whyLead}
              </p>
              <p className="mt-4 leading-relaxed text-fog">
                <Marked text={why} mark={whyMark} className="font-semibold text-snow" />
              </p>
            </div>
          </div>
        </div>

        {/* Advice about other agencies, kept apart from this page's own
            claims, and the way on. */}
        <Rise delay={0.12} className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <p className="font-display max-w-3xl text-[clamp(1.05rem,2vw,1.45rem)] font-extrabold uppercase leading-[1.16] text-snow">
              <Marked text={warning} mark={warningMark} className="text-brand" />
            </p>
            <a
              href={ctaHref}
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep motion-reduce:transition-none"
            >
              {cta}
            </a>
          </div>
        </Rise>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { ai } from "@/lib/content";
import { Chars } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { NodeWeb } from "@/components/fx/Adornments";
import { Marked } from "@/components/service/Marked";
import { usePinnedRun, RAIL_CLASS } from "@/components/fx/usePinnedRun";
import { cn } from "@/lib/cn";

/** "Make AI Useful for Your Business" — the whole section, as one pinned
 *  horizontal run.
 *
 *  EVERYTHING IS IN THE RUN. The statement, the paragraph, the four
 *  capabilities and the call to action are six panels. There is no prose column
 *  beside it and no button left sitting underneath: the CTA is the run's last
 *  panel, and it borrows the dashed end-card the case-study carousel already
 *  ends on, so this section closes the way that one does.
 *
 *  THE INFORMATION WAS IN THE COPY AND THE BOXES THREW IT AWAY. The paragraph
 *  says "apply it across marketing, search, automation, and customer journeys"
 *  and the 2x2 grid under it was AI-Powered Marketing, Intelligent Automation,
 *  AI Search Visibility and AI Customer Experience. The same four things, with
 *  nothing connecting them -- so the sentence read as filler and the cards read
 *  as four unrelated features. The four nouns are now marked in place on the
 *  opening panel, once, and the four panels that follow are those four in the
 *  document's card order. The sentence is the run's contents page. Emphasis
 *  only: nothing is reworded and no word is printed twice.
 *
 *  HOW IT DIFFERS FROM THE RUN IN "WHY ENH", which sits two sections above it.
 *  That one is eight heterogeneous claims at eight different widths, bottom
 *  aligned, and four of its panels are one sentence spread across them. This
 *  one is four peers at one width, each led by a numeral at display scale,
 *  bookended by a wide opening and a narrow close. Same mechanic, different
 *  rhythm, because the content is a different shape: eight unlike claims there,
 *  four equal capabilities here.
 *
 *  MECHANIC AND FALLBACK are `usePinnedRun`: pinned and scrubbed from 1024px up
 *  where motion is welcome, a native snap-scroll rail you can swipe everywhere
 *  else. */
export function AISection() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  usePinnedRun(root, rail, progress);

  const shell =
    "group relative flex w-[80vw] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border p-7 transition-colors duration-500 motion-reduce:transition-none sm:w-[54vw] sm:p-8 lg:h-[27rem]";

  return (
    <section id="ai" className="relative overflow-hidden py-16 sm:py-20">
      <Container className="relative mb-12 sm:mb-14">
        <NodeWeb className="absolute -top-6 right-0 hidden opacity-80 lg:block" />
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
          Explore New Heights
        </p>
        <h2 className="font-display display-xl font-extrabold uppercase text-snow">
          <span className="block">
            <Chars text={ai.title[0]} />
          </span>{" "}
          <span className="block text-brand">
            <Chars text={ai.title[1]} delay={0.15} />
          </span>
        </h2>
      </Container>

      <div ref={root}>
        <div ref={rail} className={RAIL_CLASS}>
          {/* 01 — the contents page. The four marked nouns are the four panels
              that follow it. */}
          <div
            data-panel
            className={cn(shell, "justify-between gap-8 border-line bg-ink-3 lg:w-[34rem]")}
          >
            <span aria-hidden className="font-display text-xs font-bold tabular-nums text-brand-text">
              01
            </span>
            <div className="flex flex-1 flex-col justify-end gap-5">
              <p className="statement text-balance leading-[1.22] text-snow">{ai.sub}</p>
              <p className="max-w-[46ch] leading-relaxed text-fog">
                <Marked
                  text={ai.paragraphs[0]}
                  mark={ai.capabilities.map((c) => c.domain)}
                  className="font-semibold text-snow"
                />
              </p>
            </div>
            <span aria-hidden className="h-px w-16 bg-brand" />
          </div>

          {/* 02–05 — the four, in the document's card order. */}
          {ai.capabilities.map((cap, i) => (
            <div
              key={cap.title}
              data-panel
              className={cn(shell, "justify-between gap-6 border-line bg-ink-2 hover:border-brand/45 lg:w-[26rem]")}
            >
              <span
                aria-hidden
                className="font-display text-[3.25rem] font-extrabold leading-none text-stroke opacity-40 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
              >
                {String(i + 2).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col justify-end gap-4">
                <h3 className="font-display text-xl font-extrabold uppercase leading-[1.12] text-snow sm:text-2xl">
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed text-fog sm:text-base">{cap.body}</p>
              </div>
              <span
                aria-hidden
                className="h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none"
              />
            </div>
          ))}

          {/* 06 — the way out, as the run's terminus. Dashed, which is the
              treatment the case-study carousel already closes on. */}
          <a
            data-panel
            href="#contact"
            className={cn(
              shell,
              "items-center justify-center gap-6 border-dashed border-line text-center hover:border-brand lg:w-[22rem]",
            )}
          >
            <span className="font-display text-2xl font-extrabold uppercase leading-tight text-stroke">
              Make it
              <br />
              useful
            </span>
            <span className="inline-flex items-center gap-3 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-brand-deep motion-reduce:transition-none">
              {ai.cta}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M1 8h13M9 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <Container className="mt-10">
        <div className="flex items-center gap-5">
          <div className="h-px flex-1 bg-line">
            <span ref={progress} className="block h-px origin-left scale-x-0 bg-brand" />
          </div>
          <span className="text-xs uppercase text-ash">Four places AI helps</span>
        </div>
      </Container>
    </section>
  );
}

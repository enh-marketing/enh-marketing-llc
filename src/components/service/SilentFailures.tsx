"use client";

import { Fragment, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

/** Three faults that look like nothing, drawn as the nothing they look like.
 *
 *  THE SENTENCE THIS SECTION EXISTS FOR. "A slow page, expired integration or
 *  broken enquiry form may go unnoticed until it affects customers or interrupts
 *  a campaign." Three named faults, and the operative word is *unnoticed*. A
 *  card grid with a warning icon on each would contradict the copy inside it:
 *  the whole difficulty is that none of these announces itself.
 *
 *  SO NOTHING IS DRAWN BROKEN. The page renders — its bar is simply still
 *  moving. The integration's two ends are both present — the segment between
 *  them is not. The form returns its confirmation exactly as designed — the
 *  tray it should have reached is empty. Each drawing is a working interface
 *  with one thing absent, which is the actual experience the document
 *  describes.
 *
 *  THE CLIENT'S SENTENCE IS THE LEGEND. The three faults are named once, inside
 *  it, and pointing at a phrase lights the drawing it names; pointing at a
 *  drawing lights its phrase. Nothing on the drawings is labelled, so no word
 *  is printed on this page twice.
 *
 *  MOTION IS ONE ELEMENT. The load bar creeps, because a page that is slow is
 *  the only one of the three whose fault is a thing happening rather than a
 *  thing missing. Everything else is at rest. See globals.css, "Website
 *  Maintenance & Support". */

/** A page that renders and does not arrive. The card is complete; what is not
 *  complete is the distance still being covered, so the strip's whole width is
 *  the distance and the load never crosses it. */
function SlowPage({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center gap-4">
      <div className="w-[8.5rem] shrink-0 rounded-md border border-line bg-ink-3 p-2.5">
        <span className="block h-1.5 w-2/5 rounded-full bg-snow/25" />
        <div className="mt-2 flex gap-2">
          <span className="block h-7 w-8 shrink-0 rounded border border-dashed border-line" />
          <span className="flex-1 space-y-1.5 pt-0.5">
            <span className="block h-1 w-full rounded-full bg-line" />
            <span className="block h-1 w-4/5 rounded-full bg-line" />
            <span className="block h-1 w-3/5 rounded-full bg-line" />
          </span>
        </div>
      </div>

      {/* The distance, and the load still on it. */}
      <div className="relative flex-1">
        <span className="block h-2 overflow-hidden rounded-full bg-line/70">
          <span
            className={cn(
              "wm-creep block h-full rounded-full",
              on ? "bg-brand" : "bg-snow/35",
            )}
          />
        </span>
        {/* Where it was meant to be. */}
        <span className="absolute -top-2 right-0 h-6 border-r border-dashed border-ash/70" />
      </div>

      <svg
        viewBox="0 0 24 24"
        className={cn(
          "h-6 w-6 shrink-0 transition-colors duration-300 motion-reduce:transition-none",
          on ? "text-brand" : "text-ash",
        )}
        fill="none"
      >
        <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7.6V12l3 1.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Two ends of a connection, both present, and no connection. The gap is in
 *  the middle of the strip because that is where an expired credential sits:
 *  not at either end, where somebody would notice it. */
function ExpiredLink({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center gap-2">
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border bg-ink-3 transition-colors duration-300 motion-reduce:transition-none",
          on ? "border-brand" : "border-line",
        )}
      >
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-[2px] transition-colors duration-300",
            on ? "bg-brand" : "bg-snow/25",
          )}
        />
      </span>

      <span
        className={cn(
          "h-px flex-1 transition-colors duration-300 motion-reduce:transition-none",
          on ? "bg-brand/70" : "bg-line",
        )}
      />

      {/* The break, and the credential that held it open. */}
      <span className="relative flex h-7 w-16 shrink-0 items-center justify-center">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-ash/70" />
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "relative h-5 w-5 transition-colors duration-300 motion-reduce:transition-none",
            on ? "text-brand" : "text-ash",
          )}
          fill="none"
        >
          <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 12h9M17 9v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 20L20 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>

      <span
        className={cn(
          "h-px flex-1 transition-colors duration-300 motion-reduce:transition-none",
          on ? "bg-brand/70" : "bg-line",
        )}
      />

      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 motion-reduce:transition-none",
          on ? "border-brand" : "border-line",
        )}
      >
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors duration-300",
            on ? "bg-brand" : "bg-line",
          )}
        />
      </span>
    </div>
  );
}

/** A form that answers correctly, into nothing. The confirmation is drawn as
 *  working, because it is: that is why nobody looks in the tray. */
function LostEnquiry({ on }: { on: boolean }) {
  return (
    <div className="flex h-full items-center gap-3">
      <div className="w-[9rem] shrink-0 rounded-md border border-line bg-ink-3 p-2.5">
        <span className="block h-1.5 w-full rounded-full bg-line" />
        <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-line" />
        <span className="mt-2.5 flex items-center gap-2">
          <span className="block h-4 w-12 rounded-full bg-snow/25" />
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-snow/55" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* Where it should have gone, and did not. */}
      <span className="relative h-px flex-1">
        <span className="absolute inset-0 border-t border-dashed border-ash/70" />
        <svg
          viewBox="0 0 14 14"
          className={cn(
            "absolute -top-[6px] right-0 h-[13px] w-[13px] transition-colors duration-300 motion-reduce:transition-none",
            on ? "text-brand" : "text-ash",
          )}
          fill="none"
        >
          <path d="M3 3l5 4-5 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </span>

      <span
        className={cn(
          "flex h-12 w-[4.5rem] shrink-0 flex-col justify-end gap-1.5 rounded-md border border-dashed p-2 transition-colors duration-300 motion-reduce:transition-none",
          on ? "border-brand" : "border-line",
        )}
      >
        <span className="block h-1 w-full rounded-full bg-line/60" />
        <span className="block h-1 w-full rounded-full bg-line/60" />
      </span>
    </div>
  );
}

const DRAWINGS = [SlowPage, ExpiredLink, LostEnquiry];

export function SilentFailures({
  id,
  label,
  index,
  title,
  strokeTitle,
  unfinished,
  handles,
  handlesMark,
  arrangements,
  arrangementsMark,
  buildUp,
  unnoticed,
  faultsMark,
  consequenceMark,
  team,
  teamMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  unfinished: string;
  handles: string;
  handlesMark: string[];
  arrangements: string;
  arrangementsMark: string[];
  buildUp: string;
  unnoticed: string;
  /** The three faults, verbatim substrings of `unnoticed`, in order. */
  faultsMark: string[];
  consequenceMark: string;
  team: string;
  teamMark: string[];
}) {
  const [lit, setLit] = useState<number | null>(null);

  /** The client's sentence, with each named fault pointable. Stripped of tags
   *  the parts concatenate back to `unnoticed` exactly. */
  const legend = () => {
    const parts: React.ReactNode[] = [];
    let rest = unnoticed;
    faultsMark.forEach((phrase, i) => {
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
    // The consequence clause, which is the half of the sentence that costs
    // money, carried at the same weight wherever the pointer is.
    parts.push(
      <Fragment key="tail">
        <Marked text={rest} mark={consequenceMark} className="text-brand" />
      </Fragment>,
    );
    return parts;
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance leading-[1.2] text-snow">{unfinished}</p>}
          className="mb-14"
        />

        {/* What is handled, and the two ways it can be arranged. Marked inside
            the document's own sentences rather than lifted into chips. */}
        <div className="grid gap-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
          <Rise>
            <p className="leading-relaxed text-fog sm:text-lg">
              <Marked text={handles} mark={handlesMark} className="font-semibold text-snow" />
            </p>
          </Rise>
          <Rise delay={0.08} className="relative lg:pl-12">
            <span
              aria-hidden
              className="absolute left-0 top-1 hidden h-[calc(100%-0.25rem)] w-px bg-line lg:block"
            />
            <p className="leading-relaxed text-fog sm:text-lg">
              <Marked
                text={arrangements}
                mark={arrangementsMark}
                className="font-semibold text-brand"
              />
            </p>
          </Rise>
        </div>

        {/* The three faults. */}
        <div
          className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16"
          onPointerLeave={() => setLit(null)}
        >
          <div>
            <Rise>
              <p className="font-display text-[clamp(1.1rem,2.1vw,1.6rem)] font-extrabold uppercase leading-[1.16] text-ash">
                {buildUp}
              </p>
              <p className="mt-6 text-base leading-relaxed text-fog sm:text-lg">{legend()}</p>
            </Rise>
          </div>

          <div aria-hidden className="flex flex-col gap-3 lg:ml-auto lg:w-full lg:max-w-[28rem]">
            {DRAWINGS.map((Drawing, i) => {
              const on = lit === i;
              return (
                <div
                  key={i}
                  onPointerEnter={() => setLit(i)}
                  className={cn(
                    "h-[6rem] rounded-xl border px-5 py-4 transition-all duration-300 motion-reduce:transition-none",
                    on ? "border-brand bg-brand/[0.05]" : "border-line bg-ink-2",
                  )}
                >
                  <Drawing on={on} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Who is doing the work, and what that changes. */}
        <Rise delay={0.1} className="mt-16 border-t border-line pt-10">
          <p className="max-w-4xl leading-relaxed text-fog sm:text-lg">
            <Marked text={team} mark={teamMark} className="font-semibold text-snow" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

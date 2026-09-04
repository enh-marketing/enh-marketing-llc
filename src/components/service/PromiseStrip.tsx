"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { Promise as Commitment, PromisePlate } from "@/content/services/explainer-video";

/** The eight commitments, drawn as the one thing they add up to.
 *
 *  WHY A STRIP AND NOT EIGHT CARDS. Eight boxes in a grid say eight separate
 *  things are on offer. The document is describing one video: an audience
 *  settled before the script, a script written for speech, an approval taken
 *  early, a style chosen for the subject, technical facts signed off by the
 *  people responsible, review rounds written into the quote, the versions, and
 *  the two languages. Every one of those is a part of the same finished piece,
 *  so the section is that piece -- one strip, eight frames -- and the list
 *  beside it says what each frame is.
 *
 *  EVERY FRAME IS DRAWN FROM ITS OWN SENTENCE. Where the copy counts, the frame
 *  counts with it: promise four names character animation, motion graphics,
 *  screen recordings and filmed material, so its frame holds four marks;
 *  promise seven names landscape, square, vertical, subtitled and shorter
 *  edits, so its frame holds five. Nothing is drawn that the promise does not
 *  say, and nothing carries a figure -- no durations, no round counts, no
 *  prices, because the document fixes none of them and says twice that the
 *  proposal is where they are stated.
 *
 *  BOTH DIRECTIONS. Pointing at an entry lights its frame and pointing at a
 *  frame lights its entry, because a reader arriving at the drawing first has
 *  no other way in. Everything rests legible: the lit state adds contrast, it
 *  never restores something that was hidden. */

const FRAME_LABEL: Record<PromisePlate, string> = {
  audience: "Three people, one of them the one the explanation is for.",
  script: "Lines of script over a speech waveform.",
  storyboard: "Three storyboard cells with the approval mark on them.",
  style: "Four production methods side by side.",
  check: "A specification line signed off with a tick.",
  rounds: "Review stages, one after another.",
  versions: "Landscape, square and vertical cuts with a subtitled and a shorter edit.",
  language: "Two versions of the same speech, set in opposite directions.",
};

/** Each frame draws inside a 120 by 78 box. */
function Frame({ kind }: { kind: PromisePlate }) {
  switch (kind) {
    case "audience":
      return (
        <>
          <circle cx="30" cy="30" r="8" className="fill-none stroke-ash" strokeWidth="1.6" />
          <path d="M18 52a12 12 0 0124 0" className="fill-none stroke-ash" strokeWidth="1.6" />
          <circle cx="60" cy="26" r="10" className="fill-brand" />
          <path d="M45 54a15 15 0 0130 0" className="fill-brand" />
          <circle cx="92" cy="30" r="8" className="fill-none stroke-ash" strokeWidth="1.6" />
          <path d="M80 52a12 12 0 0124 0" className="fill-none stroke-ash" strokeWidth="1.6" />
        </>
      );
    case "script":
      return (
        <>
          <rect x="18" y="14" width="84" height="5" rx="2.5" className="fill-fog/45" />
          <rect x="18" y="26" width="62" height="5" rx="2.5" className="fill-fog/30" />
          <rect x="18" y="38" width="74" height="5" rx="2.5" className="fill-fog/30" />
          <path
            d="M18 60h8l5-12 5 22 5-16 4 9 5-14 5 18 5-11 5 6 5-13 5 16 5-8h34"
            fill="none"
            className="stroke-brand"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
    case "storyboard":
      return (
        <>
          <rect x="10" y="18" width="30" height="34" rx="4" fill="none" className="stroke-ash" strokeWidth="1.6" />
          <rect x="45" y="18" width="30" height="34" rx="4" fill="none" className="stroke-ash" strokeWidth="1.6" />
          <rect x="80" y="18" width="30" height="34" rx="4" fill="none" className="stroke-ash" strokeWidth="1.6" />
          <circle cx="60" cy="60" r="12" className="fill-brand" />
          <path
            d="M54 60l4 4 8-9"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
    case "style":
      return (
        <>
          <circle cx="24" cy="32" r="12" className="fill-brand/50" />
          <rect x="42" y="20" width="24" height="24" rx="3" fill="none" className="stroke-brand" strokeWidth="1.8" />
          <path d="M74 44l10-22 10 22z" fill="none" className="stroke-ash" strokeWidth="1.8" strokeLinejoin="round" />
          <rect x="18" y="56" width="84" height="10" rx="3" fill="none" className="stroke-ash" strokeWidth="1.6" />
        </>
      );
    case "check":
      return (
        <>
          <rect x="16" y="14" width="88" height="5" rx="2.5" className="fill-fog/35" />
          <rect x="16" y="26" width="66" height="5" rx="2.5" className="fill-fog/25" />
          <rect x="16" y="38" width="78" height="5" rx="2.5" className="fill-fog/25" />
          <rect x="16" y="52" width="52" height="16" rx="4" fill="none" className="stroke-brand" strokeWidth="1.6" />
          <path
            d="M78 60l7 7 15-17"
            fill="none"
            className="stroke-brand"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
    case "rounds":
      return (
        <>
          <circle cx="24" cy="39" r="11" className="fill-brand" />
          <circle cx="60" cy="39" r="11" fill="none" className="stroke-brand" strokeWidth="1.8" />
          <circle cx="96" cy="39" r="11" fill="none" className="stroke-ash" strokeWidth="1.8" />
          <path d="M37 39h10m-4-4l4 4-4 4M73 39h10m-4-4l4 4-4 4" fill="none" className="stroke-ash" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "versions":
      return (
        <>
          <rect x="8" y="20" width="38" height="22" rx="3" fill="none" className="stroke-brand" strokeWidth="1.6" />
          <rect x="52" y="16" width="30" height="30" rx="3" fill="none" className="stroke-brand" strokeWidth="1.6" />
          <rect x="90" y="12" width="20" height="34" rx="3" fill="none" className="stroke-brand" strokeWidth="1.6" />
          <rect x="20" y="58" width="46" height="8" rx="4" className="fill-brand/60" />
          <rect x="74" y="58" width="22" height="8" rx="4" className="fill-ash/50" />
        </>
      );
    case "language":
      return (
        <>
          <path
            d="M10 16h46a4 4 0 014 4v20a4 4 0 01-4 4H30l-10 9v-9h-10a4 4 0 01-4-4V20a4 4 0 014-4z"
            fill="none"
            className="stroke-brand"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <rect x="16" y="24" width="30" height="4" rx="2" className="fill-brand/70" />
          <rect x="16" y="33" width="20" height="4" rx="2" className="fill-brand/50" />
          <path
            d="M110 30h-40a4 4 0 00-4 4v20a4 4 0 004 4h26l10 9v-9h4a4 4 0 004-4V34a4 4 0 00-4-4z"
            fill="none"
            className="stroke-ash"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <rect x="74" y="38" width="30" height="4" rx="2" className="fill-fog/45" />
          <rect x="84" y="47" width="20" height="4" rx="2" className="fill-fog/30" />
        </>
      );
  }
}

export function PromiseStrip({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: Commitment[];
}) {
  const [hot, setHot] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
        />

        {/* One strip, eight frames. Scrolls on small screens rather than
            reflowing: a film strip that wraps is no longer a film strip. */}
        <Rise>
          <div className="-mx-1 overflow-x-auto pb-2">
            <div className="min-w-[46rem] rounded-2xl border border-line bg-ink-3 px-1 py-2">
              <div
                aria-hidden
                className="h-2.5 rounded-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, color-mix(in srgb, var(--color-line) 100%, transparent) 0 14px, transparent 14px 34px)",
                }}
              />
              <ul className="flex gap-1 py-2">
                {items.map((p, i) => {
                  const on = hot === i;
                  return (
                    <li key={p.title} className="flex-1">
                      <button
                        type="button"
                        onPointerEnter={() => setHot(i)}
                        onPointerLeave={() => setHot(null)}
                        onFocus={() => setHot(i)}
                        onBlur={() => setHot(null)}
                        aria-label={p.title}
                        className={cn(
                          "block w-full rounded-lg border px-2 py-3 transition-colors duration-400",
                          on
                            ? "border-brand bg-brand/[0.08]"
                            : "border-transparent bg-ink-2/60 hover:border-brand/40",
                        )}
                      >
                        <svg
                          viewBox="0 0 120 78"
                          className={cn(
                            "block w-full transition-opacity duration-400",
                            on ? "opacity-100" : "opacity-60",
                          )}
                          role="img"
                          aria-label={FRAME_LABEL[p.plate]}
                        >
                          <Frame kind={p.plate} />
                        </svg>
                        <span
                          aria-hidden
                          className={cn(
                            "mt-2 block text-center text-[0.65rem] font-bold tabular-nums transition-colors duration-300",
                            on ? "text-brand" : "text-ash",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div
                aria-hidden
                className="h-2.5 rounded-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, color-mix(in srgb, var(--color-line) 100%, transparent) 0 14px, transparent 14px 34px)",
                }}
              />
            </div>
          </div>
        </Rise>

        {/* What each frame is. Two columns of rows, not a grid of boxes: they
            are one list, and a box each would undo the strip above. */}
        <ol className="mt-12 grid gap-x-14 sm:grid-cols-2">
          {items.map((p, i) => (
            <li
              key={p.title}
              onPointerEnter={() => setHot(i)}
              onPointerLeave={() => setHot(null)}
              className={cn(
                "grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-line py-6 transition-colors duration-300",
                i < 2 && "sm:border-t",
                i === 0 && "border-t",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border text-[0.65rem] font-bold tabular-nums transition-colors duration-400",
                  hot === i ? "border-brand bg-brand text-white" : "border-line text-fog",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3
                  className={cn(
                    "font-display text-[clamp(1rem,1.7vw,1.2rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                    hot === i ? "text-brand" : "text-snow",
                  )}
                >
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-fog">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

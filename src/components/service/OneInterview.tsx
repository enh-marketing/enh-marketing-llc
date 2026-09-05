"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";
import type { Place, PlaceFrame } from "@/content/services/testimonial-video";

/** One recording, and everything taken out of it.
 *
 *  THE CLAIM IS ABOUT ORDER, AND IT LEADS. "The intended placement should be
 *  decided before filming because it affects the questions, length, framing and
 *  supporting footage." Four placement cards in a row say the opposite: they
 *  read as four things that happen afterwards, four separate jobs. They are not
 *  separate jobs. They are four different selections out of the same
 *  conversation, and until a reader sees that, the argument for deciding early
 *  has nothing to stand on.
 *
 *  SO THE SECTION IS THE RECORDING. One lane runs across it, and choosing a
 *  placement marks the parts of the interview it takes. A long one takes a long
 *  span; the concise version takes a short one; social takes several short
 *  vertical edits; paid takes "several openings and calls to action from the
 *  same interview", so it takes several. That arithmetic is the document's, and
 *  it is the only thing the spans assert.
 *
 *  NOTHING IS TIMED. The lane carries no numbers and no scale. The document
 *  gives one duration, hedged, inside a FAQ answer, and it stays there. A span
 *  is a position on a drawing, not a length in minutes.
 *
 *  THE FRAME IS THE OTHER HALF OF THE CLAIM. "Framing" is one of the four
 *  things the placement affects, so the destination redraws with the placement:
 *  a page, a deck, a phone, an ad slot with several openings. And the closing
 *  paragraph's own warning -- not "forcing a horizontal interview into a
 *  vertical frame" -- is drawn as exactly that: the crop, and the two edges it
 *  costs.
 *
 *  MOTION. The lane and the frame change together, driven by the reader, and
 *  every transition is cancelled under prefers-reduced-motion. */

const FRAME_LABEL: Record<PlaceFrame, string> = {
  page: "A web page carrying the full testimonial above its supporting copy.",
  deck: "A presentation slide with a short version set beside the argument.",
  phone: "A phone playing a vertical edit.",
  ad: "An advertising slot fed by several different openings.",
};

function Destination({ kind }: { kind: PlaceFrame }) {
  switch (kind) {
    case "page":
      return (
        <>
          <rect x="26" y="14" width="188" height="172" rx="8" fill="none" className="stroke-line" strokeWidth="1.6" />
          <path d="M26 40h188" className="stroke-line" strokeWidth="1.4" />
          <circle cx="42" cy="27" r="3.2" className="fill-ash/50" />
          <circle cx="53" cy="27" r="3.2" className="fill-ash/50" />
          <rect x="42" y="54" width="156" height="76" rx="5" className="fill-brand/12 stroke-brand" strokeWidth="1.6" />
          <path d="M112 78l20 12-20 12z" className="fill-brand" />
          <rect x="42" y="144" width="104" height="7" rx="3.5" className="fill-fog/30" />
          <rect x="42" y="158" width="156" height="6" rx="3" className="fill-fog/20" />
          <rect x="42" y="170" width="128" height="6" rx="3" className="fill-fog/20" />
        </>
      );
    case "deck":
      return (
        <>
          <rect x="18" y="24" width="204" height="126" rx="6" fill="none" className="stroke-line" strokeWidth="1.6" />
          <rect x="36" y="44" width="86" height="66" rx="4" className="fill-brand/12 stroke-brand" strokeWidth="1.6" />
          <path d="M70 66l16 11-16 11z" className="fill-brand" />
          <rect x="138" y="44" width="66" height="9" rx="4.5" className="fill-fog/35" />
          <rect x="138" y="62" width="52" height="6" rx="3" className="fill-fog/20" />
          <rect x="138" y="76" width="60" height="6" rx="3" className="fill-fog/20" />
          <rect x="138" y="90" width="44" height="6" rx="3" className="fill-fog/20" />
          <path d="M120 150v18M78 186h84" className="stroke-line" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M120 168l-30 18M120 168l30 18" className="stroke-line" strokeWidth="1.6" strokeLinecap="round" />
        </>
      );
    case "phone":
      return (
        <>
          <rect x="82" y="10" width="76" height="180" rx="12" fill="none" className="stroke-line" strokeWidth="1.6" />
          <rect x="90" y="24" width="60" height="140" rx="6" className="fill-brand/12 stroke-brand" strokeWidth="1.6" />
          <path d="M112 84l18 10-18 10z" className="fill-brand" />
          <rect x="98" y="140" width="44" height="6" rx="3" className="fill-snow/70" />
          <rect x="106" y="151" width="28" height="6" rx="3" className="fill-snow/45" />
          <path d="M108 16h24" className="stroke-line" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    default:
      return (
        <>
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect
                x="18"
                y={22 + k * 52}
                width="58"
                height="36"
                rx="4"
                className={k === 0 ? "fill-brand/16 stroke-brand" : "fill-none stroke-ash"}
                strokeWidth="1.5"
              />
              <path
                d={"M78 " + (40 + k * 52) + "C104 " + (40 + k * 52) + " 108 96 132 96"}
                fill="none"
                className="stroke-brand"
                strokeWidth="1.3"
                strokeDasharray={k === 0 ? "0" : "5 6"}
              />
            </g>
          ))}
          <rect x="134" y="52" width="92" height="88" rx="6" className="fill-brand/12 stroke-brand" strokeWidth="1.6" />
          <path d="M170 82l18 11-18 11z" className="fill-brand" />
          <rect x="148" y="120" width="64" height="10" rx="5" className="fill-brand" />
        </>
      );
  }
}

export function OneInterview({
  id,
  label,
  index,
  title,
  strokeTitle,
  claim,
  places,
  wider,
  widerMark,
  planning,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  claim: string;
  places: Place[];
  wider: string;
  widerMark: string[];
  planning: string;
}) {
  const [at, setAt] = useState(0);
  const active = places[at] ?? places[0];

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

        {/* The recording. Everything below is taken out of this. */}
        <Rise>
          <div className="rounded-2xl border border-line bg-ink-3 px-5 py-6 sm:px-8 sm:py-8">
            <svg
              viewBox="0 0 1000 120"
              role="img"
              aria-label={"One recorded interview, with the selections the chosen placement takes out of it marked on the lane."}
              /* The lane is stretched to fit rather than scaled, so at reading
                 width it is given a height instead of being squashed to a rule. */
              className="block h-16 w-full sm:h-auto"
              preserveAspectRatio="none"
            >
              {/* The interview itself. */}
              <rect x="0" y="46" width="1000" height="28" rx="6" className="fill-ink-2 stroke-line" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              {Array.from({ length: 80 }).map((_, k) => {
                const h = 6 + ((k * 37) % 17);
                return (
                  <rect
                    key={k}
                    x={8 + k * 12.3}
                    y={60 - h / 2}
                    width="4"
                    height={h}
                    rx="2"
                    className="fill-ash/45"
                  />
                );
              })}

              {/* What this placement takes. */}
              {active.spans.map(([start, len], k) => (
                <g key={k}>
                  <rect
                    x={start * 10}
                    y="40"
                    width={len * 10}
                    height="40"
                    rx="6"
                    className="fill-brand/25 stroke-brand transition-all duration-500 ease-out motion-reduce:transition-none"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={"M" + start * 10 + " 32v-16M" + (start + len) * 10 + " 32v-16"}
                    className="stroke-brand"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={"M" + start * 10 + " 20h" + len * 10}
                    className="stroke-brand"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
            </svg>
          </div>
        </Rise>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
          {/* Four placements, four different sets of selections. */}
          <ul>
            {places.map((p, i) => {
              const on = i === at;
              return (
                <li key={p.text}>
                  <button
                    type="button"
                    onClick={() => setAt(i)}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setAt(i);
                    }}
                    aria-pressed={on}
                    className={cn(
                      "group flex w-full items-start gap-5 border-b border-line py-6 text-left transition-colors duration-300 motion-reduce:transition-none",
                      i === 0 && "border-t",
                    )}
                  >
                    {/* How many selections this placement takes. */}
                    <span aria-hidden className="mt-2 flex shrink-0 items-center gap-1">
                      {p.spans.map((_, k) => (
                        <span
                          key={k}
                          className={cn(
                            "h-2 rounded-full transition-all duration-500 motion-reduce:transition-none",
                            on ? "bg-brand" : "bg-line group-hover:bg-brand/50",
                            p.spans.length === 1 ? "w-9" : "w-2",
                          )}
                        />
                      ))}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.18] transition-colors duration-300 motion-reduce:transition-none",
                        on ? "text-brand" : "text-snow group-hover:text-brand",
                      )}
                    >
                      {p.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Where the selection ends up. */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-line bg-ink-3 p-4 sm:p-6">
              <div className="relative">
                {places.map((p, i) => (
                  <svg
                    key={p.preview}
                    viewBox="0 0 240 200"
                    role={i === at ? "img" : undefined}
                    aria-hidden={i !== at}
                    aria-label={i === at ? FRAME_LABEL[p.preview] : undefined}
                    className={cn(
                      "w-full transition-opacity duration-500 motion-reduce:transition-none",
                      i === 0 ? "relative" : "absolute inset-0",
                      i === at ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Destination kind={p.preview} />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Everywhere else the same recording goes. */}
        <Rise delay={0.08} className="mt-14 border-t border-line pt-9">
          <p className="max-w-4xl leading-relaxed text-snow sm:text-lg">
            <Marked text={wider} mark={widerMark} />
          </p>
        </Rise>

        {/* Why the versions are planned during production and not afterwards. */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
          <Rise>
            <svg
              viewBox="0 0 300 150"
              role="img"
              aria-label="A vertical crop taken out of a landscape interview, with the two edges it removes hatched out."
              className="w-full max-w-sm"
            >
              <defs>
                <pattern id="oi-lost" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <path d="M0 0v7" className="stroke-ash" strokeWidth="1.2" opacity="0.55" />
                </pattern>
              </defs>
              <rect x="10" y="24" width="280" height="102" rx="5" fill="none" className="stroke-line" strokeWidth="1.6" />
              <rect x="12" y="26" width="90" height="98" fill="url(#oi-lost)" />
              <rect x="198" y="26" width="90" height="98" fill="url(#oi-lost)" />
              <circle cx="150" cy="66" r="20" className="fill-brand/35" />
              <path d="M118 126c0-18 14-32 32-32s32 14 32 32z" className="fill-brand/50" />
              <rect x="104" y="10" width="92" height="130" rx="5" fill="none" className="stroke-brand" strokeWidth="2" />
              <path d="M104 10h-14M196 10h14M104 140h-14M196 140h14" className="stroke-brand" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </Rise>
          <Rise delay={0.08}>
            <p className="border-l-2 border-brand pl-6 leading-relaxed text-fog sm:text-lg">
              {planning}
            </p>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

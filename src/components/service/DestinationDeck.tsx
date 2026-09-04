"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";
import type { Place, PlaceKind } from "@/content/services/explainer-video";

/** Where the video goes, drawn as the screens it goes on.
 *
 *  THE CLAIM IS A DEPENDENCY, NOT A LIST. The document says the intended
 *  location "affects its script, pacing, dimensions and call to action", which
 *  is four things decided somewhere else. Four sentences in a four-up grid say
 *  none of that: they read as four interchangeable bullets. Here the four
 *  placements select one screen, and the screen changes, so the dependency is
 *  the thing the reader operates.
 *
 *  EVERY SCREEN IS ITS OWN SENTENCE, DRAWN. The homepage introduces the overall
 *  offer, so its screen is one wide band above the page. The product page needs
 *  a more detailed demonstration, so its screen carries callouts. Sales teams
 *  use concise versions, so that screen is short and pointed forward. The
 *  exhibition version works without sound, so it carries subtitles and a
 *  silenced speaker. No screen carries a duration, a dimension or a number: the
 *  document gives none, and inventing one here would be a specification.
 *
 *  THE CHANNELS ARE A FAN, NOT A ROW OF PILLS. The sentence is one video
 *  prepared for seven places, so it is drawn as one source reaching seven. The
 *  lines are geometry only and carry no order or weight.
 *
 *  THE LIMIT TRAVELS WITH THE CLAIM IT LIMITS. The discoverability sentence and
 *  the sentence saying it guarantees nothing sit in the same block, and cannot
 *  be separated by a layout change without the first one reading as a promise
 *  about rankings. */

const SCREEN_LABEL: Record<PlaceKind, string> = {
  homepage: "A web page with one wide video band across the top of it.",
  product: "A product page with a video panel and callout markers on the detail beside it.",
  sales: "A presentation screen showing a short version, pointed forward to a follow-up.",
  exhibition: "A standing display panel playing with subtitles and the sound silenced.",
};

function Screen({ kind }: { kind: PlaceKind }) {
  const frame = "stroke-line";
  const lit = "stroke-brand";
  if (kind === "homepage")
    return (
      <>
        <rect x="30" y="24" width="360" height="212" rx="10" fill="none" className={frame} strokeWidth="1.6" />
        <path d="M30 52h360" className={frame} strokeWidth="1.6" />
        <circle cx="48" cy="38" r="3.4" className="fill-ash/60" />
        <circle cx="60" cy="38" r="3.4" className="fill-ash/60" />
        <circle cx="72" cy="38" r="3.4" className="fill-ash/60" />
        {/* The whole offer, once, across the top. */}
        <rect x="48" y="68" width="324" height="92" rx="7" className="fill-brand/12 stroke-brand" strokeWidth="1.6" />
        <path d="M199 100l30 18-30 18z" className="fill-brand" />
        <rect x="48" y="176" width="150" height="9" rx="4.5" className="fill-fog/30" />
        <rect x="48" y="194" width="230" height="9" rx="4.5" className="fill-fog/20" />
        <rect x="48" y="212" width="190" height="9" rx="4.5" className="fill-fog/20" />
      </>
    );
  if (kind === "product")
    return (
      <>
        <rect x="30" y="24" width="360" height="212" rx="10" fill="none" className={frame} strokeWidth="1.6" />
        <path d="M30 52h360" className={frame} strokeWidth="1.6" />
        <circle cx="48" cy="38" r="3.4" className="fill-ash/60" />
        <circle cx="60" cy="38" r="3.4" className="fill-ash/60" />
        <circle cx="72" cy="38" r="3.4" className="fill-ash/60" />
        {/* The demonstration, with the detail called out beside it. */}
        <rect x="48" y="70" width="192" height="146" rx="7" className="fill-brand/12 stroke-brand" strokeWidth="1.6" />
        <path d="M132 130l26 15-26 15z" className="fill-brand" />
        <circle cx="90" cy="98" r="7" fill="none" className={lit} strokeWidth="1.5" />
        <path d="M97 98h34" className={lit} strokeWidth="1.4" strokeDasharray="4 4" />
        <circle cx="196" cy="188" r="7" fill="none" className={lit} strokeWidth="1.5" />
        <path d="M189 188h-34" className={lit} strokeWidth="1.4" strokeDasharray="4 4" />
        <rect x="258" y="70" width="114" height="12" rx="6" className="fill-fog/30" />
        <rect x="258" y="94" width="86" height="9" rx="4.5" className="fill-fog/20" />
        <rect x="258" y="112" width="106" height="9" rx="4.5" className="fill-fog/20" />
        <rect x="258" y="130" width="72" height="9" rx="4.5" className="fill-fog/20" />
        <rect x="258" y="176" width="114" height="34" rx="6" fill="none" className={lit} strokeWidth="1.6" />
      </>
    );
  if (kind === "sales")
    return (
      <>
        {/* A screen in the room, not a page. */}
        <rect x="52" y="26" width="316" height="164" rx="8" fill="none" className={frame} strokeWidth="1.6" />
        <rect x="70" y="44" width="280" height="128" rx="5" className="fill-brand/12 stroke-brand" strokeWidth="1.6" />
        <path d="M196 92l30 16-30 16z" className="fill-brand" />
        <path d="M210 190v22M150 236h120" className={frame} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M210 212l-40 24M210 212l40 24" className={frame} strokeWidth="1.6" strokeLinecap="round" />
        {/* The concise version: a short run, and the follow-up after it. */}
        <rect x="70" y="204" width="180" height="6" rx="3" className="fill-line" />
        <rect x="70" y="204" width="58" height="6" rx="3" className="fill-brand" />
        <path d="M296 207h44m-12-8l12 8-12 8" fill="none" className={lit} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    );
  return (
    /* Shifted to sit on the box's own centre line: the silenced speaker hangs
       off the left of the panel, and without this the whole drawing reads as
       pushed to one side. */
    <g transform="translate(40, 0)">
      {/* A standing panel on a floor, playing to a room it cannot be heard in. */}
      <rect x="132" y="14" width="156" height="212" rx="10" fill="none" className={frame} strokeWidth="1.6" />
      <rect x="146" y="30" width="128" height="150" rx="6" className="fill-brand/12 stroke-brand" strokeWidth="1.6" />
      <path d="M198 92l26 14-26 14z" className="fill-brand" />
      {/* Subtitles, which is how it works without sound. */}
      <rect x="156" y="150" width="108" height="8" rx="4" className="fill-brand/70" />
      <rect x="172" y="164" width="76" height="8" rx="4" className="fill-brand/50" />
      <rect x="150" y="192" width="120" height="8" rx="4" className="fill-fog/20" />
      <path d="M112 226h196" className={frame} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M60 96l-16 10H30v22h14l16 10z" fill="none" className="stroke-ash" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M72 104l24 24m0-24l-24 24" className="stroke-ash" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  );
}

export function DestinationDeck({
  id,
  label,
  index,
  title,
  strokeTitle,
  claim,
  claimMark,
  places,
  channelsLead,
  channels,
  discovery,
  discoveryMark,
  discoveryCaveat,
  connected,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  claim: string;
  claimMark: string;
  places: Place[];
  channelsLead: string;
  channels: string[];
  discovery: string;
  discoveryMark: string;
  discoveryCaveat: string;
  connected: string;
}) {
  const [at, setAt] = useState(0);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="statement font-display font-extrabold uppercase leading-[1.16] text-snow">
              <Marked text={claim} mark={claimMark} />
            </p>
          }
          className="mb-12"
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
          {/* Four placements. Unnumbered: they are alternatives, not an order. */}
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
                      "group flex w-full items-start gap-4 border-b border-line py-5 text-left transition-colors duration-300",
                      i === 0 && "border-t",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "mt-2 h-1.5 shrink-0 rounded-full transition-all duration-500",
                        on ? "w-10 bg-brand" : "w-4 bg-line group-hover:bg-brand/60",
                      )}
                    />
                    <span
                      className={cn(
                        "leading-relaxed transition-colors duration-300 sm:text-lg",
                        on ? "text-snow" : "text-fog group-hover:text-snow",
                      )}
                    >
                      {p.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* The screen the selected sentence puts the video on. */}
          <div className="lg:sticky lg:top-24">
            <div className="relative rounded-2xl border border-line bg-ink-3 p-3 sm:p-5">
              <div className="relative">
                {places.map((p, i) => (
                  <svg
                    key={p.kind}
                    viewBox="0 0 420 260"
                    aria-hidden={i !== at}
                    role={i === at ? "img" : undefined}
                    aria-label={i === at ? SCREEN_LABEL[p.kind] : undefined}
                    className={cn(
                      "w-full transition-opacity duration-500",
                      i === 0 ? "relative" : "absolute inset-0",
                      i === at ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Screen kind={p.kind} />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* One video, prepared for seven places. */}
        <div className="mt-14 border-t border-line pt-10">
          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_5rem_minmax(0,1fr)] lg:gap-0">
            <Rise className="flex items-center">
              <p className="leading-relaxed text-snow sm:text-lg">{channelsLead}</p>
            </Rise>

            <div aria-hidden className="hidden lg:block">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="h-full w-full text-brand/40"
              >
                {channels.map((ch, i) => (
                  <path
                    key={ch}
                    d={"M2 50C40 50 56 " + (((i + 0.5) * 100) / channels.length).toFixed(2) + " 98 " + (((i + 0.5) * 100) / channels.length).toFixed(2)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <circle cx="2" cy="50" r="3" fill="currentColor" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>

            <ul
              className="grid gap-2 lg:gap-0"
              style={{ gridTemplateRows: "repeat(" + channels.length + ", minmax(0, 1fr))" }}
            >
              {channels.map((ch) => (
                <li key={ch} className="flex items-center">
                  <span className="font-display w-full rounded-lg border border-brand/40 bg-brand/[0.06] px-4 py-2 text-sm font-bold text-snow transition-colors duration-300 hover:border-brand hover:text-brand">
                    {ch}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The four elements that help the subject be understood elsewhere, and
            the limit the document attaches to them. */}
        <div className="mt-12 grid gap-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <Rise>
            <p className="leading-relaxed text-snow sm:text-lg">
              <Marked text={discovery} mark={discoveryMark} />
            </p>
            <p className="mt-5 flex gap-3 rounded-xl border border-line bg-ink-3 px-5 py-4 text-sm leading-relaxed text-ash">
              <span aria-hidden className="mt-0.5 shrink-0 text-brand">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
                </svg>
              </span>
              <span>{discoveryCaveat}</span>
            </p>
          </Rise>

          <Rise delay={0.1}>
            <p className="border-l-2 border-brand pl-6 leading-relaxed text-fog">{connected}</p>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

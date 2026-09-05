"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The programme monitor: what the ten supporting elements are actually for.
 *
 *  WHAT THIS SECTION HAS TO CONVEY. One sentence carries it: supporting
 *  footage "helps the edit explain what the speaker is referring to and
 *  reduces the amount of time the viewer spends looking at one fixed shot."
 *  That is a claim about what the viewer sees, and a grid of ten bordered
 *  chips cannot make it -- the old treatment listed the material and never
 *  showed the difference it makes.
 *
 *  So the section shows the monitor. Turn the supporting material off and the
 *  frame holds the interview and nothing else: one fixed shot, exactly the
 *  thing the copy warns about. Turn it on and the frame starts cutting away to
 *  the workplace, the product, the screen, the slides, while the titles,
 *  subtitles and music sit on top and stay. The list beside it lights up in
 *  time, so the reader can see which element is on screen as it happens.
 *
 *  CUTAWAYS AND OVERLAYS BEHAVE DIFFERENTLY, BECAUSE THEY DO. Seven of the
 *  ten replace the picture; three of them sit over it and persist. Treating
 *  all ten as interchangeable chips lost that, and it is the distinction an
 *  editor would make first.
 *
 *  NOTHING IS TIMED OR COUNTED. No durations, no shot counts, no timecode:
 *  this document gives none. The cycle is a rhythm, not a schedule.
 *
 *  It starts with the supporting material on, so the section opens on the
 *  finished thing rather than on the complaint, and the control is there to
 *  take it away. Under reduced motion it holds one composed frame and does not
 *  cut at all. */

type Kind = "cutaway" | "overlay";

/** The ten elements the document lists, in its order, each tagged with what it
 *  actually does to the picture. Indexed against the content array rather than
 *  duplicating its wording here. */
const LAYERS: { kind: Kind; shot: string }[] = [
  { kind: "cutaway", shot: "angle" }, //  1 A second camera angle
  { kind: "cutaway", shot: "room" }, //   2 Workplace and process footage
  { kind: "cutaway", shot: "product" }, // 3 Product demonstrations
  { kind: "cutaway", shot: "screen" }, //  4 Screen recordings
  { kind: "cutaway", shot: "slide" }, //   5 Presentation slides
  { kind: "cutaway", shot: "photo" }, //   6 Photographs and archive material
  { kind: "overlay", shot: "title" }, //   7 Titles and lower-third graphics
  { kind: "overlay", shot: "caption" }, // 8 Subtitles and transcripts
  { kind: "overlay", shot: "audio" }, //   9 Licensed music
  { kind: "cutaway", shot: "chart" }, //  10 Animation and infographic elements
];

/** Which layers are cutaways, as indices into the list above. The monitor
 *  cycles through these and returns to the interview between each, which is
 *  what an edit actually does. */
const CUTAWAYS = LAYERS.map((l, i) => (l.kind === "cutaway" ? i : -1)).filter((i) => i >= 0);

const STEP_MS = 1700;

/** Interface labels. The document has no wording for a control it never
 *  imagined; these name an action and two kinds of layer, and claim nothing. */
const LABEL = {
  on: "Interview only",
  off: "Add the supporting material",
  cutaway: "Cut to",
  overlay: "Over the top",
  base: "Interview",
};

/* Geometry. The frame sits at the top at 16:9, the seven cutaway sources sit
   along the bottom, and every edge converges on one node just under the frame
   before a single stem carries it in. Coordinates are derived from these so the
   parts stay attached if any one of them moves. */
const FRAME = { w: 256, h: 144 };
const JOIN = { x: 128, y: 178 };
const CHIP = { y: 222, w: 28, h: 14 };
const CHIP_X = (i: number) => 7.5 + i * 35.5;
const CHIP_CX = (i: number) => CHIP_X(i) + CHIP.w / 2;

/** One source feeding the join, then the stem into the frame. */
const FEED = (i: number) =>
  `M ${CHIP_CX(i)} ${CHIP.y} C ${CHIP_CX(i)} ${CHIP.y - 22}, ${JOIN.x} ${JOIN.y + 18}, ${JOIN.x} ${JOIN.y}`;
const STEM = `M ${JOIN.x} ${JOIN.y - 5} V ${FRAME.h}`;

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.6 } as const;

/** The interview itself: the shot everything else cuts away from. */
function Interview({ dim }: { dim?: boolean }) {
  return (
    <g className={dim ? "text-line" : "text-brand"} {...line}>
      <circle cx="112" cy="74" r="21" />
      <path d="M74 132c0-21 17-34 38-34s38 13 38 34" />
    </g>
  );
}

/** Each cutaway, drawn as the thing it is. Marks only: nothing here is a
 *  photograph, a logo or a client's product. */
function Shot({ shot }: { shot: string }) {
  return (
    <g className="text-brand" {...line}>
      {shot === "angle" && (
        <>
          {/* The same person, framed wider and from the other side, with the
              operator's framing brackets. */}
          <circle cx="150" cy="66" r="17" />
          <path d="M118 128c0-18 14-29 32-29s32 11 32 29" />
          <path d="M96 34v-12h12M204 34v-12h-12" opacity="0.55" />
        </>
      )}
      {shot === "room" && (
        <>
          <path d="M40 124h176" />
          <path d="M62 124V78h44v46M132 124V92h50v32" />
          <path d="M74 92h20M144 106h26" opacity="0.55" />
        </>
      )}
      {shot === "product" && (
        <>
          <rect x="96" y="58" width="64" height="56" rx="6" />
          <path d="M96 78h64" opacity="0.6" />
          <path d="M64 124c14-10 26-14 40-14M192 124c-14-10-26-14-40-14" opacity="0.5" />
        </>
      )}
      {shot === "screen" && (
        <>
          <rect x="56" y="46" width="144" height="82" rx="6" />
          <path d="M56 64h144" opacity="0.6" />
          <path d="M72 82h58M72 96h84M72 110h44" opacity="0.75" />
        </>
      )}
      {shot === "slide" && (
        <>
          <rect x="60" y="46" width="136" height="80" rx="5" />
          <path d="M78 68h62" strokeWidth="3" />
          <path d="M78 88h100M78 102h74" opacity="0.7" />
        </>
      )}
      {shot === "photo" && (
        <>
          <rect x="72" y="42" width="112" height="76" rx="4" transform="rotate(-4 128 80)" />
          <rect x="84" y="56" width="112" height="76" rx="4" transform="rotate(4 140 94)" />
        </>
      )}
      {shot === "chart" && (
        <>
          <path d="M56 124h150" opacity="0.6" />
          <path d="M78 124V88M108 124V64M138 124V100M168 124V74" strokeWidth="7" />
        </>
      )}
    </g>
  );
}

export function SupportingLayers({
  lead,
  itemsLead,
  items,
  tail,
}: {
  lead: string;
  itemsLead: string;
  items: string[];
  tail: string;
}) {
  const [on, setOn] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!on) return;
    // A reader who asked for no motion simply never gets an interval, so the
    // monitor holds one composed frame -- the first cutaway with the overlays
    // over it -- and never cuts. No state is needed to express that.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setStep((s) => s + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [on]);

  /* The edit returns to the interview between cutaways, so odd steps are the
     interview and even steps are the next piece of supporting footage. */
  const onInterview = !on || step % 2 === 1;
  /** Which of the seven source chips is feeding the frame, and which item in
   *  the document's list that chip is. */
  const activeCutSlot = Math.floor(step / 2) % CUTAWAYS.length;
  const cutIndex = CUTAWAYS[activeCutSlot];
  const activeCut = on && !onInterview ? cutIndex : -1;

  return (
    <div>
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* ---- the monitor ---- */}
        <div>
          <div className="rounded-2xl border border-line bg-ink-3 p-4 sm:p-5">
            <div className="relative">
              <svg viewBox="0 0 256 250" className="block w-full" aria-hidden>
                <defs>
                  <clipPath id="sl-frame">
                    <rect x="0" y="0" width={FRAME.w} height={FRAME.h} rx="8" />
                  </clipPath>
                  {/* A wash behind the frame, so the picture is lit rather than
                      flat. The same device the AI Automation hero uses under
                      its core. */}
                  <radialGradient id="sl-glow">
                    <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.2" />
                    <stop offset="55%" stopColor="var(--color-brand)" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {on && <ellipse cx={FRAME.w / 2} cy="72" rx="140" ry="86" fill="url(#sl-glow)" />}

                {/* ---- the frame ---- */}
                <g clipPath="url(#sl-frame)">
                  <rect x="0" y="0" width={FRAME.w} height={FRAME.h} fill="var(--color-ink-2)" />
                  <g className="text-line" opacity="0.45">
                    <path
                      d="M85.3 0v144M170.7 0v144M0 48h256M0 96h256"
                      stroke="currentColor"
                      strokeWidth="0.8"
                    />
                  </g>
                  {/* Lifted clear of the lower third and the subtitles: a
                      lower third does overlay the subject, but it should not
                      land on the shoulder line. */}
                  <g transform="translate(0,-8)">
                    {onInterview ? <Interview /> : <Shot shot={LAYERS[cutIndex].shot} />}
                  </g>

                  {/* Overlays. They sit on the picture and stay, which is the
                      whole difference between them and a cutaway. */}
                  {on && (
                    <g className="text-brand">
                      <rect x="16" y="104" width="86" height="7" rx="3.5" fill="currentColor" opacity="0.85" />
                      <rect x="16" y="115" width="54" height="5" rx="2.5" fill="currentColor" opacity="0.45" />
                      <rect x="78" y="130" width="100" height="5" rx="2.5" fill="currentColor" opacity="0.6" />
                      <g transform="translate(224 14)">
                        {[10, 16, 7, 13].map((h, i) => (
                          <rect key={i} x={i * 5} y={20 - h} width="3" height={h} rx="1.5" fill="currentColor" opacity="0.7" />
                        ))}
                      </g>
                    </g>
                  )}
                </g>
                <rect
                  x="0.5"
                  y="0.5"
                  width={FRAME.w - 1}
                  height={FRAME.h - 1}
                  rx="8"
                  fill="none"
                  stroke="var(--color-line)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />

                {/* ---- permanent structure: every feed, always drawn faint, so
                        the picture is whole in a still frame ---- */}
                <g fill="none" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke">
                  {CUTAWAYS.map((_, i) => (
                    <path key={i} d={FEED(i)} />
                  ))}
                  <path d={STEM} />
                </g>

                {/* Resting states. Nothing starts invisible. */}
                <g opacity="0.16">
                  {CUTAWAYS.map((_, i) => (
                    <rect
                      key={i}
                      x={CHIP_X(i)}
                      y={CHIP.y}
                      width={CHIP.w}
                      height={CHIP.h}
                      rx="3"
                      fill="none"
                      stroke="var(--color-fog)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>

                {/* The join, always present. */}
                <circle cx={JOIN.x} cy={JOIN.y} r="9" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

                {/* ---- one step. Re-keyed so every CSS animation restarts.
                        Reuses the agent-* primitives from globals.css: they are
                        generic, and their reduced-motion handling is already
                        correct. ---- */}
                {on && (
                  <g key={step}>
                    {/* The run clock, swept once around the join over the whole
                        step: the duration of the cut made visible. */}
                    <circle
                      cx={JOIN.x}
                      cy={JOIN.y}
                      r="13"
                      fill="none"
                      stroke="var(--color-brand)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      opacity="0.5"
                      pathLength="100"
                      vectorEffect="non-scaling-stroke"
                      transform={`rotate(-90 ${JOIN.x} ${JOIN.y})`}
                      className="agent-sweep"
                      style={{ animationDuration: `${STEP_MS}ms` }}
                    />

                    {!onInterview && (
                      <>
                        {/* The source that is feeding the frame right now. */}
                        <rect
                          x={CHIP_X(activeCutSlot)}
                          y={CHIP.y}
                          width={CHIP.w}
                          height={CHIP.h}
                          rx="3"
                          fill="none"
                          stroke="var(--color-brand)"
                          strokeWidth="1.2"
                          vectorEffect="non-scaling-stroke"
                          className="agent-lit"
                        />
                        <circle cx={CHIP_X(activeCutSlot) + 5} cy={CHIP.y + CHIP.h / 2} r="1.8" fill="var(--color-brand)" className="agent-lit" />

                        {/* Travelling into the frame. */}
                        <path
                          d={FEED(activeCutSlot)}
                          pathLength="100"
                          fill="none"
                          stroke="var(--color-brand)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                          className="agent-signal"
                        />
                        <path
                          d={STEM}
                          pathLength="100"
                          fill="none"
                          stroke="var(--color-brand)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                          className="agent-signal"
                          style={{ animationDelay: "420ms" }}
                        />
                        <circle cx={JOIN.x} cy={JOIN.y} r="4" fill="var(--color-brand)" className="agent-lit" style={{ animationDelay: "500ms" }} />
                      </>
                    )}
                  </g>
                )}
              </svg>

              {/* What is on screen right now, named. */}
              <p className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-ink-2/85 px-3 py-1">
                <span
                  aria-hidden
                  className={cn("h-1.5 w-1.5 rounded-full", onInterview ? "bg-line" : "bg-brand")}
                />
                <span className="font-display text-[0.6875rem] font-bold uppercase tracking-wide text-ash">
                  {onInterview ? LABEL.base : items[cutIndex]}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOn((v) => !v)}
            aria-pressed={!on}
            className={cn(
              "mt-5 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
              on
                ? "border-line text-snow hover:border-brand hover:text-brand"
                : "border-brand bg-brand text-white hover:bg-brand-deep",
            )}
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
              <rect x="2.5" y="4" width="15" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
              {on ? (
                <path d="M7 10h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M10 7v6M7 10h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
            {on ? LABEL.on : LABEL.off}
          </button>
        </div>

        {/* ---- the material ---- */}
        <div>
          <p className="leading-relaxed text-snow sm:text-lg">{lead}</p>

          <p className="font-display mt-10 text-[0.6875rem] font-bold uppercase tracking-wide text-ash">
            {itemsLead}
          </p>

          <ul className="mt-5 border-t border-line">
            {items.map((item, i) => {
              const layer = LAYERS[i];
              const live = on && (layer?.kind === "overlay" || activeCut === i);
              return (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-line py-3"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-4 w-1 shrink-0 rounded-full transition-colors duration-300",
                      live ? "bg-brand" : "bg-line",
                    )}
                  />
                  <span
                    className={cn(
                      "flex-1 text-sm leading-snug transition-colors duration-300",
                      live ? "text-snow" : "text-fog",
                    )}
                  >
                    {item}
                  </span>
                  <span
                    className={cn(
                      "font-display shrink-0 text-[0.6875rem] font-bold uppercase tracking-wide transition-colors duration-300",
                      live ? "text-brand" : "text-line",
                    )}
                  >
                    {layer?.kind === "overlay" ? LABEL.overlay : LABEL.cutaway}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="mt-10 max-w-3xl border-t border-line pt-6 text-sm leading-relaxed text-ash">
        {tail}
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Crosslink } from "@/components/ui/Crosslink";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";
import type { Destination, Version } from "@/content/services/corporate-video";

/** Distribution, run as the thing that decides what gets filmed.
 *
 *  THE SENTENCE IS CAUSAL AND IT LEADS. "Distribution should be decided before
 *  the shoot because it affects the script, framing, duration, and footage
 *  required." A list of places the video ends up puts distribution after
 *  production and throws the argument away, so this section runs the other way
 *  round: the frames first, then the places that need them.
 *
 *  THE REFRAME IS THE ARGUMENT, AND IT IS OPERABLE. One composition, and the
 *  four versions the document names drawn over it at their real proportions.
 *  Choosing one darkens everything outside it, which is what "affects the
 *  framing" means in practice: a vertical crop of a landscape composition loses
 *  both edges. Seeing the frame close makes the case that no sentence has to,
 *  and it is the reader who closes it.
 *
 *  THE RATIOS ARE PRESENTATION, NOT A CLAIM. The document names the four
 *  versions and never gives their aspect ratios. 16:9, 9:16 and 1:1 are the
 *  standard frames those words refer to, and they are used to draw boxes and
 *  nothing else. No duration, no file size and no count appears anywhere.
 *
 *  EACH DESTINATION IS ITS OWN SENTENCE, DRAWN. A main film with shorter
 *  service-page videos under it; a player with a search beneath it; a feed
 *  card; a training module inside a portal; a short cut with its opening
 *  marked. Every element is a noun from the sentence beside it.
 *
 *  THE ONE FIGURE KEEPS ITS QUALIFIER. The reach number is the only measurement
 *  in the whole document, and the sentence saying it is advertising reach rather
 *  than a user count is locked to it: same block, no layout that can separate
 *  them, and the figure is marked inside its own sentence rather than lifted
 *  out into a statistic of its own.
 *
 *  MOTION. Blocks arrive once; after that only the reader moves the frame.
 *  Every transition is cancelled under prefers-reduced-motion. */

/** The safe area every version is cropped out of. */
const STAGE = { w: 640, h: 400 };

function cropOf(v: Version) {
  const [rw, rh] = v.ratio;
  // Fit the ratio inside the stage, centred: the largest box of that shape the
  // composition can give it.
  const scale = Math.min(STAGE.w / rw, STAGE.h / rh) * 0.92;
  const w = rw * scale;
  const h = rh * scale;
  return { x: (STAGE.w - w) / 2, y: (STAGE.h - h) / 2, w, h };
}

function DestinationDrawing({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <>
          <rect x="6" y="8" width="188" height="106" rx="7" fill="none" className="stroke-line" strokeWidth="1.5" />
          <rect x="18" y="20" width="164" height="44" rx="4" className="fill-brand/14 stroke-brand" strokeWidth="1.5" />
          <path d="M93 33l17 9-17 9z" className="fill-brand" />
          <rect x="18" y="74" width="76" height="30" rx="4" fill="none" className="stroke-ash" strokeWidth="1.4" />
          <rect x="106" y="74" width="76" height="30" rx="4" fill="none" className="stroke-ash" strokeWidth="1.4" />
          <path d="M50 85l9 5-9 5zM138 85l9 5-9 5z" className="fill-ash" />
        </>
      );
    case 1:
      return (
        <>
          <rect x="18" y="8" width="164" height="66" rx="8" className="fill-brand/14 stroke-brand" strokeWidth="1.5" />
          <path d="M92 30l18 11-18 11z" className="fill-brand" />
          <rect x="30" y="88" width="140" height="24" rx="12" fill="none" className="stroke-ash" strokeWidth="1.5" />
          <circle cx="48" cy="100" r="6" fill="none" className="stroke-brand" strokeWidth="1.6" />
          <path d="M52 104l5 5" className="stroke-brand" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="64" y="97" width="72" height="5" rx="2.5" className="fill-fog/35" />
        </>
      );
    case 2:
      return (
        <>
          <rect x="22" y="10" width="156" height="102" rx="8" fill="none" className="stroke-line" strokeWidth="1.5" />
          <circle cx="42" cy="30" r="9" className="fill-ash/55" />
          <rect x="58" y="24" width="54" height="5" rx="2.5" className="fill-fog/40" />
          <rect x="58" y="34" width="36" height="4" rx="2" className="fill-fog/22" />
          <rect x="34" y="48" width="132" height="40" rx="4" className="fill-brand/14 stroke-brand" strokeWidth="1.5" />
          <path d="M94 61l14 7-14 7z" className="fill-brand" />
          <circle cx="42" cy="100" r="4" className="fill-brand" />
          <circle cx="56" cy="100" r="4" className="fill-brand/60" />
          <circle cx="70" cy="100" r="4" className="fill-brand/35" />
        </>
      );
    case 3:
      return (
        <>
          <rect x="10" y="10" width="180" height="102" rx="7" fill="none" className="stroke-line" strokeWidth="1.5" />
          <path d="M10 30h180" className="stroke-line" strokeWidth="1.4" />
          <rect x="22" y="42" width="60" height="40" rx="4" className="fill-brand/14 stroke-brand" strokeWidth="1.5" />
          <path d="M45 56l12 6-12 6z" className="fill-brand" />
          <rect x="94" y="44" width="74" height="5" rx="2.5" className="fill-fog/40" />
          <rect x="94" y="56" width="60" height="5" rx="2.5" className="fill-fog/25" />
          <rect x="94" y="68" width="68" height="5" rx="2.5" className="fill-fog/25" />
          <path d="M22 94h56" className="stroke-brand" strokeWidth="3" strokeLinecap="round" />
          <path d="M78 94h90" className="stroke-line" strokeWidth="3" strokeLinecap="round" />
        </>
      );
    default:
      return (
        <>
          <rect x="14" y="14" width="172" height="52" rx="6" className="fill-brand/14 stroke-brand" strokeWidth="1.5" />
          <path d="M40 30v20l16-10z" className="fill-brand" />
          <rect x="14" y="82" width="172" height="10" rx="5" className="fill-line" />
          <rect x="14" y="82" width="46" height="10" rx="5" className="fill-brand" />
          <path d="M28 104V72" className="stroke-brand" strokeWidth="1.6" strokeDasharray="4 4" />
          <path d="M22 76l6-6 6 6" fill="none" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
  }
}

export function DistributionReel({
  id,
  label,
  index,
  title,
  strokeTitle,
  claim,
  versionsLead,
  versions,
  versionsTail,
  destinations,
  reach,
  reachFigure,
  reachCaveat,
  discoveryLead,
  discoveryItems,
  discoveryLink,
  discoveryTail,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  claim: string;
  versionsLead: string;
  versions: Version[];
  versionsTail: string;
  destinations: Destination[];
  reach: string;
  reachFigure: string;
  reachCaveat: string;
  discoveryLead: string;
  discoveryItems: string[];
  discoveryLink: { label: string; href: string };
  discoveryTail: string;
}) {
  const [frame, setFrame] = useState(0);
  const crop = cropOf(versions[frame] ?? versions[0]);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "One shoot, four frames, five destinations" }}
          className="mb-12"
        />

        <Rise>
          <p className="statement font-display max-w-4xl font-extrabold uppercase leading-[1.14] text-snow">
            {claim}
          </p>
        </Rise>

        {/* The reframe. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14">
          <Rise>
            <div className="rounded-2xl border border-line bg-ink-3 p-3 sm:p-4">
              <svg
                viewBox={"0 0 " + STAGE.w + " " + STAGE.h}
                role="img"
                aria-label={
                  "One composition with the " +
                  (versions[frame]?.name ?? "").toLowerCase() +
                  " frame closed over it; everything outside the frame is lost."
                }
                className="block w-full"
              >
                <defs>
                  <mask id="reel-crop">
                    <rect width={STAGE.w} height={STAGE.h} fill="white" />
                    <rect
                      x={crop.x}
                      y={crop.y}
                      width={crop.w}
                      height={crop.h}
                      rx="6"
                      fill="black"
                      className="transition-all duration-700 ease-out motion-reduce:transition-none"
                    />
                  </mask>
                </defs>

                {/* The composition. Abstract: a horizon, a subject and the room
                    around it, so a crop can visibly take something away. */}
                <rect width={STAGE.w} height={STAGE.h} rx="6" className="fill-ink-2" />
                <path d={"M0 264h" + STAGE.w} className="stroke-line" strokeWidth="1.4" />
                <circle cx="176" cy="150" r="46" className="fill-brand/25" />
                <path d="M118 264c0-32 26-58 58-58s58 26 58 58z" className="fill-brand/40" />
                <rect x="300" y="176" width="120" height="88" rx="4" className="fill-ash/25" />
                <rect x="446" y="122" width="72" height="142" rx="4" className="fill-ash/18" />
                <rect x="44" y="206" width="46" height="58" rx="4" className="fill-ash/18" />
                <circle cx="536" cy="86" r="26" className="fill-brand/15" />

                {/* Everything the chosen frame does not keep. */}
                <rect
                  width={STAGE.w}
                  height={STAGE.h}
                  className="fill-ink-3/85"
                  mask="url(#reel-crop)"
                />

                {/* The frames. The chosen one is drawn; the others stay as
                    faint outlines so the reader can see what else exists. */}
                {versions.map((v, i) => {
                  const c = cropOf(v);
                  return (
                    <rect
                      key={v.name}
                      x={c.x}
                      y={c.y}
                      width={c.w}
                      height={c.h}
                      rx="6"
                      fill="none"
                      className={cn(
                        "transition-all duration-500 motion-reduce:transition-none",
                        i === frame ? "stroke-brand" : "stroke-line",
                      )}
                      strokeWidth={i === frame ? 2.4 : 1.2}
                      strokeDasharray={i === frame ? "0" : "6 7"}
                    />
                  );
                })}

                {/* The subtitled version is the one that carries words. */}
                {versions[frame]?.subtitled && (
                  <>
                    <rect
                      x={crop.x + crop.w * 0.16}
                      y={crop.y + crop.h - 46}
                      width={crop.w * 0.68}
                      height="12"
                      rx="6"
                      className="fill-snow/80"
                    />
                    <rect
                      x={crop.x + crop.w * 0.28}
                      y={crop.y + crop.h - 28}
                      width={crop.w * 0.44}
                      height="12"
                      rx="6"
                      className="fill-snow/55"
                    />
                  </>
                )}
              </svg>
            </div>
          </Rise>

          <div>
            <Rise>
              <p className="leading-relaxed text-snow sm:text-lg">{versionsLead}</p>
            </Rise>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {versions.map((v, i) => (
                <li key={v.name}>
                  <button
                    type="button"
                    onClick={() => setFrame(i)}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setFrame(i);
                    }}
                    aria-pressed={i === frame}
                    className={cn(
                      "flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-400 motion-reduce:transition-none",
                      i === frame ? "bg-brand/[0.1]" : "bg-ink-3 hover:bg-brand/[0.05]",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "shrink-0 rounded-[3px] border transition-colors duration-400 motion-reduce:transition-none",
                        i === frame ? "border-brand bg-brand/20" : "border-ash",
                      )}
                      style={{
                        width: 26 * (v.ratio[0] / Math.max(v.ratio[0], v.ratio[1])),
                        height: 26 * (v.ratio[1] / Math.max(v.ratio[0], v.ratio[1])),
                      }}
                    />
                    <span
                      className={cn(
                        "font-display text-sm font-extrabold uppercase transition-colors duration-300 motion-reduce:transition-none",
                        i === frame ? "text-brand" : "text-snow",
                      )}
                    >
                      {v.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <Rise delay={0.08}>
              <p className="mt-6 border-l-2 border-brand pl-6 leading-relaxed text-fog">
                {versionsTail}
              </p>
            </Rise>
          </div>
        </div>

        {/* The five places, each drawn as the place it is. */}
        <ul className="mt-16 grid gap-5 lg:grid-cols-12">
          {destinations.map((d, i) => (
            <Rise
              key={d.name}
              delay={0.05 * i}
              className={cn(
                "h-full",
                i === 0 && "lg:col-span-7",
                i === 1 && "lg:col-span-5",
                i >= 2 && "lg:col-span-4",
              )}
            >
              <li className="group flex h-full flex-col rounded-2xl border border-line bg-ink-3 px-6 py-6 transition-colors duration-400 hover:border-brand/60 motion-reduce:transition-none">
                <svg
                  viewBox="0 0 200 122"
                  aria-hidden
                  className="mb-6 w-full max-w-[13rem] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                >
                  <DestinationDrawing i={i} />
                </svg>
                <p className="leading-relaxed text-fog">
                  <span className="font-display pr-1.5 text-[1.02rem] font-extrabold uppercase text-snow transition-colors duration-300 group-hover:text-brand motion-reduce:transition-none">
                    {d.name}
                  </span>
                  {d.body}
                </p>
              </li>
            </Rise>
          ))}
        </ul>

        {/* The one figure in the document, and the sentence that limits it. */}
        <Rise delay={0.1} className="mt-16">
          <div className="grid gap-6 rounded-2xl border border-line bg-ink-3 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <p className="font-display text-[clamp(1.15rem,2.4vw,1.8rem)] font-extrabold uppercase leading-[1.2] text-snow">
              <Marked text={reach} mark={reachFigure} className="text-brand" />
            </p>
            <p className="flex gap-3 self-center border-l-2 border-brand pl-6 text-sm leading-relaxed text-ash">
              {reachCaveat}
            </p>
          </div>
        </Rise>

        {/* The discoverability layer. The four elements are marked inside the
            document's own sentence rather than repeated beside it. */}
        <Rise delay={0.16} className="mt-12 border-t border-line pt-9">
          <p className="max-w-4xl leading-relaxed text-snow sm:text-lg">
            <Marked text={discoveryLead} mark={discoveryItems} />
          </p>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-2 leading-relaxed text-fog">
            <Crosslink href={discoveryLink.href}>{discoveryLink.label}</Crosslink>
            <span>{discoveryTail}</span>
          </p>
        </Rise>
      </Container>
    </section>
  );
}

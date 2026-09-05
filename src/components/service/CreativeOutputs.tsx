"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** The four outputs, each drawn as the thing it actually is.
 *
 *  THE TEST THIS IS BUILT AGAINST. Cover the title beside the drawing. If a
 *  reader cannot name what they are looking at, the drawing has failed. Every
 *  earlier version of this section failed that instantly, because every one of
 *  them was assembled from the same kit of grey bars and rounded rectangles: a
 *  kit that can stand for anything stands for nothing, so "product imagery" and
 *  "variants at scale" came out looking identical.
 *
 *  So each of these four is built from the silhouette that names it, and the
 *  four silhouettes have nothing in common:
 *
 *    01  an edit timeline, with an audio waveform under the scenes. A waveform
 *        beneath a strip of frames cannot be read as anything but video.
 *    02  a phone held upright with a person framed head and shoulders in it,
 *        a subtitle across the lower third and a call to action under that:
 *        the shape of a creator ad, and the hooks it is tested with stacked
 *        beside it.
 *    03  a product standing on a studio sweep, lit, with its cast shadow. The
 *        curve where the backdrop meets the floor is what says "shot on a set"
 *        rather than "rectangle".
 *    04  one approved asset beside the versions it becomes, where each version
 *        changes exactly one part of it: the opening, the headline, the body or
 *        the call to action. Re-cropping alone only ever said "formats"; the
 *        part that changed is what says "versions of one idea".
 *
 *  WORDLESS, like every other drawing on this site. The specificity is carried
 *  by shape, never by a caption, and never by writing ad copy on a client's
 *  behalf. The presenter is a silhouette and never a face, which is the
 *  document's own line about synthetic presenters made structural. */

const INK = "var(--color-ash)";

/* ═══════════════════════════════════════════════════ 01 · the edit timeline */
function VideoEdit() {
  /* Heights of the waveform, fixed rather than random so the drawing is stable
     between renders. */
  const WAVE = [5, 9, 14, 20, 15, 24, 30, 22, 16, 26, 34, 24, 18, 11, 17, 25, 32, 21, 13, 8,
                12, 19, 27, 20, 14, 22, 29, 18, 10, 15, 23, 16, 9, 13, 7, 11];
  return (
    <div className="flex flex-col gap-4">
      {/* the scenes, cut end to end */}
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "relative h-16 flex-1 overflow-hidden rounded-md border",
              i === 2 ? "border-brand bg-brand/[0.07]" : "border-line bg-void/50",
            )}
          >
            {/* something framed inside each scene, so they read as shots */}
            <svg viewBox="0 0 60 44" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx={18 + i * 6} cy="17" r="7" fill={i === 2 ? "var(--color-brand)" : INK} opacity={i === 2 ? 0.55 : 0.3} />
              <path d={`M4 44 q ${14 + i * 3} -${16 + i * 2} ${30 + i * 4} 0`} fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1.4" />
            </svg>
          </div>
        ))}
      </div>

      {/* the playhead riding the cut */}
      <div className="relative h-3">
        <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
        <span aria-hidden className="absolute left-[42%] top-0 h-3 w-px bg-brand" />
        <span aria-hidden className="absolute left-[42%] top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand" />
      </div>

      {/* the voiceover track: the thing that makes this unmistakably video */}
      <div className="rounded-lg border border-line bg-void/40 px-3 py-3">
        <div className="flex h-10 items-center gap-[3px]">
          {WAVE.map((h, i) => (
            <span
              key={i}
              aria-hidden
              className={cn("w-full rounded-full", i / WAVE.length < 0.42 ? "bg-brand/70" : "bg-fog/45")}
              style={{ height: `${h * 2.6}%` }}
            />
          ))}
        </div>
      </div>

      {/* the caption track */}
      <div className="flex gap-1.5">
        <span aria-hidden className="h-3 w-[22%] rounded-full bg-line" />
        <span aria-hidden className="h-3 w-[34%] rounded-full bg-brand/45" />
        <span aria-hidden className="h-3 w-[26%] rounded-full bg-line" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════ 02 · the creator phone */
function UgcPhone() {
  return (
    <div className="flex items-stretch gap-5">
      {/* the phone, upright */}
      <div className="relative w-[42%] shrink-0 overflow-hidden rounded-[1.25rem] border-2 border-line bg-void/50">
        <div className="aspect-[9/16]">
          <svg viewBox="0 0 90 160" className="absolute inset-0 h-full w-full" aria-hidden>
            {/* head and shoulders, framed the way a creator frames themselves */}
            <circle cx="45" cy="52" r="17" fill={INK} opacity="0.34" />
            <path d="M16 108 a29 29 0 0 1 58 0 Z" fill={INK} opacity="0.34" />
          </svg>
          {/* the subtitle across the lower third */}
          <span aria-hidden className="absolute inset-x-4 bottom-[26%] space-y-1.5">
            <span className="mx-auto block h-1.5 w-full rounded-full bg-fog/55" />
            <span className="mx-auto block h-1.5 w-2/3 rounded-full bg-fog/35" />
          </span>
          {/* the call to action */}
          <span aria-hidden className="absolute inset-x-4 bottom-[10%] block h-6 rounded-full bg-brand" />
        </div>
      </div>

      {/* the hooks it gets tested with, stacked */}
      <div className="flex flex-1 flex-col justify-center gap-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-lg border px-3 py-2.5",
              i === 1 ? "border-brand bg-brand/[0.07]" : "border-line bg-void/40",
            )}
          >
            <span
              aria-hidden
              className={cn("block h-1.5 rounded-full", i === 1 ? "bg-brand" : "bg-line")}
              style={{ width: ["78%", "62%", "88%", "70%"][i] }}
            />
            <span aria-hidden className="mt-1.5 block h-1.5 w-[45%] rounded-full bg-fog/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════ 03 · the product on set */
function ProductSet() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-xl border border-line bg-void/40">
        <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
          {/* the sweep: the curve where the backdrop meets the floor. This one
              line is what makes it a studio set rather than a rectangle. */}
          <path
            d="M0 118 C 90 118, 96 150, 130 158 L 320 158"
            fill="none"
            stroke={INK}
            strokeOpacity="0.45"
            strokeWidth="1.6"
          />
          {/* the key light falling from upper left */}
          <ellipse cx="120" cy="96" rx="120" ry="70" fill="var(--color-brand)" opacity="0.06" />

          {/* the product, standing on the sweep */}
          <ellipse cx="160" cy="158" rx="34" ry="6" fill={INK} opacity="0.3" />
          <rect x="144" y="78" width="32" height="80" rx="10" fill={INK} opacity="0.42" />
          <rect x="153" y="64" width="14" height="16" rx="4" fill={INK} opacity="0.42" />
          {/* the label band, checked carefully per the copy */}
          <rect x="147" y="112" width="26" height="4" rx="2" fill="var(--color-brand)" />
          {/* a highlight, so it is lit rather than flat */}
          <rect x="149" y="84" width="5" height="52" rx="2.5" fill="var(--color-ink-3)" opacity="0.65" />
        </svg>
      </div>

      {/* the settings the same product is placed into */}
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "relative h-12 flex-1 overflow-hidden rounded-md border",
              i === 0 ? "border-brand" : "border-line",
            )}
          >
            <svg viewBox="0 0 60 40" className="absolute inset-0 h-full w-full" aria-hidden>
              <path d={`M0 ${20 + i * 2} C 16 ${20 + i * 2}, 18 ${30 + i} 26 ${32 - i} L 60 ${32 - i}`} fill="none" stroke={INK} strokeOpacity="0.4" strokeWidth="1" />
              <rect x="26" y="14" width="8" height="18" rx="3" fill={INK} opacity={i === 0 ? 0.5 : 0.3} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════ 04 · one idea, one thing changed */
/** One version of the approved asset. Every version carries the same four
 *  parts in the same order, and exactly one of them is different, which is what
 *  the copy actually describes: "different openings, headlines, scenes,
 *  formats, languages, offers and calls to action". Showing the same asset
 *  re-cropped only ever said "formats"; showing which part changed says all of
 *  it, and it is how a variant set is really read. */
function Version({
  changed,
  master = false,
  wide = false,
}: {
  /** 0 opening, 1 headline, 2 body, 3 call to action. -1 changes nothing. */
  changed: number;
  master?: boolean;
  wide?: boolean;
}) {
  const lit = (i: number) => changed === i;
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-lg border p-2",
        master ? "border-2 border-brand bg-brand/[0.05] gap-2.5 p-3" : "border-line bg-void/40",
      )}
    >
      {/* the opening: the shot the version starts on */}
      <div
        className={cn(
          "relative overflow-hidden rounded",
          wide ? "aspect-[16/9]" : "aspect-[4/3]",
          lit(0) ? "bg-brand/15" : "bg-line/70",
        )}
      >
        <svg viewBox="0 0 60 40" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle
            cx={lit(0) ? 36 : 24}
            cy="18"
            r={master ? 9 : 7}
            fill={lit(0) ? "var(--color-brand)" : INK}
            opacity={lit(0) ? 0.75 : 0.4}
          />
          <path
            d={lit(0) ? "M2 40 q 20 -14 34 0" : "M2 40 q 16 -10 30 0"}
            fill="none"
            stroke={INK}
            strokeOpacity="0.3"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      {/* the headline */}
      <span
        aria-hidden
        className={cn("block rounded-full", master ? "h-2" : "h-1.5", lit(1) ? "bg-brand" : "bg-fog/45")}
        style={{ width: lit(1) ? "92%" : "72%" }}
      />
      {/* the body line */}
      <span
        aria-hidden
        className={cn("block rounded-full", master ? "h-2" : "h-1.5", lit(2) ? "bg-brand" : "bg-line")}
        style={{ width: lit(2) ? "74%" : "52%" }}
      />
      {/* the call to action */}
      <span
        aria-hidden
        className={cn(
          "mt-0.5 block rounded-full",
          master ? "h-4" : "h-3",
          lit(3) ? "bg-brand" : "bg-line",
        )}
        style={{ width: lit(3) ? "68%" : "46%" }}
      />
    </div>
  );
}

function VariantSet() {
  /* Which part each version changes, and which of them are cut wide. The set
     runs through all four parts, twice, so no single change reads as the only
     kind of variation. */
  const VERSIONS: { changed: number; wide?: boolean }[] = [
    { changed: 1 },
    { changed: 3, wide: true },
    { changed: 0 },
    { changed: 2, wide: true },
    { changed: 3 },
    { changed: 1 },
  ];

  return (
    <div className="flex items-center gap-6">
      {/* the one approved idea */}
      <div className="w-[30%] shrink-0">
        <Version changed={-1} master />
      </div>

      {/* the versions it becomes, each with one part changed */}
      <div className="grid flex-1 grid-cols-3 gap-2.5">
        {VERSIONS.map((v, i) => (
          <Version key={i} changed={v.changed} wide={v.wide} />
        ))}
      </div>
    </div>
  );
}

export function CreativeOutputs({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  const panel = () => {
    switch (active) {
      case 0:
        return <VideoEdit />;
      case 1:
        return <UgcPhone />;
      case 2:
        return <ProductSet />;
      default:
        return <VariantSet />;
    }
  };

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      <div className="flex gap-5">
        <div className="flex shrink-0 flex-col gap-3 pt-1">
          {Array.from({ length: count }).map((_, i) => pin(i))}
        </div>
        <div className="min-h-[19rem] flex-1">{panel()}</div>
      </div>
    </div>
  );
}

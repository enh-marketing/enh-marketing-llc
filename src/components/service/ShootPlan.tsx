"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Destination, Version } from "@/content/services/corporate-video";

/** Distribution, drawn as the thing that happens before the camera rolls.
 *
 *  WHY THIS SHAPE. The document's sentence is causal and it leads: "Distribution
 *  should be decided before the shoot because it affects the script, framing,
 *  duration, and footage required." The obvious layout is a list of places the
 *  video ends up, which would put distribution after production and lose the
 *  argument entirely. So the section runs the other way: one shoot at the top,
 *  the frames it has to serve underneath, and the destinations after that.
 *
 *  THE FRAMES ARE THE ARGUMENT. Landscape, vertical, square and subtitled are
 *  drawn at their real proportions inside one shared safe area, because that is
 *  what "affects the framing" means in practice -- a vertical crop of a
 *  landscape composition loses both edges, which is the document's reason for
 *  planning them before filming rather than "returning to the footage months
 *  later". Seeing the four frames overlap makes the case that no sentence has
 *  to.
 *
 *  THE RATIOS ARE PRESENTATION, NOT A CLAIM. The document names the four
 *  versions; it never gives their aspect ratios. 16:9, 9:16 and 1:1 are the
 *  standard frames those words refer to, and they are used to draw the boxes
 *  and nothing else. No duration, no file size, no count is stated anywhere.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver. Anything carrying
 *  words animates transform only, so a stalled animation leaves text readable.
 *  See globals.css, "Shoot plan". */

export function ShootPlan({
  claim,
  versionsLead,
  versions,
  versionsTail,
  destinations,
}: {
  claim: string;
  versionsLead: string;
  versions: Version[];
  versionsTail: string;
  destinations: Destination[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  /** The frames share one safe area, so the widest and the tallest are drawn
   *  against the same centre. Height is the constant: a 9:16 frame is as tall
   *  as the box and a 16:9 frame is as wide as it. */
  const BOX = 132;
  const frame = (v: Version) => {
    const [w, h] = v.ratio;
    const scale = w >= h ? BOX / w : BOX / h;
    return { width: w * scale, height: h * scale };
  };

  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      {/* The claim, at display scale, because the whole section is its
          consequence. */}
      <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
        {claim}
      </p>

      {/* ---- One shoot, four frames ---- */}
      <div className="mt-12 grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
        <div>
          <p className="shoot-in leading-relaxed text-snow sm:text-lg">{versionsLead}</p>
          <p
            className="shoot-in mt-6 max-w-md border-l-2 border-brand pl-6 leading-relaxed text-fog"
            style={{ animationDelay: "160ms" }}
          >
            {versionsTail}
          </p>
        </div>

        {/* The four frames, overlapping on one centre. The stack is what shows
            that a vertical version is not a crop of the landscape one but a
            different composition, which is the document's whole reason for
            deciding this before the shoot. */}
        <div className="relative">
          <div
            aria-hidden
            className="relative mx-auto flex items-center justify-center"
            style={{ height: BOX + 56 }}
          >
            {/* The shared safe area every frame has to hold. */}
            <span
              className="shoot-safe absolute rounded-sm border border-dashed border-brand/45"
              style={{ width: BOX * 0.52, height: BOX * 0.52 }}
            />
            {versions.map((v, i) => {
              const { width, height } = frame(v);
              return (
                <span
                  key={v.name}
                  className="shoot-frame absolute rounded-[3px] border border-line"
                  style={{ width, height, animationDelay: `${i * 130}ms` }}
                />
              );
            })}
          </div>

          {/* Each version named against the frame it refers to. */}
          <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {versions.map((v, i) => {
              const { width, height } = frame(v);
              return (
                <li
                  key={v.name}
                  className="shoot-in flex flex-col items-start gap-2"
                  style={{ animationDelay: `${i * 130 + 90}ms` }}
                >
                  <span
                    aria-hidden
                    className="relative flex items-end rounded-[3px] border border-brand/70"
                    style={{ width: width * 0.3, height: height * 0.3 }}
                  >
                    {/* The subtitled version is the same frame carrying a
                        burned-in line, which is what distinguishes it. */}
                    {v.subtitled && (
                      <span className="mx-auto mb-1 h-px w-1/2 bg-brand" />
                    )}
                  </span>
                  <span className="text-[0.62rem] font-semibold uppercase text-fog">
                    {v.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ---- Where each one goes ---- */}
      <ol className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((dest, i) => (
          <li
            key={dest.name}
            className="group shoot-in border-b border-line py-5 sm:pr-8"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p className="font-display text-[0.95rem] font-extrabold uppercase leading-tight text-brand">
              {dest.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fog">{dest.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The audience figure and the qualifier the document attaches to it, set as
 *  one block so the two can never be separated. The number is marked inside its
 *  own sentence rather than lifted out and set at display size: it is reach
 *  data, and blowing it up would present it as the user count the document
 *  explicitly says it is not. */
export function ReachNote({
  reach,
  figure,
  caveat,
}: {
  reach: string;
  figure: string;
  caveat: string;
}) {
  const parts = reach.split(figure);
  return (
    <div className="grid gap-x-12 gap-y-4 border-t border-line pt-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
      <p className="leading-relaxed text-snow sm:text-lg">
        {parts.map((part, i) => (
          <Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="font-display font-extrabold text-brand">{figure}</span>
            )}
          </Fragment>
        ))}
      </p>
      <p className="flex gap-3 text-sm leading-relaxed text-ash">
        <span aria-hidden className="mt-0.5 shrink-0 text-brand">
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
          </svg>
        </span>
        <span>{caveat}</span>
      </p>
    </div>
  );
}

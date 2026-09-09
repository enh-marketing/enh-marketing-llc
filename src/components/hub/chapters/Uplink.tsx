"use client";

import { useEffect, useState } from "react";
import { SiriWave } from "@/components/hub/SiriWave";
import { useEnhanced } from "@/lib/useEnhanced";
import { CHART_PATH } from "@/components/hub/chartPath";

/** Chapter three: the voice. The Sun's light becomes a waveform.
 *
 *  WHERE IT COMES FROM. The system chapter ends with the Sun at the top of the
 *  chart it has been climbing, and that point is known rather than guessed: it
 *  is the last vertex of CHART_PATH, in fractions of the frame, which is the
 *  same number TrackChart draws the Sun at. This opens there, small, and grows
 *  into the middle of the frame, so the reader sees one light arrive rather
 *  than a second one appear.
 *
 *  SCALING IT IS SAFE HERE, and that is not a small point. The orb tried before
 *  this used react-three-fiber, which measures its container with
 *  getBoundingClientRect; that includes ancestor transforms, so the same CSS
 *  scale made it re-allocate its WebGL drawing buffer every frame, from 132 by
 *  312 pixels up to 942 by 2226, and it flickered. SiriWave takes its
 *  resolution from a prop and never reads its own box, so a transform on it is
 *  just a transform.
 *
 *  WHAT MUST NOT BE DRIVEN FROM SCROLL is `size`: it sits in the component's
 *  effect dependencies, so a change recompiles both shaders. It is therefore
 *  computed once from the viewport and only recomputed when the window itself
 *  changes size. The growth is all CSS.
 *
 *  IT IS A SQUARE ON A TALL SCREEN, deliberately over-sized. The component
 *  draws a square canvas and the wave fades out towards its own left and right
 *  edges through a gaussian falloff, so sizing the square to the longer side of
 *  the window and centring it puts the fade off-screen and the waveform reads
 *  as full width.
 *
 *  THE SCROLL DOES TWO THINGS: brings it in and takes it out. The middle is
 *  left alone, because the wave has its own clock and is the one scene on this
 *  page that is alive whether or not the reader is moving. */

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (x: number) => x * x * (3 - 2 * x);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** The Sun's last resting place, straight from the chart it climbed. */
const [APEX_X, APEX_Y] = CHART_PATH[CHART_PATH.length - 1];

/** How far into the chapter the arrival takes, and where the exit begins. */
const ARRIVE = 0.3;
const LEAVE_FROM = 0.84;

/** It starts at roughly the Sun's own size and ends filling the frame. */
const START_SCALE = 0.12;
const END_SCALE = 1;

export function Uplink({ t }: { t: number }) {
  /* One square big enough to cover the window's longer side. Recomputed on
     resize only, never on scroll: see the note above on `size`. */
  const [size, setSize] = useState(0);
  const compact = !useEnhanced("(min-width: 1024px)");

  useEffect(() => {
    const read = () => setSize(Math.max(window.innerWidth, window.innerHeight));
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const arriving = smooth(clamp(t / ARRIVE));
  const leaving = smooth(clamp((t - LEAVE_FROM) / (1 - LEAVE_FROM)));

  /* Position: the chart's apex, easing to the middle of the frame. */
  const x = mix(APEX_X, 0.5, arriving) * 100;
  const y = mix(APEX_Y, 0.5, arriving) * 100;
  /* Size: the Sun's radius out to the full frame, and further as it goes, so
     the black hole is arrived at through the wave rather than beside it. */
  const scale = mix(START_SCALE, END_SCALE, arriving) * (1 + leaving * 0.7);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformOrigin: `${x}% ${y}%`,
          transform: `translate3d(0, 0, 0) scale(${scale})`,
          /* Only the exit belongs here: the machine already multiplies every
             chapter's wrapper by `reveal`, and applying it twice would make
             this scene arrive darker than the two either side of it. */
          opacity: 1 - leaving,
          willChange: "transform, opacity",
        }}
      >
        {size > 0 && (
          <SiriWave
            variant="wave"
            size={size}
            /* Two thirds on a phone. The shader is per-pixel and this is the
               component's own lever for it: the canvas is drawn smaller and
               stretched by CSS, so it quarters the fragment work rather than
               changing what is drawn. */
            renderScale={compact ? 0.5 : 0.75}
            className="rounded-none bg-transparent"
          />
        )}
      </div>
    </div>
  );
}

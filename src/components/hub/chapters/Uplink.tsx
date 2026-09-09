"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SiriWave } from "@/components/hub/SiriWave";
import { useEnhanced } from "@/lib/useEnhanced";
import {
  chartFocus,
  chartPolylineTo,
  chartTravelled,
  HANDOVER_Y,
} from "@/components/hub/chartPath";
import { drawStar, drawTrack } from "@/components/hub/star";

/** Chapter three: the voice. The trails become a waveform.
 *
 *  WHY THIS CROSS-FADE WORKS AT ALL. The chapter before it ends with every
 *  planet's trail drawn as a long coloured line running along the Sun's course,
 *  and that course is laid flat on the screen by a solved roll, so what leaves
 *  the frame is a set of horizontal coloured lines. This shader draws four
 *  chromatically separated curves around a horizontal axis: horizontal
 *  coloured lines. Nothing morphs. Two pictures of the same kind trade places,
 *  which is the only way a transition of this size stays cheap and cannot
 *  glitch.
 *
 *  AND THE STAR NEVER GOES OUT, NOR DOES ITS LINE. The system parks both at the
 *  handover point, this chapter keeps them there, and the chart carries them on.
 *  Three chapters cross-fade over something that does not move, so the chart is
 *  not a new object arriving, it is the thing the reader has been watching all
 *  along setting off up a line.
 *
 *  NOTHING IS COPIED TO ACHIEVE THAT. This chapter does not know where the
 *  handover point is or what shape the line has: it calls the chart's own
 *  chartFocus and chartPolylineTo at leg progress zero and draws the result
 *  with the chart's own drawTrack and drawStar. So it is not a matching frame,
 *  it is the same frame, and the two cannot be edited apart.
 *
 *  `lead` is zero at the camera stops either side of this, which is what lets
 *  the system land on that point exactly: `lead` is a fraction of the short
 *  side while `focus` is a fraction of the width, so with it on, where the star
 *  came to rest depended on the aspect ratio.
 *
 *  IT LEAVES BY BEING FLATTENED, NOT BY FADING. Amplitude lives in the shader's
 *  constants and cannot be ramped from outside, but scaling the canvas
 *  vertically collapses the wave onto its own axis, which is precisely the flat
 *  line the chart begins with. So the voice stops speaking and what is left is
 *  a horizontal line in the exact place the chart wants one.
 *
 *  TRANSFORMS ARE SAFE ON THIS COMPONENT, which is not true of every one that
 *  was tried here. It takes its resolution from a prop and never measures its
 *  own box, so scaling it is only scaling. The react-three-fiber orb tried
 *  before it read getBoundingClientRect, so the same transform re-allocated its
 *  drawing buffer every frame and it flickered.
 *
 *  WHAT MUST NOT BE DRIVEN FROM SCROLL is `size`: it sits in the component's
 *  effect dependencies and a change recompiles both shaders. It is computed
 *  once from the viewport and again only when the window resizes. */

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (x: number) => x * x * (3 - 2 * x);

/** Arrive across the first stretch, hold, then flatten into the chart. */
const ARRIVE = 0.22;
const FLATTEN_FROM = 0.82;

/** HOW LATE THE LINE ARRIVES, as a share of the chapter's fade-in.
 *
 *  THE TRAILS ARE STILL TURNING WHEN THIS CHAPTER STARTS FADING UP. The system
 *  straightens its Sun's course from a rolled 13.5 degrees to the solved
 *  51.4728 across the last third of its chapter, and the cross-fade begins a
 *  whole FADE before the boundary, at local 0.849. At that moment the course is
 *  16.3 degrees off flat, which is 234px of divergence across 800px of frame.
 *  So this chapter's dead-horizontal track and the system's still-diagonal one
 *  were both on screen, converging on the same star at different angles, for
 *  the whole dissolve. Reported as a double trail, and it is exactly that.
 *
 *  ONLY THE LINE WAITS. A star is a dot: it looks the same whatever is behind
 *  it, it is in exactly the same place in both chapters, and holding it back
 *  would dim it in the middle of the dissolve, because the system's own star is
 *  fading out behind the incoming black at the same time. A line has an angle,
 *  and that is the whole of the problem. So the star comes in with the chapter
 *  and the line waits until the fade is 0.8 done, which is local 0.970, where
 *  the mismatch is 0.9 degrees, or 12px across the same 800px.
 *
 *  Nothing is lost by waiting: the system draws its own track the entire time
 *  and it is the correct one, because it is the one turning.
 *
 *  ON THE WAY OUT IT DOES NOT APPLY. Leaving, this chapter's `t` is pinned at 1
 *  and the chart is arriving on an identical frame, so the star stays lit at
 *  full and the two cross-fade over each other as they should. */
const TRACK_FROM = 0.8;

/** How far the star's halo is pushed out while the wave is at full amplitude,
 *  as a multiple of its resting size.
 *
 *  THE CEILING IS THE FRAME, NOT TASTE. The halo rests at nine radii of the
 *  short side, which is 0.117 of the height on any screen wider than it is
 *  tall, and the star sits at HANDOVER_Y with 0.4 of the height below it. So it
 *  can grow to 0.4 / 0.117 = 3.42 before it runs out of frame, and that ratio
 *  is the same at every size because both terms scale with the height. At 3.5
 *  it was over: measured at 1600x950 the halo still had alpha 0.059 when it
 *  reached the bottom edge, which is a warm band cut off in a straight line
 *  across the frame. 2.4 gives a maximum of 3.4 and it fades to nothing with
 *  two pixels to spare.
 *
 *  It is still far more than it needs to be seen. What the halo has to clear is
 *  the wave's own vertical reach, about 230px at 1600x950, and at 3.4 it runs
 *  to 377px, so it shows above and below the wave with room over. */
const BLOOM = 2.4;

export function Uplink({ t, level }: { t: number; level: number }) {
  const [size, setSize] = useState(0);
  const compact = !useEnhanced("(min-width: 1024px)");
  const star = useRef<HTMLCanvasElement>(null);

  const arriving = smooth(clamp(t / ARRIVE));
  const flat = smooth(clamp((t - FLATTEN_FROM) / (1 - FLATTEN_FROM)));

  /* Vertical only. The wave is already the right shape and in the right place
     the moment it appears, so the arrival is the trails handing over rather
     than the wave travelling: it opens flat, on the same axis, and swells. */
  const scaleY = arriving * (1 - flat);

  /* THE STAR STAYS LIT THROUGH THE VOICE, and that is the only reason this
     chapter owns a canvas of its own. The system parks it at HANDOVER_X,
     HANDOVER_Y and the chart starts it from there, so if it went out in
     between, the chart would arrive as a new object appearing out of nothing.
     Lit here, all three chapters cross-fade over one star that never moves.

     AND IT COMES WITH ITS LINE. The system leaves the star trailing its own
     course behind it and the chart shows the same thing, so a voice section
     with a bare star floating in it was the one frame in the sequence where
     the line went missing. What is drawn here is not a copy of the chart's
     opening: it is the chart's opening, the same two functions fed the same
     path at leg progress zero, so the line the reader follows through the
     voice is the line the chart carries on from. Nothing here knows what shape
     that is, which is the point.

     THEY BOTH BREATHE WITH THE WAVE, because white on the wave's own centre
     cannot be seen: that centre is the brightest white in the frame. Measured
     at 410x900 the star's core vanished into it completely. So while the wave
     is loud the halo and the line's two soft strokes are pushed out past the
     white, where there is black to read against, and the star and its track
     are present as the glow the wave sits inside. As the wave collapses they
     come back to exactly what the chart draws, which is what the two chapters
     then cross-fade over. `scaleY` already is the wave's amplitude, so they
     cannot fall out of step.

     QUANTISED TO TWENTIETHS so this is a few dozen canvas fills across the
     whole chapter rather than one on every frame of the scroll. */
  const bloom = 1 + BLOOM * (Math.round(scaleY * 20) / 20);

  /* Fading IN, as opposed to fading out: the chapter is not fully present and
     its own progress has not started. `locals` clamps to 0 on the way in and to
     1 on the way out, so this tells the two ends of the chapter apart exactly.
     (`arriving` above is the wave's own swell and is a different thing.) */
  const fadingIn = level < 1 && t <= 0;
  const trackAlpha = fadingIn ? smooth(clamp((level - TRACK_FROM) / (1 - TRACK_FROM))) : 1;

  const paint = useCallback(() => {
    const el = star.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    el.width = Math.round(w * dpr);
    el.height = Math.round(h * dpr);
    const ctx = el.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const spot = chartFocus(0);
    const head: [number, number] = [spot[0] * w, spot[1] * h];
    const pts = chartPolylineTo(chartTravelled(0)).map(
      ([x, y]) => [x * w, y * h] as [number, number],
    );
    drawTrack(ctx, pts, head, bloom, trackAlpha);
    drawStar(ctx, head[0], head[1], w, h, bloom);
  }, [bloom, trackAlpha]);

  useEffect(() => {
    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, [paint]);

  /* The wave's own size, read from the viewport and never from scroll: it sits
     in SiriWave's effect dependencies and a change recompiles both shaders. */
  useEffect(() => {
    const read = () => setSize(Math.max(window.innerWidth, window.innerHeight));
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* A ZERO-HEIGHT BAND ACROSS THE STAGE, WHOSE BOX *IS* THE AXIS.
          The square is centred on the handover height rather than on the
          frame. Its wave fades out towards its own left and right edges
          through a gaussian falloff, so sizing it to the window's longer side
          puts that fade off-screen and it reads as full width.

          DO NOT CENTRE THIS WITH `left-1/2 -translate-x-1/2`, WHICH IS WHAT IT
          USED TO DO AND WHY IT WAS HALF OFF THE SCREEN. Tailwind v4 changed
          what those utilities emit. In v3 `-translate-x-1/2` fed a variable
          into a composed `transform`, so an inline `transform` replaced it. In
          v4 it writes the separate CSS `translate` property:

            .-translate-x-1\/2 { --tw-translate-x: calc(50% * -1);
                                 translate: var(--tw-translate-x) var(--tw-translate-y) }

          `translate` and `transform` are different properties and both apply,
          in that order, so the class and the inline transform did not override
          one another, they composed: the box was shifted a full 100% of its own
          width instead of 50%. Measured at 1600x950 the 1600px square landed at
          x -800 instead of x 0, putting the wave's centre at screen x 0, so only
          its right half was on screen and it read as a bright smear against the
          left edge. The same trap is live elsewhere in this repo wherever a
          translate/scale/rotate utility shares an element with a transform
          written from JS or inline.

          So there is no translate here at all. `left: 0` with `right: 0` and
          `width: auto` makes the band exactly as wide as the stage, with no
          percentage offset and no shrink-to-fit to reason about. `height: 0`
          collapses its box onto the handover line, so `top` alone places it and
          there is nothing to compensate for. `justify-center` does the
          horizontal centring, and centres the overflow symmetrically, which is
          what puts the gaussian fade off both edges. `items-center` hangs the
          square on the line, so the line is the wave's axis by construction and
          the only transform left is the collapse itself. */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: 0,
          right: 0,
          height: 0,
          top: `${HANDOVER_Y * 100}%`,
          transform: `scaleY(${scaleY})`,
          willChange: "transform",
        }}
      >
        {size > 0 && (
          <SiriWave
            variant="wave"
            size={size}
            /* Half resolution on a phone. The shader is per-pixel and this is
               the component's own lever: the canvas is drawn smaller and
               stretched by CSS, so it quarters the fragment work without
               changing what is drawn. */
            renderScale={compact ? 0.5 : 0.75}
            /* shrink-0 because it is a flex item and `size` is the window's
               LONGER side, so on a phone the square is wider than the stage.
               A flex item shrinks by default, which would squash the canvas's
               CSS width below `size` while its drawing buffer stayed square
               and stretch the shader sideways. */
            className="shrink-0 rounded-none bg-transparent"
          />
        )}
      </div>
      {/* Over the waveform, not under it. The shader writes alpha 1, so its
          canvas is opaque and anything behind it is simply not there. Screened
          on top, the star adds its light to the wave the way a light source
          in the same frame would, instead of punching a hole in it. */}
      <canvas
        ref={star}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
}

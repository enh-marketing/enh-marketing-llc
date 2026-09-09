"use client";

import { useEffect, useState } from "react";
import { SiriWave } from "@/components/hub/SiriWave";
import { useEnhanced } from "@/lib/useEnhanced";
import { HANDOVER_Y } from "@/components/hub/chartPath";

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
 *  THE AXIS IS THE ONE NUMBER THAT MATTERS. The waveform's axis, the Sun the
 *  system chapter leaves behind, and the flat line the chart opens on are all
 *  HANDOVER_Y, imported rather than repeated. The Sun's course is horizontal by
 *  then, so `lead` pushes it sideways only and its height is exactly focusY;
 *  that is what makes one constant enough for all three.
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

export function Uplink({ t }: { t: number }) {
  const [size, setSize] = useState(0);
  const compact = !useEnhanced("(min-width: 1024px)");

  useEffect(() => {
    const read = () => setSize(Math.max(window.innerWidth, window.innerHeight));
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const arriving = smooth(clamp(t / ARRIVE));
  const flat = smooth(clamp((t - FLATTEN_FROM) / (1 - FLATTEN_FROM)));

  /* Vertical only. The wave is already the right shape and in the right place
     the moment it appears, so the arrival is the trails handing over rather
     than the wave travelling: it opens flat, on the same axis, and swells. */
  const scaleY = arriving * (1 - flat);

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
    </div>
  );
}

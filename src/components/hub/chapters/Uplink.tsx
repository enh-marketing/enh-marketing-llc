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
      {/* The square is centred on the handover height rather than on the
          frame. Its wave fades out towards its own left and right edges
          through a gaussian falloff, so sizing it to the window's longer side
          puts that fade off-screen and it reads as full width. */}
      <div
        className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center"
        style={{
          top: `${HANDOVER_Y * 100}%`,
          transform: `translate(-50%, -50%) scaleY(${scaleY})`,
          left: "50%",
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
            className="rounded-none bg-transparent"
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FRONT, LAYER_IMG } from "@/components/hub/parallaxAssets";

/** A second copy of the opener's foreground, drawn over the opening line.
 *
 *  WHY THERE ARE TWO. The line has to do two things that pull against each
 *  other: pass behind the man, and carry on into the next section and leave
 *  through the top of it. Behind the man means inside the parallax stack, below
 *  the foreground layer; but that stack is one viewport tall and clips, and its
 *  foreground fills the top of the window exactly when the second section
 *  arrives, so a line down there is hidden rather than travelling. The only way
 *  to have both is to take the line out of the stack, where it can go anywhere,
 *  and put the foreground back over the top of it as a separate copy.
 *
 *  IT IS COPIED, NOT RECOMPUTED, and that is the whole design. The obvious
 *  version derives the position from scroll: progress is scrollY / vh, the
 *  layer moves down its rate per cent of a viewport, and the arithmetic is
 *  simple enough to write from the component's source. It is also a second
 *  opinion about where the foreground is, and a second opinion that updates on
 *  a different schedule is a shimmer: React state lands on its own render, GSAP
 *  writes on the ticker, and the two copies of the same photograph would sit a
 *  frame apart at the exact edge where a doubled edge is most visible.
 *
 *  So this measures. Every tick it reads the real layer's own bounding box and
 *  puts the copy there. There is no formula to get wrong, no rate to keep in
 *  step, and if the parallax is ever retimed or the rates change this follows
 *  without being told. It runs on gsap.ticker, the same ticker Lenis and the
 *  parallax already share, so the read happens on the frame the real layer was
 *  written and the two can never be out by one.
 *
 *  AND IT CLIPS ITSELF THE SAME WAY. The stage hides what overflows it, so the
 *  real foreground is cut off at the bottom of the opener. The copy is not
 *  inside that stage, so without this it would keep drawing the strip the
 *  original loses, hanging a band of ground over the top of the journey. The
 *  wrapper takes the stage's box and its overflow, and the image inside takes
 *  the layer's, both from the same frame.
 *
 *  It writes to the DOM directly rather than through state. A per-frame
 *  setState here would re-render this subtree sixty times a second for a
 *  transform, and it would land on React's schedule instead of the ticker's,
 *  which is the shimmer again by another route. */
/** How much of the foreground is allowed to occlude, top down.
 *
 *  IT IS THE FIGURE THAT HAS TO BE IN FRONT, NOT THE WHOLE HILLSIDE, and the
 *  difference is the only reason this works at all. Measured off the actual
 *  file, the share of opaque pixels per band down the image is:
 *
 *      0.00 - 0.49    0%          sky, nothing there at all
 *      0.50 - 0.62   25% to 35%   the figure's torso
 *      0.63 - 0.70   14% to 23%   the legs, narrowing
 *      0.709         80%          the ridge line he stands on
 *      0.725 - 1.00  100%         solid ground
 *
 *  Those are sampled across the middle fifth of the columns, where the figure
 *  is, rather than whole rows: averaged across the full width he is a few per
 *  cent of any row and the legs disappear into the noise, which is how an
 *  earlier reading put his feet at 0.65 and cut them off.
 *
 *  Drawn whole, the copy does not occlude the line, it buries it: the ground
 *  is a solid band that sweeps the entire window between roughly a third and
 *  four fifths of a viewport of scroll, so a line that stays on screen to
 *  reach the next section spends that whole stretch behind it. Cut just under
 *  his feet the copy keeps every pixel of the figure and drops the slab
 *  underneath him, which is what was asked for: behind the man.
 *
 *  The cut lands between the last of the legs and the first solid row of
 *  ground, so it removes only ground and never clips the figure. The real foreground in the stack is
 *  untouched and still draws in full; this is a second, shorter copy whose
 *  only job is to stand in front of the words. */
const FIGURE_END = 0.705;

export function ForegroundEcho() {
  const clip = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = document.querySelector<HTMLElement>(".hub-foreground");
    const stage = layer?.parentElement;
    const clipEl = clip.current;
    const innerEl = inner.current;
    const imgEl = innerEl?.firstElementChild as HTMLImageElement | null;
    if (!layer || !stage || !clipEl || !innerEl || !imgEl) return;

    let lastHidden: boolean | null = null;

    const tick = () => {
      const s = stage.getBoundingClientRect();
      /* Off the top of the window, or not yet reached: nothing to occlude, and
         a full-screen image is not worth compositing to show nothing. Toggled
         rather than written every frame so the style is not thrashed. */
      const hidden = s.bottom <= 0 || s.top >= window.innerHeight;
      if (hidden !== lastHidden) {
        clipEl.style.visibility = hidden ? "hidden" : "visible";
        lastHidden = hidden;
      }
      if (hidden) return;

      const l = layer.getBoundingClientRect();
      clipEl.style.height = `${s.height}px`;
      clipEl.style.transform = `translate3d(0, ${s.top}px, 0)`;
      innerEl.style.transform = `translate3d(0, ${l.top - s.top}px, 0)`;
      imgEl.style.height = `${l.height}px`;

      /* THE CUT IS IN THE PICTURE, NOT IN THE BOX, and getting that wrong is
         invisible on a phone and obvious on a desktop. The image is
         object-cover, so it is scaled to fill the layer and the overflowing
         axis is cropped away, centred. On a narrow window the box is taller
         than the picture's aspect, so the crop is horizontal and a fraction
         down the box is the same fraction down the picture: every mobile
         reading of this agreed with the file. On a wide window the crop is
         vertical instead, only the middle of the picture is shown, and the same
         fraction of the box lands much further up the picture. At 1440 by 800
         it lands around 0.62, which is the figure's hip, so the man stopped
         occluding halfway down and the line crossed his legs in front.

         So the fraction is applied to the drawn picture and then mapped back
         into the box. naturalWidth/Height are read each tick rather than
         cached: they are 0 until the file decodes, and this component can mount
         before it does. */
      const nw = imgEl.naturalWidth;
      const nh = imgEl.naturalHeight;
      if (!nw || !nh) return;
      const drawn = nh * Math.max(l.width / nw, l.height / nh);
      innerEl.style.height = `${Math.max(0, (l.height - drawn) / 2 + FIGURE_END * drawn)}px`;
    };

    tick();
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div
      ref={clip}
      aria-hidden
      /* z-40 puts it over the line at z-30 and under nothing else that matters:
         the journey's own copy sits in its stage below both. */
      className="pointer-events-none fixed inset-x-0 top-0 z-40 overflow-hidden"
      style={{ visibility: "hidden" }}
    >
      {/* Two boxes, because two different things are being cut. The outer one
          reproduces the stage, which is what hides the strip the real
          foreground loses off the bottom of the opener. This one keeps only
          the figure, and the image inside it stays at the layer's full height
          so the picture is not squashed, just cropped. */}
      <div ref={inner} className="absolute inset-x-0 top-0 overflow-hidden">
        {/* The same file the stack already loaded, so this is a second paint
            and not a second download. */}
        <img src={FRONT} alt="" aria-hidden loading="eager" className={LAYER_IMG} />
      </div>
    </div>
  );
}

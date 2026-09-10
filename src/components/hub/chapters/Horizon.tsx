"use client";

import { BlackHoleHeroSection } from "@/components/hub/BlackHoleHeroSection";
import { chartPointAt } from "@/components/hub/chartPath";
import { useEnhanced } from "@/lib/useEnhanced";

/** The last chapter: the horizon.
 *
 *  The end of the journey is the one object you cannot look at directly. You
 *  only ever see what it does to the light around it, which is why it is the
 *  right thing to finish on and why it has to be arrived at rather than cut to.
 *
 *  THE CAMERA IS THE WHOLE CHAPTER. The component draws a black hole by firing
 *  one ray per pixel and walking it through curved space, so the halo over the
 *  shadow is the far side of the disc seen through bent light rather than a
 *  ring anyone drew. All this chapter does is move around it, and `elevation`
 *  is the prop that matters: the file's own note says the disc is edge-on near
 *  0, with the far side arching over the shadow as the halo everyone knows, and
 *  that past about 25 degrees the halo folds away and you are looking down at a
 *  ring instead. So the chapter opens high and far, where it reads as a ring
 *  seen from above, and comes down and in until the halo stands up over the
 *  shadow. The hole is not revealed by a cut. It is revealed by where you end
 *  up standing.
 *
 *  DRIVEN EXACTLY LIKE THE SYSTEM. Same author, same shape: the props live in a
 *  ref the animation loop reads each frame, so moving the camera never rebuilds
 *  the scene and costs nothing per stop.
 *
 *  THE QUALITY SETTINGS ARE DELIBERATELY BELOW THE DEFAULTS. A ray per pixel
 *  with 300 steps is the most expensive thing on this page by a distance, and
 *  the component's own advice is to drop `resolution` before `steps`. These are
 *  a conservative starting point rather than a measurement: the preview pane
 *  throttles animation frames, so a frame rate read here would be worthless.
 *  They want checking on real hardware and can go back up if there is room. */

type Stop = {
  distance: number;
  elevation: number;
  azimuth: number;
  fov: number;
  brightness: number;
  diskDensity: number;
};

/** Far and above, to close and edge-on. */
const STOPS: Stop[] = [
  { distance: 72, elevation: -17, azimuth: 0, fov: 38, brightness: 0.72, diskDensity: 0.82 },
  { distance: 31, elevation: -11.5, azimuth: 24, fov: 40, brightness: 0.94, diskDensity: 0.92 },
  { distance: 18, elevation: -6, azimuth: 50, fov: 42, brightness: 1.06, diskDensity: 1 },
  { distance: 11, elevation: -2.4, azimuth: 76, fov: 46, brightness: 1.18, diskDensity: 1.08 },
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (v: number) => v * v * (3 - 2 * v);

function cameraAt(t: number) {
  const pos = clamp(t, 0, 1) * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(pos));
  const raw = pos - i;
  // Smoothstep, so each stop is approached and left rather than run through.
  const e = raw * raw * (3 - 2 * raw);
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return {
    distance: mix(a.distance, b.distance, e),
    elevation: mix(a.elevation, b.elevation, e),
    azimuth: mix(a.azimuth, b.azimuth, e),
    fov: mix(a.fov, b.fov, e),
    brightness: mix(a.brightness, b.brightness, e),
    diskDensity: mix(a.diskDensity, b.diskDensity, e),
  };
}

/** How much of this chapter the arrival takes, and how big the light is when it
 *  starts.
 *
 *  THE SEQUENCE IS THE ONE THAT WAS ASKED FOR: fly into the sun until it fills
 *  the frame, cross the dark, and find the hole at the end of it. The chapter
 *  before this one finishes with the star at the top of its last rise, and that
 *  used to be the whole of the handover: a thin bright line, then a black hole
 *  dissolving over it. Two pictures with nothing between them.
 *  So this chapter now opens INSIDE the star. The light is centred on the exact
 *  point the chart leaves it and falls away over the first fifth of the
 *  chapter, onto black. Then the hole condenses out of that black, far off at
 *  distance 72, and the camera spends the rest of the chapter coming in.
 *  Flood, void, hole, in that order, and none of it is a cut.
 *
 *  IT IS A STAR, NOT A SHEET, AND THIS SENTENCE USED TO SAY OTHERWISE. It read
 *  "at a size that covers any frame", which is the reading that produced the
 *  360vmax version the client rejected on sight. The light is local: it blooms
 *  from the top right corner and never reaches the bottom left, and it is not
 *  what hides the hole. See LIT_FROM for what does.
 *
 *  IT RECEDES RATHER THAN FADES, which is the difference between flying past a
 *  star and someone turning a light off. It shrinks towards the point it is
 *  centred on while it dims, so the frame reads as depth opening up rather than
 *  as an overlay being taken away. */
const ARRIVE = 0.2;

/** THE LIGHT IS A STAR YOU FLY INTO, NOT A SHEET LAID OVER THE PAGE, and it was
 *  briefly made into one. Told that the hole showed up before the flash, I read
 *  it as the light not reaching far enough and took this to 360vmax with the
 *  stops opaque out to 0.72. That does cover every pixel of the frame, and it
 *  is why the whole of Data & Dashboards went cream: the chapter cross-fades in
 *  over the one before it, so a light that covers the frame covers the chart's
 *  headline, its body and its chips as well. Rejected on sight, correctly. The
 *  cause was never the size of the light. See LIT_FROM. */
const FLOOD_VMAX = 220;

/** WHEN THE HOLE IS LIT, AND WHY IT IS NOT LIT FROM THE FIRST FRAME.
 *
 *  THIS IS THE BUG THAT WAS REPORTED. A chapter's local `t` is 0 for the whole
 *  of the cross-fade that brings it in: the machine holds a scene at its own
 *  opening frame while its opacity ramps from nothing to one over 0.055 of the
 *  track. So for that entire ramp the flood sat at full AND the hole behind it
 *  faded up at the chapter's own opacity, together, in the same div. Wherever
 *  the light did not reach, and a star thrown from the top right corner does
 *  not reach the bottom left, the hole was arriving in the open. That is the
 *  black hole showing up before the flash, and it is a fault in the timing, not
 *  in the coverage.
 *
 *  So the hole gets its own fade and it starts after the light has gone rather
 *  than with it. 0.17 is where the flood is down to a sixteenth of its
 *  strength, and the ramp runs a quarter of the chapter, about a viewport of
 *  scroll: slow enough that the hole condenses out of the dark rather than
 *  switching on. Between the two there is a stretch with neither in it, which
 *  is the void the sequence is meant to cross.
 *
 *  THE CAMERA IS REMAPPED TO MATCH. It used to spend the first fifth of its
 *  approach behind the light and arrive at distance 51, when this file's own
 *  note above says it opens at 72. Holding it while the light is up gives the
 *  whole move back, and the hole is first seen as far off as it was meant to
 *  be. */
const LIT_FROM = 0.17;
const LIT_TO = 0.42;

/** WHAT THE RAY MARCHER IS ALLOWED TO COST, per layout.
 *
 *  IT IS THE PAGE'S WHOLE BUDGET AND IT WAS NOT BEING ASKED TO EARN IT. At the
 *  old settings on a 390 wide phone it renders a 585 x 722 canvas with the
 *  scene at 0.6 of that and 260 steps per ray, which is about 39 million
 *  ray-march iterations per frame, and it ran at whatever the display offered.
 *  Nothing else on the page is within two orders of magnitude of it: the
 *  starfield is drawn once and never again, the orbital canvas is 750k pixels
 *  of 2d, the waveform is a 422 x 422 shader.
 *
 *  THE FRAME CAP IS THE CHEAPEST CUT AND IT IS WHY IT IS HERE. Steps and
 *  resolution take something off every frame you look at; the cap takes whole
 *  frames away instead, and a camera this slow over a disc that turns this
 *  slowly does not read as juddering at 30. On a phone the three together take
 *  the work from about 39 million iterations sixty times a second to 12 million
 *  thirty times: a little over a tenth of what it was.
 *
 *  AND IT BARELY RUNS AT ALL WHILE IT IS DARK. The hole is invisible for the
 *  first sixth of its chapter and for the whole of the cross-fade that brings
 *  it in, which is about 1.8 viewports of scrolling. It was ray marching all of
 *  it. Eight frames a second there is enough to keep the camera current for the
 *  frame it becomes visible. */
const COST = {
  narrow: { steps: 140, resolution: 0.45, maxDpr: 1.25, fps: 30 },
  wide: { steps: 220, resolution: 0.55, maxDpr: 1.5, fps: 45 },
};
/** While nothing of it is on screen. */
const DARK_FPS = 8;

export function Horizon({ t }: { t: number }) {
  const wide = useEnhanced("(min-width: 1024px)");
  /* 1 inside the star, 0 once the dark has opened out. */
  const flood = 1 - smooth(clamp(t / ARRIVE, 0, 1));
  /* 0 while the light is up, 1 once the hole is all the way out of the dark. */
  const lit = smooth(clamp((t - LIT_FROM) / (LIT_TO - LIT_FROM), 0, 1));
  /* The approach starts where the reader first sees it, not a fifth of the way
     in behind the light. */
  const cam = cameraAt(clamp((t - LIT_FROM) / (1 - LIT_FROM), 0, 1));
  const [fx, fy] = chartPointAt(1);

  return (
    /* bg-black IS LOAD-BEARING AND WAS NOT HERE. The chapter had no ground of
       its own: the black it sat on was BlackHoleHeroSection's host, which is
       bg-black behind an alpha:false canvas. Putting the scene behind `lit`
       took that away, and for the first third of the chapter the whole thing
       was transparent over a Chart that is still mounted and still painting
       until t = 0.3025. The flood is centred on chartPointAt(1), which is
       exactly where the chart draws its own star, so the flash collapsed onto
       the chart's star and gave the chart back. There was no void to cross.
       The ground goes on the root, outside `lit`, so it arrives at the
       chapter's own cross-fade opacity: an ordinary dissolve to black, which is
       what this join always was, rather than a sheet over the chapter before. */
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* ITS OWN FADE, INSIDE THE CHAPTER'S. The scene stays mounted through it
          rather than being gated on `lit`: it is the most expensive thing on
          the page and mounting it here would compile its shaders in the middle
          of the flash. Mounted and dark costs what it already cost, and it is
          warm by the time it is wanted. */}
      <div className="absolute inset-0" style={{ opacity: lit }}>
        <BlackHoleHeroSection
          {...(wide ? COST.wide : COST.narrow)}
          fps={lit <= 0.01 ? DARK_FPS : (wide ? COST.wide : COST.narrow).fps}
          distance={cam.distance}
          elevation={cam.elevation}
          azimuth={cam.azimuth}
          fov={cam.fov}
          brightness={cam.brightness}
          diskDensity={cam.diskDensity}
          /* The copy sits bottom left, so the hole is held up and to the right. */
          focus={[0.66, 0.4]}
          /* The camera is already moving with the scroll; a second drift of its
             own would fight it and pull the eye off the rings. The gas still
             turns. */
          orbitSpeed={0}
          scrim="bottom"
          scrimStrength={0.85}
          className="h-full w-full"
        />
      </div>

      {/* THE STAR, ARRIVED INSIDE. Centred on chartPointAt(1), which is the
          chart's own last vertex and therefore the exact pixel its star
          finishes on, imported rather than retyped so the two cannot drift.
          A gradient rather than a canvas: one element, no loop, and it is only
          alive for a fifth of the chapter. */}
      {flood > 0.001 && (
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: `${fx * 100}%`,
            top: `${fy * 100}%`,
            width: `${FLOOD_VMAX}vmax`,
            height: `${FLOOD_VMAX}vmax`,
            transform: `translate(-50%, -50%) scale(${(0.06 + 0.94 * flood).toFixed(3)})`,
            opacity: flood,
            background:
              "radial-gradient(circle, rgba(255,252,242,1) 0%, rgba(255,244,214,0.98) 9%, rgba(255,214,140,0.72) 20%, rgba(255,178,86,0.28) 36%, rgba(255,150,60,0) 62%)",
            willChange: "transform, opacity",
          }}
        />
      )}
    </div>
  );
}

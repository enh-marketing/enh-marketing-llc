"use client";

import { BlackHoleHeroSection } from "@/components/hub/BlackHoleHeroSection";
import { chartPointAt } from "@/components/hub/chartPath";

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
 *  point the chart leaves it, at a size that covers any frame, and it falls
 *  away over the first fifth of the chapter. What is behind it is the black
 *  hole at distance 72, which is far enough to be a small ring in a lot of
 *  dark, and the camera spends the rest of the chapter coming in. Flood, void,
 *  hole, in that order, and none of it is a cut.
 *
 *  IT RECEDES RATHER THAN FADES, which is the difference between flying past a
 *  star and someone turning a light off. It shrinks towards the point it is
 *  centred on while it dims, so the frame reads as depth opening up rather than
 *  as an overlay being taken away. */
const ARRIVE = 0.2;
const FLOOD_VMAX = 220;

export function Horizon({ t }: { t: number }) {
  const cam = cameraAt(t);

  /* 1 inside the star, 0 once the dark has opened out. */
  const flood = 1 - smooth(clamp(t / ARRIVE, 0, 1));
  const [fx, fy] = chartPointAt(1);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <BlackHoleHeroSection
      distance={cam.distance}
      elevation={cam.elevation}
      azimuth={cam.azimuth}
      fov={cam.fov}
      brightness={cam.brightness}
      diskDensity={cam.diskDensity}
      /* The copy sits bottom left, so the hole is held up and to the right. */
      focus={[0.66, 0.4]}
      /* The camera is already moving with the scroll; a second drift of its own
         would fight it and pull the eye off the rings. The gas still turns. */
      orbitSpeed={0}
      resolution={0.6}
      steps={260}
      maxDpr={1.5}
        scrim="bottom"
        scrimStrength={0.85}
        className="h-full w-full"
      />

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

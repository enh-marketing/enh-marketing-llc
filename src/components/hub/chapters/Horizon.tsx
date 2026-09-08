"use client";

import { BlackHoleHeroSection } from "@/components/hub/BlackHoleHeroSection";

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

export function Horizon({ t }: { t: number }) {
  const cam = cameraAt(t);

  return (
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
  );
}

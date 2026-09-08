"use client";

import { OrbitalHeroSection } from "@/components/hub/OrbitalHeroSection";
import ParticleDrift from "@/components/hub/ParticleDrift";
import { ENTRY_ON_SCREEN } from "@/components/hub/sun";

/** Chapter two: the system.
 *
 *  What used to be OrbitalJourney, with the scroll listener taken out. It no
 *  longer measures anything: the machine hands it `t`, 0 to 1 across its own
 *  stretch of the track, and everything here is a function of that. Nothing
 *  else changed, which is the point of the machine.
 *
 *  WHY THE CAMERA IS CHEAP TO MOVE. Orbital keeps its props in a ref that it
 *  reassigns on every render, and its animation loop reads that ref each
 *  frame, while its own effect has an empty dependency list. Changing the
 *  camera never tears the scene down; the next frame simply draws from
 *  somewhere else. tilt, spin, roll, viewRadius and focus are read straight
 *  into the per-frame layout and cost nothing. alignToCourse, eccentricity and
 *  planeSpread rebuild the orbital elements, which the component guards behind
 *  a key check and which is eight planets of trigonometry.
 *
 *  THE PARTICLE STOP. One camera position carries a second layer, the Particle
 *  Drift frame, faded in as that stop is approached and out again as it is
 *  left, so the drifting network belongs to AI Search Visibility and nothing
 *  else. `transparent` stops it painting its own black plate over the system,
 *  `mix-blend-mode: screen` adds its light rather than covering, and
 *  `pointer-events: none` leaves the cursor to Orbital, with `followPointer`
 *  posting that same cursor into the frame so both layers answer it. `beams`
 *  is off: the effect draws letters and, separately, fast blue verticals, and
 *  only the letters are wanted. It is mounted only near its own stop.
 *
 *  THE ARRIVAL. The chapter does not open on its first camera stop. It opens
 *  with the Sun above the top of the frame and pressed close, and brings it
 *  down into the scene while pulling back, over the first sixth of the chapter.
 *  That is the other half of the hinge. The opener's light goes out behind the
 *  mountain before this is visible at all, so the star arrives from the top of
 *  the second scene rather than appearing inside the first one's glow: the same
 *  star, much closer, with nothing merging on screen. `focus` is Orbital's own
 *  prop for where the Sun sits in the frame, so nothing here is faked with
 *  transforms.
 *
 *  `lead` has to go with it. Orbital does not draw the Sun at `focus`: it
 *  draws it at `focus` and then pushes it off by `lead` of the short side,
 *  along its course, so the Sun leads the frame it is flying through. That is
 *  right everywhere except at the join, where the Sun has to be exactly where
 *  the photograph left it, and its default 0.12 measured as a 49px error on a
 *  410 wide viewport. It is zero at the join and eases back to the default as
 *  the camera pulls out.
 *
 *  The entry is layered over the stop mapping rather than being a stop of its
 *  own, so it does not renumber the stops or move the beats that were placed
 *  against them. */

type Stop = {
  tilt: number;
  spin: number;
  roll: number;
  viewRadius: number;
  alignToCourse: number;
  eccentricity: number;
  planeSpread: number;
  driftSpeed: number;
  glow: number;
  focusX: number;
  focusY: number;
  particles?: boolean;
};

/** The camera at each stop, in the order the chapter passes through them. */
const STOPS: Stop[] = [
  // Straight down on the disc. Rings, near-circular, barely drifting.
  { tilt: 14, spin: 140, roll: -6, viewRadius: 2.3, alignToCourse: 0, eccentricity: 0,
    planeSpread: 0.1, driftSpeed: 0.35, glow: 1, focusX: 0.5, focusY: 0.5 },
  // AI Search Visibility. Camera tips over and the network drifts across it.
  { tilt: 52, spin: 196, roll: 2, viewRadius: 2.8, alignToCourse: 0.3, eccentricity: 0.12,
    planeSpread: 0.45, driftSpeed: 0.9, glow: 0.85, focusX: 0.72, focusY: 0.46, particles: true },
  // Orbital's own default: the helix, all planes swung onto one axis.
  { tilt: 45, spin: 252, roll: 13.5, viewRadius: 3.4, alignToCourse: 1, eccentricity: 0.25,
    planeSpread: 1, driftSpeed: 1.5, glow: 1, focusX: 0.68, focusY: 0.44 },
  // Edge on and wide, the coils running away across the frame.
  { tilt: 84, spin: 306, roll: 22, viewRadius: 4.4, alignToCourse: 1, eccentricity: 0.34,
    planeSpread: 1, driftSpeed: 2.1, glow: 0.9, focusX: 0.5, focusY: 0.54 },
];

const PARTICLE_AT = STOPS.findIndex((s) => s.particles);

/** How much of the chapter the pull-back takes, and how close it starts. A
 *  smaller radius is a tighter view; the first stop sits at 2.3. */
const ENTRY_SPAN = 0.16;
/** How much of the arrival happens before the stage pins. */
const ARRIVE_BEFORE_PIN = 0.5;
const ENTRY_RADIUS = 0.8;
/** Orbital's own default, which the arrival has to start from zero and reach. */
const LEAD = 0.12;

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
    tilt: mix(a.tilt, b.tilt, e),
    spin: mix(a.spin, b.spin, e),
    roll: mix(a.roll, b.roll, e),
    viewRadius: mix(a.viewRadius, b.viewRadius, e),
    alignToCourse: mix(a.alignToCourse, b.alignToCourse, e),
    eccentricity: mix(a.eccentricity, b.eccentricity, e),
    planeSpread: mix(a.planeSpread, b.planeSpread, e),
    driftSpeed: mix(a.driftSpeed, b.driftSpeed, e),
    glow: mix(a.glow, b.glow, e),
    focusX: mix(a.focusX, b.focusX, e),
    focusY: mix(a.focusY, b.focusY, e),
  };
}

/** Full across the particle stop, ramped either side, gone well before the
 *  neighbouring stops. A plateau rather than a triangle: a triangle is at full
 *  strength only at the exact stop and does not reach zero until a whole stop
 *  away, which measured as the iframe being alive across two thirds of the
 *  chapter in order to be visible for a fifth of it. */
const PARTICLE_HOLD = 0.2; // stops either side of PARTICLE_AT still at full
const PARTICLE_RAMP = 0.35; // and fading across this many more

function particleLevel(t: number) {
  if (PARTICLE_AT < 0) return 0;
  const pos = clamp(t, 0, 1) * (STOPS.length - 1);
  const d = Math.abs(pos - PARTICLE_AT);
  return clamp(1 - (d - PARTICLE_HOLD) / PARTICLE_RAMP, 0, 1);
}

export function System({
  t,
  reveal,
  stageOffset,
}: {
  t: number;
  reveal: number;
  stageOffset: number;
}) {
  const cam = cameraAt(t);

  /* THE ARRIVAL RUNS ACROSS THE JOIN. Half of it happens while the stage is
     still climbing into place, measured by `reveal`, and half after it has
     pinned, measured by the chapter's own progress. Driven from `t` alone,
     nothing moved until the stage had already arrived. One number that does
     not stop at the seam is what makes the descent continuous.

     1 at the very start of the arrival, 0 once the pull-back is done. */
  const arrive =
    reveal < 1
      ? ARRIVE_BEFORE_PIN * reveal
      : ARRIVE_BEFORE_PIN + (1 - ARRIVE_BEFORE_PIN) * clamp(t / ENTRY_SPAN, 0, 1);
  const entry = 1 - smooth(arrive);
  const viewRadius = mix(cam.viewRadius, ENTRY_RADIUS, entry);
  /* The star is placed on the window and the camera worked out from it, rather
     than the other way round: `focus` is measured against the stage, so while
     the stage is still climbing, whatever it has left to climb is subtracted.
     Anchored to the stage instead, the star rides up with the arriving section
     and then reverses, which is what read as appearing from nowhere. */
  const focusX = mix(cam.focusX, ENTRY_ON_SCREEN.x, entry);
  const focusY = mix(cam.focusY, ENTRY_ON_SCREEN.y, entry) - stageOffset;
  const lead = mix(LEAD, 0, entry);
  /* The rings belong to the opening, where the orbits are still near-circular
     and nested. Past that they would be a thicket. */
  const showOrbits = cam.alignToCourse < 0.2;
  const particles = particleLevel(t);

  return (
    <OrbitalHeroSection
      tilt={cam.tilt}
      spin={cam.spin}
      roll={cam.roll}
      viewRadius={viewRadius}
      alignToCourse={cam.alignToCourse}
      eccentricity={cam.eccentricity}
      planeSpread={cam.planeSpread}
      driftSpeed={cam.driftSpeed}
      glow={cam.glow}
      focus={[focusX, focusY]}
      lead={lead}
      showOrbits={showOrbits}
      scrim="bottom"
      scrimStrength={0.8}
    >
      {particles > 0.01 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ opacity: particles, mixBlendMode: "screen" }}
        >
          <ParticleDrift
            transparent
            followPointer
            beams={false}
            density={0.9}
            speed={0.8}
            className="h-full w-full"
          />
        </div>
      )}
    </OrbitalHeroSection>
  );
}

"use client";

import { useEffect } from "react";
import {
  OrbitalHeroSection,
  SOLAR_SYSTEM,
  type Planet,
} from "@/components/hub/OrbitalHeroSection";
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
  /** How long a wake each planet drags, and how many orbits it may cover. */
  trailYears: number;
  maxTurns: number;
  /** How much of each planet is left. 1 is drawn, 0 is gone. */
  fade: number;
  particles?: boolean;
};

/** The camera at each stop, in the order the chapter passes through them.
 *
 *  WHAT MAKES THE PLANETS CROSS THE WHOLE FRAME is not the camera, it is the
 *  wake: `driftSpeed` times `trailYears`, capped per planet by `maxTurns`. The
 *  component offsets each trail backwards along the Sun's course by
 *  `driftSpeed * age` in world units, so the streak's on-screen length grows
 *  with both. At the values the first three stops use it spans about 0.9 of a
 *  half-short-side, which is comfortably inside the frame; at the scatter stop
 *  it reaches nearly four, which runs off both edges. All three are read fresh
 *  into the draw each frame, so this costs nothing. */
const STOPS: Stop[] = [
  // Straight down on the disc. Rings, near-circular, barely drifting.
  { tilt: 14, spin: 140, roll: -6, viewRadius: 2.3, alignToCourse: 0, eccentricity: 0,
    planeSpread: 0.1, driftSpeed: 0.35, glow: 1, focusX: 0.5, focusY: 0.5,
    trailYears: 2.6, maxTurns: 3, fade: 1 },
  // AI Search Visibility. Camera tips over and the network drifts across it.
  { tilt: 52, spin: 196, roll: 2, viewRadius: 2.8, alignToCourse: 0.3, eccentricity: 0.12,
    planeSpread: 0.45, driftSpeed: 0.9, glow: 0.85, focusX: 0.72, focusY: 0.46,
    trailYears: 2.6, maxTurns: 3, fade: 1, particles: true },
  // AI & Automation. Orbital's own default: the helix, planes on one axis.
  { tilt: 45, spin: 252, roll: 13.5, viewRadius: 3.4, alignToCourse: 1, eccentricity: 0.25,
    planeSpread: 1, driftSpeed: 1.5, glow: 1, focusX: 0.68, focusY: 0.44,
    trailYears: 2.6, maxTurns: 3, fade: 1 },
  // AI Creative Production. The scatter: in close, planes fanned, orbits pulled
  // long, and the wake driven hard enough to throw colour clean off both edges.
  { tilt: 62, spin: 300, roll: 8, viewRadius: 2.4, alignToCourse: 0.35, eccentricity: 0.6,
    planeSpread: 1, driftSpeed: 5, glow: 1, focusX: 0.5, focusY: 0.5,
    trailYears: 5, maxTurns: 6, fade: 1 },
  // Still crossing, and beginning to go.
  { tilt: 70, spin: 330, roll: 4, viewRadius: 2.6, alignToCourse: 0.2, eccentricity: 0.6,
    planeSpread: 1, driftSpeed: 5.5, glow: 1, focusX: 0.5, focusY: 0.5,
    trailYears: 5, maxTurns: 6, fade: 0.3 },
  // Nothing left but the Sun and the line it is drawing.
  { tilt: 78, spin: 352, roll: 0, viewRadius: 3, alignToCourse: 0.2, eccentricity: 0.6,
    planeSpread: 1, driftSpeed: 4, glow: 1, focusX: 0.5, focusY: 0.55,
    trailYears: 4, maxTurns: 6, fade: 0 },
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
    trailYears: mix(a.trailYears, b.trailYears, e),
    maxTurns: mix(a.maxTurns, b.maxTurns, e),
    fade: mix(a.fade, b.fade, e),
  };
}

/** Rounded to a hundredth before it reaches the component.
 *
 *  `compress`, `planeSpread`, `eccentricity`, `alignToCourse` and `apex` are
 *  the props inside the component's rebuild key, and a change to any of them
 *  rebuilds all eight planets' orbital elements, which is eight sets of
 *  trigonometry plus a plane swing each. Fed a fresh float every frame, as this
 *  chapter did, that rebuild ran on every frame of every scroll. Quantised, it
 *  runs about a hundred times across the whole chapter instead. A hundredth of
 *  planeSpread is under a degree of inclination, which is not visible, and the
 *  camera props that carry the motion are left continuous. */
const q = (v: number) => Math.round(v * 100) / 100;

/** The planet objects this chapter hands the component, and then goes on
 *  editing in place.
 *
 *  MODULE SCOPE, DELIBERATELY, because the identity of this array and of the
 *  objects in it is load-bearing and no React hook gives that cleanly. The
 *  component keeps a reference to the objects it last rebuilt from and reads
 *  each planet's size and glow off that reference every frame, while its
 *  rebuild key covers only a planet's name, a, e and colour. Replace the array
 *  and the key still matches, so it never rebuilds, and every later edit lands
 *  on objects nothing is reading. A ref cannot be read during render, and state
 *  must not be mutated; this can be both, and the page mounts one system.
 *
 *  Copies, because SOLAR_SYSTEM is the component's own module-level export and
 *  is not ours to edit. The effect below rewrites both fields from those
 *  originals on every change, so nothing accumulates and a remount is correct
 *  on its first frame. */
const PLANETS: Planet[] = SOLAR_SYSTEM.map((p) => ({ ...p }));

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

  /* THE PLANETS FADE BY BEING SHRUNK AND DIMMED IN PLACE, on one array that is
     never replaced. Three things force this shape and each was read out of the
     component rather than assumed.

     There is no planets-only opacity. The single global `glow` is shared by the
     planets, the Sun's track and the Sun, so turning it down takes the Sun with
     it, and the Sun is the one thing that has to survive.

     Per-planet `glow` is not enough on its own. It scales the trails and the
     halo, but the white core dot is drawn at a reset alpha and a fixed colour,
     so at glow 0 eight hard white dots would still be going round. Only
     per-planet `size` reaches that, because the core's radius is size * 0.5.

     And the values have to be MUTATED, not passed. The component rebuilds its
     orbital elements only when its key changes, and that key covers a planet's
     name, a, e and colour but not its size or glow. It also keeps a reference
     to the planet object it last rebuilt from and reads size and glow off that
     object every frame. So handing it a freshly mapped array of new objects
     with the same names changes nothing: the key matches, it returns early, and
     it goes on reading the old objects. Mutating the objects it is already
     holding is what actually lands. They are copies, because the component's
     SOLAR_SYSTEM export is module-level and shared. */
  useEffect(() => {
    const fade = cameraAt(t).fade;
    for (let i = 0; i < PLANETS.length; i++) {
      const base = SOLAR_SYSTEM[i];
      PLANETS[i].size = base.size * fade;
      PLANETS[i].glow = (base.glow ?? 1) * fade;
    }
  }, [t]);

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
      planets={PLANETS}
      alignToCourse={q(cam.alignToCourse)}
      eccentricity={q(cam.eccentricity)}
      planeSpread={q(cam.planeSpread)}
      trailYears={cam.trailYears}
      maxTurns={cam.maxTurns}
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

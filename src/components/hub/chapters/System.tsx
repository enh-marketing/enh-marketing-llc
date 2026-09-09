"use client";

import { useEffect } from "react";
import { useEnhanced } from "@/lib/useEnhanced";
import {
  OrbitalHeroSection,
  SOLAR_SYSTEM,
  type Planet,
} from "@/components/hub/OrbitalHeroSection";
import { HANDOVER_X, HANDOVER_Y } from "@/components/hub/chartPath";
import { type TrackCamera } from "@/components/hub/TrackChart";
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
 *  THERE IS NO SECOND LAYER ON THE SEARCH STOP, and there was. A Particle
 *  Drift frame used to fade in across AI Search Visibility, drawing a field of
 *  letters over the system. It was cut on 2026-09-08: it read as cheap, and
 *  its faint arcs were being taken for a second orbital system that then
 *  vanished. Removing it also took out an <iframe srcDoc> that shipped a
 *  fictional company's landing page in our source and fetched four scripts
 *  from three third-party CDNs at runtime. If a treatment is ever wanted here
 *  it should be drawn on the orbital canvas, not layered over it in a frame.
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
 *  right everywhere except at the opening join, where the Sun has to be exactly
 *  where the photograph left it, and its default 0.12 measured as a 49px error
 *  on a 410 wide viewport. It is zero there and eases back to the default as
 *  the camera pulls out. The closing join does not need the same treatment; the
 *  note on LEAD below says why.
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
  /** How far past `focus` the Sun is pushed along its course. See LEAD. */
  lead: number;
  /** How long a wake each planet drags, and how many orbits it may cover. */
  trailYears: number;
  maxTurns: number;
  /** How much of each planet is left. 1 is drawn, 0 is gone. */
  fade: number;
};

/** Orbital's own default, which the arrival has to start from zero and reach,
 *  and which the scatter has to know to find the Sun.
 *
 *  IT IS OFF ONCE THE CAMERA PARKS. `lead` pushes the Sun ahead of `focus` so
 *  it leads the frame it is flying through, which is worth having while the
 *  camera is travelling and is meaningless once it has stopped. It is also
 *  measured against the SHORT side of the frame while `focus` is measured
 *  against the width, so with it on, the star's resting place depended on the
 *  aspect ratio: 0.571 of the width at 1600x950 and 0.62 at 410x900. The star
 *  now has to be at one number that the waveform and the chart can both be
 *  built on, so the last two stops carry no lead and it sits exactly on
 *  HANDOVER_X everywhere. */
const LEAD = 0.12;

/** The camera at each stop, in the order the chapter passes through them.
 *
 *  THE CAMERA STOPS TRAVELLING AT STOP 2, and now actually does. Every field in
 *  the last stop is copied from the one before it apart from the roll and the
 *  wake: same tilt, same spin, same zoom, and above all the same `focus`, so the
 *  scene does not go anywhere. Only the angle changes, and what the angle does
 *  is straighten the trails.

 *  IT USED TO SLIDE, AND THAT IS WHAT THE PAGE WAS REPORTING. The last stop
 *  pulled `focus` over to 0.12 of the width so the Sun would land on the chart's
 *  first vertex, so across AI Creative Production the whole system drifted left,
 *  ran under the copy, and finished jammed against the edge with most of the
 *  frame empty. Nothing needed it to: see the note on CHART_CAMERA.
 *
 *  HOW A PATH BECOMES A STRAIGHT LINE. The component offsets every trail
 *  backwards along the Sun's own course by `driftSpeed` times its age, so a
 *  wake is an orbit plus a straight drift. At the values the early stops use
 *  the orbit dominates and you see loops. Drive `driftSpeed` hard and the drift
 *  dominates instead: the loops open out until every planet is drawing a long
 *  line running parallel to the Sun's, which is the shape the chart is made of.
 *  Both it and `trailYears` are outside the component's rebuild key, so this
 *  costs nothing per frame. */
const STOPS: Stop[] = [
  // Straight down on the disc. Rings, near-circular, barely drifting.
  { tilt: 14, spin: 140, roll: -6, viewRadius: 2.3, alignToCourse: 0, eccentricity: 0,
    planeSpread: 0.1, driftSpeed: 0.35, glow: 1, focusX: 0.5, focusY: 0.5, lead: LEAD,
    trailYears: 2.6, maxTurns: 3, fade: 1 },
  // 01 AI Search Visibility. Camera tips over and the network drifts across it.
  { tilt: 52, spin: 196, roll: 2, viewRadius: 2.8, alignToCourse: 0.3, eccentricity: 0.12,
    planeSpread: 0.45, driftSpeed: 0.9, glow: 0.85, focusX: 0.72, focusY: 0.46, lead: LEAD,
    trailYears: 2.6, maxTurns: 3, fade: 1 },
  // 02 AI & Automation. The helix.
  { tilt: 45, spin: 252, roll: 13.5, viewRadius: 3.4, alignToCourse: 1, eccentricity: 0.25,
    planeSpread: 1, driftSpeed: 1.5, glow: 1, focusX: HANDOVER_X, focusY: HANDOVER_Y, lead: 0,
    trailYears: 2.6, maxTurns: 3, fade: 1 },
  // 03 AI Creative Production, and the hand-over to the voice.
  //
  // THE ROLL IS SOLVED, NOT CHOSEN. Every trail runs along the Sun's own
  // course, and the on-screen angle of that course is a pure rotation by
  // `roll`: writing a = D.right and b = D.up at roll 0, the projected
  // direction is (a cos C + b sin C, -a sin C + b cos C), which is (a, b)
  // turned by -C. So the roll that lays the course flat on the screen is
  // atan2(b, a), and for this apex and camera that is 51.4728 degrees.
  // Checked numerically: the vertical component of the course comes out at
  // 5.6e-17 and the on-screen angle at 0.000000000 degrees.
  //
  // That is what lets the next chapter work. The trails arrive horizontal,
  // parallel and coloured, and the waveform that replaces them is four
  // horizontal coloured lines, so the two cross-fade as the same picture
  // rather than as one thing leaving and another arriving.
  //
  // The camera does move here, which the note above says it should not. It
  // moved for a reason both times: there it was drift competing with the
  // straightening, here the rotation IS the straightening, and it lands with
  // the trails flat rather than mid-swing.
  { tilt: 45, spin: 252, roll: 51.4728, viewRadius: 3.4, alignToCourse: 1, eccentricity: 0.25,
    planeSpread: 1, driftSpeed: 7, glow: 1, focusX: HANDOVER_X, focusY: HANDOVER_Y, lead: 0,
    trailYears: 5, maxTurns: 6, fade: 1 },
];
/** The camera the chart is handed.
 *
 *  IT IS NOT WHAT MAKES THE JOIN LINE UP, and an earlier note here said it was.
 *  TrackChart destructures `camera` and then never reads it again except in one
 *  effect's dependency array: it draws CHART_PATH straight in the stage's own
 *  normalised coordinates. Nor does anything have to line up across: the
 *  waveform is opaque and full width, so this chapter's Sun is off screen by
 *  the time the chart's own Sun appears. The only thing shared is HANDOVER_Y.
 *
 *  Still read from the last stop rather than retyped, so if it is ever wired up
 *  it cannot already have drifted. */
export const CHART_CAMERA: TrackCamera = {
  spin: STOPS[STOPS.length - 1].spin,
  tilt: STOPS[STOPS.length - 1].tilt,
  roll: STOPS[STOPS.length - 1].roll,
  focusX: STOPS[STOPS.length - 1].focusX,
  focusY: STOPS[STOPS.length - 1].focusY,
  lead: STOPS[STOPS.length - 1].lead,
  apex: [272, 53],
};

/** How much of the chapter the pull-back takes, and how close it starts. A
 *  smaller radius is a tighter view; the first stop sits at 2.3. */
const ENTRY_SPAN = 0.16;
/** How much of the arrival happens before the stage pins. */
const ARRIVE_BEFORE_PIN = 0.5;
const ENTRY_RADIUS = 0.8;

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
    lead: mix(a.lead, b.lead, e),
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
 *  on its first frame.
 *
 *  AND THE ORBITS ARE COMPRESSED, which is why this chapter looked like two
 *  systems rather than one. SOLAR_SYSTEM carries the real semi-major axes, and
 *  those span 0.387 AU at Mercury to 30.069 at Neptune: a range of 78 to 1.
 *  No single viewRadius can hold that. At the 2.3 to 3.4 this chapter uses,
 *  the four rocky planets draw a tight knot of rings around the Sun while
 *  Jupiter, Saturn, Uranus and Neptune sit two to eleven times outside the
 *  frame and cross it only as long arcs with a lone dot on the end. Read on a
 *  wide screen that is a small system plus a big one, and it was reported as a
 *  duplicated component.
 *
 *  A POWER LAW, NOT A CLAMP, so the order and the sense of falling off with
 *  distance both survive: a' = 0.6 * a^0.375 puts Mercury at 0.42 and Neptune
 *  at 2.15, a range of 5.1 to 1, with every planet inside the tightest view
 *  the chapter uses. Nothing else about them is touched: eccentricity,
 *  inclination, node, periapsis and phase are all still the real ones, so the
 *  rosette is the same shape, just gathered.
 *
 *  `a` sits inside the component's rebuild key, so this has to be done once
 *  here at module scope and never per frame. */
const ORBIT_SCALE = 0.6;
const ORBIT_FALLOFF = 0.375;

const PLANETS: Planet[] = SOLAR_SYSTEM.map((p) => ({
  ...p,
  a: ORBIT_SCALE * Math.pow(p.a, ORBIT_FALLOFF),
}));

/** How far up the scene slides on a narrow screen, in viewport heights. The
 *  copy owns the bottom 40% there, so the system is moved clear of it. */
const LIFT_VH = 13;

export function System({
  t,
  reveal,
  stageOffset,
}: {
  t: number;
  reveal: number;
  stageOffset: number;
}) {
  /* Not a width read on every frame: useEnhanced holds one matchMedia listener
     and re-renders only when the breakpoint itself changes. */
  const compact = !useEnhanced("(min-width: 1024px)");
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
    /* THE ORIGINALS GO QUICKLY, AND THAT IS THE POINT. ScatterField reads the
       planets off the canvas on the first frame of the scatter and then flies
       those exact points outward. If the component went on drawing its own
       planets on their orbits while the copies travelled, both sets would be on
       screen together and it would read as duplication rather than departure.
       So the originals are gone within the first seventh of the leg, while the
       copies are still nearly on top of them. Derived from the scatter rather
       than interpolated between the stops, because it has to run much faster
       than everything else in that leg. */
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
  /* THE SCENE MOVES UP ON A PHONE, so the copy can have the bottom two fifths
     to itself instead of being laid over whatever the system is doing there.
     It is a transform on the host rather than a change to `focus`, and that is
     deliberate: focus is read by the chart camera, by the Sun's closed form and
     by the opener's handover, and shifting it would put all three out. Moving
     the whole box moves the picture and everything drawn in it together, and
     nothing inside has to know.

     IT RAMPS IN AFTER THE ARRIVAL, never during it. The opener hands the page
     over on the Sun's exact position, so for the first sixth of the chapter the
     scene has to be where the photograph left it, to the pixel. The lift starts
     once that is done and is complete a tenth of the chapter later. */
  const lift = compact ? -LIFT_VH * smooth(clamp((t - 0.18) / 0.09, 0, 1)) : 0;

  const focusX = mix(cam.focusX, ENTRY_ON_SCREEN.x, entry);
  const focusY = mix(cam.focusY, ENTRY_ON_SCREEN.y, entry) - stageOffset;
  const lead = mix(cam.lead, 0, entry);
  /* The rings belong to the opening, where the orbits are still near-circular
     and nested. Past that they would be a thicket. */
  const showOrbits = cam.alignToCourse < 0.2;


  return (
    <OrbitalHeroSection
      data-orbital-host=""
      style={lift ? { transform: `translateY(${lift}vh)` } : undefined}
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
      /* Off, and it has to be. The component eases the camera up to 7 degrees
         of yaw and 5 of pitch toward the pointer, in state nothing outside can
         read. With it on, the Sun is not where the arithmetic in ScatterField
         says it is, and the scatter would open out of the wrong point. It is
         also the second thing moving the camera in a stretch where the camera
         is supposed to be still. */
      /* A DENSER SKY, SET ONCE AT MOUNT. The default 1500 reads as almost
         nothing here: measured over the top third of the frame, where no
         planet or chart reaches, it puts 232 lit samples on a canvas of half a
         million pixels, a mean level of 0.03 out of 255. That was survivable
         while the frame was full of orbits and it is not once the planets have
         gone and the chart is the only thing left, which is exactly where it
         was noticed.
         It has to be a constant. The component seeds its stars in buildStars,
         which is only ever called from its resize handler, and that returns
         early when the box has not changed size, so a starCount raised later
         does nothing at all. There is no brightness prop for them either, so
         count is the only lever. */
      /* Its own sky is left at its default. The page draws the field it
         actually relies on in hub/Starfield, screened over the top rather than
         placed behind, because this component takes its context with
         `alpha: false` and its canvas is therefore opaque no matter what sits
         behind it or what background its host is given. */
      interactive={false}
      /* ON THROUGHOUT NOW. The chart used to begin inside this chapter and the
         track had to be handed over mid-leg; the chart is its own chapter, so
         the Sun keeps its track for the whole of this one and the waveform
         takes over at the join. */
      showSunTrack
      scrim="bottom"
      scrimStrength={0.8}
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { OrbitalHeroSection } from "@/components/hub/OrbitalHeroSection";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

/** One solar system, one camera, moved by the scroll.
 *
 *  WHY THIS WORKS RATHER THAN COSTING A REBUILD PER FRAME. Orbital keeps its
 *  props in a ref that it reassigns on every render, and its animation loop
 *  reads that ref each frame. Its effect has an empty dependency list, so
 *  changing a prop never tears the scene down: the next frame simply draws
 *  from a different camera. That is what makes a scroll-driven camera cheap
 *  here and impossible with most background components.
 *
 *  WHAT IS FREE AND WHAT IS NOT. tilt, spin, roll, viewRadius and focus are
 *  read straight into the per-frame layout, so moving them costs nothing.
 *  alignToCourse, eccentricity and planeSpread rebuild the orbital elements,
 *  which the component guards behind a key check: eight planets of trigonometry
 *  when one of them changes. Both are animated here and neither shows.
 *
 *  ONE INSTANCE, NOT FOUR. Four separate sections meant four canvases and four
 *  scenes. This is a single canvas held still by `sticky` while a tall track
 *  scrolls past it, so the whole run costs exactly what one section used to.
 *
 *  THE SHAPE OF THE MOVE. It opens looking straight down on a near-circular
 *  disc with the orbit rings drawn, tips over toward edge-on as the planes fan
 *  apart and the orbits stretch, swings into the helix as the Sun's course
 *  takes over, then pulls back wide. Reversing the scroll reverses all of it,
 *  because the camera is a function of position rather than a sequence that
 *  has been played.
 *
 *  REDUCED MOTION holds the first stop and never moves the camera. Orbital
 *  separately holds a single frame of its own animation, so a reader who has
 *  asked for no motion gets one still picture.
 *
 *  THE COPY IS A PLACEHOLDER. It describes the picture, which is the one thing
 *  that can be said truthfully without a document for this page. No claim
 *  about the business is made here. */

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
};

/** The camera at each stage. Interpolated between, never jumped. */
const STOPS: Stop[] = [
  // Straight down on the disc. Rings, near-circular, barely drifting.
  { tilt: 14, spin: 140, roll: -6, viewRadius: 2.3, alignToCourse: 0, eccentricity: 0, planeSpread: 0.1, driftSpeed: 0.35, glow: 1, focusX: 0.5, focusY: 0.5 },
  // Tipping over. The planes start to fan and the orbits to stretch.
  { tilt: 52, spin: 196, roll: 2, viewRadius: 2.8, alignToCourse: 0.3, eccentricity: 0.12, planeSpread: 0.45, driftSpeed: 0.9, glow: 1, focusX: 0.44, focusY: 0.48 },
  // The component's own default: the helix, all planes swung onto one axis.
  { tilt: 45, spin: 252, roll: 13.5, viewRadius: 3.4, alignToCourse: 1, eccentricity: 0.25, planeSpread: 1, driftSpeed: 1.5, glow: 1, focusX: 0.68, focusY: 0.44 },
  // Edge on and wide, the coils running away across the frame.
  { tilt: 84, spin: 306, roll: 22, viewRadius: 4.4, alignToCourse: 1, eccentricity: 0.34, planeSpread: 1, driftSpeed: 2.1, glow: 0.9, focusX: 0.5, focusY: 0.54 },
];

/** One caption per stop. Placeholder: it describes the picture, nothing more. */
const COPY: { title: string; body: string }[] = [
  { title: "Rings, from above", body: "Four rocky worlds on nearly the same plane, seen straight down." },
  { title: "The plane tips", body: "Tilt the camera and the nested rings become separate orbits crossing." },
  { title: "Nothing here stands still", body: "The Sun is running, and the planets chase it. Every track is a helix." },
  { title: "Edge on", body: "From the side, the coils run away from you into the dark." },
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** The camera at journey position p, 0 to 1. */
function cameraAt(p: number): Stop {
  const pos = clamp(p, 0, 1) * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(pos));
  const raw = pos - i;
  // Smoothstep, so each stop is approached and left rather than run through.
  const t = raw * raw * (3 - 2 * raw);
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return {
    tilt: mix(a.tilt, b.tilt, t),
    spin: mix(a.spin, b.spin, t),
    roll: mix(a.roll, b.roll, t),
    viewRadius: mix(a.viewRadius, b.viewRadius, t),
    alignToCourse: mix(a.alignToCourse, b.alignToCourse, t),
    eccentricity: mix(a.eccentricity, b.eccentricity, t),
    planeSpread: mix(a.planeSpread, b.planeSpread, t),
    driftSpeed: mix(a.driftSpeed, b.driftSpeed, t),
    glow: mix(a.glow, b.glow, t),
    focusX: mix(a.focusX, b.focusX, t),
    focusY: mix(a.focusY, b.focusY, t),
  };
}

export function OrbitalJourney() {
  const trackRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const r = track.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      // Lenis already smooths the scroll position, so the progress it yields is
      // smooth too and needs no easing of its own.
      setP(span <= 0 ? 0 : clamp(-r.top / span, 0, 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const cam = reduced ? STOPS[0] : cameraAt(p);
  /* The rings belong to the opening, where the orbits are still near-circular
     and nested. Past that they would be a thicket. */
  const showOrbits = cam.alignToCourse < 0.2;
  /* Which caption is up. Every one stays mounted and fades, so none of them
     remount as the reader scrolls. */
  const active = reduced ? 0 : Math.round(clamp(p, 0, 1) * (COPY.length - 1));

  return (
    <section
      ref={trackRef}
      data-section="AI Hub orbital journey"
      style={{ height: `${STOPS.length * 100}vh` }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <OrbitalHeroSection
          tilt={cam.tilt}
          spin={cam.spin}
          roll={cam.roll}
          viewRadius={cam.viewRadius}
          alignToCourse={cam.alignToCourse}
          eccentricity={cam.eccentricity}
          planeSpread={cam.planeSpread}
          driftSpeed={cam.driftSpeed}
          glow={cam.glow}
          focus={[cam.focusX, cam.focusY]}
          showOrbits={showOrbits}
          scrim="bottom"
          scrimStrength={0.8}
        >
          <div className="relative h-full w-full">
            {COPY.map((c, i) => (
              <div
                key={c.title}
                aria-hidden={i !== active}
                className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-[12vh] transition-opacity duration-700 motion-reduce:transition-none sm:px-10 lg:px-20"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <div className="max-w-[34rem]">
                  <h2 className="text-[2rem] font-light leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
                    {c.title}
                  </h2>
                  <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/60">{c.body}</p>
                </div>
              </div>
            ))}

            {/* Where you are in the run. */}
            <ol className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-2 sm:right-8" aria-hidden>
              {COPY.map((c, i) => (
                <li
                  key={c.title}
                  className="h-6 w-px transition-colors duration-500 motion-reduce:transition-none"
                  style={{ background: i === active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.22)" }}
                />
              ))}
            </ol>
          </div>
        </OrbitalHeroSection>
      </div>
    </section>
  );
}

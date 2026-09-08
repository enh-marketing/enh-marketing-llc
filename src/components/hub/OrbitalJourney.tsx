"use client";

import { useEffect, useRef, useState } from "react";
import { OrbitalHeroSection } from "@/components/hub/OrbitalHeroSection";
import ParticleDrift from "@/components/hub/ParticleDrift";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { hero as searchHero, meta as searchMeta } from "@/content/services/ai-search-visibility";

/** One solar system, one camera, moved by the scroll.
 *
 *  WHY THIS WORKS RATHER THAN COSTING A REBUILD PER FRAME. Orbital keeps its
 *  props in a ref that it reassigns on every render, and its animation loop
 *  reads that ref each frame. Its effect has an empty dependency list, so
 *  changing a prop never tears the scene down: the next frame simply draws
 *  from a different camera.
 *
 *  WHAT IS FREE AND WHAT IS NOT. tilt, spin, roll, viewRadius and focus are
 *  read straight into the per-frame layout, so moving them costs nothing.
 *  alignToCourse, eccentricity and planeSpread rebuild the orbital elements,
 *  which the component guards behind a key check.
 *
 *  THE PARTICLE STAGE. One stop carries a second layer: the Particle Drift
 *  frame, faded in as that stop is approached and out again as it is left, so
 *  the drifting data network belongs to AI Search Visibility and to nothing
 *  else. Three things make it sit over the scene rather than replace it:
 *
 *    `transparent` stops the frame painting its own black page colour, which
 *    would otherwise hide the solar system completely.
 *    `mix-blend-mode: screen` adds its light to what is underneath instead of
 *    covering it, which is right for particles on black.
 *    `pointer-events: none` leaves the pointer to Orbital, whose camera nudge
 *    would otherwise be swallowed by the frame on top of it.
 *
 *  It is mounted only while it is worth anything. An iframe running its own
 *  document, its own animation loop and four CDN scripts is not something to
 *  leave running behind three stops that never show it.
 *
 *  REDUCED MOTION holds the first stop and never moves the camera. Orbital
 *  separately holds a single frame of its own.
 *
 *  THE COPY. The particle stop uses AI Search Visibility's own approved words:
 *  the first line of its hero and its meta description, which is that
 *  document's opening sentence. The other three stops are placeholders that
 *  describe the picture and claim nothing. */

type Stage = {
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
  title: string;
  body: string;
  href?: string;
  /** Lays the Particle Drift frame over the scene at this stop. */
  particles?: boolean;
};

const STAGES: Stage[] = [
  {
    // Straight down on the disc. Rings, near-circular, barely drifting.
    tilt: 14, spin: 140, roll: -6, viewRadius: 2.3, alignToCourse: 0, eccentricity: 0,
    planeSpread: 0.1, driftSpeed: 0.35, glow: 1, focusX: 0.5, focusY: 0.5,
    title: "Rings, from above",
    body: "Four rocky worlds on nearly the same plane, seen straight down.",
  },
  {
    // The particle stage. Camera tips over and the network drifts across it.
    tilt: 52, spin: 196, roll: 2, viewRadius: 2.8, alignToCourse: 0.3, eccentricity: 0.12,
    planeSpread: 0.45, driftSpeed: 0.9, glow: 0.85, focusX: 0.72, focusY: 0.46,
    title: searchHero.lines[0],
    body: searchMeta.description,
    href: "/ai-hub/ai-search-visibility",
    particles: true,
  },
  {
    // The component's own default: the helix, all planes swung onto one axis.
    tilt: 45, spin: 252, roll: 13.5, viewRadius: 3.4, alignToCourse: 1, eccentricity: 0.25,
    planeSpread: 1, driftSpeed: 1.5, glow: 1, focusX: 0.68, focusY: 0.44,
    title: "Nothing here stands still",
    body: "The Sun is running, and the planets chase it. Every track is a helix.",
  },
  {
    // Edge on and wide, the coils running away across the frame.
    tilt: 84, spin: 306, roll: 22, viewRadius: 4.4, alignToCourse: 1, eccentricity: 0.34,
    planeSpread: 1, driftSpeed: 2.1, glow: 0.9, focusX: 0.5, focusY: 0.54,
    title: "Edge on",
    body: "From the side, the coils run away from you into the dark.",
  },
];

const PARTICLE_AT = STAGES.findIndex((s) => s.particles);

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** The camera at journey position p, 0 to 1. */
function cameraAt(p: number) {
  const pos = clamp(p, 0, 1) * (STAGES.length - 1);
  const i = Math.min(STAGES.length - 2, Math.floor(pos));
  const raw = pos - i;
  // Smoothstep, so each stop is approached and left rather than run through.
  const t = raw * raw * (3 - 2 * raw);
  const a = STAGES[i];
  const b = STAGES[i + 1];
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

/** How present the particle layer is at journey position p: full at its own
 *  stop, gone by the neighbouring ones. */
function particleLevel(p: number) {
  if (PARTICLE_AT < 0) return 0;
  const pos = clamp(p, 0, 1) * (STAGES.length - 1);
  return clamp(1 - Math.abs(pos - PARTICLE_AT), 0, 1);
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

  const cam = reduced ? STAGES[0] : cameraAt(p);
  /* The rings belong to the opening, where the orbits are still near-circular
     and nested. Past that they would be a thicket. */
  const showOrbits = cam.alignToCourse < 0.2;
  const active = reduced ? 0 : Math.round(clamp(p, 0, 1) * (STAGES.length - 1));
  const particles = reduced ? 0 : particleLevel(p);

  return (
    <section
      ref={trackRef}
      data-section="AI Hub orbital journey"
      style={{ height: `${STAGES.length * 100}vh` }}
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
            {/* The network, over the scene rather than instead of it. Only
                mounted while it is on screen: it is a whole second document. */}
            {particles > 0.01 && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ opacity: particles, mixBlendMode: "screen" }}
              >
                <ParticleDrift transparent density={0.9} speed={0.8} className="h-full w-full" />
              </div>
            )}

            {STAGES.map((s, i) => (
              <div
                key={s.title}
                aria-hidden={i !== active}
                className="absolute inset-x-0 bottom-0 px-6 pb-[12vh] transition-opacity duration-700 motion-reduce:transition-none sm:px-10 lg:px-20"
                style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
              >
                <div className="max-w-[36rem]">
                  <h2 className="text-[2rem] font-light leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/60">{s.body}</p>
                  {s.href && (
                    <a
                      href={s.href}
                      className="group mt-6 inline-flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white"
                    >
                      See the service
                      <span
                        aria-hidden
                        className="block h-px w-8 bg-brand transition-all duration-500 group-hover:w-14 motion-reduce:transition-none"
                      />
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Where you are in the run. */}
            <ol className="pointer-events-none absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-2 sm:right-8" aria-hidden>
              {STAGES.map((s, i) => (
                <li
                  key={s.title}
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

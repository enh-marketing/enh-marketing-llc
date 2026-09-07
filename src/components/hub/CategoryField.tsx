"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { categories, type FieldState } from "@/content/ai-hub";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { getLenis } from "@/components/fx/SmoothScroll";
import { cn } from "@/lib/cn";
import {
  claimFor,
  layoutGrid,
  renderFrame,
  settle,
  clamp,
  type Dot,
  type Pt,
} from "@/components/hub/fieldShapes";

/** The AI Hub's spine: one field of dots that rearranges itself per category.
 *
 *  WHY ONE FIELD RATHER THAN EIGHT SECTIONS. Eight separate full-height
 *  designs would mean a visitor can never see two categories at once, which is
 *  the one thing a pillar page has to allow: it exists to help someone pick
 *  which of the eight they need. It would also be eight animation loops and
 *  eight unrelated aesthetics. This is one loop and one material, and the
 *  changes between arrangements carry the page instead of dead joins between
 *  sections.
 *
 *  THE ONE RULE THE WHOLE THING IS BUILT ON. Dots, and what they reach toward.
 *  Every category is that same sentence in a different shape, which is also
 *  the argument of the page: eight ways of connecting a business to something
 *  it is trying to get to.
 *
 *  NOT THE 21ST.DEV FILE. The arrangement in state 01 is the idea from
 *  @designali-in/interactive-grid, rewritten rather than installed. That file
 *  puts its requestAnimationFrame loop in an effect keyed on a mouse position
 *  held in React state, with no cleanup, so every pointer move starts another
 *  permanent loop: measured at 60 callbacks a second at rest and 1,260 after
 *  twenty movements, and at full-viewport size two hundred movements took a
 *  1,440-dot field from 60fps to 27fps and falling. It also has no
 *  devicePixelRatio handling, no reduced-motion path, an unused `repaintAlpha`
 *  prop, and a stale closure over `hue` that renders it red by accident rather
 *  than by choice. What is kept here is the idea, which is a good one. */

export function CategoryField() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  const dotsRef = useRef<Dot[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  /** Pointer in canvas space, or null when there has never been one, which is
   *  every touch device. Held in a ref: putting it in state re-renders the
   *  component on every pointer move, and that is exactly the mistake that
   *  makes the original unusable. */
  const pointerRef = useRef<Pt | null>(null);
  const colorsRef = useRef({ dim: "#8c8c87", lit: "#e8000d" });
  const runningRef = useRef(false);
  const rafRef = useRef(0);

  /** Lay the grid out for the current canvas size, then claim it for a state. */
  const build = useCallback((state: FieldState) => {
    const { w, h } = sizeRef.current;
    if (!w || !h) return;
    const dots = dotsRef.current;
    layoutGrid(dots, w, h);
    claimFor(dots, state, w, h);
  }, []);

  /** Read the theme's own tokens so the field is never a hardcoded palette. */
  const readColors = useCallback(() => {
    const cs = getComputedStyle(document.documentElement);
    const get = (n: string, fallback: string) => cs.getPropertyValue(n).trim() || fallback;
    colorsRef.current = {
      dim: get("--color-ash", "#8c8c87"),
      lit: get("--color-brand", "#e8000d"),
    };
  }, []);

  /** One frame. Never scheduled more than once at a time. */
  const draw = useCallback(
    (time: number) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      const { w, h } = sizeRef.current;
      const { dim, lit } = colorsRef.current;
      renderFrame(ctx, dotsRef.current, {
        w,
        h,
        state: categories[activeRef.current].field,
        time,
        pointer: pointerRef.current,
        dim,
        lit,
        ease: reduced ? 1 : 0.12,
      });
    },
    [reduced],
  );

  /* Size the canvas to the stage, at device resolution. Sizing to the window,
     as the original does, is wrong the moment the element is not the window:
     it leaves the backing store the wrong shape and the drawing soft. */
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const resize = () => {
      const r = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: r.width, h: r.height };
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build(categories[activeRef.current].field);
      draw(performance.now() / 1000);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [build, draw]);

  /* Colours, and a re-read when the theme is toggled. */
  useEffect(() => {
    readColors();
    const mo = new MutationObserver(() => {
      readColors();
      draw(performance.now() / 1000);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, [readColors, draw]);

  /* Which category the scroll is on. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const r = track.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span <= 0 ? 0 : clamp(-r.top / span, 0, 1);
      const i = Math.min(categories.length - 1, Math.floor(p * categories.length));
      if (i !== activeRef.current) {
        activeRef.current = i;
        setActive(i);
        build(categories[i].field);
        if (reduced) {
          settle(dotsRef.current);
          draw(performance.now() / 1000);
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [build, draw, reduced]);

  /* The loop. One at a time, cancelled on unmount, and never running while the
     section is off screen. Under reduced motion it never starts at all: the
     field is still drawn, and still changes as the reader scrolls, because
     scrolling is the reader's own movement rather than an animation. */
  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;

    const tick = (ms: number) => {
      draw(ms / 1000);
      rafRef.current = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !runningRef.current) {
          runningRef.current = true;
          rafRef.current = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && runningRef.current) {
          runningRef.current = false;
          cancelAnimationFrame(rafRef.current);
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(stage);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
    };
  }, [draw, reduced]);

  /* Pointer, in canvas space. Ignored for anything that is not a mouse, so a
     touch never leaves a stuck attractor behind after the finger lifts. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = stage.getBoundingClientRect();
      pointerRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const leave = () => {
      pointerRef.current = null;
    };
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    return () => {
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
    };
  }, []);

  const jumpTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    // getBoundingClientRect, not offsetTop: the track is the offset parent of
    // everything inside it, so offsetTop would measure the wrong thing.
    const top = track.getBoundingClientRect().top + window.scrollY;
    const span = track.offsetHeight - window.innerHeight;
    // Land in the middle of the band that selects this category, so the jump
    // is never a pixel away from the threshold it is aiming for.
    const target = top + (span * (i + 0.5)) / categories.length;

    // Through Lenis when it is running. SmoothScroll.tsx says why in its own
    // words: Lenis caches its animated position, so a bare window.scrollTo
    // leaves the two disagreeing and Lenis glides the page back. That is
    // exactly what this did before, moving about three pixels per click.
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
  };

  const current = categories[active];

  return (
    <section
      ref={trackRef}
      data-section="AI Hub categories"
      style={{ height: `${categories.length * 100}vh` }}
      className="relative"
    >
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden bg-void">
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block" />

        {/* The rail. Every category is reachable from every other one, which is
            the thing eight separate sections could not offer. */}
        {/* On the right, because the heading is on the left and measured at
            1280 the two boxes overlapped: the rail ended at x=87 and the
            heading began at x=80. */}
        <ol className="absolute right-4 top-1/2 z-10 -translate-y-1/2 sm:right-8">
          {categories.map((c, i) => (
            <li key={c.no}>
              <button
                type="button"
                onClick={() => jumpTo(i)}
                aria-current={i === active ? "true" : undefined}
                className="group flex flex-row-reverse items-center gap-3 py-1.5 text-right"
              >
                <span
                  aria-hidden
                  className={cn(
                    "block h-px transition-all duration-500 motion-reduce:transition-none",
                    i === active ? "w-8 bg-brand" : "w-4 bg-line group-hover:w-6 group-hover:bg-ash",
                  )}
                />
                <span
                  className={cn(
                    "font-display text-[0.6875rem] font-extrabold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                    i === active ? "text-brand-text" : "text-ash group-hover:text-snow",
                  )}
                >
                  {c.no}
                </span>
                <span className="sr-only">{c.label}</span>
              </button>
            </li>
          ))}
        </ol>

        {/* The category itself. One heading and one sentence, both approved. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-14 sm:px-12 sm:pb-16 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <p className="font-display text-[0.6875rem] font-extrabold uppercase tracking-[0.18em] text-ash">
              AI Hub
            </p>
            <h2
              key={current.no}
              className="font-display mt-3 max-w-[18ch] text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold uppercase leading-[0.98] text-snow"
            >
              {current.label}
            </h2>
            <p className="mt-4 max-w-[54ch] text-[0.9375rem] leading-relaxed text-fog sm:text-base">
              {current.line}
            </p>
            <a
              href={current.href}
              className="pointer-events-auto mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-text underline-offset-4 hover:underline"
            >
              {current.label}
              <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

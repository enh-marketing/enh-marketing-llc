"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** The pinned horizontal run, as `ChannelScroller` on the Performance
 *  Marketing page does it, extracted so the homepage can use the same mechanic
 *  without importing that page's card furniture.
 *
 *  The behaviour is the approved one and every awkward bit of it is deliberate:
 *
 *  · THE RAIL IS A NATIVE SNAP SCROLLER UNTIL THE PIN IS REALLY INSTALLED.
 *    Markup ships `overflow-x-auto snap-x snap-mandatory`, and this hook sets
 *    `overflow: visible` only once inside the matched media query. Below
 *    1024px, and for a reader who asked for no motion, the section stays a rail
 *    you can swipe -- so it degrades to something usable rather than to a
 *    section that needs a mouse wheel and a wide screen to reveal its content.
 *
 *  · TRAVEL IS MEASURED, NOT ASSUMED. `distance()` reads the last panel's own
 *    offset so the run stops with that panel in the middle of the viewport at
 *    any width, and `invalidateOnRefresh` re-measures on resize and after the
 *    display face swaps in. Panels are found by `[data-panel]` rather than by
 *    tag: the original selected `:scope > a` and a run whose last entries were
 *    not links stopped short, measured at 0px of travel against a real
 *    requirement of 2,768px.
 *
 *  · DEPTH OF FIELD IS A DIRECT STYLE WRITE. Whichever panel is nearest the
 *    middle is fully lit and the rest recede. Not `gsap.quickSetter("scale")`,
 *    which needs a primed transform cache and silently no-ops without one.
 *
 *  Pass `progress` to have a rail under the run track the run's progress. */
export function usePinnedRun(
  root: RefObject<HTMLDivElement | null>,
  rail: RefObject<HTMLDivElement | null>,
  progress?: RefObject<HTMLSpanElement | null>,
) {
  useEffect(() => {
    const mm = gsap.matchMedia();

    /* A plain string query rather than `ChannelScroller`'s conditions object.
    
       Both are correct. The object form exists for a context that has to
       branch on several conditions at once and hands the callback booleans to
       read; with a single condition there is nothing to branch on, and the
       string form's contract is the one wanted here -- run on match, run the
       returned cleanup on unmatch.
    
       WORTH KNOWING IF YOU TRY TO VERIFY THIS IN THE BROWSER PANE: resizing
       the pane does not prove the teardown either way. The pane's viewport
       emulation changes what a media query EVALUATES to without dispatching
       anything -- measured here, `(min-width: 1024px)` went from true to false
       across a resize while a `change` listener on it and a `resize` listener
       on window both recorded zero events. So GSAP is never told, no cleanup
       runs, and the panels keep the styles the pinned branch wrote. That is
       the harness, not this hook. The case that matters in the wild is a phone
       LOADING below 1024px, where this branch never runs at all and the markup
       is the section. */
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const el = root.current;
        const track = rail.current;
        if (!el || !track) return;

        track.style.overflow = "visible";

        const distance = () => {
          const panels = track.querySelectorAll<HTMLElement>("[data-panel]");
          const last = panels[panels.length - 1];
          if (!last) return 0;
          return Math.max(0, last.offsetLeft + last.offsetWidth / 2 - el.clientWidth / 2);
        };

        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", track);

        const focus = () => {
          const mid = window.innerWidth / 2;
          for (const panel of panels) {
            const r = panel.getBoundingClientRect();
            const offset = Math.abs(r.left + r.width / 2 - mid) / mid;
            const t = gsap.utils.clamp(0, 1, offset);
            panel.style.transform = `scale(${gsap.utils.interpolate(1, 0.94, t).toFixed(4)})`;
            panel.style.opacity = gsap.utils.interpolate(1, 0.45, t).toFixed(3);
          }
        };

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            pin: true,
            scrub: 0.8,
            start: "center center",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onRefresh: focus,
            onUpdate: (self) => {
              focus();
              if (progress?.current) {
                progress.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { x: 0 });
          for (const panel of panels) {
            panel.style.transform = "";
            panel.style.opacity = "";
          }
          track.style.overflow = "";
          if (progress?.current) progress.current.style.transform = "";
        };
      },
    );

    return () => mm.revert();
  }, [root, rail, progress]);
}

/** The shared shell for a run's rail. The `lg` padding lines the first panel up
 *  with the Container's own left edge, so the run starts on the page's grid
 *  rather than at the viewport wall.
 *
 *  THE `max()` IS LOAD-BEARING. `calc((100vw - 1240px)/2)` is NEGATIVE at every
 *  width between the `lg` breakpoint and the container's own 1240px, and a
 *  negative padding is clamped to zero -- so between 1024px and 1240px the
 *  first panel sat flush against the viewport edge while every other section on
 *  the page kept its 2.5rem gutter. Measured at 0px on the nose at both 1024
 *  and 1100. Floored at the gutter it never drops below the page's own margin,
 *  and above 1240 it tracks the container as before: 40px at 1024, 100px at
 *  1440, 340px at 1920. */
export const RAIL_CLASS =
  "no-scrollbar flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-6 pb-2 sm:px-10 lg:px-[max(2.5rem,calc((100vw-1240px)/2))]";

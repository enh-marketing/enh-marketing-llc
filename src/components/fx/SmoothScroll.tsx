"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** The live Lenis instance, for the rare caller that must move the scroll
 *  position instantly rather than smoothly. Anything that teleports the scroll
 *  (an infinite carousel wrapping from its end back to its start) has to tell
 *  Lenis too: Lenis caches its own animated position, so a bare
 *  window.scrollTo leaves the two disagreeing and Lenis glides the page back. */
let current: Lenis | null = null;

/** Null before mount, and on reduced-motion where Lenis never starts. */
export function getLenis(): Lenis | null {
  return current;
}

/** Lenis smooth scrolling — the backbone of the premium feel, fused to GSAP's
 *  ticker so ScrollTrigger-driven motion (the flight rocket) scrubs in lockstep. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Drive Lenis from GSAP's single rAF loop and feed every frame to
    // ScrollTrigger — one clock for scroll + animation = zero jitter.
    current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // ---- Keep Lenis's scroll limit honest when content height changes ----
    // Lenis caches `limit` (content height - viewport). Anything that animates
    // height — the FAQ accordions animate 0 -> auto over 400ms — can let its
    // ResizeObserver latch an intermediate value and never fire again once the
    // height settles. The limit ends up short, so the page refuses to scroll
    // the last stretch and only a reload clears it.
    //
    // One observer here covers every accordion, modal and lazy image on the
    // site. The height comparison stops ScrollTrigger.refresh() (which can
    // itself relayout) from feeding the observer in a loop.
    let lastHeight = document.documentElement.scrollHeight;
    let settle: number | undefined;

    const resync = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    const observer = new ResizeObserver(() => {
      const height = document.documentElement.scrollHeight;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      window.clearTimeout(settle);
      settle = window.setTimeout(resync, 180);
    });
    observer.observe(document.body);

    // Late-arriving webfonts and images shift height after first paint.
    const onLoad = () => resync();
    window.addEventListener("load", onLoad);

    // Anchor links route through Lenis for buttery in-page jumps
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0 });
    };
    document.addEventListener("click", onClick);

    return () => {
      observer.disconnect();
      window.clearTimeout(settle);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      current = null;
    };
  }, []);

  return <>{children}</>;
}

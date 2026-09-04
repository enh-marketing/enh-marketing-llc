"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Is the richer, scroll-driven version of a section allowed to run here?
 *
 *  Read through useSyncExternalStore rather than state-in-an-effect: no
 *  cascading render, and the server gets a definite `false`, so the plain
 *  version is what renders before hydration and for crawlers.
 *
 *  Extracted from CapabilityCarousel so every progressively-enhanced section
 *  gates on the same rule instead of each one re-deriving it. */
export const ENHANCED_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/** `prefers-reduced-motion: reduce`, read the hydration-safe way.
 *
 *  WHY NOT motion/react's useReducedMotion. That hook reads the media query
 *  during the first client render, and the server has no media queries, so any
 *  markup that branches on it renders one way on the server and another on the
 *  client's first pass. React reports that as a hydration mismatch and throws
 *  the tree away. Three components on this site did exactly that.
 *
 *  useSyncExternalStore's server snapshot is used both on the server AND during
 *  hydration, so the first client render always agrees with the HTML; the real
 *  value arrives on the next render, which is an ordinary update. The CSS in
 *  globals.css suppresses these animations at the same time regardless, so
 *  nothing animates in between.
 *
 *  Returns false on the server and during hydration: "motion is fine". */
export function usePrefersReducedMotion(): boolean {
  return useEnhanced("(prefers-reduced-motion: reduce)");
}

export function useEnhanced(query: string = ENHANCED_QUERY): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

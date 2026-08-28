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

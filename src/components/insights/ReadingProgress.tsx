"use client";

import { motion, useScroll, useSpring } from "motion/react";
import type { RefObject } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

/** How far through the article the reader is.
 *
 *  IT MEASURES THE ARTICLE, NOT THE PAGE. A bar driven by document scroll
 *  reads 70% at the end of the prose, because the related notes and the
 *  closing ask are still below — so it tells the reader they have a third left
 *  when they have finished. The target is the article element, from
 *  `start start` to `end end`, so it completes exactly as the last paragraph
 *  leaves the fold.
 *
 *  ONE COMPOSITED TRANSFORM PER FRAME. `scaleX` on its own layer, with the
 *  origin pinned left in globals.css. Nothing here touches layout or paint,
 *  which is what makes it safe to run on a phone.
 *
 *  IT SITS UNDER THE HEADER, on the hairline the header already rests on, so
 *  it reads as that rule filling rather than as a widget bolted to the top of
 *  the page. z-[75] puts it above the header at z-[70]; the header is
 *  translucent and the bar has to be visible against it.
 *
 *  UNDER prefers-reduced-motion THE SPRING IS DROPPED, NOT THE BAR. A progress
 *  indicator is information, not decoration — hiding it would remove something
 *  the reader is using. What goes is the easing, so the bar tracks the scroll
 *  exactly instead of chasing it. */
export function ReadingProgress({ target }: { target: RefObject<HTMLElement | null> }) {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      /* Not a progressbar role. It reports the viewport's position rather than
         the state of any task, nothing can act on it, and announcing a value
         that changes on every scroll frame is noise in a screen reader. It is
         decorative, and the article's own headings are the real structure. */
      aria-hidden
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
      className="reading-progress fixed inset-x-0 top-0 z-[75] h-[2px] bg-brand"
    />
  );
}

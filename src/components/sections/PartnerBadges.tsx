"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { PartnerBadge } from "@/lib/content";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The issued partner and certification badges.
 *
 *  WHAT MOVES, AND WHAT DOES NOT. Google's and Meta's badge guidelines forbid
 *  distorting, recolouring or animating the mark, so nothing here touches the
 *  artwork: no scale, no rotation, no filter, no opacity on the image. The
 *  motion belongs entirely to the plate underneath — it rises and fades in on a
 *  stagger, and lifts a little under the pointer. The badge is carried by that
 *  plate, never animated itself.
 *
 *  WHY WHITE PLATES. All four marks ship with a white background of their own:
 *  two are round discs, one is a bordered card, one is a flat JPG. Dropped
 *  straight onto the near-black section they would read as four different white
 *  shapes at four different sizes. A common plate gives them one height, one
 *  corner radius and one measure of clear space, which is what makes them read
 *  as a row of credentials rather than as pasted-in images — and it is the
 *  compliant way to carry the full-colour marks on a dark page.
 *
 *  The plate is pure white rather than the site's `snow`, and that is on
 *  purpose twice over. `snow` inverts to near-black under `html.light`, which
 *  would put these marks on a black tile in light mode. And three of the four
 *  files carry pure white baked in with no transparency, so any off-white plate
 *  would show a visible seam where the artwork's own background meets it.
 *
 *  WHY THE PLATE IS NOT A FIXED WIDTH. Two badges are square and two are
 *  landscape. One box for all four would either shrink the wordmarks to the
 *  circles' width or strand the circles in a wide plate with air on both sides.
 *  Fixing the height and letting the width follow keeps every mark at the same
 *  optical size, which is the thing the eye actually reads.
 *
 *  Renders nothing when handed an empty list, so the row is never left with
 *  broken images. See public/badges/README.md. */
export function PartnerBadges({
  badges,
  delay = 0.1,
  size = "default",
  align = "center",
}: {
  /** Resolved by the server from what is actually in /public. */
  badges: PartnerBadge[];
  delay?: number;
  /** "compact" for the hero band, where the row shares the first viewport with
   *  the headline and every extra pixel of plate height comes straight out of
   *  the space the headline has to breathe in. */
  size?: "default" | "compact";
  /** "start" when the row sits inside a left-aligned text column and should
   *  share its axis; "center" when it stands alone in a band of its own. */
  align?: "center" | "start";
}) {
  const reduced = usePrefersReducedMotion();
  if (badges.length === 0) return null;

  const plate =
    size === "compact"
      ? "h-[4.25rem] px-4 py-3 sm:h-[4.75rem] sm:px-5 sm:py-3.5"
      : "h-[4.75rem] px-5 py-3.5 sm:h-[5.5rem] sm:px-7 sm:py-4";

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-3 sm:gap-5",
        align === "start" ? "justify-start" : "justify-center",
      )}
    >
      {badges.map((badge, i) => (
        <motion.li
          key={badge.alt}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: delay + i * 0.09, ease: EASE }}
          className="group"
        >
          {/* The plate is the only thing that moves. overflow-hidden so the one
              JPG, which has no transparency of its own, takes the radius too. */}
          <span
            className={cn(
              "flex items-center justify-center overflow-hidden rounded-xl bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1",
              plate,
            )}
          >
            {/* Was next/image. Plain <img> here: these are four fixed-size
                partner marks in /public, drawn at one height, so there was no
                responsive srcset to lose. `sizes` goes with it, since it only
                means anything alongside one. */}
            <img
              src={badge.src}
              alt={badge.alt}
              width={badge.w}
              height={badge.h}
              loading="lazy"
              decoding="async"
              className="h-full w-auto object-contain"
            />
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

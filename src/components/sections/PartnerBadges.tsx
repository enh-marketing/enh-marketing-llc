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

  /** THE COMPACT ROW IS SIZED TO FIT ALL FOUR ON ONE LINE OF A PHONE.
   *
   *  Team direction, and it is arithmetic rather than taste. Fixing the height
   *  and letting the width follow (see the note above) means the row's total
   *  width is the sum of four aspect ratios times one number. The four marks
   *  are 500x274, 500x286, 380x379 and 500x500, so their aspects sum to 5.576:
   *  a row is `5.576 x imageHeight + 8 x sidePadding + 3 x gap`.
   *
   *  At the old mobile values — a 44px image in `px-4` with `gap-3` — that is
   *  409px against the 327px a 375px phone leaves inside the container, so the
   *  fourth badge wrapped to a line of its own. A 36px image in `px-2` with
   *  `gap-2` is 289px, which fits 375 with 38px to spare and 360 with 23.
   *
   *  Nothing about the artwork changes: the plate still fixes the height and
   *  lets each width follow, so the four marks stay at one optical size and
   *  none of them is squeezed into a common box.
   *
   *  THE LAST 17 PIXELS ARE BOUGHT BACK ONLY WHERE THEY ARE NEEDED. At 320px —
   *  the narrowest width this site is checked at — the container leaves 272 and
   *  289 does not fit, so the fourth badge wrapped there. Trimming the side
   *  padding and the gap to 6px brings the row to 267, and it is scoped to
   *  `max-[359px]` rather than applied to every phone: at 375 there are 38px
   *  spare and no reason to crowd the marks. `flex-wrap` stays as the safety
   *  net under any width narrower still. */
  const plate =
    size === "compact"
      ? "h-[3.25rem] px-2 py-2 max-[359px]:px-1.5 sm:h-[4.75rem] sm:px-5 sm:py-3.5"
      : "h-[4.75rem] px-5 py-3.5 sm:h-[5.5rem] sm:px-7 sm:py-4";

  /** The gap is part of the same sum, so the compact row tightens with it. */
  const gap =
    size === "compact" ? "gap-2 max-[359px]:gap-1.5 sm:gap-5" : "gap-3 sm:gap-5";

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center",
        gap,
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

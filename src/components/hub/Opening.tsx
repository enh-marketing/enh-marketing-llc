"use client";

import { useEffect, useRef, useState } from "react";
import AirlockHero from "@/components/hub/AirlockHero";
import { HeroHeadline, HeroStandfirst } from "@/components/hub/HeroCopy";

/** The opening: the airlock, and the way out of it.
 *
 *  THE AIRLOCK WAS HERE BEFORE AND IT WAS AT THE WRONG END. It was tried as the
 *  page's ending and removed on 2026-09-09, and the reason it was removed is
 *  the reason it belongs here. It works by pinning the body and spending wheel,
 *  touch and keys on the video's currentTime. At the foot of a scroll-driven
 *  page that is two machines fighting over one wheel: measured then, the body
 *  sat pinned at -14520px with scrollY reading 0, and getting back out took
 *  3200px of wheel with nothing appearing to happen. First on the page it is
 *  the only machine running, there is nothing above it to climb back to, and
 *  taking the wheel for the length of one shot is exactly what it is for.
 *
 *  WHAT IT REPLACED, AND WHERE THAT WENT. The mountain: a photograph in two
 *  parallax plates with the sun measured out of it and handed to the orbital
 *  chapter. It is tagged `hero/mountain-ascent` and comes back in one checkout;
 *  the tag's own message says how.
 *
 *  THE FILM IS 3.7MB AND THAT IS THE COST OF IT. It is preloaded, because a
 *  scrub cannot seek into a file it has not got, so it is the heaviest thing on
 *  the site by a distance. Everything else the page draws is generated. */

/** THIS IS THE PART THAT IS NOT THE COMPONENT'S, AND IT IS THE ASK.
 *
 *  The component ends its film, hands the page back, and the reader scrolls on
 *  to whatever is underneath. That is a cut: the hatch is open, you are looking
 *  at the Earth, and then the next section slides up from the bottom of the
 *  screen like any other page. Asked for instead: keep going through the black
 *  behind the Earth and have the next scene already be there.
 *
 *  SO THE HERO IS FIXED AND THE PAGE IS BEHIND IT, not above it. It takes no
 *  space in the flow at all, which means the journey's first chapter sits at
 *  the top of the document, at its own beginning, from the moment the page
 *  loads. It is simply covered. Over the hold the cover is pushed through the
 *  screen and faded off, and what is behind it was never anywhere else. Nothing
 *  travels, nothing slides in, and there is no seam to hide because there is no
 *  join: one picture is taken away from in front of another.
 *
 *  THE PUSH IS ON THE WHOLE HERO, NOT ON THE VIDEO. The component already
 *  scales the video by six per cent across the scrub, which is the shot's own
 *  slow push and stays exactly as it is. This is a second, much bigger scale on
 *  everything, and it runs only on the stretch after the film has stopped. The
 *  two do not fight: one is inside the frame, the other is the frame leaving.
 *
 *  WHY IT STARTS AT THE HOLD AND NOT BEFORE. holdDistance is the stretch the
 *  component spends on the last frame so the hero has somewhere to land instead
 *  of stopping dead, and the standfirst is fully up for all of it. The push is
 *  what that landing is for. Before it, the film is still running and pushing
 *  the frame would fight the shot. */
const REVEAL_FROM = 3200 / (3200 + 1100);
/** How far in, at the end. 2.6 reads as going through the gap rather than as
 *  the picture growing: at 1.4 the Earth simply gets bigger and stays. */
const PUSH_TO = 2.6;
/** WHERE THE COVER IS ALREADY GONE, AND IT IS NOT 1.
 *
 *  The component hands the page back when its own lerped position is past 0.98
 *  rather than at 1, because it waits for the picture to catch up with the
 *  input before letting go and a hard flick would otherwise throw the page on a
 *  half-played shot. So the scrub never reaches 1 in practice: it releases at
 *  0.98 and stops being painted. A cover that only clears at 1 is left sitting
 *  at one per cent opacity for good. This is the same number, read off the
 *  push: reach zero exactly where the lock lets go. */
const CLEAR_AT = 0.98;

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
/** Smooth at both ends. The reader's input is already lerped by the component,
 *  so what this has to do is start and stop without a corner. */
const ease = (v: number) => v * v * (3 - 2 * v);

export function Opening() {
  const cover = useRef<HTMLDivElement>(null);
  /** THE HATCH OPENS ONCE, AND THAT IS NOT A SIMPLIFICATION.
   *
   *  The component is built to take the lock again when the reader climbs back
   *  to the top, so the film runs backwards and the hatch closes. That works
   *  when the hero is a block of the page, because there is a viewport of it to
   *  climb through before the rule can fire. Fixed over the page there is not:
   *  the page is handed back at scrollY 0, which is also the position the rule
   *  re-arms at, so the first scroll event that reports a lower number than the
   *  last one takes the lock straight back. Measured: released, wheeled down to
   *  84, and the next samples read 2 and then 1 with the body pinned again. The
   *  reader is on a page that will not move.
   *
   *  So it leaves when its push is finished. The component's own effect cleanup
   *  is what does the work: it releases the lock, restores the body, the scroll
   *  position and Lenis. The reader never sees it go, because by then the cover
   *  is at zero and what is behind it has been on screen for a moment already.
   *  It also saves a gesture: the component otherwise waits for one more push
   *  before handing the page back, and that push has nothing left to move. */
  const [gone, setGone] = useState(false);

  /** The push, 0 to 1 across the hold. Written on the component's own painted
   *  frame rather than on a ticker of our own, so it cannot land a frame away
   *  from the picture it is pushing. */
  const push = useRef(0);

  const draw = () => {
    const el = cover.current;
    if (!el) return;
    const k = push.current;
    /* NOT IN CHARGE UNLESS THE PAGE IS AT THE TOP, and this is not a nicety.
       A cover is only safe to be opaque while something is holding the page
       still underneath it. The component takes its lock on mount only if the
       reader is already at the top, which is the usual arrival and not the
       only one: reload halfway down and a browser restores the scroll, or
       follow a link into the middle of the page, and the lock never engages.
       Fixed and opaque, with no lock and therefore no way to scrub it away,
       that is a full-screen still sitting over the whole story for good. Read
       off the scroll instead: pinned means scrollY is 0, so at the top it is
       either in charge or about to be, and anywhere else it is not. */
    const atTop = window.scrollY <= 1;
    const shown = atTop ? 1 - clamp(k / CLEAR_AT) : 0;
    /* ONE `transform`, NOT A `scale` UTILITY. Tailwind v4 writes scale and
       translate as their own CSS properties, so a utility and an inline
       transform compose instead of one overriding the other, and the element
       ends up scaled twice. */
    el.style.transform = `scale(${(1 + (PUSH_TO - 1) * k).toFixed(4)})`;
    /* CLEAR EXACTLY WHEN THE LOCK LETS GO, which is why this is the plain k and
       not a shorter ramp inside it. Clearing early leaves a stretch where the
       next chapter is on screen, the page is still pinned and the wheel does
       nothing, which reads as the page having stopped responding. The
       component releases when the scrub reaches 1, and the cover reaches zero
       on the same number. */
    el.style.opacity = shown.toFixed(3);
    /* Once it is clear it must stop catching the pointer, or an invisible
       sheet sits over the first chapter's links. */
    el.style.visibility = shown < 0.001 ? "hidden" : "";
  };

  const onProgress = (p: number) => {
    push.current = ease(clamp((p - REVEAL_FROM) / (1 - REVEAL_FROM)));
    draw();
    if (push.current >= CLEAR_AT) setGone(true);
  };

  useEffect(() => {
    /* The scrub paints on its own frames while the page is pinned, and stops
       painting the moment it hands the page back; from then on the only thing
       that moves is the scroll. */
    const onScroll = () => draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    draw();
    const el = cover.current;
    return () => {
      window.removeEventListener("scroll", onScroll);
      /* The reader can leave mid-push and come back to a cover still scaled
         and invisible. The component re-arms its own lock on the way up; this
         puts the picture back with it. */
      if (el) {
        el.style.transform = "";
        el.style.opacity = "";
        el.style.visibility = "";
      }
    };
  }, []);

  return (
    /* z-40: over the page, under the site's own navigation at z-70. */
    <div
      ref={cover}
      className="fixed inset-0 z-40 origin-center will-change-transform"
      style={{ transformOrigin: "50% 50%" }}
    >
      {gone ? null : (
      <AirlockHero
        /* Ours, on our origin. The component's defaults are the author's files
           on jsDelivr. See the note at the top of hub/AirlockHero. */
        videoSrc="/hero/airlock.mp4"
        posterSrc="/hero/airlock-poster.jpg"
        /* VACUUM RATHER THAN EMBER, and the page's ground is the reason. This
           section sits over a black page and clears to a black one; ember's
           #0d0705 is a warm brown that would show as a seam at both ends. The
           warmth on this page is carnelian and it belongs to one word. */
        theme="vacuum"
        title={<HeroHeadline />}
        tagline={<HeroStandfirst />}
        /* NO WORD UNDER THE ARROW, asked for. The arrow is the instruction and
           it is already moving; a label under it is the page explaining its own
           interface, which is the one thing a hero like this cannot afford. */
        scrollHint=""
        skipLabel="Skip the intro"
        onProgress={onProgress}
      />
      )}
    </div>
  );
}

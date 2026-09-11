"use client";

import AirlockHero from "@/components/hub/AirlockHero";
import { HeroHeadline, HeroStandfirst } from "@/components/hub/HeroCopy";

/** The opening: the airlock, with this page's copy in its slots.
 *
 *  THE AIRLOCK WAS HERE BEFORE AND IT WAS AT THE WRONG END. It was tried as the
 *  page's ending and removed on 2026-09-09, and the reason it was removed is
 *  the reason it belongs here. It works by pinning the body and spending wheel,
 *  touch and keys on the video's currentTime. At the foot of a scroll-driven
 *  page that is two machines fighting over one wheel: measured then, the body
 *  sat pinned at -14520px with scrollY reading 0, and getting back out took
 *  3200px of wheel with nothing appearing to move. First on the page it is the
 *  only machine running, there is nothing above it to climb back to, and taking
 *  the wheel for the length of one shot is exactly what it is for.
 *
 *  WHAT IT REPLACED, AND WHERE THAT WENT. The mountain: a photograph in two
 *  parallax plates with the sun measured out of it and handed to the orbital
 *  chapter. It is tagged `hero/mountain-ascent` and comes back in one checkout;
 *  the tag's own message says how.
 *
 *  THE JOIN IS BETTER THAN THE ONE IT REPLACES. The mountain had to carry a
 *  reader from a photograph of a ridge into open space, and it did it by
 *  measuring where the sun landed on the window and starting the solar system
 *  on that exact pixel. This ends outside a spaceship, which is already the
 *  place the next chapter happens, so the system enters centred and the seam is
 *  a cut rather than a trick. See ENTRY in chapters/System.
 *
 *  THE FILM IS 3.7MB AND THAT IS THE COST OF IT. It is preloaded, because a
 *  scrub cannot seek into a file it has not got, so it is the heaviest thing on
 *  the site by a distance. Everything else the page draws is generated. */
export function Opening() {
  return (
    <AirlockHero
      /* Ours, on our origin. The component's defaults are the author's files
         on jsDelivr. See the note at the top of hub/AirlockHero. */
      videoSrc="/hero/airlock.mp4"
      posterSrc="/hero/airlock-poster.jpg"
      /* VACUUM RATHER THAN EMBER, and the page's ground is the reason. This
         section sits on top of a black page and hands over to a black one;
         ember's #0d0705 is a warm brown that would show as a seam at both ends.
         The warmth on this page is carnelian and it belongs to one word. */
      theme="vacuum"
      title={<HeroHeadline />}
      tagline={<HeroStandfirst />}
      scrollHint="SCROLL"
      skipLabel="Skip the intro"
    />
  );
}

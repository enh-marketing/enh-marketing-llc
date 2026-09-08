"use client";

import { useEffect, useRef, useState } from "react";
import AirlockHero from "@/components/hub/AirlockHero";
import { getLenis } from "@/components/fx/SmoothScroll";
import { threshold } from "@/content/ai-hub";

/** The last thing on the page: the door, and then the ask.
 *
 *  THE AIRLOCK IS FINALLY USABLE HERE, AND ONLY HERE. It works by pinning the
 *  body and spending wheel, touch and key input on the video's currentTime
 *  instead of on scroll. That is why it could never be a chapter of the
 *  journey: the machine is one scroll listener collapsed to a number, and two
 *  things cannot own the scroll at once. Last on the page there is nothing left
 *  to fight. The reader arrives, the door runs on their own input, and when the
 *  film ends and they keep pushing the page is handed back, which lands them on
 *  the ask below it. It carries a skip control throughout, so the door is never
 *  a toll gate.
 *
 *  THE VIDEO IS STILL THE COMPONENT'S OWN, served from jsDelivr out of the
 *  author's GitHub repo. It is not ours and not on our origin, and it has to be
 *  replaced before this page ships, the same as the mountain photographs.
 *
 *  AND NOTHING FOLLOWS IT. There was an ask underneath, and it was cut on
 *  2026-09-09: the door opening onto the view is the end of the story, and a
 *  block of copy after it is the page carrying on talking once it has finished.
 *  The reader is not left without a way through, because every category on the
 *  page carries its own link, but this page now closes on a picture rather than
 *  on a button. If a closing call to action is ever wanted it has to come back
 *  as a deliberate decision, not by default. */
export function Threshold() {
  return <Door />;
}

/** The airlock, mounted only once the reader has actually arrived at it.
 *
 *  IT LOCKS ON LOAD OTHERWISE, WHEREVER IT IS PUT. The component decides
 *  whether to take the page on mount with
 *
 *      if (window.scrollY <= section.offsetTop + 1) engageLock()
 *
 *  which is a hero's test: first on the page, offsetTop is 0, and a reader at
 *  the top gets the lock. Last on the page the same test is true for the whole
 *  of the page above it, so it pinned the body the moment it mounted. Measured,
 *  that collapsed the document from fourteen screens to one and the page could
 *  not be scrolled at all.
 *
 *  So it is not mounted until its own place reaches the top of the window. Then
 *  the test is true for the right reason, the body is pinned at exactly the
 *  scroll position where the door should begin, and nothing above it was ever
 *  frozen. This is a gate around the component, not a change to it: the file is
 *  still the one that was delivered.
 *
 *  The placeholder holds a screen of height so the page does not jump by a
 *  viewport at the moment the real thing appears. */
function Door() {
  const slot = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) return;
    const el = slot.current;
    if (!el) return;
    const check = () => {
      const top = el.getBoundingClientRect().top;
      if (top > 0) return;
      /* LAND ON THE DOOR BEFORE HANDING IT OVER. The component decides whether
         to take the page with `scrollY <= section.offsetTop + 1`, read once
         when its effect runs. Mounting it as the slot crosses the top is not
         enough on its own: React renders on the next frame and Lenis keeps
         easing in the meantime, so by the time that line runs the page has
         moved a few dozen pixels past its own top and the test is false. It
         mounted, never engaged, and the reader scrolled past a still frame.

         So the smooth scrolling is stopped and the page is put exactly on the
         slot's own top first. The component then reads a position that is its
         offsetTop to the pixel, engages, and pins from there. It takes Lenis
         back over itself a line later, which is why stopping it here is safe. */
      const docTop = Math.round(window.scrollY + top);
      getLenis()?.stop();
      window.scrollTo(0, docTop);
      setOpen(true);
    };
    /* AND IT IS NOT ARMED UNTIL THE PAGE HAS FINISHED LAYING OUT. Checked
       straight away it fires during hydration, when the browser has already
       restored a deep scroll position but the page is not yet its full height,
       so the slot is momentarily near the top of the window. Measured on a
       reload two thirds of the way down, that pinned the body at -12000px,
       two and a half screens above the door. Waiting for load and two frames
       past it means the first read is of a settled page. */
    let armed = false;
    const arm = () => {
      armed = true;
      check();
    };
    const onScroll = () => {
      if (armed) check();
    };
    const whenReady = () => requestAnimationFrame(() => requestAnimationFrame(arm));
    if (document.readyState === "complete") whenReady();
    else window.addEventListener("load", whenReady, { once: true });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("load", whenReady);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  if (open) {
    return <AirlockHero title={threshold.title} tagline={threshold.tagline} skipLabel="Skip" />;
  }
  return <div ref={slot} aria-hidden className="h-screen w-full bg-black" />;
}

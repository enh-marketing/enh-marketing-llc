"use client";

import { useEffect, useRef, useState } from "react";
import AirlockHero from "@/components/hub/AirlockHero";
import { ServiceChip } from "@/components/hub/ServiceChip";
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
 *  THE ASK IS A SEPARATE BLOCK rather than something laid inside the hero. The
 *  hero has no slot for one and no link prop, and cutting a hole in it to add
 *  one would be a fork. It also reads better: the door finishes, the page comes
 *  back, and the invitation is the first thing on the other side. */
export function Threshold() {
  return (
    <>
      <Door />

      <section
        data-section="AI Hub close"
        className="relative flex min-h-[70svh] w-full flex-col items-center justify-center bg-black px-6 py-24 text-center"
      >
        <p className="font-grotesk mb-6 text-[0.8rem] font-bold uppercase tracking-[0.34em] text-white/55">
          {threshold.eyebrow}
        </p>
        <h2 className="font-grotesk hub-heading max-w-[18ch] font-bold uppercase text-white">
          {threshold.cta}
        </h2>
        <p className="mt-6 max-w-[34rem] text-[1rem] leading-[1.6] text-white/65">{threshold.body}</p>
        <ServiceChip href="/contact-us" label={threshold.action} />
      </section>
    </>
  );
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
      if (el.getBoundingClientRect().top <= 0) setOpen(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [open]);

  if (open) {
    return <AirlockHero title={threshold.title} tagline={threshold.tagline} skipLabel="Skip" />;
  }
  return <div ref={slot} aria-hidden className="h-screen w-full bg-black" />;
}

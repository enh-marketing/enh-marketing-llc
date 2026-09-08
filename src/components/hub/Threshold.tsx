import { ServiceChip } from "@/components/hub/ServiceChip";
import { threshold } from "@/content/ai-hub";

/** The last thing on the page: the ask, and a way back into the site.
 *
 *  THE AIRLOCK USED TO BE HERE AND IT IS GONE, removed on 2026-09-09. Worth
 *  writing down why, because it looked right and the temptation will come back.
 *
 *  It works by pinning the body to position:fixed and spending wheel, touch and
 *  key input on the video's currentTime instead of on scroll. That is a hero's
 *  bargain: first thing on a page there is nothing above to go back to, and
 *  taking the wheel costs the reader nothing. Anywhere else it needed three
 *  separate repairs and still fought the page.
 *
 *    It locked on load wherever it was put, because it decides whether to take
 *    the page with `scrollY <= section.offsetTop + 1`, which is true for the
 *    whole of the page above it. Dropped in at the end it pinned the body
 *    immediately and collapsed the document from fourteen screens to one.
 *
 *    It re-took the page on the way back up and spent every upward gesture
 *    rewinding the film. Measured at the foot of the page: the body stayed
 *    pinned at -14520px with scrollY reading 0, and seven scroll-ups moved the
 *    video from 10.04 to 0.31 without the page moving a pixel. That is what
 *    "scrolling back up is not working" was.
 *
 *    And arriving at it was a dead end. With the video already at 0.00, twenty
 *    upward gestures left the body pinned and the page still. Going up only
 *    rewinds, and at zero there is nothing left to rewind.
 *
 *  All three had fixes and all three worked, but they were scaffolding holding
 *  up one video that was never ours: served from the component author's own
 *  GitHub through jsDelivr, and due for replacement before this page could ship
 *  in any case.
 *
 *  The black hole is the ending now, which is what it was always for, and this
 *  is the invitation after it. If a film is ever wanted here again it should be
 *  an ordinary muted loop, or scrubbed from the journey's own progress the way
 *  every other scene on this page is. It must not own the scroll. */
export function Threshold() {
  return (
    <section
      data-section="AI Hub close"
      className="relative flex min-h-[80svh] w-full flex-col items-center justify-center bg-black px-6 py-24 text-center"
    >
      <h2 className="font-grotesk hub-heading max-w-[20ch] font-bold uppercase text-white">
        {threshold.heading}
      </h2>
      <p className="mt-6 max-w-[36rem] text-[1rem] leading-[1.6] text-white/65">{threshold.body}</p>

      {/* TWO WAYS ON, because this page has no navigation of its own: it is
          rendered with `chrome={false}` and there is no header to return to.
          Without the second one the only exit from the bottom of the story is
          the browser's own back button. */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ServiceChip href="/contact-us" label={threshold.action} />
        <a
          href="/"
          className="font-grotesk mt-7 inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-[0.9rem] font-bold text-white/70 transition-colors duration-300 hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {threshold.back}
        </a>
      </div>
    </section>
  );
}

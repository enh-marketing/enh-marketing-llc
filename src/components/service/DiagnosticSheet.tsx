"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";
import { DiagnosticMap } from "@/components/service/DiagnosticMap";

gsap.registerPlugin(ScrollTrigger);

/** The paid diagnostic, built around the line it draws.
 *
 *  The document lists ten things the diagnostic covers as one flat run, and set
 *  that way it reads as procurement boilerplate. The ten are not one kind of
 *  thing though. Five of them observe the process as it stands, two draw a line
 *  through it, and three price whatever ends up on the automatable side. The
 *  two in the middle are consecutive in the source and they are the page's
 *  entire argument:
 *
 *    "Processes that are suitable for automation"
 *    "Processes that should remain manual"
 *
 *  An automation agency that puts those two lines next to each other in its own
 *  scope document is saying something, and burying it at positions six and
 *  seven of a bullet list throws it away. So the pair is the centrepiece, set
 *  either side of a rule, and the observation and the pricing sit around it as
 *  what feeds in and what comes out.
 *
 *  The closing terms carry the other unusual commitment: you keep the document
 *  either way. That sentence leads, and the free/paid split behind it is set as
 *  the two-line ledger it actually is rather than a third paragraph. */

/** Splits the terms into the promise and the two lines that qualify it.
 *  Returns null if the copy is rewritten into a different shape, in which case
 *  the caller prints it whole. */
function splitTerms(terms: string) {
  const parts = terms.split(/(?<=\.)\s+(?=[A-Z])/);
  if (parts.length < 3) return null;
  return { promise: parts[0], free: parts[1], paid: parts.slice(2).join(" ") };
}

export function DiagnosticSheet({
  lead,
  coversLead,
  observe,
  verdict,
  proposal,
  terms,
}: {
  lead: string;
  coversLead: string;
  observe: string[];
  verdict: [string, string];
  proposal: string[];
  terms: string;
}) {
  const t = splitTerms(terms);
  const verdictRef = useRef<HTMLDivElement>(null);

  /** The boundary draws itself.
   *
   *  This is the one place on the page worth pinning motion to, because the
   *  rule between these two statements IS the argument: an automation agency
   *  reporting what should stay manual. Set statically it is a divider you do
   *  not notice. Scrubbed, the reader watches the line being drawn and the two
   *  sides resolve either side of it.
   *
   *  The axis is chosen per breakpoint rather than animated on both, because
   *  the rule is horizontal where the panels stack and vertical where they sit
   *  side by side. Scaling the wrong axis would collapse it to nothing.
   *
   *  GSAP owns the whole block, including its entry. An earlier version left
   *  the house Rise wrapper in place and animated the children inside it, which
   *  put two systems on the same opacity and multiplied their curves.
   *
   *  Under reduced motion nothing is set at all, so the block renders in its
   *  finished state: rule drawn, both statements at full contrast. The same is
   *  true if the timeline never runs for any other reason; see the note on the
   *  initial states below. */
  useEffect(() => {
    const el = verdictRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const q = gsap.utils.selector(el);
      const panel = q("[data-panel]");
      const rule = q("[data-rule]");
      const sides = q("[data-side]");

      // Vertical rule once the two panels sit side by side, horizontal while
      // they are stacked.
      const axis = window.matchMedia("(min-width: 1024px)").matches ? "scaleY" : "scaleX";

      // NOTHING READABLE STARTS HIDDEN. A scrubbed timeline depends on
      // ScrollTrigger measuring correctly, on GSAP's ticker running, and on the
      // Lenis bridge feeding it. If any of those fails the tween never
      // advances and whatever the initial state hid stays hidden, so an
      // opacity of 0 on this panel would mean the page's centrepiece silently
      // never appears. The panel therefore only moves, the two statements only
      // dim as far as still-legible, and the one thing that does scale from
      // nothing is a one-pixel divider, which is safe to lose.
      gsap.set(panel, { y: 26 });
      gsap.set(rule, { [axis]: 0, transformOrigin: "center center" });
      gsap.set(sides, { opacity: 0.55, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 72%", scrub: 0.6 },
      });

      tl.to(panel, { y: 0, duration: 0.26, ease: "power2.out" }, 0)
        // Out from the middle, both ways at once.
        .to(rule, { [axis]: 1, duration: 0.46, ease: "none" }, 0.12)
        // Then the two sides come up, in the document's order.
        .to(sides, { opacity: 1, y: 0, duration: 0.3, stagger: 0.14, ease: "power2.out" }, 0.34);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([panel, rule, sides], { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div>
      <Rise>
        <p className="font-display max-w-3xl text-[clamp(1.15rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.18] text-snow">
          {lead}
        </p>
      </Rise>

      {/* The five checks are five reads on one process, not a feature list, so
          they annotate a drawing of it rather than stacking as rows. See
          DiagnosticMap. */}
      <DiagnosticMap coversLead={coversLead} observe={observe} />

      {/* The line the whole page turns on. Two statements, one rule, and the
          document's own order: automate on the left, leave alone on the right. */}
      <div ref={verdictRef} className="mt-11">
        <div
          data-panel
          className="overflow-hidden rounded-[1.25rem] border border-line bg-ink-2"
        >
          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <div className="p-7 sm:p-8">
              {/* No label. The statement names itself, and "Automate" here was
                  this component's gloss on the client's sentence rather than
                  anything the document says. */}
              <p
                data-side
                className="font-display text-[clamp(1.2rem,2.6vw,2rem)] font-extrabold uppercase leading-[1.12] text-brand"
              >
                {verdict[0]}
              </p>
            </div>

            {/* The boundary itself. A rule across the grain of the two panels,
                horizontal where they stack and vertical where they sit side by
                side.
                Two elements: the outer one carries the positioning, including a
                Tailwind translate, and the inner one carries nothing but the
                paint. GSAP writes transform, so scaling the positioned element
                directly would overwrite its own centring. */}
            <div aria-hidden className="relative">
              <span className="absolute inset-x-0 top-0 lg:inset-y-0 lg:left-1/2 lg:w-px lg:-translate-x-1/2">
                <span data-rule className="block h-px w-full bg-line lg:h-full lg:w-px" />
              </span>
            </div>

            <div className="p-7 sm:p-8">
              <p
                data-side
                className="font-display text-[clamp(1.2rem,2.6vw,2rem)] font-extrabold uppercase leading-[1.12] text-snow"
              >
                {verdict[1]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* And what that costs. */}
      <Rise delay={0.2} className="mt-10">
        <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-3">
          {proposal.map((item) => (
            <li key={item} className="group bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3">
              <span aria-hidden className="block h-px w-8 bg-brand" />
              <p className="font-display mt-4 text-[clamp(0.98rem,1.7vw,1.2rem)] font-bold uppercase leading-[1.22] text-snow">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </Rise>

      {/* The commitment, then the split behind it. */}
      <Rise delay={0.26} className="mt-11 border-t border-line pt-9">
        {t ? (
          <div className="grid gap-x-14 gap-y-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
            <p className="font-display text-[clamp(1.2rem,2.6vw,2rem)] font-extrabold uppercase leading-[1.14] text-snow">
              {t.promise}
            </p>
            <dl>
              {[
                { k: "Free", v: t.free, accent: false },
                { k: "Paid", v: t.paid, accent: true },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline gap-5 border-t border-line py-4 first:border-t-0 first:pt-0">
                  <dt
                    className={
                      "font-display w-14 shrink-0 text-[0.62rem] font-semibold uppercase" +
                      (row.accent ? "text-brand-text" : "text-ash")
                    }
                  >
                    {row.k}
                  </dt>
                  <dd className="leading-relaxed text-fog">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">{terms}</p>
        )}
      </Rise>
    </div>
  );
}

"use client";

import { useRef, useState, type ReactNode } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LeadForm, type FormField } from "@/components/service/LeadForm";
import { ContourField } from "@/components/about/ContourField";
import { brand } from "@/lib/content";

/** The About masthead.
 *
 *  WHY THIS IS NOT ServiceHero. Forty-three pages open with the same fold: a
 *  three-line tri-tone headline at .display-2xl on the left, a drawing pinned
 *  in the right gutter, a brand pill beside a phone pill, a logo strip closing
 *  the viewport. It is a good hero and it is completely spent. A page whose
 *  entire job is to say who this company is cannot open on the template every
 *  service page opens on.
 *
 *  WHAT IS INHERITED, DELIBERATELY. The shell (`min-h-svh`, `pt-24`, the
 *  `flex-1` centring column, a base-of-fold slot in normal flow), the aurora,
 *  Cabinet Grotesk extrabold uppercase, the brand pill with its two-arrow
 *  push, the enquiry dialog, and the client strip closing the fold. Without
 *  these the page would not be on this site.
 *
 *  WHAT IS NEW, AND WHY EACH ONE.
 *
 *  THE HEADLINE IS .mega, WHICH ONLY THE HOMEPAGE HAS USED. That size's own
 *  comment in globals.css says it is sized on both axes because "the homepage
 *  hero is sized to the viewport and now carries a certification row and a logo
 *  strip below the copy" -- which is this fold exactly. And the editorial point
 *  is deliberate: "WE ARE YOUR DIGITAL GROWTH SPECIALISTS" is the company's own
 *  claim about itself, the boldest sentence in its document, and it should
 *  carry the same weight as the homepage rather than the weight of a service
 *  subpage.
 *
 *  THE THREE LINES STEP RIGHT. Each line is indented further than the last, so
 *  the headline block climbs. No hero on this site changes horizontal indent
 *  per line, and here it is not novelty: the company is named for the ascent
 *  ("ENH" is Explore New Heights, and it is the source document's own second
 *  heading), so the type does what the name says. Below `lg` the indents
 *  collapse -- there is no width to spend on a gesture at 375px, and a
 *  half-indented line just looks like a mistake.
 *
 *  BRAND RED IS ON THE MIDDLE LINE, NOT THE LAST. Every existing tri-tone
 *  headline puts the red at the bottom. "Digital Growth" is the substance of
 *  the claim and the middle line is where the eye lands on a stepped block, so
 *  the red goes where the meaning is instead of where the pattern says.
 *
 *  THE GROUND IS TERRAIN, NOT THE PLAN GRID. See ContourField: the contour map
 *  replaces the 80px grid every other hero carries, and the cursor reads
 *  elevation off it. Two custom properties, no state, no re-render.
 *
 *  ONE BUTTON. The document's banner has exactly one, "Reach Out to Discover".
 *  The phone pill that sits beside the primary on every service hero would have
 *  to be a label we wrote, so it is not here.
 *
 *  THE <h1> HAS NO ENTRANCE ANIMATION. It is the LCP element and has to paint
 *  on the first frame. That is the house rule on all eight existing heroes and
 *  it is not relaxed for this one. */
export function AboutMasthead({
  lines,
  sub,
  primary,
  /** The founding year, printed once, as its own line of metadata. */
  founded,
  formTitle,
  formFields,
  breadcrumbs,
  /** The client strip, rendered in flow at the base of the fold. */
  footer,
}: {
  lines: [string, string, string];
  sub: string;
  primary: string;
  founded: string;
  formTitle: string;
  formFields: FormField[];
  breadcrumbs?: ReactNode;
  footer?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* The pointer's position on the section, written straight to the element as
     percentages. ContourField's mask reads them; nothing re-renders. */
  const track = (e: React.PointerEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
    el.style.setProperty("--hy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
  };

  /* Back to the summit when the pointer leaves, rather than freezing the warm
     patch wherever it happened to exit. */
  const rest = () => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.removeProperty("--hx");
    el.style.removeProperty("--hy");
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="Hero"
      onPointerMove={track}
      onPointerLeave={rest}
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* The house aurora, a little quieter than the service heroes carry it:
            the terrain underneath is doing work the blank grid never did, and
            at full strength the two grounds fight. */}
        <div className="aurora-a absolute left-[4%] top-[8%] h-[40vw] w-[40vw] rounded-full bg-brand/14 blur-[150px]" />
        <div className="aurora-b absolute bottom-[6%] right-[-10%] h-[34vw] w-[34vw] rounded-full bg-brand-deep/20 blur-[130px]" />
        <ContourField className="opacity-90" />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center py-6">
        {breadcrumbs && <div className="mb-7">{breadcrumbs}</div>}

        {/* Two facts, each printed once, on one line. The hairline between them
            is the site's own separator for inline metadata: two uppercase
            labels butted together read as one broken phrase.

            "ESTABLISHED IN 2011" KEEPS THE DOCUMENT'S OWN PREPOSITION. It read
            "Established 2011" first, which is a shorter label and was the only
            string on this page that was not a verbatim substring of the source
            -- the document writes "was established in 2011". Dropping a word to
            tidy a label is still editing, and the label is no worse for it.

            "DUBAI, UAE" IS THE ONE THING HERE THAT THE DOCUMENT DOES NOT SAY IN
            FULL. It says "a respected digital agency in Dubai"; the country
            comes from `brand` in lib/content, which is where the agency's real
            address lives, and it is rendered exactly as ContactHero renders it.
            Flagged rather than assumed: drop the ", UAE" if the team would
            rather this page said only what the document says.

            THE {" "} IS LOAD-BEARING, AND ITS ABSENCE WAS A REAL BUG. The rule
            between the two labels is an empty aria-hidden span, so it
            contributes nothing to textContent, and JSX drops the newline
            whitespace around it: a crawler and a screen reader read
            "Established in 2011Dubai, UAE" as one word. Same failure the three
            existing heroes carry a comment about between their headline
            spans. */}
        <p className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase text-fog">
          <span className="text-brand-text">Established in {founded}</span>{" "}
          <span aria-hidden className="h-px w-6 bg-line" />
          <span className="text-ash">{brand.city}, UAE</span>
        </p>

        {/* THE CLAIM. The whitespace between the spans is real, not decoration:
            they are `block`, so it never renders, but without it textContent
            concatenates to "We Are YourDigital GrowthSpecialists" for crawlers
            and screen readers. */}
        <h1 className="font-display mega font-extrabold uppercase">
          <span className="block text-snow">{lines[0]}</span>{" "}
          <span className="block text-brand lg:pl-[7%]">{lines[1]}</span>{" "}
          <span className="block text-snow lg:pl-[14%]">{lines[2]}</span>
        </h1>

        {/* The paragraph and the one action, on one baseline. The action sits at
            the far right of the measure rather than under the copy, so the fold
            ends on the two things a reader needs and the middle stays open for
            the terrain. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,36rem)_auto] lg:items-end lg:gap-14">
          <Rise delay={0.15}>
            {/* Height-aware, like every other hero's: this fold has to keep the
                client strip above the fold on a short screen, so the paragraph
                gives ground rather than pushing it under. */}
            <p
              className="leading-relaxed text-fog"
              style={{ fontSize: "clamp(1rem, min(1.2rem, 2.3svh), 1.2rem)" }}
            >
              {sub}
            </p>
          </Rise>

          <Rise delay={0.3} className="lg:justify-self-end">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group inline-flex max-w-full shrink-0 items-center justify-center gap-3 whitespace-normal rounded-full bg-brand px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep sm:whitespace-nowrap"
            >
              {primary}
              <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                <ArrowRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5" />
                <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
              </span>
            </button>
          </Rise>
        </div>
      </Container>

      {footer && <div className="relative z-10">{footer}</div>}

      <Modal open={open} onClose={() => setOpen(false)} title={formTitle}>
        <LeadForm fields={formFields} submitLabel={primary} formName="About Hero" />
      </Modal>
    </section>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LeadForm, type FormField } from "@/components/service/LeadForm";
import { cn } from "@/lib/cn";
import { voices, hero, monogram, STARS } from "@/content/testimonials";

/** Two columns, drifting in opposite directions. Split so neither column
 *  repeats a name the other is showing at the same moment. */
const COLUMNS = [voices.filter((_, i) => i % 2 === 0), voices.filter((_, i) => i % 2 === 1)];

/** The hero, and the wall of voices on the right of it.
 *
 *  WHY NOT ServiceHero. The seventeen service heroes are a headline over a
 *  drawing, and a drawing is exactly what this page must not open with: the
 *  subject is eighteen people's sentences, so sentences have to be the first
 *  thing on the page after the headline. The type scale, the tri-tone headline,
 *  the aurora ground, the button pair and the enquiry dialog are all
 *  ServiceHero's, so this reads as the same site; only the right-hand slot
 *  differs in kind.
 *
 *  THE WALL IS A WALL, NOT A CAROUSEL. Two columns of real fragments drift past
 *  in opposite directions behind a soft mask. A carousel shows one testimonial
 *  and implies the rest; this shows the depth of the set at a glance, which is
 *  the claim the page is actually making. Pointing at a column stops it and
 *  lifts the card under the cursor, so it is browsable rather than merely
 *  decorative, and a card jumps to its own quote in the archive below.
 *
 *  IT IS ONE CSS ANIMATION PER COLUMN. Each column holds its list twice and
 *  travels exactly half its own height, which is what makes the loop seamless
 *  with no measurement, no timers and nothing running on the main thread.
 *  Under prefers-reduced-motion the columns simply stand still with their cards
 *  in place — the wall is still a wall, it just is not moving.
 *
 *  EVERY FRAGMENT IS VERBATIM. Each is the `mark` substring of its own
 *  testimonial, the same phrase the archive below underlines when the quote is
 *  read in full, so the hero is not copy written for the hero: it is eighteen
 *  pointers into the page, and the reader meets each phrase twice.
 *
 *  The <h1> carries no entrance animation: it is the LCP element and has to
 *  paint on the first frame. */
export function TestimonialHero({
  breadcrumbs,
  formTitle,
  formFields,
  phoneHref,
  rail,
}: {
  breadcrumbs?: ReactNode;
  formTitle: string;
  formFields: FormField[];
  phoneHref: string;
  /** The figure rail pinned to the base of the fold. */
  rail?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="hero"
      data-section="Testimonials Hero"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute left-[4%] top-[8%] h-[40vw] w-[40vw] rounded-full bg-brand/20 blur-[150px]" />
        <div className="aurora-b absolute bottom-[6%] right-[-10%] h-[32vw] w-[32vw] rounded-full bg-brand-deep/25 blur-[130px]" />
        {/* The ruled ground of a record book, faded off at the edges. The same
            grid the service heroes carry, turned to horizontal rules only,
            because this page is a ledger rather than a plan. */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "100% 2.25rem",
            maskImage: "radial-gradient(ellipse at 28% 42%, black, transparent 78%)",
          }}
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center py-6">
        <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            {breadcrumbs && <div className="mb-6">{breadcrumbs}</div>}

            <p className="mb-6 text-xs font-semibold uppercase text-brand-text">
              (00) {voices.length} clients, in their own words
            </p>

            {/* Whitespace between the spans is real: they are block, so it
                never renders, but without it textContent runs the three lines
                together for crawlers and screen readers. */}
            <h1 className="font-display display-2xl font-extrabold uppercase">
              <span className="block text-snow">{hero.lines[0]}</span>{" "}
              <span className="block text-stroke">{hero.lines[1]}</span>{" "}
              <span className="block text-brand">{hero.lines[2]}</span>
            </h1>

            <div className="mt-9 max-w-xl lg:max-w-lg">
              <Rise delay={0.15}>
                <p
                  className="leading-relaxed text-fog"
                  style={{ fontSize: "clamp(1rem, min(1.2rem, 2.4svh), 1.2rem)" }}
                >
                  {hero.sub}
                </p>
              </Rise>
            </div>

            <Rise delay={0.3} className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group inline-flex max-w-full shrink-0 items-center justify-center gap-3 whitespace-normal rounded-full bg-brand px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep sm:whitespace-nowrap"
              >
                {hero.primary}
                <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                  <ArrowRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5" />
                  <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </span>
              </button>

              <a
                href={`tel:${phoneHref}`}
                className="inline-flex max-w-full shrink-0 items-center justify-center gap-3 whitespace-normal rounded-full border border-line px-7 py-3.5 text-center text-sm font-semibold text-snow transition-colors duration-300 hover:border-brand hover:text-brand sm:whitespace-nowrap"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                {hero.secondary}
              </a>
            </Rise>
          </div>

          {/* The wall. Aria-hidden as a set, because every fragment in it is a
              substring of a quote printed in full further down the page, and
              reading eighteen of them twice serves nobody. The jump targets
              stay reachable there, where the whole quote is. */}
          <div
            aria-hidden
            className="vw-wall relative -mr-6 grid h-[clamp(15rem,42svh,25rem)] grid-cols-1 gap-3 overflow-hidden sm:-mr-10 sm:h-[clamp(17rem,46svh,28rem)] sm:grid-cols-2 lg:mr-0"
          >
            {COLUMNS.map((column, c) => (
              <div
                key={c}
                className={cn(
                  "vw-col flex flex-col gap-3",
                  c === 1 && "vw-col-back hidden sm:flex",
                )}
              >
                {/* The list, twice. The column travels exactly half its own
                    height, so the second pass is already in place when the
                    first leaves and the seam never lands on screen. */}
                {[0, 1].map((pass) =>
                  column.map((v) => (
                    <a
                      key={`${pass}-${v.no}`}
                      href={`#voice-card-${v.no}`}
                      tabIndex={-1}
                      className="vw-card group block shrink-0 rounded-xl border border-line bg-ink-2/80 p-4 backdrop-blur-sm"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line bg-ink-3 text-[0.6rem] font-extrabold text-snow">
                          {monogram(v.org)}
                        </span>
                        <span className="flex items-center gap-0.5 text-brand">
                          {Array.from({ length: STARS }).map((_, s) => (
                            <svg key={s} width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2.5l2.9 6.06 6.6.83-4.85 4.5 1.23 6.55L12 17.3l-5.88 3.14 1.23-6.55L2.5 9.39l6.6-.83z" />
                            </svg>
                          ))}
                        </span>
                      </span>
                      <span className="font-display mt-2.5 block text-[0.92rem] font-bold leading-snug text-snow">
                        &ldquo;{v.mark}&rdquo;
                      </span>
                      <span className="mt-2 block text-[0.68rem] font-semibold uppercase leading-snug tracking-wide text-fog">
                        {v.name}, {v.org}
                      </span>
                    </a>
                  )),
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>

      {rail}

      <Modal open={open} onClose={() => setOpen(false)} title={formTitle}>
        <LeadForm fields={formFields} submitLabel={hero.primary} />
      </Modal>
    </section>
  );
}

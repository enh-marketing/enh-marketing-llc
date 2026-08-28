"use client";

import { useState, type ReactNode } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LeadForm, type FormField } from "@/components/service/LeadForm";

/** Service hero. Mirrors the homepage hero: mega-scale type stacked over three
 *  lines, solid / stroked / brand, with a slot pinned to the base.
 *
 *  The h1 renders statically with no entrance animation because it is the LCP
 *  element and must paint on the first frame. */
export function ServiceHero({
  id,
  label,
  lines,
  sub,
  primary,
  secondary,
  phoneHref,
  formTitle,
  formFields,
  formSubmitLabel,
  breadcrumbs,
  footer,
  visual,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  lines: [string, string, string];
  sub: string;
  /** Opens the enquiry form in a dialog. */
  primary: string;
  /** Places a call. */
  secondary: string;
  phoneHref: string;
  formTitle: string;
  formFields: FormField[];
  formSubmitLabel: string;
  /** Trail, rendered above the heading inside the hero rather than in a bar of
   *  its own. A bar above a viewport-height hero would push the footer strip
   *  under the fold, and this way the trail never collides with the fixed
   *  header either. */
  breadcrumbs?: ReactNode;
  /** Rendered in flow at the base of the hero, inside the first viewport. */
  footer?: ReactNode;
  visual?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section
      id={id}
      data-section={label}
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute left-[6%] top-[10%] h-[42vw] w-[42vw] rounded-full bg-brand/20 blur-[150px]" />
        <div className="aurora-b absolute right-[-8%] bottom-[8%] h-[34vw] w-[34vw] rounded-full bg-brand-deep/25 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(circle at 40% 45%, black, transparent 75%)",
          }}
        />
      </div>

      {visual}

      <Container className="relative z-10 flex flex-1 flex-col justify-center py-3">
        {breadcrumbs && <div className="mb-5">{breadcrumbs}</div>}

        {/* Whitespace between the lines is deliberate: the spans are block, so
            it never renders, but without it textContent concatenates to
            "PerformanceMarketingin Dubai" for crawlers and assistive tech. */}
        <h1 className="font-display display-2xl font-extrabold uppercase">
          <span className="block text-snow">{lines[0]}</span>{" "}
          <span className="block text-stroke">{lines[1]}</span>{" "}
          <span className="block text-brand">{lines[2]}</span>
        </h1>

        {/* The copy stays on a reading measure; the button row is deliberately
            outside it, because together the two labels need ~567px and would
            wrap inside max-w-lg. */}
        <div className="mt-12 max-w-xl lg:max-w-lg">
          <Rise delay={0.15}>
            {/* Also height-aware, for the same reason as the heading: this
                paragraph runs to five lines on the longer hero and is the
                second-largest block in the fold. */}
            <p
              className="leading-relaxed text-fog"
              style={{ fontSize: "clamp(1rem, min(1.25rem, 2.45svh), 1.25rem)" }}
            >
              {sub}
            </p>
          </Rise>
        </div>

        <Rise delay={0.3} className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
          >
            {primary}
            <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
              <ArrowRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5" />
              <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            </span>
          </button>

          <a
            href={`tel:${phoneHref}`}
            className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-snow transition-colors duration-300 hover:border-brand hover:text-brand"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            {secondary}
          </a>
        </Rise>
      </Container>

      {footer && <div className="relative z-10">{footer}</div>}

      <Modal open={open} onClose={() => setOpen(false)} title={formTitle}>
        <LeadForm fields={formFields} submitLabel={formSubmitLabel} />
      </Modal>
    </section>
  );
}

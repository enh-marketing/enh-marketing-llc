"use client";

import { useState, type ReactNode } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LeadForm } from "@/components/service/LeadForm";
import { CategoryField } from "@/components/portfolio/CategoryField";
import { masthead, formFields, type Category, type Project } from "@/content/portfolio";

/** THE OPENING.
 *
 *  IT IS `CaseMasthead`'S COMPOSITION, and deliberately so: the tri-tone
 *  headline, the aurora ground, the ruled paper, the button pair and the
 *  enquiry dialog are the same, so a reader moving between the two archives is
 *  on one site. What stands beside the headline is this archive tallied by
 *  discipline, for the same reason the case studies tally by sector — the
 *  reader learns what kind of work this agency actually ships before they have
 *  scrolled once, and every mark in it is a way into a project.
 *
 *  THE HEADLINE IS NOT "PORTFOLIO". That is the label in the menu the reader
 *  just clicked, and repeating it back is a wasted first line. What these
 *  thirty-five have in common is the artefact each one left behind, so the
 *  headline names the three kinds.
 *
 *  THE <h1> CARRIES NO ENTRANCE ANIMATION. It is the largest text in the fold
 *  and the LCP element on this page, so it paints on the first frame. Same rule
 *  ServiceHero, ArticleHero and CaseMasthead follow. */
export function PortfolioMasthead({
  projects,
  activeCategory,
  onSelectCategory,
  breadcrumbs,
  phoneHref,
  formTitle,
}: {
  projects: Project[];
  activeCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
  breadcrumbs?: ReactNode;
  phoneHref: string;
  formTitle: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="masthead"
      data-section="Portfolio Masthead"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute left-[4%] top-[6%] h-[38vw] w-[38vw] rounded-full bg-brand/18 blur-[150px]" />
        <div className="aurora-b absolute bottom-[8%] right-[-10%] h-[30vw] w-[30vw] rounded-full bg-brand-deep/22 blur-[130px]" />
        {/* The ruled ground of a record book, the same paper the case studies
            masthead, the testimonials page and the article header stand on. */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "100% 2.25rem",
            maskImage: "radial-gradient(ellipse at 26% 40%, black, transparent 78%)",
          }}
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center py-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            {breadcrumbs && <div className="mb-6">{breadcrumbs}</div>}

            <p className="mb-6 text-xs font-semibold uppercase text-brand-text">
              (00) {projects.length} projects, across three disciplines
            </p>

            {/* The whitespace between the spans is real: they are block, so it
                never renders, but without it textContent runs the three lines
                together for crawlers and screen readers. */}
            <h1 className="font-display display-2xl font-extrabold uppercase">
              <span className="block text-snow">{masthead.lines[0]}</span>{" "}
              <span className="block text-stroke">{masthead.lines[1]}</span>{" "}
              <span className="block text-brand">{masthead.lines[2]}</span>
            </h1>

            <div className="mt-8 max-w-xl lg:max-w-lg">
              <Rise delay={0.15}>
                <p
                  className="leading-relaxed text-fog"
                  style={{ fontSize: "clamp(1rem, min(1.2rem, 2.4svh), 1.2rem)" }}
                >
                  {masthead.sub}
                </p>
              </Rise>
            </div>

            <Rise delay={0.3} className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group inline-flex max-w-full shrink-0 items-center justify-center gap-3 whitespace-normal rounded-full bg-brand px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep sm:whitespace-nowrap"
              >
                {masthead.primary}
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
                {masthead.secondary}
              </a>
            </Rise>
          </div>

          <Rise delay={0.2} className="min-w-0">
            <CategoryField
              projects={projects}
              active={activeCategory}
              onSelect={onSelectCategory}
            />
          </Rise>
        </div>
      </Container>

      <Modal open={open} onClose={() => setOpen(false)} title={formTitle}>
        <LeadForm fields={formFields} submitLabel={masthead.primary} formName="Portfolio Hero" />
      </Modal>
    </section>
  );
}

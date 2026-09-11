"use client";

import type { ReactNode } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Button";
import { ProjectMedia } from "@/components/portfolio/ProjectMedia";
import {
  categoriesOf,
  holdings,
  siteLabel,
  project as copy,
  type Project,
} from "@/content/portfolio";

/** THE PROJECT'S OPENING.
 *
 *  TYPE FIRST, PICTURE SECOND, and the record beside it. Same composition
 *  `CaseHero` uses, for the same reason: a reader arrives from a card that
 *  already showed them the picture, so what they came for is what this was and
 *  what it produced.
 *
 *  NOT min-h-svh. The service heroes fill a viewport because their job is to
 *  sell before the reader scrolls. This page's job is to show the work, and a
 *  full-height header in front of it is a wall between the reader and the thing
 *  they clicked. Same rule `CaseHero` and `ArticleHero` follow.
 *
 *  THERE IS NO FIGURE STRIP UNDER IT, because a portfolio entry publishes no
 *  figures. Where this client also has a case study, the strip's place is taken
 *  by a link to it — that page carries the numbers, with the evidence they were
 *  measured from. Inventing four here would be inventing them.
 *
 *  THE <h1> HAS NO ENTRANCE ANIMATION: it is the LCP element on every one of
 *  these thirty-five pages. */
export function ProjectHero({
  project,
  caseStudy,
  breadcrumbs,
}: {
  project: Project;
  /** Resolved in the route, not here: the case studies are a separate content
   *  module and importing it into this island would ship all twenty-two of them
   *  with the portfolio. Absent where the study has no page. */
  caseStudy?: { href: string; title: string };
  breadcrumbs?: ReactNode;
}) {
  const categories = categoriesOf(project);
  const holds = holdings(project);

  return (
    <header
      id="project-head"
      data-section="Project Header"
      className="relative isolate overflow-hidden pb-2 pt-28 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute left-[2%] top-[-6%] h-[36vw] w-[36vw] rounded-full bg-brand/14 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "100% 2.25rem",
            maskImage: "radial-gradient(ellipse at 30% 20%, black, transparent 78%)",
          }}
        />
      </div>

      <Container>
        {breadcrumbs && <div className="mb-8">{breadcrumbs}</div>}

        <p className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-brand-text">
            {categories.map((c) => c.label).join(" · ")}
          </span>
        </p>

        <h1 className="font-display display-2xl max-w-[22ch] font-extrabold uppercase text-snow">
          {project.title}
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <Rise className="lg:col-span-7">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-line bg-ink-2">
              <ProjectMedia figure={project.thumb} slot="hero" eager />
            </div>
          </Rise>

          <Rise delay={0.12} className="min-w-0 lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              <div className="py-6">
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                  {copy.categoriesLabel}
                </dt>
                <dd className="mt-4">
                  <ul className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <li
                        key={category.key}
                        /* Set as text, not as a link. A discipline is a filter
                           on the archive rather than a page, and the site sells
                           its services under names of its own -- pointing "Web
                           Design" at /services/web-design-development would be
                           asserting a mapping the source never makes, and
                           "Digital Marketing" has no single page to point at
                           at all. */
                        className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-fog"
                      >
                        {category.label}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>

              {holds.length > 0 && (
                <div className="py-6">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                    {copy.workLabel}
                  </dt>
                  {/* Counted from the project, so the header cannot promise
                      something the page below does not hold. */}
                  <dd className="mt-3 text-sm leading-relaxed text-fog">{holds.join(" · ")}</dd>
                </div>
              )}

              {project.projectUrl && (
                <div className="py-6">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                    {copy.liveSiteLabel}
                  </dt>
                  <dd className="mt-3">
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-sm font-semibold text-snow transition-colors duration-300 hover:text-brand"
                    >
                      {siteLabel(project.projectUrl)}
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        fill="none"
                        className="h-3 w-3 text-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        <path
                          d="M4 12L12 4M6 4h6v6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </dd>
                </div>
              )}

              {caseStudy && (
                <div className="py-6">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                    {copy.caseStudyLabel}
                  </dt>
                  <dd className="mt-3">
                    <a
                      href={caseStudy.href}
                      className="group inline-flex items-center gap-2.5 text-sm font-semibold text-snow transition-colors duration-300 hover:text-brand"
                    >
                      {copy.caseStudyAction}
                      <span className="relative flex h-3.5 w-3.5 items-center justify-center overflow-hidden text-brand">
                        <ArrowRight className="absolute h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4" />
                        <ArrowRight className="absolute h-3 w-3 -translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                      </span>
                    </a>
                    <p className="mt-2 text-[0.6875rem] leading-snug text-ash">{caseStudy.title}</p>
                  </dd>
                </div>
              )}
            </dl>
          </Rise>
        </div>
      </Container>
    </header>
  );
}

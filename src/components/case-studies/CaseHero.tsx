"use client";

import type { ReactNode } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { CaseMedia } from "@/components/case-studies/CaseMedia";
import { Figures } from "@/components/case-studies/Figures";
import { routeExists } from "@/lib/sitemap";
import { servicesOf, siteLabel, study as copy, type Study } from "@/content/case-studies";

/** THE STUDY'S OPENING.
 *
 *  TYPE FIRST, PICTURE SECOND, and the figures under both. A case study's
 *  reader arrives from a card that already showed them the picture and the
 *  numbers; what they came for is what it was and what happened, so the
 *  headline is the first thing in the fold and the artwork sits beside it
 *  rather than above it.
 *
 *  NOT min-h-svh. The service heroes fill a viewport because their job is to
 *  sell before the reader scrolls. This page's job is to be read, and a
 *  full-height header in front of a story is a wall between the reader and the
 *  thing they clicked. Same rule ArticleHero follows.
 *
 *  THE <h1> HAS NO ENTRANCE ANIMATION: it is the LCP element on every one of
 *  these twenty-two pages.
 *
 *  THE SIDEBAR IS EVIDENCE, NOT DECORATION. The sector is printed with the
 *  phrase from this study's own profile that it was read from, and each
 *  service links to the page that sells it. Both are checkable against the
 *  copy further down, which is the whole reason they are allowed on the page. */
export function CaseHero({
  study,
  breadcrumbs,
}: {
  study: Study;
  breadcrumbs?: ReactNode;
}) {
  const services = servicesOf(study);

  return (
    <header
      id="case-head"
      data-section="Case Study Header"
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
          <span className="font-display text-[1.2rem] font-extrabold uppercase leading-none text-snow sm:text-[1.45rem]">
            {study.client}
          </span>
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-brand-text">
            {study.sector}
          </span>
        </p>

        <h1 className="font-display display-2xl max-w-[22ch] font-extrabold uppercase text-snow">
          {study.title}
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <Rise className="lg:col-span-7">
            <div
              className="relative overflow-hidden rounded-2xl border border-line bg-ink-2"
              style={{ aspectRatio: `${study.thumb.w} / ${study.thumb.h}` }}
            >
              <CaseMedia figure={study.thumb} slot="hero" eager />
            </div>
          </Rise>

          <Rise delay={0.12} className="min-w-0 lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              {services.length > 0 && (
                <div className="py-6">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                    {copy.servicesLabel}
                  </dt>
                  <dd className="mt-4">
                    <ul className="flex flex-wrap gap-2">
                      {services.map((service) => {
                        const built = routeExists(service.href);
                        return (
                          <li key={service.key}>
                            {/* A service whose page is not built yet is set as
                                text. Same rule Crosslink applies everywhere
                                else on the site: a link to a 404 is worse than
                                no link. */}
                            {built ? (
                              <a
                                href={service.href}
                                className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-fog transition-colors duration-300 hover:border-brand/60 hover:text-snow"
                              >
                                {service.label}
                              </a>
                            ) : (
                              <span className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-fog">
                                {service.label}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </dd>
                </div>
              )}

              <div className="py-6">
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                  {copy.evidenceLabel}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-fog">
                  &ldquo;{study.sectorEvidence}&rdquo;
                </dd>
              </div>

              {study.projectUrl && (
                <div className="py-6">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                    {copy.siteLabel}
                  </dt>
                  <dd className="mt-3">
                    <a
                      href={study.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-sm font-semibold text-snow transition-colors duration-300 hover:text-brand"
                    >
                      {siteLabel(study.projectUrl)}
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
            </dl>
          </Rise>
        </div>

        <Rise delay={0.18}>
          <Figures
            metrics={study.metrics}
            scale="strip"
            label={copy.metricsLabel}
            className="mt-14"
          />
        </Rise>
      </Container>
    </header>
  );
}

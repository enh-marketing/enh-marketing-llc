"use client";

import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/ui/Button";
import { CaseMedia } from "@/components/case-studies/CaseMedia";
import { Figures } from "@/components/case-studies/Figures";
import { Prose } from "@/components/case-studies/Prose";
import { hasStory, leadStory, servicesOf, type Study } from "@/content/case-studies";

/** THE COVER STORY.
 *
 *  "FEATURED" IS NOT OUR OPINION. The live index lists these twenty-two in a
 *  deliberate order and this is whichever one the agency itself puts first, so
 *  the page can lead with a study without inventing a ranking or calling
 *  anything "best". The label under the heading says exactly that, which is
 *  why it is a sentence about position rather than an adjective about quality.
 *
 *  IT IS A COVER, NOT A BIG PLATE. Three things separate it from everything in
 *  the archive below: the title is set at display scale rather than at reading
 *  scale, the picture takes half the measure rather than a fifth of it, and
 *  the four figures run the full width underneath both columns as a strip with
 *  rules between them. That last one is the signature — no plate in the
 *  archive has a full-measure figure strip, so the reader can tell at a glance
 *  that this entry is being presented rather than listed. */
export function LeadCase({ study }: { study: Study }) {
  const live = hasStory(study);
  const href = `/case-studies/${study.slug}`;
  const services = servicesOf(study);
  const opening = study.profile.slice(0, 1);

  return (
    <section
      id="lead"
      data-section="Lead Case Study"
      className="relative overflow-x-clip py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          index={leadStory.index}
          title={leadStory.title}
          strokeTitle={leadStory.strokeTitle}
          lede={leadStory.note}
          className="mb-14"
        />

        {/* THE HEADLINE RUNS ACROSS BOTH COLUMNS. It is set above the grid
            rather than inside a column so the picture below it can take
            two thirds of the measure: at eight columns it is wider than the
            widest plate in the archive, which is what makes this read as a
            cover rather than as the first entry in the list. */}
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
          <span className="font-display text-[1.35rem] font-extrabold uppercase leading-none text-snow sm:text-[1.6rem]">
            {study.client}
          </span>
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-brand-text">
            {study.sector}
          </span>
        </p>

        <h3 className="font-display display-lg mt-6 max-w-[24ch] font-extrabold uppercase leading-[1.03] text-snow">
          {study.title}
        </h3>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* The picture keeps the result card's own proportions. Every one of
              these is 2160×1512 artwork with content to all four edges, so a
              wide crop would cut through the client's own screenshot. */}
          <a
            href={live ? href : undefined}
            tabIndex={live ? 0 : -1}
            aria-hidden={!live}
            className="group relative block overflow-hidden rounded-2xl border border-line bg-ink-2 transition-colors duration-500 hover:border-brand/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none lg:col-span-8"
            style={{ aspectRatio: `${study.thumb.w} / ${study.thumb.h}` }}
          >
            <CaseMedia
              figure={study.thumb}
              slot="lead"
              eager
              className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          </a>

          <div className="min-w-0 lg:col-span-4">
            {opening.length > 0 && (
              <Rise delay={0.1}>
                <Prose blocks={opening} tone="quiet" />
              </Rise>
            )}

            {services.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {services.map((service) => (
                  <li key={service.key}>
                    <span className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-fog">
                      {service.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {live && (
              <a
                href={href}
                className="group mt-10 inline-flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-snow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <span
                  aria-hidden
                  className="h-px w-10 bg-brand transition-all duration-500 group-hover:w-16 motion-reduce:transition-none"
                />
                Read the case study
                <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden text-brand">
                  <ArrowRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5" />
                  <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </span>
              </a>
            )}
          </div>
        </div>

        <Rise delay={0.15}>
          <Figures
            metrics={study.metrics}
            scale="strip"
            label={`Published figures for ${study.client}`}
            className="mt-14"
          />
        </Rise>
      </Container>
    </section>
  );
}

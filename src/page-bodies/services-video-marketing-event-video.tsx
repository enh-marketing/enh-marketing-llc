"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/event-video";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { RunOfShow } from "@/components/service/RunOfShow";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { CoveragePlan } from "@/components/service/CoveragePlan";
import { IndustryRun } from "@/components/service/IndustryRun";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/video-marketing/event-video";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function EventVideoPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        <ServiceHero
          id="hero"
          label="Hero"
          lines={c.hero.lines}
          sub={c.hero.sub}
          primary={c.hero.primary}
          secondary={c.hero.secondary}
          secondaryHref={c.hero.secondaryHref}
          phoneHref={brand.phoneHref}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          footer={<TrustStrip key="trust" id="trust" compact />}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          visual={<RunOfShow key="ros" />}
        />

        {/* The opening: four things happening at once, and one camera. The five
            things settled in advance are marked inside the agency paragraph
            because the rest of the page is about settling them. */}
        <Narrative
          id="story"
          label="Plan the Coverage Before the Event Begins"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
        >
          <Rise delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#quote"
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
            >
              {c.narrative.primary}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-snow transition-colors duration-300 hover:border-brand hover:text-brand"
            >
              {c.narrative.secondary}
            </a>
          </Rise>
        </Narrative>

        {/* Six occasions, each redrawing the same room. See VenueFloor for why
            this is a floor plan rather than a track. */}
        <PinnedExplorer
          id="events"
          label="The Events Businesses Usually Need Filmed"
          index="02"
          title={c.events.title}
          strokeTitle={c.events.strokeTitle}
          items={c.events.items.map((e) => ({
            no: e.no,
            title: e.title,
            body: e.body,
            glyph: e.glyph,
          }))}
          diagramSide="right"
          mark={{ variant: "contrast", label: "One room, six arrangements" }}
          diagram={{ kind: "venue" }}
        />

        {/* Six capabilities, set as cards rather than another pinned panel so
            two long six-item lists never read as the same section twice. */}
        <section
          id="coverage"
          data-section="What Event Video Coverage Can Include"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.coverage.title}
              strokeTitle={c.coverage.strokeTitle}
              mark={{ variant: "ecosystem", label: "Six ways to cover one day" }}
              className="mb-12"
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.coverage.items.map((item, i) => (
                <SurfaceCard
                  key={item.title}
                  index={String(i + 1).padStart(2, "0")}
                  delay={0.05 * i}
                >
                  <p className="font-display text-[1.05rem] font-extrabold uppercase leading-[1.2] text-snow">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{item.body}</p>
                </SurfaceCard>
              ))}
            </div>
          </Container>
        </section>

        {/* THE PAGE'S ARGUMENT. The deliverables decide the shoot, so they are
            drawn before the crew: three events wanting three different things,
            the consequence for the setup, then the eight outputs one event can
            produce. See CoveragePlan. */}
        <section
          id="plan"
          data-section="Decide the Deliverables Before Event Day"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.plan.title}
              strokeTitle={c.plan.strokeTitle}
              mark={{ variant: "progression", label: "One event, eight deliverables" }}
              className="mb-12"
            />

            <CoveragePlan
              claim={c.plan.claim}
              cases={c.plan.cases}
              consequence={c.plan.consequence}
              outputsLead={c.plan.outputsLead}
              outputs={c.plan.outputs}
              outputsTail={c.plan.outputsTail}
            />
          </Container>
        </section>

        {/* Where the footage goes, and the limit on what can be measured. Set
            as an editorial three-part rather than cards: it is one continuous
            argument, and the last part narrows the two before it. */}
        <section
          id="distribution"
          data-section="Where Your Event Videos Can Be Used"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.distribution.title}
              strokeTitle={c.distribution.strokeTitle}
              className="mb-12"
            />

            <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <Rise>
                <p className="leading-relaxed text-snow sm:text-lg">{c.distribution.lead}</p>
              </Rise>
              <div className="space-y-8">
                <Rise delay={0.08}>
                  <p className="border-l-2 border-brand pl-6 leading-relaxed text-fog">
                    {c.distribution.support}
                  </p>
                </Rise>
                <Rise delay={0.14}>
                  <p className="flex gap-3 border-t border-line pt-6 text-sm leading-relaxed text-ash">
                    <span aria-hidden className="mt-0.5 shrink-0 text-brand">
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
                      </svg>
                    </span>
                    <span>{c.distribution.measure}</span>
                  </p>
                </Rise>
              </div>
            </div>
          </Container>
        </section>

        <IndustryRun
          id="sectors"
          label="Events and Sectors We Cover"
          index="06"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          items={c.sectors.items.map((label) => ({ label }))}
        />

        <section
          id="promises"
          data-section="What You Get From ENH Marketing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="07"
              title={c.promises.title}
              strokeTitle={c.promises.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="lead">
                  <p className="leading-relaxed text-fog sm:text-lg">{c.promises.lead}</p>
                </Rise>
              }
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.promises.items.map((p, i) => (
                <SurfaceCard key={p.title} index={String(i + 1).padStart(2, "0")} delay={0.05 * i}>
                  <p className="font-display text-[1.05rem] font-extrabold uppercase leading-[1.2] text-snow">
                    {p.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{p.body}</p>
                </SurfaceCard>
              ))}
            </div>
          </Container>
        </section>

        {/* The hero's second button points here, because it says portfolio. */}
        <Work index="08" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Tell Us What the Event Needs"
          index="10"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="11" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/campaign-intelligence";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { BudgetSplit } from "@/components/service/BudgetSplit";
import { Narrative } from "@/components/service/Narrative";
import { CampaignTimeline } from "@/components/service/CampaignTimeline";
import { CampaignMark } from "@/components/service/CampaignMark";
import { DataConverge } from "@/components/service/DataConverge";
import { LaunchTrack } from "@/components/service/LaunchTrack";
import { PlanCheck } from "@/components/service/PlanCheck";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/* Drives <Breadcrumbs href={HREF} />. A subpage of the AI Hub, so the trail
   reads Home > AI Hub > Campaign Intelligence. See sitemap.ts. */
const HREF = "/ai-hub/campaign-intelligence";
const FORM_TITLE = c.hero.primary;

export function CampaignIntelligencePage() {
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
          phoneHref={brand.phoneHref}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          footer={<TrustStrip key="trust" id="trust" compact />}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          visual={<BudgetSplit key="budget-split" channels={c.hero.channels} />}
        />

        {/* "What We Do". The first paragraph decodes; the second follows it. */}
        <Narrative
          id="what"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.question}
          questionEmphasis={c.narrative.questionEmphasis}
          body={c.narrative.body}
          highlight={c.narrative.highlight}
          outro={c.narrative.outro}
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

        {/* Six covered items on the campaign they act in: a rail in three
            phases, cards in the column of their phase, benchmarking as a band
            across all three. See CampaignTimeline. */}
        <section id="covers" data-section="What Campaign Intelligence Covers" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader
              index="01"
              title={c.covers.title}
              strokeTitle={c.covers.strokeTitle}
              markNode={<CampaignMark variant="phases" />}
              className="mb-12"
            />
            <CampaignTimeline items={c.covers.items} />
          </Container>
        </section>

        {/* Twelve inputs, gathered into the diagnostic. See DataConverge. */}
        <section id="data" data-section="The Data We Need" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.dataNeeded.title}
              strokeTitle={c.dataNeeded.strokeTitle}
              markNode={<CampaignMark variant="range" />}
              className="mb-12"
            />
            <DataConverge
              lead={c.dataNeeded.lead}
              coversLead={c.dataNeeded.coversLead}
              items={c.dataNeeded.items}
              boxText={c.dataNeeded.closingTail}
              closing={c.dataNeeded.closing}
            />
          </Container>
        </section>

        {/* Six steps, crossing the line where the campaign starts. See
            LaunchTrack. overflow-hidden and the track outside the Container,
            for the same reasons AI Automation gives. */}
        <section id="process" data-section="How Forecasting Works" className="relative overflow-hidden py-14 sm:py-16">
          <Container className="relative mb-14">
            <SectionHeader
              index="03"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              markNode={<CampaignMark variant="startline" />}
            />
          </Container>
          <LaunchTrack
            items={c.process.items}
            launchAt={c.process.launchAt}
            beforeLabel={c.process.labels.before}
            liveLabel={c.process.labels.live}
            afterLabel={c.process.labels.after}
            softLaunch
          />
        </section>

        {/* The document places its mid-page CTA here, after step 6. */}
        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
        />

        {/* The plan and the check, each with its drawing, either side of the
            start line; then the promise over a range that widens. See PlanCheck.
            Lifted to its own chapter treatment, as the managed section is on AI
            Automation. */}
        <section
          id="helps"
          data-section="How ENH Helps You Plan and Improve Campaigns"
          className="relative overflow-x-clip py-20 sm:py-24"
        >
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "88px 88px",
                maskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 76%)",
              }}
            />
            <div className="aurora-b absolute left-1/2 top-[8%] h-[30vw] w-[30vw] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[150px]" />
          </div>
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.helps.title}
              strokeTitle={c.helps.strokeTitle}
              markNode={<CampaignMark variant="twosided" />}
              className="mb-14"
            />
            <PlanCheck left={c.helps.left} right={c.helps.right} closing={c.helps.closing} />
          </Container>
        </section>

        <Work index="05" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="Plan Your Campaign Before Committing the Budget"
          index="07"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.hero.secondary}
        />

        <Insights index="08" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

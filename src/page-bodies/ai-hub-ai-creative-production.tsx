"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/ai-creative-production";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ReviewLine } from "@/components/service/ReviewLine";
import { ProduceGrid } from "@/components/service/ProduceGrid";
import { FatigueRelay } from "@/components/service/FatigueRelay";
import { ReviewStrip } from "@/components/service/ReviewStrip";
import { Swimlanes } from "@/components/service/Swimlanes";
import { ScopeCard } from "@/components/service/ScopeCard";
import { CreativeMark } from "@/components/service/CreativeMark";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/* Drives <Breadcrumbs href={HREF} />. A subpage of the AI Hub, so the trail
   reads Home > AI Hub > AI Creative Production. See sitemap.ts. */
const HREF = "/ai-hub/ai-creative-production";
const FORM_TITLE = c.hero.primary;

export function AiCreativeProductionPage() {
  return (
    <>
      <main>
        {/* One call to action, by the client's decision: the portfolio label is
            withheld until the portfolio exists. See the content file header. */}
        <ServiceHero
          id="hero"
          label="Hero"
          lines={c.hero.lines}
          sub={c.hero.sub}
          primary={c.hero.primary}
          phoneHref={brand.phoneHref}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          footer={<TrustStrip key="trust" id="trust" compact />}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          visual={<ReviewLine key="review-line" stages={c.hero.stages} />}
        />

        {/* GATE. "See the Work" is an instruction in the source, not content:
            "[Place the AI creative portfolio directly below the banner.]" with
            what each example must state. Nothing is rendered for it and nothing
            is invented. Supply approved examples and the section goes in here. */}

        {/* Four kinds of output, each drawn as the thing it is. See ProduceGrid. */}
        <section id="produce" data-section="What We Produce" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader index="01" title={c.produce.title} strokeTitle={c.produce.strokeTitle} markNode={<CreativeMark variant="frames" />} className="mb-12" />
            <ProduceGrid items={c.produce.items} />
          </Container>
        </section>

        {/* Why volume: audiences tire, the next version takes over. See FatigueRelay. */}
        <section id="volume" data-section="Built for Campaign Volume" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader index="02" title={c.volume.title} strokeTitle={c.volume.strokeTitle} markNode={<CreativeMark variant="relay" />} className="mb-12" />
            <FatigueRelay lead={c.volume.lead} caveat={c.volume.caveat} labels={c.volume.labels} />
          </Container>
        </section>

        {/* Five review stages as five frames on a strip. See ReviewStrip. Lifted
            to its own chapter treatment: this is the page's differentiator. */}
        <section id="review" data-section="Quality and Human Review" className="relative overflow-x-clip py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)", backgroundSize: "88px 88px", maskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 76%)" }}
            />
            <div className="aurora-b absolute left-1/2 top-[8%] h-[30vw] w-[30vw] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[150px]" />
          </div>
          <Container className="relative">
            <SectionHeader index="03" title={c.review.title} strokeTitle={c.review.strokeTitle} markNode={<CreativeMark variant="strip" />} className="mb-12" />
            <ReviewStrip items={c.review.items} />
          </Container>
        </section>

        {/* Six steps in two lanes: where the client comes in. See Swimlanes. */}
        <section id="process" data-section="How the Work Moves" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader index="04" title={c.process.title} strokeTitle={c.process.strokeTitle} markNode={<CreativeMark variant="lanes" />} className="mb-12" />
            <Swimlanes items={c.process.items} />
          </Container>
        </section>

        {/* One-off or monthly, and what is never included unless added. See ScopeCard. */}
        <section id="monthly" data-section="Monthly AI Creative Production" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader index="05" title={c.monthly.title} strokeTitle={c.monthly.strokeTitle} markNode={<CreativeMark variant="scope" />} className="mb-12" />
            <ScopeCard lead={c.monthly.lead} exclusion={c.monthly.exclusion} options={c.monthly.options} included={c.monthly.included} excluded={c.monthly.excluded} includedLabel={c.monthly.includedLabel} excludedLabel={c.monthly.excludedLabel} />
          </Container>
        </section>

        <Work index="06" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="07" faqs={c.faqs} />

        {/* Primary only, per the client's decision on the portfolio label. */}
        <CtaBand
          label="See What AI Production Can Create for Your Campaign"
          index="08"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
        />

        <Insights index="09" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

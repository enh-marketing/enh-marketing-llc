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
import { ProductionRun } from "@/components/service/ProductionRun";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { StageTimeline } from "@/components/service/StageTimeline";
import { ProcessLanes } from "@/components/service/ProcessLanes";
import { VariantBloom } from "@/components/service/VariantBloom";
import { ProductionEngine } from "@/components/service/ProductionEngine";
import { CreativeMark } from "@/components/service/CreativeMark";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
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
          visual={<ProductionRun key="run" stages={c.hero.stages} />}
        />

        {/* GATE. "See the Work" is an instruction in the source, not content:
            "[Place the AI creative portfolio directly below the banner.]" with
            what each example must state. Nothing is rendered for it and nothing
            is invented. Supply approved examples and the section goes in here. */}

        {/* The four outputs, on the site's own formats pattern: one named
            selector, one drawing, one panel. Same component the video pages use
            for "The Explainer Videos Businesses Use". */}
        <PinnedExplorer
          id="produce"
          label="What We Produce"
          index="01"
          title={c.produce.title}
          strokeTitle={c.produce.strokeTitle}
          markNode={<CreativeMark variant="frames" />}
          items={c.produce.items}
          diagram={{ kind: "creative" }}
          diagramSide="left"
        />

        {/* One approved direction becoming a field, and the familiarity that
            makes that necessary. The caveat is now set at full weight rather
            than left off the page. See VariantBloom. */}
        <section id="volume" data-section="Built for Campaign Volume" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader index="02" title={c.volume.title} strokeTitle={c.volume.strokeTitle} markNode={<CreativeMark variant="relay" />} className="mb-12" />
            <VariantBloom
              lead={c.volume.lead}
              caveat={c.volume.caveat}
              directionLabel={c.volume.labels.direction}
              axes={c.volume.labels.adapted}
            />
          </Container>
        </section>

        {/* Five passes over one asset, on the site's own stage timeline. The
            axis ends are the first and last stage's own titles, so no duration
            the document does not state is implied. */}
        <StageTimeline
          id="review"
          label="Quality and Human Review"
          index="03"
          title={c.review.title}
          strokeTitle={c.review.strokeTitle}
          stages={c.review.items}
          axis={["Approved direction", "Final variants"]}
          markNode={<CreativeMark variant="strip" />}
        />

        {/* Six steps in two lanes, on the site's own ProcessLanes. The lane
            per step is read from that step's own sentence: the client acts at
            three ("shared for approval") and five ("Your team checks"). */}
        <ProcessLanes
          id="process"
          label="How the Work Moves"
          index="04"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.items}
          laneOurs="ENH Marketing"
          laneYours="Your team"
          lanes={c.process.items.map((s) => (s.actor === "You" ? 1 : 0))}
          markNode={<CreativeMark variant="lanes" />}
        />

        {/* The month as the engine it is: six stations on a ring a carrier goes
            round, the commitment at its hub, and the four excluded items on
            couplings that are never made. See ProductionEngine. */}
        <section id="monthly" data-section="Monthly AI Creative Production" className="relative overflow-x-clip py-16 sm:py-20">
          <Container className="relative">
            <SectionHeader index="05" title={c.monthly.title} strokeTitle={c.monthly.strokeTitle} markNode={<CreativeMark variant="scope" />} className="mb-12" />
            <ProductionEngine
              shape={c.monthly.shape}
              includedLabel={c.monthly.includedLabel}
              included={c.monthly.included}
              commitment={c.monthly.commitment}
              excludedLabel={c.monthly.excludedLabel}
              excluded={c.monthly.excluded}
              excludedTail={c.monthly.excludedTail}
            />
          </Container>
        </section>

        {/* The band closes the argument rather than interrupting it: it comes
            after the last of the page's own sections, so the reader is asked
            once they have the whole picture. */}
        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
        />

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

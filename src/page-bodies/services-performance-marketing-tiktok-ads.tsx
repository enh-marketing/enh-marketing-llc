"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/tiktok-ads";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { ServiceHero } from "@/components/service/ServiceHero";
import { CreativeDecay } from "@/components/service/CreativeDecay";
import { RunningAccount } from "@/components/service/RunningAccount";
import { SparkJoin } from "@/components/service/SparkJoin";
import { CreativeRhythm } from "@/components/service/CreativeRhythm";
import { ExclusionBand } from "@/components/service/ExclusionBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";
import { ResultStats } from "@/components/service/ResultStats";

const HREF = "/tiktok-advertising-agency-dubai";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function TikTokAdsPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        {/* The hero visual is the document's first paragraph, drawn: an account
            whose structure does not change beside a batch of creative that runs
            down to a fraction of what it delivered. */}
        <ServiceHero
          id="hero"
          label="Hero"
          lines={c.hero.lines}
          sub={c.hero.sub}
          primary={c.hero.primary}
          secondary={c.hero.secondary}
          secondaryHref={whatsapp}
          phoneHref={brand.phoneHref}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          footer={<TrustStrip key="trust" id="trust" compact />}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          visual={<CreativeDecay key="decay" label={c.opening.verdict} />}
        />

        {/* The opening. The document gives this stretch no heading, so the
            section carries none: the verdict is the heading, and the two
            paragraphs under it are the document's own, in its order. The seven
            services named inside the agency sentence are not marked, because
            they are the section immediately below and marking them here would
            set the same list twice on one screen. */}
        <section
          id="story"
          data-section="The Account Is Usually Fine"
          className="relative overflow-x-clip py-16 sm:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "96px 96px",
              maskImage: "linear-gradient(100deg, black, transparent 62%)",
            }}
          />

          <Container className="relative">
            {/* The verdict, and the whole page in eight words. */}
            <Rise>
              <p className="font-display max-w-4xl text-[clamp(1.75rem,4.6vw,3.5rem)] font-extrabold uppercase leading-[1.04] text-snow">
                <Marked
                  text={c.opening.verdict}
                  mark={c.opening.verdictMark}
                  className="text-brand"
                />
              </p>
            </Rise>

            <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
              {/* Why it works here, at statement scale. */}
              <Rise delay={0.1}>
                <p className="statement font-display font-extrabold uppercase leading-[1.16] text-snow">
                  <Marked
                    text={c.opening.claim}
                    mark={c.opening.claimMark}
                    className="text-brand"
                  />
                </p>
              </Rise>

              {/* Who runs it, across the rule. */}
              <Rise delay={0.15} className="relative lg:pl-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 hidden h-[calc(100%-0.25rem)] w-px bg-line lg:block"
                />
                <p className="leading-relaxed text-fog sm:text-lg">
                  <Marked
                    text={c.opening.agency}
                    mark={c.opening.agencyMark}
                    className="font-semibold text-snow"
                  />
                </p>
              </Rise>
            </div>
          </Container>
        </section>

        {/* TEAM DIRECTION, 2026-09-08: the Performance Marketing results band, on
            this page too, in the same position -- straight after the opening
            story -- with this page's own four figures. */}
        <ResultStats id="results" label="Results" stats={c.resultStats} />

        {/* Seven bullets that are really seven parts of one account: structure
            holding the campaigns, creative feeding them, an outside account
            joined at a seam, the audience they all sit inside, tracking
            underneath, the catalogue in the feed, and reporting to one side
            reconciling two sets of figures. The client's sentences are the
            legend; nothing on the drawing is labelled. */}
        <RunningAccount
          id="run"
          label="What We Run"
          index="01"
          title={c.run.title}
          strokeTitle={c.run.strokeTitle}
          items={c.run.items}
        />

        {/* The page's centrepiece. Three things bought separately, drawn as three
            lines converging on one post — and the post does not change when the
            budget arrives, because that is exactly what the format is. */}
        <SparkJoin
          id="spark"
          label="Spark Ads: The Format Most Brands Miss"
          index="02"
          title={c.spark.title}
          strokeTitle={c.spark.strokeTitle}
          definition={c.spark.definition}
          definitionMark={c.spark.definitionMark}
          why={c.spark.why}
          whyMark={c.spark.whyMark}
          connectsLead={c.spark.connectsLead}
          sources={c.spark.sources}
          conclusion={c.spark.conclusion}
          conclusionMark={c.spark.conclusionMark}
          permit={c.spark.permit}
        />

        {/* The five stages as five states of one bed of creative: tracking laid
            before the gate opens, a batch loaded, the early figures moving a
            great deal, budget shifting while fatigued ads are pulled and
            replaced, and then an edge that never closes. */}
        <CreativeRhythm
          id="process"
          label="How TikTok Ads Management Works"
          index="03"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
        />

        {/* Who should not run it. Four, in the enclosure the Snapchat page
            established for exactly this content shape. This document ends the
            section with a call to action rather than a threshold, so the band
            carries no rule and the CTA it does end on is the growth band
            immediately below, which is where the document puts it. */}
        <section
          id="not-for"
          data-section="Who Should Not Run TikTok Ads"
          className="relative overflow-x-clip py-16 sm:py-20"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.notFor.title}
              strokeTitle={c.notFor.strokeTitle}
              className="mb-12"
            />

            <ExclusionBand items={c.notFor.items} />
          </Container>
        </section>

        {/* The band the document's mid-page CTA belongs to. Its button is that
            CTA verbatim; the heading and the support line are the page's only
            copy the client has not written, and the content file says so. */}
        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
        />

        <Work index="05" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="Find Out Whether TikTok Suits Your Brand"
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

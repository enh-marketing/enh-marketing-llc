"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/industries/ecommerce-retail";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { ServiceHero } from "@/components/service/ServiceHero";
import { DemandLeak } from "@/components/service/DemandLeak";
import { TwoJourneys } from "@/components/service/TwoJourneys";
import { DemandShift } from "@/components/service/DemandShift";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { ProofRuns } from "@/components/service/ProofRuns";
import { LifecycleLoop } from "@/components/service/LifecycleLoop";
import { MeasureBank } from "@/components/service/MeasureBank";
import { PlatformFloor } from "@/components/service/PlatformFloor";
import { SectorField } from "@/components/service/SectorField";
import { ReasonLedger } from "@/components/service/ReasonLedger";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/industries/ecommerce-retail";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

/** Ecommerce & Retail — the first page under Industries.
 *
 *  NO RESULTS BAND ON THIS PAGE, and that is deliberate. The four-figure
 *  ResultStats band exists on the performance pages because their documents
 *  supply headline numbers and no results section to put them in. This
 *  document is the opposite: it has a results section of its own with three
 *  engagements and eight real figures in the prose. Lifting four of them into a
 *  band above would print the same digits twice on one page and flatten three
 *  different kinds of measure — a keyword count, a conversion count and a
 *  multiple — into one shape. So the figures stay in the client's sentences and
 *  ProofRuns draws each run's own quantity beside the sentence that states it.
 *
 *  NO MID-PAGE CTA BAND EITHER. This document writes exactly two calls to
 *  action, both in the banner, and two more in its closing block. GrowthCta
 *  needs a heading, a support line and a button label, none of which is in the
 *  file, so it is absent rather than filled in with invented microcopy. The
 *  sticky bar and the hero's own two doors carry the middle of the page. */
export function EcommerceRetailPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        {/* The hero visual is the document's first two sentences, drawn: the
            demand a store already has, the three places it is lost, and the two
            different things it can end as. */}
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
          visual={<DemandLeak key="leak" label={c.opening.lead} />}
        />

        {/* The opening argument, and the page's second idea: the run has two
            endings, and the document is explicit that they are not the same
            conversion. The two openers of its own sentence redraw the track. */}
        <TwoJourneys
          id="revenue"
          label="Turn Ecommerce Demand Into Revenue"
          index="01"
          title={c.opening.title}
          strokeTitle={c.opening.strokeTitle}
          lead={c.opening.lead}
          causes={c.opening.causes}
          causesMark={c.opening.causesMark}
          connects={c.opening.connects}
          connectsMark={c.opening.connectsMark}
          journeys={c.opening.journeys}
          journeyKeys={c.opening.journeyKeys}
        />

        {/* Six statements, each of which describes something moving, so the
            section builds one picture of the market a piece at a time rather
            than listing them. */}
        <DemandShift
          id="shift"
          label="What Is Changing in Ecommerce Across the UAE"
          index="02"
          title={c.shift.title}
          strokeTitle={c.shift.strokeTitle}
          lead={c.shift.lead}
          intro={c.shift.intro}
          items={c.shift.items}
          tail={c.shift.tail}
          tailMark={c.shift.tailMark}
        />

        {/* Six services, and every one of them is a different part of the same
            store. The pins stand where each service works, so choosing a
            service and pointing at the thing it changes are one gesture. */}
        <PinnedExplorer
          id="services"
          label="Our Ecommerce Digital Marketing Services"
          index="03"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items.map((s) => ({ no: s.no, title: s.title, body: s.body }))}
          diagram={{ kind: "commerce" }}
          diagramSide="right"
        />

        {/* Three engagements, each with the one quantity its own sentence
            states, at the ratio the document states it. */}
        <ProofRuns
          id="results"
          label="What Results Has This Approach Produced"
          index="04"
          title={c.results.title}
          strokeTitle={c.results.strokeTitle}
          runs={c.results.runs}
          caveat={c.results.caveat}
        />

        {/* Six stages that come back round. Drawn as a spiral rather than a
            ladder, because Stage 6 returns to Stage 1 further out. */}
        <LifecycleLoop
          id="process"
          label="How Our Ecommerce Marketing Process Works"
          index="05"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
        />

        {/* The document's own reporting table, kept as a table's worth of data
            with its own column headers: ten measures on one panel, and the
            reading of whichever one you are looking at. */}
        <MeasureBank
          id="measure"
          label="What Do We Measure"
          index="06"
          title={c.measure.title}
          strokeTitle={c.measure.strokeTitle}
          lead={c.measure.lead}
          rows={c.measure.rows}
          headTrack={c.measure.headTrack}
          headTells={c.measure.headTells}
          note={c.measure.note}
          noteMark={c.measure.noteMark}
        />

        {/* Eleven tools in the floor, and the four things the closing sentence
            says decide whether any of them carries weight. */}
        <PlatformFloor
          id="platforms"
          label="Ecommerce Platforms and Marketing Tools"
          index="07"
          title={c.platforms.title}
          strokeTitle={c.platforms.strokeTitle}
          lead={c.platforms.lead}
          items={c.platforms.items}
          verdict={c.platforms.verdict}
          verdictMark={c.platforms.verdictMark}
        />

        {/* Eight kinds of business and nothing else known about any of them, so
            the field earns its place through how it behaves rather than through
            copy that does not exist. The four steps the closing sentence names
            are marked where they stand. */}
        <SectorField
          id="audience"
          label="Who Do We Work With"
          index="08"
          title={c.audience.title}
          strokeTitle={c.audience.strokeTitle}
          items={c.audience.items}
          aside={<p className="statement text-balance text-snow">{c.audience.lead}</p>}
          tail={
            <p className="max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-fog sm:text-lg">
              <Marked
                text={c.audience.tail}
                mark={c.audience.tailMark}
                className="font-semibold text-snow"
              />
            </p>
          }
        />

        {/* Eight positions, set as claims rather than as cards: each is a
            single assertion and the document writes them as a flat run. */}
        <section
          id="why"
          data-section="Why Choose ENH Marketing for Ecommerce"
          className="relative overflow-x-clip py-16 sm:py-20"
        >
          <Container className="relative">
            <SectionHeader
              index="09"
              title={c.why.title}
              strokeTitle={c.why.strokeTitle}
              aside={<p className="statement text-balance text-snow">{c.why.lead}</p>}
              className="mb-14"
            />
            <ReasonLedger lead={c.why.opening} items={c.why.items} tail={c.why.tail} />
          </Container>
        </section>

        <Work index="10" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="11" faqs={c.faqs} />

        <CtaBand
          label="Tell Us Where Your Ecommerce Business Needs to Grow"
          index="12"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="13" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

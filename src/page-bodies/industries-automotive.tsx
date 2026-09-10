"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/industries/automotive";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ArrivalLanes } from "@/components/service/ArrivalLanes";
import { SalesAndService } from "@/components/service/SalesAndService";
import { ClockGap } from "@/components/service/ClockGap";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { FaultRegister } from "@/components/service/FaultRegister";
import { DealerRun } from "@/components/service/DealerRun";
import { WorkshopLocal } from "@/components/service/WorkshopLocal";
import { StageBay } from "@/components/service/StageBay";
import { CampaignStructures } from "@/components/service/CampaignStructures";
import { RetrievalDesk } from "@/components/service/RetrievalDesk";
import { MeasureRegister } from "@/components/service/MeasureRegister";
import { ResultsBoard } from "@/components/service/ResultsBoard";
import { Caveat } from "@/components/service/Caveat";
import { PlateRegister } from "@/components/service/PlateRegister";
import { ReasonRun } from "@/components/service/ReasonRun";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/industries/automotive";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

/** Automotive — the third page under Industries.
 *
 *  WHAT THIS PAGE DOES NOT BORROW FROM ITS TWO SIBLINGS. Ecommerce & Retail is
 *  built on one route with three leaks and two exits; Hospitality & Hotels fans
 *  one arrival into six endings. Both are single-journey pages. This document
 *  is not: it says four separate times that its two customers are on opposite
 *  clocks and need different equipment, and it gives each of them a chapter of
 *  its own. So the shapes are new throughout — the banner draws two approaches
 *  of very different length arriving at one forecourt, the strategy section
 *  runs them side by side against one shared finish rather than rescaling an
 *  axis, the services are a gapless run of bays with every name legible at once
 *  instead of a pinned explorer or a pinned scroller, the process is one
 *  wordless floor plan with the reader's scroll moving the job along it, and
 *  the two business chapters are deliberately unlike each other: a junction
 *  with a rejected branch for the dealership, a branch record for the workshop.
 *
 *  THE DIAGNOSTIC TABLE IS THIS DOCUMENT'S ALONE. Neither sibling has a
 *  "what is preventing this" section, and this one has seven rows of symptom,
 *  cause and remedy. It gets the page's only notation — a broken line between
 *  the symptom and its cause, whole between the cause and the fix — and the
 *  hover closes the break, which is the section's argument performed.
 *
 *  NO RESULTS BAND ABOVE THE FOLD. The four-figure ResultStats band exists for
 *  documents that supply headline numbers and no results section. This one has
 *  nine figures with a section of its own, three more repeated in its opening
 *  paragraph and two more in its PPC section — the client's own repetition,
 *  left alone rather than edited out. Lifting four into a band would print the
 *  same digits a fourth time.
 *
 *  NO MID-PAGE CTA BAND. The document writes two calls to action in its banner
 *  and two in its closing block, and nothing in between. GrowthCta needs a
 *  heading, a support line and a button label, none of which is in the file. */
export function AutomotivePage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        {/* The banner visual is the document's own two-sentence contrast,
            drawn: a long approach with four places it stops to compare, a slip
            road with one, and the same threshold at the end of both. */}
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
          visual={
            <ArrivalLanes
              key="lanes"
              label={`${c.strategy.journeys[0].who} ${c.strategy.journeys[0].rest}. ${c.strategy.journeys[1].who} ${c.strategy.journeys[1].rest}.`}
            />
          }
        />

        {/* The opening, set rather than drawn. Its content is a route and both
            siblings already draw one; the banner above it and the section below
            it carry this page's pictures. */}
        <SalesAndService
          id="sales"
          label="How Digital Marketing Support Automotive Sales and Service"
          index="01"
          title={c.opening.title}
          strokeTitle={c.opening.strokeTitle}
          lead={c.opening.lead}
          leadMark={c.opening.leadMark}
          actions={c.opening.actions}
          actionsMark={c.opening.actionsMark}
          journey={c.opening.journey}
          journeyStages={c.opening.journeyStages}
          figures={c.opening.figures}
          figuresMark={c.opening.figuresMark}
        />

        {/* The page's argument: two journeys, one finish line, four stops
            against one. Everything after this section is downstream of it. */}
        <ClockGap
          id="clocks"
          label="Why Automotive Marketing Needs Its Own Strategy"
          index="02"
          title={c.strategy.title}
          strokeTitle={c.strategy.strokeTitle}
          journeys={c.strategy.journeys}
          requiresStem={c.strategy.requiresStem}
          requiresItems={c.strategy.requiresItems}
          broad={c.strategy.broad}
          broadMark={c.strategy.broadMark}
          accountStem={c.strategy.accountStem}
          accountItems={c.strategy.accountItems}
        />

        {/* Six services, and every one of them works a different surface of the
            same presence. The pins stand where each service acts, so choosing a
            service and pointing at the thing it changes are one gesture. The
            drawing sits on the left here; the ecommerce industry page runs the
            same arrangement with its drawing on the right, so the two never
            read as the same section twice. */}
        <PinnedExplorer
          id="services"
          label="Our Automotive Digital Marketing Services"
          index="03"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items.map((s) => ({ no: s.no, title: s.title, body: s.body }))}
          diagram={{ kind: "dealership" }}
          diagramSide="left"
        />

        {/* The document's seven-row diagnosis, kept as three columns because a
            symptom, a cause and a remedy are three kinds of statement. */}
        <FaultRegister
          id="stops"
          label="What Prevents Automotive Marketing From Generating More Enquiries"
          index="04"
          title={c.stops.title}
          strokeTitle={c.stops.strokeTitle}
          headChallenge={c.stops.headChallenge}
          headHappening={c.stops.headHappening}
          headAttention={c.stops.headAttention}
          rows={c.stops.rows}
          verdict={c.stops.verdict}
          verdictMark={c.stops.verdictMark}
        />

        {/* The long clock: where a campaign should send people, and what
            happens to the ones who leave without enquiring. */}
        <DealerRun
          id="dealers"
          label="Digital Marketing for Car Dealerships and Automotive Brands"
          index="05"
          title={c.dealers.title}
          strokeTitle={c.dealers.strokeTitle}
          lead={c.dealers.lead}
          narrowing={c.dealers.narrowing}
          moves={c.dealers.moves}
          searchStem={c.dealers.searchStem}
          searchItems={c.dealers.searchItems}
          searchTail={c.dealers.searchTail}
          social={c.dealers.social}
          socialMark={c.dealers.socialMark}
        />

        {/* The short clock, and not a journey at all: a place that has to be
            described correctly, and the four things that says it was. */}
        <WorkshopLocal
          id="workshops"
          label="Digital Marketing for Auto Repair Shops and Service Centres"
          index="06"
          title={c.workshop.title}
          strokeTitle={c.workshop.strokeTitle}
          lead={c.workshop.lead}
          leadMark={c.workshop.leadMark}
          pageStem={c.workshop.pageStem}
          pageItems={c.workshop.pageItems}
          pageTail={c.workshop.pageTail}
          paid={c.workshop.paid}
          paidMark={c.workshop.paidMark}
          branchStem={c.workshop.branchStem}
          branchItems={c.workshop.branchItems}
          measuredStem={c.workshop.measuredStem}
          measuredItems={c.workshop.measuredItems}
        />

        {/* Six stages as one wordless floor, worked by the reader's scroll,
            with the six named once in the copy underneath. */}
        <StageBay
          id="process"
          label="How Our Automotive Marketing Process Works"
          index="07"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
        />

        {/* Eight things a campaign can be built around, and the one campaign
            the document gives two figures for. */}
        <CampaignStructures
          id="ppc"
          label="How Do Automotive PPC Campaigns Generate Qualified Leads"
          index="08"
          title={c.ppc.title}
          strokeTitle={c.ppc.strokeTitle}
          lead={c.ppc.lead}
          approach={c.ppc.approach}
          approachMark={c.ppc.approachMark}
          structuredStem={c.ppc.structuredStem}
          structures={c.ppc.structures}
          proof={c.ppc.proof}
          proofFigures={c.ppc.proofFigures}
          limit={c.ppc.limit}
          limitMark={c.ppc.limitMark}
        />

        {/* The qualified yes, with the qualification leading. */}
        <RetrievalDesk
          id="ai"
          label="Can Automotive Businesses Appear in AI Search Results"
          index="09"
          title={c.ai.title}
          strokeTitle={c.ai.strokeTitle}
          lead={c.ai.lead}
          leadMark={c.ai.leadMark}
          organiseStem={c.ai.organiseStem}
          organiseItems={c.ai.organiseItems}
          organiseTail={c.ai.organiseTail}
          consistency={c.ai.consistency}
          foundationStem={c.ai.foundationStem}
          foundationItems={c.ai.foundationItems}
        />

        {/* Eleven measures in two columns, because a reader is scanning for one
            of them rather than reading all eleven. */}
        <MeasureRegister
          id="measure"
          label="What We Measure"
          index="10"
          title={c.measure.title}
          strokeTitle={c.measure.strokeTitle}
          lead={c.measure.lead}
          headTrack={c.measure.headTrack}
          headTells={c.measure.headTells}
          rows={c.measure.rows}
          note={c.measure.note}
          noteMark={c.measure.noteMark}
        />

        {/* Nine figures and no axis: the document says in the next breath that
            they come from different businesses, periods and scopes. */}
        <ResultsBoard
          id="results"
          label="Automotive Campaign Results"
          index="11"
          title={c.results.title}
          strokeTitle={c.results.strokeTitle}
          lead={c.results.lead}
          items={c.results.items}
        />

        {/* And what those figures are not. The document's own sentences, in the
            band this site keeps for a limit. */}
        <Caveat
          id="caveat"
          label="Honest Caveat"
          lead={c.caveat.lead}
          emphasis={c.caveat.emphasis}
          commitment={c.caveat.commitment}
        />

        {/* Eight names, sized by their own words, and the page's thesis stated
            one last time underneath them. */}
        <PlateRegister
          id="audience"
          label="Who We Work With"
          index="12"
          title={c.audience.title}
          strokeTitle={c.audience.strokeTitle}
          lead={c.audience.lead}
          items={c.audience.items}
          note={c.audience.note}
          noteMark={c.audience.noteMark}
        />

        {/* Eight single assertions, with the specifics inside each one carrying
            the weight they were written with. */}
        <ReasonRun
          id="why"
          label="Why Choose ENH Marketing for Automotive Digital Marketing"
          index="13"
          title={c.why.title}
          strokeTitle={c.why.strokeTitle}
          lead={c.why.lead}
          leadMark={c.why.leadMark}
          items={c.why.items}
          itemMarks={c.why.itemMarks}
          tail={c.why.tail}
          tailMark={c.why.tailMark}
          scope={c.why.scope}
        />

        <Work index="14" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="15" faqs={c.faqs} />

        <CtaBand
          label="Tell Us What You Want to Generate More Enquiries For"
          index="16"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="17" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

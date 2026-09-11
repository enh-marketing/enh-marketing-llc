"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/industries/hospitality-hotels";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { GuestActions } from "@/components/service/GuestActions";
import { ClearerRoute } from "@/components/service/ClearerRoute";
import { DecisionSpread } from "@/components/service/DecisionSpread";
import { ChannelScroller } from "@/components/service/ChannelScroller";
import { BookingPathWork } from "@/components/service/BookingPathWork";
import { AnswerAssembly } from "@/components/service/AnswerAssembly";
import { ReportingDesk } from "@/components/service/ReportingDesk";
import { ResultsLadder } from "@/components/service/ResultsLadder";
import { Caveat } from "@/components/service/Caveat";
import { AudienceRegister } from "@/components/service/AudienceRegister";
import { StrategyRegister } from "@/components/service/StrategyRegister";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/hospitality-marketing-agency";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

/** Hospitality & Hotels — the second page under Industries.
 *
 *  WHAT THIS PAGE DELIBERATELY DOES NOT BORROW FROM ITS SIBLING. The ecommerce
 *  industry page is built on one route with three leaks and two exits, and its
 *  sections are a leaking duct, an accumulating market, a store diagram with
 *  pins, three engagement readouts, a spiral and a floor of pillars. None of
 *  those shapes is reused here, because this document's argument is a different
 *  one: there is no single checkout (six guest actions, five places they
 *  happen) and there is no single clock (a restaurant decision and a hotel
 *  decision are nowhere near the same length). So the hero fans instead of
 *  narrowing, the strategy section re-fits one scale rather than redrawing two
 *  tracks, the services run holds and travels sideways, the process holds one
 *  wide path at the top of the screen instead of beside it, and the results are
 *  plotted on decades rather than compared engagement by engagement.
 *
 *  NO RESULTS BAND. The four-figure ResultStats band exists for documents that
 *  supply headline numbers and no results section. This one has nine figures
 *  and a section of its own for them, plus three more in its opening paragraph
 *  — the client's own repetition, left alone rather than edited out. Lifting
 *  four into a band would print the same digits a third time.
 *
 *  NO MID-PAGE CTA BAND. The document writes two calls to action in its banner
 *  and two in its closing block, and nothing in between. GrowthCta needs a
 *  heading, a support line and a button label, none of which is in the file. */
export function HospitalityHotelsPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        {/* The hero visual is the document's second paragraph, drawn: interest
            arriving and opening into six different endings rather than
            narrowing into one. */}
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
          visual={<GuestActions key="actions" label={c.opening.actions} />}
        />

        {/* The opening. One route from discovery to a measurable action, with
            the five channels joining it rather than owning stretches of it. */}
        <ClearerRoute
          id="route"
          label="How Hospitality Digital Marketing Turns Interest Into Bookings"
          index="01"
          title={c.opening.title}
          strokeTitle={c.opening.strokeTitle}
          lead={c.opening.lead}
          actions={c.opening.actions}
          actionsMark={c.opening.actionsMark}
          connects={c.opening.connects}
          connectsMark={c.opening.connectsMark}
          figures={c.opening.figures}
          figuresMark={c.opening.figuresMark}
        />

        {/* The twelve things the source buries in one grey paragraph — seven
            the plan has to hold and five places the outcome can land — brought
            up to where they can be read, with the two decision profiles above
            them and the verdict under them. Two earlier versions drew this
            instead of structuring it. */}
        <DecisionSpread
          id="clocks"
          label="Why Hospitality Marketing Need Its Own Strategy"
          index="02"
          title={c.strategy.title}
          strokeTitle={c.strategy.strokeTitle}
          quick={c.strategy.quick}
          journeys={c.strategy.journeys}
          factorsStem={c.strategy.factorsStem}
          factorsItems={c.strategy.factorsItems}
          venuesStem={c.strategy.venuesStem}
          venuesItems={c.strategy.venuesItems}
          verdict={c.strategy.verdict}
          verdictMark={c.strategy.verdictMark}
        />

        {/* Six services, and every one of them works on something a guest
            actually looks at, so the run leads with that surface. Pinned: the
            section holds while the track travels, which is what gives each
            surface a full stage instead of a sixth of a grid row. */}
        <ChannelScroller
          id="services"
          label="Our Hospitality Digital Marketing Services"
          index="03"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          mark={{ variant: "ecosystem", label: "Six surfaces a guest sees" }}
          channels={c.services.items.map((s) => ({
            name: s.title,
            href: "",
            body: s.body,
            surface: s.surface,
          }))}
        />

        {/* Six stages, drawn as work done to one booking path. The break stays
            open until Stage 4, because Stage 4 is the stage that says friction
            is addressed before more traffic is sent. */}
        <BookingPathWork
          id="process"
          label="How Our Hospitality Marketing Process Works"
          index="04"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
        />

        {/* The six supports are switches, and they start on: taking one away
            scrambles its row of structure and costs the assistant a sixth of
            what it needs. The answer's edge stays dashed at every setting. */}
        <AnswerAssembly
          id="ai"
          label="Can Hospitality Brands Appear in AI Search Results"
          index="05"
          title={c.ai.title}
          strokeTitle={c.ai.strokeTitle}
          lead={c.ai.lead}
          supports={c.ai.supports}
          supportsMark={c.ai.supportsMark}
          foundations={c.ai.foundations}
          limit={c.ai.limit}
          limitMark={c.ai.limitMark}
        />

        {/* Twelve measures as one desk, and the document's own note as its two
            lenses: the restaurant and the hotel it names each push different
            channels up. That sentence was a footnote under a table. */}
        <ReportingDesk
          id="measure"
          label="What We Measure"
          index="06"
          title={c.measure.title}
          strokeTitle={c.measure.strokeTitle}
          lead={c.measure.lead}
          headTrack={c.measure.headTrack}
          headTells={c.measure.headTells}
          rows={c.measure.rows}
          note={c.measure.note}
        />

        {/* Nine figures spanning five orders of magnitude, on a scale that can
            hold both ends of that. */}
        <ResultsLadder
          id="results"
          label="Hospitality Campaign Results"
          index="07"
          title={c.results.title}
          strokeTitle={c.results.strokeTitle}
          lead={c.results.lead}
          items={c.results.items}
        />

        {/* And what those figures are not. The document's own three sentences,
            in the band this site keeps for a limit. */}
        <Caveat
          id="caveat"
          label="Honest Caveat"
          lead={c.caveat.lead}
          emphasis={c.caveat.emphasis}
          commitment={c.caveat.commitment}
        />

        {/* Eight names, numbered and scannable, because the only question a
            reader brings to this section is whether they are on the list. The
            note is the section's one claim, so it closes it at weight. */}
        <AudienceRegister
          id="audience"
          label="Who We Work With"
          index="08"
          title={c.audience.title}
          strokeTitle={c.audience.strokeTitle}
          lead={c.audience.lead}
          items={c.audience.items}
          note={c.audience.note}
          noteMark={c.audience.noteMark}
        />

        {/* Seven positions at a size you read rather than skim, with the list
            each one carries — five outcomes, four local surfaces, three
            channels — carrying weight where it stands. Those specifics are what
            a buyer is reading for and they were flat grey text in both earlier
            versions. */}
        <StrategyRegister
          id="why"
          label="Why Choose ENH Marketing for Hospitality Digital Marketing"
          index="09"
          title={c.why.title}
          strokeTitle={c.why.strokeTitle}
          lead={c.why.lead}
          leadMark={c.why.leadMark}
          items={c.why.items}
          itemMarks={c.why.itemMarks}
          tail={c.why.tail}
          tailMark={c.why.tailMark}
        />

        <Work index="10" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="11" faqs={c.faqs} />

        <CtaBand
          label="Tell Us Where You Need More Bookings"
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

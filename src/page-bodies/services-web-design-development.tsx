"use client";

import { brand, faqs as siteFaqs } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/web-design-development";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { LandingDrop } from "@/components/service/LandingDrop";
import { Narrative } from "@/components/service/Narrative";
import { ComparisonSheet } from "@/components/service/ComparisonSheet";
import { ChannelScroller } from "@/components/service/ChannelScroller";
import { ThreeQuestions } from "@/components/service/ThreeQuestions";
import { StageLadder } from "@/components/service/StageLadder";
import { RequirementChain } from "@/components/service/RequirementChain";
import { SectorChips } from "@/components/service/SectorChips";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/web-design-development";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function WebDesignDevelopmentPage() {
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
          visual={<LandingDrop key="drop" />}
        />

        <Narrative
          id="story"
          label="Give Every Click Somewhere Better to Land"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
          closing={c.narrative.closing}
        />

        {/* The tail is an instruction, not a summary: a reader mid-comparison
            "should look at what happens before the design starts and after the
            website goes live". So the section is a sheet they can take to the
            others -- six line items, our column filled, theirs left blank.
            See ComparisonSheet. */}
        <ComparisonSheet
          id="reasons"
          label="Why Choose ENH Marketing for Web Design in Dubai"
          index="02"
          title={c.reasons.title}
          strokeTitle={c.reasons.strokeTitle}
          lead={c.reasons.lead}
          ours={brand.name}
          items={c.reasons.items}
          tail={c.reasons.tail}
          tailMark={c.reasons.tailMark}
        />

        {/* Eight capabilities, run as the pinned horizontal track the paid
            pillar's channels use. Four of the eight are parts of a build rather
            than pages of their own, so their cards render in full and simply
            have nowhere to send you. See ChannelScroller. */}
        <ChannelScroller
          id="services"
          label="Web Design & Development Services We Offer"
          index="03"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          mark={{ variant: "ecosystem", label: "Eight capabilities, one build" }}
          channels={c.services.items.map((s) => ({
            name: s.title,
            href: s.href ?? "",
            body: s.body,
            glyph: s.glyph,
          }))}
        />

        {/* The house ladder: a panel that holds while the run moves past it, a
            rail that fills with the reader's own scroll, and the stage under
            the eye lit on it. This document numbers all seven stages, so none
            of them is the open-ended continuation the tail treatment is for. */}
        <StageLadder
          id="process"
          label="How Our Web Design and Development Process Works"
          index="04"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
          tail={false}
        />

        {/* The lead asks three questions -- where visitors come from, what they
            do, where the journey becomes difficult -- and every one of the nine
            rows answers exactly one of them. The lead is the layout.
            See ThreeQuestions. */}
        <ThreeQuestions
          id="measure"
          label="What We Measure"
          index="05"
          title={c.measure.title}
          strokeTitle={c.measure.strokeTitle}
          lead={c.measure.lead}
          questions={c.measure.questions}
          rows={c.measure.rows}
          headTells={c.measure.headTells}
          note={c.measure.note}
          noteMark={c.measure.noteMark}
        />

        {/* A purpose and three requirements derived from it, then what it
            costs when a page fails them, then the four levers. The argument the
            whole page rests on, given the only full-bleed band on it.
            See RequirementChain. */}
        <RequirementChain
          id="performance"
          label="Websites Optimised for Performance"
          index="06"
          title={c.performance.title}
          strokeTitle={c.performance.strokeTitle}
          goal={c.performance.goal}
          goalMark={c.performance.goalMark}
          needsLead={c.performance.needsLead}
          needs={c.performance.needs}
          warning={c.performance.warning}
          warningMark={c.performance.warningMark}
          body={c.performance.body}
          leversLead={c.performance.leversLead}
          levers={c.performance.levers}
          connected={c.performance.connected}
        />

        {/* Ten industries, each with what its website actually has to do, split
            at the document's own commas. See SectorChips. */}
        <SectorChips
          id="sectors"
          label="Websites Built for Different Industries"
          index="07"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          lead={c.sectors.lead}
          items={c.sectors.items}
          tail={c.sectors.tail}
        />

        {/* The house mid-page CTA, in the position every other service page
            puts it: after the argument, before the work. It carries the closing
            heading and the "send us" line, while the CtaBand at the foot takes
            the heading and the longer recommendation, so no sentence prints
            twice. */}
        <GrowthCta
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.body}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Work index="08" label="Our Work" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={siteFaqs} />

        <CtaBand
          label="Tell Us What the Website Needs to Do"
          index="10"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.note}
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

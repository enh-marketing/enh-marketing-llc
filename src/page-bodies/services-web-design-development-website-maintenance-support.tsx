"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/website-maintenance-support";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { DriftWatch } from "@/components/service/DriftWatch";
import { SilentFailures } from "@/components/service/SilentFailures";
import { MaintenanceRun } from "@/components/service/MaintenanceRun";
import { SupportCycle } from "@/components/service/SupportCycle";
import { ResponsibilityMap } from "@/components/service/ResponsibilityMap";
import { ProposalSheet } from "@/components/service/ProposalSheet";
import { WorkloadGauge } from "@/components/service/WorkloadGauge";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/web-design-development/website-maintenance-support";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

/** Website Maintenance & Support.
 *
 *  THE PAGE HAS ONE SUBJECT AND IT IS NOT REPAIRS. Six of the nine capability
 *  entries end by naming where the work stops. The comparison table exists to
 *  separate four neighbouring responsibilities. The proposal section exists so
 *  the reader gets "a clear support arrangement rather than an open-ended
 *  promise". The suitability section volunteers the case for buying less. So
 *  every drawing on this page is a boundary — what is inside the plan, what
 *  sits beyond it, and who holds which part — and the sections are ordered so
 *  the boundary is drawn tighter each time: the faults nobody sees, the nine
 *  covered areas with the break before the ninth, the loop the work actually
 *  runs in, the seams between four services, the document that states them, and
 *  finally whether the reader needs the arrangement at all.
 *
 *  NOT ONE FIGURE APPEARS ANYWHERE. The document contains no response time, no
 *  uptime, no hours and no price: all of them are deferred to the proposal. No
 *  section here draws a number, a status percentage or a score. */
export function WebsiteMaintenancePage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        {/* The hero visual is the document's second paragraph, drawn: a
            launched site whose components quietly fall out of currency, the
            check that finds one, and the pass that brings it back. Drift is
            invisible in a screenshot, which is why the hero is a loop. */}
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
          visual={<DriftWatch key="drift" />}
        />

        {/* The opening. Three faults named in one sentence, each drawn as the
            working interface it actually looks like, because the operative word
            in that sentence is "unnoticed". The sentence is the legend; nothing
            on the drawings is labelled. */}
        <SilentFailures
          id="story"
          label="Keep Your Website Working After Launch"
          index="01"
          title={c.opening.heading[0]}
          strokeTitle={c.opening.heading[1]}
          unfinished={c.opening.unfinished}
          handles={c.opening.handles}
          handlesMark={c.opening.handlesMark}
          arrangements={c.opening.arrangements}
          arrangementsMark={c.opening.arrangementsMark}
          buildUp={c.opening.buildUp}
          unnoticed={c.opening.unnoticed}
          faultsMark={c.opening.faultsMark}
          consequenceMark={c.opening.consequenceMark}
          team={c.opening.team}
          teamMark={c.opening.teamMark}
        />

        {/* Nine covered areas as one boundary rather than nine cards: a
            continuous line threading every station, each station drawn as the
            subsystem it governs, and the ninth standing outside a break in the
            line because the copy puts it outside the scope itself. */}
        <MaintenanceRun
          id="covers"
          label="What Our Website Maintenance Services Cover"
          index="02"
          title={c.covers.title}
          strokeTitle={c.covers.strokeTitle}
          items={c.covers.items}
        />

        {/* Six stages, and only three of them happen twice. Stage 3 ends
            "before routine maintenance begins", so the setup runs in on a line
            and the last three turn on a ring that never stops. */}
        <SupportCycle
          id="process"
          label="How Our Website Maintenance Process Works"
          index="03"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          items={c.process.items}
        />

        {/* "These services affect the same digital setup, but they cover
            different responsibilities." So the setup is drawn once and the
            document's own table points into it. */}
        <ResponsibilityMap
          id="boundaries"
          label="Website Maintenance, Web Hosting and Email Support"
          index="04"
          title={c.boundaries.title}
          strokeTitle={c.boundaries.strokeTitle}
          lede={c.boundaries.lede}
          columns={c.boundaries.columns}
          rows={c.boundaries.rows}
        />

        {/* Thirteen clauses written onto one sheet, against the empty one the
            document names as the alternative. */}
        <ProposalSheet
          id="proposal"
          label="What You Get From ENH Marketing"
          index="05"
          title={c.proposal.title}
          strokeTitle={c.proposal.strokeTitle}
          lead={c.proposal.lead}
          leadMark={c.proposal.leadMark}
          statesLead={c.proposal.statesLead}
          items={c.proposal.items}
          wider={c.proposal.wider}
          widerLinks={c.proposal.widerLinks}
          useful={c.proposal.useful}
          usefulMark={c.proposal.usefulMark}
        />

        {/* The one section that is a question about the reader's website rather
            than a statement about ours, so the reader answers it. */}
        <WorkloadGauge
          id="fit"
          label="When Ongoing Website Maintenance Makes Sense"
          index="06"
          title={c.fit.title}
          strokeTitle={c.fit.strokeTitle}
          lead={c.fit.lead}
          items={c.fit.items}
          caveat={c.fit.caveat}
          caveatMark={c.fit.caveatMark}
          recommend={c.fit.recommend}
          recommendMark={c.fit.recommendMark}
        />

        {/* The mid-page door, in the same band the other pages carry. The
            document gives one closing block, so this takes the sentence that
            asks the reader for something and the form band at the foot takes
            the one that says what we do with it. */}
        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        {/* This document supplies its own paragraph under "Our Work", which
            most do not, so it is printed above the carousel. */}
        <Work index="07" label="Summits Reached" ctaHref="#quote" lede={c.work.lede} />

        <FaqList label="FAQs" index="08" faqs={c.faqs} />

        <CtaBand
          label="Give Your Website the Support It Needs"
          index="09"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="10" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

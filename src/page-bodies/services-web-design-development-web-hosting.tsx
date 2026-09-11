"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/web-hosting";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { GroundSection } from "@/components/service/GroundSection";
import { PlateHatch } from "@/components/service/HostingPlate";
import { FittedEnvironment } from "@/components/service/FittedEnvironment";
import { HostingWorks } from "@/components/service/HostingWorks";
import { SeparateScopes } from "@/components/service/SeparateScopes";
import { DemandProfiles } from "@/components/service/DemandProfiles";
import { HeldMove } from "@/components/service/HeldMove";
import { HostingRecord } from "@/components/service/HostingRecord";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/web-hosting-services";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

/** Web Hosting Services.
 *
 *  THE PAGE HAS ONE SUBJECT AND IT IS THE GROUND UNDER THE WEBSITE. Every
 *  section is a different read of the same section drawing: what the layer is,
 *  what it carries, where it stops, and which layer a problem is actually in.
 *  The document supports that reading in four separate places, so it is the
 *  document's idea rather than a decoration laid over it: hosting decides "how
 *  quickly your website loads, how reliably it stays available and how well it
 *  handles visitors when traffic increases"; the environment is configured
 *  around the site "rather than placing every project onto the same standard
 *  package"; monitoring investigates whether a fault "comes from the hosting
 *  environment, website, domain configuration or an external service"; and the
 *  closing block promises to say so when "the issue comes from the website
 *  itself rather than the server".
 *
 *  THE SIBLING PAGE IS THE THING TO AVOID, NOT TO MATCH. Website Maintenance &
 *  Support has almost the same document shape: a capability list, a five-row
 *  comparison table, a suitability list and a proposal list. So none of its
 *  arrangements appear here. Its capability run is a threaded boundary; this
 *  page's is the house card at seven widths with a drawing per entry. Its table
 *  lights regions of one setup; this page's table ties five separate artefacts
 *  into one proposal. Its suitability section is a dial the reader ticks; this
 *  page's is a migration that has not happened. Its proposal section is one
 *  sheet against an empty one; this page's is one record sorted by the three
 *  questions its own closing sentence names.
 *
 *  NOT ONE FIGURE APPEARS ANYWHERE, AND THERE IS NO RESULTS BAND. This document
 *  contains no uptime, no response time, no storage allowance, no retention
 *  period and no price: every one is deferred to the proposal. The maintenance
 *  and ecommerce pages carry a four-figure ResultStats band, but those figures
 *  were supplied by the team for those pages. Inventing four for this one would
 *  be four fabrications on a page whose whole register is caution, so the band
 *  is left off until the team supplies hosting figures of its own. */
export function WebHostingPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      {/* The ground hatch, defined once for every plate on the page. */}
      <PlateHatch />

      <main>
        {/* The hero visual is the page's thesis rather than an illustration of
            the banner's noun list: the site on the surface, the work happening
            underneath it where a visitor never sees it, which is what "without
            managing the server" means. */}
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
          visual={<GroundSection key="ground" />}
        />

        {/* The opening argument, which is a fit rather than a feature: one
            fixed package, and three named changes that stop fitting it. The
            client's own sentence is the control. */}
        <FittedEnvironment
          id="story"
          label="Keep Your Website Running Without Managing the Server"
          index="01"
          title={c.opening.heading[0]}
          strokeTitle={c.opening.heading[1]}
          affects={c.opening.affects}
          affectsMark={c.opening.affectsMark}
          basic={c.opening.basic}
          change={c.opening.change}
          changeMark={c.opening.changeMark}
          review={c.opening.review}
          reviewMark={c.opening.reviewMark}
          beyond={c.opening.beyond}
          beyondMark={c.opening.beyondMark}
        />

        {/* Seven covered areas, seven drawings, seven widths. Every service
            name is legible at once and nothing is behind a pin. */}
        <HostingWorks
          id="covers"
          label="What Our Managed Website Hosting Covers"
          index="02"
          title={c.covers.title}
          strokeTitle={c.covers.strokeTitle}
          items={c.covers.items}
        />

        {/* "Hosting, website maintenance and domain management are connected,
            but they are not the same service." Five separate artefacts, and the
            one thing the document says the reader can ask for: combining
            them. */}
        <SeparateScopes
          id="scopes"
          label="What Hosting Covers and What Sits Outside It"
          index="03"
          title={c.scopes.title}
          strokeTitle={c.scopes.strokeTitle}
          lede={c.scopes.lede}
          columns={c.scopes.columns}
          rows={c.scopes.rows}
          combine={c.scopes.combine}
          states={c.scopes.states}
          statesMark={c.scopes.statesMark}
          anchor={c.scopes.anchor}
        />

        {/* The document draws this section itself: four kinds of website, one
            demand each. A claim about variation, so the section varies. */}
        <DemandProfiles
          id="wider"
          label="Hosting That Supports Your Wider Digital Work"
          index="04"
          title={c.wider.title}
          strokeTitle={c.wider.strokeTitle}
          lede={c.wider.lede}
          demands={c.wider.demands}
          considerLead={c.wider.considerLead}
          consider={c.wider.consider}
          limit={c.wider.limit}
          limitMark={c.wider.limitMark}
          scoped={c.wider.scoped}
        />

        {/* The mid-page door, in the band the other pages carry. The document
            supplies one closing block, so this takes its heading and the
            sentence that asks the reader for something; the form band at the
            foot takes the sentence saying what we do with it. */}
        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.growthCta.button}
        />

        {/* Eight situations, and the paragraph that is the real argument: a
            hosting company saying the answer may be to change nothing. */}
        <HeldMove
          id="fit"
          label="When Managed Hosting Makes Sense"
          index="05"
          title={c.fit.title}
          strokeTitle={c.fit.strokeTitle}
          lead={c.fit.lead}
          items={c.fit.items}
          review={c.fit.review}
          finding={c.fit.finding}
          findingMark={c.fit.findingMark}
        />

        {/* Twelve clauses, sorted by the three questions the document's own
            closing sentence says the record answers, with that sentence printed
            above them as the sort's source. */}
        <HostingRecord
          id="proposal"
          label="What You Get From ENH Marketing"
          index="06"
          title={c.proposal.title}
          strokeTitle={c.proposal.strokeTitle}
          lead={c.proposal.lead}
          leadMark={c.proposal.leadMark}
          statesLead={c.proposal.statesLead}
          items={c.proposal.items}
          record={c.proposal.record}
          recordMark={c.proposal.recordMark}
        />

        {/* This document supplies no paragraph of its own under "Our Work", so
            the carousel runs with the heading every other page gives it and
            nothing is invented to fill the lede. */}
        <Work index="07" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="08" faqs={c.faqs} />

        <CtaBand
          label="Talk to Our Web Team"
          index="09"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
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

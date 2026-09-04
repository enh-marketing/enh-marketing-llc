"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/event-video";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { RunOfShow } from "@/components/service/RunOfShow";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { CoveragePile } from "@/components/service/CoveragePile";
import { DeliverableFirst } from "@/components/service/DeliverableFirst";
import { VideoRoutes } from "@/components/service/VideoRoutes";
import { EventField } from "@/components/service/EventField";
import { ShowDay } from "@/components/service/ShowDay";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/video-marketing/event-video";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function EventVideoPage() {
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
          secondaryHref={c.hero.secondaryHref}
          phoneHref={brand.phoneHref}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          footer={<TrustStrip key="trust" id="trust" compact />}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          visual={<RunOfShow key="ros" />}
        />

        {/* The opening: four things happening at once, and one camera. The five
            things settled in advance are marked inside the agency paragraph
            because the rest of the page is about settling them. */}
        <Narrative
          id="story"
          label="Plan the Coverage Before the Event Begins"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
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

        {/* Six occasions, each redrawing the same room. See VenueFloor for why
            this is a floor plan rather than a track. */}
        <PinnedExplorer
          id="events"
          label="The Events Businesses Usually Need Filmed"
          index="02"
          title={c.events.title}
          strokeTitle={c.events.strokeTitle}
          items={c.events.items.map((e) => ({
            no: e.no,
            title: e.title,
            body: e.body,
            glyph: e.glyph,
          }))}
          diagramSide="right"
          mark={{ variant: "contrast", label: "One room, six arrangements" }}
          diagram={{ kind: "venue" }}
        />

        {/* Six ways to cover the same day, in a pile you cannot see all of.
            The page's argument is that an event runs in parallel and a camera
            cannot, and a row states the opposite: in a row nothing is ever
            behind anything else. See CoveragePile. */}
        <CoveragePile
          id="coverage"
          label="What Event Video Coverage Can Include"
          index="03"
          title={c.coverage.title}
          strokeTitle={c.coverage.strokeTitle}
          items={c.coverage.items}
        />

        {/* THE PAGE'S ARGUMENT, run in the order the document argues it: the
            deliverables decide the shoot, three events want three different
            lists, four things move as a result, and one event can produce
            eight outputs. See DeliverableFirst. */}
        <DeliverableFirst
          id="plan"
          label="Decide the Deliverables Before Event Day"
          index="04"
          title={c.plan.title}
          strokeTitle={c.plan.strokeTitle}
          claim={c.plan.claim}
          cases={c.plan.cases}
          consequenceLead={c.plan.consequenceLead}
          affects={c.plan.affects}
          consequenceAlso={c.plan.consequenceAlso}
          outputsLead={c.plan.outputsLead}
          outputs={c.plan.outputs}
          outputsTail={c.plan.outputsTail}
        />

        {/* The lead is a map, not a paragraph: four kinds of video and where
            each one goes, each keeping its own verb. Ends on the limit the
            document puts on what can be measured. See VideoRoutes. */}
        <VideoRoutes
          id="distribution"
          label="Where Your Event Videos Can Be Used"
          index="05"
          title={c.distribution.title}
          strokeTitle={c.distribution.strokeTitle}
          routes={c.distribution.routes}
          supportLead={c.distribution.supportLead}
          supportUses={c.distribution.supportUses}
          supportTail={c.distribution.supportTail}
          measure={c.distribution.measure}
          measureMark={c.distribution.measureMark}
        />

        {/* The reader has one event and is scanning for it. Eleven occasions
            spread on a plane with no first and no last, each drawn as the
            occasion it is. See EventField. */}
        <EventField
          id="sectors"
          label="Events and Sectors We Cover"
          index="06"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          items={c.sectors.items}
        />

        {/* The lead says the scope is "more than arriving with a camera" and
            covers before, during and after. Arriving with a camera is the
            during -- a point, not a third of the line -- so the eight sit
            either side of it, each one drawn, with the split measured beside
            them. See ShowDay. */}
        <ShowDay
          id="promises"
          label="What You Get From ENH Marketing"
          index="07"
          title={c.promises.title}
          strokeTitle={c.promises.strokeTitle}
          lead={c.promises.lead}
          leadMark={c.promises.leadMark}
          eventLabel={c.promises.eventLabel}
          items={c.promises.items}
        />

        {/* The house mid-page CTA, in the position every other service page
            puts it: after the promises, before the work. It carries the closing
            heading and the "tell us" line, while the CtaBand at the foot takes
            the heading and the longer recommendation, so no sentence prints
            twice. */}
        <GrowthCta
          id="cta"
          label="Tell Us What the Event Needs"
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.body}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        {/* The hero's second button points here, because it says portfolio. */}
        <Work index="08" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Tell Us What the Event Needs"
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

"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/interview-video";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Crosslink } from "@/components/ui/Crosslink";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { TakeTwo } from "@/components/service/TakeTwo";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { EditTimeline } from "@/components/service/EditTimeline";
import { SupportingLayers } from "@/components/service/SupportingLayers";
import { VersionBranches } from "@/components/service/VersionBranches";
import { IndustryTrack } from "@/components/service/IndustryTrack";
import { PromiseRun } from "@/components/service/PromiseRun";
import { FaqList } from "@/components/service/FaqList";
import { GrowthCta } from "@/components/service/GrowthCta";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/video-marketing/interview-video";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function InterviewVideoPage() {
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
          visual={<TakeTwo key="takes" />}
        />

        <Narrative
          id="story"
          label="Help People Speak Clearly on Camera"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
          closing={c.narrative.closing}
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

        {/* Seven kinds of interview. The document's pointer to the testimonial
            page is rendered once beneath, as a real link. */}
        <PinnedExplorer
          id="types"
          label="The Interview Videos Businesses Usually Need"
          index="02"
          title={c.types.title}
          strokeTitle={c.types.strokeTitle}
          items={c.types.items.map((t) => ({
            no: t.no,
            title: t.title,
            body: t.body,
            glyph: t.glyph,
          }))}
          diagramSide="right"
          mark={{ variant: "ecosystem", label: "Seven conversations, one method" }}
          diagram={{ kind: "cycle" }}
        >
          <Rise delay={0.1} className="mt-10 border-t border-line pt-6">
            <p className="flex flex-wrap items-baseline gap-x-1.5 leading-relaxed text-fog">
              <span>{c.types.referenceLead}</span>
              <Crosslink href={c.types.referenceHref}>{c.types.referenceLabel}</Crosslink>
              <span>{c.types.referenceTail}</span>
            </p>
          </Rise>
        </PinnedExplorer>

        {/* THE PAGE'S ARGUMENT: the test a question has to pass. See
            StandaloneAnswer. */}
        <section
          id="natural"
          data-section="How We Help People Give Natural Answers"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.natural.title}
              strokeTitle={c.natural.strokeTitle}
              mark={{ variant: "contrast", label: "One session, and the cut that comes out of it" }}
              className="mb-12"
              aside={
                <Rise key="lead">
                  <p className="leading-relaxed text-fog sm:text-lg">{c.natural.opening}</p>
                </Rise>
              }
            />
            <Rise className="mb-10">
              <p className="max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
                {c.natural.prep}
              </p>
            </Rise>
            <EditTimeline
              test={c.natural.test}
              filming={c.natural.filming}
              job={c.natural.job}
            />
          </Container>
        </section>

        {/* What the edit needs besides the conversation. */}
        <section
          id="around"
          data-section="What Happens Around the Interview"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.around.title}
              strokeTitle={c.around.strokeTitle}
              className="mb-12"
            />
            <SupportingLayers
              lead={c.around.lead}
              itemsLead={c.around.itemsLead}
              items={c.around.items}
              tail={c.around.tail}
            />
          </Container>
        </section>

        {/* One session opening outwards. The component owns the section, as
            ContentLifespan and ClaimLedger do: the diagram and the header are
            one composition, not a widget dropped under a heading. */}
        <VersionBranches
          id="versions"
          label="One Interview Can Produce Several Videos"
          index="05"
          title={c.versions.title}
          strokeTitle={c.versions.strokeTitle}
          claim={c.versions.claim}
          consequence={c.versions.consequence}
          outputsLead={c.versions.outputsLead}
          outputs={c.versions.outputs}
          placesLead={c.versions.placesLead}
          places={c.versions.places}
          support={c.versions.support}
        />

        {/* Not an arrangement of eleven names -- a run that moves. The page's
            vertical scroll drives the sectors horizontally. See IndustryTrack. */}
        <IndustryTrack
          id="industries"
          label="Industries We Produce Interviews For"
          index="06"
          title={c.industries.title}
          strokeTitle={c.industries.strokeTitle}
          items={c.industries.items}
        />

        {/* The nine hung off the run they happen on, grouped by the three
            phases the document's own lead names. See PromiseRun. */}
        <PromiseRun
          id="promises"
          label="What You Get From ENH Marketing"
          index="07"
          title={c.promises.title}
          strokeTitle={c.promises.strokeTitle}
          lead={c.promises.lead}
          items={c.promises.items}
        />

        {/* The document's "Interview Videos We Have Produced" is a gate:
            "[Portfolio section using real, permissioned ENH interview work.]" */}
        {/* The house mid-page CTA, in the position every other service page
            puts it: after the promises, before the work. It carries the
            document's own closing block -- the heading and the "tell us" line
            -- while the CtaBand at the foot takes the heading and the longer
            recommendation, so no sentence appears twice. */}
        <GrowthCta
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.body}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Work index="08" label="Our Work" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Tell Us Who Needs to Be Interviewed"
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

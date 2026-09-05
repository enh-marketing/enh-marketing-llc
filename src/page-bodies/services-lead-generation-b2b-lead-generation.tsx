"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/b2b-lead-generation";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { AccountMatch } from "@/components/service/AccountMatch";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { ScopeRoute } from "@/components/service/ScopeRoute";
import { StageTravel } from "@/components/service/StageTravel";
import { SectorCases } from "@/components/service/SectorCases";
import { StageLadder } from "@/components/service/StageLadder";
import { CapabilityCarousel } from "@/components/service/CapabilityCarousel";
import { FaqList } from "@/components/service/FaqList";
import { GrowthCta } from "@/components/service/GrowthCta";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/lead-generation/b2b-lead-generation";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function B2BLeadGenerationPage() {
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
          visual={<AccountMatch key="match" />}
        />

        {/* The opening argument: a count that looked strong and a pipeline that
            did not. The document leads with the scenario rather than with a
            claim, so the scenario is the section. */}
        <Narrative
          id="story"
          label="Build a Pipeline Your Sales Team Can Work"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
          outro={[c.narrative.closing]}
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

        {/* What the service is, and the ten things a scope should state. The
            document writes that list as a specification -- "A clear B2B lead
            generation scope should state:" -- so it is set as one: a numbered
            column of requirements rather than prose or cards. Two columns on
            wide screens because ten single-line items in one column is a
            ladder nobody reads to the bottom of. */}
        {/* Read the ten in order and they are not a list, they are the route a
            campaign takes. Drawn as that route, in the document's own order, and
            built at the scale of the card runs elsewhere on the site: a mark at
            forty-eight pixels, a title at twenty-four. See ScopeRoute. */}
        <ScopeRoute
          id="scope"
          label="What Does a B2B Lead Generation Agency Actually Do?"
          index="02"
          title={c.scope.title}
          strokeTitle={c.scope.strokeTitle}
          lead={c.scope.lead}
          itemsLead={c.scope.itemsLead}
          items={c.scope.items}
          limitInside={c.scope.limitInside}
          limitOutside={c.scope.limitOutside}
          limitConditional={c.scope.limitConditional}
        />

        {/* Seven channels, one at a time. Not the leadsystem diagram: that one
            belongs to the Lead Generation pillar page and drawing it again here
            would make the child look like a reprint of its parent. */}
        <PinnedExplorer
          id="channels"
          label="The Channels We Use for B2B Lead Generation"
          index="03"
          title={c.channels.title}
          strokeTitle={c.channels.strokeTitle}
          items={c.channels.items.map((ch) => ({
            no: ch.no,
            title: ch.title,
            body: ch.body,
            glyph: ch.glyph,
          }))}
          diagramSide="right"
          mark={{ variant: "network", label: "Seven channels, one campaign" }}
          diagram={{ kind: "track", axis: ["Not looking", "Actively searching"] }}
        />

        {/* THE PAGE'S SPINE. The document's five-row table, redrawn as a chain
            that changes hands where the document says it does, and the sentence
            that gives it its point. See StageTravel. */}
        <section
          id="stages"
          data-section="Lead Stages Should Be Clear"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.stages.title}
              strokeTitle={c.stages.strokeTitle}
              mark={{ variant: "progression", label: "Five stages, three different outputs" }}
              className="mb-12"
            />

            <StageTravel
              columns={c.stages.columns}
              rows={c.stages.rows}
              verdict={c.stages.verdict}
              outputs={c.stages.outputs}
            />
          </Container>
        </section>

        {/* How the mix is chosen. Three short sentences, each naming a channel
            and the job it does, so they are set as three statements rather than
            a paragraph -- and the caveat that follows is what stops them
            reading as a fixed recipe. */}
        <section
          id="formula"
          data-section="Our Proven Formula for B2B Lead Generation in Dubai"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.formula.title}
              strokeTitle={c.formula.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="lead">
                  <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-snow">
                    {c.formula.lead}
                  </p>
                </Rise>
              }
            />

            <ul className="grid gap-x-10 gap-y-8 border-t border-line pt-9 lg:grid-cols-3">
              {c.formula.roles.map((r, i) => (
                <li key={r.channel}>
                  <Rise delay={0.08 * i}>
                    <p className="font-display display-xl font-extrabold uppercase leading-[0.95] text-brand">
                      {r.channel}
                    </p>
                    <p className="mt-3 leading-relaxed text-fog sm:text-lg">{r.role}</p>
                  </Rise>
                </li>
              ))}
            </ul>

            <Rise delay={0.2} className="mt-10 border-t border-line pt-8">
              <p className="max-w-4xl leading-relaxed text-snow sm:text-lg">
                {c.formula.depends}
              </p>
            </Rise>
          </Container>
        </section>

        {/* Eight steps. StageLadder scrolls them rather than showing all eight
            at once, which suits a run this long. */}
        <StageLadder
          id="process"
          label="How the Work Moves"
          index="06"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.items.map((s) => ({ no: s.no, title: s.title, body: s.body }))}
        />


        {/* Twelve sectors, and the two the document actually works through.
            The caveat matters more than the list, so it is not buried under
            it. See SectorCases. */}
        <SectorCases
          id="sectors"
          label="B2B Sectors We Generate Leads For"
          index="07"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          lead={c.sectors.lead}
          items={c.sectors.items}
          caveatLead={c.sectors.caveatLead}
          cases={c.sectors.cases}
        />

        {/* The commitments, on the run the site uses for capability sets. The
            document's own closing sentences sit under it: they belong to the
            set, not to any one card. */}
        <CapabilityCarousel
          id="promises"
          label="What You Get From ENH Marketing"
          index="08"
          title={c.promises.title}
          strokeTitle={c.promises.strokeTitle}
          items={c.promises.items}
          footer={
            <Rise className="grid gap-x-14 gap-y-6 border-t border-line pt-9 lg:grid-cols-2">
              <p className="leading-relaxed text-snow sm:text-lg">{c.promises.experience}</p>
              <p className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-extrabold uppercase leading-[1.2] text-snow">
                {c.promises.goal}
              </p>
            </Rise>
          }
        />

        {/* The mid-page ask. It takes the heading and the short line; the band
            at the foot of the page takes the longer recommendation, so no
            sentence prints twice. */}
        <GrowthCta
          id="cta"
          label="Put Better Opportunities Into the Pipeline"
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.body}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Work index="09" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="10" faqs={c.faqs} />

        <CtaBand
          label="Put Better Opportunities Into the Pipeline"
          index="11"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="12" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/ai-automation";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { AgentRun } from "@/components/service/AgentRun";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { DiagnosticSheet } from "@/components/service/DiagnosticSheet";
import { LaunchTrack } from "@/components/service/LaunchTrack";
import { ManagedWaypoints } from "@/components/service/ManagedWaypoints";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";
import { OperationsReach } from "@/components/service/OperationsReach";

/* Drives <Breadcrumbs href={HREF} />. This page is a subpage of the AI Hub,
   not of Services, so it lives at /ai-hub/ and the trail reads
   Home > AI Hub > AI & Automation. See sitemap.ts. */
const HREF = "/ai-hub/ai-automation";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function AiAutomationPage() {
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
          visual={<AgentRun key="agent-run" />}
        />

        {/* "What We Do". One paragraph, and the six kinds of work it enumerates
            are the six the services section then expands, so they are marked
            inside the decode rather than pulled out and listed twice. */}
        <Narrative
          id="what"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.question}
          questionEmphasis={c.narrative.questionEmphasis}
          body={c.narrative.body}
          highlight={c.narrative.highlight}
          outro={c.narrative.outro}
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

        {/* Seven services. The drawing is not a network of systems, because
            every one of these connects systems and every selection would light
            the same picture. What separates them is whether the work stops for
            a person, which the document states service by service, so that is
            what the diagram shows. See HandoverMap. */}
        <PinnedExplorer
          id="services"
          label="Our AI Automation Services"
          index="01"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items.map((s) => ({
            no: s.no,
            title: s.title,
            body: s.body,
            glyph: s.glyph,
          }))}
          tone="ink-2"
          diagramSide="right"
          mark={{ variant: "network", label: "Seven services, one boundary" }}
          diagram={{ kind: "handover", loop: c.services.items.map((s) => s.handover) }}
        />

        {/* The diagnostic, and the line it draws. This is the page's
            differentiator: an automation agency whose own scope document
            reports "processes that should remain manual" directly beneath
            "processes that are suitable for automation". See DiagnosticSheet. */}
        <section
          id="diagnostic"
          data-section="Every Project Starts With an Automation Diagnostic"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.diagnostic.title}
              strokeTitle={c.diagnostic.strokeTitle}
              mark={{ variant: "contrast", label: "Ten checks, one line drawn" }}
              className="mb-12"
            />

            <DiagnosticSheet
              lead={c.diagnostic.lead}
              coversLead={c.diagnostic.coversLead}
              observe={c.diagnostic.observe}
              verdict={c.diagnostic.verdict}
              proposal={c.diagnostic.proposal}
              terms={c.diagnostic.terms}
            />
          </Container>
        </section>

        {/* Six stages, split at the moment the automation goes live, because
            stage five is a threshold and stage six has no end. See
            LaunchTrack. */}
        {/* overflow-hidden rather than overflow-x-clip, and the track outside
            the Container: the run is full-bleed and the pin needs the section
            to clip its own overflow, which is how ChannelScroller is set up
            too. */}
        <section
          id="process"
          data-section="How the Automation Project Works"
          className="relative overflow-hidden py-14 sm:py-16"
        >
          <Container className="relative mb-14">
            <SectionHeader
              index="03"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              mark={{ variant: "progression", label: "Four to build, one to launch, one that continues" }}
            />
          </Container>

          <LaunchTrack items={c.process.items} launchAt={c.process.launchAt} />
        </section>

        {/* The managed service as a route plotted through its own duties. The
            seven waypoints are art-directed flow layout; their measured
            positions become a curve, and a signal runs that curve on scroll,
            calling at each duty in turn. See ManagedWaypoints. */}
        <section
          id="managed"
          data-section="Managed Monitoring and Support"
          className="relative overflow-x-clip py-20 sm:py-24"
        >
          {/* The section's own chapter treatment. Everything before this point
              on the page is either void or ink; this one is lifted to ink-2 and
              given a grid and a single wash so the run-after-launch reads as a
              different place, not another band. */}
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "88px 88px",
                maskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 76%)",
              }}
            />
            <div className="aurora-b absolute left-1/2 top-[8%] h-[30vw] w-[30vw] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[150px]" />
          </div>

          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.managed.title}
              strokeTitle={c.managed.strokeTitle}
              mark={{ variant: "ecosystem", label: "One round, seven calls" }}
              className="mb-16"
            />

            <ManagedWaypoints
              lead={c.managed.lead}
              coversLead={c.managed.coversLead}
              covers={c.managed.covers}
              glyphs={c.managed.glyphs}
              fee={c.managed.fee}
              outOfScope={c.managed.outOfScope}
            />
          </Container>
        </section>

        {/* Where the fifteen years actually buys something. Built around the
            one figure this page commits to, and deliberately the page's
            typographic breather: the two sections before it are a pinned
            horizontal run and a scroll-plotted motion path. See
            OperationsReach. */}
        <section
          id="operations"
          data-section="Automation for Marketing and Business Operations"
          className="relative overflow-x-clip py-20 sm:py-24"
        >
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <div
              className="absolute inset-0 opacity-[0.045]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "112px 112px",
                maskImage: "linear-gradient(180deg, black, transparent 82%)",
              }}
            />
            <div className="aurora-a absolute right-[-8%] top-[18%] h-[32vw] w-[32vw] rounded-full bg-brand/[0.06] blur-[160px]" />
          </div>

          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.operations.title}
              strokeTitle={c.operations.strokeTitle}
              mark={{ variant: "growth", label: "Fifteen years, three measures" }}
              className="mb-16"
            />

            <OperationsReach
              claim={c.operations.claim}
              proven={c.operations.proven}
              body={c.operations.body}
              criteriaLead={c.operations.criteriaLead}
              criteria={c.operations.criteria}
              criteriaTail={c.operations.criteriaTail}
            />
          </Container>
        </section>

        {/* The document places a CTA here, straight after the
            marketing-and-operations section, and again to close. This is the
            first of the two. */}
        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
        />

        {/* LAUNCH GATE. The document's "Builds We Have Delivered" section is an
            instruction, not content: "[Two or three named builds with the
            process automated, the hours removed and the outcome. GATE: if this
            section cannot be filled with real, permissioned examples, this page
            does not launch.]" No section is rendered for it, because case
            studies cannot be invented. See the header of
            content/services/ai-automation.ts. This page should not go live
            until the client supplies those builds. */}

        <Work index="06" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="07" faqs={c.faqs} />

        <CtaBand
          label="Book an Automation Diagnostic"
          index="08"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.hero.secondary}
        />

        <Insights index="09" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

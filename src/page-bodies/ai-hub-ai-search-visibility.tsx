"use client";

import { brand } from "@/lib/content";
import { routeExists } from "@/lib/sitemap";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/ai-search-visibility";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { SignalPath } from "@/components/service/SignalPath";
import { Narrative } from "@/components/service/Narrative";
import { VisibilityBookends } from "@/components/service/VisibilityBookends";
import { VisibilityMark } from "@/components/service/VisibilityMark";
import { SiteFork } from "@/components/service/SiteFork";
import { ReturnLadder } from "@/components/service/ReturnLadder";
import { MonthlyBoard } from "@/components/service/MonthlyBoard";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/* Drives <Breadcrumbs href={HREF} />. A subpage of the AI Hub, so the trail
   reads Home > AI Hub > AI Search Visibility. See sitemap.ts. */
const HREF = "/ai-hub/ai-search-visibility";
const FORM_TITLE = c.hero.primary;

/* "Run a Free Visibility Check". The client's destination is the contact page.
   Until that route is built the label goes to the closing form, whose copy is
   the free check in prose. See the header of the content file. */
const FREE_CHECK_HREF = routeExists("/contact") ? "/contact" : "#quote";

export function AiSearchVisibilityPage() {
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
          secondaryHref={FREE_CHECK_HREF}
          phoneHref={brand.phoneHref}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          footer={<TrustStrip key="trust" id="trust" compact />}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          visual={<SignalPath key="signal" stations={c.hero.stations} platforms={c.hero.platforms} />}
        />

        {/* "What We Do": the thesis as the question, the names this work goes
            by decoded beneath it, the scope as the outro. */}
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
              href={FREE_CHECK_HREF}
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-snow transition-colors duration-300 hover:border-brand hover:text-brand"
            >
              {c.narrative.secondary}
            </a>
          </Rise>
        </Narrative>

        {/* Seven services as bookends: two that measure, five that change
            things, and the two that measure either side. See VisibilityBookends. */}
        <section id="services" data-section="Our AI Search Visibility Services" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader
              index="01"
              title={c.services.title}
              strokeTitle={c.services.strokeTitle}
              markNode={<VisibilityMark variant="bookends" />}
              className="mb-12"
            />
            <VisibilityBookends items={c.services.items} />
          </Container>
        </section>

        {/* The fork the diagnostic ends on: improve the site, or scope a
            rebuild. See SiteFork. */}
        <section id="website" data-section="Website Changes and Development" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.website.title}
              strokeTitle={c.website.strokeTitle}
              markNode={<VisibilityMark variant="fork" />}
              className="mb-12"
            />
            <SiteFork lead={c.website.lead} body={c.website.body} link={c.website.link} branches={c.website.branches} diagnosticLabel={c.website.diagnosticLabel} />
          </Container>
        </section>

        {/* Five steps that return to the first. See ReturnLadder. */}
        <section id="process" data-section="How the Work Moves" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              markNode={<VisibilityMark variant="loop" />}
              className="mb-14"
            />
            <ReturnLadder items={c.process.items} returnLabel={c.process.returnLabel} />
          </Container>
        </section>

        {/* Nine duties on a monthly rhythm. See MonthlyBoard. Lifted to its own
            chapter treatment, as the managed section is on AI Automation. */}
        <section id="support" data-section="Ongoing AI Visibility Support" className="relative overflow-x-clip py-20 sm:py-24">
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
              title={c.support.title}
              strokeTitle={c.support.strokeTitle}
              markNode={<VisibilityMark variant="months" />}
              className="mb-12"
            />
            <MonthlyBoard lead={c.support.lead} items={c.support.items} scope={c.support.scope} />
          </Container>
        </section>

        {/* GATE. "AI Search Visibility Results" is an instruction in the source
            ("[Add real, permissioned examples ...]"), not content. Nothing is
            rendered for it and nothing is invented. Supply the examples and a
            section goes in. */}

        <Work index="05" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="Find Out How AI Search Systems See Your Brand"
          index="07"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          whatsappLabel={c.hero.secondary}
          secondaryHref={FREE_CHECK_HREF}
        />

        <Insights index="08" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/google-ads";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { ServiceHero } from "@/components/service/ServiceHero";
import { SpendSplit } from "@/components/service/SpendSplit";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { ClickCircuit } from "@/components/service/ClickCircuit";
import { AccountArchitecture } from "@/components/service/AccountArchitecture";
import { ResultsScrub } from "@/components/service/ResultsScrub";
import { AccessModel } from "@/components/service/AccessModel";
import { GrowthCta } from "@/components/service/GrowthCta";
import { SectorField } from "@/components/service/SectorField";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/performance-marketing/google-ads";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function GoogleAdsPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        {/* The hero visual is the document's first paragraph, drawn: a month of
            spend that reads as one flat total, then separated into the part
            producing customers and the part leaking. */}
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
          visual={<SpendSplit key="spend" label={c.opening.thesis} />}
        />

        {/* The opening. The document gives this stretch no heading of its own,
            so the section carries none and the thesis is the heading: the
            reporting does not separate the two. The six campaign types and the
            three commitments are marked inside their own sentences rather than
            lifted out into chips, which would print them on the page twice. */}
        <section
          id="story"
          data-section="The Reporting Does Not Separate the Two"
          className="relative overflow-x-clip py-16 sm:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(ellipse at 30% 0%, black, transparent 72%)",
            }}
          />
          <Container className="relative">
            <Rise>
              <p className="max-w-3xl text-base leading-relaxed text-fog sm:text-lg">
                {c.opening.statement}
              </p>
            </Rise>

            {/* The sentence the whole page is built on. */}
            <Rise delay={0.08} className="mt-8">
              <p className="font-display max-w-5xl text-[clamp(1.35rem,3vw,2.4rem)] font-extrabold uppercase leading-[1.1] text-snow">
                <Marked text={c.opening.thesis} mark={c.opening.thesisMark} className="text-brand" />
              </p>
            </Rise>

            <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16">
              <Rise delay={0.12}>
                <p className="leading-relaxed text-fog sm:text-lg">
                  <Marked
                    text={c.opening.manages}
                    mark={c.opening.managesMark}
                    className="font-semibold text-snow"
                  />
                </p>
              </Rise>
              <Rise delay={0.16} className="relative lg:pl-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 hidden h-[calc(100%-0.25rem)] w-px bg-line lg:block"
                />
                <p className="leading-relaxed text-fog sm:text-lg">
                  <Marked
                    text={c.opening.terms}
                    mark={c.opening.termsMark}
                    className="font-semibold text-snow"
                  />
                </p>
              </Rise>
            </div>
          </Container>
        </section>

        {/* The comparison on the same interaction the LinkedIn formats section
            uses, because the shape fits: eight criteria, one drawing, a panel
            per selection. The drawing is this page's own -- the buyer's path,
            with the stretch each channel works -- and the two readings ride as
            body and note under the document's own column headers, which is
            what those two props exist for. */}
        <PinnedExplorer
          id="start"
          label="Google Ads or Meta Ads"
          index="01"
          title={c.compare.title}
          strokeTitle={c.compare.strokeTitle}
          items={c.compare.rows.map((r, i) => ({
            no: String(i + 1).padStart(2, "0"),
            title: r.area,
            body: r.google,
            note: r.meta,
          }))}
          bodyLabel={c.compare.columns[0]}
          noteLabel={c.compare.columns[1]}
          tone="ink-2"
          diagramSide="right"
          diagram={{ kind: "intentpath" }}
        >
          <Rise delay={0.12} className="mt-10 border-t border-line pt-7">
            <p className="max-w-4xl leading-relaxed text-fog sm:text-lg">
              <Marked
                text={c.compare.verdict}
                mark={c.compare.verdictMark}
                className="font-semibold text-snow"
              />
            </p>
          </Rise>
        </PinnedExplorer>

        {/* One circuit, followed all the way and back: the click leaves the
            account, crosses the line bidding cannot reach past, meets the five
            gates the document names, becomes an enquiry or does not, and the
            result returns to set the price of the next click. The client's own
            sentence captions it; no gate is labelled twice. */}
        <ClickCircuit
          id="after-click"
          label="Clicks Are Coming In But Why Aren't the Leads"
          index="02"
          title={c.afterClick.title}
          strokeTitle={c.afterClick.strokeTitle}
          statement={c.afterClick.statement}
          symptom={c.afterClick.symptom}
          symptomStages={c.afterClick.symptomStages}
          auctionLead={c.afterClick.auctionLead}
          auction={c.afterClick.auction}
          auctionTail={c.afterClick.auctionTail}
          source={c.afterClick.source}
          conversation={c.afterClick.conversation}
          conversationMark={c.afterClick.conversationMark}
        />

        {/* The account's actual shape: the core largest, campaign types
            alongside it, measurement running underneath them all, and the
            destination beyond the account's edge. Pointing at either half
            raises the other. */}
        <AccountArchitecture
          id="manage"
          label="What We Manage"
          index="03"
          title={c.managed.title}
          strokeTitle={c.managed.strokeTitle}
          items={c.managed.items}
          youtube={c.managed.youtube}
          cta={c.managed.cta}
          ctaHref="#quote"
        />

        {/* Six principles, and every one of them is a separation. Set as a
            ledger where each row is split by a rule: the decision on the left,
            the reason for it on the right. */}
        <section
          id="build"
          data-section="How We Build the Account"
          className="relative overflow-x-clip py-16 sm:py-20"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.build.title}
              strokeTitle={c.build.strokeTitle}
              aside={<p className="statement text-balance text-snow">{c.build.lead}</p>}
              className="mb-12"
            />

            <ol className="border-t border-line">
              {c.build.items.map((item, i) => (
                <li key={item.no} className="group border-b border-line">
                  <Rise delay={(i % 3) * 0.05}>
                    <div className="grid gap-x-12 gap-y-3 py-7 lg:grid-cols-[auto_minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-baseline">
                      <span
                        aria-hidden
                        className="font-display shrink-0 text-[0.62rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none"
                      >
                        {item.no}
                      </span>
                      <h3 className="font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.16] text-snow">
                        {item.title}
                      </h3>
                      {/* The reason, across the rule. */}
                      <p className="relative leading-relaxed text-fog lg:pl-12">
                        <span
                          aria-hidden
                          className="absolute left-0 top-0 hidden h-full w-px bg-line transition-colors duration-500 group-hover:bg-brand/60 motion-reduce:transition-none lg:block"
                        />
                        {item.body}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Ownership, drawn as the thing that detaches: five layers that stay
            inside the client's account and the one layer that comes off.
            Pointing at a phrase in the client's sentence lights the layer it
            names, so the copy is the legend and no layer is labelled twice. */}
        <AccessModel
          id="ownership"
          label="Your Account Stays With You"
          index="05"
          title={c.ownership.title}
          strokeTitle={c.ownership.strokeTitle}
          opening={c.ownership.opening}
          remains={c.ownership.remains}
          remainsMark={c.ownership.remainsMark}
          whyLead={c.ownership.whyLead}
          why={c.ownership.why}
          whyMark={c.ownership.whyMark}
          warning={c.ownership.warning}
          warningMark={c.ownership.warningMark}
          cta={c.ownership.cta}
          ctaHref="#quote"
        />

        {/* Two rates you can scrub across the client's own weeks. It rests at
            the mature end, so the divergence reads before anything is touched
            and scrubbing travels backwards through the early weeks. */}
        <ResultsScrub
          id="results"
          label="When Will You Start Seeing Results"
          index="06"
          title={c.results.title}
          strokeTitle={c.results.strokeTitle}
          statement={c.results.statement}
          phases={c.results.phases}
          caveat={c.results.caveat}
          caveatMark={c.results.caveatMark}
        />

        {/* Eleven names and nothing else is known about them, so the section
            earns its place through how they behave rather than what they say:
            a field that is completely still until a pointer enters it, then
            responds to where that pointer actually is. */}
        <SectorField
          id="industries"
          label="Industries We Run Google Ads For"
          index="07"
          title={c.industries.title}
          strokeTitle={c.industries.strokeTitle}
          items={c.industries.items}
        />

        {/* The same growth CTA the other performance pages carry. The document
            supplies one CTA block, so this takes its heading and its first
            door; the form band at the foot takes the second. */}
        <GrowthCta
          id="cta"
          label="Start With an Account Audit"
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.running}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.secondary}
        />

        <Work index="08" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Start With an Account Audit"
          index="10"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.scratch}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.secondary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.tertiary}
        />

        <Insights index="11" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/corporate-video";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Crosslink } from "@/components/ui/Crosslink";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { Viewfinder } from "@/components/service/Viewfinder";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { ShootPlan, ReachNote } from "@/components/service/ShootPlan";
import { IndustryRun } from "@/components/service/IndustryRun";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/video-marketing/corporate-video";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function CorporateVideoPage() {
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
          visual={<Viewfinder key="vf" />}
        />

        {/* The opening argument: a good film with no decision behind it. The
            seven formats the agency sentence names are marked inside it, since
            the section below expands exactly those. */}
        <Narrative
          id="story"
          label="Give Every Corporate Video a Clear Job"
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

        {/* Eight formats, one at a time. */}
        <PinnedExplorer
          id="formats"
          label="The Video Companies in Dubai Usually Need"
          index="02"
          title={c.formats.title}
          strokeTitle={c.formats.strokeTitle}
          items={c.formats.items.map((f) => ({
            no: f.no,
            title: f.title,
            body: f.body,
            glyph: f.glyph,
          }))}
          diagramSide="left"
          mark={{ variant: "ecosystem", label: "Eight formats, one production process" }}
          diagram={{ kind: "cycle" }}
        />

        {/* THE PAGE'S ARGUMENT. Distribution comes before the shoot, so it is
            drawn before the destinations: one shoot, the four frames it has to
            serve, then where each one goes. See ShootPlan. */}
        <section
          id="distribution"
          data-section="Where the Video Goes After Delivery"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.distribution.title}
              strokeTitle={c.distribution.strokeTitle}
              mark={{ variant: "progression", label: "One shoot, four frames, five destinations" }}
              className="mb-12"
            />

            <ShootPlan
              claim={c.distribution.claim}
              versionsLead={c.distribution.versionsLead}
              versions={c.distribution.versions}
              versionsTail={c.distribution.versionsTail}
              destinations={c.distribution.destinations}
            />

            {/* The one audience figure, kept with its qualifier. */}
            <Rise delay={0.12} className="mt-12">
              <ReachNote
                reach={c.distribution.reach}
                figure={c.distribution.reachFigure}
                caveat={c.distribution.reachCaveat}
              />
            </Rise>

            {/* The discoverability layer, and the page the document points at
                for it. That page is built, so it is a real link. */}
            <Rise delay={0.18} className="mt-10 border-t border-line pt-8">
              <p className="max-w-4xl leading-relaxed text-snow sm:text-lg">
                {c.distribution.discoveryLead}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {c.distribution.discoveryItems.map((item) => (
                  <li
                    key={item}
                    className="font-display rounded-lg border border-brand/45 bg-brand/[0.06] px-4 py-2 text-sm font-bold text-snow"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2 leading-relaxed text-fog">
                <Crosslink href={c.distribution.discoveryLink.href}>
                  {c.distribution.discoveryLink.label}
                </Crosslink>
                <span>{c.distribution.discoveryTail}</span>
              </p>
            </Rise>
          </Container>
        </section>

        <IndustryRun
          id="industries"
          label="Industries We Film For"
          index="04"
          title={c.industries.title}
          strokeTitle={c.industries.strokeTitle}
          items={c.industries.items.map((label) => ({ label }))}
        />

        <section
          id="promises"
          data-section="What You Get From ENH Marketing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.promises.title}
              strokeTitle={c.promises.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="lead">
                  <p className="leading-relaxed text-fog sm:text-lg">{c.promises.lead}</p>
                </Rise>
              }
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.promises.items.map((p, i) => (
                <SurfaceCard key={p.title} index={String(i + 1).padStart(2, "0")} delay={0.05 * i}>
                  <p className="font-display text-[1.05rem] font-extrabold uppercase leading-[1.2] text-snow">
                    {p.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{p.body}</p>
                </SurfaceCard>
              ))}
            </div>
          </Container>
        </section>

        {/* The document's "Corporate Videos We Have Produced" section is an
            instruction, not content: "[Portfolio section using existing,
            permissioned ENH work.]" Nothing is invented for it. This is the
            site's own Work section, which draws on real client entries. */}
        <Work index="06" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="07" faqs={c.faqs} />

        <CtaBand
          label="Tell Us What the Video Needs to Do"
          index="08"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="09" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

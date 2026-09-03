"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/explainer-video";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { SaidOnce } from "@/components/service/SaidOnce";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { ChangeWindow } from "@/components/service/ChangeWindow";
import { IndustryRun } from "@/components/service/IndustryRun";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/video-marketing/explainer-video";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function ExplainerVideoPage() {
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
          visual={<SaidOnce key="said" />}
        />

        {/* The opening runs in the document's order: the observation, the
            problem it creates, then the method. The last sentence of the agency
            paragraph is set at display scale because it states the method in
            one line and disappears inside a paragraph. */}
        <Narrative
          id="story"
          label="Make the Complicated Easier to Understand"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.problem}
          highlight={c.narrative.highlight}
          outro={[c.narrative.agency]}
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

        {/* Six formats, chosen by subject rather than preference. */}
        <PinnedExplorer
          id="formats"
          label="The Explainer Videos Businesses Use"
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
          mark={{ variant: "ecosystem", label: "Six formats, one decision" }}
          diagram={{ kind: "outputs" }}
        />

        {/* THE PAGE'S ARGUMENT. Six steps down a window that closes. See
            ChangeWindow. */}
        <section
          id="process"
          data-section="How the Production Process Moves"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              mark={{ variant: "progression", label: "Structure settled before the animation starts" }}
              className="mb-12"
            />
            <ChangeWindow items={c.process.items} gates={c.process.gates} />
          </Container>
        </section>

        {/* Six parts of the production, set as cards. Placed after the process
            because the process is what decides when each of them happens. */}
        <section
          id="craft"
          data-section="What Goes Into an Explainer Video"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.craft.title}
              strokeTitle={c.craft.strokeTitle}
              className="mb-12"
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.craft.items.map((item, i) => (
                <SurfaceCard
                  key={item.title}
                  index={String(i + 1).padStart(2, "0")}
                  delay={0.05 * i}
                >
                  <p className="font-display text-[1.05rem] font-extrabold uppercase leading-[1.2] text-snow">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{item.body}</p>
                </SurfaceCard>
              ))}
            </div>
          </Container>
        </section>

        {/* Distribution, which the document says is decided before production.
            Four placements, then the channels, then the discoverability note
            with the limit the document attaches to it. */}
        <section
          id="distribution"
          data-section="Where the Explainer Goes After Delivery"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.distribution.title}
              strokeTitle={c.distribution.strokeTitle}
              className="mb-12"
            />

            <Rise>
              <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {c.distribution.claim}
              </p>
            </Rise>

            {/* Four places, four different videos. Unnumbered: they are
                alternatives, not an order. */}
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.distribution.places.map((place, i) => (
                <Rise key={place} delay={0.05 * i} className="h-full">
                  <li className="flex h-full flex-col rounded-2xl border border-line bg-ink-3 p-6">
                    <span aria-hidden className="h-1 w-9 rounded-full bg-brand" />
                    <p className="mt-5 leading-relaxed text-snow">{place}</p>
                  </li>
                </Rise>
              ))}
            </ul>

            <div className="mt-12 grid gap-x-14 gap-y-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <Rise>
                <p className="leading-relaxed text-snow sm:text-lg">
                  {c.distribution.channelsLead}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {c.distribution.channels.map((ch) => (
                    <li
                      key={ch}
                      className="font-display rounded-lg border border-brand/45 bg-brand/[0.06] px-4 py-2 text-sm font-bold text-snow"
                    >
                      {ch}
                    </li>
                  ))}
                </ul>
              </Rise>

              <div className="space-y-6">
                <Rise delay={0.08}>
                  <p className="leading-relaxed text-snow sm:text-lg">
                    {c.distribution.discovery}
                  </p>
                  {/* The limit travels with the sentence it qualifies. */}
                  <p className="mt-4 flex gap-3 text-sm leading-relaxed text-ash">
                    <span aria-hidden className="mt-0.5 shrink-0 text-brand">
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
                      </svg>
                    </span>
                    <span>{c.distribution.discoveryCaveat}</span>
                  </p>
                </Rise>
                <Rise delay={0.14}>
                  <p className="border-l-2 border-brand pl-6 leading-relaxed text-fog">
                    {c.distribution.connected}
                  </p>
                </Rise>
              </div>
            </div>
          </Container>
        </section>

        <IndustryRun
          id="industries"
          label="Industries We Produce Explainer Videos For"
          index="06"
          title={c.industries.title}
          strokeTitle={c.industries.strokeTitle}
          note={c.industries.caveat}
          items={c.industries.items.map((label) => ({ label }))}
        />

        <section
          id="promises"
          data-section="What You Get From ENH Marketing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="07"
              title={c.promises.title}
              strokeTitle={c.promises.strokeTitle}
              className="mb-12"
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

        <Work index="08" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Tell Us What Needs Explaining"
          index="10"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
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

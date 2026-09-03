"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/tiktok-marketing";

import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ContentCycle } from "@/components/service/ContentCycle";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";
import { StageStair } from "@/components/service/StageStair";
import { SearchSurface } from "@/components/service/SearchSurface";
import { SuitabilityBlock } from "@/components/service/SuitabilityBlock";
import { ClaimWeights } from "@/components/service/ClaimWeights";

const HREF = "/services/social-media-marketing/tiktok-marketing";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function TikTokMarketingPage() {
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
          formSubmitLabel={c.narrative.primary}
          visual={<ContentCycle key="cycle" />}
        />

        {/* One polished video is not the job. The three things an account
            actually needs decode as three, because the document lists three. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.thesis}
          questionEmphasis={c.narrative.thesisEmphasis}
          bodyLead={`${c.narrative.blame} ${c.narrative.needsLead}`}
          body={c.narrative.needs}
          highlight={["ideas", "watching", "response"]}
          outro={[c.narrative.agency]}
          closing={c.narrative.closing}
        >
          <Rise delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
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

        {/* Seven services, drawn as the loop they run in. The document says the
            work "creates a steady cycle of filming, publishing and learning",
            and reporting feeds direction, so a rail with a finish would say the
            opposite of what it argues. */}
        <PinnedExplorer
          id="handle"
          label="What We Handle"
          index="01"
          title={c.handle.title}
          strokeTitle={c.handle.strokeTitle}
          items={c.handle.items}
          tone="ink-2"
          diagramSide="right"
          mark={{ variant: "ecosystem", label: "Seven services, one loop" }}
          aside={
            <Rise key="handle-lead">
              <p className="leading-relaxed text-fog sm:text-lg">{c.handle.lead}</p>
              <p className="mt-5 text-[0.62rem] font-semibold uppercase text-brand-text">
                {c.handle.ledeTail}
              </p>
            </Rise>
          }
          diagram={{ kind: "cycle" }}
        >
          <Rise delay={0.12} className="mt-10 border-t border-line pt-8">
            <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">{c.handle.connect}</p>
          </Rise>
        </PinnedExplorer>

        {/* Seven formats with four things said about each. The document supplies
            it as a four-column table and there is no reading of it that survives
            being turned into cards, so it stays a table. */}
        <section
          id="formats"
          data-section="Which TikTok Ad Format Fits the Job"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.formats.title}
              strokeTitle={c.formats.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="fmt-lead">
                  <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-snow">
                    {c.formats.lead}
                  </p>
                  <p className="mt-5 leading-relaxed text-fog">{c.formats.ledeTail}</p>
                </Rise>
              }
            />

            {/* Desktop: the table. */}
            <div className="hidden overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 lg:block">
              <table className="w-full border-collapse text-left align-top">
                <thead>
                  <tr>
                    {c.formats.columns.map((col, i) => (
                      <th
                        key={col}
                        scope="col"
                        className={cn(
                          "border-b border-line px-6 py-5 text-[0.6rem] font-semibold uppercase text-ash",
                          i === 0 ? "w-[19%]" : "border-l w-[27%]",
                        )}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.formats.items.map((f, i) => (
                    <tr key={f.no} className="group">
                      <th
                        scope="row"
                        className={cn(
                          "px-6 py-5 align-top",
                          i > 0 && "border-t border-line",
                        )}
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-display shrink-0 text-[0.6rem] font-bold tabular-nums text-brand-text">
                            {f.no}
                          </span>
                          <span className="font-display text-[clamp(0.95rem,1.6vw,1.15rem)] font-extrabold uppercase leading-[1.2] text-snow">
                            {f.name}
                          </span>
                        </span>
                      </th>
                      {[f.does, f.when, f.know].map((cell, k) => (
                        <td
                          key={k}
                          className={cn(
                            "border-l border-line px-6 py-5 align-top text-sm leading-relaxed",
                            i > 0 && "border-t",
                            k === 0 ? "text-snow" : k === 1 ? "text-fog" : "text-ash",
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Below the large breakpoint four columns stop being readable, so
                each format becomes a block asking the same three questions. */}
            <ol className="grid gap-4 lg:hidden">
              {c.formats.items.map((f, i) => (
                <li key={f.no}>
                  <Rise delay={(i % 3) * 0.05}>
                    <div className="rounded-2xl border border-line bg-ink-2 p-6">
                      <span className="font-display text-[0.6rem] font-bold tabular-nums text-brand-text">
                        {f.no}
                      </span>
                      <h3 className="font-display mt-3 text-base font-extrabold uppercase leading-[1.18] text-snow">
                        {f.name}
                      </h3>
                      <dl className="mt-5 space-y-4">
                        {([1, 2, 3] as const).map((k) => (
                          <div key={k}>
                            <dt className="text-[0.6rem] font-semibold uppercase text-ash">
                              {c.formats.columns[k]}
                            </dt>
                            <dd
                              className={cn(
                                "mt-1.5 text-sm leading-relaxed",
                                k === 1 ? "text-snow" : "text-fog",
                              )}
                            >
                              {k === 1 ? f.does : k === 2 ? f.when : f.know}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            <Rise delay={0.14} className="mt-9 border-t border-line pt-8">
              <p className="max-w-3xl leading-relaxed text-snow sm:text-lg">{c.formats.closing}</p>
              <p className="mt-5 text-sm leading-relaxed text-fog">{c.formats.reference}</p>
            </Rise>
          </Container>
        </section>

        {/* The posting rhythm, which is a refusal to name a number. The two
            accounts the document says should not share a schedule are set
            against each other, because that comparison is the argument. */}
        <section
          id="rhythm"
          data-section="A Posting Rhythm You Can Sustain"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.rhythm.title}
              strokeTitle={c.rhythm.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="notmore">
                  <p className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-brand">
                    {c.rhythm.notMore}
                  </p>
                  <p className="mt-5 leading-relaxed text-fog sm:text-lg">{c.rhythm.bothWays}</p>
                </Rise>
              }
            />

            <Rise>
              <p className="max-w-3xl leading-relaxed text-snow sm:text-lg">{c.rhythm.depends}</p>
            </Rise>

            {/* Two accounts that should not be forced into one schedule. */}
            <ol className="mt-8 grid gap-4 lg:grid-cols-2">
              {[c.rhythm.restaurant, c.rhythm.professional].map((line, i) => (
                <li key={line}>
                  <Rise delay={i * 0.08}>
                    <div
                      className={cn(
                        "h-full rounded-2xl border p-7 sm:p-8",
                        i === 0 ? "border-brand/40 bg-brand/[0.05]" : "border-line bg-ink-2",
                      )}
                    >
                      <p
                        className={cn(
                          "font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.18]",
                          i === 0 ? "text-snow" : "text-ash",
                        )}
                      >
                        {line}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            <Rise delay={0.14} className="mt-8">
              <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-brand">
                {c.rhythm.notSame}
              </p>
              <p className="mt-6 leading-relaxed text-fog sm:text-lg">{c.rhythm.agree}</p>
              <p className="mt-5 border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
                {c.rhythm.cycle}
              </p>
            </Rise>
          </Container>
        </section>

        {/* The five stages as a horizontal run rather than a vertical ladder:
            five short stages read across in one pass, and this page already
            spends its vertical rhythm on the loop above. */}
        <section
          id="stages"
          data-section="How the Work Moves"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.stages.title}
              strokeTitle={c.stages.strokeTitle}
              mark={{ variant: "progression", label: "Five stages, then round again" }}
              className="mb-10"
            />

            <StageStair items={c.stages.items} />

            <Rise delay={0.14} className="mt-8">
              <p className="border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
                {c.stages.aim}
              </p>
            </Rise>
          </Container>
        </section>

        {/* TikTok used as a search engine. The document opens with a specific
            scene, so the scene leads at scale and the six examples follow. */}
        <section
          id="search"
          data-section="People in Dubai Are Searching on TikTok Too"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            {/* No aside: the scene now opens SearchSurface at display scale,
                and carrying it here as well printed it twice. */}
            <SectionHeader
              index="05"
              title={c.search.title}
              strokeTitle={c.search.strokeTitle}
              mark={{ variant: "network", label: "A second place people look" }}
              className="mb-12"
            />

            <SearchSurface
              scene={c.search.scene}
              same={c.search.same}
              google={c.search.google}
              adds={c.search.adds}
              method={c.search.method}
              examplesLead={c.search.examplesLead}
              examples={c.search.examples}
              profile={c.search.profile}
              caveat={c.search.caveat}
            />

          </Container>
        </section>

        {/* Where it works, and the limits. Eight categories set as a run, then
            the three sentences that qualify them. */}
        <section
          id="works"
          data-section="Where TikTok Tends to Work Best"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            {/* No aside: the lead becomes the four criteria inside
                SuitabilityBlock, and ledeTail labels the run there. */}
            <SectionHeader
              index="06"
              title={c.works.title}
              strokeTitle={c.works.strokeTitle}
              mark={{ variant: "growth", label: "Four things people can do" }}
              className="mb-12"
            />

            <SuitabilityBlock
              lead={c.works.lead}
              ledeTail={c.works.ledeTail}
              items={c.works.items}
              limitOne={c.works.limitOne}
              limitTwo={c.works.limitTwo}
              limitThree={c.works.limitThree}
            />

          </Container>
        </section>

        {/* Six claims. Two are a bare statement in the source and are left that
            way rather than padded to match the others. */}
        <section
          id="why-enh"
          data-section="Why Choose ENH Marketing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="07"
              title={c.whyEnh.title}
              strokeTitle={c.whyEnh.strokeTitle}
              mark={{ variant: "contrast", label: "Six claims, one of them a refusal" }}
              className="mb-10"
            />

            <ClaimWeights items={c.whyEnh.items} />

            <Rise delay={0.14} className="mt-9">
              <a
                href="#quote"
                className="group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
              >
                {c.whyEnh.cta}
              </a>
            </Rise>
          </Container>
        </section>

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.primary}
        />

        <Work index="08" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="See Whether TikTok Fits Your Brand"
          index="10"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.narrative.secondary}
        />

        <Insights index="11" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

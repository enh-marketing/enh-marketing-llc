"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/interview-video";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Crosslink } from "@/components/ui/Crosslink";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { TakeTwo } from "@/components/service/TakeTwo";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { StandaloneAnswer } from "@/components/service/StandaloneAnswer";
import { IndustryRun } from "@/components/service/IndustryRun";
import { FaqList } from "@/components/service/FaqList";
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
              mark={{ variant: "contrast", label: "Take the question away and see what stands" }}
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
            <StandaloneAnswer
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
            <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <Rise>
                <p className="leading-relaxed text-snow sm:text-lg">{c.around.lead}</p>
                <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-ash">
                  {c.around.tail}
                </p>
              </Rise>
              <div>
                <Rise>
                  <p className="font-display text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.16] text-snow">
                    {c.around.itemsLead}
                  </p>
                </Rise>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {c.around.items.map((item, i) => (
                    <Rise key={item} delay={0.04 * i}>
                      <li className="group flex items-center gap-3 rounded-xl border border-line bg-ink-3 px-4 py-3 transition-colors duration-500 hover:border-brand/60">
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand transition-transform duration-500 group-hover:scale-150"
                        />
                        <span className="text-sm leading-snug text-snow">{item}</span>
                      </li>
                    </Rise>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section
          id="versions"
          data-section="One Interview Can Produce Several Videos"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.versions.title}
              strokeTitle={c.versions.strokeTitle}
              mark={{ variant: "progression", label: "Decided before the camera is set up" }}
              className="mb-12"
            />
            <Rise>
              <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {c.versions.claim}
              </p>
            </Rise>
            <div className="mt-10 grid gap-x-14 gap-y-6 lg:grid-cols-3">
              <Rise delay={0.06}>
                <p className="leading-relaxed text-snow">{c.versions.places}</p>
              </Rise>
              <Rise delay={0.12}>
                <p className="border-l-2 border-brand pl-6 leading-relaxed text-fog">
                  {c.versions.consequence}
                </p>
              </Rise>
              <Rise delay={0.18}>
                <p className="leading-relaxed text-ash">{c.versions.support}</p>
              </Rise>
            </div>
          </Container>
        </section>

        <IndustryRun
          id="industries"
          label="Industries We Produce Interviews For"
          index="06"
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
              index="07"
              title={c.promises.title}
              strokeTitle={c.promises.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="lead">
                  <p className="leading-relaxed text-fog sm:text-lg">{c.promises.lead}</p>
                </Rise>
              }
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* The document's "Interview Videos We Have Produced" is a gate:
            "[Portfolio section using real, permissioned ENH interview work.]" */}
        <Work index="08" label="Our Work" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Tell Us Who Needs to Be Interviewed"
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

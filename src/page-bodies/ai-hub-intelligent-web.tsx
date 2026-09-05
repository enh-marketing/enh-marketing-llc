"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/intelligent-web";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { PageSwap } from "@/components/service/PageSwap";
import { Narrative } from "@/components/service/Narrative";
import { SiteScreens } from "@/components/service/SiteScreens";
import { SiteAnatomy } from "@/components/service/SiteAnatomy";
import { SiteBuild } from "@/components/service/SiteBuild";
import { SiteWatch } from "@/components/service/SiteWatch";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/* Drives <Breadcrumbs href={HREF} />. A subpage of the AI Hub, so the trail
   reads Home > AI Hub > Intelligent Web. See sitemap.ts. */
const HREF = "/ai-hub/intelligent-web";
const FORM_TITLE = c.hero.primary;

export function IntelligentWebPage() {
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
          visual={<PageSwap key="swap" visitors={c.hero.visitors} />}
        />

        <Narrative
          id="story"
          label="What We Build"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.body}
          highlight={c.narrative.bodyEmphasis}
          outro={c.narrative.outro}
        />

        {/* Six services, each drawn as what it does to a website, held while
            the scroll moves through them. Every label on every screen is a
            verbatim clause of that service's own paragraph. */}
        <SiteScreens
          id="services"
          label="Our AI Website Development Services"
          index="01"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items}
          screens={c.services.screens}
        />

        {/* Six elements marked on one site, because that is what they are:
            properties of a website, and a website can simply be drawn. The
            seventh heading is set apart because it decides which you get. */}
        <SiteAnatomy
          id="elements"
          label="The Main Elements of an Intelligent Website"
          index="02"
          title={c.elements.title}
          strokeTitle={c.elements.strokeTitle}
          items={c.elements.items}
          depends={c.elements.depends}
        />

        {/* Five steps drawn as the five things they put in front of you, with
            the same site changing from the first frame to the last. The fork
            sits on the scope document, where the question is answered. */}
        <SiteBuild
          id="process"
          label="How the Project Works"
          index="03"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.items}
          forkAt={c.process.forkAt}
          fork={c.process.fork}
        />

        {/* The managed service, and the sentence about who updates content,
            which is the boundary of the fee rather than small print. */}
        <SiteWatch
          id="managed"
          label="Managed Monitoring and Support"
          index="04"
          title={c.managed.title}
          strokeTitle={c.managed.strokeTitle}
          lead={c.managed.lead}
          intro={c.managed.intro}
          items={c.managed.items}
          split={c.managed.split}
          closing={c.managed.closing}
        />

        {/* GATE. "Sites We Have Built" is an instruction in the source, not
            content: "[Real builds, with the intelligent element specified and
            its measured effect. GATE applies: if this cannot be filled with
            real, permissioned examples, the section comes off rather than being
            filled with generic claims.]" Nothing is rendered and nothing is
            invented. Supply approved builds and the section goes in here. */}

        {/* The house mid-page CTA. It takes the closing block's invitation; the
            CtaBand at the foot takes the recommendation, so no sentence prints
            twice. */}
        <GrowthCta
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.invite}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Work index="05" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="Book a Web Diagnostic"
          index="07"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Insights index="08" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

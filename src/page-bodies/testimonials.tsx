"use client";

import { brand } from "@/lib/content";
import * as c from "@/content/testimonials";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TestimonialHero } from "@/components/testimonials/TestimonialHero";
import { RecordRail } from "@/components/testimonials/RecordRail";
import { VoiceArchive } from "@/components/testimonials/VoiceArchive";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/testimonials";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

/** Testimonials.
 *
 *  CONTENT SOURCE. Everything on this page is the live enhmedia.com/testimonial
 *  page's own: eighteen testimonials, the names, the companies, the five-star
 *  rating, the client logos and the hero subheading. Nothing is reworded and
 *  nothing is added. See src/content/testimonials.ts for what is derived and
 *  how, and how each logo was paired with its client.
 *
 *  THREE SECTIONS, AND THE MIDDLE ONE IS THE PAGE. A hero whose right-hand half
 *  is a moving wall of real fragments, so the scale of the set is obvious
 *  before a single scroll; the eighteen as a card wall that can be filtered and
 *  opened in place; the ask.
 *
 *  THE ARGUMENT LIVES INSIDE THE WALL RATHER THAN IN A SECTION OF ITS OWN.
 *  Five of the eighteen say how long the client has worked with ENH, in their
 *  own sentence, unprompted: fifteen years, eight, four, two, and one start
 *  date. That is the only claim on the page nobody could have written on our
 *  behalf, so those five are the wide cards, with the years set at display
 *  scale beside the quote, interleaved one every fourth slot.
 *
 *  WHAT IS NOT HERE, AND WHY. No video: there is not one video asset on the
 *  source page or in this repository, and a testimonials page is the last place
 *  to imply one. No aggregate rating: every testimonial is five stars and that
 *  is shown, but no scale or review count is published, so nothing is averaged
 *  and the JSON-LD carries no reviewRating at all. No invented industries, no
 *  invented metrics, and no filter over a field the source does not have.
 *
 *  TWO OF THE EIGHTEEN CONTAIN TYPOS AS PUBLISHED and they are reproduced
 *  exactly. They are somebody else's words. They want fixing at the source. */
export function TestimonialsPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        <TestimonialHero
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          phoneHref={brand.phoneHref}
          rail={<RecordRail key="rail" />}
        />

        {/* All eighteen, as cards that open in place to their full text. */}
        <VoiceArchive id="archive" label="The Archive" />

        {/* The last chapter rather than a banner: the page has spent two
            sections on other people's words, and this is the ask that follows
            from it. */}
        <CtaBand
          label="Next Success Story"
          index={c.finalCta.index}
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.submitLabel}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.whatsappLabel}
        />
      </main>

      <StickyCTABar label={c.finalCta.submitLabel} />
    </>
  );
}

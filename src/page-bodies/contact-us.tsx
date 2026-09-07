"use client";

import { ContactHero } from "@/components/contact/ContactHero";
import { GrowthObjectives } from "@/components/contact/GrowthObjectives";
import { ConsultationForm } from "@/components/contact/ConsultationForm";
import { StudioMap } from "@/components/contact/StudioMap";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/** Contact Us.
 *
 *  THE LIVE PAGE'S OWN ORDER, PLUS A CLOSING PLATE. Headline and the four
 *  direct lines; what a conversation actually gives you; then the consultation
 *  form. That is the order enhmedia.com/contact-us already uses and the order a
 *  visitor decides in, so it is not rearranged. Everything about how it is set
 *  is this site's.
 *
 *  The map is the one section the live page does not have. It goes last because
 *  it is the only thing on the page nobody arrives needing: a visitor who wants
 *  to talk has had four ways to do it and a form before they reach it.
 *
 *  NO STATE IS SHARED BETWEEN THEM, so this could in principle be three
 *  islands. It stays one for the reason MIGRATION.md gives: every route on this
 *  site is a single `client:load` island, and a page that breaks the pattern
 *  costs more in surprise than it saves in bytes.
 *
 *  SECTION ORDER IS ALSO THE SURFACE ORDER. globals.css bands `main > section`
 *  from the bottom up, so the hero keeps the page surface and the two below it
 *  alternate ink-2 then ink-3. The last band never matches the footer.
 *
 *  WHAT IS DELIBERATELY NOT HERE. No FAQ, no logo wall, no case-study rail, no
 *  second call-to-action band. Every one of them exists elsewhere on the site,
 *  and each would put another screen between a visitor and the thing they came
 *  to this page to do. */
export function ContactPage() {
  return (
    <>
      <main>
        <ContactHero />
        <GrowthObjectives />
        <ConsultationForm />
        <StudioMap />
      </main>

      {/* Mobile only. The hero's four lines scroll away, and on a phone the form
          is two screens below them by the time the objectives have been read. */}
      <StickyCTABar href="#brief" label="Book a free consultation" />
    </>
  );
}

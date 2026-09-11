"use client";

import { useState } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { Radar } from "@/components/fx/Adornments";
import { ArrowRight } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LeadForm } from "@/components/service/LeadForm";
import { standardFormFields } from "@/content/forms";

/** The free-audit band: a headline and one button that opens the form.
 *
 *  THE BAND USED TO CARRY THE FORM ITSELF, and that form went nowhere. It was
 *  an email box, a consent tick and a Submit that called `preventDefault`, set
 *  a `done` flag and printed "Thank you! Your submission has been received."
 *  Nothing was posted, nothing reached the inbox, nothing reached the sheet.
 *  Every other form on this site posts to /api/enquiry through `LeadForm`;
 *  this one was the last that did not, so replacing it fixes a silently
 *  dropped enquiry as well as answering the request.
 *
 *  THE PATTERN IS THE SITE'S OWN. A CTA that opens `Modal` with a `LeadForm`
 *  inside it is what the service heroes, the growth band and the three
 *  mastheads already do, so the dialog behaves the way the rest of the site's
 *  dialogs do: focus moves in and returns to the button, Tab is trapped,
 *  Escape closes, and the panel scrolls under Lenis.
 *
 *  THE FIELD SET IS THE STANDARD ONE. Team direction of 2026-09-02 is one set
 *  across the whole site with a single exception for the two SEO pages, so
 *  this uses `standardFormFields` rather than inventing a third variant --
 *  see the note in `src/content/forms.ts`. Worth a decision: an audit is of a
 *  website and the standard set does not ask for one, so the team has to read
 *  it out of the Company or Message field. `seoFormFields` already has a
 *  Website field if that is wanted here.
 *
 *  WHAT THE BAND KEEPS. The heading, the radar and the red are untouched; the
 *  right-hand column is a button where the form used to be. */
export function AuditStrip() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-brand">
      <Container className="grid items-center gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <Rise>
          <div className="flex items-center gap-6">
            <Radar className="hidden shrink-0 sm:block" />
            <h2 className="font-display display-lg font-extrabold uppercase text-white">
              Get your free digital
              <br />
              marketing audit
            </h2>
          </div>
        </Rise>

        <Rise delay={0.12} className="lg:justify-self-end">
          {/* Inverted, because the band is already brand red: the site's
              primary button would disappear into it. White on red is the
              treatment the Submit button in this band already had. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-9 py-4 text-sm font-bold uppercase text-brand transition-colors duration-300 hover:bg-snow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Get Your Audit
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
              <ArrowRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5 motion-reduce:transition-none" />
              <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 motion-reduce:transition-none" />
            </span>
          </button>
        </Rise>
      </Container>

      <Modal open={open} onClose={() => setOpen(false)} title="Get your free digital marketing audit">
        <LeadForm
          fields={standardFormFields}
          submitLabel="Request my audit"
          formName="Audit Strip"
        />
      </Modal>
    </section>
  );
}

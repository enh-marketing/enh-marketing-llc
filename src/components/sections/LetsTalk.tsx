"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { brand } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SpinStar } from "@/components/fx/Adornments";
import {
  Field,
  TextareaField,
  ConsentField,
  SubmitButton,
  Honeypot,
  RecaptchaNotice,
  FormError,
} from "@/components/ui/Field";
import { pageContext, recaptchaAction, submitEnquiry } from "@/lib/enquiry";
import type { EnquiryField } from "@/lib/enquiry";
import { getRecaptchaToken, warmRecaptcha } from "@/lib/recaptcha";

/** Which form this is, for the notification email and the sheet column. The
 *  contact page's is "Contact Consultation"; this one has to be distinguishable
 *  from it or the team cannot tell a homepage enquiry from a contact-page one. */
const FORM_NAME = "Homepage Consultation";

function MagneticOrb() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14 });
  const sy = useSpring(y, { stiffness: 160, damping: 14 });

  return (
    <motion.a
      href={`mailto:${brand.email}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex h-40 w-40 items-center justify-center rounded-full bg-brand text-center shadow-[0_30px_90px_-20px_rgba(232,0,13,0.65)] sm:h-48 sm:w-48"
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-3 rounded-full border border-dashed border-white/30"
      />
      <span className="font-display text-lg font-bold uppercase leading-tight text-white">
        Say
        <br />
        hello
      </span>
    </motion.a>
  );
}

/** "Let's explore new heights, together." — the homepage consultation form.
 *
 *  IT DID NOT SEND ANYTHING. Until now this form's entire submit handler was
 *  `e.preventDefault(); setDone(true);`. It drew six fields and a consent box,
 *  validated them natively, and then printed "Thank you. Thanks for reaching
 *  out. We will get back to you soon." without opening a connection. Every
 *  enquiry made from the homepage -- the most-visited page on the site -- was
 *  discarded in the browser, and the visitor was told it had arrived.
 *
 *  THE MARKUP IS UNTOUCHED. The panel, the hairline sweep, the field layout,
 *  the consent box, the thank-you and the magnetic orb are exactly as they
 *  were; this change is the wiring behind them. What is added is what a real
 *  submit needs and this one never had: a honeypot, a reCAPTCHA token, a
 *  sending state, an error path, and the reCAPTCHA attribution.
 *
 *  IT IS NOT `LeadForm` OR `ConsultationForm`. The first draws a plain grid
 *  from a field list and has no consent box; the second is the contact page's,
 *  with per-field error messages, a service pill row and its own submit button
 *  built as a spinning orb. This panel is a third composition and replacing it
 *  with either would be redesigning the section, not fixing it. What it shares
 *  with both is the part that matters: the payload shape, the endpoint, and
 *  `@/lib/enquiry`.
 *
 *  NAMES ARE THE SITE'S, NOT THE DOM'S. The inputs carry `lt-` prefixed ids
 *  because the homepage mounts other forms too, but they submit as `name`,
 *  `email`, `phone`, `company`, `services`, `message` -- the ids the sheet
 *  keys its columns off. Prefixed ids reaching the payload would have opened
 *  six new columns saying the same thing as the existing six. */
export function LetsTalk() {
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  /** A send that failed: ours to explain, not the visitor's to fix. */
  const [error, setError] = useState<string | null>(null);
  /** The thank-you replaces the form, which pulls focus out of the document.
   *  Moved here on success so a screen reader lands on the confirmation. */
  const doneRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const data = new FormData(event.currentTarget);
    setSending(true);
    setError(null);

    /* In the order the panel draws them, with the labels the visitor actually
       read, so the email and the sheet reproduce the form rather than a
       developer's idea of it. */
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const fields: EnquiryField[] = [
      { id: "name", label: "Name", value: value("name") },
      { id: "email", label: "Email", value: value("email") },
      { id: "phone", label: "Phone", value: value("phone") },
      { id: "company", label: "Company", value: value("company") },
      { id: "services", label: "Services", value: value("services") },
      { id: "message", label: "Message", value: value("message") },
    ];

    const action = recaptchaAction(FORM_NAME);
    const token = await getRecaptchaToken(action);

    const result = await submitEnquiry({
      formName: FORM_NAME,
      ...pageContext(),
      fields,
      /* The panel has a consent box, so it is sent, the way the contact form
         sends its own. Native `required` means it cannot be false here, but
         the value recorded is the box's rather than a hardcoded true. */
      consent: data.get("lt-consent") !== null,
      token,
      action,
      hp: String(data.get("company_website") ?? ""),
    });

    setSending(false);
    if (result.ok) {
      setDone(true);
      // After the swap, not before: the node does not exist yet on this tick.
      requestAnimationFrame(() => doneRef.current?.focus());
      return;
    }
    setError(result.message);
  }

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 45% at 85% 10%, rgba(232,0,13,0.15), transparent 60%), radial-gradient(35% 35% at 5% 95%, rgba(232,0,13,0.1), transparent 55%)",
        }}
      />

      <Container className="relative">
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
          Let&apos;s talk <SpinStar />
        </p>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — pitch, orb, contact details */}
          <div>
            <h2 className="font-display display-xl font-extrabold uppercase text-snow">
              <span className="block"><Chars text="Let's explore" /></span>
              <span className="block"><Chars text="new heights," delay={0.12} /></span>
              <span className="block text-brand"><Chars text="together." delay={0.24} /></span>
            </h2>
            <Rise delay={0.3} className="mt-6">
              <p className="max-w-md leading-relaxed text-fog">
                Dubai&apos;s result-driven digital marketing agency — expertise at your
                call. Book a free consultation with our strategists.
              </p>
            </Rise>

            <Rise delay={0.4} className="mt-10">
              <MagneticOrb />
            </Rise>

            <Rise delay={0.5} className="mt-12">
              <dl className="max-w-md space-y-4 border-t border-line pt-8 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-fog">Email</dt>
                  <dd>
                    <a href={`mailto:${brand.email}`} className="font-medium text-snow transition-colors hover:text-brand">
                      {brand.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-fog">Phone</dt>
                  <dd>
                    <a href={`tel:${brand.phoneHref}`} className="font-medium text-snow transition-colors hover:text-brand">
                      {brand.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-fog">WhatsApp</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${brand.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-snow transition-colors hover:text-brand"
                    >
                      Live chat — connect now
                    </a>
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-fog">Office</dt>
                  <dd className="max-w-[60%] text-right font-medium text-snow">{brand.address}</dd>
                </div>
              </dl>
            </Rise>
          </div>

          {/* Right — consultation form */}
          <Rise delay={0.2} className="self-start">
            {/* Same panel and field system as the Performance Marketing quote
                form: one form language across the site. */}
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-8 sm:p-10">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
              />

              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="ok"
                    ref={doneRef}
                    tabIndex={-1}
                    // Announced on arrival; the form it replaced is gone.
                    role="status"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-80 flex-col items-center justify-center text-center outline-none"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <h3 className="font-display mt-6 text-2xl font-bold text-snow">Thank you.</h3>
                    <p className="mt-2 max-w-xs text-sm text-fog">
                      Thanks for reaching out. We will get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    /* First contact with the form is when reCAPTCHA starts
                       loading. See the note at the top of @/lib/recaptcha for
                       why it is not in the layout. */
                    onFocusCapture={warmRecaptcha}
                  >
                    <Honeypot id="lt-company-website" />

                    <h3 className="font-display mb-9 max-w-sm text-lg font-bold leading-snug text-snow">
                      Book a free digital marketing consultation with our strategists
                    </h3>

                    <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                      {/* The site's standard set: Name, Email, Phone, Company,
                          Services, Message. Team direction, 2026-09-02. This
                          form had no Company or Message before. */}
                      <Field id="lt-name" name="name" label="Name" autoComplete="name" required />
                      <Field id="lt-email" name="email" label="Email" type="email" autoComplete="email" required />
                      <Field id="lt-phone" name="phone" label="Phone" type="tel" autoComplete="tel" required />
                      <Field id="lt-company" name="company" label="Company" autoComplete="organization" />
                      {/* TEAM DIRECTION, 2026-09-08: a text box, not a
                          dropdown. Matches the service pages, whose shared
                          field set changed at the same time. */}
                      <Field
                        id="lt-service"
                        name="services"
                        label="Services"
                        required
                        className="sm:col-span-2"
                      />
                      <TextareaField
                        id="lt-message"
                        name="message"
                        label="Message"
                        className="sm:col-span-2"
                      />
                    </div>

                    <div className="mt-9">
                      <ConsentField id="lt-consent">
                        I agree with the terms of the Privacy Policy. Your information is
                        100% secure and confidential.
                      </ConsentField>
                    </div>

                    {error && <FormError>{error}</FormError>}

                    <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                      <SubmitButton className="w-full sm:w-auto" disabled={sending}>
                        {sending ? "Sending…" : "Submit"}
                      </SubmitButton>
                      {/* Required wherever a token is minted: the floating
                          reCAPTCHA badge is hidden in globals.css, and hiding
                          it is only permitted with this text present. This
                          form minted no token before, so it correctly had no
                          notice; it does now. */}
                      <RecaptchaNotice className="sm:max-w-[16rem] sm:text-right" />
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

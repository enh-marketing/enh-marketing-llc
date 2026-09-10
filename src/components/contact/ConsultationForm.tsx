"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Chars, Rise } from "@/components/fx/Reveal";
import { FIELD_LABEL, FormError, Honeypot, RecaptchaNotice } from "@/components/ui/Field";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { brand } from "@/lib/content";
import { form } from "@/content/contact";
import { pageContext, recaptchaAction, submitEnquiry } from "@/lib/enquiry";
import type { EnquiryField } from "@/lib/enquiry";
import { getRecaptchaToken, warmRecaptcha } from "@/lib/recaptcha";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** "Book a Free Digital Marketing Consultation with Our Strategists".
 *
 *  THE FIELD SET IS THE LIVE FORM'S, EXACTLY. Name, Email, Phone, Company,
 *  Requested Service, Message -- which is also `standardFormFields` in
 *  src/content/forms.ts, the one set team direction of 2026-09-02 fixed for the
 *  whole site. So nothing here can drift from either the live page or the other
 *  seventeen forms on this one. No seventh field was added to make the form look
 *  thorough, and no budget band was invented (see the note in the content file).
 *
 *  WHAT IS DESIGNED DIFFERENTLY IS THE ASKING. Three things:
 *
 *  1. THE SERVICE IS A ROW OF PILLS, NOT A DROPDOWN. Same seven options, same
 *     submitted value, but a dropdown hides six of the seven things the agency
 *     does behind a click, and this page is where a visitor decides which of
 *     them they came for. Native radios in labels, so arrow keys move within the
 *     row and the browser owns the behaviour; the row shows the focus ring
 *     through :has(), because the radio itself is visually hidden.
 *  2. THE FIELDS ARE HAIRLINES AT EDITORIAL SCALE. Same material as every other
 *     form here -- the label style and the red underline wipe come straight from
 *     ui/Field -- one step up in size, on the section's own surface rather than
 *     inside a panel. On this page the form is the purpose, not one block of ten.
 *  3. THE SUBMIT IS THE SITE'S OWN ORB. The homepage's Let's Talk section
 *     already has a magnetic brand circle with a slowly rotating dashed ring;
 *     it was a mailto link there. Here it is the submit button, which is what it
 *     always wanted to be. It leans toward the pointer, stands still under
 *     prefers-reduced-motion, and is a real <button type="submit"> with a real
 *     accessible name.
 *
 *  VALIDATION IS REAL. `noValidate`, because the browser's bubbles are
 *  off-brand, and everything they would have done is done here: a message per
 *  field wired through aria-describedby, aria-invalid on the control, errors
 *  raised on blur once a field has been touched and on submit for all of them,
 *  and focus moved to the first field that failed, found by its deterministic id
 *  rather than through a ref map. Name, email and the consent box are required,
 *  matching the live form and `standardFormFields`.
 *
 *  SUBMIT POSTS TO /api/enquiry, the site's one endpoint, which every other
 *  form on the site also posts to. The "Thank you" state below is now shown
 *  because the mail was sent, not in place of sending it.
 *
 *  THIS FORM SENDS ONE FIELD THE SERVICE PAGES DO NOT: `consent`. The box is
 *  required here and exists nowhere else, so the payload carries it as its own
 *  flag rather than as a seventh text field, the email prints "Consent: Given",
 *  and the sheet keeps a Consent column that is blank for every other form's
 *  rows. That blankness is correct: those forms never asked. */

type Key = "name" | "email" | "phone" | "company" | "message";
type Values = Record<Key, string>;

const EMPTY: Values = { name: "", email: "", phone: "", company: "", message: "" };

/** Deliberately permissive: one @, something before it, a dot-something after.
 *  A stricter pattern rejects addresses that exist, and turning away a real
 *  enquiry is a worse failure than accepting a typo. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const REQUIRED: Key[] = ["name", "email"];

function errorFor(key: Key, value: string): string | null {
  const v = value.trim();
  if (REQUIRED.includes(key) && !v) {
    return key === "email" ? "We need an email to reply to." : "Please add your name.";
  }
  if (key === "email" && v && !EMAIL.test(v)) return "That address is missing an @ or a domain.";
  return null;
}

const CONTROL =
  "w-full border-b border-line bg-transparent py-3.5 text-lg leading-snug text-snow outline-none placeholder:text-ash/60 sm:text-xl";

/** One hairline field, at the scale this page sets its form. */
function Row({
  id,
  name,
  label,
  type,
  autoComplete,
  required,
  textarea,
  value,
  error,
  onChange,
  onBlur,
  className,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  textarea?: boolean;
  value: string;
  error: string | null;
  onChange: (v: string) => void;
  onBlur: () => void;
  className?: string;
}) {
  const errId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    onBlur,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
    className: cn(CONTROL, textarea && "resize-none"),
  };

  return (
    <div className={className}>
      <label htmlFor={id} className={FIELD_LABEL}>
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      <div className="field relative">
        {textarea ? (
          <textarea {...shared} rows={4} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input
            {...shared}
            type={type ?? "text"}
            autoComplete={autoComplete}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        <span
          aria-hidden
          className={cn(
            "field-underline pointer-events-none absolute bottom-0 left-0 h-px w-full",
            error ? "bg-brand-hot" : "bg-brand",
          )}
        />
        {/* An errored field keeps its red hairline whether it is focused or not,
            so the row still reads as wrong once focus has moved on. */}
        {error && (
          <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-brand-hot" />
        )}
      </div>
      {error && (
        <p id={errId} className="mt-2 flex items-start gap-1.5 text-xs leading-snug text-brand-text">
          <span aria-hidden className="mt-[0.35em] block h-1 w-1 shrink-0 rounded-full bg-brand-hot" />
          {error}
        </p>
      )}
    </div>
  );
}

/** The site's magnetic orb, doing the job it was shaped for.
 *
 *  While a send is in flight the orb stops leaning toward the pointer and its
 *  dashed ring speeds up from a 26-second drift to a 1.4-second spin, so the
 *  ring that was decoration becomes the progress indicator. Under
 *  prefers-reduced-motion it never span in the first place and it still does
 *  not; the label changing to "Sending" is what reports the state there. */
function SendOrb({ sending }: { sending: boolean }) {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14 });
  const sy = useSpring(y, { stiffness: 160, damping: 14 });

  return (
    <motion.button
      type="submit"
      disabled={sending}
      aria-busy={sending || undefined}
      onPointerMove={(e) => {
        if (reduced || sending) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={reduced ? undefined : { x: sx, y: sy }}
      whileTap={sending ? undefined : { scale: 0.95 }}
      className="group relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-[0_26px_70px_-24px_rgba(232,0,13,0.7)] transition-colors duration-300 hover:bg-brand-deep disabled:cursor-not-allowed disabled:hover:bg-brand sm:h-36 sm:w-36"
    >
      <motion.span
        aria-hidden
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: sending ? 1.4 : 26, repeat: Infinity, ease: "linear" }}
        className="absolute inset-3 rounded-full border border-dashed border-white/35"
      />
      <span className="font-display text-base font-extrabold uppercase tracking-wide">
        {sending ? "Sending" : form.submit}
      </span>
    </motion.button>
  );
}

export function ConsultationForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [service, setService] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<Key | "consent", boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  /** A send that failed. Distinct from the per-field errors above: those are
   *  the visitor's to fix, this one is ours. */
  const [sendError, setSendError] = useState<string | null>(null);

  const errors = {
    name: errorFor("name", values.name),
    email: errorFor("email", values.email),
    phone: null,
    company: null,
    message: null,
  } as Record<Key, string | null>;
  const consentError = consent ? null : "Please agree before sending.";
  const valid = !errors.name && !errors.email && !consentError;

  const show = (key: Key) => (submitted || touched[key] ? errors[key] : null);
  const showConsent = submitted || touched.consent ? consentError : null;

  const set = (key: Key, v: string) => setValues((prev) => ({ ...prev, [key]: v }));
  const blur = (key: Key | "consent") => setTouched((t) => ({ ...t, [key]: true }));

  /** Every control on this form has a deterministic id, so moving focus to the
   *  first failure needs no ref map -- and a ref map built in render is exactly
   *  what react-hooks/refs forbids. Read only inside the submit handler, which
   *  is the one place the DOM is guaranteed to be there. */
  const focusFirstError = () => {
    const firstBad = REQUIRED.find((k) => errors[k]);
    const id = firstBad ? `${uid}-${firstBad}` : `${uid}-consent`;
    document.getElementById(id)?.focus();
  };

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (!valid) {
      focusFirstError();
      return;
    }
    if (sending) return;

    // Read before the first await: React pools nothing here, but the form
    // element is easier to reason about taken once, up front.
    const hp = String(new FormData(e.currentTarget).get("company_website") ?? "");

    setSending(true);
    setSendError(null);

    // Sent in the order the form draws them, with the labels the visitor read,
    // so the email and the sheet reproduce the form rather than a developer's
    // idea of it. The service pill row is a field like any other here.
    const payloadFields: EnquiryField[] = [
      { id: "name", label: form.fields.name, value: values.name.trim() },
      { id: "email", label: form.fields.email, value: values.email.trim() },
      { id: "phone", label: form.fields.phone, value: values.phone.trim() },
      { id: "company", label: form.fields.company, value: values.company.trim() },
      { id: "services", label: form.servicesLabel, value: service },
      { id: "message", label: form.fields.message, value: values.message.trim() },
    ];

    const action = recaptchaAction("Contact Consultation");
    const token = await getRecaptchaToken(action);

    const result = await submitEnquiry({
      formName: "Contact Consultation",
      ...pageContext(),
      fields: payloadFields,
      consent,
      token,
      action,
      hp,
    });

    setSending(false);
    if (result.ok) {
      setDone(true);
      return;
    }
    setSendError(result.message);
  };

  const rowProps = (key: Key) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    error: show(key),
    onChange: (v: string) => set(key, v),
    onBlur: () => blur(key),
  });

  return (
    <section id="brief" data-section="Book a Free Consultation" className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-b absolute right-[-14%] top-[-6%] h-[40vw] w-[40vw] rounded-full bg-brand/10 blur-[160px]" />
      </div>

      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          {/* -------------------------------------------------------- the ask */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <p className="mb-7 text-xs font-semibold uppercase text-brand-text">({form.index})</p>
            <h2 className="font-display display-lg font-extrabold uppercase text-snow">
              <span>
                <Chars text={form.title} />
              </span>{" "}
              <span className="text-brand">
                <Chars text={form.strokeTitle} delay={0.12} />
              </span>
            </h2>
            <Rise delay={0.2} className="mt-8">
              <p className="max-w-sm border-l-2 border-brand pl-5 text-base leading-relaxed text-fog">
                {form.note}
              </p>
            </Rise>
          </div>

          {/* ------------------------------------------------------- the form */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h3 className="font-display display-lg mt-8 font-extrabold uppercase text-snow">
                    {form.success.title}
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-fog">
                    {form.success.body}
                  </p>
                  <p className="mt-8 text-xs font-semibold uppercase text-ash">
                    {form.success.lede}
                  </p>
                  <ul className="mt-4 border-t border-line">
                    {[
                      { label: "Live Chat", value: "Connect with us now", href: `https://wa.me/${brand.whatsapp}`, external: true },
                      { label: "Phone Number", value: brand.phone, href: `tel:${brand.phoneHref}` },
                      { label: "Email Address", value: brand.email, href: `mailto:${brand.email}` },
                    ].map((line) => (
                      <li key={line.label} className="border-b border-line">
                        <a
                          href={line.href}
                          {...(line.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 text-sm transition-colors hover:text-brand"
                        >
                          <span className="text-fog">{line.label}</span>
                          <span className="font-medium text-snow">{line.value}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={submit}
                  // First contact with the form is when reCAPTCHA starts
                  // loading. See the note at the top of @/lib/recaptcha.
                  onFocusCapture={warmRecaptcha}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative space-y-11"
                >
                  <Honeypot id={`${uid}-company_website`} />

                  {/* ----------------------------------------- service pills */}
                  <div role="group" aria-labelledby={`${uid}-service-label`}>
                    <p id={`${uid}-service-label`} className={FIELD_LABEL}>
                      {form.servicesLabel}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {form.services.map((option) => {
                        const on = option === service;
                        return (
                          <label
                            key={option}
                            className={cn(
                              "cursor-pointer rounded-full border px-5 py-3 text-[0.72rem] font-semibold uppercase leading-none transition-colors duration-300",
                              "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-hot",
                              on
                                ? "border-brand bg-brand text-white"
                                : "border-line text-fog hover:border-brand hover:text-brand",
                            )}
                          >
                            <input
                              type="radio"
                              name="services"
                              value={option}
                              checked={on}
                              onChange={() => setService(option)}
                              className="sr-only"
                            />
                            {option}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* ---------------------------------------------- the fields */}
                  <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                    <Row {...rowProps("name")} label={form.fields.name} autoComplete="name" required />
                    <Row
                      {...rowProps("email")}
                      label={form.fields.email}
                      type="email"
                      autoComplete="email"
                      required
                    />
                    <Row {...rowProps("phone")} label={form.fields.phone} type="tel" autoComplete="tel" />
                    <Row
                      {...rowProps("company")}
                      label={form.fields.company}
                      autoComplete="organization"
                    />
                    <Row
                      {...rowProps("message")}
                      label={form.fields.message}
                      textarea
                      className="sm:col-span-2"
                    />
                  </div>

                  {/* --------------------------------------- consent and send */}
                  <div className="flex flex-col gap-9 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
                    <div className="min-w-0">
                      <label
                        htmlFor={`${uid}-consent`}
                        className="flex max-w-md items-start gap-3 text-xs leading-relaxed text-fog"
                      >
                        <input
                          id={`${uid}-consent`}
                          name="consent"
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          onBlur={() => blur("consent")}
                          aria-invalid={showConsent ? true : undefined}
                          aria-describedby={showConsent ? `${uid}-consent-error` : undefined}
                          className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-brand"
                        />
                        <span>{form.consent}</span>
                      </label>
                      {showConsent && (
                        <p
                          id={`${uid}-consent-error`}
                          className="mt-2 flex items-start gap-1.5 pl-[30px] text-xs text-brand-text"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.35em] block h-1 w-1 shrink-0 rounded-full bg-brand-hot"
                          />
                          {showConsent}
                        </p>
                      )}
                      <RecaptchaNotice className="mt-5 max-w-md" />
                    </div>

                    <SendOrb sending={sending} />
                  </div>

                  {sendError && <FormError>{sendError}</FormError>}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

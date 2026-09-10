"use client";

import { useId, useRef, useState } from "react";

import {
  Field,
  TextareaField,
  SelectField,
  SubmitButton,
  Honeypot,
  RecaptchaNotice,
  FormError,
} from "@/components/ui/Field";
import { pageContext, recaptchaAction, submitEnquiry } from "@/lib/enquiry";
import type { EnquiryField } from "@/lib/enquiry";
import { getRecaptchaToken, warmRecaptcha } from "@/lib/recaptcha";

export type FormField = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  /** Spans both columns. */
  wide?: boolean;
  /** Renders a textarea instead of an input. */
  textarea?: boolean;
  /** Renders a select instead of an input. The homepage consultation form has
   *  always offered the services list as a dropdown; the service pages could
   *  not, because this form only knew how to draw inputs and textareas. */
  options?: string[];
  placeholder?: string;
};

/** Enquiry form. Field sets differ per page — each service document specifies
 *  its own — so the fields are passed in rather than hardcoded. Styling comes
 *  entirely from the shared field system in @/components/ui/Field, which the
 *  homepage contact form also uses.
 *
 *  IDS. A page can mount this twice, in the hero dialog and in the closing
 *  block, and a section anchor elsewhere on the page may share a field's name
 *  ("services"). Each instance therefore prefixes its DOM ids with a useId, so
 *  every label points at its own control; the submitted `name` stays the plain
 *  field id.
 *
 *  THE FIELDS STAY UNCONTROLLED. Six useStates and six onChange handlers would
 *  re-render the whole form on every keystroke and would buy nothing: no field
 *  here depends on another, and nothing validates as you type. The values are
 *  read once, out of FormData, at submit. Required-ness is the browser's job
 *  through the `required` attribute, which is also why this form keeps native
 *  validation while ConsultationForm sets `noValidate` — that one draws its own
 *  error messages and this one does not.
 *
 *  WHAT SUBMIT DOES. Mints a fresh reCAPTCHA token, posts to /api/enquiry, and
 *  swaps the form for a thank-you. `formName` is what tells the inbox and the
 *  sheet which of the seven mount sites this was; the page is read from the
 *  document at submit time, so no mount site has to know its own URL. */
export function LeadForm({
  fields,
  submitLabel,
  formName,
}: {
  fields: FormField[];
  submitLabel: string;
  /** Which form this is, for the notification email and the sheet column.
   *  e.g. "Service Hero", "CTA Band". Set at the mount site. */
  formName: string;
}) {
  const uid = useId();
  const domId = (id: string) => `${uid}-${id}`;

  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  /** The thank-you replaces the form, which pulls focus out of the document.
   *  Moved here on success so a screen reader lands on the confirmation
   *  rather than at the top of the page. */
  const doneRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    setStatus("sending");
    setError(null);

    // The field set is the source of truth for what gets sent and in what
    // order, so a field the form did not draw cannot be injected into the
    // email by editing the DOM.
    const payloadFields: EnquiryField[] = fields.map((f) => ({
      id: f.id,
      label: f.label,
      value: String(data.get(f.id) ?? "").trim(),
    }));

    const action = recaptchaAction(formName);
    const token = await getRecaptchaToken(action);

    const result = await submitEnquiry({
      formName,
      ...pageContext(),
      fields: payloadFields,
      token,
      action,
      hp: String(data.get("company_website") ?? ""),
    });

    if (result.ok) {
      setStatus("done");
      // After the swap, not before: the node does not exist yet on this tick.
      requestAnimationFrame(() => doneRef.current?.focus());
      return;
    }
    setStatus("idle");
    setError(result.message);
  }

  if (status === "done") {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        className="relative outline-none"
        // Announced on arrival; the form it replaced is gone from the tree.
        role="status"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="mt-6 font-display text-2xl font-extrabold uppercase text-snow">Thank you</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-fog">
          Your enquiry is with our team. We reply to every message, usually within one working day.
        </p>
      </div>
    );
  }

  return (
    <form
      className="relative"
      onSubmit={handleSubmit}
      // First contact with the form is when reCAPTCHA starts loading. See the
      // note at the top of @/lib/recaptcha for why it is not in the layout.
      onFocusCapture={warmRecaptcha}
    >
      <Honeypot id={domId("company_website")} />

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {fields.map((f) =>
          f.options ? (
            <SelectField
              key={f.id}
              id={domId(f.id)}
              name={f.id}
              label={f.label}
              options={f.options}
              // SelectField requires one; the field set supplies it.
              placeholder={f.placeholder ?? "Select an option"}
              required={f.required}
              className={f.wide ? "sm:col-span-2" : undefined}
            />
          ) : f.textarea ? (
            <TextareaField
              key={f.id}
              id={domId(f.id)}
              name={f.id}
              label={f.label}
              required={f.required}
              className={f.wide ? "sm:col-span-2" : undefined}
            />
          ) : (
            <Field
              key={f.id}
              id={domId(f.id)}
              name={f.id}
              label={f.label}
              type={f.type}
              required={f.required}
              autoComplete={f.autoComplete}
              className={f.wide ? "sm:col-span-2" : undefined}
            />
          ),
        )}
      </div>

      {error && <FormError>{error}</FormError>}

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <SubmitButton className="w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </SubmitButton>
        <RecaptchaNotice className="sm:max-w-[18rem] sm:text-right" />
      </div>
    </form>
  );
}

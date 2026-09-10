"use client";

import type { ReactNode, SelectHTMLAttributes } from "react";
import { ArrowRight } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** The site's one form system.
 *
 *  Underline fields rather than boxed inputs: the whole design language is
 *  hairlines that wipe red (table marker, card rules, link underlines), so the
 *  forms are built from the same material. The wipe itself lives in globals.css
 *  as .field / .field-underline.
 *
 *  Used by both the Performance Marketing quote form and the homepage contact
 *  form so the two can never drift apart. */

export const FIELD_LABEL =
  "mb-2 block text-[11px] font-semibold uppercase text-ash";
const CONTROL =
  "w-full border-b border-line bg-transparent py-3 text-base text-snow placeholder:text-ash/60";
const UNDERLINE =
  "field-underline pointer-events-none absolute bottom-0 left-0 h-px w-full bg-brand";

function Label({ id, children, required }: { id: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={id} className={FIELD_LABEL}>
      {children}
      {required && <span className="ml-1 text-brand">*</span>}
    </label>
  );
}

export function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required,
  placeholder,
  className,
}: {
  id: string;
  /** The submitted field name. Defaults to `id`; pass it when one page mounts
   *  the same form twice and each copy needs its own DOM id. */
  name?: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label id={id} required={required}>
        {label}
      </Label>
      <div className="field relative">
        <input
          id={id}
          name={name ?? id}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className={CONTROL}
        />
        <span aria-hidden className={UNDERLINE} />
      </div>
    </div>
  );
}

export function TextareaField({
  id,
  name,
  label,
  rows = 3,
  required,
  className,
}: {
  id: string;
  name?: string;
  label: string;
  rows?: number;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label id={id} required={required}>
        {label}
      </Label>
      <div className="field relative">
        <textarea id={id} name={name ?? id} rows={rows} required={required} className={cn(CONTROL, "resize-none")} />
        <span aria-hidden className={UNDERLINE} />
      </div>
    </div>
  );
}

export function SelectField({
  id,
  name,
  label,
  options,
  placeholder,
  required,
  className,
  ...rest
}: {
  id: string;
  name?: string;
  label: string;
  options: readonly string[];
  placeholder: string;
  required?: boolean;
  className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className">) {
  return (
    <div className={className}>
      <Label id={id} required={required}>
        {label}
      </Label>
      <div className="field relative">
        <select id={id} name={name ?? id} required={required} defaultValue="" className={CONTROL} {...rest}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span aria-hidden className={UNDERLINE} />
      </div>
    </div>
  );
}

export function ConsentField({ id, children }: { id: string; children: ReactNode }) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 text-xs leading-relaxed text-fog">
      <input id={id} name={id} type="checkbox" required className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-brand" />
      <span>{children}</span>
    </label>
  );
}

/** Red pill with the two-arrow push, matching the channel cards' Know More. */
export function SubmitButton({
  children,
  className,
  disabled,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brand",
        className,
      )}
    >
      {children}
      <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
        <ArrowRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5" />
        <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
      </span>
    </button>
  );
}

/** The honeypot.
 *
 *  A field a person never fills in, because a person never sees it. Bots that
 *  walk the DOM and complete every input give themselves away by putting
 *  something in it, and the endpoint drops those without sending mail.
 *
 *  WHY NOT `type="hidden"` OR `display:none`. Both are trivially recognised by
 *  anything worth defending against, and `display:none` on a real input also
 *  hides it from the browser's own autofill heuristics in ways that vary. This
 *  is a real text input parked outside the viewport, taken out of the tab order
 *  with tabIndex={-1}, hidden from assistive tech with aria-hidden, and told
 *  not to autofill. A keyboard user never reaches it and a screen reader never
 *  announces it, so nobody real can fill it in by accident. The name is
 *  deliberately plausible: `company_website` is the kind of field a scraper
 *  expects to find and complete. */
export function Honeypot({ id }: { id: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Company website</label>
      <input id={id} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** Google's required attribution, shown because the floating reCAPTCHA badge
 *  is hidden in globals.css. Hiding the badge is only permitted with this text
 *  present, so the two travel together: remove one and remove the other. */
export function RecaptchaNotice({ className }: { className?: string }) {
  return (
    <p className={cn("text-[11px] leading-relaxed text-ash", className)}>
      Protected by reCAPTCHA. Google&rsquo;s{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 transition-colors hover:text-brand"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 transition-colors hover:text-brand"
      >
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}

/** A failed send, in the form's own material rather than an alert().
 *  `role="alert"` so it is announced the moment it appears, which is the whole
 *  point: the visitor has just pressed submit and is looking at the button, not
 *  at the space above it. */
export function FormError({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="mt-6 flex items-start gap-2 border-l-2 border-brand-hot pl-4 text-sm leading-relaxed text-brand-text"
    >
      {children}
    </p>
  );
}

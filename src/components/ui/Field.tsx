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
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ash";
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
  label,
  type = "text",
  autoComplete,
  required,
  placeholder,
  className,
}: {
  id: string;
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
          name={id}
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
  label,
  rows = 3,
  required,
  className,
}: {
  id: string;
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
        <textarea id={id} name={id} rows={rows} required={required} className={cn(CONTROL, "resize-none")} />
        <span aria-hidden className={UNDERLINE} />
      </div>
    </div>
  );
}

export function SelectField({
  id,
  label,
  options,
  placeholder,
  required,
  className,
  ...rest
}: {
  id: string;
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
        <select id={id} name={id} required={required} defaultValue="" className={CONTROL} {...rest}>
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
      <input id={id} name={id} type="checkbox" required className="mt-0.5 accent-brand" />
      <span>{children}</span>
    </label>
  );
}

/** Red pill with the two-arrow push, matching the channel cards' Know More. */
export function SubmitButton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep",
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

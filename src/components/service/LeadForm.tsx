"use client";

import { Field, TextareaField, SelectField, SubmitButton } from "@/components/ui/Field";

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
 *  TODO(backend): no submit endpoint exists yet. */
export function LeadForm({
  fields,
  submitLabel,
}: {
  fields: FormField[];
  submitLabel: string;
}) {
  return (
    <form className="relative" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {fields.map((f) =>
          f.options ? (
            <SelectField
              key={f.id}
              id={f.id}
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
              id={f.id}
              label={f.label}
              required={f.required}
              className={f.wide ? "sm:col-span-2" : undefined}
            />
          ) : (
            <Field
              key={f.id}
              id={f.id}
              label={f.label}
              type={f.type}
              required={f.required}
              autoComplete={f.autoComplete}
              className={f.wide ? "sm:col-span-2" : undefined}
            />
          ),
        )}
      </div>

      <SubmitButton className="mt-10 w-full sm:w-auto">{submitLabel}</SubmitButton>
    </form>
  );
}

import type { FormField } from "@/components/service/LeadForm";

/** The site's form field sets.
 *
 *  Defined once, here, and imported by every page. Each service page used to
 *  carry its own bespoke set of seven or eight fields, several of them
 *  specified by that page's own source document, which meant seventeen
 *  different forms and seventeen places to edit whenever the team changed its
 *  mind.
 *
 *  TEAM DIRECTION, 2026-09-02: one standard set across the whole website, with
 *  a single exception for the two SEO pages. That direction overrides the form
 *  fields written into the individual client documents, so those documents and
 *  these pages no longer agree on this one point. Recorded here rather than
 *  silently, because the documents are otherwise treated as the source of
 *  truth.
 *
 *  TEAM DIRECTION, 2026-09-08: the Services field is a text box, not a
 *  dropdown. It was a select drawn from `consultationServices`; a visitor can
 *  now type whatever they came to ask about, including something not on that
 *  list. The same change is made to the Let's Talk form, so the whole site
 *  asks for services the same way.
 *
 *  WHAT THE CHANGE DROPS. The per-page qualifying questions go with it: the
 *  monthly ad spend on Performance Marketing, whether Saudi is on the roadmap
 *  on Snapchat, which process feels most manual on AI Automation, and the
 *  "How did you hear about us?" referral field that every page carried. If any
 *  of those are worth keeping, they can be added back per page. */

/** Name, Email, Phone, Company, Services, Message. */
export const standardFormFields: FormField[] = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  {
    // TEAM DIRECTION, 2026-09-08: a text box rather than a dropdown, here and
    // in the hero pop-up, which is the same form. No placeholder, so it reads
    // like every other text field in the set rather than like a picker that
    // lost its list.
    id: "services",
    label: "Services",
    wide: true,
  },
  { id: "message", label: "Message", wide: true, textarea: true },
];

/** The two SEO pages ask for the site itself, which nothing else needs. */
export const seoFormFields: FormField[] = [
  { id: "name", label: "Name", required: true, autoComplete: "name" },
  { id: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Company", autoComplete: "organization" },
  { id: "website", label: "Website", type: "url", autoComplete: "url" },
  {
    id: "services",
    label: "Services you are interested in",
    wide: true,
  },
  {
    id: "requirements",
    label: "Tell us about your project/requirements",
    wide: true,
    textarea: true,
  },
];

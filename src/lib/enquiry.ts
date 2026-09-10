/** The one shape every form on this site submits, and the one client helper
 *  that submits it.
 *
 *  WHY A SHARED SHAPE. There are two form components -- `LeadForm`, mounted in
 *  seven places across roughly eighteen pages, and `ConsultationForm` on the
 *  contact page -- and they draw different field sets. `standardFormFields` and
 *  `seoFormFields` in src/content/forms.ts already differ, and the contact form
 *  adds a service pill row and a consent box that no service page has. A server
 *  endpoint that knew about each of those would have to be edited every time
 *  the team changes a field, which is exactly the drift src/content/forms.ts
 *  exists to prevent.
 *
 *  So the endpoint knows nothing about field sets. The form sends its fields as
 *  an ordered list of `{ id, label, value }`, and the email and the sheet both
 *  render whatever arrives, in the order the form drew it. Add a field to
 *  src/content/forms.ts and it appears in the inbox and gains a sheet column on
 *  its own. */

export type EnquiryField = {
  /** The submitted name, e.g. "email". Stable; the sheet keys columns off it. */
  id: string;
  /** What the visitor actually read above the box, e.g. "Email". */
  label: string;
  value: string;
};

export type EnquiryPayload = {
  /** Which form, e.g. "Service Hero" or "Contact Consultation". Set at the
   *  mount site, because the same component is seven different forms. */
  formName: string;
  /** The page's <title>, so the inbox reads "Google Ads" not "/services/...". */
  pageName: string;
  pagePath: string;
  pageUrl: string;
  fields: EnquiryField[];
  /** Only the contact form has a consent box; `undefined` elsewhere. */
  consent?: boolean;
  /** reCAPTCHA v3 token, or null when no site key is configured (local dev). */
  token: string | null;
  /** The reCAPTCHA action this token was minted for. Verified server-side, so
   *  a token farmed from one form cannot be replayed against another. */
  action: string;
  /** Honeypot. A real visitor never sees the input, so a non-empty value here
   *  is a bot and the request is dropped without sending anything. */
  hp: string;
};

export type EnquiryResponse = {
  ok: boolean;
  /** Safe to show a visitor. Never carries a reason a bot could tune against. */
  message: string;
};

export const ENQUIRY_ENDPOINT = "/api/enquiry";

/** reCAPTCHA v3 actions must be [A-Za-z/_]; no spaces, no dashes. */
export function recaptchaAction(formName: string): string {
  return `submit_${formName.toLowerCase().replace(/[^a-z]+/g, "_")}`.replace(/_+$/, "");
}

/** Where the visitor was standing, read at submit time.
 *
 *  PAGE NAME IS THE TITLE WITH THE BRAND TAIL REMOVED. Every page's <title> is
 *  an SEO title ending in the brand -- "Google Ads Agency Dubai | ENH Media" --
 *  and that tail is the same on all fifty-four, so it identifies nothing while
 *  making the email subject and the sheet column twice as long as they need to
 *  be. The leading segment is the part that says which page this was. The full
 *  URL is sent alongside, so nothing is actually lost. */
export function pageContext(): Pick<EnquiryPayload, "pageName" | "pagePath" | "pageUrl"> {
  if (typeof window === "undefined") {
    return { pageName: "", pagePath: "", pageUrl: "" };
  }
  const title = document.title ?? "";
  const head = title.split(/\s+[|·]\s+/)[0]?.trim();
  return {
    pageName: head || title || "Untitled page",
    pagePath: window.location.pathname,
    pageUrl: window.location.href,
  };
}

/** POSTs the payload and normalises every failure into one shape, so neither
 *  form component has to think about the difference between a 500, a 429 and
 *  the visitor's wifi dropping mid-request. */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  try {
    const res = await fetch(ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // A non-JSON body is what a platform-level error page looks like (a Vercel
    // 504, an HTML 502 from the edge). Treat it as a failed send rather than
    // letting the parse throw.
    const data = (await res.json().catch(() => null)) as EnquiryResponse | null;
    if (!res.ok || !data?.ok) {
      return {
        ok: false,
        message:
          data?.message ??
          "We could not send that just now. Please email info@enhmedia.com or call +971 4 239 0828.",
      };
    }
    return data;
  } catch {
    return {
      ok: false,
      message:
        "We could not reach the server. Please check your connection, or email info@enhmedia.com.",
    };
  }
}

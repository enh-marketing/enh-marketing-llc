/** reCAPTCHA v3, loaded on demand.
 *
 *  WHY NOT A <script> IN THE LAYOUT. reCAPTCHA v3 is not a checkbox; it scores
 *  every page it loads on, and Google's own snippet wants to sit on every page
 *  to build that score. It also costs a third-party connection and ~130KB
 *  before it can mint a token. Eighteen of this site's fifty-four pages carry a
 *  form and the rest carry none, and the ones that do keep it behind a hero
 *  dialog or three sections down the page, so a layout-level script would load
 *  it for every reader who never touches a form. astro.config.mjs already went
 *  out of its way to remove one render-blocking third-party stylesheet; adding
 *  a heavier third-party script to every page would undo more than that gained.
 *
 *  So it loads on first contact with a form -- focus of any field -- and the
 *  token is minted at submit. That ordering matters: a v3 token expires two
 *  minutes after it is issued, which is less time than it takes to fill in six
 *  fields, so a token minted on load would be stale by the time it was sent.
 *
 *  THE BADGE IS HIDDEN, AND THAT IS ALLOWED. Google permits hiding the floating
 *  badge provided the reCAPTCHA branding appears in the form instead. Both form
 *  components render `<RecaptchaNotice />` from @/components/ui/Field below
 *  their submit button, and globals.css hides `.grecaptcha-badge`. Remove one
 *  and the other must go too. */

const SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY as string | undefined;

/** True when the site key is configured. When it is not -- a local checkout
 *  with no .env -- the forms still work and send `token: null`; the endpoint
 *  refuses that in production and allows it in dev. */
export const recaptchaEnabled = Boolean(SITE_KEY);

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

/** Module-scope, so the script is injected once per document however many
 *  forms the page mounts. The contact page mounts one and a service page
 *  mounts two (hero dialog and closing band), and both share this promise. */
let loader: Promise<Grecaptcha | null> | null = null;

function loadScript(): Promise<Grecaptcha | null> {
  if (!SITE_KEY) return Promise.resolve(null);
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
    script.async = true;
    script.defer = true;
    // A blocked script (an ad blocker, a network that filters google.com) must
    // not take the form down with it. Resolving null lets the submit go ahead
    // with a null token, and the endpoint decides what to do about that.
    script.onerror = () => resolve(null);
    script.onload = () => resolve(window.grecaptcha ?? null);
    document.head.appendChild(script);
  });
}

/** Call on first field focus. Safe to call repeatedly; loads at most once. */
export function warmRecaptcha(): void {
  if (!loader) loader = loadScript();
}

/** Mints a fresh token for `action`. Returns null when reCAPTCHA is not
 *  configured or could not load, which the endpoint treats as unverified. */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (!SITE_KEY) return null;
  warmRecaptcha();
  const grecaptcha = await loader;
  if (!grecaptcha) return null;

  try {
    // grecaptcha.ready is callback-only, so it is wrapped rather than awaited.
    await new Promise<void>((resolve) => grecaptcha.ready(resolve));
    return await grecaptcha.execute(SITE_KEY, { action });
  } catch {
    return null;
  }
}

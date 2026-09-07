"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

/** THE RAIL: where you are in the article, and how to pass it on.
 *
 *  IT APPEARS ONLY WHEN IT HAS WORK TO DO. Below three headings a contents
 *  list is two links beside an article nobody needed help navigating, so the
 *  caller renders the rail without one; below `lg` it does not render at all,
 *  because a sticky sidebar on a phone is a sticky sidebar over the thing the
 *  reader is trying to read.
 *
 *  THE ACTIVE ENTRY IS OBSERVED, NOT COMPUTED FROM SCROLL. One
 *  IntersectionObserver over the headings, with a top margin that puts the
 *  trip line just under the fixed header, so the entry that lights is the one
 *  whose section the reader is actually in. A scroll handler doing the same
 *  job would run on every frame and still be wrong at the end of the page,
 *  where the last section is too short to reach the middle of the viewport.
 *
 *  THE LAST HEADING IS HANDLED. With `rootMargin` alone, a final section
 *  shorter than the viewport never crosses the line, so the rail sticks on the
 *  second-to-last entry for the rest of the article. The observer therefore
 *  tracks the last heading that has passed the line rather than the one
 *  currently inside it.
 *
 *  SHARING IS THREE LINKS AND A COPY BUTTON. No third-party share widget: each
 *  is a script from another origin that watches the page. Where the browser
 *  has a native share sheet — every phone — that is offered instead, because
 *  it reaches the apps the reader actually uses. */
export function ArticleAside({
  outline,
  url,
  title,
}: {
  outline: { id: string; text: string }[];
  /** Absolute URL of the article. Composed on the server from `site`, so the
   *  shared link is canonical rather than whatever host served the page. */
  url: string;
  title: string;
}) {
  const [active, setActive] = useState<string | null>(outline[0]?.id ?? null);

  useEffect(() => {
    if (outline.length === 0) return;
    const targets = outline
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    /* The trip line sits at the header's height. Everything above it has been
       read; the lowest heading above it is where the reader is. */
    const pick = () => {
      const line = 128;
      let current = targets[0].id;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };

    /* The observer is the trigger and the geometry read is the answer: the
       callback fires only when a heading crosses, and then one cheap pass
       decides which entry lights. That is a handful of reads per section
       rather than per frame. */
    const io = new IntersectionObserver(pick, {
      rootMargin: "-128px 0px 0px 0px",
      threshold: [0, 1],
    });
    targets.forEach((el) => io.observe(el));
    pick();
    return () => io.disconnect();
  }, [outline]);

  return (
    <div className="sticky top-28 flex flex-col gap-10">
      {outline.length >= 3 && (
        <nav aria-labelledby="article-contents">
          <p
            id="article-contents"
            className="font-display mb-4 text-[0.6875rem] font-extrabold uppercase tracking-[0.14em] text-ash"
          >
            In this note
          </p>
          <ul className="space-y-1">
            {outline.map((h) => {
              const on = active === h.id;
              return (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "group flex items-start gap-3 py-1.5 text-[0.82rem] leading-snug transition-colors duration-300",
                      on ? "text-snow" : "text-fog hover:text-snow",
                    )}
                  >
                    {/* The indicator is the rule, not a dot: it grows into the
                        active entry, which is the same gesture every hover on
                        this site uses. */}
                    <span
                      aria-hidden
                      className={cn(
                        "mt-[0.55em] h-px shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        on ? "w-6 bg-brand" : "w-2.5 bg-line group-hover:w-4 group-hover:bg-ash",
                      )}
                    />
                    <span className="min-w-0">{h.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <ArticleShare url={url} title={title} />
    </div>
  );
}

/* ------------------------------------------------------------------ share */

const ICONS: Record<string, string> = {
  /* Single-path marks, drawn rather than loaded: a share row is four icons and
     is not worth an icon font or four network requests. */
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11.5H3V9.5Zm6.5 0h3.8v1.6a4.2 4.2 0 0 1 3.7-1.9c2.7 0 4.5 1.7 4.5 5.2V21h-4v-6c0-1.5-.6-2.4-1.9-2.4-1.1 0-1.8.8-2.1 1.5V21h-4V9.5Z",
  x: "M17.5 3h3.2l-7 8 7.3 10h-5.3l-4.6-6.4L5.9 21H2.7l7.3-8.4L3 3h5.4l4.3 6 4.8-6Z",
  whatsapp:
    "M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A9.9 9.9 0 1 0 12 2Zm5.1 13.6c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1a10 10 0 0 1-4-2.7 8.4 8.4 0 0 1-1.8-3c-.2-.6 0-1.2.3-1.5l.6-.6c.2-.2.5-.2.7.1l1 1.7c.1.2.1.4 0 .6l-.4.5c-.1.2-.2.4 0 .6.4.7 1.5 1.9 2.6 2.4.2.1.4 0 .6-.1l.5-.6c.1-.2.4-.2.6-.1l1.7 1c.2.1.3.4.1.6Z",
};

/** Does this browser have a share sheet?
 *
 *  READ THROUGH useSyncExternalStore, for the reason spelled out at length in
 *  src/lib/useEnhanced.ts. `navigator` does not exist on the server, so any
 *  markup that branches on it renders one tree on the server and another on
 *  the client's first pass; React calls that a hydration mismatch and throws
 *  the whole island away, and on this site an island is an entire route.
 *  useSyncExternalStore's server snapshot is used both on the server AND during
 *  hydration, so the first client render always agrees with the HTML and the
 *  real value arrives as an ordinary update on the next one.
 *
 *  It also has no state to set in an effect, which is what the
 *  react-hooks/set-state-in-effect rule is asking for.
 *
 *  The subscribe is a no-op: a browser does not grow a share sheet mid-visit,
 *  so there is nothing to listen to. */
const subscribeNothing = () => () => {};

function useNativeShare(): boolean {
  return useSyncExternalStore(
    /* Passed straight through: it is a module-level constant, so it is already
       a stable reference and wrapping it in useCallback would be redundant. */
    subscribeNothing,
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
    () => false,
  );
}

function ArticleShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const nativeShare = useNativeShare();

  const links = [
    {
      key: "linkedin",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      key: "x",
      label: "Share on X",
      href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      key: "whatsapp",
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* A denied clipboard permission is not an error worth showing: the
         address bar still holds the URL. The button simply does not confirm. */
    }
  };

  return (
    <div>
      <p className="font-display mb-4 text-[0.6875rem] font-extrabold uppercase tracking-[0.14em] text-ash">
        Pass it on
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {links.map((l) => (
          <a
            key={l.key}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fog transition-colors duration-300 hover:border-brand hover:text-brand"
          >
            <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor" aria-hidden>
              <path d={ICONS[l.key]} />
            </svg>
          </a>
        ))}

        <button
          type="button"
          onClick={copy}
          className="flex h-9 items-center gap-2 rounded-full border border-line px-3.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-fog transition-colors duration-300 hover:border-brand hover:text-brand"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[14px] w-[14px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden
          >
            {copied ? <path d="m5 13 4 4L19 7" /> : <path d="M9 15a6 6 0 0 1 0-6l2-2a4 4 0 0 1 6 6l-1 1M15 9a6 6 0 0 1 0 6l-2 2a4 4 0 0 1-6-6l1-1" />}
          </svg>
          {/* aria-live so the confirmation is announced, not only drawn. */}
          <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
        </button>

        {nativeShare && (
          <button
            type="button"
            onClick={() => void navigator.share({ title, url }).catch(() => {})}
            className="flex h-9 items-center gap-2 rounded-full border border-line px-3.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-fog transition-colors duration-300 hover:border-brand hover:text-brand"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[14px] w-[14px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 16V4m0 0L8 8m4-4 4 4M5 14v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" />
            </svg>
            Share
          </button>
        )}
      </div>
    </div>
  );
}

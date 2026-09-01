import { Rise } from "@/components/fx/Reveal";

/** TikTok used as a search engine, drawn as one.
 *
 *  The section was a two-column split with a bulleted list on the right, which
 *  is the same shape as three other sections on this page. But this one is
 *  about a specific act: someone opens the app and types. It is the only place
 *  on the site where the subject is a search surface, so it is set as a search
 *  surface.
 *
 *  Nothing in the field is invented. The suggestions are the document's own
 *  list of what people compare, lifted out of its sentence and set as the
 *  suggestions they describe, with the sentence's own opening clause as their
 *  heading so nothing is said twice and no framing is lost. The field itself
 *  carries a caret and no query, because the document does not write one and a
 *  plausible-looking query is still a fabricated one.
 *
 *  Presentational, not a control. A real-looking input that does nothing is a
 *  trap for anyone using a keyboard or a screen reader, so the chrome is
 *  aria-hidden and what is underneath is an ordinary heading and list. */

/** Pulls the compare-list out of the document's sentence. Returns null if the
 *  sentence is ever rewritten without that shape, in which case the caller
 *  prints it whole and the surface simply loses its suggestions. */
function splitCompare(same: string) {
  const at = same.indexOf(" compare ");
  if (at < 0) return null;
  const rest = same.slice(at + 9);
  const dot = rest.indexOf(". ");
  if (dot < 0) return null;
  const items = rest.slice(0, dot).split(/,\s*|\s+and\s+/).filter(Boolean);
  if (items.length < 2) return null;
  return { lead: same.slice(0, at + 9), items, tail: rest.slice(dot + 2) };
}

/** The clause the panel below is a picture of. Marked in the scene so the
 *  story and the surface point at each other. */
const TYPING = "type in what they are looking for";

function markTyping(scene: string) {
  const at = scene.indexOf(TYPING);
  if (at < 0) return scene;
  return (
    <>
      {scene.slice(0, at)}
      <span className="text-brand">{TYPING}</span>
      {scene.slice(at + TYPING.length)}
    </>
  );
}

/** Splits "We use A, B and C to find..." and "...made clear through W, X, Y
 *  and Z." into their lead-in, their items and their tail, so the enumerations
 *  can be set as enumerations without the sentence being retyped or repeated.
 *  Returns null if the copy is ever rewritten without that shape, in which case
 *  the caller prints the paragraph whole. */
function splitRun(sentence: string, after: string, before?: string) {
  const at = sentence.indexOf(after);
  if (at < 0) return null;
  const from = at + after.length;
  const to = before ? sentence.indexOf(before, from) : sentence.length;
  if (to < 0) return null;
  const items = sentence
    .slice(from, to)
    .replace(/\.$/, "")
    .split(/,\s|\sand\s/)
    .filter(Boolean);
  if (items.length < 2) return null;
  return { lead: sentence.slice(0, from), items, tail: sentence.slice(to) };
}

/** The method sentence carries the section's actual mechanism: three places we
 *  look, and four places the answer is made legible. As one grey paragraph
 *  none of that is visible. */
function splitMethod(method: string) {
  const [first, second] = method.split(/(?<=\.)\s+(?=The topic)/);
  if (!second) return null;
  const input = splitRun(first, "We use ", " to find");
  const output = splitRun(second, "made clear through ");
  return input && output ? { input, output } : null;
}

export function SearchSurface({
  scene,
  same,
  google,
  adds,
  method,
  examplesLead,
  examples,
  profile,
  caveat,
}: {
  scene: string;
  same: string;
  google: string;
  adds: string;
  method: string;
  examplesLead: string;
  examples: string[];
  profile: string;
  caveat: string;
}) {
  const compare = splitCompare(same);
  const mechanism = splitMethod(method);

  return (
    <div>
      {/* The scene the document opens on.
          Stepped down from display-xl. At 60px this sentence ran four lines of
          uppercase and became the loudest thing in the section, which put it in
          competition with the surface underneath it for no reason: the panel is
          what the section is for, and the scene is the setup that walks into
          it. Set as a lede, with the one clause the panel actually depicts
          picked out, the two read as a single move instead of two slabs. */}
      <Rise>
        <p className="font-display text-[clamp(1.15rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.18] tracking-tight text-snow">
          {markTyping(scene)}
        </p>
      </Rise>

      {/* The surface. */}
      <Rise delay={0.12} className="mt-10">
        <div className="overflow-hidden rounded-[1.5rem] border border-line bg-ink-2">
          {/* The field. */}
          <div
            aria-hidden
            className="flex items-center gap-4 border-b border-line px-6 py-4 sm:px-8 sm:py-5"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-ash"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            {/* A caret and nothing else. The document does not write the query,
                so neither does the page. */}
            <span className="h-6 w-px animate-pulse bg-brand sm:h-7" />
            <span className="flex-1" />
            <span className="font-display hidden text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-ash sm:block">
              TikTok search
            </span>
          </div>

          {/* The suggestions: the document's own compare-list. */}
          <div className="px-6 py-6 sm:px-8 sm:py-6">
            {compare ? (
              <>
                <p className="text-sm leading-relaxed text-fog">{compare.lead}</p>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {compare.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-center gap-2.5 rounded-full border border-line bg-ink-3/60 px-4 py-2 transition-colors duration-300 hover:border-brand/50"
                    >
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="h-3 w-3 shrink-0 text-ash transition-colors duration-300 group-hover:text-brand"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="M20 20l-3.5-3.5" />
                      </svg>
                      <span className="text-sm text-snow">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 max-w-2xl leading-relaxed text-fog">{compare.tail}</p>
              </>
            ) : (
              <p className="max-w-2xl leading-relaxed text-fog sm:text-lg">{same}</p>
            )}
          </div>

          {/* What the brand publishes into that surface. */}
          <div className="border-t border-line bg-ink-3/40 px-6 py-6 sm:px-8 sm:py-7">
            <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-brand-text">
              {examplesLead}
            </p>
            <ol className="mt-5 grid gap-x-12 sm:grid-cols-2">
              {examples.map((ex, i) => (
                <li key={ex} className="group border-t border-line">
                  <div className="flex items-start gap-4 py-3">
                    {/* A vertical frame, because every one of these is a
                        vertical video. Carries the index rather than standing
                        in as an empty picture. */}
                    <span
                      aria-hidden
                      className="font-display mt-0.5 flex h-8 w-[1.125rem] shrink-0 items-center justify-center rounded-[0.25rem] border border-line text-[0.55rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:border-brand/60 group-hover:text-brand-text"
                    >
                      {i + 1}
                    </span>
                    <p className="leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow">
                      {ex}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Rise>

      {/* The two places people look. The document is explicit that this is an
          addition and not a replacement ("TikTok adds another point of
          discovery"), so the two are set as a pair joined by a plus rather than
          as a comparison: nothing here says one beats the other, and the old
          single line, with Google greyed and TikTok in brand, implied it did. */}
      <Rise delay={0.18} className="mt-10">
        <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.35fr)] lg:gap-0">
          <div className="rounded-[1.25rem] border border-line bg-ink-2 p-6 lg:rounded-r-none">
            <p className="font-display text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-ash">
              Already
            </p>
            <p className="font-display mt-3 text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.18] tracking-tight text-snow">
              {google}
            </p>
          </div>

          <div
            aria-hidden
            className="flex items-center justify-center lg:w-14"
          >
            <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-none text-brand">
              +
            </span>
          </div>

          <div className="rounded-[1.25rem] border border-brand/45 bg-brand/[0.06] p-6 lg:rounded-l-none">
            <p className="font-display text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-brand-text">
              And also
            </p>
            <p className="font-display mt-3 text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.18] tracking-tight text-snow">
              {adds}
            </p>
          </div>
        </div>
      </Rise>

      {/* The mechanism. Three places we look, four places the answer is made
          legible: both are enumerations the source writes into one paragraph,
          where neither is visible. The lead-in and the tail stay wrapped around
          them so the sentence is still the sentence. */}
      <Rise delay={0.24} className="mt-10">
        {mechanism ? (
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
            {[mechanism.input, mechanism.output].map((run, side) => (
              <div key={side}>
                <p className="leading-relaxed text-fog sm:text-lg">{run.lead}</p>
                <ol className="mt-4 border-t border-line">
                  {run.items.map((item) => (
                    <li key={item} className="group border-b border-line">
                      <div className="flex items-baseline gap-4 py-3">
                        <span
                          aria-hidden
                          className={
                            side === 0
                              ? "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70 transition-colors duration-500 group-hover:bg-brand"
                              : "mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-ash transition-colors duration-500 group-hover:bg-brand"
                          }
                        />
                        <p className="font-display text-[clamp(0.98rem,1.7vw,1.2rem)] font-bold uppercase leading-[1.22] tracking-tight text-snow">
                          {item}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                {run.tail.trim() && (
                  <p className="mt-4 leading-relaxed text-fog">{run.tail.trim()}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">{method}</p>
        )}
      </Rise>

      {/* What the profile does with the traffic, and the check before any of
          this is planned around. */}
      <Rise delay={0.3} className="mt-9 border-t border-line pt-8">
        <div className="grid gap-x-14 gap-y-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <p className="leading-relaxed text-snow sm:text-lg">{profile}</p>
          <p className="border-l-2 border-brand/50 pl-5 leading-relaxed text-fog">{caveat}</p>
        </div>
      </Rise>
    </div>
  );
}

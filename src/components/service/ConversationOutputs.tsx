import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Six drawings, one per conversational AI service.
 *
 *  ONE PICTURE PER SUBJECT. A single drawing that only changes state cannot
 *  depict a chatbot on a website AND a voice call AND a reviewed knowledge base:
 *  it collapses into the one abstract shape all six share, which is the failure
 *  this project has already named. So each service gets its own, and each
 *  answers exactly one question about itself, in that service's own words.
 *
 *  NOTHING IS TRANSCRIBED. No drawing here puts words in a customer's mouth or
 *  invents a business's answer. Messages are bars, the knowledge base holds
 *  sources rather than facts, and the calendar carries no dates. The document
 *  gives no volumes, accuracy rates or timings, so none appear.
 *
 *  THE HUMAN EDGE IS IN EVERY ONE. Each service's second paragraph names the
 *  point where a person takes over, and every drawing marks it: a handover
 *  arrow, an escalation route, a request that needs approval. That boundary is
 *  what this page sells, so no drawing is allowed to omit it. */
export function ConversationOutputs({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  const panel = () => {
    switch (active) {
      case 0:
        return <SiteChat />;
      case 1:
        return <VoiceCall />;
      case 2:
        return <ServiceRoute />;
      case 3:
        return <KnowledgeSources />;
      case 4:
        return <BookingSlots />;
      default:
        return <MessagingThread />;
    }
  };

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      <div className="flex gap-5">
        <div className="flex shrink-0 flex-col gap-3 pt-1">
          {Array.from({ length: count }).map((_, i) => pin(i))}
        </div>
        <div className="min-h-[19rem] flex-1">{panel()}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ parts -- */

/** A message, as a bar. Never as words: the document does not script one. */
function Bar({ w, tone = "soft" }: { w: string; tone?: "soft" | "firm" | "brand" }) {
  const bg = tone === "brand" ? "bg-brand" : tone === "firm" ? "bg-snow/40" : "bg-snow/22";
  return <span className={`block h-1.5 rounded-full ${bg}`} style={{ width: w }} />;
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ash">
      {children}
    </p>
  );
}

/* ----------------------------------------------------------------- 01 chat -- */

/** Where it lives: a website. And what it does there: guides the customer
 *  "towards the right answer or next action". */
function SiteChat() {
  return (
    <div>
      <div className="rounded-xl border border-line bg-ink-2 p-3">
        {/* The page it sits on. */}
        <div className="flex items-center gap-1.5 border-b border-line pb-2.5">
          <span className="h-2 w-2 rounded-full bg-ash/40" />
          <span className="h-2 w-2 rounded-full bg-ash/40" />
          <span className="ml-2 h-1.5 flex-1 rounded-full bg-line" />
        </div>

        <div className="flex gap-3 pt-3">
          <div className="flex-1 space-y-2 pt-1">
            <Bar w="86%" />
            <Bar w="64%" />
            <Bar w="74%" />
          </div>

          {/* The chat panel, in the corner it actually occupies. */}
          <div className="w-[46%] shrink-0 rounded-lg border border-brand/50 bg-ink-3 p-2.5">
            <div className="space-y-2">
              <span className="ml-auto block h-4 w-[70%] rounded-md rounded-br-sm bg-snow/15" />
              <span className="block h-4 w-[82%] rounded-md rounded-bl-sm bg-brand/15" />
              <span className="ml-auto block h-4 w-[54%] rounded-md rounded-br-sm bg-snow/15" />
            </div>
            {/* The next action, which is where the conversation is headed. */}
            <span className="mt-2.5 block h-4 w-full rounded-full bg-brand" />
          </div>
        </div>
      </div>
      <Caption>Answer, then the next action</Caption>
    </div>
  );
}

/* ---------------------------------------------------------------- 02 voice -- */

/** A call that is answered, and the transfer that ends some of them. */
function VoiceCall() {
  const bars = [5, 11, 7, 15, 9, 18, 12, 8, 14, 6, 16, 10, 13, 7, 11];
  return (
    <div>
      <div className="rounded-xl border border-line bg-ink-2 p-4">
        {/* An incoming call. */}
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" aria-hidden>
            <path
              d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
              stroke="var(--color-brand)"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          <span className="h-1.5 flex-1 rounded-full bg-snow/25" />
        </div>

        {/* Spoken conversation. */}
        <div className="mt-5 flex h-12 items-center justify-between gap-1">
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-[3px] shrink-0 rounded-full bg-ash/55"
              style={{ height: `${h * 2}px` }}
            />
          ))}
        </div>

        {/* "direct calls to the correct person or department" */}
        <div className="mt-5 border-t border-line pt-4">
          <div className="flex items-center gap-3">
            <span className="h-0.5 flex-1 bg-ash/45" />
            <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" aria-hidden>
              <path
                d="M3 10h11m-4-4 4 4-4 4"
                stroke="var(--color-brand)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="h-7 w-7 shrink-0 rounded-full border-2 border-brand" />
          </div>
        </div>
      </div>
      <Caption>Answered, or put through</Caption>
    </div>
  );
}

/* -------------------------------------------------------------- 03 service -- */

/** What the agent takes, and what it hands on. The document draws the split
 *  itself: routine enquiries one way, "complaints, exceptions, sensitive
 *  matters and requests needing judgement" the other. */
function ServiceRoute() {
  return (
    <div>
      <div className="rounded-xl border border-line bg-ink-2 p-4">
        <div className="space-y-2.5">
          <Bar w="78%" />
          <Bar w="58%" />
        </div>

        {/* The fork. */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-line bg-ink-3 p-3">
            <span className="mb-2.5 block h-0.5 w-6 bg-ash" />
            <div className="space-y-2">
              <Bar w="90%" />
              <Bar w="72%" />
              <Bar w="84%" />
            </div>
            {/* A ticket created, or a system updated. */}
            <span className="mt-3 block h-3 w-full rounded-sm border border-ash/50" />
          </div>

          <div className="rounded-lg border border-brand/55 bg-ink-3 p-3">
            <span className="mb-2.5 block h-0.5 w-6 bg-brand" />
            <div className="space-y-2">
              <Bar w="86%" tone="firm" />
              <Bar w="64%" tone="firm" />
            </div>
            {/* Passed to a person, with what was collected attached. */}
            <div className="mt-3 flex items-center gap-2">
              <span className="h-5 w-5 rounded-full border-2 border-brand" />
              <span className="h-0.5 flex-1 bg-brand" />
            </div>
          </div>
        </div>
      </div>
      <Caption>Routine, or transferred</Caption>
    </div>
  );
}

/* ------------------------------------------------------------ 04 knowledge -- */

/** Sources going in, and the review they pass through first: "reviewed for
 *  gaps, conflicts, and outdated material before it is added". */
function KnowledgeSources() {
  /** The middle one is the outdated one. It does not reach the base. */
  const SOURCES = [0, 1, 2, 3, 4];
  const STALE = 2;
  return (
    <div>
      <div className="rounded-xl border border-line bg-ink-2 p-4">
        <div className="flex items-stretch gap-4">
          <div className="w-[42%] shrink-0 space-y-2">
            {SOURCES.map((i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${
                  i === STALE ? "border-ash/40 opacity-50" : "border-line"
                }`}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm border border-ash/60" />
                <span className="h-1 flex-1 rounded-full bg-snow/22" />
              </div>
            ))}
          </div>

          {/* The review each one crosses. */}
          <div className="relative flex w-8 shrink-0 flex-col justify-around">
            {SOURCES.map((i) => (
              <svg key={i} viewBox="0 0 32 12" className="h-3 w-full" fill="none" aria-hidden>
                <path
                  d="M2 6 H26"
                  stroke={i === STALE ? "var(--color-ash)" : "var(--color-brand)"}
                  strokeWidth="1.6"
                  strokeDasharray={i === STALE ? "3 3" : undefined}
                  strokeLinecap="round"
                />
                {i !== STALE && (
                  <path
                    d="M22 2.5 26 6 22 9.5"
                    stroke="var(--color-brand)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            ))}
          </div>

          {/* What the agent is allowed to answer from. */}
          <div className="flex-1 rounded-lg border border-brand/55 bg-ink-3 p-3">
            <div className="space-y-2">
              <Bar w="88%" tone="firm" />
              <Bar w="70%" />
              <Bar w="80%" />
              <Bar w="62%" />
            </div>
            {/* "escalate when a reliable answer is unavailable" */}
            <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
              <span className="h-4 w-4 shrink-0 rounded-full border-2 border-brand" />
              <span className="h-0.5 flex-1 bg-brand/60" />
            </div>
          </div>
        </div>
      </div>
      <Caption>Reviewed before it is answerable</Caption>
    </div>
  );
}

/* -------------------------------------------------------------- 05 booking -- */

/** From an enquiry to a confirmed slot, with the rules that decide which slots
 *  exist and which requests need a person. */
function BookingSlots() {
  /** Availability comes from the connected calendar, so some slots are simply
   *  not there. Nothing here is a date: the document names none. */
  const GRID = [
    [1, 1, 0, 1, 1],
    [1, 0, 1, 1, 0],
    [0, 1, 1, 2, 1],
  ];
  return (
    <div>
      <div className="rounded-xl border border-line bg-ink-2 p-4">
        <div className="space-y-2.5">
          <Bar w="72%" />
          <Bar w="50%" />
        </div>

        <div className="mt-5 space-y-2">
          {GRID.map((row, r) => (
            <div key={r} className="flex gap-2">
              {row.map((slot, c) => (
                <span
                  key={c}
                  className={`h-7 flex-1 rounded-md border ${
                    slot === 2
                      ? "border-brand bg-brand/12"
                      : slot === 1
                        ? "border-line bg-ink-3"
                        : "border-dashed border-line"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Confirmed, and the requests that still need approval. */}
        <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
          <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" aria-hidden>
            <path
              d="M4 10.5 8 14.5 16 5.5"
              stroke="var(--color-brand)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="h-0.5 flex-1 bg-brand/50" />
          <span className="h-6 w-6 shrink-0 rounded-full border-2 border-ash/60" />
        </div>
      </div>
      <Caption>Booked, unless a person decides</Caption>
    </div>
  );
}

/* ------------------------------------------------------------ 06 messaging -- */

/** The channel's own shape, and the thing that governs it: approved templates
 *  and platform permissions, which the document insists are settled first. */
function MessagingThread() {
  return (
    <div>
      <div className="flex items-stretch gap-4 rounded-xl border border-line bg-ink-2 p-4">
        {/* The handset. */}
        <div className="w-[40%] shrink-0 rounded-[0.9rem] border border-line bg-ink-3 p-2.5">
          <span className="mx-auto mb-2.5 block h-1 w-8 rounded-full bg-ash/40" />
          <div className="space-y-2">
            <span className="block h-4 w-[74%] rounded-md rounded-bl-sm bg-snow/15" />
            <span className="ml-auto block h-4 w-[66%] rounded-md rounded-br-sm bg-brand/18" />
            <span className="block h-4 w-[82%] rounded-md rounded-bl-sm bg-snow/15" />
            <span className="ml-auto block h-4 w-[58%] rounded-md rounded-br-sm bg-brand/18" />
          </div>
        </div>

        {/* What is allowed on it, agreed before development begins. */}
        <div className="flex-1 space-y-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-line px-2.5 py-2">
              <span className="mb-1.5 block h-0.5 w-5 bg-brand/60" />
              <span className="block h-1 w-[80%] rounded-full bg-snow/20" />
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-md border border-brand/55 px-2.5 py-2">
            <span className="h-4 w-4 shrink-0 rounded-full border-2 border-brand" />
            <span className="h-0.5 flex-1 bg-brand/60" />
          </div>
        </div>
      </div>
      <Caption>Approved templates, and a way out</Caption>
    </div>
  );
}

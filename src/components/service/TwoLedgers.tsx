"use client";

import { useState } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

/** Two reports that answer different questions, drawn as two instruments.
 *
 *  WHY TWO FACES AND NOT TWO COLUMNS OF TEXT. The document's claim is that the
 *  two reports are not comparable, and two matching columns quietly say the
 *  opposite: same shape, same length, therefore same kind of thing. So each
 *  report is drawn as its own instrument face, and the faces are not alike.
 *  Page-management reporting names six things it can show; paid reporting names
 *  eight. Six marks and eight marks, in that order, taken straight from the two
 *  sentences and counted from them -- which is also why nothing here is a
 *  figure: the document supplies no measurements at all, and an axis would
 *  invent one.
 *
 *  NOTHING CROSSES THE GAP. The rule between the two faces is drawn open and
 *  broken rather than as a divider with a total underneath, because the whole
 *  point of the section is that these two sets are not added together.
 *
 *  THE CASE UNDERNEATH IS ONE READING WITH TWO VERDICTS. The document's example
 *  is a single quantity that passes one test and fails another, so it is drawn
 *  once and judged twice. Pointing at either verdict lights the half of the
 *  sentence it belongs to; both halves are always legible.
 *
 *  MOTION. Transitions on transform and colour only, all of them cancelled
 *  under prefers-reduced-motion. Every mark is drawn in its resting state, so
 *  a browser that never animates loses nothing. */

type MarkKind =
  | "cadence"
  | "spread"
  | "views"
  | "engagement"
  | "clicks"
  | "questions"
  | "impressions"
  | "landing"
  | "leads"
  | "purchases"
  | "cost"
  | "return";

/** One mark per thing the sentence beside it names, in the sentence's order. */
const ORGANIC_MARKS: MarkKind[] = [
  "cadence",
  "spread",
  "views",
  "engagement",
  "clicks",
  "questions",
];
const PAID_MARKS: MarkKind[] = [
  "impressions",
  "spread",
  "clicks",
  "landing",
  "leads",
  "purchases",
  "cost",
  "return",
];

const LABEL: Record<MarkKind, string> = {
  cadence: "Posts published at a steady rhythm",
  spread: "Reach spreading outward",
  views: "A video part-way through",
  engagement: "Reactions gathering on a post",
  clicks: "A link leaving for somewhere else",
  questions: "A question arriving",
  impressions: "A field of placements, most of them unlit",
  landing: "A page arrived at",
  leads: "A completed form",
  purchases: "A purchase",
  cost: "A cost set against one result",
  return: "Spend returning",
};

function Mark({ kind }: { kind: MarkKind }) {
  switch (kind) {
    case "cadence":
      return (
        <>
          <path d="M6 34h44" className="stroke-ash" strokeWidth="1.4" />
          <rect x="10" y="16" width="6" height="18" rx="2" className="fill-brand" />
          <rect x="21" y="20" width="6" height="14" rx="2" className="fill-brand/70" />
          <rect x="32" y="14" width="6" height="20" rx="2" className="fill-brand" />
          <rect x="43" y="22" width="6" height="12" rx="2" className="fill-brand/70" />
        </>
      );
    case "spread":
      return (
        <>
          <circle cx="14" cy="24" r="4.5" className="fill-brand" />
          <path d="M22 14a14 14 0 010 20" fill="none" className="stroke-brand" strokeWidth="1.6" />
          <path d="M30 8a22 22 0 010 32" fill="none" className="stroke-brand/60" strokeWidth="1.6" />
          <path d="M38 3a30 30 0 010 42" fill="none" className="stroke-ash" strokeWidth="1.5" />
        </>
      );
    case "views":
      return (
        <>
          <rect x="6" y="10" width="44" height="26" rx="4" fill="none" className="stroke-ash" strokeWidth="1.6" />
          <path d="M24 17l11 6-11 6z" className="fill-brand" />
          <path d="M6 42h30" className="stroke-brand" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M36 42h14" className="stroke-line" strokeWidth="2.4" strokeLinecap="round" />
        </>
      );
    case "engagement":
      return (
        <>
          <rect x="6" y="8" width="44" height="22" rx="4" fill="none" className="stroke-ash" strokeWidth="1.6" />
          <circle cx="17" cy="38" r="6" className="fill-brand" />
          <circle cx="28" cy="38" r="6" className="fill-brand/60" />
          <circle cx="39" cy="38" r="6" className="fill-brand/35" />
        </>
      );
    case "clicks":
      return (
        <>
          <rect x="4" y="12" width="26" height="24" rx="4" fill="none" className="stroke-ash" strokeWidth="1.6" />
          <path d="M20 24h26m-8-8l8 8-8 8" fill="none" className="stroke-brand" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "questions":
      return (
        <>
          <path
            d="M8 12a4 4 0 014-4h32a4 4 0 014 4v16a4 4 0 01-4 4H24l-9 8v-8h-3a4 4 0 01-4-4z"
            fill="none"
            className="stroke-ash"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M24 15a4 4 0 116 3.5c-1.6 1-2 1.8-2 3.2" fill="none" className="stroke-brand" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="26" r="1.6" className="fill-brand" />
        </>
      );
    case "impressions":
      return (
        <>
          {[0, 1, 2, 3].map((c) =>
            [0, 1, 2].map((r) => (
              <rect
                key={c + "-" + r}
                x={6 + c * 12}
                y={10 + r * 10}
                width="9"
                height="7"
                rx="1.6"
                className={c === 1 && r === 1 ? "fill-brand" : "fill-ash/35"}
              />
            )),
          )}
        </>
      );
    case "landing":
      return (
        <>
          <path d="M10 6h26l10 10v26H10z" fill="none" className="stroke-ash" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M36 6v10h10" fill="none" className="stroke-ash" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M28 20v12m-5-5l5 5 5-5" fill="none" className="stroke-brand" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "leads":
      return (
        <>
          <rect x="8" y="6" width="34" height="36" rx="4" fill="none" className="stroke-ash" strokeWidth="1.6" />
          <rect x="14" y="14" width="22" height="4" rx="2" className="fill-fog/40" />
          <rect x="14" y="22" width="16" height="4" rx="2" className="fill-fog/30" />
          <path d="M15 33l4 4 9-10" fill="none" className="stroke-brand" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "purchases":
      return (
        <>
          <path d="M10 16h30l-3 26H13z" fill="none" className="stroke-brand" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M20 18v-4a5 5 0 0110 0v4" fill="none" className="stroke-ash" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "cost":
      return (
        <>
          <circle cx="16" cy="16" r="8" fill="none" className="stroke-ash" strokeWidth="1.7" />
          <path d="M6 32h38" className="stroke-brand" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="26" y="34" width="14" height="10" rx="2.5" fill="none" className="stroke-brand" strokeWidth="1.7" />
        </>
      );
    case "return":
      return (
        <>
          <path
            d="M12 32a14 14 0 1114 12"
            fill="none"
            className="stroke-brand"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M26 44l-7-5m7 5l-7 5" fill="none" className="stroke-brand" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="32" r="3.4" className="fill-ash/60" />
        </>
      );
  }
}

function Face({ marks, cols }: { marks: MarkKind[]; cols: number }) {
  return (
    <ul
      className="grid gap-px overflow-hidden rounded-xl border border-line bg-line"
      style={{ gridTemplateColumns: "repeat(" + cols + ", minmax(0, 1fr))" }}
    >
      {marks.map((m, i) => (
        <li
          key={m + i}
          className="group flex items-center justify-center bg-ink-3 px-2 py-4 transition-colors duration-400 hover:bg-brand/[0.07] motion-reduce:transition-none"
        >
          <svg
            viewBox="0 0 56 48"
            role="img"
            aria-label={LABEL[m]}
            className="h-9 w-11 transition-transform duration-400 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
          >
            <Mark kind={m} />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export function TwoLedgers({
  claim,
  organic,
  organicTerm,
  paid,
  paidTerm,
  agreement,
  caseUseful,
  caseInsufficient,
}: {
  claim: string;
  organic: string;
  organicTerm: string;
  paid: string;
  paidTerm: string;
  agreement: string;
  /** The half of the worked case that passes, and the half that fails. */
  caseUseful: string;
  caseInsufficient: string;
}) {
  const [verdict, setVerdict] = useState<"useful" | "insufficient" | null>(null);

  return (
    <div>
      <Rise>
        <p className="statement font-display max-w-4xl font-extrabold uppercase leading-[1.14] text-snow">
          {claim}
        </p>
      </Rise>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1.2fr)] lg:gap-0">
        <Rise className="lg:pr-12">
          <Face marks={ORGANIC_MARKS} cols={3} />
          <p className="mt-7 leading-relaxed text-fog">
            <Marked text={organic} mark={organicTerm} className="font-display font-extrabold uppercase text-snow" />
          </p>
        </Rise>

        {/* Open, and broken: nothing is carried across it. */}
        <div aria-hidden className="hidden lg:block">
          <div className="mx-auto h-full w-px bg-[repeating-linear-gradient(to_bottom,var(--color-line)_0_10px,transparent_10px_22px)]" />
        </div>

        <Rise delay={0.08} className="lg:pl-12">
          <Face marks={PAID_MARKS} cols={4} />
          <p className="mt-7 leading-relaxed text-fog">
            <Marked text={paid} mark={paidTerm} className="font-display font-extrabold uppercase text-snow" />
          </p>
        </Rise>
      </div>

      {/* One reading, two verdicts. */}
      <div className="mt-14 border-t border-line pt-10">
        <Rise>
          <p className="font-display max-w-3xl text-[clamp(1.1rem,2.1vw,1.55rem)] font-extrabold uppercase leading-[1.16] text-snow">
            {agreement}
          </p>
        </Rise>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
          <Rise>
            <svg viewBox="0 0 380 150" role="img" aria-label="One set of reactions, read twice: enough for one test, short of the other." className="w-full">
              {/* The reading: counted once, judged twice. */}
              {Array.from({ length: 9 }).map((_, i) => (
                <circle key={i} cx={64 + i * 28} cy="30" r="8" className="fill-brand/70" />
              ))}
              <path d="M56 46v14h268V46" fill="none" className="stroke-line" strokeWidth="1.4" />
              <path d="M190 60v16" className="stroke-line" strokeWidth="1.4" />
              <path d="M96 76h188" className="stroke-line" strokeWidth="1.4" />
              <path d="M96 76v12M284 76v12" className="stroke-line" strokeWidth="1.4" />

              <g
                className={cn(
                  "transition-opacity duration-400 motion-reduce:transition-none",
                  verdict === "insufficient" ? "opacity-35" : "opacity-100",
                )}
              >
                <rect x="52" y="90" width="88" height="46" rx="9" className="fill-brand/[0.08] stroke-brand" strokeWidth="1.6" />
                <path d="M84 113l6 7 14-16" fill="none" className="stroke-brand" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <g
                className={cn(
                  "transition-opacity duration-400 motion-reduce:transition-none",
                  verdict === "useful" ? "opacity-35" : "opacity-100",
                )}
              >
                <rect x="240" y="90" width="88" height="46" rx="9" fill="none" className="stroke-ash" strokeWidth="1.6" strokeDasharray="6 6" />
                <path d="M274 105l20 20m0-20l-20 20" fill="none" className="stroke-ash" strokeWidth="2.4" strokeLinecap="round" />
              </g>
            </svg>
          </Rise>

          <Rise delay={0.08}>
            <p className="text-lg leading-relaxed">
              <span
                onPointerEnter={() => setVerdict("useful")}
                onPointerLeave={() => setVerdict(null)}
                className={cn(
                  "transition-colors duration-300 motion-reduce:transition-none",
                  verdict === "useful" ? "text-brand" : "text-snow",
                )}
              >
                {caseUseful}
              </span>{" "}
              <span
                onPointerEnter={() => setVerdict("insufficient")}
                onPointerLeave={() => setVerdict(null)}
                className={cn(
                  "transition-colors duration-300 motion-reduce:transition-none",
                  verdict === "insufficient" ? "text-brand" : "text-fog",
                )}
              >
                {caseInsufficient}
              </span>
            </p>
          </Rise>
        </div>
      </div>
    </div>
  );
}

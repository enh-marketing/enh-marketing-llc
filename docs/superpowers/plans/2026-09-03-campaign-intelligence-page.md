# Campaign Intelligence Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/ai-hub/campaign-intelligence`, the second AI Hub page, built from the client document verbatim with the same architecture and quality as `/ai-hub/ai-automation`.

**Architecture:** One Astro route owns the head and Service JSON-LD; one React island (`page-bodies/ai-hub-campaign-intelligence.tsx`) renders the body; one content file carries every string. Existing components (`ServiceHero`, `Narrative`, `PinnedExplorer`, `LaunchTrack`, `GrowthCta`, `Work`, `FaqList`, `CtaBand`, `Insights`, `StickyCTABar`) are reused; four new components (`BudgetSplit`, `CampaignPhases`, `DataRange`, `SplitStatement`, `CampaignMark`) and nine new glyphs carry the content-specific drawings.

**Tech Stack:** Astro 7, React 19, Tailwind v4, GSAP 3 + ScrollTrigger, motion/react (framer-motion), TypeScript.

**Testing:** The repo has no unit-test runner. Each task's check is `npm run check` (astro + TypeScript), `npm run lint` (ESLint; the two pre-existing errors in Preloader and ThemeToggle are the only allowed failures), and, once the route exists, `npm run check:routes` and `npm run build`. Visual and behavioural verification is a Playwright script in the final task. Per the client's instruction the work is one commit at the end, so per-task commit steps are replaced by a `git status` sanity check.

Spec: `docs/superpowers/specs/2026-09-03-campaign-intelligence-page-design.md`.

---

## File map

| File | Responsibility |
| --- | --- |
| `src/content/services/campaign-intelligence.ts` | Every string on the page, verbatim from the document, plus cited phase flags |
| `src/components/service/CapabilityGlyph.tsx` | Add nine glyph variants used by the covers items and process steps |
| `src/components/service/CampaignMark.tsx` | Four bespoke section marks |
| `src/components/service/BudgetSplit.tsx` | Hero visual: one budget dividing into five channels |
| `src/components/service/CampaignPhases.tsx` | PinnedExplorer diagram: three campaign phases lit by the active item |
| `src/components/service/PinnedExplorer.tsx` | Add `phases` diagram kind and `markNode` prop |
| `src/components/service/LaunchTrack.tsx` | Make the actor pill optional |
| `src/components/service/FaqList.tsx` | Accept a multi-paragraph answer |
| `src/components/service/DataRange.tsx` | Section 03: inputs that tighten the range |
| `src/components/service/SplitStatement.tsx` | Section 06: two panels either side of a rule that draws on scroll |
| `src/page-bodies/ai-hub-campaign-intelligence.tsx` | The page body island |
| `src/pages/ai-hub/campaign-intelligence.astro` | Route, head, Service JSON-LD |
| `src/lib/sitemap.ts` | Route joins `BUILT`; AI Hub child becomes internal |

---

### Task 1: Content file

**Files:**
- Create: `src/content/services/campaign-intelligence.ts`

- [ ] **Step 1: Write the file**

```ts
// Campaign Intelligence — page content.
// Copy source: "Campaign Intelligence.docx" (client-supplied). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
//
// THREE DEPARTURES FROM THE SOURCE, all agreed with the client on 2026-09-03:
//
//   1. The mid-page CTA reads "Book A Consultation" in the document. It is
//      rendered "Book a Consultation" here, capital A normalised, nothing else.
//   2. The mid-page CTA band needs a heading, a support line and a button, and
//      the document supplies only the label. The support line is the closing
//      block's own first sentence ("Tell us what the campaign needs to
//      achieve..."), borrowed rather than written.
//   3. The second paragraph of "How ENH Helps" is typeset in two pieces so its
//      final sentence can stand alone at display scale. The words are unchanged
//      and adjacent.
//
// NO PROOF SECTION. The document has no case-study or results section, and none
// is invented. Work and Insights on the page are the site's shared sections.
//
// NO FIGURES. The document refuses guaranteed numbers, benchmarks and accuracy
// percentages, and every drawing on the page carries none. The only numbers in
// the copy are the document's own worked example in FAQ 11, kept verbatim.
//
// PHASES. Each covered item carries the campaign phase(s) its own description
// puts it in — before spend, live, after — cited against the sentence it was
// read from. Nothing is inferred from an item's name.
//
// FORM. The document specifies no fields; the standard site-wide set applies
// (team direction 2026-09-02). The Services dropdown carries no AI Hub option;
// the client chose to leave it unchanged and has been told.

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";
import type { Phase } from "@/components/service/CampaignPhases";

export const meta = {
  title: "Campaign Intelligence in Dubai | ENH Marketing",
  // The banner's first sentence, verbatim.
  description:
    "ENH Marketing helps UAE businesses plan campaign budgets using historical performance, relevant benchmarks and forecast ranges.",
};

/** The channels the document names in Media Mix Planning, in its order, and
 *  the key each one has in the ChannelIcon set (whose keys are the paid-media
 *  product names). Only `name` is ever printed. */
export type Channel = { name: string; icon: string };

export const hero = {
  lines: ["Campaign", "Intelligence", "in Dubai"] as [string, string, string],
  sub: "ENH Marketing helps UAE businesses plan campaign budgets using historical performance, relevant benchmarks and forecast ranges. We estimate what a budget could produce, recommend how it should be divided between channels, and monitor whether the campaign is performing within the expected range.",
  primary: "Book a Campaign Intelligence Diagnostic",
  secondary: "Talk to the Team",
  channels: [
    { name: "Google", icon: "Google Ads" },
    { name: "Meta", icon: "Meta Ads" },
    { name: "LinkedIn", icon: "LinkedIn Ads" },
    { name: "TikTok", icon: "TikTok Ads" },
    { name: "YouTube", icon: "YouTube Ads" },
  ] as Channel[],
};

/** "What We Do". Two paragraphs. The first sentence leads as the question, the
 *  rest of the first paragraph is the decoded body, the second paragraph
 *  follows as the outro. */
export const narrative = {
  heading: ["What", "We Do"] as [string, string],
  question:
    "Campaign intelligence gives marketing teams a clearer basis for planning and reviewing paid media.",
  questionEmphasis: "planning and reviewing paid media",
  body: "Before the campaign begins, we assess the objective, budget, audience, channels, and available performance data. We then prepare forecast ranges for the metrics that matter to the business.",
  highlight: ["objective", "budget", "audience", "channels", "forecast", "ranges"],
  outro: [
    "Once the campaign is running, actual results are compared with the forecast. This helps identify problems early and supports better budget decisions. The service is customised to the business, category, campaign objective and quality of available data.",
  ],
  primary: "Book a Campaign Intelligence Diagnostic",
  secondary: "Talk to the Team",
};

export type Covered = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Which phase(s) of a campaign the item's own description places it in. */
  phases: Phase[];
  /** The words the flag is read from. */
  phaseSource: string;
};

export const covers = {
  title: "What Campaign",
  strokeTitle: "Intelligence Covers",
  items: [
    {
      no: "01",
      title: "Pre-Campaign Forecasting",
      body: "We estimate what a proposed budget could produce before it is approved or spent. Depending on the available data, the forecast may cover reach, website visits, enquiries, qualified opportunities, acquisitions and revenue. Each forecast shows the expected range and assumptions used, while metrics without enough reliable evidence are left out.",
      glyph: "forecast",
      phases: ["before"],
      phaseSource: "before it is approved or spent",
    },
    {
      no: "02",
      title: "Media Mix Planning",
      body: "We recommend how the budget should be divided across Google, Meta, LinkedIn, TikTok, YouTube and other suitable channels. The plan considers the campaign objective, audience behaviour, previous results, available creative and sales cycle. It also accounts for how much budget each platform can use efficiently.",
      glyph: "mix",
      phases: ["before"],
      phaseSource: "how the budget should be divided",
    },
    {
      no: "03",
      title: "Category Benchmarking",
      body: "We compare campaign performance with a relevant category range when enough similar data is available. Benchmarks may include cost per click, conversion rate, cost per lead, acquisition cost and return on ad spend. The comparison only uses data with sufficiently similar objectives, markets, channels, and conversion definitions.",
      glyph: "benchmark",
      // Its own sentence compares live performance; step 3 of the process
      // uses "ENH benchmark data" before any budget is spent. So all three.
      phases: ["before", "live", "after"],
      phaseSource:
        "compare campaign performance with a relevant category range; and step 3, \"We use relevant campaign history and ENH benchmark data\"",
    },
    {
      no: "04",
      title: "Scenario Planning",
      body: "We estimate how results may change when the budget, channel mix, audience, or campaign objective is adjusted. This can show the possible effect of increasing spend, reducing it, or moving it between platforms. Each scenario includes an expected performance range and the assumptions used to calculate it.",
      glyph: "scenario",
      phases: ["before"],
      phaseSource: "how results may change when the budget, channel mix, audience, or campaign objective is adjusted",
    },
    {
      no: "05",
      title: "Early Performance Alerts",
      body: "We monitor whether campaign results are moving outside the expected range while the budget is still active. This may include rising costs, falling conversion rates, weaker lead quality, inefficient channel spend, or missing CRM conversions. The team can then investigate the issue and adjust the campaign before the full budget is spent.",
      glyph: "alert",
      phases: ["live"],
      phaseSource: "while the budget is still active",
    },
    {
      no: "06",
      title: "Forecast Versus Actual Reporting",
      body: "We present the forecast beside the actual campaign results to show where performance met or moved outside expectations. The report identifies which assumptions were accurate, which channels produced useful results, and whether the original budget was sufficient. The forecast is then updated as more reliable campaign data becomes available.",
      glyph: "compare",
      phases: ["after"],
      phaseSource: "present the forecast beside the actual campaign results",
    },
  ] as Covered[],
};

/** "The Data We Need". The closing paragraph is two sentences; the first is
 *  set at display scale and the second beneath it, adjacent and unchanged. */
export const dataNeeded = {
  title: "The Data",
  strokeTitle: "We Need",
  lead: "A forecast is only as useful as the information behind it.",
  coversLead: "Depending on the scope, we may review:",
  items: [
    "Previous advertising spend",
    "Campaign objectives and conversion events",
    "Impressions, clicks and website sessions",
    "Leads, purchases, bookings or enquiries",
    "CRM opportunity and sales data",
    "Revenue or sales pipeline",
    "Channel and campaign breakdowns",
    "Audience and location data",
    "Landing page performance",
    "Campaign dates and seasonal changes",
    "Promotions, offers and creative changes",
    "Tracking gaps or changes in conversion setup",
  ],
  closing: "A business does not need to have every item on this list.",
  closingTail: "The diagnostic establishes what is available and how confidently it can be used.",
};

export type Stage = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
};

/** Six steps. Step five opens "Once the campaign starts", so the track's live
 *  line falls there (index 4). Every step's subject is "we", so no actor pill. */
export const process = {
  title: "How",
  strokeTitle: "Forecasting Works",
  items: [
    {
      no: "1",
      title: "Confirm the Campaign Goal",
      body: "We establish what the campaign needs to produce and how the result will be measured. A form submission, qualified lead, sales opportunity, and completed purchase are different results. We agree which one matters before calculating the forecast.",
      glyph: "goal",
    },
    {
      no: "2",
      title: "Review and Align the Data",
      body: "We review the available information from advertising platforms, analytics, the CRM and the sales team. We also resolve differences between systems, such as duplicate leads, different attribution periods or platforms and sales teams using different conversion definitions.",
      glyph: "align",
    },
    {
      no: "3",
      title: "Establish a Realistic Range",
      body: "We use relevant campaign history and ENH benchmark data where enough comparable information is available. The comparison considers the industry, objective, platform, audience, location, offer, and conversion definition. If there is not enough reliable data, we state that and use a wider initial range.",
      glyph: "range",
    },
    {
      no: "4",
      title: "Build the Budget Scenarios",
      body: "We estimate what different budgets and channel combinations could produce. Each scenario shows the expected performance range, the media allocation, and the assumptions behind the forecast. Where sufficient historical data exists, deeper predictive analysis or media mix modelling may also be included.",
      glyph: "scenario",
    },
    {
      no: "5",
      title: "Compare the Forecast With Live Results",
      body: "Once the campaign starts, we compare actual results with the expected range. This helps us identify rising costs, weak conversion rates, poor lead quality, or channels that cannot use their allocated budget efficiently.",
      glyph: "compare",
    },
    {
      no: "6",
      title: "Adjust the Campaign",
      body: "We update the budget allocation and forecast as new data becomes available. The campaign is assessed against the planned range and commercial outcome, rather than only against the previous month.",
      glyph: "adjust",
    },
  ] as Stage[],
  launchAt: 4,
  /** Track labels. Interface labels, not document copy, chosen to match step
   *  five's own words: "Once the campaign starts". */
  labels: { before: "Before the campaign", live: "Campaign starts", after: "Campaign live" },
};

/** Departures 1 and 2: see the header. */
export const growthCta = {
  heading: ["Book a", "Consultation"] as [string, string],
  support:
    "Tell us what the campaign needs to achieve, the budget being considered, and what performance data is currently available.",
  button: "Book a Consultation",
};

/** "How ENH Helps". Two paragraphs either side of a rule: the plan, then the
 *  check. Departure 3: the second paragraph's last sentence is lifted out as
 *  the closing statement. */
export const helps = {
  title: "How ENH Helps You Plan",
  strokeTitle: "and Improve Campaigns",
  left: "ENH helps you set a realistic budget, forecast the expected outcome and decide how the spend should be divided across suitable channels. We review your campaign history, tracking and sales data, then compare the plan with relevant category benchmarks where enough comparable information is available.",
  right:
    "Once the campaign begins, we compare actual performance with the forecast and identify rising costs, tracking problems or weak results early.",
  closing:
    "If the available data does not support a reliable benchmark, we state that clearly and begin with a wider forecast range.",
};

export const faqs: Faq[] = [
  {
    q: "What is campaign intelligence?",
    a: "Campaign intelligence uses historical data, benchmarks, forecasts and live performance information to support marketing decisions. It helps teams decide how much to spend, where to allocate the budget and when a campaign needs attention.",
  },
  {
    q: "How can you forecast results before we spend?",
    a: "We review comparable campaign data, expected media costs, conversion rates, your previous performance, and the objective of the new campaign. The result is provided as a forecast range with clear assumptions. It is not presented as a guaranteed outcome.",
  },
  {
    q: "What is a good cost per lead in the UAE?",
    a: "There is no single UAE benchmark that applies to every business. A useful benchmark must consider the industry, platform, audience, offer, location, lead definition and commercial value of the enquiry.",
  },
  {
    q: "What data do you use for campaign benchmarks?",
    a: "We use the client’s own historical data and relevant ENH campaign data where enough comparable information is available. The proposal will explain which data sources are being used and any limitations that affect the benchmark.",
  },
  {
    q: "How is this different from normal campaign reporting?",
    a: "Normal reporting explains what happened after the campaign ran. Campaign intelligence also estimates what should happen before the budget is spent and monitors whether actual performance remains within the expected range.",
  },
  {
    q: "Do we need to move our paid media management to ENH?",
    a: "Not necessarily. Campaign intelligence can be provided while your internal team or another agency manages the campaigns. We will need suitable access to the media, analytics and sales data included in the scope.",
  },
  {
    q: "What if our category is unusual?",
    a: "We will not force an unrelated industry benchmark onto the forecast. If comparable category data is limited, we use your own history, platform data and early campaign results. The forecast range will be wider until more reliable information is available.",
  },
  {
    q: "How accurate are campaign forecasts?",
    a: "There is no standard accuracy percentage that applies to every forecast. Accuracy depends on the amount, quality and relevance of the available data. It is also affected by changes in creative, competition, tracking, offers, landing pages and sales follow-up. We show the forecast as a range and explain what could move the result.",
  },
  {
    q: "What is predictive marketing analytics?",
    a: "Predictive marketing analytics uses historical and current data to estimate possible future campaign outcomes. For campaign planning, this may include expected lead volume, acquisition cost, revenue, channel performance and the effect of different budget scenarios.",
  },
  {
    q: "Do we need media mix modelling?",
    a: "Not always. Media mix modelling is useful when a business has enough reliable historical data across several channels and time periods. Smaller or newer datasets are usually better suited to channel forecasting and scenario planning.",
  },
  {
    q: "How much should we spend on marketing?",
    // Two paragraphs in the source, kept as two.
    a: [
      "The budget should be connected to the required outcome and a realistic acquisition-cost range.",
      "For example, if the target is 100 qualified leads and the forecast cost per qualified lead is AED 200 to AED 300, the working media budget would need to reflect that range. Agency fees, production and other campaign costs should be calculated separately.",
    ],
  },
  {
    q: "What does campaign intelligence cost?",
    a: "The service is priced according to the number of campaigns, channels, markets, data sources and reporting requirements. It is usually provided on a retained basis. The proposal will separate the campaign intelligence fee from media spend, production and paid media management.",
  },
];

export const finalCta = {
  title: "Plan Your Campaign",
  strokeTitle: "Before Committing the Budget",
  body: "Tell us what the campaign needs to achieve, the budget being considered, and what performance data is currently available.",
  note: "We will assess whether there is enough information to build a useful forecast and show what should be included in the campaign intelligence scope. If the available data does not support a reliable benchmark, we will state that before the work begins.",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";
```

- [ ] **Step 2: Check it compiles once its imports exist** (after Tasks 2, 4 and 8): `npm run check` → 0 errors.

---

### Task 2: Widen the `Faq` answer type and `FaqList`

**Files:**
- Modify: `src/content/services/performance-marketing.ts:11-19`
- Modify: `src/components/service/FaqList.tsx:12,49-57,138-160`

- [ ] **Step 1: Type.** In `performance-marketing.ts` change `a: string;` to:

```ts
  /** One paragraph, or several where the source writes more than one. */
  a: string | string[];
```

- [ ] **Step 2: FaqList.** Replace the local `type Faq` at line 12 with an import, and handle arrays:

```tsx
import type { Faq } from "@/content/services/performance-marketing";
```

Replace the JSON-LD `text` line with:

```tsx
      acceptedAnswer: { "@type": "Answer", text: Array.isArray(f.a) ? f.a.join(" ") : f.a },
```

Replace the answer `<p>` block (the one starting `<p className="max-w-2xl pb-7 pl-10 leading-relaxed text-fog">`) with:

```tsx
                    {(Array.isArray(f.a) ? f.a : [f.a]).map((para, pi, all) => (
                      <p
                        key={pi}
                        className={cn(
                          "max-w-2xl pl-10 leading-relaxed text-fog",
                          pi === all.length - 1 ? "pb-7" : "pb-4",
                        )}
                      >
                        {/* Where the source names another page, the phrase links.
                            The surrounding sentence is untouched, so the answer
                            reads the same with or without the link. */}
                        {f.aLink && para.includes(f.aLink.label)
                          ? (() => {
                              const at = para.indexOf(f.aLink!.label);
                              return (
                                <>
                                  {para.slice(0, at)}
                                  <Crosslink
                                    href={f.aLink!.href}
                                    className="text-snow underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand"
                                    pendingClassName="text-snow"
                                  >
                                    {f.aLink!.label}
                                  </Crosslink>
                                  {para.slice(at + f.aLink!.label.length)}
                                </>
                              );
                            })()
                          : para}
                      </p>
                    ))}
```

- [ ] **Step 3: Check.** `npm run check` → 0 errors (every existing content file passes a string, which still satisfies the union).

---

### Task 3: Nine new glyphs

**Files:**
- Modify: `src/components/service/CapabilityGlyph.tsx:15-56` (type) and the `GLYPHS` registry before `export function CapabilityGlyph`

- [ ] **Step 1: Extend the type.** After `| "ledger";` becomes `| "ledger"` and add:

```ts
  /* ---- campaign intelligence. Forecasting is drawn as ranges and lines, never
     as figures: a band is a range, a tick is a benchmark, a fork is a scenario,
     two lines side by side are forecast against actual. */
  | "forecast"
  | "mix"
  | "benchmark"
  | "scenario"
  | "compare"
  | "goal"
  | "align"
  | "range"
  | "adjust";
```

- [ ] **Step 2: Add the shapes** immediately before `const GLYPHS`:

```tsx
/** Pre-campaign forecasting: a range drawn ahead of any result. */
function Forecast() {
  return (
    <>
      <path d="M7 40h34" {...S} opacity="0.45" />
      <path d="M9 30c8-4 14-10 30-14" {...S} strokeDasharray="3 3" opacity="0.7" />
      <path d="M9 38c8-4 14-10 30-14" {...S} strokeDasharray="3 3" opacity="0.7" />
      <path d="M9 34c8-4 14-10 30-14" {...S} className="glyph-rise" />
      <circle cx="39" cy="20" r="2.5" {...S} className="glyph-pulse" />
    </>
  );
}

/** Media mix: one budget, divided. */
function Mix() {
  return (
    <>
      <rect x="7" y="10" width="34" height="6" rx="2" {...S} />
      <path d="M12 16v8M24 16v8M36 16v8" {...S} opacity="0.5" />
      <rect x="7" y="24" width="12" height="6" rx="2" {...S} className="glyph-rise" />
      <rect x="21" y="24" width="9" height="6" rx="2" {...S} className="glyph-rise" style={d(1)} />
      <rect x="32" y="24" width="9" height="6" rx="2" {...S} className="glyph-rise" style={d(2)} />
      <path d="M9 38h8M23 38h5M34 38h5" {...S} opacity="0.6" />
    </>
  );
}

/** Benchmark: a reading set against a category range. */
function Benchmark() {
  return (
    <>
      <path d="M7 24h34" {...S} opacity="0.45" />
      <path d="M13 20v8M41 20v8" {...S} opacity="0.7" />
      <rect x="13" y="20" width="28" height="8" rx="2" {...S} opacity="0.4" />
      <path d="M27 12v24" {...S} className="glyph-pulse" />
      <circle cx="27" cy="24" r="3" {...S} />
    </>
  );
}

/** Scenario: one plan, forking into what a change would do. */
function Scenario() {
  return (
    <>
      <path d="M7 24h12" {...S} />
      <path d="M19 24c6 0 6-10 12-10h10" {...S} className="glyph-rise" />
      <path d="M19 24h22" {...S} opacity="0.55" />
      <path d="M19 24c6 0 6 10 12 10h10" {...S} className="glyph-rise" style={d(1)} />
      <circle cx="19" cy="24" r="2.5" {...S} className="glyph-pulse" />
    </>
  );
}

/** Forecast against actual: the range, and the line inside it. */
function Compare() {
  return (
    <>
      <path d="M7 40h34" {...S} opacity="0.45" />
      <path d="M9 30c10-2 16-8 30-12" {...S} opacity="0.5" />
      <path d="M9 38c10-2 16-8 30-12" {...S} opacity="0.5" />
      <path d="M9 36c8-1 14-5 22-9" {...S} className="animate-dash" />
      <circle cx="31" cy="27" r="2.5" {...S} className="glyph-pulse" />
    </>
  );
}

/** The goal: one result agreed before anything is calculated. */
function Goal() {
  return (
    <>
      <circle cx="24" cy="24" r="16" {...S} opacity="0.4" />
      <circle cx="24" cy="24" r="9" {...S} opacity="0.7" />
      <circle cx="24" cy="24" r="2.5" {...S} className="glyph-pulse" />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6" {...S} opacity="0.5" />
    </>
  );
}

/** Align: sources that disagree, brought onto one line. */
function Align() {
  return (
    <>
      <rect x="6" y="12" width="10" height="8" rx="2" {...S} opacity="0.6" />
      <rect x="19" y="8" width="10" height="8" rx="2" {...S} opacity="0.6" />
      <rect x="32" y="14" width="10" height="8" rx="2" {...S} opacity="0.6" />
      <path d="M11 20v12M24 16v16M37 22v10" {...S} opacity="0.5" strokeDasharray="2 3" />
      <path d="M6 34h36" {...S} className="glyph-scan" />
      <circle cx="11" cy="34" r="2" {...S} /><circle cx="24" cy="34" r="2" {...S} /><circle cx="37" cy="34" r="2" {...S} />
    </>
  );
}

/** Range: the bracket a forecast is stated in. */
function Range() {
  return (
    <>
      <path d="M12 12v24M36 12v24" {...S} />
      <path d="M8 12h4M8 36h4M36 12h4M36 36h4" {...S} opacity="0.6" />
      <path d="M12 24h24" {...S} opacity="0.4" strokeDasharray="2 3" />
      <rect x="16" y="18" width="16" height="12" rx="2" {...S} className="glyph-pulse" />
    </>
  );
}

/** Adjust: the allocation moved as new data arrives. */
function Adjust() {
  return (
    <>
      <path d="M8 14h32M8 24h32M8 34h32" {...S} opacity="0.4" />
      <circle cx="30" cy="14" r="3" {...S} className="glyph-rise" />
      <circle cx="16" cy="24" r="3" {...S} className="glyph-rise" style={d(1)} />
      <circle cx="34" cy="34" r="3" {...S} className="glyph-rise" style={d(2)} />
    </>
  );
}
```

- [ ] **Step 3: Register them.** In `GLYPHS`, after `ledger: Ledger,` add:

```ts
  forecast: Forecast,
  mix: Mix,
  benchmark: Benchmark,
  scenario: Scenario,
  compare: Compare,
  goal: Goal,
  align: Align,
  range: Range,
  adjust: Adjust,
```

- [ ] **Step 4: Check.** `npm run check` → 0 errors.

---

### Task 4: `CampaignPhases` diagram and `PinnedExplorer` changes

**Files:**
- Create: `src/components/service/CampaignPhases.tsx`
- Modify: `src/components/service/PinnedExplorer.tsx` (imports, `DiagramSpec`, props, `renderDiagram`, `SectionHeader` call)

- [ ] **Step 1: Create `CampaignPhases.tsx`**

```tsx
"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Six things the service covers, drawn against the only axis that separates
 *  them: when in a campaign each one acts.
 *
 *  WHY THIS. Read as a list the six are peers. They are not. The document puts
 *  three of them before any budget is spent ("before it is approved or spent",
 *  "how the budget should be divided", "how results may change when the budget
 *  ... is adjusted"), one while it runs ("while the budget is still active"),
 *  one after ("present the forecast beside the actual campaign results"), and
 *  one, benchmarking, feeds all three. So the drawing is one campaign in three
 *  phases with a start line between the first two, and selecting an item lights
 *  the phase it works in. An item flagged for all three lights the underlay
 *  that runs beneath the whole campaign instead.
 *
 *  THE FLAGS ARE THE CONTENT FILE'S, cited sentence by sentence; nothing here
 *  is read from an item's name.
 *
 *  THE PINS ARE A RAIL above the drawing, in document order, exactly as
 *  HandoverMap places them, so the tablist order is the document's order. */

export type Phase = "before" | "live" | "after";

const PHASES: { key: Phase; label: string; grow: string }[] = [
  { key: "before", label: "Before spend", grow: "flex-[1.5]" },
  { key: "live", label: "Live", grow: "flex-1" },
  { key: "after", label: "After", grow: "flex-1" },
];

export function CampaignPhases({
  active,
  pin,
  count,
  phases,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
  /** Per item, in item order, the phase(s) its description places it in. */
  phases: Phase[][];
}) {
  const current = phases[active] ?? [];
  const spansAll = current.length === PHASES.length;
  const stations = Array.from({ length: count });

  return (
    <div className="rounded-[1.25rem] border border-line bg-ink-2 p-5 sm:p-6">
      {/* Pin rail. Document order, above the drawing. */}
      <div className="mb-6 flex flex-wrap gap-2">
        {stations.map((_, i) => pin(i))}
      </div>

      {/* One campaign, three phases, and the start line between the first two. */}
      <div aria-hidden className="relative">
        <div className="flex items-stretch gap-2">
          {PHASES.map((p, i) => {
            const lit = !spansAll && current.includes(p.key);
            return (
              <div key={p.key} className={cn("relative flex", p.grow)}>
                <div
                  className={cn(
                    "flex w-full flex-col justify-between rounded-xl border px-3 py-3 transition-colors duration-500 motion-reduce:transition-none",
                    lit ? "border-brand/60 bg-brand/[0.09]" : "border-line/70 bg-void/30",
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-[0.6875rem] font-semibold uppercase transition-colors duration-500",
                      lit ? "text-brand-text" : "text-ash",
                    )}
                  >
                    {p.label}
                  </span>
                  {/* The budget line through the phase, and the marker that lands on it. */}
                  <span className="relative mt-6 block h-px w-full bg-line">
                    <span
                      className={cn(
                        "absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-[3px] border transition-all duration-500 motion-reduce:transition-none",
                        lit ? "scale-125 border-brand bg-brand" : "border-line bg-ink-2",
                      )}
                    />
                  </span>
                </div>
                {/* The start line: the campaign goes live between "before" and "live". */}
                {i === 0 && (
                  <span className="pointer-events-none absolute -right-[5px] inset-y-[-6px] w-px bg-brand" />
                )}
              </div>
            );
          })}
        </div>

        {/* What runs beneath every phase. Lit only for the item the document
            puts in all three. */}
        <div
          className={cn(
            "mt-3 flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-500 motion-reduce:transition-none",
            spansAll ? "border-brand/60 bg-brand/[0.09]" : "border-line/60 bg-void/30",
          )}
        >
          <span
            className={cn(
              "h-px flex-1 transition-colors duration-500",
              spansAll ? "bg-brand" : "bg-line",
            )}
          />
          <span
            className={cn(
              "font-display shrink-0 text-[0.6875rem] font-semibold uppercase transition-colors duration-500",
              spansAll ? "text-brand-text" : "text-ash/70",
            )}
          >
            Every phase
          </span>
          <span
            className={cn(
              "h-px flex-1 transition-colors duration-500",
              spansAll ? "bg-brand" : "bg-line",
            )}
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: PinnedExplorer imports.** After `import { HandoverMap } ...` add:

```tsx
import { CampaignPhases, type Phase } from "@/components/service/CampaignPhases";
```

- [ ] **Step 3: DiagramSpec.** After the `handover` member add:

```ts
  /** Six covered items against the campaign phase each one acts in. `phases`
   *  is per item, in item order, cited in the content file. */
  | { kind: "phases"; phases: Phase[][] };
```
(and change the `handover` line's trailing `;` to nothing so the union continues).

- [ ] **Step 4: `markNode` prop.** In the props destructuring add `markNode,` after `mark,`; in the type add after `mark?: {...};`:

```ts
  /** A page's own decorative mark, in place of the generic `mark`. */
  markNode?: ReactNode;
```

In the `<SectionHeader ... />` call add `markNode={aside ? undefined : markNode}` after `mark={aside ? undefined : mark}`.

- [ ] **Step 5: renderDiagram.** After the `case "handover":` block add:

```tsx
      case "phases":
        return (
          <CampaignPhases active={active} pin={pin} count={items.length} phases={diagram.phases} />
        );
```

- [ ] **Step 6: Check.** `npm run check` → 0 errors.

---

### Task 5: `LaunchTrack` optional actor

**Files:**
- Modify: `src/components/service/LaunchTrack.tsx:17-18,191-200`

- [ ] **Step 1: Type.** Change `actor: "ENH" | "You";` to:

```ts
  /** Who the stage's own sentence makes the actor. Omit where every stage has
   *  the same subject; the pill is then not drawn. */
  actor?: "ENH" | "You";
```

- [ ] **Step 2: Render.** Wrap the actor `<span>` (the one with `stage.actor === "You"`) in `{stage.actor && ( ... )}`.

- [ ] **Step 3: Check.** `npm run check` → 0 errors. AI Automation still passes `actor` on every stage, so its pills remain.

---

### Task 6: `CampaignMark`

**Files:**
- Create: `src/components/service/CampaignMark.tsx`

- [ ] **Step 1: Write it**

```tsx
import { cn } from "@/lib/cn";

/** The marks beside this page's section headings. Same frame and stroke as
 *  MetaMark, each drawing the argument its section makes:
 *
 *  - `phases`    one campaign in three phases with a start line: where each
 *                covered item acts.
 *  - `range`     a forecast band that narrows: the more inputs confirmed, the
 *                tighter the range.
 *  - `startline` six stops on a track and the line the campaign goes live at.
 *  - `twosided`  the plan on one side, the check on the other.
 *
 *  Decorative, so aria-hidden and desktop-only. */

export type CampaignMarkVariant = "phases" | "range" | "startline" | "twosided";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const delay = (i: number, step = 0.22) => ({ animationDelay: `${i * step}s` });

function Phases() {
  return (
    <g className="text-fog">
      <rect x="8" y="20" width="44" height="24" rx="4" {...S} />
      <rect x="58" y="20" width="22" height="24" rx="4" {...S} />
      <rect x="86" y="20" width="18" height="24" rx="4" {...S} />
      <path d="M8 32h96" {...S} className="text-line" />
      <path d="M55 12v40" {...S} className="text-brand" />
      {[30, 69, 95].map((cx, i) => (
        <circle key={cx} cx={cx} cy="32" r="3" {...S} className="glyph-pulse text-brand" style={delay(i, 0.5)} />
      ))}
    </g>
  );
}

function Range() {
  return (
    <g className="text-fog">
      <path d="M8 52h96" {...S} className="text-line" />
      <path d="M8 40c24-6 48-18 96-26" {...S} strokeDasharray="3 3" />
      <path d="M8 48c24-6 48-18 96-26" {...S} strokeDasharray="3 3" />
      <path d="M8 44c24-6 48-18 96-26" {...S} className="text-brand" />
      <path d="M100 10v10M100 15h6" {...S} className="glyph-rise text-brand" />
      <path d="M100 26v10M100 31h6" {...S} className="glyph-rise text-brand" style={delay(1, 0.6)} />
    </g>
  );
}

function StartLine() {
  return (
    <g className="text-fog">
      <path d="M8 34h96" {...S} className="text-line" />
      {[12, 28, 44, 60].map((cx, i) => (
        <circle key={cx} cx={cx} cy="34" r="3" {...S} style={delay(i, 0.15)} />
      ))}
      <path d="M70 18v32" {...S} className="text-brand" />
      <circle cx="80" cy="34" r="3.5" {...S} className="glyph-pulse text-brand" />
      <circle cx="98" cy="34" r="3" {...S} />
      <path d="M104 34h4" {...S} strokeDasharray="2 3" />
    </g>
  );
}

function TwoSided() {
  return (
    <g className="text-fog">
      <rect x="8" y="14" width="42" height="36" rx="4" {...S} className="text-brand" />
      <rect x="62" y="14" width="42" height="36" rx="4" {...S} />
      <path d="M56 8v48" {...S} className="glyph-rise text-brand" />
      <path d="M16 26h26M16 34h20M16 42h24" {...S} className="text-brand" opacity="0.6" />
      <path d="M70 26h26M70 34h18M70 42h22" {...S} opacity="0.6" />
    </g>
  );
}

const SHAPES: Record<CampaignMarkVariant, () => React.JSX.Element> = {
  phases: Phases,
  range: Range,
  startline: StartLine,
  twosided: TwoSided,
};

export function CampaignMark({
  variant,
  className,
}: {
  variant: CampaignMarkVariant;
  className?: string;
}) {
  const Shape = SHAPES[variant];
  return (
    <svg
      viewBox="0 0 112 64"
      aria-hidden
      className={cn("hidden h-16 w-[14rem] shrink-0 lg:block", className)}
    >
      <Shape />
    </svg>
  );
}
```

- [ ] **Step 2: Check.** `npm run check` → 0 errors.

---

### Task 7: `BudgetSplit` hero visual

**Files:**
- Create: `src/components/service/BudgetSplit.tsx`

- [ ] **Step 1: Write it**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChannelIcon } from "@/components/service/ChannelIcon";
import { cn } from "@/lib/cn";
import type { Channel } from "@/content/services/campaign-intelligence";

/** The hero visual: one budget, divided across the channels the document
 *  names, and the split rebalancing.
 *
 *  WHY THIS SHAPE. The banner's own sentence is the drawing: "recommend how it
 *  should be divided between channels, and monitor whether the campaign is
 *  performing within the expected range". So one bar at the top is the budget;
 *  five segments beneath it are the division; the bracket under each segment is
 *  that channel's expected range, wider where the share is larger. Every few
 *  seconds the split moves to another allocation, which is Scenario Planning's
 *  "increasing spend, reducing it, or moving it between platforms" made
 *  visible.
 *
 *  NO NUMBERS, AND NO CLAIM. The three allocations below are arbitrary shapes
 *  chosen so the movement can be seen; they assert nothing about any channel.
 *  The document commits to no figure and neither does this. The only text is
 *  the five channel names the document itself lists.
 *
 *  HOW IT MOVES. Segment x and width are SVG attributes, which motion/react
 *  animates directly, so nothing is scaled and the rounded ends stay round. The
 *  connectors from segment to channel chip animate their x1 the same way.
 *  Reduced motion shows the first allocation as a still. */

const W = 220;
const BAR_X = 16;
const BAR_W = W - BAR_X * 2;

/** Three allocations, each summing to one. Arbitrary by design; see above. */
const SCENARIOS: number[][] = [
  [0.3, 0.26, 0.16, 0.14, 0.14],
  [0.22, 0.32, 0.12, 0.2, 0.14],
  [0.34, 0.2, 0.2, 0.1, 0.16],
];

const HOLD_MS = 3400;
const EASE = [0.16, 1, 0.3, 1] as const;

function layout(shares: number[]) {
  const gap = 4;
  const usable = BAR_W - gap * (shares.length - 1);
  let x = BAR_X;
  return shares.map((s) => {
    const w = usable * s;
    const seg = { x, w, cx: x + w / 2 };
    x += w + gap;
    return seg;
  });
}

export function BudgetSplit({ channels, className }: { channels: Channel[]; className?: string }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setStep((s) => s + 1), HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const shares = SCENARIOS[step % SCENARIOS.length].slice(0, channels.length);
  const segs = layout(shares);
  const chipW = BAR_W / channels.length;
  const chipCx = (i: number) => BAR_X + chipW * i + chipW / 2;
  const t = reduced ? { duration: 0 } : { duration: 1.1, ease: EASE };

  return (
    <div
      className={cn(
        // The house placement for a hero visual: right gutter, centred, out of
        // the flow, not rendered below the large breakpoint.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label={`One campaign budget divided across ${channels.map((c) => c.name).join(", ")}. The split rebalances between scenarios, and each channel carries an expected range that widens or narrows with its share.`}
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <svg viewBox={`0 0 ${W} 150`} className="relative block w-full" aria-hidden>
          {/* The budget. One bar, always whole. */}
          <rect x={BAR_X} y="18" width={BAR_W} height="10" rx="3" fill="var(--color-snow)" />

          {/* Where it divides. */}
          {segs.map((s, i) => (
            <motion.line
              key={`d${i}`}
              y1="28"
              y2="46"
              stroke="var(--color-line)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              animate={{ x1: s.cx, x2: s.cx }}
              initial={false}
              transition={t}
            />
          ))}

          {/* The allocation. */}
          {segs.map((s, i) => (
            <motion.rect
              key={`s${i}`}
              y="46"
              height="10"
              rx="3"
              fill="var(--color-fog)"
              opacity={0.85 - i * 0.12}
              // attrX, not x: motion/react treats `x` on SVG as a transform.
              animate={{ attrX: s.x, width: s.w }}
              initial={false}
              transition={t}
            />
          ))}

          {/* Each channel's expected range: a bracket, wider with the share. */}
          {segs.map((s, i) => {
            const half = Math.max(6, s.w * 0.42);
            return (
              <g key={`r${i}`}>
                <motion.line
                  y1="70"
                  y2="70"
                  stroke="var(--color-brand)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  animate={{ x1: s.cx - half, x2: s.cx + half }}
                  initial={false}
                  transition={t}
                />
                <motion.line
                  y1="66"
                  y2="74"
                  stroke="var(--color-brand)"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                  animate={{ x1: s.cx - half, x2: s.cx - half }}
                  initial={false}
                  transition={t}
                />
                <motion.line
                  y1="66"
                  y2="74"
                  stroke="var(--color-brand)"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                  animate={{ x1: s.cx + half, x2: s.cx + half }}
                  initial={false}
                  transition={t}
                />
                <motion.circle
                  cy="70"
                  r="2.4"
                  fill="var(--color-brand)"
                  animate={{ cx: s.cx }}
                  initial={false}
                  transition={t}
                />
              </g>
            );
          })}

          {/* From each allocation to the channel it belongs to. */}
          {segs.map((s, i) => (
            <motion.path
              key={`c${i}`}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              animate={{ d: `M ${s.cx} 78 C ${s.cx} 104, ${chipCx(i)} 104, ${chipCx(i)} 130` }}
              initial={false}
              transition={t}
            />
          ))}
        </svg>

        {/* The channels, in the document's order, with their official marks. */}
        <div className="relative -mt-3 grid" style={{ gridTemplateColumns: `repeat(${channels.length}, minmax(0, 1fr))` }}>
          {channels.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink-3 text-fog">
                <ChannelIcon name={c.icon} size={16} />
              </span>
              <span className="font-display text-[0.6875rem] font-semibold uppercase text-ash">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Check.** `npm run check` → 0 errors. Note `ChannelIcon` renders `role="img"` with the mark's title; inside a `role="img"` parent that is harmless (the parent's label wins for the group).

---

### Task 8: `DataRange`

**Files:**
- Create: `src/components/service/DataRange.tsx`

- [ ] **Step 1: Write it**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

/** The data a forecast needs, drawn as what it does to the forecast.
 *
 *  WHY THIS SHAPE. Twelve inputs as bullets is a procurement list. The
 *  document's own point is the sentence after them: not every item is needed,
 *  and the diagnostic establishes "how confidently it can be used". Step 3 of
 *  the process says the same thing from the other side: "If there is not
 *  enough reliable data, we state that and use a wider initial range." So the
 *  twelve are set beside a forecast range, and as the reader scrolls each input
 *  is ticked and the range narrows. More confirmed inputs, tighter range. No
 *  values on either axis.
 *
 *  NOTHING READABLE STARTS HIDDEN. The list items dim to 0.55, never to 0, and
 *  the band's resting state in the markup is the narrowed one, so without
 *  JavaScript, under reduced motion and below the large breakpoint the section
 *  reads as a full list beside a finished range. GSAP widens the band at the
 *  start of the scrub and narrows it back as the ticks land. */
export function DataRange({
  lead,
  coversLead,
  items,
  closing,
  closingTail,
}: {
  lead: string;
  coversLead: string;
  items: string[];
  closing: string;
  closingTail: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add({ scrub: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.scrub) return;
      const q = gsap.utils.selector(el);
      const rows = q("[data-input]");
      const ticks = q("[data-tick]");
      const band = q("[data-band]");
      const edges = q("[data-edge]");

      gsap.set(rows, { opacity: 0.55 });
      gsap.set(ticks, { strokeDashoffset: 100 });
      gsap.set(band, { scaleY: 1, transformOrigin: "center center" });
      gsap.set(edges, { scaleY: 1, transformOrigin: "center center" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 72%", end: "bottom 60%", scrub: 0.6 },
      });

      const per = 1 / rows.length;
      rows.forEach((row, i) => {
        tl.to(row, { opacity: 1, duration: per * 0.8, ease: "none" }, i * per);
        tl.to(ticks[i], { strokeDashoffset: 0, duration: per * 0.8, ease: "none" }, i * per);
      });
      tl.to([band, edges], { scaleY: 0.36, duration: 1, ease: "none" }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([rows, ticks, band, edges], { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div>
      <Rise>
        <p className="font-display max-w-3xl text-[clamp(1.15rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.18] text-snow">
          {lead}
        </p>
      </Rise>

      <div ref={root} className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:items-start">
        {/* The inputs. Ordered, because the document numbers nothing but the
            reader scans top to bottom and the scrub ticks them in that order. */}
        <div className="lg:order-1">
          <p className="font-display flex items-center gap-3 text-[0.6875rem] font-semibold uppercase text-brand-text">
            <span aria-hidden className="h-px w-8 bg-brand" />
            {coversLead}
          </p>
          <ol className="mt-6 border-t border-line">
            {items.map((item, i) => (
              <li
                key={item}
                data-input
                className="flex items-center gap-5 border-b border-line py-4"
              >
                <span
                  aria-hidden
                  className="font-display w-6 shrink-0 text-[0.6875rem] font-bold tabular-nums text-ash"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 leading-relaxed text-snow sm:text-lg">{item}</span>
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-brand">
                  <path
                    data-tick
                    d="M3 8.5l3.2 3.2L13 4.5"
                    pathLength="100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="100"
                    strokeDashoffset="0"
                  />
                </svg>
              </li>
            ))}
          </ol>
        </div>

        {/* The range. Sticky beside the list on large screens; first, above
            the list, everywhere else. */}
        <div className="lg:order-2 lg:sticky lg:top-32">
          <div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-7">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <svg viewBox="0 0 220 180" className="relative block w-full" aria-hidden>
              <g fill="none" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke">
                <path d="M20 16V160" />
                <path d="M20 160H204" />
              </g>
              {/* The band, and its two edges. Resting state is narrow. */}
              <path
                data-band
                d="M20 132 C 70 118, 120 92, 204 60 L 204 96 C 120 116, 70 136, 20 148 Z"
                fill="var(--color-brand)"
                opacity="0.14"
                style={{ transform: "scaleY(0.36)", transformOrigin: "center center", transformBox: "fill-box" }}
              />
              <path
                data-edge
                d="M20 132 C 70 118, 120 92, 204 60"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.2"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
                style={{ transform: "scaleY(0.36)", transformOrigin: "center center", transformBox: "fill-box" }}
              />
              <path
                data-edge
                d="M20 148 C 70 136, 120 116, 204 96"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.2"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
                style={{ transform: "scaleY(0.36)", transformOrigin: "center center", transformBox: "fill-box" }}
              />
              {/* The mid line: what the range is a range around. */}
              <path
                d="M20 140 C 70 127, 120 104, 204 78"
                fill="none"
                stroke="var(--color-snow)"
                strokeWidth="1.6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx="204" cy="78" r="3.5" fill="var(--color-brand)" />
            </svg>
          </div>
        </div>
      </div>

      <Rise delay={0.2} className="mt-12 border-t border-line pt-9">
        <p className="font-display max-w-3xl text-[clamp(1.2rem,2.6vw,2rem)] font-extrabold uppercase leading-[1.14] text-snow">
          {closing}
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-fog sm:text-lg">{closingTail}</p>
      </Rise>
    </div>
  );
}
```

Note on the band transform: `transformBox: "fill-box"` with `transformOrigin: "center center"` scales each path about its own centre. GSAP writes `transform` on the same element and respects the origin set here; `gsap.set(..., { transformOrigin: "center center" })` matches it.

- [ ] **Step 2: Check.** `npm run check` → 0 errors.

---

### Task 9: `SplitStatement`

**Files:**
- Create: `src/components/service/SplitStatement.tsx`

- [ ] **Step 1: Write it**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

/** Two statements either side of a rule that draws itself, then a closing line.
 *
 *  Generalised from the verdict panel in DiagnosticSheet, which drew the same
 *  rule between "suitable for automation" and "should remain manual". Here the
 *  two sides are the document's own two paragraphs: what we do before the
 *  campaign, and what we do once it begins. Left is brand because it is the
 *  plan; right is ink because it is the check. The rule between them is the
 *  campaign starting, the same line the process section drew.
 *
 *  Same safety rule as its source: nothing readable starts hidden. The panel
 *  only moves, the two sides only dim as far as still-legible, and the one
 *  thing that scales from nothing is a one-pixel rule. */
export function SplitStatement({
  left,
  right,
  closing,
}: {
  left: string;
  right: string;
  closing: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const q = gsap.utils.selector(el);
      const panel = q("[data-panel]");
      const rule = q("[data-rule]");
      const sides = q("[data-side]");
      const axis = window.matchMedia("(min-width: 1024px)").matches ? "scaleY" : "scaleX";

      gsap.set(panel, { y: 26 });
      gsap.set(rule, { [axis]: 0, transformOrigin: "center center" });
      gsap.set(sides, { opacity: 0.55, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 72%", scrub: 0.6 },
      });
      tl.to(panel, { y: 0, duration: 0.26, ease: "power2.out" }, 0)
        .to(rule, { [axis]: 1, duration: 0.46, ease: "none" }, 0.12)
        .to(sides, { opacity: 1, y: 0, duration: 0.3, stagger: 0.14, ease: "power2.out" }, 0.34);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([panel, rule, sides], { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div>
      <div ref={ref}>
        <div data-panel className="overflow-hidden rounded-[1.25rem] border border-line bg-ink-3">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <div className="p-7 sm:p-9">
              <p data-side className="font-display text-[clamp(1.1rem,2vw,1.55rem)] font-extrabold uppercase leading-[1.18] text-brand">
                {left}
              </p>
            </div>
            <div aria-hidden className="relative">
              <span className="absolute inset-x-0 top-0 lg:inset-y-0 lg:left-1/2 lg:w-px lg:-translate-x-1/2">
                <span data-rule className="block h-px w-full bg-line lg:h-full lg:w-px" />
              </span>
            </div>
            <div className="p-7 sm:p-9">
              <p data-side className="font-display text-[clamp(1.1rem,2vw,1.55rem)] font-extrabold uppercase leading-[1.18] text-snow">
                {right}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Rise delay={0.2} className="mt-12 border-t border-line pt-9">
        <p className="font-display max-w-4xl text-[clamp(1.3rem,3vw,2.4rem)] font-extrabold uppercase leading-[1.1] text-snow">
          {closing}
        </p>
      </Rise>
    </div>
  );
}
```

- [ ] **Step 2: Check.** `npm run check` → 0 errors.

---

### Task 10: Page body

**Files:**
- Create: `src/page-bodies/ai-hub-campaign-intelligence.tsx`

- [ ] **Step 1: Write it**

```tsx
"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/campaign-intelligence";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { BudgetSplit } from "@/components/service/BudgetSplit";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { CampaignMark } from "@/components/service/CampaignMark";
import { DataRange } from "@/components/service/DataRange";
import { LaunchTrack } from "@/components/service/LaunchTrack";
import { SplitStatement } from "@/components/service/SplitStatement";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/* Drives <Breadcrumbs href={HREF} />. A subpage of the AI Hub, so the trail
   reads Home > AI Hub > Campaign Intelligence. See sitemap.ts. */
const HREF = "/ai-hub/campaign-intelligence";
const FORM_TITLE = c.hero.primary;

export function CampaignIntelligencePage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        <ServiceHero
          id="hero"
          label="Hero"
          lines={c.hero.lines}
          sub={c.hero.sub}
          primary={c.hero.primary}
          secondary={c.hero.secondary}
          phoneHref={brand.phoneHref}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          footer={<TrustStrip key="trust" id="trust" compact />}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          visual={<BudgetSplit key="budget-split" channels={c.hero.channels} />}
        />

        {/* "What We Do". The first paragraph decodes; the second follows it. */}
        <Narrative
          id="what"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.question}
          questionEmphasis={c.narrative.questionEmphasis}
          body={c.narrative.body}
          highlight={c.narrative.highlight}
          outro={c.narrative.outro}
        >
          <Rise delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#quote"
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
            >
              {c.narrative.primary}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-snow transition-colors duration-300 hover:border-brand hover:text-brand"
            >
              {c.narrative.secondary}
            </a>
          </Rise>
        </Narrative>

        {/* Six covered items against the phase each acts in. See CampaignPhases. */}
        <PinnedExplorer
          id="covers"
          label="What Campaign Intelligence Covers"
          index="01"
          title={c.covers.title}
          strokeTitle={c.covers.strokeTitle}
          items={c.covers.items.map((s) => ({ no: s.no, title: s.title, body: s.body, glyph: s.glyph }))}
          tone="ink-2"
          diagramSide="right"
          markNode={<CampaignMark variant="phases" />}
          diagram={{ kind: "phases", phases: c.covers.items.map((s) => s.phases) }}
        />

        {/* Twelve inputs, and the range they tighten. See DataRange. */}
        <section id="data" data-section="The Data We Need" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.dataNeeded.title}
              strokeTitle={c.dataNeeded.strokeTitle}
              markNode={<CampaignMark variant="range" />}
              className="mb-12"
            />
            <DataRange
              lead={c.dataNeeded.lead}
              coversLead={c.dataNeeded.coversLead}
              items={c.dataNeeded.items}
              closing={c.dataNeeded.closing}
              closingTail={c.dataNeeded.closingTail}
            />
          </Container>
        </section>

        {/* Six steps, crossing the line where the campaign starts. See
            LaunchTrack. overflow-hidden and the track outside the Container,
            for the same reasons AI Automation gives. */}
        <section id="process" data-section="How Forecasting Works" className="relative overflow-hidden py-14 sm:py-16">
          <Container className="relative mb-14">
            <SectionHeader
              index="03"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              markNode={<CampaignMark variant="startline" />}
            />
          </Container>
          <LaunchTrack
            items={c.process.items}
            launchAt={c.process.launchAt}
            beforeLabel={c.process.labels.before}
            liveLabel={c.process.labels.live}
            afterLabel={c.process.labels.after}
          />
        </section>

        {/* The document places its mid-page CTA here, after step 6. */}
        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
        />

        {/* The plan and the check, either side of the start line. Lifted to
            its own chapter treatment, as the managed section is on AI Automation. */}
        <section id="helps" data-section="How ENH Helps You Plan and Improve Campaigns" className="relative overflow-x-clip py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "88px 88px",
                maskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 76%)",
              }}
            />
            <div className="aurora-b absolute left-1/2 top-[8%] h-[30vw] w-[30vw] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[150px]" />
          </div>
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.helps.title}
              strokeTitle={c.helps.strokeTitle}
              markNode={<CampaignMark variant="twosided" />}
              className="mb-14"
            />
            <SplitStatement left={c.helps.left} right={c.helps.right} closing={c.helps.closing} />
          </Container>
        </section>

        <Work index="05" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="Plan Your Campaign Before Committing the Budget"
          index="07"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.hero.secondary}
        />

        <Insights index="08" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
```

- [ ] **Step 2: Check.** `npm run check` → 0 errors.

---

### Task 11: Route and sitemap

**Files:**
- Create: `src/pages/ai-hub/campaign-intelligence.astro`
- Modify: `src/lib/sitemap.ts:156,247`

- [ ] **Step 1: Route**

```astro
---
import Base from "@/layouts/Base.astro";
import * as c from "@/content/services/campaign-intelligence";
import { brand } from "@/lib/content";
import { CampaignIntelligencePage } from "@/page-bodies/ai-hub-campaign-intelligence";

/* Head tags are handed to the layout as props; the structured data is emitted
   here as static HTML rather than through the island, as on every route. */

const HREF = "/ai-hub/campaign-intelligence";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Campaign Intelligence",
  serviceType:
    "Pre-campaign forecasting, media mix planning, category benchmarking, scenario planning, early performance alerts and forecast versus actual reporting",
  areaServed: { "@type": "Country", name: "United Arab Emirates" },
  provider: {
    "@type": "Organization",
    name: brand.legal,
    url: "https://enhmedia.com",
    telephone: brand.phone,
    address: { "@type": "PostalAddress", streetAddress: brand.address, addressCountry: "AE" },
  },
};
---

<Base title={c.meta.title} description={c.meta.description} canonical={HREF}>
  <script type="application/ld+json" is:inline set:html={JSON.stringify(serviceSchema)} />

  <CampaignIntelligencePage client:load />
</Base>
```

- [ ] **Step 2: Sitemap.** Change line 156 to:

```ts
    { label: "Campaign Intelligence", href: "/ai-hub/campaign-intelligence" },
```

and in `BUILT` after `"/ai-hub/ai-automation",` add:

```ts
  "/ai-hub/campaign-intelligence",
```

Update the comment above `aiHub` so "The one exception is 'AI & Automation'" reads "The exceptions are 'AI & Automation' and 'Campaign Intelligence', which are real pages on this site".

- [ ] **Step 3: Checks.** `npm run check:routes` → "19 routes, all listed in BUILT." `npm run check` → 0 errors. `npm run lint` → only the two pre-existing errors. `npm run build` → 19 pages.

---

### Task 12: Verification

**Files:**
- Create (scratch, not committed): a Playwright script in the session scratchpad.

- [ ] **Step 1: Dev server.** `npm run dev` is already running on :4321 (via the Browser pane launch config).

- [ ] **Step 2: Word coverage.** Run against `http://localhost:4321/ai-hub/campaign-intelligence`: extract the rendered text with JavaScript disabled and with it enabled; take the document's paragraphs (from the docx extraction) and assert every word of every paragraph appears in the page text. Expected: zero missing words (the only intentional differences are "Book A Consultation" → "Book a Consultation", and the labels "Primary CTA:", "Secondary CTA:", "Banner text:", "CTA:" which are the document's own annotations, not copy).

- [ ] **Step 3: Captures.** Desktop 1440×900 light scroll pass, dark pass, iPhone 13 pass, no-JS hero; keyboard tab order through the hero and the explorer; the explorer's tab keys; hero dialog opens and closes; `prefers-reduced-motion: reduce` pass confirming every section is fully legible and nothing is at opacity 0.

- [ ] **Step 4: Fix anything found, re-run.**

- [ ] **Step 5: Commit** (single, on `feat/campaign-intelligence`):

```bash
git add docs/superpowers src/content/services/campaign-intelligence.ts src/content/services/performance-marketing.ts \
  src/components/service/CapabilityGlyph.tsx src/components/service/CampaignMark.tsx src/components/service/BudgetSplit.tsx \
  src/components/service/CampaignPhases.tsx src/components/service/PinnedExplorer.tsx src/components/service/LaunchTrack.tsx \
  src/components/service/FaqList.tsx src/components/service/DataRange.tsx src/components/service/SplitStatement.tsx \
  src/page-bodies/ai-hub-campaign-intelligence.tsx src/pages/ai-hub/campaign-intelligence.astro src/lib/sitemap.ts
git commit -m "Add the Campaign Intelligence page to the AI Hub"
```

`.superpowers/` and `package-lock.json` are deliberately not staged.

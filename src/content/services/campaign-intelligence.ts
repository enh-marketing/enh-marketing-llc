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
import type { Phase } from "@/components/service/CampaignTimeline";

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
        'compare campaign performance with a relevant category range; and step 3, "We use relevant campaign history and ENH benchmark data"',
    },
    {
      no: "04",
      title: "Scenario Planning",
      body: "We estimate how results may change when the budget, channel mix, audience, or campaign objective is adjusted. This can show the possible effect of increasing spend, reducing it, or moving it between platforms. Each scenario includes an expected performance range and the assumptions used to calculate it.",
      glyph: "scenario",
      phases: ["before"],
      phaseSource:
        "how results may change when the budget, channel mix, audience, or campaign objective is adjusted",
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

/** "The Data We Need". The closing paragraph is two sentences. The second,
 *  about the diagnostic, is set inside the diagnostic box the inputs gather
 *  into; the first is the display line beneath. Both unchanged. */
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
  closingTail:
    "The diagnostic establishes what is available and how confidently it can be used.",
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

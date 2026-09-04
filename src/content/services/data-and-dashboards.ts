// Data and Dashboard Services — page content.
// Copy source: "Data and Dashboard Services.docx" (client-supplied). VERBATIM.
// Headings are the document's own, split across lines only for typesetting.
//
// ONE DEPARTURE, agreed with the client on 2026-09-03 for every AI Hub page:
// the mid-page CTA band needs a heading, a support line and a button, and the
// document supplies only the label ("CTA: Book a Data Diagnostic"). The support
// line is the closing block's own first sentence, borrowed rather than written.
//
// NO EXAMPLES SECTION. "Dashboards We Have Built" is an instruction in the
// document ("[Add approved dashboard examples here.]"), not content. Nothing is
// rendered for it and nothing is invented. Work and Insights are the site's
// shared sections.
//
// NO FIGURES. Every dashboard drawn on this page shows shapes, never values:
// bars without scales, tiles without numbers. The document names metrics
// (spend, leads, sales, conversion rates) and those names are used as labels;
// no quantity is ever attached to them.
//
// FORM. The standard site-wide set applies (team direction 2026-09-02).

import type { Faq } from "@/content/services/performance-marketing";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";

export const meta = {
  title: "Data and Dashboard Services in Dubai | ENH Marketing",
  // The banner's first sentence, verbatim.
  description:
    "ENH Marketing builds live reporting dashboards and marketing attribution systems for UAE businesses.",
};

export const hero = {
  lines: ["Data and Dashboard", "Services", "in Dubai"] as [string, string, string],
  sub: "ENH Marketing builds live reporting dashboards and marketing attribution systems for UAE businesses. We connect the platforms you already use, define how each metric is calculated, and create one view that updates automatically. Every dashboard project includes ongoing monitoring and technical support after launch.",
  primary: "Book a Data Diagnostic",
  secondary: "Talk to the Team",
  /** The kinds of system the document says a dashboard receives from, in the
   *  order "Connected Data Sources" lists them. Labels for the hero's source
   *  row; the document's words, one each. */
  sources: ["Marketing", "Website", "CRM", "Ecommerce", "Finance", "Operational"],
  /** The banner's own phrase for what the sources become. */
  viewLabel: "One view that updates automatically",
};

/** "What We Build". The first sentence leads as the question; the second,
 *  about who the dashboard is for, decodes; the third closes. */
export const narrative = {
  heading: ["What", "We Build"] as [string, string],
  question:
    "We build dashboards that bring marketing, sales, website, ecommerce, finance and operational data into one place.",
  questionEmphasis: "into one place",
  body: "Each dashboard is planned around the people who will use it and the decisions they need to make. The information, filters, user access and reporting frequency are agreed before development begins.",
  highlight: ["people", "decisions", "information", "filters", "access", "frequency"],
  outro: [
    "We can replace an existing manual report, improve a dashboard that is no longer trusted, or build a new reporting system from the beginning.",
  ],
  primary: "Book a Data Diagnostic",
  secondary: "Talk to the Team",
};

export type DashboardKind = "marketing" | "sales" | "ecommerce" | "attribution" | "management" | "integration";

export type Service = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** Which drawing the card carries. Five are dashboards a person reads; the
   *  sixth is the preparation underneath all of them, and is drawn as such. */
  kind: DashboardKind;
  /** The drawing's captions, every phrase a fragment of this item's own
   *  paragraph. The management card is captioned with `roles` instead. */
  labels: string[];
};

export const services = {
  /** The four department views the management dashboard switches between, in
   *  the document's words ("founders, directors and department heads" read a
   *  summary of the marketing, sales and finance systems it connects). */
  roles: ["Management", "Marketing", "Sales", "Finance"],
  title: "Our Data and",
  strokeTitle: "Dashboard Services",
  items: [
    {
      no: "01",
      title: "Marketing Performance Dashboards",
      body: "A marketing dashboard brings campaign data from different advertising and analytics platforms into one view. It can show spend, leads, sales, conversion rates, acquisition costs and return on ad spend by platform, campaign, location, product or reporting period.",
      glyph: "reporting",
      kind: "marketing",
      labels: ["By platform", "Spend · Leads"],
    },
    {
      no: "02",
      title: "Sales and Lead Dashboards",
      body: "Sales and lead dashboards connect marketing enquiries with CRM and sales data. They can show lead sources, qualification rates, response times, pipeline stages, meetings, sales and lost opportunities.",
      glyph: "triage",
      kind: "sales",
      labels: ["Pipeline stages", "Closed sales"],
    },
    {
      no: "03",
      title: "Ecommerce and Revenue Dashboards",
      body: "Ecommerce dashboards combine advertising, website, order and revenue data. They can report purchases, product performance, average order value, customer acquisition cost, refunds and revenue by channel.",
      glyph: "catalogue",
      kind: "ecommerce",
      labels: ["Revenue by channel", "Reporting period"],
    },
    {
      no: "04",
      title: "Marketing Attribution Reporting",
      body: "Attribution reporting connects marketing activity with the enquiries, sales or revenue recorded by the business. The reporting method, attribution window and available data are agreed before the dashboard is built.",
      glyph: "reconcile",
      kind: "attribution",
      labels: ["Marketing activity", "Recorded by the business"],
    },
    {
      no: "05",
      title: "Management Dashboards",
      body: "Management dashboards provide a focused view of the metrics required by senior teams. Different views can be created for management, marketing, sales, finance and other departments. Access can be limited according to each user’s role.",
      glyph: "structure",
      kind: "management",
      labels: [],
    },
    {
      no: "06",
      title: "Data Integration and Preparation",
      body: "We connect the required sources and prepare the information before it reaches the dashboard. This may include matching fields, removing duplicates, correcting formats, and creating consistent categories across different systems.",
      glyph: "workflow",
      kind: "integration",
      labels: ["Connected sources", "Prepared for reporting"],
    },
  ] as Service[],
};

/** "The Main Elements of a Reporting Dashboard". Seven parts of one object,
 *  so they annotate a drawing of it rather than stacking as rows. */
export const elements = {
  title: "The Main Elements of",
  strokeTitle: "a Reporting Dashboard",
  items: [
    { no: "01", title: "Connected Data Sources", body: "The dashboard receives information from the agreed marketing, website, CRM, ecommerce, finance, or operational systems." },
    { no: "02", title: "Consistent Metrics", body: "The same definitions and calculations are used across the dashboard. This prevents different teams from reporting different versions of the same metric." },
    { no: "03", title: "Clear Dashboard Views", body: "Each dashboard page is created around a specific reporting need. This may include an overall performance view, channel comparison, campaign report, sales pipeline, revenue report or management summary." },
    { no: "04", title: "Filters and Comparisons", body: "Users can filter the information by date, platform, campaign, product, location, salesperson, or other agreed categories. Reports can also compare performance with an earlier period, target or budget." },
    { no: "05", title: "Scheduled Data Updates", body: "The dashboard can update according to the frequency supported by each source. Some sources can refresh several times a day. Others may update daily, weekly or after a file is supplied." },
    { no: "06", title: "User Access and Permissions", body: "Access can be provided according to each user’s role. Sensitive finance, customer or sales information can be limited to approved users." },
    { no: "07", title: "Data Checks and Monitoring", body: "Connected sources and refresh schedules are monitored after launch. Errors, missing information, and unexpected changes can be reviewed before they affect a reporting period." },
  ],
};

/** "How We Track Marketing ROI". Two paragraphs: cost against value over one
 *  period, and the calculation depending on the business model. The drawing's
 *  labels are the nouns the paragraphs use. */
export const roi = {
  title: "How We Track",
  strokeTitle: "Marketing ROI",
  lead: "Marketing ROI reporting requires the marketing cost and the resulting business value to be measured over the same period. The dashboard can combine advertising spend, agency fees, production costs, sales, revenue or gross profit where the required information is available.",
  body: "The correct calculation will depend on the business model. An ecommerce company may report revenue and gross margin, while a B2B company may need to report qualified pipeline, closed sales and customer value. The agreed calculation is documented before it is added to the dashboard.",
  costs: ["advertising spend", "agency fees", "production costs"],
  values: ["sales", "revenue", "gross profit"],
  periodLabel: "the same period",
  /** The heading over each model's chips; the document's own verb. */
  reportsLabel: "may report",
  models: [
    { name: "An ecommerce company", reports: ["revenue", "gross margin"] },
    { name: "A B2B company", reports: ["qualified pipeline", "closed sales", "customer value"] },
  ],
};

/** "Customised to Your Reporting Needs". A scale from a small dashboard to a
 *  large reporting system, the eight things the diagnostic settles, and how the
 *  proposal is split. */
export const scope = {
  title: "Customised to Your",
  strokeTitle: "Reporting Needs",
  lead: "The dashboard scope depends on the data sources, users and reporting requirements.",
  example:
    "A small marketing dashboard may connect advertising platforms, Google Analytics and a CRM. A larger reporting system may include ecommerce, finance, sales, call tracking and several user views.",
  small: { label: "A small marketing dashboard", parts: ["advertising platforms", "Google Analytics", "a CRM"] },
  large: { label: "A larger reporting system", parts: ["ecommerce", "finance", "sales", "call tracking", "several user views"] },
  diagnosticLead: "The data diagnostic identifies:",
  items: [
    "Which systems need to be connected",
    "Which metrics need to be reported",
    "How each metric should be calculated",
    "How often the data needs to update",
    "Which filters and views are required",
    "Who should have access",
    "Whether past data needs to be imported",
    "Whether a data warehouse is required",
  ],
  proposal: "The proposal separates data preparation, integrations, dashboard development, and managed support.",
};

export type Step = { no: string; title: string; body: string };

/** "How the Dashboard Project Works". Seven steps that assemble a dashboard;
 *  the seventh has no end ("through the managed service"). */
export const process = {
  title: "How the Dashboard",
  strokeTitle: "Project Works",
  items: [
    { no: "1", title: "Reporting Review", body: "We review the reports currently being used, the people who prepare them, and the decisions they need to support." },
    { no: "2", title: "Data Diagnostic", body: "We inspect the available data sources, identify gaps, and agree which system should provide each metric." },
    { no: "3", title: "Definitions and Scope", body: "The metrics, calculations, filters, dashboard views, user access, and refresh schedule are documented." },
    { no: "4", title: "Data Connection and Preparation", body: "The required platforms are connected. The data is cleaned, matched, and prepared for reporting." },
    { no: "5", title: "Dashboard Development", body: "The dashboard views are built and reviewed with the relevant teams." },
    { no: "6", title: "Testing and Launch", body: "Calculations, filters, permissions, and data refreshes are tested before launch. Your team is also shown how to use the dashboard." },
    { no: "7", title: "Monitoring and Support", body: "After launch, we monitor the data connections and dashboard performance through the managed service." },
  ] as Step[],
};

/** The mid-page band. The document places "CTA: Book a Data Diagnostic" after
 *  step 7; the support line is borrowed from the closing block (see header). */
export const growthCta = {
  heading: ["Book a", "Data Diagnostic"] as [string, string],
  support:
    "Tell us which reports your team currently prepares, which systems hold the information, and where the numbers do not match.",
  button: "Book a Data Diagnostic",
};

export const faqs: Faq[] = [
  { q: "What is a marketing dashboard?", a: "A marketing dashboard brings performance data from different platforms into one reporting view. It can show advertising spend, leads, sales, conversion rates, acquisition costs, revenue, and return on ad spend." },
  { q: "What should a marketing dashboard include?", a: "The dashboard should include the metrics required to make a clear decision. The exact content depends on the business. Most marketing dashboards include spend, leads or sales, acquisition costs, conversion rates, and results by platform or campaign." },
  { q: "Which systems can you connect?", a: "We can connect advertising, analytics, CRM, ecommerce, finance, call-tracking, spreadsheet and database sources when the platform allows access. The data diagnostic confirms which systems can be connected and how frequently they can update." },
  { q: "Why do our platforms report different numbers?", a: "Platforms may use different attribution windows, conversion definitions, time zones and methods for identifying users. Advertising platforms may also report conversions that are missing from the CRM or claim the same conversion across several channels. We document these differences and agree which source should be used for each metric." },
  { q: "Can you fix our marketing attribution?", a: "We can improve attribution by connecting more reliable sources, agreeing on consistent definitions, and recording offline outcomes in the reporting. Some uncertainty may remain because of privacy restrictions, cross-device journeys and missing customer information. These limits will be explained in the dashboard." },
  { q: "How do you track marketing ROI?", a: "We compare the agreed marketing costs with the sales, revenue, gross profit or pipeline linked to that activity. The calculation depends on the available data and the business model. The method is agreed and documented before it is added to the dashboard." },
  { q: "Do we need a data warehouse?", a: "A data warehouse is not required for every dashboard. Direct connections may be enough when there are only a few sources and limited reporting requirements. A warehouse may be recommended when the business has several systems, large data volumes, historical reporting, or complex calculations." },
  { q: "Which dashboard platform will you use?", a: "The platform is selected according to your data sources, reporting requirements, user access and existing software. This may include Power BI, Looker Studio or another suitable reporting tool. The recommended platform is confirmed during the diagnostic." },
  { q: "How long does a dashboard take to build?", a: "The timeline depends on the number of sources, the condition of the data, and the complexity of the reporting. A dashboard with a few clean sources will take less time than one requiring historical imports, data correction, and several user views. The confirmed timeline is included in the proposal." },
  { q: "What does a reporting dashboard cost in Dubai?", a: "There is no standard price because each reporting setup is different. The cost is based on the data sources, preparation work, dashboard views, attribution requirements, and ongoing support. These items are shown separately in the proposal." },
  { q: "Who maintains the dashboard?", a: "ENH Marketing monitors the data connections, refresh schedules, and technical performance through the monthly managed service. Your team remains responsible for entering accurate information into the source systems." },
  { q: "Do we own the dashboard and our data?", a: "Your business retains ownership of its source data. Our standard position is that the custom dashboard, data model and documentation belong to you after the project is completed and paid for. Third-party platforms and licences remain subject to their own terms." },
  { q: "What happens when we add a new platform?", a: "We review the new platform, available connections, and required reporting fields. If the addition is covered by the managed-service scope, we update the dashboard. Larger integrations or new reporting sections are scoped and quoted separately." },
];

export const finalCta = {
  title: "Book a",
  strokeTitle: "Data Diagnostic",
  body: "Tell us which reports your team currently prepares, which systems hold the information, and where the numbers do not match.",
  note: "We will review the available data, define the reporting requirements, and recommend the dashboard structure. You will receive the diagnostic document whether you continue with the build or use it internally.",
};

/** One standard set across the site; see content/forms.ts. */
export { standardFormFields as formFields } from "@/content/forms";

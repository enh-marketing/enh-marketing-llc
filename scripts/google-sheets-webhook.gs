/**
 * ENH website → Google Sheet.
 *
 * Receives one enquiry from src/pages/api/enquiry.ts and appends a row.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SETUP (about five minutes, done once)
 *
 *  1. Open the sheet:
 *     https://docs.google.com/spreadsheets/d/1jrXmGhYKPOkhJrqWKaVOeo0yBCEi6gGhOGUmcqWxv8A/edit
 *  2. Extensions → Apps Script. Delete whatever is in Code.gs and paste this
 *     whole file in its place.
 *  3. Change SECRET below to a long random string. Anything unguessable, e.g.
 *     the output of `openssl rand -hex 24`. Keep it to hand for step 7.
 *  4. Save (the disk icon).
 *  5. Deploy → New deployment → gear icon → Web app.
 *  6. Set:  Execute as        → Me (your account)
 *           Who has access    → Anyone
 *     "Anyone" is required: Vercel calls this without a Google login. The
 *     SECRET is what actually protects it, which is why step 3 matters.
 *     Authorise when Google asks. The "unverified app" screen is expected for
 *     your own script — Advanced → Go to (project name).
 *  7. Copy the Web app URL (it ends in /exec) and set both of these in Vercel,
 *     Project → Settings → Environment Variables:
 *           SHEETS_WEBHOOK_URL     = the /exec URL
 *           SHEETS_WEBHOOK_SECRET  = the same string as SECRET below
 *  8. Redeploy the site so the new variables are picked up.
 *
 * TO CHANGE THIS SCRIPT LATER: edit, save, then Deploy → Manage deployments →
 * pencil icon → Version: New version → Deploy. Editing without redeploying
 * changes nothing; the /exec URL keeps serving the last deployed version.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW THE COLUMNS WORK
 *
 * The header row is built and maintained by this script, so nothing has to be
 * set up by hand and the sheet cannot fall out of step with the forms.
 *
 *   Timestamp (UAE) | Form Name | Page Name | Page URL | …fields… | Consent |
 *   IP Address | reCAPTCHA | User Agent | Page Path | Submitted (UTC)
 *
 * The field columns in the middle grow on their own. A form posts its fields
 * as {id, label, value}; each id owns one column, and a value arriving for an
 * id with no column yet causes a new column to be INSERTED before "Consent" —
 * not appended at the far right — so the lead details stay together and the
 * technical columns stay at the end. Existing rows keep their data because
 * insertion shifts whole columns.
 *
 * Consequence worth knowing: the two SEO service pages ask for Website and
 * Requirements, which no other form does. Those columns appear the first time
 * one of those forms is submitted and are blank for every other form's rows.
 * That is correct, not a bug.
 *
 * Rename a header and this script will treat it as missing and insert a fresh
 * column next to it. Reorder or recolour them freely; matching is by header
 * text, not position.
 */

/** MUST be identical to SHEETS_WEBHOOK_SECRET in Vercel. Change it here first,
 *  then redeploy the web app, then update Vercel. */
var SECRET = 'CHANGE-ME-to-a-long-random-string';

/** The spreadsheet this writes to. Hardcoded rather than using the active
 *  spreadsheet, so the script keeps working if it is ever moved to a
 *  standalone project. */
var SHEET_ID = '1jrXmGhYKPOkhJrqWKaVOeo0yBCEi6gGhOGUmcqWxv8A';

/** The tab. Created on first use if it is not there. */
var TAB_NAME = 'Form Entries';

var LEAD_COLUMNS = ['Timestamp (UAE)', 'Form Name', 'Page Name', 'Page URL'];
var TAIL_COLUMNS = [
  'Consent',
  'IP Address',
  'reCAPTCHA',
  'User Agent',
  'Page Path',
  'Submitted (UTC)',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return reply({ ok: false, error: 'empty request body' });
    }

    var body = JSON.parse(e.postData.contents);

    if (!SECRET || SECRET === 'CHANGE-ME-to-a-long-random-string') {
      return reply({ ok: false, error: 'webhook SECRET has not been set in the Apps Script' });
    }
    if (String(body.secret || '') !== SECRET) {
      return reply({ ok: false, error: 'bad secret' });
    }

    var row = body.row || {};

    // Two requests landing together would both read the header row, both
    // decide a column is missing, and both insert one. The lock serialises
    // that. Thirty seconds is far longer than an append takes.
    var lock = LockService.getScriptLock();
    lock.waitLock(30000);
    try {
      appendRow(row);
    } finally {
      lock.releaseLock();
    }

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String((err && err.message) || err) });
  }
}

/** A GET is only ever a human checking the URL is alive. */
function doGet() {
  return reply({ ok: true, message: 'ENH enquiry webhook is running. POST to this URL.' });
}

function appendRow(row) {
  var sheet = getSheet();
  var headers = getHeaders(sheet);

  var fields = row.fields || [];
  var values = {};

  // Each field id owns one column, headed by a readable version of the id.
  // Keying on the id rather than the visitor-facing label matters: the label
  // for "services" is "Services" on most pages and "Services you are
  // interested in" on the two SEO pages, and those are one column, not two.
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    if (!field || !field.id) continue;
    var header = titleCase(String(field.id));
    if (headers.indexOf(header) === -1) {
      headers = insertFieldColumn(sheet, headers, header);
    }
    values[header] = field.value == null ? '' : String(field.value);
  }

  values['Timestamp (UAE)'] = row.timestamp || '';
  values['Form Name'] = row.formName || '';
  values['Page Name'] = row.pageName || '';
  values['Page URL'] = row.pageUrl || '';
  values['Consent'] = row.consent == null ? '' : String(row.consent);
  values['IP Address'] = row.ip || '';
  values['reCAPTCHA'] = row.recaptcha == null ? '' : String(row.recaptcha);
  values['User Agent'] = row.userAgent || '';
  values['Page Path'] = row.pagePath || '';
  values['Submitted (UTC)'] = row.timestampIso || '';

  var line = [];
  for (var c = 0; c < headers.length; c++) {
    var key = headers[c];
    // Leading apostrophe on anything that would otherwise be read as a
    // formula. A visitor who types "=1+1" or "+971..." into a field must not
    // have it evaluated by the sheet, and a crafted =IMPORTXML() in a name
    // field is a real exfiltration route out of a sheet like this one.
    line.push(deFormula(values[key] == null ? '' : values[key]));
  }

  sheet.appendRow(line);
}

function getSheet() {
  var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  var sheet = spreadsheet.getSheetByName(TAB_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(TAB_NAME);
  }
  return sheet;
}

/** Reads the header row, writing the fixed columns if the sheet is empty. */
function getHeaders(sheet) {
  var width = sheet.getLastColumn();
  if (sheet.getLastRow() === 0 || width === 0) {
    var initial = LEAD_COLUMNS.concat(TAIL_COLUMNS);
    sheet.getRange(1, 1, 1, initial.length).setValues([initial]);
    sheet.getRange(1, 1, 1, initial.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    return initial;
  }
  return sheet.getRange(1, 1, 1, width).getValues()[0].map(function (h) {
    return String(h);
  });
}

/** Inserts a new field column immediately before the trailing block, so the
 *  enquiry's own fields stay grouped after the page columns and the technical
 *  columns stay at the far right. */
function insertFieldColumn(sheet, headers, header) {
  var boundary = -1;
  for (var i = 0; i < TAIL_COLUMNS.length; i++) {
    var at = headers.indexOf(TAIL_COLUMNS[i]);
    if (at !== -1) {
      boundary = at;
      break;
    }
  }
  // No trailing column present (a sheet whose headers were edited by hand):
  // fall back to appending at the right rather than throwing away the row.
  var position = boundary === -1 ? headers.length : boundary;

  sheet.insertColumnBefore(position + 1);
  sheet.getRange(1, position + 1).setValue(header).setFontWeight('bold');

  headers.splice(position, 0, header);
  return headers;
}

/** "name" → "Name", "firstName" → "First Name", "company-size" → "Company Size" */
function titleCase(id) {
  return id
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, function (c) {
      return c.toUpperCase();
    });
}

/** Neutralises spreadsheet formula injection without altering what is stored:
 *  Sheets strips the leading apostrophe on display and on copy. */
function deFormula(value) {
  var text = String(value);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function reply(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

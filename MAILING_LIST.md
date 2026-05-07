# Mailing list — Google Sheet setup

The "Join the correspondence" envelope at the bottom of
[`goldbug-variations.html`](./goldbug-variations.html) posts addresses into
a Google Sheet via a small Apps Script web app. Five-minute setup, no
third-party services, no monthly fees. Once deployed, paste the URL into
the `<meta name="signup-endpoint">` tag in the HTML and submissions will
land in your sheet within a couple seconds of submit.

---

## 1 · Create the Sheet

1. Go to <https://sheets.google.com> and create a blank sheet.
2. Name it whatever you like (e.g. **"GBV — mailing list"**).
3. In row 1, add column headers:

   | A         | B     | C      | D         |
   |-----------|-------|--------|-----------|
   | Timestamp | Email | Source | UserAgent |

## 2 · Add the Apps Script

1. From inside the Sheet: **Extensions → Apps Script**.
2. Delete any boilerplate code, paste this in:

   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSheet();
     const p = e.parameter;
     sheet.appendRow([
       new Date(),
       (p.email     || '').toString().slice(0, 200),
       (p.source    || '').toString().slice(0, 200),
       (p.userAgent || '').toString().slice(0, 400)
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Click the **save** icon. Project name can be anything.

## 3 · Deploy as Web App

1. **Deploy → New deployment**.
2. **Type:** Web app.
3. **Description:** "Mailing list intake"
4. **Execute as:** Me (your email)
5. **Who has access:** **Anyone** ← important. "Anyone with the link"
   doesn't allow anonymous POSTs.
6. **Deploy**, accept the permission prompts (Google warns it's "unsafe"
   because it's your own unverified script — fine, Continue → Allow).
7. Copy the **Web app URL**. It ends in `/exec`.

## 4 · Paste the URL into the site

In `goldbug-variations.html`, find the `<head>` line:

```html
<meta name="signup-endpoint" content="">
```

…and paste your URL into `content`:

```html
<meta name="signup-endpoint" content="https://script.google.com/macros/s/AKfycbXXXXXXXXXX/exec">
```

That's it. Submit a test from the live site — a row should appear in the
sheet within a couple seconds. If you don't see anything, check the Apps
Script editor's **Executions** tab to see what came in.

## 5 · Updating the script later

If you change the Apps Script code, you must **deploy a new version**
(Deploy → Manage deployments → pencil icon → "New version" → Deploy).
The Web app URL stays the same across versions, so the HTML doesn't need
updating.

---

## Notes

- **Why FormData and `no-cors`:** Google Apps Script web apps don't
  return CORS headers. Posting with `Content-Type: application/json`
  triggers a CORS preflight that fails. We post as
  `application/x-www-form-urlencoded` (FormData does this automatically)
  with `mode: 'no-cors'` to skip the preflight. The trade-off is that
  the browser can't read the response body or status — so the site shows
  success immediately on submit and trusts the row landed. Watch the
  sheet during testing to confirm.

- **Spam:** the endpoint will accept any POST. If bots find it and you
  start getting junk rows, the cheapest defense is a honeypot — add a
  hidden text field to the form and reject any submission that fills it.
  Drop me a note if it happens and I'll wire one up.

- **Privacy:** the script runs as your Google account, so the sheet
  lives in your Drive only. No third party sees the data.

- **Removing someone:** just delete their row from the sheet. There is
  no separate unsubscribe flow yet — if you start sending real
  newsletters, do that through Buttondown / ConvertKit / similar and
  use this Sheet only as the funnel-of-record.

- **Rotating the URL:** if you ever need to invalidate the endpoint,
  delete the deployment in Apps Script (Deploy → Manage deployments →
  archive). The HTML's empty `content=""` will fall back to the
  design-only success state without erroring.

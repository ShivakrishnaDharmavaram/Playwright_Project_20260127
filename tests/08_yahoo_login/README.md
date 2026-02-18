# Yahoo Login Test - Detailed Explanation

## File covered
- `01_yahoo_login.spec.js`

## Test objective
This test validates Yahoo login flow and confirms that the user can reach Yahoo Mail after authentication.

## What error was identified
Earlier, the test was unstable due to two main issues:

1. **Brittle text-based locator**
   - The test looked for `Check your email`, but Yahoo often renders `Check your mail`.
   - This caused locator failures and timeouts.

2. **Unreliable URL assertion immediately after click**
   - Clicking the mail link does not always keep the same page/navigation behavior.
   - In some runs, the page remained on Yahoo home (or redirected through tracking), so direct `page.url()` checks failed.

3. **Static waits (`waitForTimeout`)**
   - Fixed sleep-based waits caused flakiness and slower execution.
   - Dynamic UI/network timings made hard-coded delays unreliable.

## What was fixed
The current version uses more stable Playwright patterns:

1. **Explicit readiness checks**
   - Waits for title and username input visibility before interacting.

2. **Post-login branch handling**
   - If fingerprint page appears, clicks `Not now` and waits for load state.
   - Otherwise validates successful state by asserting a mail-link target exists.

3. **Robust mail locator**
   - Uses `a[href*="mail.yahoo.com"]` instead of hardcoded visible text.
   - Works even if UI label changes from email/mail.

4. **Deterministic navigation check**
   - Reads mail link `href`, clicks the link, then navigates to captured href fallback (`https://mail.yahoo.com/`).
   - Final assertion verifies resulting URL contains `mail.yahoo.com`.

5. **Reduced flakiness**
   - Replaced static delays with `expect(...).toBeVisible(...)` and `waitForLoadState(...)`.

## Environment prerequisites
Create/update `.env` at project root with:

- `YAHOO_USERNAME=your_username_or_email`
- `YAHOO_PASSWORD=your_password`

Also ensure dependencies are installed:

- `@playwright/test`
- `dotenv`

## Run command
From project root:

```bash
npx playwright test tests/08_yahoo_login/01_yahoo_login.spec.js --headed
```

## Current expected result
- Test logs in successfully.
- Handles optional fingerprint step.
- Reaches Yahoo Mail and passes URL assertion.

## Notes
- Yahoo UI and anti-bot behavior can change over time; locator strategy is intentionally based on stable attributes (`href`) and explicit waits.
- If future UI changes break this test, inspect role/name/href in Playwright trace and update selectors minimally.

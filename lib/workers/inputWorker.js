import { screenshotDebugStoragePath } from "../scanner-utils";
import payloads from "../payloads";
import browserInstance from "../browserInstance";
import reportWorker from "./reportWorker";

async function testAdvanced(url, selectors, options) {
  const results = [];
  const { screenDebug, waitForSelectorTimeout } = options;

  for (let selectorIndex = 0; selectorIndex < selectors.inputs.length; selectorIndex++) {
    const selector = selectors.inputs[selectorIndex];
    const { page, browser } = await browserInstance.getPage(url, options);
    let xssFound = false;
    let xssPayload = "";

    // Listen to console messages
    page.on("console", async (_console) => {
      if (_console.text().includes("ssxss")) {
        xssFound = true;
        results.push({ selector, payload: xssPayload, evidence: "console log detected" });
        console.log("\x1b[32m", `XSS found on ${selector} with payload: ${xssPayload}`);
      }
    });

    // Listen to dialogs/alerts
    page.on("dialog", async (_dialog) => {
      if (_dialog.message().includes("ssxss")) {
        xssFound = true;
        results.push({ selector, payload: xssPayload, evidence: "alert/dialog detected" });
        _dialog.accept();
        console.log("\x1b[32m", `XSS found on ${selector} with payload: ${xssPayload}`);
      }
    });

    for (let payloadIndex = 0; payloadIndex < payloads.length; payloadIndex++) {
      xssPayload = payloads[payloadIndex];

      if (!xssFound) {
        try {
          await page.$eval(selector, (el, val) => { el.value = val; }, xssPayload);

          await page.waitForSelector(selectors.submit);
          await page.click(selectors.submit);

          await page.waitForNavigation({ timeout: waitForSelectorTimeout }).catch(() => {});

        } catch {
          // Ignore errors
        } finally {
          await page.goto(url, { waitUntil: "networkidle2" });
        }
      }
    }

    await browser.close();
  }

  return results; // ✅ Return collected XSS results
}

export const inputWorker = {
  testAdvanced,
};

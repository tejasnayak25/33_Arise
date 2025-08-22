import { screenshotDebugStoragePath } from "../scanner-utils";
import payloads from "../payloads";
import {browserInstance} from "../browserInstance";
import {reportWorker} from "./reportWorker";

async function testUrl(url, options) {
  const { screenDebug } = options;
  const { page, browser } = await browserInstance.getPage(url, options);
  let xssFound = false;
  let xssPayload = "";

  page.on("console", async (_console) => {
    if (_console.text().includes("ssxss")) {
      xssFound = true;
      reportWorker.saveToJson(url, "", xssPayload);
      console.log("\x1b[32m", `xss found on ${url} with ${xssPayload}`);
    }
  });
  page.on("dialog", async (_dialog) => {
    if (_dialog.message().includes("ssxss")) {
      xssFound = true;
      reportWorker.saveToJson(url, "", xssPayload);
      _dialog.accept();
      console.log("\x1b[32m", `xss found on ${url} with ${xssPayload}`);
    }
  });

  for (
    let payloadIndex = 0;
    payloadIndex < payloads.length;
    payloadIndex += 1
  ) {
    const payload = payloads[payloadIndex];
    const debugScreenshot = async (currentPage, debugName) => {
      if (screenDebug) {
        await currentPage.screenshot({
          path: `${screenshotDebugStoragePath}/${debugName}-${payloadIndex}.png`,
        });
      }
    };
    if (xssFound === false && !payload.includes("onmouseover")) {
      try {
        xssPayload = payload;
        await page.goto(`${url}${payload}`, { waitUntil: "networkidle2" });
        await debugScreenshot(page, "initial-view");
      } catch (error) {
        await debugScreenshot(page, "error-evaluate-url");
      } finally {
        await debugScreenshot(page, "test-page-end");
      }
    }
  }

  await browser.close();
}
export const urlWorker = {
  testUrl,
};

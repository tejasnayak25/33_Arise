import {browserInstance} from "./browserInstance";
import {inputWorker} from "./workers/inputWorker";
import {urlWorker} from "./workers/urlWorker";
import sqlPayloads from "./sqlPayloads";
import { reportWorker } from "./workers/reportWorker";
import globals from "./globals";

let { createInitialReport, clearScreenshots, closeReport, getJsonReport, saveToJson } = reportWorker;

const sqlErrors = [
  "you have an error in your sql syntax",
  "warning: mysql",
  "unclosed quotation mark",
  "quoted string not properly terminated",
  "mysql_fetch",
  "mysql_num_rows",
  "native client",
  "syntax error",
  "pg_query",
  "sqlstate[",
  "ora-01756",
  "sqlite3::sqlexception",
  "odbc",
];

function beforeScanning(url) {
  createInitialReport(url);
  clearScreenshots();
  console.log("\x1b[36m%s\x1b[0m", `Start scanning ${url}`);
}

function afterScanning(url, options) {
  closeReport(url);
  if (options.result === "stream") {
    return getJsonReport(url);
  }
  return "";
}

async function scanSqlUrlParam(url, options) {
  beforeScanning(url);
  const findings = [];
  let page, browser;

  try {
    const pageInfo = await browserInstance.getPage(url, options);
    page = pageInfo.page;
    browser = pageInfo.browser;

    const urlObj = new URL(url);
    const params = [...urlObj.searchParams.keys()]; // scan real parameters

    for (const payload of sqlPayloads) {
      for (const param of params) {
        const testUrl = new URL(url);
        testUrl.searchParams.set(param, payload);

        const t0 = Date.now();
        try {
          await page.goto(testUrl.toString(), { waitUntil: "domcontentloaded", timeout: options.navigationTimeout || 10000 });
        } catch {}

        const elapsed = Date.now() - t0;
        let content = "";
        try { content = (await page.content()).toLowerCase(); } catch {}

        const match = sqlErrors.find(e => content.includes(e));
        const isTimeProbe = /sleep|delay|pg_sleep|waitfor/i.test(payload);

        if (match) {
          findings.push({
            vector: "urlParam",
            param,
            payload,
            evidence: match,
            testedUrl: testUrl.toString(),
            status: "VULNERABLE (error-based)"
          });
        } else if (isTimeProbe && elapsed > 5000) {
          findings.push({
            vector: "urlParam",
            param,
            payload,
            evidence: `Response delay ~${elapsed}ms`,
            testedUrl: testUrl.toString(),
            status: "SUSPECT (time-based)"
          });
        }
      }
    }

    return { url, scanType: "sqlParam", vulnerabilities: findings };

  } catch (error) {
    console.error("Error in scanSqlUrlParam:", error.message || error);
    return { url, scanType: "sqlParam", vulnerabilities: [], error: error.message || String(error) };
  } finally {
    try { if (browser) await browser.close(); } catch {}
    closeReport(url);
  }
}

export const scan = async function scan(url, options, selectors) {
  beforeScanning(url);
  switch (options.scanType) {
    case globals.inputs:
      const xssVulns = await inputWorker.testAdvanced(url, selectors, options);
      return { vulnerabilities: xssVulns };
    case globals.sqlParam:
      return await scanSqlUrlParam(url, options);
    case globals.urlParam:
      return await urlWorker.testUrl(url, options);
    default:
      return "";
  }
}

export default {
  scan
};
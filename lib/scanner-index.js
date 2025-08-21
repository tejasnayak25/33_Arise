import ssXss from "./scanner";
import { forms, urlParam, inputs, sqlParam, stream } from "./globals";

// Import payloads
import xssPayloads from "./payloads";
import sqlPayloads from "./sqlPayloads";

// const targetUrl = process.argv[2];
// const modeArg = process.argv[3] || "both"; // "both" | "xss" | "sql" | "forms" | "urlParam"

const optionsBase = {
  result: stream,
  userAgent: "UA-SSXSS",
  navigationTimeout: 10000, // increased for SQLi time-based
  waitForSelectorTimeout: 5000,
  screenDebug: false,
};

const selectors = {
  inputs: ['input[name="email"]', 'input[name="username"]', 'input[name="searchFor"]'],
  submit: 'input[type="submit"]',
};

export const runScan = async function runScan(targetUrl, modeArg) {
    if (!targetUrl) {
        console.error("❌ No URL provided");
        return;
    }
    try {
    console.log(`🚀 Starting scan on: ${targetUrl} (mode: ${modeArg})`);

    const finalResults = {
      target: targetUrl,
      vulnerabilities: [],
    };

    // --- XSS / forms scan ---
    if (modeArg === "both" || modeArg === "xss" || modeArg === "forms") {
      const xssOptions = { ...optionsBase, scanType: inputs, payloads: xssPayloads };
      const xssReport = await ssXss.scan(targetUrl, xssOptions, selectors);

      const xssVulns = (xssReport && xssReport.vulnerabilities) || [];
      finalResults.vulnerabilities.push({
        type: "XSS",
        items: Array.isArray(xssVulns) ? xssVulns.map(v => ({
          selector: v.selector,
          payload: v.payload,
          evidence: "console log detected"
        })) : [],
      });
    }

    // --- SQL Injection scan ---
    if (modeArg === "both" || modeArg === "sql" || modeArg === "urlParam") {
      const sqlOptions = { ...optionsBase, scanType: sqlParam, payloads: sqlPayloads };
      const sqlReport = await ssXss.scan(targetUrl, sqlOptions, selectors);

      const sqlVulns = (sqlReport && sqlReport.vulnerabilities) || [];
      finalResults.vulnerabilities.push({
        type: "SQL Injection",
        items: Array.isArray(sqlVulns) ? sqlVulns.map(v => ({
          param: v.param,
          payload: v.payload,
          evidence: v.evidence,
          status: v.status
        })) : [],
      });
    }

    // --- Output combined results ---
    console.log("\n✅ Final Combined Results:");
    console.log(JSON.stringify(finalResults, null, 2));
    console.log("\n📄 Scan completed.");
    return finalResults;
  } catch (err) {
    console.error("❌ Scan failed:", err && err.message ? err.message : err);
  }
}
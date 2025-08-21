import browserInstance from "../browserInstance";
import payloads from "../sqlPayloads";

// Common DB error fingerprints
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

function buildTestUrl(baseUrl, payload) {
  try {
    const u = new URL(baseUrl);
    u.searchParams.append("ssxss", payload);
    return u.toString();
  } catch {
    return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}ssxss=${encodeURIComponent(payload)}`;
  }
}

export const testUrl = async function testUrl(url, options) {
  const findings = [];
  const { page, browser } = await browserInstance.getPage(url, options);

  try {
    for (const payload of payloads) {
      const testUrl = buildTestUrl(url, payload);
      const t0 = Date.now();

      try {
        await page.goto(testUrl, {
          waitUntil: "domcontentloaded",
          timeout: options.navigationTimeout || 5000,
        });
      } catch (_) {}

      const elapsed = Date.now() - t0;
      let content = "";
      try {
        content = (await page.content()).toLowerCase();
      } catch (_) {}

      const match = sqlErrors.find((e) => content.includes(e));
      const isTimeProbe = /sleep|delay/i.test(payload);

      if (match) {
        findings.push({
          vector: "urlParam",
          param: "ssxss",
          payload,
          evidence: match,
          testedUrl: testUrl,
          status: "VULNERABLE (error-based)",
        });
      } else if (isTimeProbe && elapsed > 4000) {
        findings.push({
          vector: "urlParam",
          param: "ssxss",
          payload,
          evidence: `Response delay ~${elapsed}ms`,
          testedUrl: testUrl,
          status: "SUSPECT (time-based)",
        });
      }
    }
  } finally {
    await browser.close();
  }

  return {
    url,
    scanType: "sqlParam",
    vulnerabilities: findings,
  };
}

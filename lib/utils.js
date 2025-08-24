import dns from "dns/promises";
import fetch from "node-fetch";
import puppeteer from 'puppeteer'
import puppeteerCore from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

export const sanitizeString = (str) => {
  if (typeof str !== 'string') {
    return '';
  }

  // Regex to find sensitive keys and their values
  // Matches keys like key, secret, password, token, auth, credentials, private
  // Followed by = or : and then the value (captured)
  const regex = /\b(key|secret|password|token|auth|credentials|private)\b[:=]\s*['"]?([a-z0-9-_./+=]+)['"]?/gi;

  // Replace the value with a placeholder
  return str.replace(regex, (match, key) => `${key}:[REDACTED]`);
}

export const containsDangerousUnescaped = function containsDangerousUnescaped(html, raw) {
  // Appears verbatim (not HTML-escaped)
  if (html.includes(raw)) return true;
  // If it appears escaped (&lt;script&gt;...) that is usually safe—return false
  return false;
}

export const mutateUrlParam = function mutateUrlParam(u, key, value) {
  const url = new URL(u);
  url.searchParams.set(key, value);
  return url.toString();
}

export const enumerateParamKeys = function enumerateParamKeys(u) {
  const url = new URL(u);
  return [...url.searchParams.keys()];
}

/** Make a timed request and return { ms, status, data, headers } */
export const timedGet = async function timedGet(url) {
  const t0 = Date.now();
  try {
    const res = await axios.get(url, { validateStatus: () => true, timeout: 15000 });
    return { ms: Date.now() - t0, status: res.status, data: res.data, headers: res.headers, error: null };
  } catch (err) {
    return { ms: Date.now() - t0, status: null, data: "", headers: {}, error: err.message || String(err) };
  }
}

export const SQL_ERROR_PATTERNS = [
  /you have an error in your sql syntax/i,           // MySQL/MariaDB
  /warning: mysql/i,
  /unclosed quotation mark after the character string/i, // MSSQL
  /quoted string not properly terminated/i,           // Oracle
  /psql:.*syntax error/i, /postgresql.*syntax/i,
  /sqlite error/i,
  /odbc sql server driver/i
];

export const SQL_TIME_PAYLOADS = [
  `' OR SLEEP(3)-- -`,               // MySQL/Maria
  `" OR SLEEP(3)-- -`,
  `'; WAITFOR DELAY '0:0:3'--`,      // MSSQL
  `"; WAITFOR DELAY '0:0:3'--`
];

export const SQL_BOOLEAN_PAYLOADS = [
  `' OR '1'='1`, `" OR "1"="1`, `' AND '1'='2`, `" AND "1"="2`
];

export const XSS_REFLECTED_PAYLOADS = [
  `<script>window.__xss__=1</script>`,
  `"><script>window.__xss__=1</script>`,
  `"><img src=x onerror="window.__xss__=1">`
];

export const getIP = async function getIP(url) {
  const hostname = new URL(url).hostname;
  const { address } = await dns.lookup(hostname, { family: 4 });
  return address;
}

export const checkSecurity = async function checkSecurity(url) {
  const res = await fetch(url, { method: "GET" });
  const headers = Object.fromEntries(res.headers);

  // Firewall / WAF detection
  let firewall = "None";
  if (headers.server?.toLowerCase().includes("cloudflare")) firewall = "Cloudflare";
  else if (headers["x-sucuri-id"]) firewall = "Sucuri";
  else if (headers["cf-ray"]) firewall = "Cloudflare (ray ID)";
  else if (headers.server?.toLowerCase().includes("akamai")) firewall = "Akamai";

  // Security headers
  const securityHeaders = {
    "Strict-Transport-Security": headers["strict-transport-security"] || false,
    "Content-Security-Policy": headers["content-security-policy"] || false,
    "X-Frame-Options": headers["x-frame-options"] || false,
    "X-Content-Type-Options": headers["x-content-type-options"] || false,
    "Referrer-Policy": headers["referrer-policy"] || false,
    "Permissions-Policy": headers["permissions-policy"] || false,
  };

  return { firewall, securityHeaders };
}

let Browser = null;

export const getBrowser = async () => {
  if(Browser) return Browser;
  try {
    if (process.env.VERCEL_ENV === 'production') {
      Browser = await puppeteerCore.launch({
        args: chromium.args,
        headless: true,
        executablePath: await chromium.executablePath(),
        ignoreHTTPSErrors: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--single-process",
        ],
        ignoreDefaultArgs: ["--disable-extensions"],
        ignoreHTTPSErrors: true,
      })
    } else {
      Browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })
    }

    if (!Browser) throw new Error("Browser launch failed");
  } catch (err) {
    console.error("Error launching browser:", err);
    Browser = null;
  }

  return Browser;
};


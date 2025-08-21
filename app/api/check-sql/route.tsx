import { NextRequest, NextResponse } from "next/server";
import { page } from "@/lib/puppeteer-setup";
import { runAI } from "@/lib/ai-init";
import { enumerateParamKeys, timedGet, mutateUrlParam, SQL_ERROR_PATTERNS, SQL_BOOLEAN_PAYLOADS, SQL_TIME_PAYLOADS } from "@/lib/utils";

export async function POST(request: NextRequest) {
    try {
        let { url:baseUrl } = await request.json();        
        const params = enumerateParamKeys(baseUrl);
        const results = [];

        const baseline = await timedGet(baseUrl);
        const baselineLen = (baseline.data || "").length;

        for (const key of params) {
            const perParamFindings: any = { param: key, issues: [] };

            for (const payload of [`'`, `"`, ...SQL_BOOLEAN_PAYLOADS]) {
            const url = mutateUrlParam(baseUrl, key, payload);
            const res = await timedGet(url);
            const body = String(res.data || "");
            const matched = SQL_ERROR_PATTERNS.find((re) => re.test(body));
            if (matched) {
                perParamFindings.issues.push({
                type: "SQLi:Error-Based",
                payload,
                evidence: "DB error signature in response",
                status: res.status
                });
                break; // one is enough to flag
            }
            // crude diff heuristic: big length swing or 500s
            const diff = Math.abs(body.length - baselineLen);
            if (res.status >= 500 || diff > baselineLen * 0.5) {
                perParamFindings.issues.push({
                type: "SQLi:Possible Error/Boolean",
                payload,
                evidence: `Status ${res.status} or large content delta (${diff} chars)`
                });
                break;
            }
            }

            // 2) Boolean-based (compare responses for true/false payloads)
            const trueUrl = mutateUrlParam(baseUrl, key, `' OR '1'='1`);
            const falseUrl = mutateUrlParam(baseUrl, key, `' AND '1'='2`);
            const [rTrue, rFalse] = await Promise.all([timedGet(trueUrl), timedGet(falseUrl)]);
            const delta = Math.abs(String(rTrue.data).length - String(rFalse.data).length);
            if (delta > baselineLen * 0.3) {
            perParamFindings.issues.push({
                type: "SQLi:Boolean-Based",
                payloads: [`' OR '1'='1`, `' AND '1'='2`],
                evidence: `Response size delta between boolean payloads: ${delta}`
            });
            }

            // 3) Time-based blind
            for (const payload of SQL_TIME_PAYLOADS) {
            const url = mutateUrlParam(baseUrl, key, payload);
            const res = await timedGet(url);
            if (res.ms - baseline.ms > 2500 && res.ms > 2800) {
                perParamFindings.issues.push({
                type: "SQLi:Time-Based",
                payload,
                evidence: `Response delayed (${res.ms}ms) vs baseline (${baseline.ms}ms)`
                });
                break;
            }
            }

            if (perParamFindings.issues.length) results.push(perParamFindings);
        }

        return NextResponse.json({
            category: "SQL Injection",
            vulnerable: results.length > 0,
            details: results,
            recommendations: [
            "Use parameterized queries / prepared statements everywhere.",
            "Avoid string concatenation for SQL; prefer query builders/ORM.",
            "Validate and constrain input (length, type, whitelist).",
            "Use least-privilege DB accounts; disable verbose SQL errors in prod."
            ]
        });
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}
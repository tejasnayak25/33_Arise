import { NextRequest, NextResponse } from "next/server";
import { page } from "@/lib/puppeteer-setup";
import { runAI } from "@/lib/ai-init";

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();        
        await page.goto(url, { waitUntil: "networkidle0" });

        const metrics = await page.metrics();
        let perf = await page.evaluate(() => JSON.stringify(performance.toJSON()));

        if(perf) {
            perf = JSON.parse(perf);
        }
        let ev = await runAI(JSON.stringify({metrics, perf}), "eval_perf");
        if(ev) {
            ev = await JSON.parse(ev);
        }
        return NextResponse.json({ metrics, perf, ev });
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}
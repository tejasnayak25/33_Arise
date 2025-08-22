import { NextRequest, NextResponse } from "next/server";
import { runAI } from "@/lib/ai-init";
import { getBrowser } from "@/lib/utils";

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();        
        const browser:any = await getBrowser();
        const page = await browser.newPage();
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
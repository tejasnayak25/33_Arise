import { NextRequest, NextResponse } from "next/server";
import { page } from "@/lib/puppeteer-setup";
import { AxePuppeteer } from '@axe-core/puppeteer';

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();
        await page.goto(url, { waitUntil: "networkidle0" });

        // Inject axe-core and run accessibility tests
        const results = await new AxePuppeteer(page).analyze();

        if (!results) {
            return NextResponse.json({ error: "Scan failed" }, { status: 500 });
        }

        return NextResponse.json({ results: results.violations });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: e });
    }
}
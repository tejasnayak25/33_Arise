import { NextRequest, NextResponse } from "next/server";
import { AxePuppeteer } from '@axe-core/puppeteer';
import { getBrowser } from "@/lib/utils";

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();
        const browser:any = await getBrowser();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle0" });

        // Inject axe-core and run accessibility tests
        const results = await new AxePuppeteer(page).analyze();

        if (!results) {
            return NextResponse.json({ error: "Scan failed" }, { status: 500 });
        }

        await browser.close();

        return NextResponse.json({ results: results.violations });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: e });
    }
}
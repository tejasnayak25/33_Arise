import { NextRequest, NextResponse } from "next/server";
import { page } from "@/lib/puppeteer-setup";
import { runScan } from "@/lib/scanner-index";

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();
        let data = await runScan(url, "xss");
        return NextResponse.json({ data });
        return;
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}
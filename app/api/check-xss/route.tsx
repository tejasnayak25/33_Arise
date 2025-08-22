import { NextRequest, NextResponse } from "next/server";
import { runScan } from "@/lib/scanner-index";

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();
        let data = await runScan(url, "xss");

        if (!data) {
            return NextResponse.json({ error: "Scan failed" }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}
import { NextRequest, NextResponse } from "next/server";
import { page } from "@/lib/puppeteer-setup";

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();
        
        return;
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}
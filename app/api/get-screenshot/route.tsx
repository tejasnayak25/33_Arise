import { NextRequest, NextResponse } from "next/server";
import { page } from "@/lib/puppeteer-setup";

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();
        await page.goto(url);
        let bin:any = (await page.screenshot({encoding: 'binary'}));
        let blob = new Blob([bin], {type: 'image/png'});
        return new NextResponse(
            blob.stream(),
            {
                headers: {
                    "Content-Type": "image/png",
                },
            }
        );
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}
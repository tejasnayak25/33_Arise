import { NextRequest, NextResponse } from "next/server";
import { getBrowser } from "@/lib/utils";

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();
        const browser:any = await getBrowser();
        const page = await browser.newPage();
        await page.goto(url);
        let bin:any = (await page.screenshot({encoding: 'binary'}));
        let blob = new Blob([bin], {type: 'image/png'});
        await browser.close();
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
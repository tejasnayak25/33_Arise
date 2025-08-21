import { NextRequest, NextResponse } from "next/server";
import { page } from "@/lib/puppeteer-setup";
import { sanitizeString } from "@/lib/utils";
import { runAI } from "@/lib/ai-init";

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();
        await page.goto(url);
        let meta = await page.evaluate(() => {
            let metaTags = document.querySelectorAll("meta,title,link,h1,h2,h3,h4,h5,h6,img,a,p,ul,ol,script");
            let metaData:any = [];
            metaTags.forEach((tag) => {
                metaData.push(tag.outerHTML);
            });
            return metaData;
        });
        if(meta && meta.length > 0) {
            meta = meta.map((m:any) => sanitizeString(m));
        }
        let ev = await runAI(JSON.stringify(meta), "eval_meta");
        if(ev) {
            ev = await JSON.parse(ev);
        }
        return NextResponse.json({ meta, ev });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: e });
    }
}
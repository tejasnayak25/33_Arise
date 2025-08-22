import { NextRequest, NextResponse } from "next/server";
import { page } from "@/lib/puppeteer-setup";
import { getIP, checkSecurity } from "@/lib/utils";
import { runAI } from "@/lib/ai-init";

export async function POST(request: NextRequest) {
    try {
        let { url } = await request.json();
        const safeBrowsingRes = await fetch(
            `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSE}`,
            {
            method: "POST",
            body: JSON.stringify({
                client: { clientId: "web-shield", clientVersion: "1.0" },
                threatInfo: {
                threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: ["URL"],
                threatEntries: [{ url }],
                },
            }),
            headers: { "Content-Type": "application/json" },
            }
        );

        let blackListed = false;
        const safeData = await safeBrowsingRes.json();
        let threats = [];
        if(safeData && safeData.matches) {
            blackListed = true;
            threats = safeData.matches.map((match:any) => match.threatType);
        }
        let ip = await getIP(url);
        let security:any = await checkSecurity(url);
        if(security) {
            security = await runAI(security, "eval_security");
            console.log(security)
        }
        await page.goto(url, { waitUntil: "domcontentloaded" });
        let title = await page.title();
        return NextResponse.json({
            title: title,
            url,
            ip,
            blackListed,
            ...(security ?? {}),
            threats
        });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: e });
    }
}
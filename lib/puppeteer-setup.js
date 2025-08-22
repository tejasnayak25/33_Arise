// import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the Browser and open a new blank page

let Browser;
try {
    const isVercel = !!process.env.VERCEL_ENV;
    let puppeteer,
      launchOptions = {
        headless: true,
      };

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium")).default;
      puppeteer = await import("puppeteer-core");
      launchOptions = {
        ...launchOptions,
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      };
    } else {
      puppeteer = await import("puppeteer");
    }

    Browser = await puppeteer.launch(launchOptions);
} catch (e) {
    Browser = null;
}

export const browser = Browser;
export const page = await Browser.newPage();
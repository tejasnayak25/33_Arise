import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser'
});
export const page = await browser.newPage();
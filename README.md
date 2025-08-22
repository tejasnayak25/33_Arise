
# Web Auditor

A web security auditing tool built with Next.js to help you identify common vulnerabilities in your web applications.

This tool uses a headless browser to simulate user interaction and test for security flaws like SQL Injection and Cross-Site Scripting (XSS).

## Features

-   **SQL Injection (SQLi) Scanning**:
    -   Tests URL parameters for error-based SQLi vulnerabilities.
    -   Detects time-based blind SQLi vulnerabilities by measuring response delays.
-   **Cross-Site Scripting (XSS) Scanning**:
    -   Scans for reflected XSS vulnerabilities in URL parameters.
    -   Automatically discovers forms and tests input fields for stored XSS.
-   **Headless Browser Testing**: Utilizes Puppeteer to run tests in a realistic browser environment.
-   **JSON Reporting**: Generates detailed reports of any findings in JSON format.

## How It Works

The Web Auditor is composed of several workers that target specific vulnerability types:

-   `sqlWorker`: Injects a variety of SQL payloads into URL parameters and analyzes the page content and response time for signs of a vulnerability.
-   `urlWorker`: Appends XSS payloads to the URL to test for reflected XSS, listening for JavaScript execution via console logs or dialog pop-ups.
-   `formWorker` & `inputWorker`: These work together to find all forms on a page, identify input fields, and then systematically inject XSS payloads to test for stored XSS.
-   `reportWorker`: Collects findings from all workers and saves them into a structured JSON report.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

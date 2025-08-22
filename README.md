
# SiteScan

A comprehensive, AI-powered web auditing tool designed to analyze and improve your website's SEO, performance, security and accessibility.

SiteScan leverages a headless browser (Puppeteer) and the Gemini AI to conduct in-depth analysis, providing not just raw data but also intelligent ratings, actionable recommendations, and even code fixes to help you optimize your web applications.

## Features

### Comprehensive Auditing

-   **SEO Optimization**: Analyzes meta tags, headers, images, and content structure to provide recommendations for improving search engine ranking.
-   **Performance Analysis**: Measures key web vitals and performance metrics (LCP, CLS, TTFB) to identify and resolve bottlenecks.
-   **Security Scanning**:
    -   **Vulnerability Testing**: Actively scans for common flaws like SQL Injection (SQLi) and Cross-Site Scripting (XSS).
    -   **Security Header Analysis**: Checks for the presence and correct configuration of crucial security headers.
    -   **Firewall Detection**: Identifies common Web Application Firewalls (WAF).
    -   **Blacklist Check**: Verifies your URL against Google's Safe Browsing list for malware or phishing threats.
-   **Accessibility Compliance**: Evaluates your site against accessibility standards to ensure it's usable by everyone.

### AI-Powered Analysis & Recommendations

-   **Intelligent Ratings**: Get an AI-generated score from 1-10 for each audit category, giving you a clear picture of your site's health.
-   **Actionable Recommendations**: Receive clear, prioritized suggestions on how to address identified issues.
-   **Automated Fixes**: For many issues, SiteScan provides ready-to-use code snippets and corrected HTML tags to speed up implementation.

### Technical Features

-   **Headless Browser Testing**: Utilizes Puppeteer for realistic, browser-based scanning.
-   **Detailed JSON Reporting**: Generates structured reports for easy integration with other tools and workflows.

## Getting Started

This is a Next.js project. To get it running locally:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open the application:**
    Open http://localhost:3000 with your browser to start scanning.
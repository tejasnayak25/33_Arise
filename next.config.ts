import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  outputFileTracingIncludes: {
      // For App Router:
      'app/api/**/*': ['node_modules/@sparticuz/chromium/bin/*'],
      // For Pages Router:
      // 'pages/api/**/*': ['node_modules/@sparticuz/chromium/bin/'],
    },
};

export default nextConfig;

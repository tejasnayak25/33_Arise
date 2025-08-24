import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  // outputFileTracingIncludes: {
  //   'app/api/**/*': [
  //     './node_modules/@sparticuz/chromium/**/*',
  //   ],
  // }
};

export default nextConfig;

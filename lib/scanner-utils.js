import path from "path";

const screenshotDebugStoragePath = path.join(
  process.cwd(),
  "/src/debug-screenshots"
);
const resultsPath = path.join(process.cwd(), "/src/results");

export const utils = {
  screenshotDebugStoragePath,
  resultsPath,
};

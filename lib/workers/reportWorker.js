import fs from "fs";
import path from "path";

import { resultsPath, screenshotDebugStoragePath } from "../scanner-utils";

let xssLogStream;
const formattedUrl = (url) =>
  url
    .replace("http://", "")
    .replace("https://", "")
    .replace(/\//g, "-")
    .replace(/\?/g, "")
    .replace(/=/g, "");

const fileName = (url) => path.join(resultsPath, `${formattedUrl(url)}.json`);

function createInitialReport(url) {
  console.log("\x1b[36m%s\x1b[0m", "Creating report");
  const file = fileName(url);
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
  const initialData = `{"result":{"url":"${url}", "vulnerabilities":[`;
  fs.writeFileSync(file, initialData);
  xssLogStream = fs.createWriteStream(file, { flags: "a" });
}
function closeReport(url) {
  console.log("\x1b[36m%s\x1b[0m", "Closing report");
  xssLogStream.end();
  const file = fileName(url);
  const reportData = fs.readFileSync(file, "utf8");
  const last = reportData.charAt(reportData.length - 1);
  const sanitizedReportData =
    last === "," ? `${reportData.slice(0, -1)}]}}` : `${reportData}]}}`;
  fs.writeFileSync(file, sanitizedReportData);
}
function getJsonReport(url) {
  console.log("\x1b[36m%s\x1b[0m", "Sending JSON report");
  const file = fileName(url);
  const reportData = fs.readFileSync(file, "utf8");
  return reportData;
}
function clearScreenshots() {
  console.log("\x1b[36m%s\x1b[0m", "Clearing screenshots");
  if (fs.existsSync(screenshotDebugStoragePath)) {
    fs.readdir(screenshotDebugStoragePath, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (file !== ".gitkeep") {
          fs.unlink(path.join(screenshotDebugStoragePath, file), (error) => {
            if (error) throw error;
          });
        }
      });
    });
  }
}
function saveToJson(url, selector, payload) {
  const xssData = {
    selector,
    payload,
  };
  xssLogStream.write(`${JSON.stringify(xssData)},`);
}

export const reportWorker = {
  createInitialReport,
  clearScreenshots,
  closeReport,
  getJsonReport,
  saveToJson,
};

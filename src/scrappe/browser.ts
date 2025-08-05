import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { PupperterConfigOptions } from "./types";

puppeteer.use(StealthPlugin());

export const launchBrowser = async (config: PupperterConfigOptions) => {
  const args = ["--no-sandbox", "--disable-setuid-sandbox"];

  if (config.args.length > 0) {
    args.push(...config.args);
  }

  const browser = await puppeteer.launch({
    headless: config.headless,
    args,
  });

  return browser;
};

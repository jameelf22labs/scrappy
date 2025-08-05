import { ScrappedJobsTypes } from "../common/types/jobs.types";
import envConfig from "../config/env-config";
import logger from "../config/logger-config";
import { launchBrowser } from "./browser";
import { scrappeRecentJobs } from "./scrapper/remote.co.scrapper";

export const scrappeRemoteCo = async (): Promise<ScrappedJobsTypes[]> => {
  logger.info("Remote.co started for scrapping");
  const config = {
    headless: false,
    userAgent: envConfig.UserAgent,
    args: [],
    url: "https://remote.co/remote-jobs/search?",
  };

  const browser = await launchBrowser(config);

  try {
    const data = await scrappeRecentJobs(browser, config);
    return data;
  } catch (error) {
    logger.error("Error scraping remote.co:", error);
    return [];
  } finally {
    await browser.close();
  }
};

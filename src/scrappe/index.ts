import { ScrappedJobsTypes } from "../common/types/jobs.types";
import envConfig from "../config/env-config";
import logger from "../config/logger-config";
import { launchBrowser } from "./browser";
import { scrappeRecentJobs } from "./scrapper/remote.co.scrapper";
import { PupperterConfigOptions } from "./types";

export type ScrappeRemoteCoArgs = {
  paginationLimit: number;
};

export const scrappeRemoteCo = async ({
  paginationLimit = 10,
}: ScrappeRemoteCoArgs): Promise<ScrappedJobsTypes[]> => {
  logger.info("Remote.co started for scrapping");

  const config: PupperterConfigOptions = {
    headless: true,
    userAgent: envConfig.UserAgent,
    args: [],
    url: "https://remote.co/remote-jobs/search?",
    paginationLimit: paginationLimit,
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

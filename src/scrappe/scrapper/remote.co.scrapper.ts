import { Browser, ElementHandle, Page } from "puppeteer";
import { PupperterConfigOptions } from "../types";
import { ScrappedJobsTypes } from "../../common/types/jobs.types";
import logger from "../../config/logger-config";
import { getAttribute, getTextContent } from "../utils/dom.utils";

const extractJobFromCard = async (
  jobCard: ElementHandle<Element>
): Promise<ScrappedJobsTypes> => {

  const titleAnchor = await jobCard.$("a.sc-bJYsdd.ghJpDT");
  const postedAtSpan = await jobCard.$(".sc-cgOKJv");
  const locationSpan = await jobCard.$(".sc-cVTEkj");
  const tagsListItems = await jobCard.$$("ul.sc-kNiDFA li");

  const jobTitle = await getTextContent(titleAnchor);
  const urlSuffix = await getAttribute(titleAnchor, "href");
  const postedAt = await getTextContent(postedAtSpan);
  const location = await getTextContent(locationSpan);
  
  const [remote, jobType, _, salary] = await Promise.all(
    tagsListItems.map((el) => getTextContent(el))
  );

  return {
    jobTitle,
    url: `https://remote.co${urlSuffix}`,
    postedAt,
    location,
    remote,
    jobType,
    salary,
  };
};

export const scrappeRecentJobs = async (
  browser: Browser,
  config: PupperterConfigOptions
): Promise<ScrappedJobsTypes[]> => {
  const jobs: ScrappedJobsTypes[] = [];

  try {
    const page = await browser.newPage();

    if (config.userAgent) {
      await page.setUserAgent(config.userAgent);
    }

    await page.goto(config.url, { waitUntil: "networkidle2" });
    logger.info("remote.co page opened");

    const jobCards = await page.$$(".sc-kPtRnN.DaJBs");

    for (const card of jobCards) {
      const job = await extractJobFromCard(card);
      jobs.push(job);
    }
  } catch (error) {
    logger.error("Scraping error: ", error);
  }

  return jobs;
};

import { Browser, ElementHandle } from "puppeteer";
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
    logger.info("Opened remote.co jobs page");

    let paginatedCount = 0;

    // given pagination limit size page data was scrapped
    while (paginatedCount < config.paginationLimit) {
      await page.waitForSelector(".sc-kPtRnN.DaJBs");

      const jobCards = await page.$$(".sc-kPtRnN.DaJBs");

      for (const card of jobCards) {
        try {
          const job = await extractJobFromCard(card);
          jobs.push(job);
        } catch (err) {
          logger.warn("Error from extract", err);
        }
      }

      const nextButton = await page.$(
        "#content > div.sc-iRGClc.fGkxoL > div > div.sc-bwUJOl.kTkjIM > div > ul > li.next"
      );

      const isDisabled = await nextButton?.evaluate((el) =>
        el.classList.contains("disabled")
      );

      if (!nextButton || isDisabled) {
        logger.info("No Pages");
        break;
      }

      logger.info(`Going to next page: ${paginatedCount + 1}`);

      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        nextButton.click(),
      ]);

      paginatedCount++;
    }
  } catch (error) {
    logger.error("Scraping error:", error);
  }

  return jobs;
};

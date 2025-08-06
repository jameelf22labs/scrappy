import nodeCron from "node-cron";
import { scrappeRemoteCo } from "..";
import logger from "../../config/logger-config";
import JobsQueryHelper from "../../database/helpers/job.query.helper";

export const runRemoteCoJob = () => {

  // run job every day 12:00 am
  nodeCron.schedule("0 0 * * *", async (task) => {
    logger.info(
      " remote.co jobs was scheduled ",
      task.triggeredAt.toISOString()
    );
    try {
      const jobs = await scrappeRemoteCo({ paginationLimit: 10 });

      if (!Array.isArray(jobs) || jobs.length === 0) {
        logger.warn("No jobs");
        return;
      }

      await JobsQueryHelper.insertDataByBatches(50, jobs);
      logger.info("Jobs are inserted Successfully");
    } catch (error) {
      logger.error("Error running Remote.co job", error);
    }
  });
};

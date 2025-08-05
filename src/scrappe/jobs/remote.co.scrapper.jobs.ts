import nodeCron from "node-cron";
import { scrappeRemoteCo } from "..";
import logger from "../../config/logger-config";
import { hashObject } from "../../common/utils/utility";
import JobsQueryHelper from "../../database/helpers/job.query.helper";

export const runRemoteCoJob = () => {
  nodeCron.schedule("0 0 * * *", async () => {
    try {
      const jobs = await scrappeRemoteCo({ paginationLimit: 10 });

      if (!Array.isArray(jobs) || jobs.length === 0) {
        logger.warn("No jobs");
        return;
      }

      const jobsWithHash = jobs.map((job) => ({
        ...job,
        haskey: hashObject(job),
      }));

      await JobsQueryHelper.insertDataByBatches(50, jobsWithHash);
    } catch (error) {
      logger.error("Error running Remote.co job", error);
    }
  });
};

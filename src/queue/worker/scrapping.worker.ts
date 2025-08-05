import { Job, Worker } from "bullmq";
import { QueueName } from "../constant";
import logger from "../../config/logger-config";
import { scrappeRemoteCo } from "../../scrappe";
import JobsQueryHelper from "../../database/helpers/job.query.helper";
import redisOptions from "../../config/redis-config";

export type ScrappingJobData = {
  paginationLimit: number;
};

const scrappingWorker = new Worker<ScrappingJobData>(
  QueueName.Scrapping,
  async (job: Job<ScrappingJobData>) => {
    logger.info(`Scrapping worker start they job ${job.id}`);
    try {
      const { paginationLimit } = job.data;
      const jobs = await scrappeRemoteCo({ paginationLimit });
      if (!Array.isArray(jobs) || jobs.length === 0) {
        logger.warn("No jobs");
        return;
      }
      await JobsQueryHelper.insertDataByBatches(50, jobs);
    } catch (error) {
      logger.error("Scrapping worker error "), error;
    }
  },
  {
    connection: redisOptions,
  }
);

export default scrappingWorker;

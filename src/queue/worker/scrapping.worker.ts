import { Job, Worker } from "bullmq";
import { QueueName } from "../constant";
import logger from "../../config/logger-config";
import { scrappeRemoteCo } from "../../scrappe";
import JobsQueryHelper from "../../database/helpers/job.query.helper";
import redisOptions from "../../config/redis-config";
import { EventStatus } from "../../database/types";
import { EventsQueryHelper } from "../../database/helpers/event.query.helper";

export type ScrappingJobData = {
  paginationLimit: number;
  eventId: string;
};

const scrappingWorker = new Worker<ScrappingJobData>(
  QueueName.Scrapping,
  async (job: Job<ScrappingJobData>) => {
    logger.info(`Scrapping worker start they job ${job.id}`);

    const eventId = job.data.eventId;

    try {
      await EventsQueryHelper.updateStatusById(
        { status: EventStatus.Running },
        eventId
      );
    } catch (error) {
      logger.error("Event update error", error);
    }

    try {
      const { paginationLimit } = job.data;
      const jobs = await scrappeRemoteCo({ paginationLimit });

      if (!Array.isArray(jobs) || jobs.length === 0) {
        logger.warn("No jobs");

        await EventsQueryHelper.updateStatusById(
          { status: EventStatus.Running, data: "No jobs" },
          eventId
        );
        return;
      }

      await JobsQueryHelper.insertDataByBatches(50, jobs);

      await EventsQueryHelper.updateStatusById(
        { status: EventStatus.Running, data: JSON.stringify(jobs) },
        eventId
      );

      logger.info(" Successfully inserted ");
    } catch (error) {
      logger.error("Scrapping worker error "), error;
      await EventsQueryHelper.updateStatusById(
        { status: EventStatus.Running, errorMessage: JSON.stringify(error) },
        eventId
      );
    }
  },
  {
    connection: redisOptions,
  }
);

export default scrappingWorker;

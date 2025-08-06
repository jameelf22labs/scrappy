import { ScrappedJobsTypes } from "../../common/types/jobs.types";
import logger from "../../config/logger-config";
import Jobs from "../models/Jobs.model";

const JobsQueryHelper = {
  insertDataByBatches: async (batchSize: number, jobs: ScrappedJobsTypes[]) => {
    if (!Array.isArray(jobs) || jobs.length === 0) return;

    for (let i = 0; i < jobs.length; i += batchSize) {
      const batch = jobs.slice(i, i + batchSize);

      try {
        const inserted = await Jobs.bulkCreate(batch, {
          updateOnDuplicate: [
            "jobTitle",
            "location",
            "jobType",
            "remote",
            "postedAt",
            "salary",
            "url",
          ],
        });

        logger.info(`Inserted ${inserted.length} jobs`);
      } catch (err) {
        logger.error(`Error inserting batches : `, err);
      }
    }
  },
};

export default JobsQueryHelper;

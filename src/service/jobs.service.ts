import { scrappeRemoteCo } from "../scrappe";
import { ScrappedJobsTypes } from "../common/types/jobs.types";

export const JobService = {
  startScrapping: async (): Promise<ScrappedJobsTypes[]> => {
    const jobs = await scrappeRemoteCo();
    return jobs;
  },
};

import { scrappeRemoteCo } from "../scrappe";
import { JobQueryParams, ScrappedJobsTypes } from "../common/types/jobs.types";
import Jobs from "../database/models/Jobs.model";
import { Op } from "sequelize";

export const JobService = {
  startScrapping: async (): Promise<ScrappedJobsTypes[]> => {
    const jobs = await scrappeRemoteCo({ paginationLimit: 10 });
    return jobs;
  },

  getAllJobs: async (queryParams: JobQueryParams) => {
    const {
      type: jobType,
      title: jobTitle,
      location,
      remote,
      page = 1,
      limit = 20,
    } = queryParams;

    const whereCondition: any = {};

    if (jobType) whereCondition.jobType = { [Op.iLike]: `%${jobType}%` };
    if (jobTitle) whereCondition.jobTitle = { [Op.iLike]: `%${jobTitle}%` };
    if (location) whereCondition.location = { [Op.iLike]: `%${location}%` };
    if (remote) whereCondition.remote = { [Op.iLike]: `%${remote}%` };

    const offset = (page - 1) * limit;
    const { rows: jobs, count: totalCount } = await Jobs.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    const totalPages = Math.ceil(totalCount / limit);
    return {
      jobs,
      totalCount,
      totalPages,
      currentPage: page,
    };
  },
};

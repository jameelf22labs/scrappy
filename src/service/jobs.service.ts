import { JobQueryParams } from "../common/types/jobs.types";
import Jobs from "../database/models/Jobs.model";
import { Op } from "sequelize";
import QueueLib from "../queue/queue.lib";
import { JobName, QueueName } from "../queue/constant";
import Events from "../database/models/Events.model";
import { v4 } from "uuid";
import { EventStatus } from "../database/types";

export const JobService = {
  startScrapping: async (paginationLimit: number) => {
    const event = await Events.create({
      id: v4(),
      errorMessage: "",
      data: "",
      isError: false,
      status: EventStatus.Pause,
    });

    QueueLib.enQueue(JobName.ScrappeRemoteco, QueueName.Scrapping, {
      paginationLimit,
      eventId: event.id,
    });

    return event.id
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

import { NextFunction, Request, Response } from "express";
import { JobService } from "../service/jobs.service";
import { JobQueryParams } from "../common/types/jobs.types";
import ApiResponse from "../common/decors/api.response.decor";
import HandleException from "../common/decors/handle.exception.decor";
import logger from "../config/logger-config";

export class JobsHandler {
  @HandleException
  @ApiResponse
  async handleStartScrapping(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const eventId = await JobService.startScrapping(request.body);

    return {
      message: "Scraping started successfully",
      data: { eventId },
    };
  }

  @HandleException
  @ApiResponse
  async handleGetAllJobs(
    request: Request,
    response: Response,
    next: NextFunction
  ) {

    logger.info('Get all jobs handler invoked')
    const filteredJobs = await JobService.getAllJobs(
      request.query as unknown as JobQueryParams
    );

    return {
      message: "Searched jobs are listed",
      data: { jobs: filteredJobs },
    };
  }
}

import { NextFunction, Request, Response } from "express";
import { JobService } from "../service/jobs.service";
import HandleException from "../common/decors/handle.exception.decor";
import { JobQueryParams } from "../common/types/jobs.types";

export class JobsHandler {
  @HandleException
  async handleStartScrapping(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const result = await JobService.startScrapping();

    return response.status(200).json({
      status: true,
      message: "Scraping started successfully",
      data: result,
    });
  }

  @HandleException
  async handleGetAllJobs(
    request: Request,
    response: Response,
    next: NextFunction
  ) {

    const filteredJobs = await JobService.getAllJobs(
      request.query as unknown as JobQueryParams
    );

    return response.status(200).json({
      status: true,
      message: "Searched jobs are listed",
      data: filteredJobs,
    });
  }
}

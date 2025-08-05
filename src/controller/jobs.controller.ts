import { NextFunction, Request, Response } from "express";
import { JobService } from "../service/jobs.service";
import HandleException from "../common/decors/handle.exception.decor";
import { JobQueryParams } from "../common/types/jobs.types";
import { scrappingWorker } from "../queue/worker";

export class JobsHandler {
  @HandleException
  async handleStartScrapping(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    await JobService.startScrapping(request.body);
    return response.status(200).json({
      status: true,
      message: "Scraping started successfully",
      data: [],
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

  @HandleException
  handleStartWoker() {
    scrappingWorker.run();
  }
}

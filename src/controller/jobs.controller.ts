import { NextFunction, Request, Response } from "express";
import { JobService } from "../service/jobs.service";
import HandleException from "../common/decors/handle.exception.decor";

export class JobsHandler {
  @HandleException
  async handleStartScrapping(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const result = await JobService.startScrapping();

    response.status(200).json({
      status: true,
      message: "Scraping started successfully",
      data: result,
    });
  }
}

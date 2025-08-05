import { NextFunction, Request, Response } from "express";
import logger from "../config/logger-config";
const globalErrorMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  logger.error(err.stack);

  return response.status(400).json({
    status: false,
    message: "Internal Server Error",
    error: {},
  });
};

export default globalErrorMiddleware;

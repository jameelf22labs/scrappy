import { NextFunction, Request, Response } from "express";
import HandleException from "../common/decors/handle.exception.decor";
import Events from "../database/models/Events.model";
import logger from "../config/logger-config";
import ApiResponse from "../common/decors/api.response.decor";
import { EventStatus } from "../database/types";

export default class EventHandler {
  @HandleException
  @ApiResponse
  async handleCheckEventStatus(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id } = request.params;

    logger.info("Check event status handler ", id);

    if (!id) {
      throw new Error("Bad request id is required");
    }

    const event = await Events.findByPk(id);

    if (!event) {
      return response.status(404).json({
        message: "Event not found",
      });
    }

    return {
      data: {
        event: {
          id: event.id,
          status: event.status,
          isError: event.isError,
          errorMessage: event.errorMessage,
          data: event.data,
        },
      },
    };
  }

  @HandleException
  @ApiResponse
  async handleGetAllEvents(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { status, page = "1", limit = "10" } = request.query;
    const limitN = parseInt(limit as string, 10);
    const offset = (parseInt(page as string, 10) - 1) * limitN;

    logger.info(`Retrieving all events`);

    const whereClause = status ? { status: status as EventStatus } : {};

    const { count, rows } = await Events.findAndCountAll({
      where: whereClause,
      limit: limitN,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      data: {
        events: rows,
        pagination: {
          totalItems: count,
          currentPage: parseInt(page as string, 10),
          pageSize: limit,
          totalPages: Math.ceil(count / limitN),
        },
      },
    };
  }
}

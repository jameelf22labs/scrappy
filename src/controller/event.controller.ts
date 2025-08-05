import { NextFunction, Request, Response } from "express";
import HandleException from "../common/decors/handle.exception.decor";
import Events from "../database/models/Events.model";

export default class EventHandler {
  @HandleException
  async handleCheckEventStatus(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id } = request.params;

    if (!id) {
      throw new Error("Bad request id is required");
    }

    const event = await Events.findByPk(id);

    if (!event) {
      return response.status(404).json({
        message: "Event not found",
      });
    }

    return response.status(200).json({
      id: event.id,
      status: event.status,
      isError: event.isError,
      errorMessage: event.errorMessage,
      data: event.data,
    });
  }
}

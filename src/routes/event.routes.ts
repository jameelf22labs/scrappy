import { Router } from "express";
import EventHandler from "../controller/event.controller";

const eventRouter = Router();
const eventHandler = new EventHandler();

eventRouter.get(
  "/check-event/:id",
  eventHandler.handleCheckEventStatus.bind(eventHandler)
);

export default eventRouter;

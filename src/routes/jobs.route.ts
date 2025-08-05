import { Router } from "express";
import { JobsHandler } from "../controller/jobs.controller";

const jobRouter = Router();
const jobsHandler = new JobsHandler();

jobRouter.post(
  "/start-scarppe",
  jobsHandler.handleStartScrapping.bind(jobsHandler)
);

jobRouter.get("/get-jobs", jobsHandler.handleGetAllJobs.bind(jobsHandler));

jobRouter.post("/start-worker" , jobsHandler.handleStartWoker.bind(jobsHandler))

export default jobRouter;

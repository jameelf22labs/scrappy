import express from "express";
import cors from "cors";
import logger from "./config/logger-config";
import sequelize from "./database/sequalize-config";
import jobRouter from "./routes/jobs.route";
import globalErrorMiddleware from "./middleware/global.error.middleware";
import { registerCrons } from "./scrappe/jobs";
import registerWorker from "./queue/worker";

const application = async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
      const time = new Date(Date.now()).toString();
      logger.info(req.method, req.hostname, req.path, time);
      next();
    });

    app.get("/", (_req, res) => {
      res.status(200).json({
        message: "Hello World",
      });
    });

    if (process.env.NODE_ENV === "cron") {
      registerCrons();
      logger.info("Crons are registered");
    }

    registerWorker();
    await sequelize.authenticate();
    await sequelize.sync({});

    logger.info("Sequelize with Postgres Connected");
    app.use("/api/v1/jobs", jobRouter);
    app.use(globalErrorMiddleware);

    return app;
  } catch (error) {
    throw error;
  }
};

export default application;

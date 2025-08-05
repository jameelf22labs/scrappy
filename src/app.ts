import express from "express";
import cors from "cors";
import logger from "./config/logger-config";
import sequelize from "./database/sequalize-config";
import jobRouter from "./routes/jobs.route";
import globalErrorMiddleware from "./middleware/global.error.middleware";

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

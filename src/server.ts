import application from "./app";
import envConfig from "./config/env-config";
import logger from "./config/logger-config";

application()
  .then((app) => {
    app?.listen(envConfig.Port, () => {
      logger.info(`Application start on Port ${envConfig.Port}`);
    });
  })
  .catch((error) => {
    logger.info("Application falied to start");
    console.error(error);
    process.exit(1);
  });

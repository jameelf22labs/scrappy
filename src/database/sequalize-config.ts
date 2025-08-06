import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import envConfig from "../config/env-config";
import Jobs from "./models/Jobs.model";
import Events from "./models/Events.model";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: envConfig.Postgress.Db,
  user: envConfig.Postgress.Username,
  password: envConfig.Postgress.Password,
  host: envConfig.Postgress.Host,
  port: envConfig.Postgress.Port,
  clientMinMessages: "notice",
  models: [Jobs , Events],
});

export default sequelize;

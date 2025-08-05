import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import envConfig from "../config/env-config";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: envConfig.Postgress.Db,
  user: envConfig.Postgress.Username,
  password: envConfig.Postgress.Password,
  host: envConfig.Postgress.Host,
  port: envConfig.Postgress.Port,
  clientMinMessages: "notice",
  models: [],
});

export default sequelize;

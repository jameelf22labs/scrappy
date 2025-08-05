import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: "console" },
    file: {
      type: "file",
      filename: "logs/app.log",
      maxLogSize: 10485760,
    },
  },
  categories: {
    default: { appenders: ["console", "file"], level: "debug" },
  },
});

const logger = log4js.getLogger();

export default logger;

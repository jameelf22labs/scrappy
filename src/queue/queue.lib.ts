import { Queue } from "bullmq";
import logger from "../config/logger-config";
import { JobName, QueueName } from "./constant";
import QueueFactory from "./queue";

const QueueLib = {
  enQueue: <T>(jobName: JobName, queueName: QueueName, payload: T) => {
    logger.info(`${jobName} is push to queue :: ${queueName} `);
    const queue: Queue = QueueFactory.scrappingQueue();
    queue.add(jobName, payload);
  },
};

export default QueueLib;

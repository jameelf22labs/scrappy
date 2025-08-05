import { Queue } from "bullmq";
import { QueueName } from "./constant";
import redisOptions from "../config/redis-config";

const ScrappingQueue = new Queue(QueueName.Scrapping, {
  connection: redisOptions,
});

const QueueFactory = {
  scrappingQueue: () => {
    return ScrappingQueue;
  },
};

export default QueueFactory;
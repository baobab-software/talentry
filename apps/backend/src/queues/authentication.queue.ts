import Queue from "bull";
import { logger } from "@/libs";
import { config } from "@/configs/config";

const authenticationQueue = new Queue("authenticationQueue", {
  redis: {
    host: config?.database?.redis?.host,
    port: Number(config?.database?.redis?.port),
    password: config?.database?.redis?.password,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: {
      age: 3600,
      count: 100,
    },
    removeOnFail: {
      age: 86400,
      count: 100,
    },
  },
});

const handleQueueError = (error: Error) => {
  logger.error("Authentication queue error:", {
    error: error.message,
    stack: error.stack,
  });
};

authenticationQueue.on("error", handleQueueError);

authenticationQueue.on("failed", (job, error) => {
  logger.error(`Job ${job.id} failed`, {
    jobId: job.id,
    error: error.message,
    data: job.data,
  });
});

authenticationQueue.on("completed", (job) => {
  logger.info(`Job ${job.id} completed`, {
    jobId: job.id,
    data: job.data,
  });
});

export { authenticationQueue };

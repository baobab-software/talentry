import winston, { Logger, createLogger } from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import { config } from "@/configs/config";

type Environment = "development" | "production";
type LoggerAccessToken = string;

class LoggerUtil {
  private static instance: LoggerUtil;

  public static getInstance(): LoggerUtil {
    if (!LoggerUtil.instance) {
      LoggerUtil.instance = new LoggerUtil();
    }
    return LoggerUtil.instance;
  }

  public createLogger(accessToken: LoggerAccessToken): Logger {
    const environment: Environment =
      (process.env.NODE_ENV as Environment) || "development";

    const transports =
      environment === "development"
        ? new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
              winston.format.json(),
              winston.format.prettyPrint()
            ),
          })
        : new LogtailTransport(new Logtail(accessToken));

    return createLogger({ transports });
  }
}

export const logger: Logger = LoggerUtil.getInstance().createLogger(
  config?.logger?.logtail.accessToken
);

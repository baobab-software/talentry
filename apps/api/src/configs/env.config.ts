import "dotenv/config";
import { cleanEnv, num, str, bool } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: num({ default: 4000 }),
  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development",
  }),
  DATABASE_URL: str(),
  REDIS_HOST: str({ default: "localhost" }),
  REDIS_PORT: num({ default: 6379 }),
  JWT_SECRET: str(),
  CLIENT_URL: str({ default: "http://localhost:3000" }),
  APOLLO_INTROSPECTION: bool({ default: false }),
  APOLLO_PLAYGROUND: bool({ default: false }),
  RATE_LIMIT_WINDOW_MS: num({ default: 15 * 60 * 1000 }),
  RATE_LIMIT_MAX: num({ default: 100 }),
});
/**
 * Main application entry point
 * Configures Express server with middlewares and starts the server
 */
import 'reflect-metadata';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import { cleanEnv, num } from 'envalid';
import { configureMiddlewares } from '@work-whiz/middlewares';
import { startServer } from './server';

const env = cleanEnv(dotenv.config().parsed || process.env, {
  PORT: num({ default: 3000 }),
  RATE_LIMIT_WINDOW_MS: num({ default: 60 * 1000 }),
  RATE_LIMIT_MAX_REQUESTS: num({ default: 60 }),
});

const app: Application = express();

const bootstrap = async (): Promise<void> => {
  /**
   * Configures application middlewares
   * @param {Application} app - Express application instance
   */
  await configureMiddlewares(app);

  // Start server with error handling
  await startServer(app, {
    port: env.PORT,
    syncDatabase: true,
    forceSync: false,
    enableClusterMode: true,
    rateLimitOptions: {
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      max: env.RATE_LIMIT_MAX_REQUESTS,
    },
  });
};

bootstrap().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

/**
 * Server configuration options
 */
export interface IServerOptions {
  port?: number;
  syncDatabase?: boolean;
  forceSync?: boolean;
  enableClusterMode?: boolean;
  enableHealthCheck?: boolean;
  rateLimitOptions?: {
    windowMs?: number;
    max?: number;
  };
}

import { IServerOptions } from "@/interfaces";


export const DEFAULT_SERVER_OPTIONS: IServerOptions = {
  enableClusterMode: false,
  enableHealthCheck: true,
  enableCompression: true,
  enableHelmet: true,
};
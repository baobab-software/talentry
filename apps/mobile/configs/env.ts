import Constants from "expo-constants";

type ExpoConfig = {
  extra?: {
    apiUrl?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

const expoConfig = (Constants.expoConfig ?? {}) as ExpoConfig;

export const API_URL =
  (expoConfig.extra?.apiUrl as string | undefined) ?? "http://127.0.0.1:4000/api";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./env";

const BASE_URL = API_URL;
const ACCESS_TOKEN_KEY = "@access_token";
const REFRESH_TOKEN_KEY = "@refresh_token";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    console.debug("API Request:", {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.debug("API Response:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.error("API Response Error:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        method: error.config?.method,
        url: error.config?.url,
        data: error.config?.data,
      },
    });

    // Check if error is 401 (Unauthorized) or 500 with token expiration and not already retrying
    const isTokenExpired =
      error.response?.status === 401 ||
      (error.response?.status === 500 &&
        (error.response?.data?.includes?.("TokenExpiredError") ||
          error.response?.data?.includes?.("jwt expired")));

    if (isTokenExpired && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
        const userData = await AsyncStorage.getItem("@auth_user");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        let userId = null;
        if (userData) {
          const parsedData = JSON.parse(userData);
          userId = parsedData?.user?.id || parsedData?.id || null;
        }

        console.debug("Refresh token request:", {
          userId,
          hasRefreshToken: !!refreshToken,
        });

        const response = await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          { userId },
          {
            withCredentials: true,
            headers: {
              Cookie: `refresh_token=${refreshToken}`,
            },
          }
        );

        const setCookieHeader = response.headers["set-cookie"];
        let newAccessToken = response.data?.data?.token || response.data?.token;

        // Try to extract token from cookies if available
        if (setCookieHeader) {
          const cookies = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];

          cookies.forEach((cookie: string) => {
            if (cookie.includes("access_token=")) {
              const match = cookie.match(/access_token=([^;]+)/);
              if (match) {
                newAccessToken = match[1];
              }
            }
          });
        }

        if (newAccessToken) {
          await AsyncStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          return apiClient(originalRequest);
        } else {
          throw new Error("No access token received");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Clear tokens and redirect to login
        await AsyncStorage.multiRemove([
          ACCESS_TOKEN_KEY,
          REFRESH_TOKEN_KEY,
          "@auth_user",
        ]);
        delete apiClient.defaults.headers.common["Authorization"];

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

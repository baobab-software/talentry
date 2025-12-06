import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "../configs/api-client";
import {
  AuthResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
} from "@/interfaces";
const ACCESS_TOKEN_KEY = "@access_token";
const REFRESH_TOKEN_KEY = "@refresh_token";
const USER_KEY = "@auth_user";

/**
 * Authentication service for handling user authentication operations
 */
export const authService = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await apiClient.post<RegisterResponse>(
        "/auth/register",
        data
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", data);

      const setCookieHeader = response.headers["set-cookie"];
      let accessToken = null;
      let refreshToken = null;
      let user = null;

      if (setCookieHeader) {
        const cookies = Array.isArray(setCookieHeader)
          ? setCookieHeader
          : [setCookieHeader];

        cookies.forEach((cookie: string) => {
          if (cookie.includes("access_token=")) {
            const match = cookie.match(/access_token=([^;]+)/);
            if (match) {
              accessToken = match[1];
            }
          }
          if (cookie.includes("refresh_token=")) {
            const match = cookie.match(/refresh_token=([^;]+)/);
            if (match) {
              refreshToken = match[1];
            }
          }
        });
      }

      if (accessToken) {
        user = {
          id: "",
          email: data.email,
          name: data.email.split("@")[0],
        };

        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

        if (refreshToken) {
          await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }

        if (user) {
          await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        }

        apiClient.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;
      }

      return {
        ...response.data,
        data: {
          ...response.data.data,
          token: accessToken || "",
          user: user || undefined,
        },
      };
    } catch (error: any) {
      throw error;
    }
  },

  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    try {
      const response = await apiClient.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        data
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  verifyOTP: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
    try {
      const response = await apiClient.post<VerifyOTPResponse>(
        "/auth/forgot-password/verify-otp",
        data
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    try {
      const response = await apiClient.patch<ResetPasswordResponse>(
        "/auth/password-reset",
        data
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        const apiError = new Error(
          error.response.data.error?.message ||
            error.response.data.message ||
            error.message
        );
        (apiError as any).response = error.response;
        throw apiError;
      }

      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      await AsyncStorage.multiRemove([
        ACCESS_TOKEN_KEY,
        REFRESH_TOKEN_KEY,
        USER_KEY,
      ]);
      delete apiClient.defaults.headers.common["Authorization"];
    }
  },

  getAccessToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getUser: async (): Promise<any | null> => {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  getCurrentUser: async (): Promise<any> => {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

    const response = await apiClient.post<AuthResponse>("/auth/refresh-token", {
      refreshToken,
    });

    const setCookieHeader = response.headers["set-cookie"];
    let newAccessToken = response.data.token;

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
      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${newAccessToken}`;
    }

    return { token: newAccessToken };
  },

  initializeAuth: async (): Promise<void> => {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
    }
  },

  verifyAccount: async (email: string, otp: string): Promise<any> => {
    try {
      const response = await apiClient.post("/auth/verify-account", {
        email,
        otp,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};

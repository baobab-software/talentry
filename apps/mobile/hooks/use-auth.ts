import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOTPRequest,
} from "@/interfaces";
import { authService } from "@/services";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthError {
  message: string;
  field?: string;
}

/**
 * Custom hook for authentication operations
 * Provides methods for register, login, password reset, etc.
 * @returns Authentication state and methods
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const { checkAuth } = useAuthContext();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await authService.getAccessToken();
        const userData = await authService.getUser();

        if (token && userData) {
          setIsAuthenticated(true);
          setUser(userData);
          await authService.initializeAuth();
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    initAuth();
  }, []);

  const register = async (input: RegisterRequest): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(input);

      if (response.statusCode === 200 || response.statusCode === 201) {
        return true;
      }

      setError({ message: response.data.message || "Registration failed" });
      return false;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Registration failed";

      setError({ message: errorMessage });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (input: LoginRequest): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(input);

      if (response.data.token && response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);

        await checkAuth();

        return true;
      }

      setError({ message: "Login failed: Missing token or user data" });
      return false;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Login failed";

      setError({ message: errorMessage });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (
    input: ForgotPasswordRequest
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.forgotPassword(input);

      if (response.statusCode === 200 || response.statusCode === 201) {
        return true;
      }

      setError({
        message: response.data.message || "Failed to send reset email",
      });
      return false;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Failed to send reset email";

      setError({ message: errorMessage });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (
    input: VerifyOTPRequest
  ): Promise<{ success: boolean; token?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.verifyOTP(input);

      if (
        response.status === "success" &&
        response.statusCode === 200 &&
        response.data.token
      ) {
        return { success: true, token: response.data.token };
      }

      const errorMsg = response.data.message || "Failed to verify OTP";
      setError({ message: errorMsg });
      return { success: false };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Failed to verify OTP";

      setError({ message: errorMessage });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    input: ResetPasswordRequest
  ): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.resetPassword(input);

      if (response.statusCode === 200 && response.status === "success") {
        return { success: true, message: response.data.message };
      }

      setError({
        message: response.data.message || "Failed to reset password",
      });
      return { success: false, message: response.data.message };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Failed to reset password";

      setError({ message: errorMessage });
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);

      await checkAuth();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Logout failed";
      setError({ message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      await authService.refreshToken();
      return true;
    } catch (err) {
      console.error("Token refresh error:", err);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const verifyAccount = async (
    email: string,
    otp: string
  ): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.verifyAccount(email, otp);

      if (response.status === "success" && response.statusCode === 200) {
        return { success: true, message: response.data?.message };
      }

      setError({
        message: response.data?.message || "Failed to verify account",
      });
      return { success: false, message: response.data?.message };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Failed to verify account";

      setError({ message: errorMessage });
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isAuthenticated,
    user,
    error,
    register,
    login,
    forgotPassword,
    verifyOTP,
    verifyAccount,
    resetPassword,
    logout,
    refreshToken,
    clearError,
  };
};

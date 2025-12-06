import { useEffect, useState } from "react";
import { meService } from "@/services";

interface CurrentUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  skills?: string[];
  isEmployed?: boolean;
  user?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UseMeError {
  message: string;
  code?: string;
}

/**
 * Custom hook for fetching and managing current user data
 * @returns Current user state, loading state, error, and refetch method
 */
export const useMe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [error, setError] = useState<UseMeError | null>(null);

  const fetchCurrentUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = await meService.getCurrentUser();

      if (userData?.data) {
        setUser(userData.data);
      } else {
        setUser(userData);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch user data";

      setError({
        message: errorMessage,
        code: err.response?.status?.toString(),
      });

      try {
        const cachedUser = await meService.getStoredUserData();
        if (cachedUser) {
          setUser(cachedUser.data || cachedUser);
        }
      } catch (cacheErr) {
        console.error("Failed to load cached user data:", cacheErr);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const refetch = () => {
    return fetchCurrentUser();
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user,
    isLoading,
    error,
    refetch,
    clearError,
  };
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "../configs/api-client";

const USER_DATA_KEY = "@me_service_user_data";

/**
 * Service for handling user-related operations
 */
export const meService = {
  getCurrentUser: async (): Promise<any> => {
    try {
      const accessToken = await AsyncStorage.getItem("@access_token");
      const response = await apiClient.get("/me/candidate", {
        headers: {
          "x-authorization": accessToken ? `Bearer ${accessToken}` : undefined,
        },
      });
      const userData = response.data.data.candidates[0];
      console.log("Fetched user data:", userData);

      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

      return userData;
    } catch (error: any) {
      throw error;
    }
  },

  getStoredUserData: async (): Promise<any | null> => {
    try {
      const userDataString = await AsyncStorage.getItem(USER_DATA_KEY);
      if (userDataString) {
        return JSON.parse(userDataString);
      }
      return null;
    } catch (error: any) {
      throw error;
    }
  },
};

import { colors } from "@/theme/colors";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// ❌ remove this for now
// import Skeleton from "react-native-reanimated-skeleton";

interface HeaderCardProps {
  user: any;
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

const HeaderCard: React.FC<HeaderCardProps> = ({
  user,
  isLoading,
  error,
  refetch,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getFullName = () => {
    if (!user?.firstName && !user?.lastName) return "User";
    return `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load user data</Text>
        <TouchableOpacity onPress={refetch} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>{getGreeting()}</Text>
          {isLoading ? (
            <View style={styles.textSkeletonLarge} />
          ) : (
            <Text style={styles.nameText}>{getFullName()}</Text>
          )}
        </View>

        <View style={styles.iconButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileRow}>
        <View style={styles.avatarWrapper}>
          {isLoading ? (
            <View style={styles.avatarSkeleton} />
          ) : user?.user?.avatarUrl ? (
            <Image
              source={{ uri: user.user.avatarUrl }}
              style={styles.avatar}
            />
          ) : (
            <Image
              source={require("@/assets/images/user-icon.png")}
              style={styles.avatar}
            />
          )}
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <Text style={styles.searchPlaceholder}>
            What job are you looking for?
          </Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  greetingSection: {
    flex: 1,
  },
  greetingText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#999",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  iconButtons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
  avatarSkeleton: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchPlaceholder: {
    flex: 1,
    color: "#999",
    fontSize: 14,
  },
  filterButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  textSkeletonLarge: {
    width: 150,
    height: 20,
    borderRadius: 4,
    backgroundColor: colors.background,
  },
  errorContainer: {
    padding: 20,
    backgroundColor: colors.error,
    borderRadius: 12,
    margin: 20,
    alignItems: "center",
  },
  errorText: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    color: colors.error,
    fontWeight: "600",
  },
});

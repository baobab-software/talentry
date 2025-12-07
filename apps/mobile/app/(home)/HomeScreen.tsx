import { colors } from "@/theme/colors";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderCard from "./components/HeaderCard";

import { useMe } from "@/hooks/use-me";

const HomeScreen = () => {
  const { user, isLoading, error, refetch } = useMe();

  useEffect(() => {
    if (error) {
      console.error("Error fetching user data:", error);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderCard
          user={user}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: colors.buttonPrimary,
    borderColor: colors.buttonPrimary,
  },
  filterChipText: {
    fontSize: 12,
    color: colors.textLight,
  },
  filterChipTextActive: {
    color: colors.text,
    fontWeight: "600",
  },
  recentJobsList: {
    marginTop: 8,
  },
  companyChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  companyChipLogo: {
    width: 28,
    height: 28,
    borderRadius: 8,
    marginRight: 8,
    resizeMode: "contain",
  },
  companyChipTextWrapper: {
    justifyContent: "center",
  },
  companyChipName: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
  },
  companyChipCount: {
    fontSize: 11,
    color: colors.textLight,
  },
});

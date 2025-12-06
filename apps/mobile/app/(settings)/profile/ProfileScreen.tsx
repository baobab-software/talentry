import { colors } from "@/theme";
import Header from "@/components/ui/Header";
import { useMe } from "@/hooks/use-me";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileMenuItem } from "./components/ProfileMenuItem";
import { ProfileMenuItem as ProfileMenuItemType } from "./types/profile.types";

const ProfileScreen = () => {
  const { user, isLoading, error, refetch } = useMe();
  const [imageError, setImageError] = useState(false);

  const profileCompleteness = 65;

  const menuItems: ProfileMenuItemType[] = [
    {
      id: "personal-info",
      title: "Personal Information",
      icon: "person-outline",
      route: "/(settings)/profile/PersonalInfoScreen",
      description: "Name, contact details, and social links",
      completeness: 80,
    },
    {
      id: "qualifications",
      title: "Qualifications",
      icon: "school-outline",
      route: "/(settings)/profile/QualificationsScreen",
      description: "Resume, education, and experience",
      completeness: 60,
    },
    {
      id: "job-preferences",
      title: "Job Preferences",
      icon: "briefcase-outline",
      route: "/(settings)/profile/JobPreferenceScreen",
      description: "Availability, job type, and salary expectations",
      completeness: 70,
    },
    {
      id: "privacy",
      title: "Privacy Settings",
      icon: "lock-closed-outline",
      route: "/(settings)/profile/PrivacyScreen",
      description: "Control your profile visibility and notifications",
    },
  ];

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.buttonPrimary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <Header title="My Profile"  />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Overview Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() =>
                router.push("/(settings)/profile/PersonalInfoScreen")
              }
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Edit profile picture"
            >
              {user?.user?.avatarUrl && !imageError ? (
                <Image
                  source={{ uri: user.user.avatarUrl }}
                  style={styles.avatar}
                  onError={() => setImageError(true)}
                  accessibilityLabel={`${user?.firstName || "User"}'s profile picture`}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarPlaceholderText}>
                    {user?.firstName?.[0] || user?.email?.[0] || "U"}
                  </Text>
                </View>
              )}
              <View style={styles.editAvatarBadge}>
                <Ionicons name="camera" size={16} color={colors.white} />
              </View>
            </TouchableOpacity>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.email || "User"}
              </Text>
              <Text style={styles.profileTitle}>
                {user?.title || "Software Developer"}
              </Text>
            </View>
          </View>

          {/* Profile Completeness */}
          <View style={styles.completenessCard}>
            <View style={styles.completenessHeader}>
              <Text style={styles.completenessTitle}>Profile Completeness</Text>
              <Text style={styles.completenessPercentage}>
                {profileCompleteness}%
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${profileCompleteness}%` },
                ]}
              />
            </View>
            <Text style={styles.completenessHint}>
              Complete your profile to attract more employers
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Profile Sections</Text>
          {menuItems.map((item) => (
            <ProfileMenuItem
              key={item.id}
              title={item.title}
              icon={item.icon}
              route={item.route}
              description={item.description}
              completeness={item.completeness}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <View style={styles.actionButtonContent}>
              <Ionicons
                name="download-outline"
                size={20}
                color={colors.buttonPrimary}
              />
              <Text style={styles.actionButtonText}>Download Profile PDF</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <View style={styles.actionButtonContent}>
              <Ionicons
                name="share-outline"
                size={20}
                color={colors.buttonPrimary}
              />
              <Text style={styles.actionButtonText}>Share Profile Link</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.buttonPrimary,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.buttonPrimary,
  },
  avatarPlaceholderText: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.primary,
    textTransform: "uppercase",
  },
  editAvatarBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 13,
    color: colors.textMuted,
  },
  completenessCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: 16,
  },
  completenessHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  completenessTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  completenessPercentage: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.buttonPrimary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.buttonPrimary,
    borderRadius: 4,
  },
  completenessHint: {
    fontSize: 12,
    color: colors.textMuted,
  },
  menuSection: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
  },
  quickActions: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    marginLeft: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textMuted,
    marginTop: 8,
  },
});

export default ProfileScreen;

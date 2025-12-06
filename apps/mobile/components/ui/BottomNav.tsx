import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "@/theme";

const ACTIVE_COLOR = colors.buttonPrimary;
const INACTIVE_COLOR = colors.black;

const navItems = [
  {
    key: "home",
    icon: "home-outline",
    label: "Home",
    route: "/HomeScreen",
  },
  {
    key: "jobs",
    icon: "briefcase-outline",
    label: "Jobs",
    route: "/JobsScreen",
  },
  {
    key: "saved",
    icon: "bookmark-outline",
    label: "My Jobs",
    route: "/SavedJobsScreen",
  },
  {
    key: "notifications",
    icon: "notifications-outline",
    label: "Notifications",
    route: "/NotificationsScreen",
  },
  {
    key: "profile",
    icon: "person-outline",
    label: "Profile",
    route: "/SettingsScreen",
  },
];

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const hideNavRoutes = [
    "/ProfileScreen",
    "/JobDetailScreen",
    "/JobPreferenceScreen",
    "/PersonalInfoScreen",
    "/QualificationsScreen",
    "/ExperienceScreen",
    "/ResumeScreen",
    "/PrivacyScreen",
    "/AccountScreen",
    "/SecurityScreen",
    "/SettingsScreen",
    "/CommunicationsScreen",
    "/HelpScreen",
    "/TermsAndConditionsScreen",
    "/ChatScreen"
  ];

  const shouldHideNav = hideNavRoutes.some((route) => pathname.includes(route));

  if (shouldHideNav) {
    return null;
  }

  const safeNavigate = (route: string) => {
    if (route !== pathname) {
      router.push(route as any);
    }
  };

  return (
    <BlurView intensity={40} tint="light" style={styles.container}>
      {navItems.map((item) => {
        const isActive = pathname === item.route;

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.navButton}
            onPress={() => safeNavigate(item.route)}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
            />

            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    borderRadius: 32,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    overflow: "hidden",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 8,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: "500",
    color: colors.black,
  },
  labelActive: {
    color: colors.buttonPrimary,
  },
});

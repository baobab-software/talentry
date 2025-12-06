import { Router } from "expo-router";
import { SettingItem } from "@/types/settings.types";

export const getAccountSettings = (router: Router): SettingItem[] => [
  {
    id: "profile",
    icon: "person-outline",
    label: "Profile Setting",
    onPress: () => router.push("/(settings)/profile/ProfileScreen"),
  },
  {
    id: "account",
    icon: "settings-outline",
    label: "Account Settings",
    onPress: () => router.push("/(settings)/account/AccountScreen"),
  },
  {
    id: "security",
    icon: "shield-checkmark-outline",
    label: "Security Settings",
    onPress: () => router.push("/(settings)/security/SecurityScreen"),
  },
  {
    id: "privacy",
    icon: "lock-closed-outline",
    label: "Privacy",
    onPress: () => router.push("/(settings)/privacy/PrivacyScreen"),
  },
];

export const getPreferencesSettings = (router: Router): SettingItem[] => [
  {
    id: "country",
    icon: "globe-outline",
    label: "Country and Languages",
    onPress: () => console.log("Country and Languages"),
  },
  {
    id: "devices",
    icon: "phone-portrait-outline",
    label: "Device Management",
    onPress: () => console.log("Device Management"),
  },
  {
    id: "communications",
    icon: "notifications-outline",
    label: "Communications Settings",
    onPress: () => router.push("/(settings)/communications/CommunicationsScreen"),
  },
];

export const getSupportSettings = (router: Router): SettingItem[] => [
  {
    id: "help",
    icon: "help-circle-outline",
    label: "Help",
    onPress: () => router.push("/(settings)/support/HelpScreen"),
  },
  {
    id: "terms",
    icon: "document-text-outline",
    label: "Terms and Conditions",
    onPress: () => router.push("/(settings)/support/TermsAndConditionsScreen"),
  },
];

export const getDangerSettings = (handleSignOut: () => void): SettingItem[] => [
  {
    id: "signout",
    icon: "log-out-outline",
    label: "Sign Out",
    onPress: handleSignOut,
  },
];

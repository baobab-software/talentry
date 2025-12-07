import { colors } from "@/theme";
import { useAuthContext } from "@/contexts/AuthContext";
import { authService } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getAccountSettings,
  getDangerSettings,
  getPreferencesSettings,
  getSupportSettings,
} from "@/configs/settings-config";
import Header from "@/components/ui/Header";

const SettingsScreen = () => {
  const { checkAuth, isLoading } = useAuthContext();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              setIsSigningOut(true);
              await authService.logout();
              await checkAuth();
              router.replace("/LoginScreen");
            } catch (error) {
              console.error("Sign out failed:", error);
              Alert.alert("Error", "Failed to sign out. Please try again.");
            } finally {
              setIsSigningOut(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const accountSettings = useMemo(() => getAccountSettings(router), []);
  const preferencesSettings = useMemo(() => getPreferencesSettings(router), []);
  const supportSettings = useMemo(() => getSupportSettings(router), []);
  const dangerSettings = useMemo(() => getDangerSettings(handleSignOut), []);

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
      <Header title="Settings" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          {accountSettings.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.settingItem,
                index === accountSettings.length - 1 && styles.settingItemLast,
              ]}
              onPress={option.onPress}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Navigate to ${option.label}`}
              accessibilityHint="Double tap to open"
            >
              <View style={styles.settingLeft}>
                <Ionicons name={option.icon} size={20} color={colors.text} />
                <Text style={styles.settingLabel}>{option.label}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          {preferencesSettings.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.settingItem,
                index === preferencesSettings.length - 1 &&
                  styles.settingItemLast,
              ]}
              onPress={option.onPress}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Navigate to ${option.label}`}
              accessibilityHint="Double tap to open"
            >
              <View style={styles.settingLeft}>
                <Ionicons name={option.icon} size={20} color={colors.text} />
                <Text style={styles.settingLabel}>{option.label}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          {supportSettings.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.settingItem,
                index === supportSettings.length - 1 && styles.settingItemLast,
              ]}
              onPress={option.onPress}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Navigate to ${option.label}`}
              accessibilityHint="Double tap to open"
            >
              <View style={styles.settingLeft}>
                <Ionicons name={option.icon} size={20} color={colors.text} />
                <Text style={styles.settingLabel}>{option.label}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          {dangerSettings.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.settingItem,
                styles.dangerItem,
                index === dangerSettings.length - 1 && styles.settingItemLast,
              ]}
              onPress={option.onPress}
              activeOpacity={0.7}
              disabled={isSigningOut}
              accessibilityRole="button"
              accessibilityLabel={option.label}
              accessibilityHint="Double tap to sign out of your account"
            >
              <View style={styles.settingLeft}>
                {isSigningOut ? (
                  <ActivityIndicator size="small" color={colors.error} />
                ) : (
                  <Ionicons name={option.icon} size={20} color={colors.error} />
                )}
                <Text style={[styles.settingLabel, styles.dangerLabel]}>
                  {isSigningOut ? "Signing out..." : option.label}
                </Text>
              </View>
              {!isSigningOut && (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.error}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            @2025 Mei Kasi - Cookies, Privacy and Terms
          </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 70,
  },
  section: {
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingItemLast: {
    marginBottom: 0,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
  },
  dangerItem: {
    borderColor: colors.errorLight,
    backgroundColor: colors.errorBackground,
  },
  dangerLabel: {
    color: colors.error,
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
  footerContainer: {
    marginTop: 32,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

export default SettingsScreen;

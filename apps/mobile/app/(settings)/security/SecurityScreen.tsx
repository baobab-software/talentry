import { colors } from "@/theme";
import Header from "@/components/ui/Header";
import { useAuthContext } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LoginActivity {
  id: string;
  device: string;
  location: string;
  timestamp: string;
  status: "success" | "failed";
}

interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const SecurityScreen = () => {
  const { user, isLoading: authLoading } = useAuthContext();
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Security Settings State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Mock data - Replace with API calls
  const [loginActivity] = useState<LoginActivity[]>([
    {
      id: "1",
      device: "iPhone 14 Pro",
      location: "Johannesburg, South Africa",
      timestamp: "2 hours ago",
      status: "success",
    },
    {
      id: "2",
      device: "MacBook Pro",
      location: "Johannesburg, South Africa",
      timestamp: "1 day ago",
      status: "success",
    },
    {
      id: "3",
      device: "Windows PC",
      location: "Cape Town, South Africa",
      timestamp: "3 days ago",
      status: "failed",
    },
  ]);

  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([
    {
      id: "1",
      device: "iPhone 14 Pro",
      browser: "Safari Mobile",
      location: "Johannesburg, South Africa",
      lastActive: "Active now",
      current: true,
    },
    {
      id: "2",
      device: "MacBook Pro",
      browser: "Chrome",
      location: "Johannesburg, South Africa",
      lastActive: "1 day ago",
      current: false,
    },
  ]);

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword) {
      Alert.alert("Error", "Please enter your current password");
      return;
    }

    if (!passwordData.newPassword) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsSaving(true);
    try {
      // TODO: Implement API call to change password
      // await authService.changePassword(passwordData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Success", "Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password change failed:", error);
      Alert.alert("Error", "Failed to change password. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleTwoFactor = async (value: boolean) => {
    if (value) {
      Alert.alert(
        "Enable Two-Factor Authentication",
        "You will receive a verification code via SMS when logging in from a new device.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Enable",
            onPress: async () => {
              try {
                // TODO: Implement 2FA setup
                setTwoFactorEnabled(true);
                Alert.alert(
                  "Success",
                  "Two-factor authentication has been enabled"
                );
              } catch (error) {
                Alert.alert("Error", "Failed to enable 2FA");
              }
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Disable Two-Factor Authentication",
        "This will make your account less secure. Are you sure?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Disable",
            style: "destructive",
            onPress: () => setTwoFactorEnabled(false),
          },
        ]
      );
    }
  };

  const handleToggleBiometric = async (value: boolean) => {
    if (value) {
      try {
        // TODO: Implement biometric authentication setup
        setBiometricEnabled(true);
        Alert.alert("Success", "Biometric login has been enabled");
      } catch (error) {
        Alert.alert("Error", "Failed to enable biometric login");
      }
    } else {
      setBiometricEnabled(false);
    }
  };

  const handleEndSession = (sessionId: string) => {
    Alert.alert(
      "End Session",
      "Are you sure you want to sign out this device?",
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
              // TODO: Implement session termination
              setActiveSessions(
                activeSessions.filter((session) => session.id !== sessionId)
              );
              Alert.alert("Success", "Session ended successfully");
            } catch (error) {
              Alert.alert("Error", "Failed to end session");
            }
          },
        },
      ]
    );
  };

  if (authLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.buttonPrimary} />
          <Text style={styles.loadingText}>Loading security settings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
    <Header title="Security Settings"  />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Security Overview */}
        <View style={styles.section}>
          <View style={styles.securityBanner}>
            <Ionicons
              name="shield-checkmark"
              size={48}
              color={colors.success}
            />
            <Text style={styles.bannerTitle}>Account Protected</Text>
            <Text style={styles.bannerText}>
              Your account has good security. Consider enabling 2FA for extra
              protection.
            </Text>
          </View>
        </View>

        {/* Change Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Current Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={passwordData.currentPassword}
                  onChangeText={(text) =>
                    setPasswordData({ ...passwordData, currentPassword: text })
                  }
                  placeholder="Enter current password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showCurrentPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showCurrentPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>New Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={passwordData.newPassword}
                  onChangeText={(text) =>
                    setPasswordData({ ...passwordData, newPassword: text })
                  }
                  placeholder="Enter new password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showNewPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.helperText}>
                Must be at least 8 characters long
              </Text>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={passwordData.confirmPassword}
                  onChangeText={(text) =>
                    setPasswordData({ ...passwordData, confirmPassword: text })
                  }
                  placeholder="Confirm new password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.changePasswordButton,
                isSaving && styles.buttonDisabled,
              ]}
              onPress={handleChangePassword}
              disabled={isSaving}
              activeOpacity={0.8}
            >
              {isSaving ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.changePasswordButtonText}>
                  Update Password
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Two-Factor Authentication */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Two-Factor Authentication</Text>
          <View style={styles.toggleCard}>
            <View style={styles.toggleLeft}>
              <View style={styles.toggleIcon}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={24}
                  color={twoFactorEnabled ? colors.success : colors.textMuted}
                />
              </View>
              <View style={styles.toggleContent}>
                <Text style={styles.toggleTitle}>Enable 2FA</Text>
                <Text style={styles.toggleDescription}>
                  Add an extra layer of security with SMS verification
                </Text>
              </View>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={handleToggleTwoFactor}
              trackColor={{ false: "#D0D0D0", true: colors.success }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Biometric Login */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biometric Login</Text>
          <View style={styles.toggleCard}>
            <View style={styles.toggleLeft}>
              <View style={styles.toggleIcon}>
                <Ionicons
                  name="finger-print-outline"
                  size={24}
                  color={biometricEnabled ? colors.success : colors.textMuted}
                />
              </View>
              <View style={styles.toggleContent}>
                <Text style={styles.toggleTitle}>
                  Fingerprint / Face ID
                </Text>
                <Text style={styles.toggleDescription}>
                  Use biometrics to quickly and securely login
                </Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={handleToggleBiometric}
              trackColor={{ false: "#D0D0D0", true: colors.success }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Last Login Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Login Activity</Text>
          <View style={styles.activityCard}>
            {loginActivity.map((activity, index) => (
              <View key={activity.id}>
                <View style={styles.activityItem}>
                  <View style={styles.activityLeft}>
                    <View
                      style={[
                        styles.activityIcon,
                        activity.status === "success"
                          ? styles.activityIconSuccess
                          : styles.activityIconFailed,
                      ]}
                    >
                      <Ionicons
                        name={
                          activity.status === "success"
                            ? "checkmark"
                            : "close"
                        }
                        size={16}
                        color={colors.white}
                      />
                    </View>
                    <View style={styles.activityContent}>
                      <Text style={styles.activityDevice}>
                        {activity.device}
                      </Text>
                      <Text style={styles.activityLocation}>
                        {activity.location}
                      </Text>
                      <Text style={styles.activityTime}>
                        {activity.timestamp}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      activity.status === "success"
                        ? styles.statusBadgeSuccess
                        : styles.statusBadgeFailed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusBadgeText,
                        activity.status === "success"
                          ? styles.statusBadgeTextSuccess
                          : styles.statusBadgeTextFailed,
                      ]}
                    >
                      {activity.status === "success" ? "Success" : "Failed"}
                    </Text>
                  </View>
                </View>
                {index < loginActivity.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Active Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Sessions</Text>
          <Text style={styles.sectionSubtitle}>
            Devices currently logged into your account
          </Text>
          <View style={styles.sessionsCard}>
            {activeSessions.map((session, index) => (
              <View key={session.id}>
                <View style={styles.sessionItem}>
                  <View style={styles.sessionLeft}>
                    <View style={styles.sessionIcon}>
                      <Ionicons
                        name={
                          session.device.includes("iPhone") ||
                          session.device.includes("Android")
                            ? "phone-portrait"
                            : "laptop"
                        }
                        size={24}
                        color={colors.text}
                      />
                    </View>
                    <View style={styles.sessionContent}>
                      <View style={styles.sessionHeader}>
                        <Text style={styles.sessionDevice}>
                          {session.device}
                        </Text>
                        {session.current && (
                          <View style={styles.currentBadge}>
                            <Text style={styles.currentBadgeText}>
                              Current
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.sessionBrowser}>
                        {session.browser}
                      </Text>
                      <Text style={styles.sessionLocation}>
                        {session.location}
                      </Text>
                      <Text style={styles.sessionTime}>
                        {session.lastActive}
                      </Text>
                    </View>
                  </View>
                  {!session.current && (
                    <TouchableOpacity
                      style={styles.endSessionButton}
                      onPress={() => handleEndSession(session.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name="close-circle-outline"
                        size={24}
                        color={colors.error}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {index < activeSessions.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textMuted,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 12,
  },
  securityBanner: {
    backgroundColor: colors.successBackground,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.successLight,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
  inputGroup: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  eyeIcon: {
    padding: 4,
  },
  helperText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 6,
    marginLeft: 2,
  },
  changePasswordButton: {
    backgroundColor: colors.text,
    borderRadius: 12,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  changePasswordButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.white,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  toggleCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  toggleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  toggleContent: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  activityCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  activityLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityIconSuccess: {
    backgroundColor: colors.success,
  },
  activityIconFailed: {
    backgroundColor: colors.error,
  },
  activityContent: {
    flex: 1,
  },
  activityDevice: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  activityLocation: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeSuccess: {
    backgroundColor: colors.successBackground,
  },
  statusBadgeFailed: {
    backgroundColor: colors.errorBackground,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusBadgeTextSuccess: {
    color: colors.success,
  },
  statusBadgeTextFailed: {
    color: colors.error,
  },
  sessionsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sessionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  sessionLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  sessionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sessionContent: {
    flex: 1,
  },
  sessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sessionDevice: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginRight: 8,
  },
  currentBadge: {
    backgroundColor: colors.buttonPrimary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  currentBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text,
  },
  sessionBrowser: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 4,
  },
  sessionLocation: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 4,
  },
  sessionTime: {
    fontSize: 12,
    color: colors.textMuted,
  },
  endSessionButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 8,
  },
});
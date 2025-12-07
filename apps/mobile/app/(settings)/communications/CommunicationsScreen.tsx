import { colors } from "@/theme";
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
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  channels: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

const CommunicationsScreen = () => {
  const { user, isLoading: authLoading } = useAuthContext();
  const [isSaving, setIsSaving] = useState(false);

  // Notification Settings State
  const [pushNotificationsEnabled, setPushNotificationsEnabled] =
    useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // Notification Categories
  const [notificationCategories, setNotificationCategories] = useState<
    NotificationCategory[]
  >([
    {
      id: "job_alerts",
      title: "Job Alerts",
      description: "New job postings matching your preferences",
      enabled: true,
      channels: { push: true, email: true, sms: false },
    },
    {
      id: "applications",
      title: "Application Updates",
      description: "Updates on your job applications",
      enabled: true,
      channels: { push: true, email: true, sms: false },
    },
    {
      id: "messages",
      title: "Messages",
      description: "Direct messages from employers",
      enabled: true,
      channels: { push: true, email: false, sms: false },
    },
    {
      id: "promotions",
      title: "Promotions & Tips",
      description: "Career advice and promotional content",
      enabled: false,
      channels: { push: false, email: true, sms: false },
    },
    {
      id: "security",
      title: "Security Alerts",
      description: "Important security and account updates",
      enabled: true,
      channels: { push: true, email: true, sms: true },
    },
  ]);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API call to save communication settings
      // await communicationService.updateSettings({
      //   pushNotificationsEnabled,
      //   emailNotificationsEnabled,
      //   smsNotificationsEnabled,
      //   soundEnabled,
      //   vibrationEnabled,
      //   notificationCategories,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Success", "Communication settings updated successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setNotificationCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, enabled: !cat.enabled } : cat
      )
    );
  };

  const toggleCategoryChannel = (
    categoryId: string,
    channel: "push" | "email" | "sms"
  ) => {
    setNotificationCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              channels: { ...cat.channels, [channel]: !cat.channels[channel] },
            }
          : cat
      )
    );
  };

  const handleDisableAll = () => {
    Alert.alert(
      "Disable All Notifications",
      "Are you sure you want to disable all notifications? You may miss important updates.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Disable All",
          style: "destructive",
          onPress: () => {
            setPushNotificationsEnabled(false);
            setEmailNotificationsEnabled(false);
            setSmsNotificationsEnabled(false);
            setNotificationCategories((prev) =>
              prev.map((cat) => ({ ...cat, enabled: false }))
            );
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
          <Text style={styles.loadingText}>
            Loading communication settings...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Communications</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview Banner */}
        <View style={styles.section}>
          <View style={styles.banner}>
            <Ionicons
              name="notifications-outline"
              size={48}
              color={colors.info}
            />
            <Text style={styles.bannerTitle}>Stay Connected</Text>
            <Text style={styles.bannerText}>
              Customize how you receive updates and notifications
            </Text>
          </View>
        </View>

        {/* Master Notification Toggles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Channels</Text>
          <View style={styles.togglesGroup}>
            <View style={styles.toggleCard}>
              <View style={styles.toggleLeft}>
                <View style={styles.toggleIcon}>
                  <Ionicons
                    name="phone-portrait-outline"
                    size={24}
                    color={
                      pushNotificationsEnabled ? colors.success : colors.textMuted
                    }
                  />
                </View>
                <View style={styles.toggleContent}>
                  <Text style={styles.toggleTitle}>Push Notifications</Text>
                  <Text style={styles.toggleDescription}>
                    Receive notifications on your device
                  </Text>
                </View>
              </View>
              <Switch
                value={pushNotificationsEnabled}
                onValueChange={setPushNotificationsEnabled}
                trackColor={{ false: "#D0D0D0", true: colors.success }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.toggleCard}>
              <View style={styles.toggleLeft}>
                <View style={styles.toggleIcon}>
                  <Ionicons
                    name="mail-outline"
                    size={24}
                    color={
                      emailNotificationsEnabled ? colors.info : colors.textMuted
                    }
                  />
                </View>
                <View style={styles.toggleContent}>
                  <Text style={styles.toggleTitle}>Email Notifications</Text>
                  <Text style={styles.toggleDescription}>
                    Receive updates via email
                  </Text>
                </View>
              </View>
              <Switch
                value={emailNotificationsEnabled}
                onValueChange={setEmailNotificationsEnabled}
                trackColor={{ false: "#D0D0D0", true: colors.info }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.toggleCard}>
              <View style={styles.toggleLeft}>
                <View style={styles.toggleIcon}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color={
                      smsNotificationsEnabled ? colors.warning : colors.textMuted
                    }
                  />
                </View>
                <View style={styles.toggleContent}>
                  <Text style={styles.toggleTitle}>SMS Notifications</Text>
                  <Text style={styles.toggleDescription}>
                    Receive important alerts via SMS
                  </Text>
                </View>
              </View>
              <Switch
                value={smsNotificationsEnabled}
                onValueChange={setSmsNotificationsEnabled}
                trackColor={{ false: "#D0D0D0", true: colors.warning }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>

        {/* App Behavior */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Behavior</Text>
          <View style={styles.togglesGroup}>
            <View style={styles.toggleCard}>
              <View style={styles.toggleLeft}>
                <View style={styles.toggleIcon}>
                  <Ionicons
                    name="volume-high-outline"
                    size={24}
                    color={soundEnabled ? colors.info : colors.textMuted}
                  />
                </View>
                <View style={styles.toggleContent}>
                  <Text style={styles.toggleTitle}>Sound</Text>
                  <Text style={styles.toggleDescription}>
                    Play sound for notifications
                  </Text>
                </View>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: "#D0D0D0", true: colors.info }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.toggleCard}>
              <View style={styles.toggleLeft}>
                <View style={styles.toggleIcon}>
                  <Ionicons
                    name="phone-portrait-outline"
                    size={24}
                    color={vibrationEnabled ? colors.info : colors.textMuted}
                  />
                </View>
                <View style={styles.toggleContent}>
                  <Text style={styles.toggleTitle}>Vibration</Text>
                  <Text style={styles.toggleDescription}>
                    Vibrate for notifications
                  </Text>
                </View>
              </View>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: "#D0D0D0", true: colors.info }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>

        {/* Notification Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Categories</Text>
          <Text style={styles.sectionSubtitle}>
            Customize notifications by type
          </Text>
          <View style={styles.categoriesCard}>
            {notificationCategories.map((category, index) => (
              <View key={category.id}>
                <View style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryLeft}>
                      <View
                        style={[
                          styles.categoryIcon,
                          category.enabled && styles.categoryIconActive,
                        ]}
                      >
                        <Ionicons
                          name={
                            category.id === "job_alerts"
                              ? "briefcase-outline"
                              : category.id === "applications"
                              ? "document-text-outline"
                              : category.id === "messages"
                              ? "chatbubble-outline"
                              : category.id === "promotions"
                              ? "gift-outline"
                              : "shield-checkmark-outline"
                          }
                          size={20}
                          color={
                            category.enabled ? colors.white : colors.textMuted
                          }
                        />
                      </View>
                      <View style={styles.categoryContent}>
                        <Text style={styles.categoryTitle}>
                          {category.title}
                        </Text>
                        <Text style={styles.categoryDescription}>
                          {category.description}
                        </Text>
                      </View>
                    </View>
                    <Switch
                      value={category.enabled}
                      onValueChange={() => toggleCategory(category.id)}
                      trackColor={{ false: "#D0D0D0", true: colors.success }}
                      thumbColor={colors.white}
                    />
                  </View>

                  {category.enabled && (
                    <View style={styles.channelsContainer}>
                      <Text style={styles.channelsLabel}>Channels:</Text>
                      <View style={styles.channelButtons}>
                        <TouchableOpacity
                          style={[
                            styles.channelButton,
                            category.channels.push && styles.channelButtonActive,
                          ]}
                          onPress={() =>
                            toggleCategoryChannel(category.id, "push")
                          }
                          disabled={!pushNotificationsEnabled}
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name="phone-portrait"
                            size={16}
                            color={
                              category.channels.push
                                ? colors.white
                                : colors.textMuted
                            }
                          />
                          <Text
                            style={[
                              styles.channelButtonText,
                              category.channels.push &&
                                styles.channelButtonTextActive,
                            ]}
                          >
                            Push
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.channelButton,
                            category.channels.email &&
                              styles.channelButtonActive,
                          ]}
                          onPress={() =>
                            toggleCategoryChannel(category.id, "email")
                          }
                          disabled={!emailNotificationsEnabled}
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name="mail"
                            size={16}
                            color={
                              category.channels.email
                                ? colors.white
                                : colors.textMuted
                            }
                          />
                          <Text
                            style={[
                              styles.channelButtonText,
                              category.channels.email &&
                                styles.channelButtonTextActive,
                            ]}
                          >
                            Email
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.channelButton,
                            category.channels.sms && styles.channelButtonActive,
                          ]}
                          onPress={() =>
                            toggleCategoryChannel(category.id, "sms")
                          }
                          disabled={!smsNotificationsEnabled}
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name="chatbubble"
                            size={16}
                            color={
                              category.channels.sms
                                ? colors.white
                                : colors.textMuted
                            }
                          />
                          <Text
                            style={[
                              styles.channelButtonText,
                              category.channels.sms &&
                                styles.channelButtonTextActive,
                            ]}
                          >
                            SMS
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
                {index < notificationCategories.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleDisableAll}
            activeOpacity={0.7}
          >
            <Ionicons
              name="notifications-off-outline"
              size={20}
              color={colors.error}
            />
            <Text style={styles.dangerButtonText}>
              Disable All Notifications
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.buttonDisabled]}
          onPress={handleSaveSettings}
          activeOpacity={0.8}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.saveButtonText}>
              Save Communication Settings
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CommunicationsScreen;

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
    paddingBottom: 100,
  },
  section: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 12,
  },
  banner: {
    backgroundColor: colors.infoBackground,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.infoLight,
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
  togglesGroup: {
    gap: 12,
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
  categoriesCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryItem: {
    paddingVertical: 12,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  categoryIconActive: {
    backgroundColor: colors.text,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  channelsContainer: {
    marginLeft: 52,
    marginTop: 8,
  },
  channelsLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: 8,
  },
  channelButtons: {
    flexDirection: "row",
    gap: 8,
  },
  channelButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  channelButtonActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  channelButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
  },
  channelButtonTextActive: {
    color: colors.white,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.errorBackground,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.errorLight,
  },
  dangerButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 8,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  saveButton: {
    backgroundColor: colors.text,
    borderRadius: 28,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
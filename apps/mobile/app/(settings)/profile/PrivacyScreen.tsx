import { colors } from "@/theme";
import Header from "@/components/ui/Header";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
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

const PrivacyScreen = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    allowContact: true,
    showContactPublicly: false,
    notifyOnView: true,
  });

  const handleSave = () => {
    Alert.alert("Success", "Privacy settings updated successfully!");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <Header title="Privacy Settings"  />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Visibility</Text>
          <View style={styles.settingsGroup}>
            <View style={styles.privacyItem}>
              <View style={styles.privacyInfo}>
                <Ionicons name="eye-outline" size={20} color={colors.text} />
                <View style={styles.privacyText}>
                  <Text style={styles.privacyTitle}>Make Profile Visible</Text>
                  <Text style={styles.privacySubtitle}>
                    Allow employers to find and view your profile
                  </Text>
                </View>
              </View>
              <Switch
                value={privacySettings.profileVisible}
                onValueChange={(value) =>
                  setPrivacySettings({
                    ...privacySettings,
                    profileVisible: value,
                  })
                }
                trackColor={{
                  false: colors.border,
                  true: colors.buttonPrimary,
                }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.privacyItem}>
              <View style={styles.privacyInfo}>
                <Ionicons name="mail-outline" size={20} color={colors.text} />
                <View style={styles.privacyText}>
                  <Text style={styles.privacyTitle}>Allow Direct Contact</Text>
                  <Text style={styles.privacySubtitle}>
                    Let employers contact you directly via the app
                  </Text>
                </View>
              </View>
              <Switch
                value={privacySettings.allowContact}
                onValueChange={(value) =>
                  setPrivacySettings({
                    ...privacySettings,
                    allowContact: value,
                  })
                }
                trackColor={{
                  false: colors.border,
                  true: colors.buttonPrimary,
                }}
                thumbColor={colors.white}
              />
            </View>

            <View style={[styles.privacyItem, { marginBottom: 0 }]}>
              <View style={styles.privacyInfo}>
                <Ionicons name="call-outline" size={20} color={colors.text} />
                <View style={styles.privacyText}>
                  <Text style={styles.privacyTitle}>
                    Show Contact Info Publicly
                  </Text>
                  <Text style={styles.privacySubtitle}>
                    Display your email and phone number on your profile
                  </Text>
                </View>
              </View>
              <Switch
                value={privacySettings.showContactPublicly}
                onValueChange={(value) =>
                  setPrivacySettings({
                    ...privacySettings,
                    showContactPublicly: value,
                  })
                }
                trackColor={{
                  false: colors.border,
                  true: colors.buttonPrimary,
                }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingsGroup}>
            <View style={[styles.privacyItem, { marginBottom: 0 }]}>
              <View style={styles.privacyInfo}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={colors.text}
                />
                <View style={styles.privacyText}>
                  <Text style={styles.privacyTitle}>
                    Profile View Notifications
                  </Text>
                  <Text style={styles.privacySubtitle}>
                    Get notified when employers view your profile
                  </Text>
                </View>
              </View>
              <Switch
                value={privacySettings.notifyOnView}
                onValueChange={(value) =>
                  setPrivacySettings({
                    ...privacySettings,
                    notifyOnView: value,
                  })
                }
                trackColor={{
                  false: colors.border,
                  true: colors.buttonPrimary,
                }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
              <View style={styles.actionInfo}>
                <Ionicons
                  name="download-outline"
                  size={20}
                  color={colors.text}
                />
                <Text style={styles.actionTitle}>Download My Data</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionItem, { marginBottom: 0 }]}
              onPress={() => {}}
            >
              <View style={styles.actionInfo}>
                <Ionicons name="shield-outline" size={20} color={colors.text} />
                <Text style={styles.actionTitle}>Privacy Policy</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <View style={styles.settingsGroup}>
            <TouchableOpacity
              style={[styles.actionItem, { marginBottom: 0 }]}
              onPress={() => {
                Alert.alert(
                  "Delete Account",
                  "Are you sure you want to delete your account? This action cannot be undone.",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive" },
                  ]
                );
              }}
            >
              <View style={styles.actionInfo}>
                <Ionicons name="trash-outline" size={20} color={colors.error} />
                <Text style={[styles.actionTitle, { color: colors.error }]}>
                  Delete Account
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 16,
  },
  settingsGroup: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  privacyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  privacyInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  privacyText: {
    marginLeft: 12,
    flex: 1,
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  privacySubtitle: {
    fontSize: 12,
    color: colors.textMuted,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    marginLeft: 12,
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
});

export default PrivacyScreen;

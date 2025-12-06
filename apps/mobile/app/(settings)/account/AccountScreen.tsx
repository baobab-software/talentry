import { colors } from "@/theme";
import { useAuthContext } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountScreen = () => {
  const { user, isLoading: authLoading } = useAuthContext();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    accountId: "",
    primaryEmail: "",
    secondaryEmail: "",
    primaryPhone: "",
    secondaryPhone: "",
    accountType: "User",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        accountId: user.id || "",
        primaryEmail: user.email || "",
        secondaryEmail: "",
        primaryPhone: "",
        secondaryPhone: "",
        accountType: "User",
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API call to save data
      // await accountService.updateAccountSettings(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Success", "Account settings updated successfully!");
      router.back();
    } catch (error) {
      console.error("Save failed:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const accountTypes = ["User", "Employer", "Admin"];

  if (authLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.buttonPrimary} />
          <Text style={styles.loadingText}>Loading account settings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account ID Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Identification</Text>
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Account ID</Text>
              <View style={[styles.inputContainer, styles.readOnlyContainer]}>
                <Ionicons
                  name="finger-print-outline"
                  size={18}
                  color="#888"
                  style={styles.inputIcon}
                />
                <Text style={styles.readOnlyText}>{formData.accountId}</Text>
              </View>
              <Text style={styles.helperText}>
                Your unique account identifier
              </Text>
            </View>
          </View>
        </View>

        {/* Linked Emails Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Linked Email Addresses</Text>
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Primary Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={formData.primaryEmail}
                  onChangeText={(text) =>
                    setFormData({ ...formData, primaryEmail: text })
                  }
                  placeholder="Enter primary email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <Text style={styles.helperText}>
                Used for login and important notifications
              </Text>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Secondary Email (Optional)</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={formData.secondaryEmail}
                  onChangeText={(text) =>
                    setFormData({ ...formData, secondaryEmail: text })
                  }
                  placeholder="Add backup email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <Text style={styles.helperText}>Backup email for recovery</Text>
            </View>
          </View>
        </View>

        {/* Linked Phone Numbers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Linked Phone Numbers</Text>
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Primary Phone Number</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={formData.primaryPhone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, primaryPhone: text })
                  }
                  placeholder="Enter primary phone number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>
              <Text style={styles.helperText}>
                Used for SMS notifications and 2FA
              </Text>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Secondary Phone (Optional)</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={formData.secondaryPhone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, secondaryPhone: text })
                  }
                  placeholder="Add backup phone number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>
              <Text style={styles.helperText}>
                Backup phone for account recovery
              </Text>
            </View>
          </View>
        </View>

        {/* Account Status Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Status</Text>
          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <View style={styles.statusLeft}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.success}
                />
                <View style={styles.statusText}>
                  <Text style={styles.statusLabel}>Account Status</Text>
                  <Text style={styles.statusValue}>Active</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statusRow}>
              <View style={styles.statusLeft}>
                <Ionicons
                  name="shield-checkmark"
                  size={24}
                  color={colors.success}
                />
                <View style={styles.statusText}>
                  <Text style={styles.statusLabel}>Email Verified</Text>
                  <Text style={styles.statusValue}>Yes</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statusRow}>
              <View style={styles.statusLeft}>
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color={colors.textMuted}
                />
                <View style={styles.statusText}>
                  <Text style={styles.statusLabel}>Member Since</Text>
                  <Text style={styles.statusValue}>January 2024</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

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
    marginBottom: 16,
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
  readOnlyContainer: {
    backgroundColor: colors.backgroundDark,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  readOnlyText: {
    flex: 1,
    fontSize: 15,
    color: colors.textMuted,
    fontWeight: "600",
  },
  helperText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 6,
    marginLeft: 2,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.text,
  },
  radioContent: {
    flex: 1,
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  radioDescription: {
    fontSize: 13,
    color: colors.textMuted,
  },
  statusCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusText: {
    marginLeft: 12,
  },
  statusLabel: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
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
  saveButtonDisabled: {
    opacity: 0.6,
  },
});

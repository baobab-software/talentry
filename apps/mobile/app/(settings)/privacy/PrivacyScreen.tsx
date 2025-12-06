import { colors } from "@/theme";
import { useAuthContext } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileVisibility = "public" | "private" | "friends";

const PrivacyScreen = () => {
  const { isLoading: authLoading } = useAuthContext();
  const [isSaving, setIsSaving] = useState(false);

  // Privacy Settings State
  const [profileVisibility, setProfileVisibility] =
    useState<ProfileVisibility>("public");
  const [searchDiscovery, setSearchDiscovery] = useState(true);
  const [dataUsageAnalytics, setDataUsageAnalytics] = useState(true);

  const handleSavePrivacySettings = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API call to save privacy settings
      // await privacyService.updateSettings({
      //   profileVisibility,
      //   searchDiscovery,
      //   dataUsageAnalytics,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Success", "Privacy settings updated successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenPrivacyPolicy = () => {
    // TODO: Replace with actual privacy policy URL
    const privacyPolicyUrl = "https://example.com/privacy-policy";
    Linking.openURL(privacyPolicyUrl).catch((err) =>
      Alert.alert("Error", "Failed to open privacy policy")
    );
  };

  const handleDataDownload = () => {
    Alert.alert(
      "Request Data Download",
      "We'll prepare a copy of your data and send you an email when it's ready. This may take up to 48 hours.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Request",
          onPress: () => {
            // TODO: Implement data download request
            Alert.alert("Success", "Data download request submitted!");
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
          <Text style={styles.loadingText}>Loading privacy settings...</Text>
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
        <Text style={styles.headerTitle}>Privacy</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Privacy Overview */}
        <View style={styles.section}>
          <View style={styles.privacyBanner}>
            <Ionicons
              name="shield-checkmark-outline"
              size={48}
              color={colors.info}
            />
            <Text style={styles.bannerTitle}>Your Privacy Matters</Text>
            <Text style={styles.bannerText}>
              Control who can see your profile and how your data is used
            </Text>
          </View>
        </View>

        {/* Profile Visibility Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Visibility</Text>
          <Text style={styles.sectionSubtitle}>
            Control who can see your profile information
          </Text>
          <View style={styles.optionsCard}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setProfileVisibility("public")}
              activeOpacity={0.7}
            >
              <View style={styles.radioLeft}>
                <View style={styles.radioButton}>
                  {profileVisibility === "public" && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View style={styles.radioContent}>
                  <Text style={styles.radioLabel}>Public</Text>
                  <Text style={styles.radioDescription}>
                    Anyone can view your profile
                  </Text>
                </View>
              </View>
              <Ionicons
                name="globe-outline"
                size={24}
                color={colors.textMuted}
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setProfileVisibility("friends")}
              activeOpacity={0.7}
            >
              <View style={styles.radioLeft}>
                <View style={styles.radioButton}>
                  {profileVisibility === "friends" && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View style={styles.radioContent}>
                  <Text style={styles.radioLabel}>Friends Only</Text>
                  <Text style={styles.radioDescription}>
                    Only your connections can view your profile
                  </Text>
                </View>
              </View>
              <Ionicons
                name="people-outline"
                size={24}
                color={colors.textMuted}
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setProfileVisibility("private")}
              activeOpacity={0.7}
            >
              <View style={styles.radioLeft}>
                <View style={styles.radioButton}>
                  {profileVisibility === "private" && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View style={styles.radioContent}>
                  <Text style={styles.radioLabel}>Private</Text>
                  <Text style={styles.radioDescription}>
                    Only you can view your full profile
                  </Text>
                </View>
              </View>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Discovery Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Discovery</Text>
          <View style={styles.toggleCard}>
            <View style={styles.toggleLeft}>
              <View style={styles.toggleIcon}>
                <Ionicons
                  name="search-outline"
                  size={24}
                  color={searchDiscovery ? colors.info : colors.textMuted}
                />
              </View>
              <View style={styles.toggleContent}>
                <Text style={styles.toggleTitle}>
                  Allow profile in search results
                </Text>
                <Text style={styles.toggleDescription}>
                  Let others find your profile through search
                </Text>
              </View>
            </View>
            <Switch
              value={searchDiscovery}
              onValueChange={setSearchDiscovery}
              trackColor={{ false: "#D0D0D0", true: colors.info }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Data Usage Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Usage</Text>
          <View style={styles.toggleCard}>
            <View style={styles.toggleLeft}>
              <View style={styles.toggleIcon}>
                <Ionicons
                  name="analytics-outline"
                  size={24}
                  color={
                    dataUsageAnalytics ? colors.warning : colors.textMuted
                  }
                />
              </View>
              <View style={styles.toggleContent}>
                <Text style={styles.toggleTitle}>Usage analytics</Text>
                <Text style={styles.toggleDescription}>
                  Help us improve by sharing anonymous usage data
                </Text>
              </View>
            </View>
            <Switch
              value={dataUsageAnalytics}
              onValueChange={setDataUsageAnalytics}
              trackColor={{ false: "#D0D0D0", true: colors.warning }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Your Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Data</Text>
          <View style={styles.dataCard}>
            <View style={styles.dataItem}>
              <View style={styles.dataLeft}>
                <View style={styles.dataIcon}>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color={colors.info}
                  />
                </View>
                <View style={styles.dataContent}>
                  <Text style={styles.dataTitle}>How your data is used</Text>
                  <Text style={styles.dataDescription}>
                    We collect and use your data to provide personalized job
                    recommendations, improve our services, and communicate with
                    you about opportunities. Your data is never sold to third
                    parties.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.dataItem}
              onPress={handleDataDownload}
              activeOpacity={0.7}
            >
              <View style={styles.dataLeft}>
                <View style={styles.dataIcon}>
                  <Ionicons
                    name="download-outline"
                    size={24}
                    color={colors.text}
                  />
                </View>
                <View style={styles.dataContent}>
                  <Text style={styles.dataTitle}>Download your data</Text>
                  <Text style={styles.dataDescription}>
                    Request a copy of your personal data
                  </Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.dataItem}
              onPress={handleOpenPrivacyPolicy}
              activeOpacity={0.7}
            >
              <View style={styles.dataLeft}>
                <View style={styles.dataIcon}>
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color={colors.text}
                  />
                </View>
                <View style={styles.dataContent}>
                  <Text style={styles.dataTitle}>Privacy Policy</Text>
                  <Text style={styles.dataDescription}>
                    Read our full privacy policy
                  </Text>
                </View>
              </View>
              <Ionicons
                name="open-outline"
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
          style={[styles.saveButton, isSaving && styles.buttonDisabled]}
          onPress={handleSavePrivacySettings}
          activeOpacity={0.8}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.saveButtonText}>Save Privacy Settings</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyScreen;

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
  privacyBanner: {
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
  optionsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  radioLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
    lineHeight: 18,
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
  togglesGroup: {
    gap: 12,
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
  dataCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dataItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  dataLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  dataIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dataContent: {
    flex: 1,
  },
  dataTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 6,
  },
  dataDescription: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
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
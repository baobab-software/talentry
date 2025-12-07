import { colors } from "@/theme";
import Header from "@/components/ui/Header";
import { Ionicons } from "@expo/vector-icons";
import * as Application from "expo-application";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
}

const HelpScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How do I create a profile?",
      answer:
        "Go to Settings > Profile Settings and fill in your personal information, work experience, education, and skills. Make sure to upload a professional photo.",
      expanded: false,
    },
    {
      id: "2",
      question: "How do I apply for a job?",
      answer:
        "Browse jobs on the Jobs tab, select a job you're interested in, and tap 'Apply'. Make sure your profile is complete before applying.",
      expanded: false,
    },
    {
      id: "3",
      question: "How do I track my applications?",
      answer:
        "Go to the Saved Jobs tab to view all your applications and their current status. You'll receive notifications when there are updates.",
      expanded: false,
    },
    {
      id: "4",
      question: "How do I change my password?",
      answer:
        "Go to Settings > Security Settings > Change Password. Enter your current password and choose a new one.",
      expanded: false,
    },
    {
      id: "5",
      question: "How do I delete my account?",
      answer:
        "Go to Settings and scroll to the bottom. Tap 'Sign Out' and contact support to request account deletion. This action cannot be undone.",
      expanded: false,
    },
  ]);

  const appVersion = Application.nativeApplicationVersion || "1.0.0";
  const buildNumber = Application.nativeBuildVersion || "1";

  const toggleFAQ = (id: string) => {
    setFaqs((prev) =>
      prev.map((faq) =>
        faq.id === id ? { ...faq, expanded: !faq.expanded } : faq
      )
    );
  };

  const handleContactSupport = (method: "email" | "whatsapp") => {
    if (method === "email") {
      const email = "support@meikasi.com"; // TODO: Replace with actual support email
      const subject = "Support Request";
      const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
      Linking.openURL(url).catch(() =>
        Alert.alert("Error", "Could not open email client")
      );
    } else if (method === "whatsapp") {
      const phoneNumber = "27123456789"; // TODO: Replace with actual WhatsApp number
      const message = "Hi, I need help with Mei Kasi";
      const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
      Linking.openURL(url).catch(() =>
        Alert.alert("Error", "WhatsApp is not installed or could not be opened")
      );
    }
  };

  const handleReportProblem = () => {
    Alert.alert(
      "Report a Problem",
      "Choose how you'd like to report the issue:",
      [
        {
          text: "Email Support",
          onPress: () => handleContactSupport("email"),
        },
        {
          text: "WhatsApp Support",
          onPress: () => handleContactSupport("whatsapp"),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <Header title="Help & Support" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Help Banner */}
        <View style={styles.section}>
          <View style={styles.helpBanner}>
            <Ionicons
              name="help-circle-outline"
              size={48}
              color={colors.info}
            />
            <Text style={styles.bannerTitle}>How can we help you?</Text>
            <Text style={styles.bannerText}>
              Find answers to common questions or get in touch with our support
              team
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => handleContactSupport("email")}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: colors.infoBackground },
                ]}
              >
                <Ionicons name="mail-outline" size={28} color={colors.info} />
              </View>
              <Text style={styles.quickActionLabel}>Email Support</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => handleContactSupport("whatsapp")}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: colors.successBackground },
                ]}
              >
                <Ionicons
                  name="logo-whatsapp"
                  size={28}
                  color={colors.success}
                />
              </View>
              <Text style={styles.quickActionLabel}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={handleReportProblem}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: colors.errorBackground },
                ]}
              >
                <Ionicons
                  name="warning-outline"
                  size={28}
                  color={colors.error}
                />
              </View>
              <Text style={styles.quickActionLabel}>Report Issue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() =>
                Alert.alert("Tutorial", "Tutorial feature coming soon!")
              }
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: colors.warningBackground },
                ]}
              >
                <Ionicons
                  name="book-outline"
                  size={28}
                  color={colors.warning}
                />
              </View>
              <Text style={styles.quickActionLabel}>How to Use</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {/* Search FAQs */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.textMuted}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search FAQs..."
              placeholderTextColor={colors.textMuted}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.faqsCard}>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <View key={faq.id}>
                  <TouchableOpacity
                    style={styles.faqItem}
                    onPress={() => toggleFAQ(faq.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.faqHeader}>
                      <Text style={styles.faqQuestion}>{faq.question}</Text>
                      <Ionicons
                        name={
                          faq.expanded
                            ? "chevron-up-outline"
                            : "chevron-down-outline"
                        }
                        size={20}
                        color={colors.text}
                      />
                    </View>
                    {faq.expanded && (
                      <Text style={styles.faqAnswer}>{faq.answer}</Text>
                    )}
                  </TouchableOpacity>
                  {index < filteredFAQs.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons
                  name="search-outline"
                  size={48}
                  color={colors.textMuted}
                />
                <Text style={styles.emptyStateText}>No FAQs found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Try a different search term
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Contact Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <View style={styles.contactCard}>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleContactSupport("email")}
              activeOpacity={0.7}
            >
              <View style={styles.contactLeft}>
                <View style={styles.contactIcon}>
                  <Ionicons name="mail-outline" size={24} color={colors.info} />
                </View>
                <View style={styles.contactContent}>
                  <Text style={styles.contactTitle}>Email Support</Text>
                  <Text style={styles.contactDescription}>
                    support@meikasi.com
                  </Text>
                  <Text style={styles.contactTime}>
                    Response within 24 hours
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
              style={styles.contactItem}
              onPress={() => handleContactSupport("whatsapp")}
              activeOpacity={0.7}
            >
              <View style={styles.contactLeft}>
                <View style={styles.contactIcon}>
                  <Ionicons
                    name="logo-whatsapp"
                    size={24}
                    color={colors.success}
                  />
                </View>
                <View style={styles.contactContent}>
                  <Text style={styles.contactTitle}>WhatsApp Support</Text>
                  <Text style={styles.contactDescription}>
                    Chat with us directly
                  </Text>
                  <Text style={styles.contactTime}>
                    Available Mon-Fri, 8am-5pm
                  </Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>{appVersion}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Build Number</Text>
              <Text style={styles.infoValue}>{buildNumber}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Platform</Text>
              <Text style={styles.infoValue}>
                {Application.applicationId || "com.meikasi.app"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;

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
  helpBanner: {
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
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  faqsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  faqItem: {
    paddingVertical: 12,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginRight: 12,
    lineHeight: 22,
  },
  faqAnswer: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  contactCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  contactLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 2,
  },
  contactTime: {
    fontSize: 12,
    color: colors.textMuted,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: colors.textMuted,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 8,
  },
});

import { colors } from "@/theme";
import Header from "@/components/ui/Header";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface TermsSection {
  id: string;
  title: string;
  content: string;
  expanded: boolean;
}

const TermsAndConditionsScreen = () => {
  const [sections, setSections] = useState<TermsSection[]>([
    {
      id: "1",
      title: "Introduction & Acceptance of Terms",
      content:
        "By accessing and using Mei Kasi, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and Mei Kasi. If you do not agree with any part of these terms, you must not use our platform.",
      expanded: false,
    },
    {
      id: "2",
      title: "Definitions & Interpretation",
      content:
        "In these Terms and Conditions: 'Platform' refers to the Mei Kasi mobile application and all related services; 'User' means any person who accesses or uses the Platform; 'Job Seeker' refers to individuals seeking employment opportunities; 'Employer' or 'Recruiter' refers to entities posting job opportunities; 'Content' means any information, data, text, or materials uploaded to the Platform.",
      expanded: false,
    },
    {
      id: "3",
      title: "Eligibility to Use the Platform",
      content:
        "You must be at least 18 years of age to use this Platform. By using our services, you represent and warrant that you have the legal capacity to enter into a binding agreement. Users under the age of 18 are prohibited from creating accounts or using the Platform without parental or guardian consent.",
      expanded: false,
    },
    {
      id: "4",
      title: "User Accounts & Registration",
      content:
        "To access certain features of the Platform, you must create an account by providing accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.",
      expanded: false,
    },
    {
      id: "5",
      title: "User Responsibilities & Conduct",
      content:
        "Users must conduct themselves in a professional and lawful manner. You agree not to use the Platform for any unlawful purpose or in violation of these Terms. You must respect the rights of others and refrain from posting misleading, defamatory, or offensive content. Users are responsible for ensuring all information provided is accurate and up to date.",
      expanded: false,
    },
    {
      id: "6",
      title: "Job Seeker Obligations",
      content:
        "Job Seekers agree to provide truthful and accurate information in their profiles and job applications. You must not misrepresent your qualifications, experience, or employment history. Job Seekers are responsible for maintaining professional communication with potential employers and must comply with all applicable employment laws in South Africa.",
      expanded: false,
    },
    {
      id: "7",
      title: "Employer / Recruiter Obligations",
      content:
        "Employers and Recruiters agree to post only legitimate job opportunities and must not discriminate based on race, gender, age, disability, or any other protected characteristic under South African law. All job postings must comply with the Employment Equity Act and other relevant legislation. Employers must respect the privacy and personal information of Job Seekers.",
      expanded: false,
    },
    {
      id: "8",
      title: "Prohibited Activities",
      content:
        "Users must not engage in fraudulent activities, spam, harassment, or any form of abuse. You may not attempt to gain unauthorized access to the Platform or interfere with its proper functioning. Posting malicious content, viruses, or harmful code is strictly prohibited. Users must not scrape, data mine, or use automated systems to collect information from the Platform without permission.",
      expanded: false,
    },
    {
      id: "9",
      title: "Job Listings & Applications",
      content:
        "Mei Kasi facilitates connections between Job Seekers and Employers but does not guarantee employment. All job listings are provided by third parties, and we do not verify the accuracy or legitimacy of all postings. Job applications submitted through the Platform are the responsibility of the applicant. We are not liable for any employment decisions or outcomes.",
      expanded: false,
    },
    {
      id: "10",
      title: "Verification & Background Checks Disclaimer",
      content:
        "Mei Kasi does not conduct comprehensive background checks on all users. While we may implement verification measures, users are advised to conduct their own due diligence. Employers are responsible for verifying the credentials and qualifications of potential employees. We do not guarantee the accuracy of information provided by users.",
      expanded: false,
    },
    {
      id: "11",
      title: "Fees, Subscriptions & Payments (If Applicable)",
      content:
        "Certain features of the Platform may require payment of fees. All fees are clearly disclosed before purchase and are non-refundable unless otherwise stated. Payment information is processed securely through third-party payment providers. You agree to pay all applicable fees and charges in accordance with the pricing and payment terms presented to you. We reserve the right to modify pricing with reasonable notice.",
      expanded: false,
    },
    {
      id: "12",
      title: "Intellectual Property Rights",
      content:
        "All content, features, and functionality of the Platform, including but not limited to text, graphics, logos, and software, are owned by Mei Kasi or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.",
      expanded: false,
    },
    {
      id: "13",
      title: "User-Generated Content",
      content:
        "By posting content on the Platform, you grant Mei Kasi a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content for the purpose of operating and promoting the Platform. You retain ownership of your content but are responsible for ensuring you have the right to post it. We reserve the right to remove any content that violates these Terms.",
      expanded: false,
    },
    {
      id: "14",
      title: "Privacy & Protection of Personal Information (POPIA Compliance)",
      content:
        "We are committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA) of South Africa. We collect, use, and process personal information only for legitimate purposes and with appropriate consent. Users have the right to access, correct, and delete their personal information. Please refer to our Privacy Policy for detailed information on how we handle your data.",
      expanded: false,
    },
    {
      id: "15",
      title: "Data Storage & Security",
      content:
        "We implement reasonable security measures to protect your information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is completely secure. While we strive to protect your data, we cannot guarantee absolute security. Users are responsible for maintaining the security of their account credentials.",
      expanded: false,
    },
    {
      id: "16",
      title: "Communication Consent & Notifications",
      content:
        "By using the Platform, you consent to receive communications from us, including notifications, updates, and promotional materials. You may opt out of certain communications through your account settings. Essential service communications cannot be disabled. We will communicate with you via email, SMS, push notifications, or other means as necessary.",
      expanded: false,
    },
    {
      id: "17",
      title: "Account Suspension & Termination",
      content:
        "We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason we deem appropriate. You may terminate your account at any time by contacting our support team. Upon termination, your access to the Platform will cease, and we may delete your account information subject to our data retention policies.",
      expanded: false,
    },
    {
      id: "18",
      title: "Limitation of Liability",
      content:
        "To the fullest extent permitted by law, Mei Kasi shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Platform. Our total liability shall not exceed the amount paid by you, if any, for accessing the Platform. We do not guarantee uninterrupted or error-free service and are not responsible for any loss or damage resulting from platform downtime.",
      expanded: false,
    },
    {
      id: "19",
      title: "Indemnity",
      content:
        "You agree to indemnify, defend, and hold harmless Mei Kasi, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses arising from your use of the Platform, your violation of these Terms, or your infringement of any rights of another party. This indemnification obligation will survive the termination of your account.",
      expanded: false,
    },
    {
      id: "20",
      title: "Disclaimer of Warranties",
      content:
        "The Platform is provided on an 'as is' and 'as available' basis without warranties of any kind, either express or implied. We do not warrant that the Platform will be error-free, secure, or uninterrupted. We make no representations about the accuracy, reliability, or completeness of content on the Platform. You use the Platform at your own risk.",
      expanded: false,
    },
    {
      id: "21",
      title: "Third-Party Services & External Links",
      content:
        "The Platform may contain links to third-party websites or services that are not owned or controlled by Mei Kasi. We are not responsible for the content, privacy policies, or practices of third-party sites. Your use of third-party services is at your own risk and subject to their terms and conditions. We do not endorse or assume any responsibility for third-party offerings.",
      expanded: false,
    },
    {
      id: "22",
      title: "Governing Law (Republic of South Africa)",
      content:
        "These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the South African courts. You agree to submit to the personal jurisdiction of courts located in South Africa for the resolution of any disputes.",
      expanded: false,
    },
    {
      id: "23",
      title: "Dispute Resolution & Legal Proceedings",
      content:
        "In the event of a dispute, the parties agree to first attempt resolution through good faith negotiations. If negotiations fail, disputes may be referred to mediation or arbitration before proceeding to litigation. Any legal proceedings must be initiated within one year from the date the cause of action arose. This clause does not prevent either party from seeking urgent interim relief.",
      expanded: false,
    },
    {
      id: "24",
      title: "Amendments to the Terms",
      content:
        "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the Platform. Your continued use of the Platform after changes are posted constitutes acceptance of the modified Terms. We will make reasonable efforts to notify users of significant changes via email or platform notifications.",
      expanded: false,
    },
    {
      id: "25",
      title: "Force Majeure",
      content:
        "Mei Kasi shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, strikes, power failures, or internet service disruptions. In such events, our obligations shall be suspended for the duration of the force majeure event.",
      expanded: false,
    },
    {
      id: "26",
      title: "Severability",
      content:
        "If any provision of these Terms and Conditions is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced with a valid provision that most closely reflects the intent of the original provision. This ensures the enforceability of these Terms as a whole.",
      expanded: false,
    },
    {
      id: "27",
      title: "Contact Information",
      content:
        "For questions, concerns, or inquiries regarding these Terms and Conditions, please contact us at:\n\nEmail: legal@meikasi.com\nAddress: Mei Kasi, Johannesburg, South Africa\nPhone: +27 11 123 4567\n\nWe are committed to addressing your concerns promptly and professionally.",
      expanded: false,
    },
  ]);

  const lastUpdated = "December 5, 2025";

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };

  const expandAll = () => {
    setSections((prev) => prev.map((section) => ({ ...section, expanded: true })));
  };

  const collapseAll = () => {
    setSections((prev) =>
      prev.map((section) => ({ ...section, expanded: false }))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <Header title="Terms & Conditions"  />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction */}
        <View style={styles.section}>
          <View style={styles.introCard}>
            <Ionicons
              name="document-text-outline"
              size={48}
              color={colors.info}
            />
            <Text style={styles.introTitle}>Legal Terms & Conditions</Text>
            <Text style={styles.introText}>
              Please read these terms carefully before using Mei Kasi. By using
              our platform, you agree to these terms.
            </Text>
            <Text style={styles.lastUpdated}>
              Last Updated: {lastUpdated}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={expandAll}
              activeOpacity={0.7}
            >
              <Ionicons
                name="expand-outline"
                size={16}
                color={colors.info}
              />
              <Text style={styles.actionButtonText}>Expand All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={collapseAll}
              activeOpacity={0.7}
            >
              <Ionicons
                name="contract-outline"
                size={16}
                color={colors.info}
              />
              <Text style={styles.actionButtonText}>Collapse All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms Sections */}
        <View style={styles.section}>
          <View style={styles.termsCard}>
            {sections.map((section, index) => (
              <View key={section.id}>
                <TouchableOpacity
                  style={styles.termSection}
                  onPress={() => toggleSection(section.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.termHeader}>
                    <View style={styles.termNumber}>
                      <Text style={styles.termNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.termTitle}>{section.title}</Text>
                    <Ionicons
                      name={
                        section.expanded
                          ? "chevron-up-outline"
                          : "chevron-down-outline"
                      }
                      size={20}
                      color={colors.text}
                    />
                  </View>
                  {section.expanded && (
                    <Text style={styles.termContent}>{section.content}</Text>
                  )}
                </TouchableOpacity>
                {index < sections.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        {/* Footer Note */}
        <View style={styles.section}>
          <View style={styles.footerCard}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.warning}
            />
            <Text style={styles.footerText}>
              These terms are governed by the laws of the Republic of South
              Africa and comply with POPIA (Protection of Personal Information
              Act).
            </Text>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions about these terms?</Text>
          <View style={styles.contactCard}>
            <Text style={styles.contactText}>
              If you have any questions or concerns about our Terms and
              Conditions, please contact our legal team at:
            </Text>
            <Text style={styles.contactEmail}>legal@meikasi.com</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditionsScreen;

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
  introCard: {
    backgroundColor: colors.infoBackground,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.infoLight,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  introText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 12,
  },
  lastUpdated: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.info,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.info,
  },
  termsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  termSection: {
    paddingVertical: 12,
  },
  termHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  termNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },
  termNumberText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  termTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    lineHeight: 22,
  },
  termContent: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: 12,
    marginLeft: 44,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 8,
  },
  footerCard: {
    flexDirection: "row",
    backgroundColor: colors.warningBackground,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.warningLight,
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: 12,
  },
  contactEmail: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.info,
  },
});
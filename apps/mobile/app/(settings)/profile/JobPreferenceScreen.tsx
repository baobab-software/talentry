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
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const JobPreferenceScreen = () => {
  const [formData, setFormData] = useState({
    availability: "Immediately",
    jobType: "Full-time",
    workSetup: "Remote",
    targetSalary: "45,000 - 55,000",
  });

  const RadioButton = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const handleSave = () => {
    Alert.alert("Success", "Job preferences updated successfully!");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <Header title="Job Preferences"  />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.inputGroup}>
            <View style={styles.radioGroup}>
              <RadioButton
                label="Immediately"
                selected={formData.availability === "Immediately"}
                onPress={() =>
                  setFormData({ ...formData, availability: "Immediately" })
                }
              />
              <RadioButton
                label="Within 2 weeks"
                selected={formData.availability === "Within 2 weeks"}
                onPress={() =>
                  setFormData({ ...formData, availability: "Within 2 weeks" })
                }
              />
              <RadioButton
                label="Within a month"
                selected={formData.availability === "Within a month"}
                onPress={() =>
                  setFormData({ ...formData, availability: "Within a month" })
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Type</Text>
          <View style={styles.inputGroup}>
            <View style={styles.radioGroup}>
              <RadioButton
                label="Full-time"
                selected={formData.jobType === "Full-time"}
                onPress={() =>
                  setFormData({ ...formData, jobType: "Full-time" })
                }
              />
              <RadioButton
                label="Part-time"
                selected={formData.jobType === "Part-time"}
                onPress={() =>
                  setFormData({ ...formData, jobType: "Part-time" })
                }
              />
              <RadioButton
                label="Contract"
                selected={formData.jobType === "Contract"}
                onPress={() =>
                  setFormData({ ...formData, jobType: "Contract" })
                }
              />
              <RadioButton
                label="Internship"
                selected={formData.jobType === "Internship"}
                onPress={() =>
                  setFormData({ ...formData, jobType: "Internship" })
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Setup</Text>
          <View style={styles.inputGroup}>
            <View style={styles.radioGroup}>
              <RadioButton
                label="Remote"
                selected={formData.workSetup === "Remote"}
                onPress={() =>
                  setFormData({ ...formData, workSetup: "Remote" })
                }
              />
              <RadioButton
                label="On-site"
                selected={formData.workSetup === "On-site"}
                onPress={() =>
                  setFormData({ ...formData, workSetup: "On-site" })
                }
              />
              <RadioButton
                label="Hybrid"
                selected={formData.workSetup === "Hybrid"}
                onPress={() =>
                  setFormData({ ...formData, workSetup: "Hybrid" })
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Salary Expectations</Text>
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>
                Target Salary Range (ZAR/month)
              </Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="cash-outline"
                  size={18}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={formData.targetSalary}
                  onChangeText={(text) =>
                    setFormData({ ...formData, targetSalary: text })
                  }
                  placeholder="e.g. 45,000 - 55,000"
                  placeholderTextColor="#999"
                />
              </View>
              <Text style={styles.inputHint}>
                Provide a realistic salary range based on your experience
              </Text>
            </View>
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
  inputGroup: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioOuterSelected: {
    borderColor: colors.buttonPrimary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.buttonPrimary,
  },
  radioLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },
  inputWrapper: {
    marginBottom: 0,
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
  inputHint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
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

export default JobPreferenceScreen;

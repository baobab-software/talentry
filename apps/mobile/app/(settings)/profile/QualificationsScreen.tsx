import { colors } from "@/theme";
import Header from "@/components/ui/Header";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
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

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

const QualificationsScreen = () => {
  const [resume, setResume] = useState<{
    name: string;
    size: number;
    uri: string;
    updatedDate: string;
  } | null>(null);

  const [educationList, setEducationList] = useState<Education[]>([]);
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [skillsList, setSkillsList] = useState<string[]>([
    "React Native",
    "TypeScript",
    "Node.js",
  ]);

  // Modal states
  const [educationModalVisible, setEducationModalVisible] = useState(false);
  const [experienceModalVisible, setExperienceModalVisible] = useState(false);
  const [skillModalVisible, setSkillModalVisible] = useState(false);

  // Education form
  const [educationForm, setEducationForm] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    current: false,
  });

  // Experience form
  const [experienceForm, setExperienceForm] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  // Skill form
  const [skillInput, setSkillInput] = useState("");

  const handlePickResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setResume({
          name: file.name,
          size: file.size || 0,
          uri: file.uri,
          updatedDate: new Date().toISOString().split("T")[0],
        });
        Alert.alert("Success", "Resume uploaded successfully!");
      }
    } catch (error) {
      console.error("Error picking resume:", error);
      Alert.alert("Error", "Failed to pick resume. Please try again.");
    }
  };

  const handleRemoveResume = () => {
    Alert.alert(
      "Remove Resume",
      "Are you sure you want to remove your resume?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => setResume(null),
        },
      ]
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleSave = () => {
    Alert.alert("Success", "Qualifications updated successfully!");
    router.back();
  };

  // Education handlers
  const handleAddEducation = () => {
    if (!educationForm.institution || !educationForm.degree) {
      Alert.alert("Error", "Please fill in required fields");
      return;
    }

    const newEducation: Education = {
      id: Date.now().toString(),
      ...educationForm,
    };

    setEducationList([...educationList, newEducation]);
    setEducationForm({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      current: false,
    });
    setEducationModalVisible(false);
  };

  const handleRemoveEducation = (id: string) => {
    setEducationList(educationList.filter((item) => item.id !== id));
  };

  // Experience handlers
  const handleAddExperience = () => {
    if (!experienceForm.company || !experienceForm.position) {
      Alert.alert("Error", "Please fill in required fields");
      return;
    }

    const newExperience: Experience = {
      id: Date.now().toString(),
      ...experienceForm,
    };

    setExperienceList([...experienceList, newExperience]);
    setExperienceForm({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setExperienceModalVisible(false);
  };

  const handleRemoveExperience = (id: string) => {
    setExperienceList(experienceList.filter((item) => item.id !== id));
  };

  // Skill handlers
  const handleAddSkill = () => {
    if (!skillInput.trim()) {
      Alert.alert("Error", "Please enter a skill");
      return;
    }

    if (skillsList.includes(skillInput.trim())) {
      Alert.alert("Error", "This skill already exists");
      return;
    }

    setSkillsList([...skillsList, skillInput.trim()]);
    setSkillInput("");
    setSkillModalVisible(false);
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <Header title="Qualifications" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Resume Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resume/CV</Text>
          {resume ? (
            <View style={styles.resumeCard}>
              <View style={styles.resumeInfo}>
                <View style={styles.resumeIconContainer}>
                  <Ionicons
                    name="document-text"
                    size={24}
                    color={colors.buttonPrimary}
                  />
                </View>
                <View style={styles.resumeDetails}>
                  <Text style={styles.resumeName}>{resume.name}</Text>
                  <Text style={styles.resumeSize}>
                    Updated: {resume.updatedDate} •{" "}
                    {formatFileSize(resume.size)}
                  </Text>
                </View>
              </View>
              <View style={styles.resumeActions}>
                <TouchableOpacity
                  style={styles.resumeActionButton}
                  onPress={handlePickResume}
                >
                  <Ionicons
                    name="cloud-upload-outline"
                    size={18}
                    color={colors.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.resumeActionButton}
                  onPress={handleRemoveResume}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={colors.error}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadCard}
              onPress={handlePickResume}
              activeOpacity={0.7}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={32}
                color={colors.buttonPrimary}
              />
              <Text style={styles.uploadTitle}>Upload Resume/CV</Text>
              <Text style={styles.uploadSubtitle}>
                PDF, DOC, DOCX • Max 10MB
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Education</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setEducationModalVisible(true)}
            >
              <Ionicons
                name="add-circle"
                size={24}
                color={colors.buttonPrimary}
              />
            </TouchableOpacity>
          </View>
          {educationList.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="school-outline"
                size={48}
                color={colors.textMuted}
              />
              <Text style={styles.emptyStateText}>No education added yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Add your educational background
              </Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {educationList.map((item) => (
                <View key={item.id} style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{item.degree}</Text>
                    <Text style={styles.listItemSubtitle}>
                      {item.institution}
                    </Text>
                    <Text style={styles.listItemDate}>
                      {item.startDate} -{" "}
                      {item.current ? "Present" : item.endDate}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveEducation(item.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color={colors.error}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Work Experience Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setExperienceModalVisible(true)}
            >
              <Ionicons
                name="add-circle"
                size={24}
                color={colors.buttonPrimary}
              />
            </TouchableOpacity>
          </View>
          {experienceList.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="briefcase-outline"
                size={48}
                color={colors.textMuted}
              />
              <Text style={styles.emptyStateText}>No experience added yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Add your work experience
              </Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {experienceList.map((item) => (
                <View key={item.id} style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{item.position}</Text>
                    <Text style={styles.listItemSubtitle}>{item.company}</Text>
                    <Text style={styles.listItemDate}>
                      {item.startDate} -{" "}
                      {item.current ? "Present" : item.endDate}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveExperience(item.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color={colors.error}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setSkillModalVisible(true)}
            >
              <Ionicons
                name="add-circle"
                size={24}
                color={colors.buttonPrimary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.skillsContainer}>
            {skillsList.map((skill, index) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
                <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
            ))}
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

      {/* Education Modal */}
      <Modal
        visible={educationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEducationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Education</Text>
              <TouchableOpacity
                onPress={() => setEducationModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalScroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Institution *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. University of Cape Town"
                  placeholderTextColor={colors.textMuted}
                  value={educationForm.institution}
                  onChangeText={(text) =>
                    setEducationForm({ ...educationForm, institution: text })
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Degree *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Bachelor of Science"
                  placeholderTextColor={colors.textMuted}
                  value={educationForm.degree}
                  onChangeText={(text) =>
                    setEducationForm({ ...educationForm, degree: text })
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Field of Study</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Computer Science"
                  placeholderTextColor={colors.textMuted}
                  value={educationForm.fieldOfStudy}
                  onChangeText={(text) =>
                    setEducationForm({ ...educationForm, fieldOfStudy: text })
                  }
                />
              </View>

              <View style={styles.dateRow}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Start Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YYYY"
                    placeholderTextColor={colors.textMuted}
                    value={educationForm.startDate}
                    onChangeText={(text) =>
                      setEducationForm({ ...educationForm, startDate: text })
                    }
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>End Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YYYY"
                    placeholderTextColor={colors.textMuted}
                    value={educationForm.endDate}
                    onChangeText={(text) =>
                      setEducationForm({ ...educationForm, endDate: text })
                    }
                    editable={!educationForm.current}
                  />
                </View>
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Currently studying here</Text>
                <Switch
                  value={educationForm.current}
                  onValueChange={(value) =>
                    setEducationForm({ ...educationForm, current: value })
                  }
                  trackColor={{
                    false: colors.border,
                    true: colors.buttonPrimary,
                  }}
                  thumbColor={colors.white}
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddEducation}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Add Education</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Experience Modal */}
      <Modal
        visible={experienceModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setExperienceModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Work Experience</Text>
              <TouchableOpacity
                onPress={() => setExperienceModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalScroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Company *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Google"
                  placeholderTextColor={colors.textMuted}
                  value={experienceForm.company}
                  onChangeText={(text) =>
                    setExperienceForm({ ...experienceForm, company: text })
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Position *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Software Engineer"
                  placeholderTextColor={colors.textMuted}
                  value={experienceForm.position}
                  onChangeText={(text) =>
                    setExperienceForm({ ...experienceForm, position: text })
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Cape Town, South Africa"
                  placeholderTextColor={colors.textMuted}
                  value={experienceForm.location}
                  onChangeText={(text) =>
                    setExperienceForm({ ...experienceForm, location: text })
                  }
                />
              </View>

              <View style={styles.dateRow}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Start Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YYYY"
                    placeholderTextColor={colors.textMuted}
                    value={experienceForm.startDate}
                    onChangeText={(text) =>
                      setExperienceForm({ ...experienceForm, startDate: text })
                    }
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>End Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YYYY"
                    placeholderTextColor={colors.textMuted}
                    value={experienceForm.endDate}
                    onChangeText={(text) =>
                      setExperienceForm({ ...experienceForm, endDate: text })
                    }
                    editable={!experienceForm.current}
                  />
                </View>
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Currently working here</Text>
                <Switch
                  value={experienceForm.current}
                  onValueChange={(value) =>
                    setExperienceForm({ ...experienceForm, current: value })
                  }
                  trackColor={{
                    false: colors.border,
                    true: colors.buttonPrimary,
                  }}
                  thumbColor={colors.white}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Describe your responsibilities and achievements"
                  placeholderTextColor={colors.textMuted}
                  value={experienceForm.description}
                  onChangeText={(text) =>
                    setExperienceForm({ ...experienceForm, description: text })
                  }
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddExperience}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Add Experience</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Skill Modal */}
      <Modal
        visible={skillModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSkillModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: 280 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Skill</Text>
              <TouchableOpacity
                onPress={() => setSkillModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}></Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. React Native"
                placeholderTextColor={colors.textMuted}
                value={skillInput}
                onChangeText={setSkillInput}
                autoFocus
              />
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddSkill}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Add Skill</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  addButton: {
    padding: 4,
  },
  resumeCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
  },
  resumeInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  resumeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  resumeDetails: {
    flex: 1,
  },
  resumeName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  resumeSize: {
    fontSize: 12,
    color: colors.textMuted,
  },
  resumeActions: {
    flexDirection: "row",
    gap: 8,
  },
  resumeActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  uploadCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: "dashed",
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
    marginTop: 12,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
  },
  emptyState: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginTop: 16,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 13,
    color: colors.textMuted,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  skillText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
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
  listContainer: {
    gap: 12,
  },
  listItem: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: colors.border,
  },
  listItemContent: {
    flex: 1,
    marginRight: 12,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  listItemDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },
  modalScroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  dateRow: {
    flexDirection: "row",
    gap: 12,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
  },
  modalButton: {
    backgroundColor: colors.text,
    borderRadius: 16,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
});

export default QualificationsScreen;

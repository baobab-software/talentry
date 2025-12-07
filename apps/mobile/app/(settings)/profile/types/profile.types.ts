export interface ProfileFormData {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  professionalSummary: string;
}

export interface JobPreferenceData {
  availability: string;
  jobType: string;
  workSetup: string;
  targetSalary: string;
}

export interface ResumeData {
  name: string;
  size: number;
  uri: string;
  updatedDate: string;
}

export interface EducationData {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface PrivacySettings {
  profileVisible: boolean;
  allowContact: boolean;
  showContactPublicly: boolean;
  notifyOnView: boolean;
}

export interface ProfileMenuItem {
  id: string;
  title: string;
  icon: string;
  route: string;
  description: string;
  completeness?: number;
}
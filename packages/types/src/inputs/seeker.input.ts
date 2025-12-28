export interface CreateSeekerInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
}

export interface UpdateSeekerInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  isActive?: boolean;
}

export interface SeekerProfileInput {
  bio?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  resumeUrl?: string;
}
export interface CreateAdminInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UpdateAdminInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
}

export interface AdminLoginInput {
  email: string;
  password: string;
}

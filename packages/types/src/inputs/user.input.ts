import { UserRole } from '../enums/user.enum';

export interface CreateUserInput {
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  image?: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  avatar?: string;
  email?: string;
  phone?: string;
  image?: string;
  role?: UserRole;
  password?: string;
}
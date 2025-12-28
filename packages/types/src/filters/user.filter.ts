import { UserRole } from '../enums/user.enum';

export interface UserFilter {
  id?: string;
  role?: UserRole;
  email?: string;
  phone?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: { [key: string]: "asc" | "desc" };
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
}
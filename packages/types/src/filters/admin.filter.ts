export interface AdminFilter {
  id?: string;
  userId?: string;
  invitedById?: string;
  firstName?: string;
  lastName?: string;
  type?: string;
  permissions?: string[];
  search?: string;
  page?: number;
  limit?: number;
  sort?: { [key: string]: "asc" | "desc" };
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
}

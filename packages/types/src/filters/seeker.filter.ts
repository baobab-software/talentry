export interface SeekerFilter {
  id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  search?: string;
  limit?: number;
  page?: number;
  sort?: "createdAt" | "firstName" | "lastName";
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
}

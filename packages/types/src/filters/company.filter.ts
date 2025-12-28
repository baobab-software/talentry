export interface CompanyFilter {
  id?: string;
  userId?: string;
  name?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: { [key: string]: "asc" | "desc" };
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
}

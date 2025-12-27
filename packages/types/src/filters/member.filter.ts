export interface MemberFilter {
  id?: string;
  userId?: string;
  companyId?: string;
  role?: string;
  isActive?: boolean;
  joinedAtFrom?: Date;
  joinedAtTo?: Date;
  search?: string;
}

export interface MemberSortOptions {
  field: "joinedAt" | "role" | "createdAt";
  order: "asc" | "desc";
}

export interface MemberQueryOptions {
  filter?: MemberFilter;
  sort?: MemberSortOptions;
  limit?: number;
  offset?: number;
}

export interface InvitationFilter {
  id?: string;
  email?: string;
  companyId?: string;
  status?: string;
  invitedById?: string;
  createdAtFrom?: Date;
  createdAtTo?: Date;
  expiresAtFrom?: Date;
  expiresAtTo?: Date;
  search?: string;
}

export interface InvitationSortOptions {
  field: 'createdAt' | 'expiresAt' | 'status';
  order: 'asc' | 'desc';
}

export interface InvitationQueryOptions {
  filter?: InvitationFilter;
  sort?: InvitationSortOptions;
  limit?: number;
  offset?: number;
}
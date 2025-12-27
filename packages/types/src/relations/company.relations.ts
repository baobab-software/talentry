export interface CompanyRelations {
  members?: unknown[];
  jobs?: unknown[];
  invitations?: unknown[];
  createdBy?: unknown;
}

export interface CompanyWithRelations {
  id: string;
  name: string;
  description?: string;
  website?: string;
  industry?: string;
  size?: string;
  logo?: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  members?: unknown[];
  jobs?: unknown[];
  invitations?: unknown[];
  createdBy?: unknown;
}

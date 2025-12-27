export interface MemberRelations {
  user?: unknown;
  company?: unknown;
}

export interface MemberWithRelations {
  id: string;
  userId: string;
  companyId: string;
  role: string;
  isActive: boolean;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  user?: unknown;
  company?: unknown;
}

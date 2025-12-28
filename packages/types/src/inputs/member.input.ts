export interface CreateMemberInput {
  userId: string;
  companyId: string;
  role: string;
}

export interface UpdateMemberInput {
  role?: string;
  isActive?: boolean;
}

export interface InviteMemberInput {
  email: string;
  companyId: string;
  role: string;
}
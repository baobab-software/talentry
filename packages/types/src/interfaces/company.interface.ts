import { BaseEntity } from './base.interface';
import { User } from './user.interface';
import { CompanyMember } from './member.interface';
import { Invitation } from './invitation.interface';
import { CompanyJoinRequest } from './invitation.interface';
import { CompanyMemberAudit } from './audit.interface';

export interface Company extends BaseEntity {
  id: string;
  userId: string;
  user: User;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  
  // Relations
  companyMembers?: CompanyMember[];
  invitations?: Invitation[];
  joinRequests?: CompanyJoinRequest[];
  auditLogs?: CompanyMemberAudit[];
}
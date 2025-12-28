import { BaseEntity } from './base.interface';
import { CompanyMemberRole, CompanyMemberStatus } from '../enums/company.enum';
import { Company } from './company.interface';
import { User } from './user.interface';
import { JsonObject } from './base.interface';

export interface CompanyMember extends BaseEntity {
  id: string;
  companyId: string;
  company: Company;
  userId: string;
  user: User;
  role: CompanyMemberRole;
  department?: string;
  title?: string;
  permissions?: JsonObject;
  invitedById?: string;
  invitedBy?: User;
  invitedAt?: Date;
  joinedAt: Date;
  status: CompanyMemberStatus;
}
import { BaseAudit, JsonObject } from './base.interface';
import { Company } from './company.interface';
import { User } from './user.interface';

export interface CompanyMemberAudit extends BaseAudit {
  id: string;
  
  companyId?: string;
  company?: Company;
  
  memberId?: string;
  actorId: string;
  actor: User;
  
  actionType: string;
  targetType: string;
  targetId?: string;
  
  oldData?: JsonObject;
  newData?: JsonObject;
  changes?: JsonObject;
}
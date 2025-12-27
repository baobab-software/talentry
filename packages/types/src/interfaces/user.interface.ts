import { BaseEntity } from "./base.interface";
import { UserRole } from "../enums/user.enum";
import { Admin } from "./admin.interface";
import { Seeker } from "./seeker.interface";
import { Company } from "./company.interface";
import { CompanyMember } from "./member.interface";
import { Invitation } from "./invitation.interface";
import { CompanyJoinRequest } from "./invitation.interface";
import { CompanyMemberAudit } from "./audit.interface";

export interface User extends BaseEntity {
  id: string;
  avatar?: string;
  email: string;
  phone: string;
  image?: string;
  role: UserRole;
  password: string;

  // Relations
  admin?: Admin;
  seeker?: Seeker;
  company?: Company;
  companyMembers?: CompanyMember[];
  memberInvitations?: CompanyMember[];
  invitationsSent?: Invitation[];
  invitationsReceived?: Invitation[];
  joinRequests?: CompanyJoinRequest[];
  auditActions?: CompanyMemberAudit[];
  reviewsMade?: CompanyJoinRequest[];
  adminsInvited?: Admin[];
}

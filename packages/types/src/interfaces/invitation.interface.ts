import { BaseEntity, JsonObject } from "./base.interface";
import { AdminType } from "../enums/admin.enum";
import { Company } from "./company.interface";
import { User } from "./user.interface";
import { InvitationStatus, InvitationType, JoinRequestStatus } from "../enums";

export interface Invitation extends BaseEntity {
  id: string;
  type: InvitationType;

  companyId?: string;
  company?: Company;

  adminType?: AdminType;
  adminCompanyId?: string;

  inviterId: string;
  inviter: User;

  inviteeId?: string;
  invitee?: User;
  email: string;
  firstName?: string;
  lastName?: string;

  role?: string;
  permissions?: JsonObject;
  department?: string;
  title?: string;

  token: string;
  status: InvitationStatus;
  expiresAt: Date;
  message?: string;
  acceptedAt?: Date;
  declinedAt?: Date;
  revokedAt?: Date;

  ipAddress?: string;
  userAgent?: string;
  metadata?: JsonObject;
}

export interface CompanyJoinRequest extends BaseEntity {
  id: string;
  companyId: string;
  company: Company;
  userId: string;
  user: User;
  message?: string;
  status: JoinRequestStatus;
  reviewedById?: string;
  reviewedBy?: User;
  reviewedAt?: Date;
}

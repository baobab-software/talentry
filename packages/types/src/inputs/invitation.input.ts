import { InvitationStatus, InvitationType } from "../enums";
import { AdminType } from "../enums/admin.enum";
import { JsonObject } from "../interfaces/base.interface";

export interface CreateInvitationInput {
  type: InvitationType;
  companyId?: string;
  adminType?: AdminType;
  adminCompanyId?: string;
  inviterId: string;
  inviteeId?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  permissions?: JsonObject;
  department?: string;
  title?: string;
  message?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: JsonObject;
}

export interface UpdateInvitationInput {
  status?: InvitationStatus;
  message?: string;
  acceptedAt?: Date;
  declinedAt?: Date;
  revokedAt?: Date;
}

export interface CreateJoinRequestInput {
  companyId: string;
  userId: string;
  message?: string;
}

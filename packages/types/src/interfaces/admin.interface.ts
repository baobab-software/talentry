import { BaseEntity } from './base.interface';
import { AdminType } from '../enums/admin.enum';
import { User } from './user.interface';
import { JsonObject } from './base.interface';

export interface Admin extends BaseEntity {
  id: string;
  userId: string;
  user: User;
  firstName: string;
  lastName: string;
  type: AdminType;
  invitedById?: string;
  invitedBy?: User;
  invitedAt?: Date;
  permissions?: JsonObject;
}
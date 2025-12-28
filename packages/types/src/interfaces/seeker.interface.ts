import { BaseEntity } from './base.interface';
import { User } from './user.interface';

export interface Seeker extends BaseEntity {
  id: string;
  userId: string;
  user: User;
  firstName: string;
  lastName: string;
}
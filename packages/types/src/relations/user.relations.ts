import { User } from '../interfaces/user.interface';
import { Admin } from '../interfaces/admin.interface';
import { Seeker } from '../interfaces/seeker.interface';
import { Company } from '../interfaces/company.interface';
import { CompanyMember } from '../interfaces/member.interface';

export type UserWithRelations = User & {
  admin?: Admin;
  seeker?: Seeker;
  company?: Company;
  companyMembers?: CompanyMember[];
};

export type UserWithProfile = User & {
  admin?: Admin;
  seeker?: Seeker;
  company?: Company;
};
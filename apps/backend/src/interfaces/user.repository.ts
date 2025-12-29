import { User, Prisma } from "@/generated/prisma";
import { UserFilter, UserWithRelations } from "@talentry/types";

export interface IUserRepository {
  createUser(user: Omit<User, "id">): Promise<User | null>;
  findOne(query: UserFilter): Promise<UserWithRelations | null>;
  findUsers(query: UserFilter): Promise<{
    users: UserWithRelations[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }>;
  updateUser(id: string, data: Partial<User>): Promise<UserWithRelations>;
  deleteUser(id: string): Promise<boolean>;
  withTransaction(t: Prisma.TransactionClient): IUserRepository;
}

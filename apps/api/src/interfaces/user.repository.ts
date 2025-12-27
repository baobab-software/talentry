import { User, Prisma } from "@/generated/prisma";
import { UserFilter } from "@talentry/types";

export interface IUserRepository {
  createUser(user: Omit<User, "id">): Promise<User | null>;
  findOne(query: UserFilter): Promise<User | null>;
  findUsers(query: UserFilter): Promise<{
    users: User[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
  withTransaction(t: Prisma.TransactionClient): IUserRepository;
}

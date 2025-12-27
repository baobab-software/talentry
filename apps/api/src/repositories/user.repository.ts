import { IUserRepository } from "@/interfaces";
import { User, Prisma, UserRole } from "@/generated/prisma";
import { UserFilter } from "@talentry/types";
import { prisma } from "@/libs";

class UserRepository implements IUserRepository {
  private static _instance: UserRepository;
  private db: Prisma.TransactionClient;

  private constructor(dbClient?: Prisma.TransactionClient) {
    this.db = dbClient || prisma;
  }

  public static getInstance(): UserRepository {
    if (!UserRepository._instance) {
      UserRepository._instance = new UserRepository();
    }
    return UserRepository._instance;
  }

  async createUser(user: Omit<User, "id">): Promise<User | null> {
    return this.db.user.create({
      data: user,
    });
  }

  async findOne(query: UserFilter): Promise<User | null> {
    const user = await this.db.user.findFirst({
      where: this.buildWhereClause(query),
    });

    return user;
  }

  async findUsers(query: UserFilter): Promise<{
    users: User[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where = this.buildWhereClause(query);

    const orderBy: Prisma.UserOrderByWithRelationInput[] = query.sort
      ? Object.entries(query.sort).map(([key, direction]) => ({
          [key]: direction.toLowerCase() as "asc" | "desc",
        }))
      : [{ createdAt: "desc" }];

    const [users, total] = await Promise.all([
      this.db.user.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.db.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      users,
      total,
      totalPages,
      currentPage: page,
      perPage: limit,
    };
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.db.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.db.user.delete({
      where: { id },
    });
    return true;
  }

  withTransaction(t: Prisma.TransactionClient): IUserRepository {
    return new UserRepository(t);
  }

  private buildWhereClause(query: UserFilter): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {};

    if (query.id) {
      where.id = query.id;
    }

    if (query.email) {
      where.email = query.email;
    }

    if (query.phone) {
      where.phone = query.phone;
    }

    if (query.role) {
      where.role = query.role as UserRole;
    }

    if (query.search) {
      where.OR = [
        { email: { contains: query.search, mode: "insensitive" } },
        { phone: { contains: query.search, mode: "insensitive" } },
      ];
    }

    return where;
  }
}

export const userRepository = UserRepository.getInstance();

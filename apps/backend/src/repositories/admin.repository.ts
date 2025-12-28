import { IAdminRepository } from "@/interfaces";
import { Admin, Prisma } from "@/generated/prisma";
import { AdminFilter } from "@talentry/types";
import { prisma } from "@/libs";
import { AdminType } from "@/generated/prisma";

class AdminRepository implements IAdminRepository {
  private static _instance: AdminRepository;
  private db: Prisma.TransactionClient;

  private constructor(dbClient?: Prisma.TransactionClient) {
    this.db = dbClient || prisma;
  }

  public static getInstance(): AdminRepository {
    if (!AdminRepository._instance) {
      AdminRepository._instance = new AdminRepository();
    }
    return AdminRepository._instance;
  }

  async createAdmin(admin: Omit<Admin, "id">): Promise<Admin | null> {
    return this.db.admin.create({
      data: admin,
    });
  }

  async findAdmin(query: AdminFilter): Promise<Admin> {
    const admin = await this.db.admin.findFirst({
      where: this.buildWhereClause(query),
      include: {
        user: true,
        invitedBy: true,
      },
    });

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  }

  async findAdmins(query: AdminFilter): Promise<{
    admins: Admin[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where = this.buildWhereClause(query);

    const orderBy: Prisma.AdminOrderByWithRelationInput[] = query.sort
      ? Object.entries(query.sort).map(([key, direction]) => ({
          [key]: (direction as string).toLowerCase() as "asc" | "desc",
        }))
      : [{ createdAt: "desc" }];

    const [admins, total] = await Promise.all([
      this.db.admin.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          user: true,
          invitedBy: true,
        },
      }),
      this.db.admin.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      admins,
      total,
      totalPages,
      currentPage: page,
      perPage: limit,
    };
  }

  async updateAdmin(id: string, data: Partial<Admin>): Promise<Admin> {
    return this.db.admin.update({
      where: { id },
      data,
      include: {
        user: true,
        invitedBy: true,
      },
    });
  }

  async deleteAdmin(id: string): Promise<boolean> {
    await this.db.admin.delete({
      where: { id },
    });
    return true;
  }

  withTransaction(t: Prisma.TransactionClient): IAdminRepository {
    return new AdminRepository(t);
  }

  private buildWhereClause(query: AdminFilter): Prisma.AdminWhereInput {
    const where: Prisma.AdminWhereInput = {};

    if (query.id) {
      where.id = query.id;
    }

    if (query.userId) {
      where.userId = query.userId;
    }

    if (query.type) {
      where.type = query.type as AdminType;
    }

    if (query.invitedById) {
      where.invitedById = query.invitedById;
    }

    if (query.search) {
      where.OR = [
        { firstName: { contains: query.search, mode: "insensitive" } },
        { lastName: { contains: query.search, mode: "insensitive" } },
        { user: { email: { contains: query.search, mode: "insensitive" } } },
      ];
    }

    return where;
  }
}

export const adminRepository = AdminRepository.getInstance();

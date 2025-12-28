import { ISeekerRepository } from "@/interfaces";
import { Seeker, Prisma } from "@/generated/prisma";
import { SeekerFilter } from "@talentry/types";
import { prisma } from "@/libs";

class SeekerRepository implements ISeekerRepository {
  private static _instance: SeekerRepository;
  private db: Prisma.TransactionClient;

  private constructor(dbClient?: Prisma.TransactionClient) {
    this.db = dbClient || prisma;
  }

  public static getInstance(): SeekerRepository {
    if (!SeekerRepository._instance) {
      SeekerRepository._instance = new SeekerRepository();
    }
    return SeekerRepository._instance;
  }

  async createSeeker(seeker: Omit<Seeker, "id">): Promise<Seeker | null> {
    return this.db.seeker.create({
      data: seeker,
    });
  }

  async findSeeker(query: SeekerFilter): Promise<Seeker> {
    const seeker = await this.db.seeker.findFirst({
      where: this.buildWhereClause(query),
      include: {
        user: true,
      },
    });

    if (!seeker) {
      throw new Error("Seeker not found");
    }

    return seeker;
  }

  async findSeekers(query: SeekerFilter): Promise<{
    seekers: Seeker[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where = this.buildWhereClause(query);

    const orderBy: Prisma.SeekerOrderByWithRelationInput[] = query.sort
      ? Object.entries(query.sort).map(([key, direction]) => ({
          [key]: (direction as string).toLowerCase() as "asc" | "desc",
        }))
      : [{ createdAt: "desc" }];

    const [seekers, total] = await Promise.all([
      this.db.seeker.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          user: true,
        },
      }),
      this.db.seeker.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      seekers,
      total,
      totalPages,
      currentPage: page,
      perPage: limit,
    };
  }

  async updateSeeker(id: string, data: Partial<Seeker>): Promise<Seeker> {
    return this.db.seeker.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async deleteSeeker(id: string): Promise<boolean> {
    await this.db.seeker.delete({
      where: { id },
    });
    return true;
  }

  withTransaction(t: Prisma.TransactionClient): ISeekerRepository {
    return new SeekerRepository(t);
  }

  private buildWhereClause(query: SeekerFilter): Prisma.SeekerWhereInput {
    const where: Prisma.SeekerWhereInput = {};

    if (query.id) {
      where.id = query.id;
    }

    if (query.userId) {
      where.userId = query.userId;
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

export const seekerRepository = SeekerRepository.getInstance();

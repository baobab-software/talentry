import { ICompanyRepository } from "@/interfaces";
import { Company, Prisma } from "@/generated/prisma";
import { CompanyFilter } from "@talentry/types";
import { prisma } from "@/libs";

class CompanyRepository implements ICompanyRepository {
  private static _instance: CompanyRepository;
  private db: Prisma.TransactionClient;

  private constructor(dbClient?: Prisma.TransactionClient) {
    this.db = dbClient || prisma;
  }

  public static getInstance(): CompanyRepository {
    if (!CompanyRepository._instance) {
      CompanyRepository._instance = new CompanyRepository();
    }
    return CompanyRepository._instance;
  }

  async createCompany(company: Omit<Company, "id">): Promise<Company | null> {
    return this.db.company.create({
      data: company,
    });
  }

  async findCompany(query: CompanyFilter): Promise<Company> {
    const company = await this.db.company.findFirst({
      where: this.buildWhereClause(query),
      include: {
        user: true,
        companyMembers: true,
      },
    });

    if (!company) {
      throw new Error("Company not found");
    }

    return company;
  }

  async findCompanies(query: CompanyFilter): Promise<{
    companies: Company[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where = this.buildWhereClause(query);

    const orderBy: Prisma.CompanyOrderByWithRelationInput[] = query.sort
      ? Object.entries(query.sort).map(([key, direction]) => ({
          [key]: (direction as string).toLowerCase() as "asc" | "desc",
        }))
      : [{ createdAt: "desc" }];

    const [companies, total] = await Promise.all([
      this.db.company.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          user: true,
        },
      }),
      this.db.company.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      companies,
      total,
      totalPages,
      currentPage: page,
      perPage: limit,
    };
  }

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    return this.db.company.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async deleteCompany(id: string): Promise<boolean> {
    await this.db.company.delete({
      where: { id },
    });
    return true;
  }

  withTransaction(t: Prisma.TransactionClient): ICompanyRepository {
    return new CompanyRepository(t);
  }

  private buildWhereClause(query: CompanyFilter): Prisma.CompanyWhereInput {
    const where: Prisma.CompanyWhereInput = {};

    if (query.id) {
      where.id = query.id;
    }

    if (query.userId) {
      where.userId = query.userId;
    }

    if (query.name) {
      where.name = query.name;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
        { website: { contains: query.search, mode: "insensitive" } },
      ];
    }

    return where;
  }
}

export const companyRepository = CompanyRepository.getInstance();

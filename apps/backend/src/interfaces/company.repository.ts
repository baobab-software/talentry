import { Company, Prisma } from "@/generated/prisma";
import { CompanyFilter } from "@talentry/types";

export interface ICompanyRepository {
  createCompany(company: Omit<Company, "id">): Promise<Company | null>;
  findCompany(query: CompanyFilter): Promise<Company>;
  findCompanies(query: CompanyFilter): Promise<{
    companies: Company[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }>;
  updateCompany(id: string, data: Partial<Company>): Promise<Company>;
  deleteCompany(id: string): Promise<boolean>;
  withTransaction(t: Prisma.TransactionClient): ICompanyRepository;
}

import { Admin, Prisma } from "@/generated/prisma";
import { AdminFilter } from "@talentry/types";

export interface IAdminRepository {
  createAdmin(admin: Omit<Admin, "id">): Promise<Admin | null>;
  findAdmin(query: AdminFilter): Promise<Admin>;
  findAdmins(query: AdminFilter): Promise<{
    admins: Admin[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }>;
  updateAdmin(id: string, data: Partial<Admin>): Promise<Admin>;
  deleteAdmin(id: string): Promise<boolean>;
  withTransaction(t: Prisma.TransactionClient): IAdminRepository;
}

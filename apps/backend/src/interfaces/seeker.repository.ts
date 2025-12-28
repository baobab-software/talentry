import { Seeker, Prisma } from "@/generated/prisma";
import { SeekerFilter } from "@talentry/types";

export interface ISeekerRepository {
  createSeeker(seeker: Omit<Seeker, "id">): Promise<Seeker | null>;
  findSeeker(query: SeekerFilter): Promise<Seeker>;
  findSeekers(query: SeekerFilter): Promise<{
    seekers: Seeker[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }>;
  updateSeeker(id: string, data: Partial<Seeker>): Promise<Seeker>;
  deleteSeeker(id: string): Promise<boolean>;
  withTransaction(t: Prisma.TransactionClient): ISeekerRepository;
}

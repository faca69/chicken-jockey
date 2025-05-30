import { Company } from "@/generated/prisma";

export interface CompaniesPage {
  companies: Company[];
  nextCursor: string | null;
}

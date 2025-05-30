import { Prisma } from "@/generated/prisma";

export interface CompaniesPage {
  companies: CompanyWithJobCount[];
  nextCursor: string | null;
}

export const companyDataSelect = {
  userId: true,
  companyName: true,
  companyLogo: true,
  _count: {
    select: { jobs: true },
  },
} satisfies Prisma.CompanySelect;

export type CompanyWithJobCount = Prisma.CompanyGetPayload<{
  select: typeof companyDataSelect;
}>;

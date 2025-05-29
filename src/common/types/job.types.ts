import { Prisma } from "@/generated/prisma";

export const companyDataSelect = {
  userId: true,
  companyName: true,
  companyLogo: true,
} satisfies Prisma.CompanySelect;

export const jobDataInclude = {
  company: {
    select: companyDataSelect,
  },
} satisfies Prisma.JobInclude;

export type JobsWithComapnyInfoForJobCards = Prisma.JobGetPayload<{
  include: typeof jobDataInclude;
}>;

export interface JobsPage {
  jobs: JobsWithComapnyInfoForJobCards[];
  nextCursor: string | null;
}

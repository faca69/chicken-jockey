import { prisma } from "./prisma";

export const getCompanyById = async (id: string) => {
  const company = await prisma.company.findUnique({
    where: {
      id,
    },
  });
  return company;
};

export const getCompanyByUserId = async (userId: string) => {
  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
  });
  return company;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const getCompanies = async () => {
  const companies = await prisma.company.findMany();
  return companies;
};

export const getCompaniesJobs = async (id: string) => {
  const jobs = await prisma.job.findMany({
    where: {
      companyId: id,
    },
    include: {
      company: {
        select: {
          companyName: true,
          id: true,
          userId: true,
          industry: true,
          website: true,
          location: true,
          email: true,
        },
      },
    },
  });
  return jobs;
};

export const filterJobsByName = async (name: string) => {
  const jobs = await prisma.job.findMany({
    where: {
      title: {
        contains: name,
        mode: "insensitive",
      },
    },
  });
  return jobs;
};

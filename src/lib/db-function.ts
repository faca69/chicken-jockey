import { prisma } from "./prisma";

export const getCompanyById = async (id: string) => {
  const company = await prisma.company.findUnique({
    where: {
      id,
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
